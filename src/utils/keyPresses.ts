const handleKeyDown = (event: any, shipActionFlagsRef: any) => {
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

const handleKeyUp = (event: any, shipActionFlagsRef: any) => {
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

export { handleKeyDown, handleKeyUp };
