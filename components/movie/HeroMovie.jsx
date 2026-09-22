import { View, Text, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function HeroMovie({ movie }) {
  return (
    <View className="h-[420px] rounded-2xl overflow-hidden">
      <Image
        source={{ uri: movie.backdrop }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <LinearGradient
        colors={["transparent", "#0F1017"]}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
        <Text className="text-white text-3xl font-bold">{movie.title}</Text>

        <View className="flex-row items-center mt-2">
          <Text className="text-[#FFB800]">★ {movie.rating}</Text>

          <Text className="text-white ml-3">{movie.year}</Text>

          <Text className="text-white ml-3">{movie.genre}</Text>
        </View>

        <Pressable
          onPress={() => router.push(`/movie/${movie.id}`)}
          className="bg-[#E50914] px-5 py-3 rounded-xl mt-4 self-start"
        >
          <Text className="text-white font-bold">Xem phim</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}
