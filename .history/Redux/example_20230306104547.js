import { ceateStore } from "redux";

const initState = {
  milk: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "PUT_MIKE":
      return { ...state, milk: state.milk + action.count };
    case "TAKE_MILK":
      return { ...state, milk: state.milk - action.count };
    default:
      return state;
  }
}
