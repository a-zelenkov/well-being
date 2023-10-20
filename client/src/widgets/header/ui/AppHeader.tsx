import { Persona } from "@gravity-ui/uikit";
import classNames from "classnames";
import cls from "./AppHeader.m.scss";

export const AppHeader = () => (
	<div className={classNames(cls.root)}>
		<Persona
			type="person"
			text="fakemail@gmail.com"
		/>
		<Persona
			type="empty"
			text="What is it?"
		/>
	</div>
);
