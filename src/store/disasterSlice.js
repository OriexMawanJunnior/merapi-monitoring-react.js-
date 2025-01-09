import { createSlice } from '@reduxjs/toolkit';

const disasterSlice = createSlice({
  name: 'disaster',
  initialState: {
    disasters: [],
    error: null
  },
  reducers: {
    setDisasters: (state, action) => {
      state.disasters = action.payload;
      state.error = null;
    },
    addDisaster: (state, action) => {
      state.disasters.push(action.payload);
    },
    updateDisaster: (state, action) => {
      const index = state.disasters.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.disasters[index] = action.payload;
      }
    },
    deleteDisaster: (state, action) => {
      state.disasters = state.disasters.filter(d => d.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setDisasters,
  addDisaster,
  updateDisaster,
  deleteDisaster,
  setError
} = disasterSlice.actions;

export default disasterSlice.reducer;