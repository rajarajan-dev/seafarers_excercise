import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import mychecklistSlice from "./mychecklistSlice";
import reactotron from "../../ReactotronConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import preDepartureDocSlice from "./preDepartureDocSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, mychecklistSlice);

export const store = configureStore({
  reducer: {
    mycheckList: persistedReducer,
    preDepartureDocList: preDepartureDocSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(thunk),
  enhancers: (getDefaultEnhancers) => {
    const reactotronEnhancer = __DEV__ ? [reactotron.createEnhancer!()] : [];
    return getDefaultEnhancers().concat(reactotronEnhancer);
  },
});

export const persistor = persistStore(store);

// RootState & AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
