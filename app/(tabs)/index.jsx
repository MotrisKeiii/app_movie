import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import HeroMovie from "../../components/movie/HeroMovie";
import MovieSection from "../../components/movie/MovieSection";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../services/movieApi";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      setError(null);

      const [popular, topRated, upcoming] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies(),
        getUpcomingMovies(),
      ]);

      setMovies(popular);
      setTopRatedMovies(topRated);
      setUpcomingMovies(upcoming);
    } catch (error) {
      console.log("GET HOME MOVIES ERROR:", error);
      setError("Không thể tải danh sách phim.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View className="flex-1 bg-[#0F1017] items-center justify-center">
        <ActivityIndicator size="large" color="#E50914" />

        <Text className="text-[#A5A7B4] mt-4">Đang tải phim...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#0F1017] items-center justify-center px-6">
        <Text className="text-white text-xl font-bold text-center">
          Có lỗi xảy ra
        </Text>

        <Text className="text-[#A5A7B4] text-center mt-3">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#0F1017]">
      <View className="px-4 pt-6">
        <Text className="text-white text-2xl font-bold">CINEFLIX</Text>

        <Text className="text-[#A5A7B4] mt-1">
          Khám phá bộ phim tiếp theo của bạn
        </Text>

        {movies.length > 0 && (
          <>
            <HeroMovie movie={movies[0]} />

            <MovieSection title="Đang thịnh hành" movies={movies} />
            <MovieSection title="Được đánh giá cao" movies={topRatedMovies} />
            <MovieSection title="Phim sắp chiếu" movies={upcomingMovies} />
          </>
        )}
      </View>
    </ScrollView>
  );
}
