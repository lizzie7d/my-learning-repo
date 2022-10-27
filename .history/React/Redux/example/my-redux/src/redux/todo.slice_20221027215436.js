import { createSlice } from "@reduxjs/toolkit";

const initialState=[];

//创建Slice对象
const todoSlice = createSlice({
name:'todo',
initialState,
//相当于原来reducer中的case
reducers:{
    addTodo:(state, action)=>{
        state.push(action.payload);
    },
    delTodo:(state,action)=>{
        const index = state.findIndex(item=>item.id===action.payload);
        state.splice(index,1);
    }
}
});
// 官方推荐使用es6解构和导出语法
// 提取action creator对象与reducer函数
const {reducer, actions}=todoSlice;

export const {addTodo, delTodo}=actions;
export default reducer;