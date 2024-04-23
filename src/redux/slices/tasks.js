import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../components/axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const { data } = await axios.get(`/tasks`);
  return data;
});

export const createTasks = createAsyncThunk("tasks/createTasks", async (newTask) => {
  const { data } = await axios.post(`/tasks`, newTask, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return data;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (_id, { getState }) => {
    const state = getState();
    const filteredTasks = state.tasks.items.filter(task => task._id !== _id);
    try {
        await axios.delete(`/tasks/${_id}`);
        return filteredTasks;
    } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        throw error;
    }
});

export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, title}) => {
    const response = await axios.put(`/tasks/${id}`, { title});
    return response.data;
});




export const createSubtask = createAsyncThunk("tasks/createSubtask", async ({ taskId, subtask }) => {
  const { data } = await axios.post(`/tasks/${taskId}/subtasks`, subtask, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return data;
});

const initialState = {
  tasks: {
    items: [],
    status: "loading",
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.items = [];
        state.status = "error";
      })
      .addCase(createTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTasks.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "loaded";
      })
      .addCase(createTasks.rejected, (state) => {
        state.status = "error";
      })
      .addCase(createSubtask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
            (item) => item._id !== action.meta.arg)
    })
    
    
      .addCase(deleteTask.rejected, (state) => {
        state.status = "error";
      })
      // Добавляем обработчик для успешного обновления задачи
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTaskIndex = state.items.findIndex(task => task._id === action.payload._id);
        if (updatedTaskIndex !== -1) {
            state.items[updatedTaskIndex] = action.payload;
        }
    })
      .addCase(createSubtask.fulfilled, (state, action) => {
        const { taskId, subtask } = action.payload;
        const taskIndex = state.items.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          state.items[taskIndex].subtasks.push(subtask);
          state.status = "loaded";
        }
      })
      .addCase(createSubtask.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const tasksReducer = taskSlice.reducer;
