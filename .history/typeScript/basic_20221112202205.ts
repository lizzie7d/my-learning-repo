import React from "react";
//  common type
type Props = {
  //function that doesn't take or return anything
  OnClick: () => void;

  //function with named prop
  onChange: (id: string) => void;
};

// useful react prop type examples
export declare interface AppProps {
  children?: React.ReactNode;
}

//within ts, React.Component aka React.Component<PropType, StateType>
