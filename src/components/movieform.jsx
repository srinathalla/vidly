import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import Input from "./common/input";
import Select from "./common/select";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],

    errors: {}
  };

  async populateGenres() {
    let { data: genres } = await getGenres();

    this.setState({
      genres
    });
  }

  async populateMovie() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this.populateGenres();
    this.populateMovie();
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  doSubmit = async e => {
    console.log(this.state.data);
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    const { data, errors, genres } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="title"
            onChange={this.handleChange}
            value={data.title}
            label="Title"
            error={errors.title}
          />
          <Select
            name="genreId"
            onChange={this.handleChange}
            value={data.genreId}
            label="Genre"
            error={errors.genreId}
            genres={genres}
          />
          <Input
            name="numberInStock"
            onChange={this.handleChange}
            value={data.numberInStock}
            label="Number in Stock"
            error={errors.numberInStock}
          />
          <Input
            name="dailyRentalRate"
            onChange={this.handleChange}
            value={data.dailyRentalRate}
            label="Daily Rental Rate"
            error={errors.dailyRentalRate}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
