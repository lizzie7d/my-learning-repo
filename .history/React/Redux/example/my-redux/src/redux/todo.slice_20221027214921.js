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
        const index = state.findIndex(item=>item.id===action.pyload);
        state.splice(index,1);
    }
}
})