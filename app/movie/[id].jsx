import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { movies } from "../../data/movies";
import MovieTrailer from "../../components/movie/MovieTrailer";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../services/favoriteService";

import { useEffect, useState } from "react";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();

  const movie = movies.find((movie) => movie.id === Number(id));
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function checkFavorite() {
      const favorites = await getFavorites();

      const exists = favorites.some((item) => item.id === movie?.id);

      setIsFavorite(exists);
    }

    checkFavorite();
  }, [movie]);

  const handleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(movie.id);
      setIsFavorite(false);
    } else {
      await addFavorite(movie);
      setIsFavorite(true);
    }
  };

  if (!movie) {
    return (
      <View className="flex-1 bg-[#0F1017] items-center justify-center">
        <Text className="text-white text-xl">Không tìm thấy phim</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#0F1017]">
      <Image
        source={{ uri: movie.poster }}
        className="w-full h-[500px]"
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
