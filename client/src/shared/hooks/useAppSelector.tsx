import { StateSchema } from "app/providers/store/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
