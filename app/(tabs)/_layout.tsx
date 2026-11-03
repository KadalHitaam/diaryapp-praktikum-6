import { Tabs } from "expo-router";
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#22D3EE", tabBarStyle: { backgroundColor: "#0F172A", borderTopColor: "#334155" }, tabBarInactiveTintColor: "#94A3B8" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: "Favorites" }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Tambah",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Pengaturan",
        }}
      />
    </Tabs>
  );
}
