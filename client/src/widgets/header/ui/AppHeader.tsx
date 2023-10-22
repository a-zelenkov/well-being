import { Persona } from "@gravity-ui/uikit";
import { GoogleLogin } from "@react-oauth/google";
import classNames from "classnames";
import { getUserProfile } from "entities/user/model/selectors";
import { auth, fetchProfile, logout } from "entities/user/model/UserSlice";
import { UserRole } from "entities/user/User";
import { useEffect } from "react";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { useAppSelector } from "shared/hooks/useAppSelector";
import cls from "./AppHeader.m.scss";

export const AppHeader = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProfile());
	}, []);

	const user = useAppSelector(getUserProfile);

	return (
		<div className={classNames(cls.root)}>
			{user.role === UserRole.GUEST ? (
				<GoogleLogin
					onSuccess={res => {
						dispatch(auth(res.credential!));
					}}
					onError={() => {
						console.log("Login Failed");
					}}
				/>
			) : (
				<Persona
					type="person"
					text={user.email}
					image={user.picture}
					onClick={() => {
						dispatch(logout());
					}}
				/>
			)}
		</div>
	);
};
