import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "../../hooks/useEventListener";
import "./Pacman.scss";
import styled from "styled-components";

const StyledDiv = styled.div`
  transform: translate(
    ${props => props.xPosition}px,
    ${props => props.yPosition}px
  );
`;

const Pacman = props => {
  const speed = 10;
  const rightDowned = useRef(false);
  const leftDowned = useRef(false);
  const upDowned = useRef(false);
  const downDowned = useRef(false);

  const [downedKey, setDownedKey] = useState();
  const [upedKey, setUpedKey] = useState();
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);

  const keyDownHandler = ({ key }) => {
    console.log("downed key", key);

    switch (key) {
      case "ArrowRight":
        rightDowned.current = true;
        break;
      case "ArrowLeft":
        leftDowned.current = true;
        break;
      case "ArrowUp":
        upDowned.current = true;
        break;
      case "ArrowDown":
        downDowned.current = true;
        break;
      default:
        console.log("Do nothing");
        return;
    }
  };

  const keyUpHandler = ({ key }) => {
    console.log("uped key", key);

    switch (key) {
      case "ArrowRight":
        rightDowned.current = false;
        break;
      case "ArrowLeft":
        leftDowned.current = false;
        break;
      case "ArrowUp":
        upDowned.current = false;
        break;
      case "ArrowDown":
        downDowned.current = false;
        break;
      default:
        console.log("Do nothing");
        return;
    }
  };

  useEffect(() => {
    console.log("downedKey, upedKey", downedKey, upedKey);
    console.log(rightDowned, leftDowned, upDowned, downDowned);
    console.log(
      rightDowned.current,
      leftDowned.current,
      upDowned.current,
      downDowned.current
    );
  }, [downedKey]);

  const loopPosition = useCallback(() => {
    const interval = setInterval(() => {
      if (rightDowned.current) {
        console.log("while right", rightDowned.current);
        setXPosition(prev => (prev += speed));
      }
      if (leftDowned.current) {
        setXPosition(prev => (prev -= speed));
      }
      if (upDowned.current) {
        setYPosition(prev => (prev -= speed));
      }
      if (downDowned.current) {
        setYPosition(prev => (prev += speed));
      }

      return () => {
        clearInterval(interval);
      };
    }, 500);
  }, []);

  loopPosition();

  useEventListener("keydown", keyDownHandler);
  useEventListener("keyup", keyUpHandler);

  return (
    <div className="Pacman">
      <StyledDiv xPosition={xPosition} yPosition={yPosition} />
    </div>
  );
};

export { Pacman };
