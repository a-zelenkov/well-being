import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/store/store";
import { User, UserRole } from "../User";

export interface UsersState {
	profile: User;
	users: User[];
}

const initialState: UsersState = {
	profile: {
		id: -1,
		role: UserRole.GUEST,
		email: "?",
	},
	users: [],
};

export const auth = createAsyncThunk<User, string, ThunkConfig<User | Error>>("users/auth", async (token, thunkAPI) => {
	const { extra, rejectWithValue } = thunkAPI;
	try {
		const resp = await extra.api.post<User>("/auth", { token });
		return resp.data;
	} catch (error) {
		return rejectWithValue(new Error());
	}
});

export const logout = createAsyncThunk<void, undefined, ThunkConfig<boolean | Error>>(
	"users/logout",
	async (token, thunkAPI) => {
		const { extra, rejectWithValue } = thunkAPI;
		try {
			const resp = await extra.api.get<void>("/auth/logout");
			return resp.data;
		} catch (error) {
			return rejectWithValue(new Error());
		}
	},
);

export const fetchProfile = createAsyncThunk<User, undefined, ThunkConfig<User | Error>>(
	"users/profile",
	async (_, thunkAPI) => {
		const { extra, rejectWithValue } = thunkAPI;
		try {
			const response = await extra.api.get<User>("/users");
			return response.data;
		} catch (error) {
			return rejectWithValue(new Error());
		}
	},
);

export const fetchUsers = createAsyncThunk<User[], undefined, ThunkConfig<User[] | Error>>(
	"users/all",
	async (_, thunkAPI) => {
		const { extra, rejectWithValue } = thunkAPI;
		try {
			const response = await extra.api.get<User[]>("/users/getAll");
			return response.data;
		} catch (error) {
			return rejectWithValue(new Error());
		}
	},
);

export const deleteUser = createAsyncThunk<number, number, ThunkConfig<void | Error>>(
	"users/delete",
	async (id, thunkAPI) => {
		const { extra, rejectWithValue } = thunkAPI;
		try {
			await extra.api.delete<void>(`/users/${id}`);
			return id;
		} catch (error) {
			return rejectWithValue(new Error());
		}
	},
);

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(deleteUser.fulfilled, (state, { payload }: PayloadAction<number>) => {
			state.users = state.users.filter(it => it.id !== payload);
		});
		builder.addCase(logout.fulfilled, state => {
			state.profile = initialState.profile;
			state.users = [];
		});
		builder.addCase(auth.fulfilled, (state, { payload }: PayloadAction<User>) => {
			state.profile = payload;
		});
		builder.addCase(fetchProfile.fulfilled, (state, { payload }: PayloadAction<User>) => {
			state.profile = payload;
		});
		builder.addCase(fetchUsers.fulfilled, (state, { payload }: PayloadAction<User[]>) => {
			state.users = payload;
		});
	},
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
