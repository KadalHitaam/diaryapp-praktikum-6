import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDiary } from "../../components/src/context/DiaryContext";
import { COLORS, RADIUS, SPACE, TYPO } from "../../components/styles/tokens";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, likedIds, toggleLike } = useDiary();
  const entry = getById(id);

  if (!entry) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Diary tidak ditemukan.</Text>
      </View>
    );
  }

  const liked = likedIds.has(entry.id);
  return (
    <>
      <Stack.Screen options={{ title: entry.title }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.moodBadge}>
          <Text style={styles.mood}>{entry.mood}</Text>
        </View>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.date}>{entry.date}</Text>
        <View style={styles.divider} />
        <Text style={styles.body}>{entry.body}</Text>
        <Pressable
          onPress={() => toggleLike(entry.id)}
          style={[styles.likeButton, liked && styles.likedButton]}
        >
          <Text style={[styles.likeText, liked && styles.likedText]}>
            {liked ? "♥  Disukai" : "♡  Suka"}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },
  moodBadge: {
    width: 88,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: COLORS.surface,
  },
  mood: { fontSize: 52 },
  title: {
    marginTop: SPACE.s,
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },
  date: { color: COLORS.muted, fontSize: TYPO.caption },
  divider: {
    height: 1,
    marginVertical: SPACE.m,
    backgroundColor: COLORS.border,
  },
  body: { color: COLORS.text, fontSize: 16, lineHeight: 27 },
  likeButton: {
    marginTop: "auto",
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: RADIUS.control,
    alignItems: "center",
  },
  likedButton: { backgroundColor: COLORS.accent },
  likeText: { color: COLORS.accent, fontWeight: "800" },
  likedText: { color: COLORS.background },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  notFound: { color: COLORS.text },
});
