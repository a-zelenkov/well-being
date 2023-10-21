import { Persona } from "@gravity-ui/uikit";
import { GoogleLogin } from "@react-oauth/google";
import classNames from "classnames";
import cls from "./AppHeader.m.scss";

export const AppHeader = () => (
	<div className={classNames(cls.root)}>
		<Persona
			type="person"
			text="fakemail@gmail.com"
		/>
		<GoogleLogin
			onSuccess={credentialResponse => {
				console.log(credentialResponse);
			}}
			onError={() => {
				console.log("Login Failed");
			}}
		/>
	</div>
);
