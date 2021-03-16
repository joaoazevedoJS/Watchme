import { FC } from "react"

import { Button } from './Button';

import '../styles/sidebar.scss';
import { useGenres } from "../hooks/genres";

export const SideBar: FC = () => {
  const { genres, selectedGenre, handleSelectedGenreById } = useGenres();

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              id={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleSelectedGenreById(genre.id)}
              selected={selectedGenre.id === genre.id}
            />
          ))}
        </div>
      </nav>
  )
}