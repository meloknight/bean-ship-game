import { ShipParamsType } from "../types";

export default function InstructionsBox(props: {
  time: number;
  deltaTime: number;
  shipParams: ShipParamsType;
}) {
  return (
    <>
      <div className="top-right-container">
        <p>Time [s]: {parseFloat((props.time / 1000).toPrecision(5))}</p>
        <p>deltaTime [ms]: {parseFloat(props.deltaTime.toPrecision(5))}</p>
        <p>
          ship angle [radians]:{" "}
          {parseFloat(props.shipParams.current.shipAngle.toPrecision(3))}
        </p>
        <p>
          shipX [px]:{" "}
          {parseFloat(props.shipParams.current.shipX.toPrecision(3))}
        </p>
        <p>
          shipY [px]:{" "}
          {parseFloat(props.shipParams.current.shipY.toPrecision(3))}
        </p>
        <p>
          shipSpeedX [px/s]:{" "}
          {parseFloat(props.shipParams.current.shipSpeedX.toPrecision(3))}
        </p>
        <p>
          shipSpeedY [px/s]:{" "}
          {parseFloat(props.shipParams.current.shipSpeedY.toPrecision(3))}
        </p>
        <p>
          shipAcceleration [px/s^2]:{" "}
          {parseFloat(props.shipParams.current.shipAcceleration.toPrecision(3))}
        </p>
        <br />
        <h1>Instructions: </h1>
        <p>[w] or [upArrow] = thrusters</p>
        <br />
        <p>[a] and [d] OR [leftArrow] and [rightArrow] = change direction</p>
        <br />
        <p>[spacebar] + thrusters ([w] or [upArrow]) = boosters</p>
        <br />
        <p>Click the Reset button to start from initial position</p>
      </div>
    </>
  );
}
