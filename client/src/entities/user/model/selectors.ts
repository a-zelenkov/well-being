import { RootState } from "app/providers/store/store";

export const getUserProfile = ({ usersState }: RootState) => usersState.profile;
export const getAllUsers = ({ usersState }: RootState) => usersState.users;
