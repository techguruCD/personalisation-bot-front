import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    homeSetting: null,
    user: null,
    token: null,
    loading: false,
    isAdmin: false,
    segment: null,
    messages: []
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
      else {
        state.token = null;
        state.user = null;
      }
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
    setSegment: (state, action) => {
      state.segment = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages = [
        ...state.messages,
        action.payload
      ]
    },
    shiftMessage: (state, action) => {
      state.messages = state.messages.slice(0, state.messages.length - 1)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, setHomeSetting, setSegment, setLoading, setMessages, addMessage, shiftMessage } = appSlice.actions

export default appSlice.reducer