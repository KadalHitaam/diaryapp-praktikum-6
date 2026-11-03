import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { COLORS, SPACE } from "../../components/styles/tokens";

export default function SettingsScreen() {
  const [compactMode, setCompactMode] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>PREFERENSI</Text>
      <Text style={styles.title}>Pengaturan</Text>
      <View style={styles.row}>
        <View><Text style={styles.label}>Compact Mode</Text><Text style={styles.info}>Gunakan tampilan yang lebih ringkas.</Text></View>
        <Switch value={compactMode} onValueChange={setCompactMode} trackColor={{ false: COLORS.border, true: COLORS.accentDark }} thumbColor={compactMode ? COLORS.accent : COLORS.muted} />
      </View>
      <Text style={styles.state}>Status: {compactMode ? "Aktif" : "Nonaktif"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, paddingTop: SPACE.xl, backgroundColor: COLORS.background },
  eyebrow: { color: COLORS.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.5 },
  title: { marginTop: 6, marginBottom: SPACE.xl, color: COLORS.text, fontSize: 28, fontWeight: "800" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: SPACE.l, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, backgroundColor: COLORS.surface },
  label: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
  info: { marginTop: 4, color: COLORS.muted, fontSize: 12 },
  state: { marginTop: SPACE.m, color: COLORS.muted },
});
