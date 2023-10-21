import { configureStore, Reducer, ReducersMapObject, ThunkMiddleware } from "@reduxjs/toolkit";
import { EnhancedStore, ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { AxiosInstance } from "axios";
import { conferencesReducer, ConferencesState } from "entities/conference/model/ConferenceSlice";
import { $api } from "shared/api/$api";
import { createReducerManager, ReducerManager } from "./managers/reducerManager";

const rootReducer: ReducersMapObject<StateSchema> = {
	conferencesState: conferencesReducer,
};

export const createReduxStore = (initState?: StateSchema): ToolkitStore => {
	const reducerManager = createReducerManager<StateSchema>(rootReducer);
	const store = configureStore({
		reducer: reducerManager.reduce as Reducer,
		devTools: __IS_DEV__,
		preloadedState: initState,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						api: $api,
					},
				},
			}),
	});
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
};

export interface StateSchema {
	conferencesState: ConferencesState;
}

export interface StoreWithReducerManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager<StateSchema>;
}

export interface ThunkExtraArgs extends ThunkMiddleware {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArgs;
}
