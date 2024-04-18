import { useState, useEffect, useRef } from "react";
import { useFrameLoop } from "./utils/frameLoop";
import { handleKeyDown, handleKeyUp } from "./utils/keyPresses";
import {
  backgroundColorChanger,
  updateShipDirection,
  updateShipPosition,
  shipReset,
  bounceShipOffWall,
} from "./utils/loopFunctions";
import "./App.css";

function App() {
  const SHIP_ANGLE_CONSTANT: number = 0.1;
  const [time, setTime] = useState(0);
  const [deltaTime, setDeltaTime] = useState(0);
  const shipParams = useRef({
    shipAngle: 0,
    shipX: 200,
    shipY: 350,
    shipSpeedX: 0,
    shipSpeedY: 0,
    shipAcceleration: 100,
  });
  const shipActionFlagsRef = useRef({
    directionLeftIsActive: false,
    directionRightIsActive: false,
    directionUpIsActive: false,
    directionDownIsActive: false,
    spacebarIsActive: false,
  });
  const [color, setColor] = useState("");
  let nextColor = -1;

  // THE BIG LOOP!
  useFrameLoop((time: number, deltaTime: number) => {
    backgroundColorChanger(time, nextColor, setColor);

    updateShipDirection(shipActionFlagsRef, shipParams, SHIP_ANGLE_CONSTANT);

    updateShipPosition(shipParams, shipActionFlagsRef, deltaTime);
    console.log(window.innerWidth);

    bounceShipOffWall(shipParams);

    setTime(time);
    setDeltaTime(deltaTime);
  });

  useEffect(() => {
    document.addEventListener("keydown", () =>
      handleKeyDown(event, shipActionFlagsRef)
    );
    return () => {
      document.removeEventListener("keydown", () =>
        handleKeyDown(event, shipActionFlagsRef)
      );
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", () =>
      handleKeyUp(event, shipActionFlagsRef)
    );
    return () => {
      document.removeEventListener("keyup", () =>
        handleKeyUp(event, shipActionFlagsRef)
      );
    };
  }, []);

  function Ship() {
    const shipStyle = {
      transform: `translateX(${shipParams.current.shipX}px) translateY(${shipParams.current.shipY}px) rotate(${shipParams.current.shipAngle}rad)`,
    };
    return (
      <>
        <div className="pill-ship" style={shipStyle}>
          <div
            // ref={shipElementRef}
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
        <p>{parseFloat(time.toPrecision(5))}</p>
        <p>deltaTime:</p>
        <p>{parseFloat(deltaTime.toPrecision(5))}</p>
        <p>
          shipAngle: {parseFloat(shipParams.current.shipAngle.toPrecision(3))}
        </p>
        <p>shipX: {parseFloat(shipParams.current.shipX.toPrecision(3))}</p>
        <p>shipY: {parseFloat(shipParams.current.shipY.toPrecision(3))}</p>
        <p>
          shipSpeedX: {parseFloat(shipParams.current.shipSpeedX.toPrecision(3))}
        </p>
        <p>
          shipSpeedY: {parseFloat(shipParams.current.shipSpeedY.toPrecision(3))}
        </p>
        <p>
          shipAcceleration:{" "}
          {parseFloat(shipParams.current.shipAcceleration.toPrecision(3))}
        </p>
        <button onClick={() => shipReset(shipParams)}>RESET</button>
      </div>
    </div>
  );
}

export default App;

// REMOVED BUT WANT TO KEEP FOR INFO PURPOSES

// STAR FLARE STUFF
// const STAR_FLARE_ROTATION_CONSTANT: number = 0.01;
// const starFlareParams = useRef({
//   objectX: 300,
//   objectY: 400,
//   objectAngle: 0,
// });
// function updateStarFlareDirection(
//   isRotating: boolean,
//   starFlareParams: any,
//   rotationConstant: number = 0
// ) {
//   if (isRotating === true) {
//     starFlareParams.current.objectAngle += rotationConstant;
//   }
// }
// updateStarFlareDirection(true, starFlareParams, STAR_FLARE_ROTATION_CONSTANT);

// function StarFlare() {
//   const starFlareStyle = {
//     top: starFlareParams.current.objectY,
//     left: starFlareParams.current.objectX,
//     transform: `rotate(${starFlareParams.current.objectAngle}rad)`,
//   };
//   return (
//     <>
//       <div style={starFlareStyle} className="star-flare-container"></div>
//     </>
//   );
// }
