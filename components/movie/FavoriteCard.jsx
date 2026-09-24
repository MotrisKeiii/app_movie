import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";

export default function FavoriteCard({ movie, onRemove }) {
  return (
    <View className="w-[140px]">
      <Pressable onPress={() => router.push(`/movie/${movie.id}`)}>
        <Image
          source={{ uri: movie.poster }}
          className="w-[140px] h-[210px] rounded-2xl"
          resizeMode="cover"
        />
      </Pressable>

      <Text className="text-white font-bold text-sm mt-2" numberOfLines={1}>
        {movie.title}
      </Text>

      <View className="flex-row items-center mt-1">
        <Text className="text-[#FFB800] text-xs">★ {movie.rating}</Text>

        <Text className="text-[#6B7280] text-xs ml-2">{movie.year}</Text>
      </View>

      <Pressable
        onPress={() => onRemove(movie.id)}
        className="border border-[#2E3342] rounded-lg py-2 mt-2 items-center"
      >
        <Text className="text-[#E50914] text-xs font-bold">Xóa</Text>
      </Pressable>
    </View>
  );
}