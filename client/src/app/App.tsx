import { Outlet } from "react-router-dom";
import { AppHeader } from "widgets/header";

export function App() {
	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	);
}
