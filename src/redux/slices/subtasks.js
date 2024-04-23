// // subtasks.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk для отримання підзадач
// export const fetchSubtasks = createAsyncThunk('subtasks/fetchSubtasks', async (taskId) => {
//   const response = await axios.get(`/tasks/${taskId}/subtasks`);
//   return response.data;
// });

// // Async thunk для створення нової підзадачі
// export const createSubtask = createAsyncThunk('subtasks/createSubtask', async ({ taskId, subtask }) => {
//   const response = await axios.post(`/tasks/${taskId}/subtasks`, subtask);
//   return response.data;
// });

// const initialState = {
//   subtasks: [],
//   status: 'idle',
//   error: null,
// };

// const subtasksSlice = createSlice({
//   name: 'subtasks',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSubtasks.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchSubtasks.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.subtasks = action.payload;
//       })
//       .addCase(fetchSubtasks.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(createSubtask.fulfilled, (state, action) => {
//         state.subtasks.push(action.payload);
//       });
//   },
// });

// export const  subTasksReducer = subtasksSlice.reducer;
