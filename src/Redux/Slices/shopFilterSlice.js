import { createSlice } from "@reduxjs/toolkit";


const shopFilterSlice = createSlice({
  name:"shopFilterSlice",
  initialState:{
    categoryValue:'',
    petCategoryValue:'',
    subCategoryValue:'',
    salesCategory:false,
    filterByPriceValue:[null, null],
    wishlistToggle:false,
    cartToggle:false,
    reviewValue:'',
    ratingValue:0,
    inCartChanges:false,
    currentPrice:0,
    currentOnSalePrice:0,
    availableColors:[],
    selectedSlideSrc:null,
    isSaleActive : false ,
    otherSaleDurations : '' ,
    fastProductShow:false,
    selectedProductId:'',
    shippingAddress:{
      city:'',
      district:'',
      firstName:'',
      lastName:'',
      address:'',
      additionalAddressInfo:'',
      phoneNumber:'',
      type:''
    },
    checkoutToggle:false
  },
  reducers:{

    
    setCheckoutToggle:(state , action) => {
      state.checkoutToggle = action.payload
    },

    setShippingAddress:(state , action) => {
      state.shippingAddress = action.payload
    },

    setSelectedProductId:(state , action) => {
      state.selectedProductId = action.payload
    },

    setFastProductShow:(state , action) => {
      state.fastProductShow = action.payload
    },
   
    setCategoryValue:(state , action) => {
      state.categoryValue = action.payload
    },

    setPetCategoryValue:(state , action) => {
      state.petCategoryValue = action.payload
    },

    setSubCategoryValue:(state , action) => {
      state.subCategoryValue = action.payload
    },

    setSalesCategory:(state , action) => {
      state.salesCategory = action.payload
    },
    setFilterByPriceValue:(state , action) => {
      state.filterByPriceValue = action.payload
    },

    setWishlistToggle:(state , action) => {
      state.wishlistToggle = action.payload
    },

    setCartToggle:(state , action) => {
      state.cartToggle = action.payload
    },

    setReviewValue:(state , action) => {
      state.reviewValue = action.payload
    },

    setRatingValue:(state , action) => {
      state.ratingValue = action.payload
    },

    setInCartChanges:(state , action) => {
      state.inCartChanges = action.payload
    },

    setCurrentPrice:(state , action) => {
      state.currentPrice = action.payload
    },

    setCurrentOnSalePrice:(state , action) => {
      state.currentOnSalePrice = action.payload
    },

    setAvailableColors:(state , action) => {
      state.availableColors = action.payload
    },

    setSelectedSlideSrc:(state , action) => {
      state.selectedSlideSrc = action.payload
    },

    setIsSaleActive:(state , action) => {
      state.isSaleActive = action.payload
    },

    setOtherSaleDurations:(state , action) => {
      state.otherSaleDurations = action.payload
    },



    



   
  
  }
})

export const {setCategoryValue ,setPetCategoryValue,  setSubCategoryValue , setFilterByPriceValue , setWishlistToggle , setCartToggle , setReviewValue , setRatingValue , setInCartChanges , setSalesCategory , setCurrentPrice, setCurrentOnSalePrice , setAvailableColors , setSelectedSlideSrc , setIsSaleActive , setOtherSaleDurations , setFastProductShow , setSelectedProductId , setShippingAddress ,setCheckoutToggle} = shopFilterSlice.actions
export default shopFilterSlice.reducer