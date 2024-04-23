import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../redux/slices/tasks";



const store = configureStore({
    reducer: {
        tasks: tasksReducer,
  
      
    }
});
export default store;