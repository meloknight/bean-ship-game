import { ShipParamsType, ShipActionFlagsRefType } from "../types";

export default function Ship(props: {
  shipParams: ShipParamsType;
  shipActionFlagsRef: ShipActionFlagsRefType;
}) {
  const shipStyle = {
    transform: `translateX(${props.shipParams.current.shipX}px) translateY(${props.shipParams.current.shipY}px) rotate(${props.shipParams.current.shipAngle}rad)`,
  };
  let shipFlame = "";
  if (
    props.shipActionFlagsRef.current.directionUpIsActive === true &&
    props.shipActionFlagsRef.current.spacebarIsActive === true
  ) {
    shipFlame = "ship-flame-booster";
  } else if (
    props.shipActionFlagsRef.current.directionUpIsActive === true &&
    props.shipActionFlagsRef.current.spacebarIsActive === false
  ) {
    shipFlame = "ship-flame";
  } else {
    shipFlame = "";
  }

  return (
    <>
      <div className="pill-ship" style={shipStyle}>
        <div className={`ship-flame-off  ${shipFlame}`}></div>
      </div>
    </>
  );
}
