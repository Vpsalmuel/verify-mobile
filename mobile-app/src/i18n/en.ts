// Source language. Every other language must provide the same keys (enforced by the Translations type).
export const en = {
  common: {
    back: 'Back',
    cancel: 'Cancel',
    done: 'Done',
    scanAProduct: 'Scan a product',
    reportAProduct: 'Report a Product',
  },
  tabs: {
    home: 'Home',
    reports: 'Reports',
    scan: 'Scan',
    alerts: 'Alerts',
    settings: 'Settings',
  },
  status: {
    verified: 'Verified',
    notVerified: 'Not verified',
    invalid: 'Invalid',
    underReview: 'Under review',
    reviewed: 'Reviewed',
  },
  onboarding: {
    title: 'Know what’s genuine',
    subtitle:
      'Verify your products with confidence. Scan a Uni-Code or enter it manually to check its authenticity.',
    cta: 'Scan your first product',
  },
  home: {
    welcome: 'Welcome 👋',
    subtitle: 'What are you verifying today?',
    startACheck: 'START A CHECK',
    verifyAProduct: 'Verify a product',
    verifySubtitle: 'Scan the code on the packaging or enter it manually',
    safetyTitle: 'Stay safer when buying products',
    safetySubtitle: 'Four practical checks to remember',
    recentChecks: 'Recent Checks',
    viewAll: 'View all',
  },
  checkMeta: {
    authentic: 'Authentic',
    sourceUnclear: 'Source unclear',
  },
  safetyTips: {
    title: 'Stay safer when buying products',
    subtitle: 'Simple signs can help you decide when to verify.',
    tips: [
      'Buy from trusted and traceable suppliers where possible.',
      'Compare the packaging with the original, and look for unusual signs and missing details.',
      'A low price can be a warning sign, but it doesn’t prove that a product is counterfeit.',
      'Use Veryfy whenever a supported verification code is available.',
    ],
  },
  history: {
    title: 'History',
    all: 'All',
    empty: 'No checks in this category yet.',
  },
  scan: {
    title: 'Scan product',
    useDemoData: 'Use demo data',
    positionTitle: 'Position the code',
    positionSubtitle: 'Align the product code within the frame',
    cantScan: 'Can’t scan the code?',
    enterManually: 'Enter code manually',
    modalTitle: 'Enter Uni-Code',
    modalSubtitle: 'Type the code found on the product packaging label (e.g. VFY-2849-1036).',
    verifyCode: 'Verify code',
    torchOn: 'Turn torch on',
    torchOff: 'Turn torch off',
    cameraPermissionTitle: 'Allow camera access',
    cameraPermissionBody:
      'Veryfy uses your camera to read the code on the product packaging. You can also enter the code manually.',
    allowCamera: 'Allow camera',
    openSettings: 'Open settings',
    cameraUnavailable: 'The camera isn’t available on this device. Enter the code manually or use demo data.',
  },
  verifying: {
    eyebrow: 'SECURE PRODUCT CHECK',
    title: 'Verifying product',
    subtitle: 'This will only take a moment.',
    steps: ['Reading product code', 'Checking product information', 'Reviewing verification details'],
  },
  result: {
    title: 'Product Verification',
    productCategory: 'Medicine · 500 mg tablets',
    verifiedHeadline: 'The Uni-Code matched.',
    verifiedDescription:
      'The Uni Code matched a registered product, with no suspicious activity detected.',
    notVerifiedHeadline: 'We couldn’t confirm this code.',
    notVerifiedDescription:
      'Uni Code not recognised or verification incomplete. This doesn’t mean the product is counterfeit.',
    invalidHeadline: 'This code requires caution.',
    invalidDescription:
      'The verification information associated with this product is invalid or indicates a counterfeit product.',
    productDetails: 'Product details',
    uniCode: 'Uni-code',
    manufacturer: 'Manufacturer',
    dateApproved: 'Date Approved',
    whatToDoNext: 'What to do next',
    checkEveryCharacter: 'Check every printed letter and number',
    tryAgainHint: 'Try scanning or entering the code again',
    physicalNotice:
      'Digital verification doesn’t confirm physical authenticity. Check HiddenMark and match its code with the printed Uni Code.',
    scanAnother: 'Scan another product',
    goHome: 'Go to homepage',
    tryAgain: 'Try again',
    reportThisProduct: 'Report this product',
  },
  alerts: {
    title: 'Alerts',
    subtitle: 'important safety and authentication updates.',
    searchPlaceholder: 'Search products or alerts',
    all: 'All',
    recalls: 'Recalls',
    counterfeit: 'Counterfeit',
    safety: 'Safety',
    featuredTitle: 'Product verification',
    featuredSubtitle: 'A product alert has been issued for selected VitaCore Uni-code',
    itemTitle: 'Packaging guidance updated',
    itemDescription: 'Certain batches have been recalled due to a reported safety concern',
    empty: 'No alerts match your search.',
  },
  alertDetails: {
    title: 'Alert details',
    category: 'Product Authentication',
    whatYouNeedToKnow: 'What you need to know',
    description:
      'Some product codes associated with a limited set of VitaCore Paracetamol batches require additional verification.',
    whatToDoNext: 'What to do next',
    steps: [
      'Scan the verification code on the package.',
      'Review the result and product details.',
      'Report the product if details don’t match.',
    ],
    notice:
      'This notice does not mean every VitaCore product is counterfeit. Check the code on your specific product.',
  },
  reports: {
    title: 'My Reports',
    subtitle: 'Follow the reports you’ve sent to Veryfy.',
    all: 'All',
    submitted: (date: string) => `Submitted ${date}`,
    reportId: 'Report ID:',
    summary: 'Report summary',
    reason: 'Report reason',
    category: 'Product category',
    details: 'Additional details',
    location: 'Location',
    store: 'Store',
    cosmetics: 'Cosmetics',
    notSpecified: 'Not specified',
    outcomes: {
      inProgressTitle: 'Review in progress',
      inProgressDescription:
        'Our review team will assess the available product information. We’ll update this report when the review is complete.',
      noIssuesTitle: 'No issues found',
      noIssuesDescription:
        'Our review did not identify any suspicious activity or mismatches in the available product information.',
      mismatchTitle: 'Source mismatch detected',
      mismatchDescription:
        'The product’s source does not match NAFDAC and manufacturer records. Authenticity could not be verified.',
    },
  },
  reportForm: {
    intro: 'Tell us about the product and the issue you’ve noticed',
    productName: 'Product name',
    productNamePlaceholder: 'E.g Emzor Paracetamol',
    productNameRequired: 'Enter the product name to submit your report.',
    whatIsWrong: 'What is wrong with the product?',
    issues: {
      counterfeit: 'Suspected counterfeit',
      verificationFailed: 'Verification failed',
      unusualPackaging: 'Packaging looks unusual',
      sourceUnclear: 'Product source is unclear',
      sourceMismatch: 'Product source mismatch',
      authenticity: 'Product authenticity concern',
      other: 'Other',
    },
    additionalDetails: 'Additional details (optional)',
    additionalDetailsPlaceholder: 'Tell us what you noticed',
    addPhoto: 'Add photo',
    photoHint: 'Optional · JPG or PNG, up to 5 MB',
    changePhoto: 'Change photo',
    removePhoto: 'Remove photo',
    takePhoto: 'Take photo',
    chooseFromLibrary: 'Choose from library',
    photoSourceTitle: 'Add a photo',
    photoSourceBody: 'Show the packaging, label or code clearly.',
    cameraPermissionDenied: 'Camera access is off. Turn it on in Settings to take a photo.',
    libraryPermissionDenied: 'Photo access is off. Turn it on in Settings to choose a photo.',
    addLocation: 'Add location',
    whereFound: 'Where did you find this product?',
    whereFoundHint: 'Supermarket, pharmacy, open market or retail shop.',
    useCurrentLocation: 'Use my current location',
    enterManually: 'Enter location manually',
    findingLocation: 'Finding your location…',
    locationPermissionDenied:
      'Location access is off. Turn it on in Settings, or enter the location manually.',
    locationError: 'We couldn’t get your location. Try again or enter it manually.',
    address: 'Address or landmark',
    addressPlaceholder: 'E.g 14 Broad Street, Lagos Island',
    storeName: 'Store or business name',
    storeNamePlaceholder: 'E.g ABC supermarket',
    submit: 'Submit Report',
  },
  reportSuccess: {
    title: 'Submitted successfully',
    subtitle: 'Thank you for your report. We’ll review the details you’ve provided.',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Manage your app preferences',
    language: 'Language',
    notifications: 'Notifications',
    faqs: 'FAQs',
    termsOfUse: 'Terms of use',
    privacyPolicy: 'Privacy policy',
    footer: 'Veryfy version 1.0 · Made for Nigeria',
  },
  languageScreen: {
    title: 'Language',
    subtitle: 'Choose your preferred language.',
    save: 'Save language',
  },
  notificationsScreen: {
    title: 'Notifications',
    subtitle: 'Choose the updates you want to receive',
    push: 'Push notifications',
    safetyAlerts: 'Product and safety alerts',
    reportUpdates: 'Report updates',
    reminders: 'Verification reminders',
    appUpdates: 'App updates',
  },
  appearanceScreen: {
    title: 'Appearance',
    subtitle: 'Choose a display preference.',
    light: 'Light',
    dark: 'Dark',
    system: 'Use device setting',
  },
  aboutScreen: {
    title: 'About VERYFY',
    body: 'VERYFY helps consumers and retailers check available product information, understand verification results, and report suspicious products.',
    version: 'Version',
    versionValue: '1.0 prototype',
    support: 'Support',
    jurisdiction: 'Jurisdiction',
    jurisdictionValue: 'Nigeria (NAFDAC standards)',
  },
  faqsScreen: {
    title: 'FAQs',
    subtitle: 'Understand checks, results and safer next steps.',
    items: [
      {
        question: 'How do I verify a product?',
        answer:
          'Scan the supported code on the packaging or enter it manually, then review the available product information.',
      },
      {
        question: 'What does VERIFIED mean?',
        answer:
          'A Verified result means the Uni-Code matches a registered manufacturer batch with no duplicate or suspicious activity detected.',
      },
      {
        question: 'What does SUSPICIOUS mean?',
        answer:
          'Suspicious indicates potential anomalies such as multiple scans across distant geographic regions in a short time frame.',
      },
      {
        question: 'What does NOT VERIFIED mean?',
        answer:
          'Not Verified means the code is not recognized in manufacturer records or the scan was incomplete. Double check spelling or try scanning again.',
      },
      {
        question: 'How do I report a product?',
        answer:
          'If your verification result returns suspicious or invalid, tap "Report this product" to submit details directly to review authorities.',
      },
    ],
  },
  legal: {
    reviewNotice: 'This content requires review by the VERYFY team before release.',
    privacyTitle: 'Privacy policy',
    privacySections: [
      {
        heading: 'Information in this prototype',
        body: 'This placeholder describes where information about account details, verification activity, and submitted reports may be explained.',
      },
      {
        heading: 'Before release',
        body: 'The VERYFY team must review and replace this text with an approved policy before launch.',
      },
    ],
    termsTitle: 'Terms of use',
    termsSections: [
      {
        heading: 'Using VERYFY',
        body: 'This placeholder will explain acceptable use of product checks, results, and reporting features.',
      },
      {
        heading: 'Verification limitations',
        body: 'Verification results depend on available information and do not guarantee that every product is genuine.',
      },
      {
        heading: 'Before release',
        body: 'The VERYFY team must review and replace this text with approved terms before launch.',
      },
    ],
  },
};

type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => string
    ? (...args: A) => string
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> };

export type Translations = Widen<typeof en>;
