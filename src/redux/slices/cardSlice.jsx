import { createSlice } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';
// import axios from "axios";

const  initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  showCardPopup: false,
  total: JSON.parse(localStorage.getItem('total')) || 0,
  promoSale: 0,

  //items: JSON .parse(localStorage.getItem('cart')),
};


// export const getCars = createAsyncThunk("cars/getCars", async () => {
//     try {
//       console.log(process.env.REACT_APP_PROXY);
//       const { data } = await axios(`${process.env.REACT_APP_PROXY}/cars`);
  
//       return data.data.results;
//     } catch (e) {
//       console.log(e.message);
//     }
//   });

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    showCard: (state, action) => {
        state.showCardPopup = action.payload;
    },
    setPromoSale: (state, action) => {
        state.promoSale = action.payload;
    },
    addToCart: (state, action) => {    
        state.items.push({
          ...action.payload,
          cartItemId: uuidv4()
        });
        state.total = state.items.reduce((sum, obj) => {
          return obj.qty * obj.price + sum;
        }, 0);
        localStorage.setItem('cart', JSON.stringify(state.items));
        localStorage.setItem('total', JSON.stringify(state.total));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.cartItemId !== action.payload);
      state.total = state.items.reduce((sum, obj) => {
        return obj.qty * obj.price + sum;
      }, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('total', JSON.stringify(state.total));
    },
    

 

    plusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.cartItemId === action.payload);
      if (findItem) {
        findItem.qty++;
      }
      state.total = state.items.reduce((sum, obj) => {
        return obj.price * obj.qty + sum;
      }, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('total', JSON.stringify(state.total));
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.cartItemId === action.payload);
      if (findItem) {
        findItem.qty--;
      }
      state.total = state.items.reduce((sum, obj) => {
        return obj.price * obj.qty + sum;
      }, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('total', JSON.stringify(state.total));
    },

    // minusItem: (state, action: PayloadAction<string>) => {
    //   const findItem = state.items.find((obj) => obj.id === action.payload);
    //   if (findItem) {
    //     findItem.count--;
    //   }
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },
   
    // clearItems: (state) => {
    //   state.items = [];
    //   state.totalPrice = 0;
    // },
  },
});



//export const selectTotalPrice = (state) => state.card.totalPrice;
// Action creators are generated for each case reducer function
// export const checkIsAuth = (state) => Boolean(state.auth.showCardPopup);
export const { showCard, addToCart,removeItem, plusItem, minusItem, setPromoSale } = cardSlice.actions;

export default cardSlice.reducer;
