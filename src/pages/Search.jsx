import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import TvCard from "../components/TvCard";

const searchURL = import.meta.env.VITE_SEARCH;
const searchTvURL = import.meta.env.VITE_SEARCH_TV;
const apiKey = import.meta.env.VITE_API_KEY;

import "../components/style/Search.css";import SearchCard from "../components/SearchCard";
import SearchTvCard from "../components/SearchTvCard";
;

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };

  const [tv, setTv] = useState([]);
  const queryTv = searchParams.get("q");

  const getSearchedTv = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTv(data.results);
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&language=pt-BR`;
    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  useEffect(() => {
    const searchTvWithQueryURL = `${searchTvURL}?${apiKey}&query=${queryTv}&language=pt-BR`;
    getSearchedTv(searchTvWithQueryURL);
  }, [queryTv]);

  return (
    <div className="containerSearch">
      <h2 className="title">
        Resultados para: <span className="query-text">{(query, queryTv)}</span>
      </h2>
      <div className="movies-containerSearch">
        {movies.length > 0 &&
          movies.map((movie) => <SearchCard key={movie.id} movie={movie} />)}

        {tv.length > 0 &&
          tv.map((series) => <SearchTvCard key={series.id} series={series} />)}
      </div>
    </div>
  );
};

export default Search;
