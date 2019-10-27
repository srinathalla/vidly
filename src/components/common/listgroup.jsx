import React from "react";

const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelected,
    selectedItem
  } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelected(item)}
          key={item[valueProperty]}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
        >
          {item[valueProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "_id",
  valueProperty: "name"
};

export default ListGroup;
