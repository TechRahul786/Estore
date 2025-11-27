import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name:'navController',
    initialState:{
        mob:false,
        allcategory:false,
        cart:false,
        profileMenu:false,
    },
    reducers:{
        linkActive:(state)=>{
            state.mob = !state.mob
            console.log(state.mob)
        },

        allcategory:(state)=>{
            state.allcategory = !state.allcategory
        },

        cartActive:(state,action)=>{
            
            state.cart = action.payload
        },

        profileMenuActive:(state)=>{
            state.profileMenu =   !state.profileMenu 
        }

    }
})    


export const {linkActive,allcategory,cartActive,profileMenuActive} = navSlice.actions
export default navSlice.reducer