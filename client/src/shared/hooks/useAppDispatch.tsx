import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/store/store";
import { useDispatch } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<StateSchema>>();
