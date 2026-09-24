import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MovieCard from "../../components/movie/MovieCard";
import { searchMovies } from "../../services/movieApi";
import { useState, useEffect } from "react";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim()) {
      setSearchLoading(true);
    } else {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchError(null);

        const results = await searchMovies(searchText);

        console.log("SEARCH RESULTS:", results);

        setSearchResults(results);
      } catch (error) {
        console.log("SEARCH ERROR:", error);

        setSearchError("Không thể tìm kiếm phim.");
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

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
              onChangeText={handleSearch}
              placeholder="Tìm kiếm phim..."
              placeholderTextColor="#6B7280"
              className="bg-[#171922] text-white rounded-xl px-4 py-3 mt-5"
            />
            {searchLoading && (
              <View className="items-center mt-6">
                <ActivityIndicator size="small" color="#E50914" />
                <Text className="text-[#A5A7B4] mt-2">Đang tìm kiếm...</Text>
              </View>
            )}
            {searchError && (
              <Text className="text-[#FF453A] text-center mt-6">
                {searchError}
              </Text>
            )}
            {searchText.trim() !== "" &&
              !searchLoading &&
              searchResults.length === 0 && (
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
