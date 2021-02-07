import React, { Component } from "react";
import { render } from "react-dom";
import { Main } from "./components/Main/Main";
import "./style.css";

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
      <Main/>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
