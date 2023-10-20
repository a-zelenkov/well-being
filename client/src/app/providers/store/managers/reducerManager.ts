import { AnyAction, combineReducers, Reducer, ReducersMapObject } from "@reduxjs/toolkit";

export function createReducerManager<S extends object>(initialReducers: ReducersMapObject<S>): ReducerManager<S> {
	const reducers = { ...initialReducers };

	let combinedReducer = combineReducers(reducers);

	type SKeys = keyof S;

	let keysToRemove: SKeys[] = [];

	return {
		getReducerMap: () => reducers,

		reduce: (state: S, action: AnyAction) => {
			if (keysToRemove.length > 0) {
				state = { ...state };
				for (const key of keysToRemove) {
					delete state[key];
				}
				keysToRemove = [];
			}

			return combinedReducer(state, action);
		},

		add: (key: SKeys, reducer: Reducer) => {
			if (!key || reducers[key]) {
				return;
			}

			reducers[key] = reducer;

			combinedReducer = combineReducers(reducers);
		},

		remove: (key: SKeys) => {
			if (!key || !reducers[key]) {
				return;
			}

			delete reducers[key];

			keysToRemove.push(key);

			combinedReducer = combineReducers(reducers);
		},
	};
}

export interface ReducerManager<S> {
	reduce: (state: S, action: AnyAction) => S;
	getReducerMap: () => ReducersMapObject<S>;
	add: <ReducerState>(key: keyof S, reducer: Reducer<ReducerState>) => void;
	remove: (key: keyof S) => void;
}
