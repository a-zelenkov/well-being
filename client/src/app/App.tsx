import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet } from "react-router-dom";
import { fetchStrings } from "shared/api/example";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { AppHeader } from "widgets/header";

export function App() {
	const dispatch = useAppDispatch();

	dispatch(fetchStrings());

	return (
		<GoogleOAuthProvider clientId="482536207010-gsiha5umtdd36su5o8kgmaunkv1kqr6m.apps.googleusercontent.com">
			<AppHeader />
			<Outlet />
			<GoogleLogin
				onSuccess={credentialResponse => {
					console.log(credentialResponse);
				}}
				onError={() => {
					console.log("Login Failed");
				}}
			/>
		</GoogleOAuthProvider>
	);
}
