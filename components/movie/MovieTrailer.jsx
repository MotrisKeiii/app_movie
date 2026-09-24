import { View } from "react-native";

export default function MovieTrailer({ videoUrl }) {
  if (!videoUrl) {
    return null;
  }

  const videoId = videoUrl.split("v=")[1];

  return (
    <View className="mt-6 rounded-2xl overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{
          width: "100%",
          height: 220,
          border: "none",
        }}
        allowFullScreen
      />
    </View>
  );
}
