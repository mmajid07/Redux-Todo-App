import { createSlice } from "@reduxjs/toolkit";

const ShopingAppSlice = createSlice({
  name: "ShoppingSlice",
  initialState: {
    isLogin: false,
    authData: [],
    productData: [],
    search: "",
    cartData: [],
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setAuthData: (state, action) => {
      state.authData = [...state.authData, action.payload];
    },
    setProductData: (state, action) => {
      state.productData = [...state.productData, action.payload];
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCartData: (state, action) => {
      state.cartData = [...state.cartData, action.payload];
    },
  },
});

export const {
  setIsLogin,
  setAuthData,
  setProductData,
  setSearch,
  setCartData,
} = ShopingAppSlice.actions;
export default ShopingAppSlice.reducer;
