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
		role: UserRole.UNAUTHORIZED,
	},
	users: [],
};

export const auth = createAsyncThunk<boolean, string, ThunkConfig<boolean | Error>>(
	"users/auth",
	async (token, thunkAPI) => {
		const { extra, rejectWithValue } = thunkAPI;
		try {
			return (await extra.api.post<boolean>("/auth", { token })).data;
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
	"admin/users",
	async (_, thunkAPI) => {
		const { extra, rejectWithValue } = thunkAPI;
		try {
			const response = await extra.api.get<User[]>("/admin/users");
			return response.data;
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
