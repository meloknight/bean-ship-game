import { useState, useEffect, useRef } from "react";
import { useFrameLoop } from "./utils/frameLoop";
// import viteLogo from "./assets/sprites/vite.svg";
// import testShip from "./assets/sprites/test.svg";
import "./App.css";

function App() {
  // CONSTANTS
  const SHIP_ANGLE_CONSTANT: number = 0.1;

  const [time, setTime] = useState(0);
  const [deltaTime, setDeltaTime] = useState(0);

  const shipParams = useRef({
    shipAngle: 0,
    shipX: 600,
    shipY: 200,
    shipSpeedX: 0,
    shipSpeedY: 0,
    shipAcceleration: 200,
  });

  const shipActionFlagsRef = useRef({
    directionLeftIsActive: false,
    directionRightIsActive: false,
    directionUpIsActive: false,
    directionDownIsActive: false,
    spacebarIsActive: false,
  });

  // for the background color change animation
  const [color, setColor] = useState("");
  let nextColor = -1;

  useFrameLoop((time: number, deltaTime: number) => {
    // logic
    if (time > nextColor) {
      nextColor = time + 2000;
      setColor("#" + Math.floor(Math.random() * 16777215).toString(16));
    }

    // update the angle the ship is facing
    if (shipActionFlagsRef.current.directionRightIsActive) {
      if (shipParams.current.shipAngle + SHIP_ANGLE_CONSTANT >= 2 * Math.PI) {
        shipParams.current.shipAngle = 0;
      } else {
        shipParams.current.shipAngle += SHIP_ANGLE_CONSTANT;
      }
    }
    if (shipActionFlagsRef.current.directionLeftIsActive) {
      if (shipParams.current.shipAngle - SHIP_ANGLE_CONSTANT <= 0) {
        shipParams.current.shipAngle = 2 * Math.PI;
      } else {
        shipParams.current.shipAngle -= SHIP_ANGLE_CONSTANT;
      }
    }

    const unitY = Math.sin(shipParams.current.shipAngle);
    const unitX = Math.cos(shipParams.current.shipAngle);
    let accelX = 0;
    let accelY = 0;

    // update the velocity when the ship is accelerating
    if (shipActionFlagsRef.current.directionUpIsActive) {
      accelX = unitX * shipParams.current.shipAcceleration;
      accelY = unitY * shipParams.current.shipAcceleration;

      shipParams.current.shipSpeedX +=
        unitX * shipParams.current.shipAcceleration * (deltaTime / 1000);
      shipParams.current.shipSpeedY +=
        unitY * shipParams.current.shipAcceleration * (deltaTime / 1000);
    }

    shipParams.current.shipX +=
      shipParams.current.shipSpeedX * (deltaTime / 1000) +
      0.5 * accelX * (deltaTime / 1000) ** 2;

    shipParams.current.shipY +=
      shipParams.current.shipSpeedY * (deltaTime / 1000) +
      0.5 * accelY * (deltaTime / 1000) ** 2;

    setTime(time);
    setDeltaTime(deltaTime);
  });

  const handleKeyDown = (event: any) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
      shipActionFlagsRef.current.directionLeftIsActive = true;
    } else if (event.key === "ArrowRight" || event.key === "d") {
      shipActionFlagsRef.current.directionRightIsActive = true;
    } else if (event.key === "ArrowUp" || event.key === "w") {
      shipActionFlagsRef.current.directionUpIsActive = true;
    } else if (event.key === "ArrowDown" || event.key === "s") {
      shipActionFlagsRef.current.directionDownIsActive = true;
    } else if (event.key === " ") {
      shipActionFlagsRef.current.spacebarIsActive = true;
    }
  };

  const handleKeyUp = (event: any) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
      shipActionFlagsRef.current.directionLeftIsActive = false;
    } else if (event.key === "ArrowRight" || event.key === "d") {
      shipActionFlagsRef.current.directionRightIsActive = false;
    } else if (event.key === "ArrowUp" || event.key === "w") {
      shipActionFlagsRef.current.directionUpIsActive = false;
    } else if (event.key === "ArrowDown" || event.key === "s") {
      shipActionFlagsRef.current.directionDownIsActive = false;
    } else if (event.key === " ") {
      shipActionFlagsRef.current.spacebarIsActive = false;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  function Ship() {
    const shipStyle = {
      transform: `translateX(${shipParams.current.shipX}px) translateY(${shipParams.current.shipY}px) rotate(${shipParams.current.shipAngle}rad)`,
    };

    return (
      <>
        {/* <img
          src={viteLogo}
          className="logo vite-ship"
          alt="Vite logo"
          style={{ transform: `rotate(${shipParams.current.shipAngle}deg)` }}
        /> */}
        {/* <img
          src={testShip}
          style={{
            height: 100,
            transform: `rotate(${shipParams.current.shipAngle}deg)`,
          }}
        /> */}
        <div className="filler-ship" style={shipStyle}>
          <div
            className={`ship-flame-off ${
              shipActionFlagsRef.current.directionUpIsActive === true
                ? "ship-flame"
                : ""
            }`}
          ></div>
        </div>
      </>
    );
  }

  return (
    <div className="game-container" style={{ background: color }}>
      <Ship />
      <div className="top-left-container">
        <p>Time:</p>
        <p>{time}</p>
        <p>deltaTime:</p>
        <p>{deltaTime}</p>
        <p>shipAngle: {shipParams.current.shipAngle}</p>
        <p>shipX: {shipParams.current.shipX}</p>
        <p>shipY: {shipParams.current.shipY}</p>
        <p>shipSpeedX: {shipParams.current.shipSpeedX}</p>
        <p>shipSpeedY: {shipParams.current.shipSpeedY}</p>
        <p>shipAcceleration: {shipParams.current.shipAcceleration}</p>
      </div>
      <div className="card">
        <button>ShipAngle is {shipParams.current.shipAngle}</button>
      </div>
    </div>
  );
}

export default App;
