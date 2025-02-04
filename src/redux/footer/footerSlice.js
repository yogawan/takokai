import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api/api';

export const fetchFooterContent = createAsyncThunk(
  'footer/fetchFooterContent',
  async () => {
    const response = await api.get('/footer.json');
    return response.data.footer; 
  }
);

const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    footers: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooterContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFooterContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.footers = action.payload;
      })
      .addCase(fetchFooterContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default footerSlice.reducer;
