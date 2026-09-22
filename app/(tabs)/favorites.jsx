import { View, Text, FlatList } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect, router } from "expo-router";

import { getFavorites } from "../../services/favoriteService";
import MovieCard from "../../components/movie/MovieCard";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );

  async function loadFavorites() {
    const data = await getFavorites();
    setFavorites(data);
  }

  return (
    <View className="flex-1 bg-[#0F1017] px-4 pt-6">
      <Text className="text-white text-2xl font-bold">Yêu thích</Text>

      {favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-[#A5A7B4]">Bạn chưa yêu thích bộ phim nào</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 20 }}
          columnWrapperStyle={{ gap: 12 }}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      )}
    </View>
  );
}
