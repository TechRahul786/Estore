import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartState",
  initialState: {
    cart: [],
  },
  reducers: {
    addCart: (state, action) => {
      
      const product = action.payload.data;

      console.log(product)

      const exist = state.cart.find((item) => item.id === product.id);

      if (exist) {
        exist.quantity += 1; 
      } else {
        state.cart.push({
          ...product,
          quantity: 1,
          discount: action.payload.discount,
          finalPrice: action.payload.finalPrice,
        });
      }
    
    },

    
    increaseQty: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    deleteCartItem:(state,action) =>{
        const item = state.cart.filter((p)=>(p.id !== action.payload))
        state.cart = item
    },
    emptyCart:(state)=>{
        state.cart=[]
    }
  },
});

export const { addCart, increaseQty, decreaseQty, deleteCartItem ,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;
