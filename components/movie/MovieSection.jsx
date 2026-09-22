import { View, Text, ScrollView } from "react-native";
import MovieCard from "./MovieCard";

export default function MovieSection({ title, movies }) {
  return (
    <View className="mt-8">
      <View className="flex-row items-center justify-between">
        <Text className="text-white text-xl font-bold">{title}</Text>

        <Text className="text-[#E50914] text-sm">Xem tất cả</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
      >
        {movies.map((movie) => (
          <View key={movie.id} className="mr-3">
            <MovieCard movie={movie} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
