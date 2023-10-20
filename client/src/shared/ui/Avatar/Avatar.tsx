import classNames from "classnames";
import { FC } from "react";
import cls from "./Avatar.m.scss";

type AvatarSizes = "s" | "m" | "l";

interface AvatarProps {
	imgSrc?: string;
	size?: AvatarSizes;
}

export const Avatar: FC<AvatarProps> = props => {
	const { imgSrc, size = "s" } = props;

	return (
		<div className={classNames(cls.root, cls[size])}>
			<img
				className={classNames(cls.img)}
				src={imgSrc}
				alt="avatar"
			/>
		</div>
	);
};
