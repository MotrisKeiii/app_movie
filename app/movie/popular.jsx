import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";

import MovieCard from "../../components/movie/MovieCard";

import { useEffect, useState } from "react";
import { getPopularMovies } from "../../services/movieApi";
import { router } from "expo-router";

export default function PopularMoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      setError(null);

      const data = await getPopularMovies();

      setMovies(data);
    } catch (error) {
      console.log("GET POPULAR MOVIES ERROR:", error);

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

          <Pressable
            onPress={loadMovies}
            className="bg-[#E50914] rounded-xl px-6 py-3 mt-6"
          >
            <Text className="text-white font-bold">Thử lại</Text>
          </Pressable>
        </View>
      );
    }

    if (movies.length === 0) {
      return (
        <View className="flex-1 bg-[#0F1017] items-center justify-center px-6">
          <Text className="text-white text-xl font-bold">Chưa có phim</Text>

          <Text className="text-[#A5A7B4] text-center mt-3">
            Hiện chưa có danh sách phim để hiển thị.
          </Text>

          <Pressable
            onPress={() => router.back()}
            className="bg-[#E50914] rounded-xl px-6 py-3 mt-6"
          >
            <Text className="text-white font-bold">Quay lại</Text>
          </Pressable>
        </View>
      );
    }
    
  return (
    <View className="flex-1 bg-[#0F1017] px-4 pt-6">
      <Pressable onPress={() => router.back()} className="mb-4">
        <Text className="text-white text-base">← Quay lại</Text>
      </Pressable>
      <Text className="text-white text-2xl font-bold">Đang thịnh hành</Text>

      <FlatList
        data={movies}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 20,
        }}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 30,
        }}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </View>
  );
}
