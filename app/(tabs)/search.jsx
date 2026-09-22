import { View, Text, TextInput, FlatList } from "react-native";
import { useState } from "react";

import { movies } from "../../data/movies";
import MovieCard from "../../components/movie/MovieCard";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");

  const searchResults = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View className="flex-1 bg-[#0F1017]">
      <FlatList
        data={searchText.trim() ? searchResults : []}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
          marginBottom: 20,
        }}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 30,
        }}
        ListHeaderComponent={
          <View className="px-4">
            <Text className="text-white text-2xl font-bold">Tìm kiếm</Text>

            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Tìm kiếm phim..."
              placeholderTextColor="#6B7280"
              className="bg-[#171922] text-white rounded-xl px-4 py-3 mt-5"
            />

            {searchText.trim() !== "" && searchResults.length === 0 && (
              <Text className="text-[#A5A7B4] text-center mt-10">
                Không tìm thấy phim
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </View>
  );
}
