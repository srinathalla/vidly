import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import TableHeader from "./common/tableheader";
import TableBody from "./common/tablebody";
import authService from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: item => <Link to={"/movies/" + item._id}> {item.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: item => (
        <Like liked={item.liked} onClick={() => this.props.onLike(item)} />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: item => (
      <button
        onClick={() => this.props.onDelete(item)}
        className="bbtn btn-danger btn-sm m-2"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          onSort={onSort}
          sortColumn={sortColumn}
          columns={this.columns}
        />

        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
