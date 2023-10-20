import classNames from "classnames";
import { useState } from "react";
import { AppCard } from "widgets/appCard";
import cls from "./MainPage.m.scss";

export const MainPage = () => {
	const [fakeCards, _] = useState(["Name #1", "name #2", "name #3"]);
	return (
		<div className={classNames(cls.root)}>
			<div className={classNames(cls["cards-list"])}>
				{fakeCards.map(el => (
					<AppCard card={el} />
				))}
			</div>
		</div>
	);
};
