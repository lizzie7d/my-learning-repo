//  common type
type Props = {
  //function that doesn't take or return anything
  OnClick: () => void;

  //function with named prop
  onChange: (id: string) => void;
};
