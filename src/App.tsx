import { useState, useEffect, useRef } from "react";
import Ship from "./components/Ship";
import InstructionsBox from "./components/InstructionsBox";

import { useFrameLoop } from "./utils/frameLoop";
import { handleKeyDown, handleKeyUp } from "./utils/keyPresses";
import {
  backgroundColorChanger,
  updateShipDirection,
  updateShipPosition,
  shipReset,
  bounceShipOffWall,
  shipBooster,
} from "./utils/loopFunctions";

import "./App.css";

function App() {
  // constants, state, and refs
  const SHIP_ANGLE_CONSTANT: number = 2;
  const [time, setTime] = useState(0);
  const [deltaTime, setDeltaTime] = useState(0);
  const shipParams = useRef({
    shipAngle: 0,
    shipX: 200,
    shipY: 350,
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
  const [color, setColor] = useState("");
  let nextColor = -1;

  // THE GAME LOOP!
  useFrameLoop((time: number, deltaTime: number) => {
    backgroundColorChanger(time, nextColor, setColor);

    updateShipDirection(
      shipActionFlagsRef,
      shipParams,
      SHIP_ANGLE_CONSTANT,
      deltaTime
    );

    updateShipPosition(shipParams, shipActionFlagsRef, deltaTime);

    shipBooster(shipParams, shipActionFlagsRef);

    bounceShipOffWall(shipParams);

    setTime(time);
    setDeltaTime(deltaTime);
  });

  // KEYDOWN AND KEYUP USEEFFECTS
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

  return (
    <div className="game-container" style={{ background: color }}>
      <Ship shipParams={shipParams} shipActionFlagsRef={shipActionFlagsRef} />
      <nav>
        <button onClick={() => shipReset(shipParams)}>RESET</button>
        <div className="title-container">
          <h1>BEAN SHIP</h1>
        </div>
        <InstructionsBox
          time={time}
          deltaTime={deltaTime}
          shipParams={shipParams}
        />
      </nav>
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
