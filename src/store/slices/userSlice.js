import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../App";

const initialState = {
    loading:false,
    users:[],
    error:""
}


// create action
export const createUser = createAsyncThunk("createUser",async(data,{rejectWithValue})=>{
    const {nameVal,emailVal,phoneVal} = data
    const response = await fetch(`${URL}/users`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({nameVal,emailVal,phoneVal}),
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error)
    }
});

// Alldata action
export const getAllUsers = createAsyncThunk('getAllUsers',async(args,{rejectWithValue})=>{
    const response = await fetch(`${URL}/users`);
    try {
        let result = await response.json();
        return result.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

// delete action
export const deleteUser = createAsyncThunk('deleteUser',async(id,{rejectWithValue})=>{
    const response = await fetch(`${URL}/users/${id}`,{method:"DELETE"});
    try {
        let result = await response.json();
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

// singleuser action
export const singleUser = createAsyncThunk('singleUser',async(id,{rejectWithValue})=>{
    const response = await fetch(`${URL}/users/${id}`,{method:"GET"});
    try {
        let result = await response.json();
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

// update user action
export const updateUser = createAsyncThunk('updateUser',async(data,{rejectWithValue})=>{
    const {nameVal,emailVal,phoneVal,user } = data;
    const response = await fetch(`${URL}/users/${data.user}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({nameVal,emailVal,phoneVal,user}),
    });
    try {
        const result = await response.json();
        return result.rewriteUser;
    } catch (error) {
        return rejectWithValue(error)
    }            
})

const userSlice = createSlice({
    name:"user",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(createUser.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(createUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.users.push(action.payload.createUser)
        })
        builder.addCase(createUser.rejected,(state,action)=>{
            state.loading=false;
            state.users = action.payload;
        })
        // getAll Data
        builder.addCase(getAllUsers.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action.payload;
        })
        builder.addCase(getAllUsers.rejected,(state,action)=>{
            state.loading=false;
            state.users = action.payload;
        })
        // delete Data
        builder.addCase(deleteUser.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading = false;
            const {_id} = action.payload.findDeleteUser;
            if(_id){
                state.users= state.users.filter((curEle)=>curEle._id !== _id)
            } 
        })
        builder.addCase(deleteUser.rejected,(state,action)=>{
            state.loading=false;
            state.users = action.payload;
        })
        // single Data
        builder.addCase(singleUser.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(singleUser.fulfilled,(state,action)=>{
            state.loading = false;
            const {_id} = action.payload.singleUser;
            if(_id){
                state.users= state.users.filter((curEle)=>curEle._id === _id)
            } 
        })
        builder.addCase(singleUser.rejected,(state,action)=>{
            state.loading=false;
            state.users = action.payload;
        })
        // update data
        builder.addCase(updateUser.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(updateUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = state.users.map((curEle)=>(
                curEle._id === action.payload._id ? action.payload : curEle
            ))
        })
        builder.addCase(updateUser.rejected,(state,action)=>{
            state.loading=false;
            state.users = action.payload;
        })
    }
})

export default userSlice.reducer;