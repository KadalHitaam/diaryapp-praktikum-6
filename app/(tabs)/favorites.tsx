import { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useDiary } from "../../components/src/context/DiaryContext";
import DiaryCard from "../../components/src/components/DiaryCard";
import { useLikedEntries } from "../../components/src/hooks/useLikedEntries";
import { COLORS, SPACE, TYPO } from "../../components/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const likedEntries = useLikedEntries(entries, likedIds);
  const openDetail = useCallback((id: number) => {
    router.push({ pathname: "/detail/[id]", params: { id: String(id) } });
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>KOLEKSI PILIHAN</Text>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>Diary yang ingin kamu ingat kembali.</Text>
      <FlatList
        data={likedEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <DiaryCard title={item.title} date={item.date} preview={item.preview} mood={item.mood} liked onPress={() => openDetail(item.id)} onToggleLike={() => toggleLike(item.id)} />}
        ListEmptyComponent={<Text style={styles.empty}>Belum ada diary favorit.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, paddingTop: SPACE.xl, backgroundColor: COLORS.background },
  eyebrow: { color: COLORS.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.5 },
  title: { marginTop: 6, color: COLORS.text, fontSize: TYPO.h1, fontWeight: "800" },
  subtitle: { marginTop: 4, marginBottom: SPACE.l, color: COLORS.muted },
  list: { gap: SPACE.m, paddingBottom: SPACE.xl },
  empty: { paddingTop: 48, color: COLORS.muted, textAlign: "center" },
});
