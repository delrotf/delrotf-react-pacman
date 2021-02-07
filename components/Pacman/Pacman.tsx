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
  const speed = 1;
  const xMins = [0, -1];
  const xMaxes = [500, 501];
  const yMins = [0, -1];
  const yMaxes = [500, 501];
  const rightDowned = useRef(false);
  const leftDowned = useRef(false);
  const upDowned = useRef(false);
  const downDowned = useRef(false);

  const [downedKey, setDownedKey] = useState();
  const [upedKey, setUpedKey] = useState();
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);

  const intervalRef = useRef(null);

  const keyDownHandler = ({ key }) => {
    console.log("downed key", key);
    rightDowned.current = false;
    leftDowned.current = false;
    upDowned.current = false;
    downDowned.current = false;
    clearInterval(intervalRef.current);

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

    setDownedKey(key)
  };

  const loopPosition = useEffect(() => {
    const interval = setInterval(() => {
      console.log(
        rightDowned.current,
        leftDowned.current,
        upDowned.current,
        downDowned.current
      );
      if (rightDowned.current) {
        setXPosition(prev => {
          if (!xMaxes.includes(prev)) {
            return (prev += speed);
          } else {
            return prev;
          }
        });
      }
      if (leftDowned.current) {
        setXPosition(prev => {
          if (!xMins.includes(prev)) {
            return (prev -= speed);
          } else {
            return prev;
          }
        });
      }
      if (upDowned.current) {
        setYPosition(prev => {
          if (!yMins.includes(prev)) {
            return (prev -= speed);
          } else {
            return prev;
          }
        });
      }
      if (downDowned.current) {
        setYPosition(prev => {
          if (!yMaxes.includes(prev)) {
            return (prev += speed);
          } else {
            return prev;
          }
        });
      }

      intervalRef.current = interval;

      return () => {
        clearInterval(interval);
      };
    }, 1500);
  }, [downedKey]);

  useEventListener("keydown", keyDownHandler);

  return (
    <div className="Pacman">
      <StyledDiv xPosition={xPosition} yPosition={yPosition} />
    </div>
  );
};

export { Pacman };
