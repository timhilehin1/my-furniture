import { combineReducers, configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "./slices/wishlistSlice";
import sidebarSlice from "./slices/sidebarSlice";
import authSlice from "./slices/authSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// localStorage so the session survives new tabs; the cart now lives on the server (TanStack Query)
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["wishlist", "auth"],
};

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		wishlist: wishlistSlice,
		sidebar: sidebarSlice,
		auth: authSlice,
	})
);

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

// single app-wide instance, also read outside React by the API client
export const { store, persistor } = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["store"]["getState"]>;
export type AppDispatch = AppStore["store"]["dispatch"];
