import React from "react";
import { useEventListener } from "../../hooks/useEventListener";
import { Pacman } from "../Pacman/Pacman";
import "./Main.scss";

const Main = props => {

  return (
    <div className="pacman-container">
      <Pacman />
    </div>
  );
};

export { Main };
