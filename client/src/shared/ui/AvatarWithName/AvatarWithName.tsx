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
				imgSrc={user.picture}
			/>
			<Text>{user.name}</Text>
		</div>
	);
};
