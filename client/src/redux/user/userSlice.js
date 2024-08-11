import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  imageLoading: false,
};

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Error during login."
      );
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/signup", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Error during registration."
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/me");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch user data."
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/user/updateProfile", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to update user data."
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete("/api/user/deleteAccount");
      return;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to delete user account."
      );
    }
  }
);

export const uploadPhoto = createAsyncThunk(
  "user/uploadPhoto",
  async ({ url, type }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/uploadPhoto", {
        photoUrl: url,
        type,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to upload photo."
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.currentUser = null;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(uploadPhoto.pending, (state) => {
        state.imageLoading = true;
        state.error = null;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.imageLoading = false;
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.error = action.payload;
        state.imageLoading = false;
      });
  },
});

export const { signOutSuccess } = userSlice.actions;
export default userSlice.reducer;
