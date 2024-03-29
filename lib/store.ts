import { combineReducers, configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "./slices/wishlistSlice";
import cartSlice from "./slices/cartSlice";
import sidebarSlice from "./slices/sidebarSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
  } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
	key: 'root',
	storage: storageSession,
  };
  
  const persistedReducer = persistReducer(persistConfig, combineReducers({
	wishlist: wishlistSlice,
	cart: cartSlice,
	sidebar: sidebarSlice
  }));
  
  

export const makeStore = () => {
	const store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
		  serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		  },
		}),
	});
	const persistor = persistStore(store);
	return { store, persistor };
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["store"]["getState"]>;
export type AppDispatch = AppStore["store"]["dispatch"];
