import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { EnhancedStore, ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { createReducerManager, ReducerManager } from "./managers/reducerManager";

const rootReducer: ReducersMapObject<StateSchema> = {};

export const createReduxStore = (initState?: StateSchema): ToolkitStore => {
	const reducerManager = createReducerManager<StateSchema>(rootReducer);
	const store = configureStore<StateSchema>({
		reducer: reducerManager.reduce,
		devTools: __IS_DEV__,
		preloadedState: initState,
	});
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
};

export interface StateSchema {}

export interface StoreWithReducerManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager<StateSchema>;
}
