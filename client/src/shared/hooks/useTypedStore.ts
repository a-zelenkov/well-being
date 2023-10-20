import { StoreWithReducerManager } from "app/providers/store/store";
import { useStore } from "react-redux";

export const useTypedStore = useStore() as StoreWithReducerManager;
