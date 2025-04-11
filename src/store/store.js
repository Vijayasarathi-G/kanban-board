import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "./kanbanSlice";

const store = configureStore({
    reducer: {
        kanban: kanbanReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
