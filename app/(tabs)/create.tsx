import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useDiary } from "../../components/src/context/DiaryContext";
import { COLORS, RADIUS, SPACE } from "../../components/styles/tokens";

const MOODS = ["\u{1F60A}", "\u{1F604}", "\u{1F610}", "\u{1F614}"];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2026-11-02");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState(MOODS[0]);
  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    addEntry({ title: title.trim(), date: date.trim(), preview: body.trim().slice(0, 80), body: body.trim(), mood });
    setTitle("");
    setBody("");
    setMood(MOODS[0]);
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>MOMEN BARU</Text>
      <Text style={styles.heading}>Tambah Diary</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Judul" placeholderTextColor={COLORS.muted} style={styles.input} />
      <TextInput value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor={COLORS.muted} style={styles.input} />
      <TextInput value={body} onChangeText={setBody} placeholder="Ceritakan harimu..." placeholderTextColor={COLORS.muted} multiline style={[styles.input, styles.bodyInput]} />
      <Text style={styles.label}>Mood</Text>
      <View style={styles.moodRow}>
        {MOODS.map((item) => <Pressable key={item} onPress={() => setMood(item)} style={[styles.moodButton, mood === item && styles.moodSelected]}><Text style={styles.mood}>{item}</Text></Pressable>)}
      </View>
      <Pressable onPress={save} disabled={!canSave} style={[styles.saveButton, !canSave && styles.disabled]}><Text style={styles.saveText}>Simpan Diary</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, gap: SPACE.m, backgroundColor: COLORS.background },
  eyebrow: { color: COLORS.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.5 },
  heading: { marginBottom: SPACE.s, color: COLORS.text, fontSize: 28, fontWeight: "800" },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.control, padding: SPACE.m, color: COLORS.text, backgroundColor: COLORS.input },
  bodyInput: { minHeight: 140, textAlignVertical: "top" },
  label: { color: COLORS.text, fontWeight: "700" },
  moodRow: { flexDirection: "row", gap: SPACE.s },
  moodButton: { padding: 10, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.control, backgroundColor: COLORS.surface },
  moodSelected: { borderColor: COLORS.accent, backgroundColor: COLORS.accentDark },
  mood: { fontSize: 26 },
  saveButton: { marginTop: SPACE.s, padding: 15, borderRadius: RADIUS.control, alignItems: "center", backgroundColor: COLORS.accent },
  disabled: { opacity: 0.45 },
  saveText: { color: COLORS.background, fontWeight: "800" },
});
