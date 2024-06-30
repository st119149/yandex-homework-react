// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setAuthToken, logout } = authSlice.actions;
export default authSlice.reducer;

export const checkAuthToken = () => (dispatch: any) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    dispatch(setAuthToken(token));
  }
};
