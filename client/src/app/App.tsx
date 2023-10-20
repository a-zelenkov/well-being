import { Outlet } from "react-router-dom";
import { Sidebar } from "widgets/sidebar";

export function App() {
	return (
		<>
			<Sidebar />
			<Outlet />
		</>
	);
}
