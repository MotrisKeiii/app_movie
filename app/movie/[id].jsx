import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import MovieTrailer from "../../components/movie/MovieTrailer";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../services/favoriteService";

import { useEffect, useState } from "react";
import { getMovieDetail, getMovieTrailer } from "../../services/movieApi";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function checkFavorite() {
      const favorites = await getFavorites();

      const exists = favorites.some((item) => item.id === movie?.id);

      setIsFavorite(exists);
    }

    checkFavorite();
  }, [movie]);

  useEffect(() => {
    async function loadMovie() {
      try {
        setError(null);

        const data = await getMovieDetail(id);
        const trailer = await getMovieTrailer(id);

        setMovie({
          ...data,
          trailer,
        });
      } catch (error) {
        console.log("GET MOVIE DETAIL ERROR:", error);
        setError("Không thể tải thông tin phim.");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  const handleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(movie.id);
      setIsFavorite(false);
    } else {
      await addFavorite(movie);
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#0F1017] items-center justify-center">
        <ActivityIndicator size="large" color="#E50914" />

        <Text className="text-[#A5A7B4] mt-4">Đang tải thông tin phim...</Text>
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
          onPress={loadMovie}
          className="bg-[#E50914] rounded-xl px-6 py-3 mt-6"
        >
          <Text className="text-white font-bold">Thử lại</Text>
        </Pressable>
      </View>
    );
  }

  if (!movie) {
    return (
      <View className="flex-1 bg-[#0F1017] items-center justify-center px-6">
        <Text className="text-white text-xl font-bold text-center">
          Không tìm thấy phim
        </Text>

        <Text className="text-[#A5A7B4] text-center mt-3">
          Bộ phim này không tồn tại hoặc đã bị xóa.
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
    <ScrollView className="flex-1 bg-[#0F1017]">
      <Image
        source={{ uri: movie.backdrop || movie.poster }}
        className="w-full h-[280px]"
        resizeMode="cover"
      />

      <View className="px-4 py-6">
        <Text className="text-white text-3xl font-bold">{movie.title}</Text>
        <View className="flex-row items-center mt-3">
          <Text className="text-[#FFB800]">★ {movie.rating}</Text>
          <Text className="text-[#A5A7B4] ml-4">{movie.year}</Text>
          <Text className="text-[#A5A7B4] ml-4">{movie.genre}</Text>
        </View>

        <Pressable
          onPress={handleFavorite}
          className="border border-[#2E3342] rounded-xl py-3 mt-3 items-center"
        >
          <Text className="text-white font-bold">
            {isFavorite ? "♥ Đã yêu thích" : "♡ Yêu thích"}
          </Text>
        </Pressable>
        <Text className="text-white text-xl font-bold mt-8">Nội dung</Text>

        <Text className="text-[#A5A7B4] text-sm leading-6 mt-3">
          {movie.overview || "Chưa có nội dung mô tả cho phim này."}
        </Text>

        <MovieTrailer videoUrl={movie.trailer} />
        <Pressable
          onPress={() => router.back()}
          className="bg-[#E50914] rounded-xl py-3 mt-6 items-center"
        >
          <Text className="text-white font-bold">Quay lại</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
