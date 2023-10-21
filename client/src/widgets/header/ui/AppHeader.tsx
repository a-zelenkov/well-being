import { Persona } from "@gravity-ui/uikit";
import { GoogleLogin } from "@react-oauth/google";
import classNames from "classnames";
import { auth } from "entities/user/model/UserSlice";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import cls from "./AppHeader.m.scss";

export const AppHeader = () => {
	const dispatch = useAppDispatch();

	return (
		<div className={classNames(cls.root)}>
			<Persona
				type="person"
				text="fakemail@gmail.com"
			/>
			<GoogleLogin
				onSuccess={res => {
					dispatch(auth(res.credential!));
				}}
				onError={() => {
					console.log("Login Failed");
				}}
			/>
		</div>
	);
};
