import { View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

export default function MovieTrailer({ videoUrl }) {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
  });

  return (
    <View className="mt-6 rounded-2xl overflow-hidden">
      <VideoView
        player={player}
        className="w-full h-[220px]"
        contentFit="cover"
        nativeControls
      />
    </View>
  );
}
