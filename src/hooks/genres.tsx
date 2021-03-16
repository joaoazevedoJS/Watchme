import { FC, createContext, useState, useEffect, useCallback, useContext } from "react";
import { api } from "../services/api";

interface GenreProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenresContextData {
  genres: GenreProps[];
  movies: MovieProps[];
  selectedGenre: GenreProps;
  handleSelectedGenreById(id: number): void;
}

const GenresContext = createContext<GenresContextData>({} as GenresContextData);

const GenresProvider: FC = ({ children }) => {
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreProps>({} as GenreProps);

  useEffect(() => {
    api.get<GenreProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  const handleSelectedGenreById = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, [])

  return (
    <GenresContext.Provider value={{ 
      genres, 
      movies,
      selectedGenre,
      handleSelectedGenreById 
    }}>
      {children}
    </GenresContext.Provider>
  )
} 

function useGenres(): GenresContextData {
  const context = useContext(GenresContext);

  if(!context) {
    throw new Error('useGenres must be used within an GenresProvider');
  }

  return context;
}

export { GenresProvider, useGenres };