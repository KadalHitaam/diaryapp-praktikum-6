import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SPACE, TYPO } from "../../styles/tokens";

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleLike: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleLike,
}: Props) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.main}>
        <Text style={styles.mood}>{mood}</Text>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={liked ? "Hapus dari favorit" : "Tambah ke favorit"}
        onPress={onToggleLike}
        style={styles.likeButton}
      >
        <Text style={styles.like}>{liked ? "♥" : "♡"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    overflow: "hidden",
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACE.m,
    gap: SPACE.m,
  },
  mood: { fontSize: 34 },
  content: { flex: 1 },
  title: { color: COLORS.text, fontSize: TYPO.title, fontWeight: "700" },
  date: { marginBottom: 4, color: COLORS.muted, fontSize: TYPO.caption },
  preview: { color: COLORS.text, fontSize: TYPO.body },
  likeButton: { padding: SPACE.l },
  like: { color: COLORS.danger, fontSize: 26 },
});
