import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const  initialState = {
  items: [],
  isLoaded: false,
  currentCat: 1 ,
  featureItems: [],
  activeCats: [],
  subCats: [],
  pageCat: null
     //items: JSON .parse(localStorage.getItem('cart')),
};


export const getProducts = createAsyncThunk("products/getProducts", async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/getProducts`);
      
      return data;
    } catch (e) {
      console.log(e.message);
    }
  });
export const getFeatureProducts = createAsyncThunk("products/getFeatureProducts", async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/getFeatureProducts`);
     
      return data;
    } catch (e) {
      console.log(e.message);
    }
  });

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    showCard: (state, action) => {
        state.showCardPopup = action.payload;
    },
    setCurrentCat: (state, action) => {
        state.currentCat = action.payload;
    },
    clearActiveCats: (state, action) => {
      state.activeCats = [];
    },
    setActiveCats: (state, action) => {
        state.activeCats = [...state.activeCats, action.payload];
    },
    plusActiveCat: (state, action) => {
      if(action.payload.catId == 1){
        state.activeCats = [1];
        return;
      }
      state.activeCats = [...state.activeCats, parseInt(action.payload.catId) ].filter(obj => obj !== 1);
    },
    minusActiveCat: (state, action) => {
      if(state.activeCats.length === 1 ){
        state.activeCats = [];
      }else{
        state.activeCats = state.activeCats.filter(obj=> obj !== action.payload.catId);
      }
      
    },



    setSubCats: (state, action) => {
     
      state.subCats = action.payload;
    },
    plusSubCat: (state, action) => {
     
      if(action.payload.catId == 1){
        state.subCats = [1];
        return;
      }
      state.subCats = [...state.subCats, parseInt(action.payload.catId) ].filter(obj => obj !== 1);
    },
    minusSubCat: (state, action) => {
      state.subCats = state.subCats.filter(obj=> obj !== action.payload.catId);
    },


    setPageCat: (state, action) => {
      state.pageCat = action.payload;
    },


    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },

    // plusItem: (state, action: PayloadAction<string>) => {
    //   const findItem = state.items.find((obj) => obj.id === action.payload);
    //   if (findItem) {
    //     findItem.count++;
    //   }
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },

    // minusItem: (state, action: PayloadAction<string>) => {
    //   const findItem = state.items.find((obj) => obj.id === action.payload);
    //   if (findItem) {
    //     findItem.count--;
    //   }
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },
    // removeItem: (state, action: PayloadAction<string>) => {
    //   state.items = state.items.filter((obj) => obj.id !== action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },
    // clearItems: (state) => {
    //   state.items = [];
    //   state.totalPrice = 0;
    // },
  },
  extraReducers: {
    //getTree
    [getProducts.pending]: (state) => {
      state.items = [];
      state.isLoaded = false;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoaded = true;
    },
    [getProducts.rejected]: (state, action) => {},

    [getFeatureProducts.pending]: (state) => {
      state.featureItems = [];
    },
    [getFeatureProducts.fulfilled]: (state, action) => {
      state.featureItems = action.payload;
    },
    [getFeatureProducts.rejected]: (state, action) => {},

  },
});



//export const selectTotalPrice = (state) => state.card.totalPrice;
// Action creators are generated for each case reducer function
export const { showCard, setCurrentCat, plusActiveCat, minusActiveCat, setPageCat, setActiveCats, setSubCats, plusSubCat, minusSubCat, clearActiveCats } = productsSlice.actions;

export default productsSlice.reducer;
