import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: this.props.value,
    tags: ["t1", "t2", "t3"]
  };

  styles = {
    fontSize: 20,
    fontWeight: "bold"
  };

  render() {
    return (
      <div className="row">
        <div className="col-1">
          <span style={this.styles} className="badge badge-primary m-2">
            {this.formartCount()}
          </span>
        </div>
        <div className="col">
          <button
            onClick={() => this.setState({ count: this.state.count + 1 })}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => this.setState({ count: this.state.count - 1 })}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.state.count === 0}
          >
            -
          </button>

          <button className="btn btn-danger btn-sm m-2"> Delete</button>
        </div>
      </div>
    );
  }

  formartCount() {
    return this.state.count === 0 ? "Zero" : this.state.count;
  }
}

export default Counter;
