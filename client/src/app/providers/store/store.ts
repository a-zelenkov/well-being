import { configureStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { conferencesReducer, ConferencesState } from "entities/conference/model/ConferenceSlice";
import { usersReducer, UsersState } from "entities/user/model/UserSlice";
import { $api } from "shared/api/$api";

export const store = configureStore({
	reducer: {
		conferencesState: conferencesReducer,
		usersState: usersReducer,
	},
	devTools: __IS_DEV__,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: {
					api: $api,
				},
			},
		}),
});

export interface StateSchema {
	conferencesState: ConferencesState;
	usersState: UsersState;
}

export interface ThunkExtraArgs extends ThunkMiddleware {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArgs;
}

export type RootState = ReturnType<typeof store.getState>;
