export type ShipParamsType = React.MutableRefObject<{
  shipAngle: number;
  shipX: number;
  shipY: number;
  shipSpeedX: number;
  shipSpeedY: number;
  shipAcceleration: number;
}>;

export type ShipActionFlagsRefType = React.MutableRefObject<{
  directionLeftIsActive: boolean;
  directionRightIsActive: boolean;
  directionUpIsActive: boolean;
  directionDownIsActive: boolean;
  spacebarIsActive: boolean;
}>;

export type previousTimeType = React.MutableRefObject<number | undefined>;
