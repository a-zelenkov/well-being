import { Card, Label } from "@gravity-ui/uikit";
import classNames from "classnames";
import { FC } from "react";
import { Avatar } from "shared/ui/Avatar/Avatar";
import cls from "./Card.m.scss";

interface AppCardProps {
	card: string;
}

export const AppCard: FC<AppCardProps> = ({ card }) => {
	console.log(card);
	return (
		<Card className={classNames(cls.root)}>
			<div className={cls["title-section"]}>
				<Avatar
					size="l"
					imgSrc="https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_square.png"
				/>
				<Label
					size="m"
					className={cls.title}
				>
					{card}
				</Label>
			</div>
			<Label
				size="m"
				className={classNames(cls.description)}
			>
				{card}
			</Label>
		</Card>
	);
};
