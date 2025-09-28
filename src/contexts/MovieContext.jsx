import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext(null);
const LS_KEY = "movieapp:favorites:v1";

// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => useContext(MovieContext);

const readFromLS = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const MovieProvider = ({ children }) => {
  // Load once from localStorage
  const [favorites, setFavorites] = useState(readFromLS);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn("Couldn't persist favorites", e);
    }
  }, [favorites]);

  // Keep multiple tabs in sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === LS_KEY) {
        try {
          setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
          // eslint-disable-next-line no-empty
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addToFavorites = (movie) =>
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );

  const removeFromFavorites = (movieId) =>
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));

  const isFavorite = (movieId) => favorites.some((m) => m.id === movieId);

  const clearFavorites = () => setFavorites([]);

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
