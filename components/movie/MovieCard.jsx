import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";

export default function MovieCard({ movie }) {
  return (
    <Pressable
      className="w-[140px]"
      onPress={() => router.push(`/movie/${movie.id}`)}
    >
      <Image
        source={{ uri: movie.poster }}
        className="w-[140px] h-[210px] rounded-2xl"
        resizeMode="cover"
      />

      <Text className="text-white font-bold text-sm mt-2" numberOfLines={1}>
        {movie.title}
      </Text>

      <View className="flex-row items-center mt-1">
        <Text className="text-[#FFB800] text-xs">★ {movie.rating}</Text>

        <Text className="text-[#6B7280] text-xs ml-2">{movie.year}</Text>
      </View>
    </Pressable>
  );
}
