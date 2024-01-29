import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    setting: null,
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
    setSetting: (state, action) => {
      state.setting = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, setSetting, setLoading } = appSlice.actions

export default appSlice.reducer