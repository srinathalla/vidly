import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 30 },
      { id: 4, value: 40 }
    ]
  };
  render() {
    return (
      <div>
        {this.state.counters.map(c => (
          <Counter key={c.id} value={c.value} />
        ))}
      </div>
    );
  }
}

export default Counters;
