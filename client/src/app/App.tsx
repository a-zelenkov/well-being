import { Outlet } from "react-router-dom";
import { fetchStrings } from "shared/api/example";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { AppHeader } from "widgets/header";

export function App() {
	const dispatch = useAppDispatch();

	dispatch(fetchStrings());

	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	);
}
