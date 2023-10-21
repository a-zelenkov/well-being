import { fetchProfile } from "entities/user/model/UserSlice";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { AppHeader } from "widgets/header";

export function App() {
	const dispatch = useAppDispatch();

	dispatch(fetchProfile());

	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	);
}
