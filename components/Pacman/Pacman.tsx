import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "../../hooks/useEventListener";
import "./Pacman.scss";
import styled from "styled-components";

const StyledDiv = styled.div`
transition: transform .3s linear;
  transform: translate(
    ${props => props.xPosition}px,
    ${props => props.yPosition}px
  );
`;

const Pacman = props => {
  const speed = 100;
  const xMins = [0, -100];
  const xMaxes = [400, 500];
  const yMins = [0, -100];
  const yMaxes = [400, 500];
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

  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 300);
  }, [downedKey]);

  useEventListener("keyup", keyDownHandler);

  return (
    <div className="Pacman">
      <StyledDiv xPosition={xPosition} yPosition={yPosition} />
    </div>
  );
};

export { Pacman };
