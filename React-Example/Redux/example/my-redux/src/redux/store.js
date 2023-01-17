import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "./todo.slice";

export default configureStore({
    reducer: {
        todos: todoReducer
        // ... 其他的 reducer
    }
});

//ConfigureStore函数接收一个配置redux的对象作为参数 
// reducer必选参数，可以是一个reducer函数，也可以是一个由slice reducer构成的对象
