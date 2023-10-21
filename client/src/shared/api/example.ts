import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/store/store";

export const fetchStrings = createAsyncThunk<string[], undefined, ThunkConfig<string>>(
	"strings/getStrings",
	async (_, thunkAPI) => {
		const { extra, rejectWithValue } = thunkAPI;
		try {
			const response = await extra.api.get<string[]>("/strings");
			const data = response.data;
			return data;
		} catch (error) {
			return rejectWithValue("error");
		}
	},
);

const initialState: { strings: string[] } = {
	strings: [],
};

const stringsSlice = createSlice({
	name: "strings",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchStrings.fulfilled, (state, action: PayloadAction<string[]>) => {
			state.strings = action.payload;
		});
	},
});

// в диспатч просто кидать функцию fetchStrings
// на типизированные диспатч / селекторы у нас хуки есть
