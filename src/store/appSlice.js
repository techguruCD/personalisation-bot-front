import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    homeSetting: null,
    user: null,
    token: null,
    loading: false,
    isAdmin: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.profile = action.payload?.profile || null
      state.isAdmin = action.payload?.role === 'ADMIN'
    },
    setToken: (state, action) => {
      if (action.payload)
        state.token = action.payload
      else state.token = null
    },
    setHomeSetting: (state, action) => {
      if (state.homeSetting) {
        state.homeSetting = {
          ...state.homeSetting,
          ...action.payload
        }
      } else {
        state.homeSetting = action.payload
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, setHomeSetting, setLoading } = appSlice.actions

export default appSlice.reducer