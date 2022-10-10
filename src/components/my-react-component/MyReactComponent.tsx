import * as React from "react";
import { FunctionComponent } from "react";

import "./MyReactComponent.scss";

export interface IMyComponentProps {
  counter: number;
  onClick?: () => void;
  customEventCounter: CustomEvent;
}

export const MyReactComponent: FunctionComponent<IMyComponentProps> = (
  props: IMyComponentProps
) => {
  const { counter: propsCounter, onClick, customEventCounter } = props;

  const handleClick = () => {
    window.dispatchEvent(customEventCounter);
    // if (onClick) {
    //   onClick();
    // }
  };

  return (
    <div className={`my-graph-component`}>
      <div className={"comp-props"}>
        Props counter: {propsCounter}
        <span onClick={handleClick} className={"increase-button"}>
          click to increase
        </span>
      </div>
    </div>
  );
};
