import { View, Text, ScrollView, Pressable } from "react-native";
import MovieCard from "./MovieCard";
import { router } from "expo-router";

export default function MovieSection({ title, movies }) {
  return (
    <View className="mt-8">
      <View className="flex-row items-center justify-between">
        <Text className="text-white text-xl font-bold">{title}</Text>

        <Pressable onPress={() => router.push("/movie/popular")}>
          <Text className="text-[#E50914] text-sm">Xem tất cả</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
      >
        {movies.slice(0, 5).map((movie) => (
          <View key={movie.id} className="mr-3">
            <MovieCard movie={movie} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
