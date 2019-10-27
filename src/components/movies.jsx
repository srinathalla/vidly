import React, { Component } from "react";
import { toast } from "react-toastify";

import { getMovies, deleteMovie } from "../services/movieService";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listgroup";
import { Link } from "react-router-dom";
import SearchBox from "./searchbox";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    currentPage: 1,
    selectedGenre: {},
    searchQuery: ""
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    let allgenres = [{ name: "All Genres" }, ...genres];

    const { data: movies } = await getMovies();
    this.setState({
      movies: movies,
      genres: allgenres
    });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
        console.log(404);
      }

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const idx = movies.indexOf(movie);
    movies[idx] = { ...movies[idx] };
    movies[idx].liked = !movies[idx].liked;

    this.setState({ movies });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleItemSelect = item => {
    this.setState({ selectedGenre: item, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  sortMovies = movies => {
    if (movies.length <= 1) return;

    const { sortColumn } = this.state;
    const isNumeric = Number.isSafeInteger(movies[0][sortColumn.path]);

    if (isNumeric) {
      movies.sort((a, b) =>
        sortColumn.order === "asc"
          ? a[sortColumn.path] - b[sortColumn.path]
          : b[sortColumn.path] - a[sortColumn.path]
      );
      return;
    }

    movies.sort((a, b) => {
      const path = sortColumn.path.split(".");
      let aProperty =
        path.length === 1 ? a[sortColumn.path] : a[path[0]][path[1]];
      let bProperty =
        path.length === 1 ? b[sortColumn.path] : b[path[0]][path[1]];

      if (aProperty.toLowerCase() < bProperty.toLowerCase()) {
        return sortColumn.order === "asc" ? -1 : 1;
      } else if (aProperty.toLowerCase() > bProperty.toLowerCase()) {
        return sortColumn.order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  render() {
    const movieCount = this.state.movies.length;
    if (movieCount === 0) return <p>No Movies in the database</p>;

    const {
      movies,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      searchQuery,
      sortColumn
    } = this.state;

    const { user } = this.props;

    let moviesFilteredByGenre = movies;

    if (searchQuery) {
      moviesFilteredByGenre = movies.filter(movie =>
        movie.title.toLowerCase().startsWith(searchQuery)
      );
    }
    if (selectedGenre && selectedGenre._id) {
      moviesFilteredByGenre = movies.filter(
        movie => movie.genre._id === selectedGenre._id
      );
    }

    this.sortMovies(moviesFilteredByGenre);

    const currPageMovies = paginate(
      moviesFilteredByGenre,
      currentPage,
      pageSize
    );

    return (
      <div className="row">
        <div className="col-2 m-4">
          <ListGroup
            items={genres}
            onItemSelected={this.handleItemSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              className="btn btn-primary"
              to="/movies/new"
              style={{ marginBottom: 20, marginTop: 20 }}
            >
              New Movie
            </Link>
          )}
          <p style={{ marginBottom: 20, marginTop: 20 }}>
            {" "}
            No of movies in the database {moviesFilteredByGenre.length}{" "}
          </p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />

          <MoviesTable
            movies={currPageMovies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={moviesFilteredByGenre.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
