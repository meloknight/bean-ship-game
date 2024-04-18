export function backgroundColorChanger(
  time: number,
  nextColor: any,
  setColor: any
) {
  if (time > nextColor) {
    nextColor = time + 2000;
    setColor("#" + Math.floor(Math.random() * 16777215).toString(16));
  }
}

export function updateShipDirection(
  shipActionFlagsRef: any,
  shipParams: any,
  SHIP_ANGLE_CONSTANT: number
) {
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
}

export function updateShipPosition(
  shipParams: any,
  shipActionFlagsRef: any,
  deltaTime: number
) {
  const unitY = Math.sin(shipParams.current.shipAngle);
  const unitX = Math.cos(shipParams.current.shipAngle);
  let accelX = 0;
  let accelY = 0;
  const shipSpeedLimit: number = 550;

  // update the velocity when the ship is accelerating
  if (shipActionFlagsRef.current.directionUpIsActive) {
    accelX = unitX * shipParams.current.shipAcceleration;
    accelY = unitY * shipParams.current.shipAcceleration;

    if (
      shipParams.current.shipSpeedX <= shipSpeedLimit &&
      shipParams.current.shipSpeedX >= -shipSpeedLimit
    ) {
      shipParams.current.shipSpeedX +=
        unitX * shipParams.current.shipAcceleration * (deltaTime / 1000);
    } else if (shipParams.current.shipSpeedX > shipSpeedLimit) {
      shipParams.current.shipSpeedX = shipSpeedLimit;
    } else {
      shipParams.current.shipSpeedX = -shipSpeedLimit;
    }

    if (
      shipParams.current.shipSpeedY <= shipSpeedLimit &&
      shipParams.current.shipSpeedY >= -shipSpeedLimit
    ) {
      shipParams.current.shipSpeedY +=
        unitY * shipParams.current.shipAcceleration * (deltaTime / 1000);
    } else if (shipParams.current.shipSpeedY > shipSpeedLimit) {
      shipParams.current.shipSpeedY = shipSpeedLimit;
    } else {
      shipParams.current.shipSpeedY = -shipSpeedLimit;
    }
  }

  shipParams.current.shipX +=
    shipParams.current.shipSpeedX * (deltaTime / 1000) +
    0.5 * accelX * (deltaTime / 1000) ** 2;

  shipParams.current.shipY +=
    shipParams.current.shipSpeedY * (deltaTime / 1000) +
    0.5 * accelY * (deltaTime / 1000) ** 2;
}

export function shipReset(shipParams: any) {
  shipParams.current.shipAngle = 0;
  shipParams.current.shipX = 200;
  shipParams.current.shipY = 350;
  shipParams.current.shipSpeedX = 0;
  shipParams.current.shipSpeedY = 0;
  shipParams.current.shipAcceleration = 200;
}

export function bounceShipOffWall(shipParams: any) {
  if (
    shipParams.current.shipX >= window.innerWidth - 16 ||
    shipParams.current.shipX <= 0
  ) {
    shipParams.current.shipSpeedX *= -1;
  }
  if (
    shipParams.current.shipY >= window.innerHeight - 16 ||
    shipParams.current.shipY <= 0
  ) {
    shipParams.current.shipSpeedY *= -1;
  }
}

export function shipBooster(shipParams: any, shipActionFlagsRef: any) {
  if (shipActionFlagsRef.current.spacebarIsActive === true) {
    shipParams.current.shipAcceleration = 600;
  } else {
    shipParams.current.shipAcceleration = 200;
  }
}
