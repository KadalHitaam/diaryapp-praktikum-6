import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import DiaryCard from "../../components/src/components/DiaryCard";
import { useDiary } from "../../components/src/context/DiaryContext";
import { useDiarySearch } from "../../components/src/hooks/useDiarySearch";
import { COLORS, RADIUS, SPACE, TYPO } from "../../components/styles/tokens";

const MOOD_OPTIONS = ["😊", "😄", "😐", "😔"];

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);
  const { filteredEntries, resultCount } = useDiarySearch(entries, query, mood);

  const openDetail = useCallback(
    (id: number) => {
      router.push({ pathname: "/detail/[id]", params: { id: String(id) } });
    },
    [router],
  );

  const resetFilter = useCallback(() => {
    setQuery("");
    setMood(null);
    searchRef.current?.blur();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>RUANG REFLEKSI</Text>
      <Text style={styles.header}>Buku Harian</Text>
      <Text style={styles.subtitle}>Simpan momen kecil yang berarti.</Text>

      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari diary..."
          placeholderTextColor={COLORS.muted}
          style={styles.search}
        />
        <Pressable onPress={resetFilter} style={styles.resetButton}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>

      <View style={styles.filterHeader}>
        <Text style={styles.filterLabel}>Filter mood</Text>
        <Text style={styles.counter}>{resultCount} entri</Text>
      </View>
      <View style={styles.moodRow}>
        <Pressable
          onPress={() => setMood(null)}
          style={[styles.moodChip, mood === null && styles.moodChipActive]}
        >
          <Text
            style={[
              styles.moodChipText,
              mood === null && styles.moodChipTextActive,
            ]}
          >
            Semua
          </Text>
        </Pressable>
        {MOOD_OPTIONS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[styles.moodChip, mood === item && styles.moodChipActive]}
          >
            <Text style={styles.moodEmoji}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada diary yang cocok.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.xl,
    backgroundColor: COLORS.background,
  },
  eyebrow: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  header: {
    marginTop: 6,
    color: COLORS.text,
    fontSize: TYPO.h1,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 4,
    marginBottom: SPACE.l,
    color: COLORS.muted,
    fontSize: 14,
  },
  searchRow: { flexDirection: "row", gap: SPACE.s },
  search: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.control,
    color: COLORS.text,
    backgroundColor: COLORS.input,
  },
  resetButton: {
    justifyContent: "center",
    paddingHorizontal: SPACE.m,
    borderRadius: RADIUS.control,
    backgroundColor: COLORS.accent,
  },
  resetText: { color: COLORS.background, fontWeight: "800" },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACE.l,
  },
  filterLabel: { color: COLORS.text, fontSize: 14, fontWeight: "700" },
  counter: { color: COLORS.muted, fontSize: 12 },
  moodRow: {
    flexDirection: "row",
    gap: SPACE.s,
    marginTop: SPACE.s,
    marginBottom: SPACE.m,
  },
  moodChip: {
    minWidth: 44,
    height: 38,
    paddingHorizontal: SPACE.m,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
  },
  moodChipActive: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accentDark,
  },
  moodChipText: { color: COLORS.muted, fontSize: 12, fontWeight: "700" },
  moodChipTextActive: { color: COLORS.text },
  moodEmoji: { fontSize: 20 },
  list: { gap: SPACE.m, paddingBottom: SPACE.xl },
  empty: { paddingTop: 48, color: COLORS.muted, textAlign: "center" },
});
