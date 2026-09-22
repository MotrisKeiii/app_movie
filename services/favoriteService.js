import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@cineflix_favorites";

export async function getFavorites() {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);

  return data ? JSON.parse(data) : [];
}

export async function addFavorite(movie) {
  const favorites = await getFavorites();

  const exists = favorites.some((item) => item.id === movie.id);

  if (!exists) {
    favorites.push(movie);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export async function removeFavorite(movieId) {
  const favorites = await getFavorites();

  const newFavorites = favorites.filter((movie) => movie.id !== movieId);

  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
}
