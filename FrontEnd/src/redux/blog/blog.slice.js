import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/backend/blog/blogs`,
  );

  const data = await response.json();

  return data?.data || [];
});

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })

      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
