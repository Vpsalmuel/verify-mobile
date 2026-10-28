import { Tabs, router } from 'expo-router';
import { BottomNav, TabKey } from '@/components/BottomNav';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigateToTab }) => (
        <BottomNav
          activeTab={state.routes[state.index].name as TabKey}
          onTabPress={(tab) => {
            const route = state.routes.find((r) => r.name === tab);
            if (route) navigateToTab(route.key);
          }}
          onScanPress={() => router.push('/scan')}
        />
      )}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="reports" />
      <Tabs.Screen name="alerts" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
