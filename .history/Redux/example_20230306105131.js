import { createStore } from "redux";

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

let store = createStore(reducer);  // 接受reducer方法作为参数，返回一个store

store.subscribe(()=>console.log(store.getState()));

store.dispatch({type:'PUT_MILK'});
