import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Translations } from '../i18n/en';

export type IssueKey = keyof Translations['reportForm']['issues'];
export type ReportStatus = 'under_review' | 'reviewed';
export type ReviewOutcome = 'in_progress' | 'mismatch' | 'no_issues';

// Text is stored as keys (issue, category) so reports re-translate when the language changes.
export interface ReportRecord {
  id: string;
  reportId: string;
  productName: string;
  issue: IssueKey;
  category?: 'cosmetics';
  details?: string;
  photoUri?: string;
  address?: string;
  storeName?: string;
  submittedAt: string;
  status: ReportStatus;
  outcome: ReviewOutcome;
}

export type NewReport = Pick<
  ReportRecord,
  'productName' | 'issue' | 'details' | 'photoUri' | 'address' | 'storeName'
>;

// Sample reports shown until a backend exists.
export const sampleReports: ReportRecord[] = [
  {
    id: 'sample-1',
    reportId: 'VFY-346D4',
    productName: 'PureGlow Face Cream',
    issue: 'sourceUnclear',
    category: 'cosmetics',
    submittedAt: '2025-06-12T10:00:00.000Z',
    status: 'under_review',
    outcome: 'in_progress',
  },
  {
    id: 'sample-2',
    reportId: 'VFY-346D5',
    productName: 'PureGlow Face Cream',
    issue: 'sourceMismatch',
    category: 'cosmetics',
    submittedAt: '2025-06-12T10:00:00.000Z',
    status: 'reviewed',
    outcome: 'mismatch',
  },
  {
    id: 'sample-3',
    reportId: 'VFY-346D6',
    productName: 'PureGlow Face Cream',
    issue: 'authenticity',
    category: 'cosmetics',
    submittedAt: '2025-06-12T10:00:00.000Z',
    status: 'reviewed',
    outcome: 'no_issues',
  },
];

const STORAGE_KEY = 'veryfy.reports';

interface ReportsContextValue {
  reports: ReportRecord[];
  addReport: (report: NewReport) => ReportRecord;
}

const ReportsContext = createContext<ReportsContextValue>({
  reports: sampleReports,
  addReport: () => {
    throw new Error('ReportsProvider is missing');
  },
});

function createReportId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 5; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `VFY-${suffix}`;
}

export const ReportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userReports, setUserReports] = useState<ReportRecord[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (!saved) return;
        const parsed = JSON.parse(saved);
        // Keep reports added before storage finished loading.
        if (Array.isArray(parsed)) setUserReports((current) => [...current, ...parsed]);
      })
      .catch(() => {});
  }, []);

  const addReport = useCallback((report: NewReport) => {
    const record: ReportRecord = {
      ...report,
      id: `${Date.now()}`,
      reportId: createReportId(),
      submittedAt: new Date().toISOString(),
      status: 'under_review',
      outcome: 'in_progress',
    };
    setUserReports((current) => {
      const next = [record, ...current];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
    return record;
  }, []);

  const value = useMemo(
    () => ({ reports: [...userReports, ...sampleReports], addReport }),
    [userReports, addReport]
  );

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};

export function useReports() {
  return useContext(ReportsContext);
}

export function formatReportDate(iso: string, style: 'short' | 'long' = 'long') {
  const date = new Date(iso);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayMonth = `${date.getDate()} ${months[date.getMonth()]}`;
  return style === 'short' ? dayMonth : `${dayMonth} ${date.getFullYear()}`;
}
