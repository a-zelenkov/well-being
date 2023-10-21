import { Text } from "@gravity-ui/uikit";
import classNames from "classnames";
import { User } from "entities/user/User";
import { FC } from "react";
import { Avatar } from "../Avatar/Avatar";
import cls from "./AvatarWithName.m.scss";

interface AvatarWithNameProps {
	className?: string;
	user: User;
}

export const AvatarWithName: FC<AvatarWithNameProps> = props => {
	const { className = "", user } = props;
	return (
		<div className={classNames(cls.root, className)}>
			<Avatar
				size="l"
				imgSrc="https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_square.png"
			/>
			<Text>{user.info}</Text>
		</div>
	);
};
