import { View, Text, ScrollView } from "react-native";
import HeroMovie from "../../components/movie/HeroMovie";
import MovieSection from "../../components/movie/MovieSection";
import { movies } from "../../data/movies";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-[#0F1017]">
      <View className="px-4 pt-6">
        <Text className="text-white text-2xl font-bold">CINEFLIX</Text>

        <Text className="text-[#A5A7B4] mt-1">
          Khám phá bộ phim tiếp theo của bạn
        </Text>

        <HeroMovie movie={movies[0]} />

        <MovieSection title="Đang thịnh hành" movies={movies} />
      </View>
    </ScrollView>
  );
}
