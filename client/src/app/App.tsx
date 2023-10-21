import { User } from "@gravity-ui/uikit";
import { getUserProfile } from "entities/user/model/selectors";
import { fetchProfile, setProfile } from "entities/user/model/UserSlice";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { AppHeader } from "widgets/header";

export function App() {
	const dispatch = useAppDispatch();

	// как-то сложна
	console.log(useAppSelector(getUserProfile));
	dispatch(fetchProfile())
		.then(ans => {
			// wtf
			if (ans.payload && !(ans.payload instanceof Error)) dispatch(setProfile(ans.payload));
			console.log(useAppSelector(getUserProfile));
		})
		.catch(err => console.log(err));

	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	);
}
