import { createSlice } from "@reduxjs/toolkit";
import AuthService from "@/services/auth.service";

const initialState: any = {
  currentUser: AuthService.getCurrentUser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
