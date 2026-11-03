import { useMemo } from "react";
import { DiaryEntry } from "../context/DiaryContext";

export type MoodFilter = string | null;

export function useDiarySearch(
  entries: DiaryEntry[],
  query: string,
  mood: MoodFilter = null,
) {
  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return entries.filter((entry) => {
      const matchesMood = !mood || entry.mood === mood;
      const matchesQuery =
        !normalizedQuery ||
        entry.title.toLowerCase().includes(normalizedQuery) ||
        entry.preview.toLowerCase().includes(normalizedQuery) ||
        entry.body.toLowerCase().includes(normalizedQuery) ||
        entry.date.toLowerCase().includes(normalizedQuery);

      return matchesMood && matchesQuery;
    });
  }, [entries, query, mood]);

  return {
    filteredEntries,
    resultCount: filteredEntries.length,
  };
}
