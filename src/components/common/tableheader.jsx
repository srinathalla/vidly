import React, { Component } from "react";

// onSort, sortColumn,columns
class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      sortColumn.path = path;
    } else {
      sortColumn.order = "asc";
      sortColumn.path = path;
    }

    this.props.onSort(sortColumn);
  };

  renderColumn = column => {
    const { sortColumn } = this.props;

    if (column !== sortColumn.path) return null;

    return sortColumn.order === "asc" ? (
      <i className="fa fa-sort-asc" />
    ) : (
      <i className="fa fa-sort-desc" />
    );
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.path || column.key}
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderColumn(column.path)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
