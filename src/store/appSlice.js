import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    homeSetting: null,
    user: null,
    token: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.profile = action.payload?.profile || null
    },
    setToken: (state, action) => {
      if (action.payload)
        state.token = action.payload
      else state.token = null
    },
    setHomeSetting: (state, action) => {
      state.homeSetting = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, setHomeSetting, setLoading } = appSlice.actions

export default appSlice.reducer