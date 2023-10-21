import { Button, Card, Label, Text } from "@gravity-ui/uikit";
import { routerPaths } from "app/providers/router/router";
import classNames from "classnames";
import { Conference } from "entities/conference/Conference";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { AvatarWithName } from "shared/ui/AvatarWithName/AvatarWithName";
import { DateText } from "shared/ui/DateText/DateText";
import cls from "./ConferenceCard.m.scss";

interface ConferenceCardProps {
	conference: Conference;
}

export const ConferenceCard: FC<ConferenceCardProps> = ({ conference }) => {
	const navigate = useNavigate();

	const onAboutButtonClick = () => {
		navigate(`${routerPaths.conference}/${conference.id}`);
	};
	return (
		<Card className={classNames(cls.root)}>
			<div className={cls["title-section"]}>
				<div className={cls["title-section-info"]}>
					<Text variant="header-1"> {conference.name} </Text>
					<DateText date={conference.startsAt} />
				</div>
				<div className={cls["title-section-btns"]}>
					<Button
						size="l"
						view="outlined"
					>
						Зайти на мероприятие
					</Button>
					<Button
						size="l"
						view="action"
						onClick={onAboutButtonClick}
					>
						Подробнее
					</Button>
				</div>
			</div>

			<AvatarWithName
				user={conference.expert}
				className={cls["expert-section"]}
			/>

			<Label
				size="m"
				className={classNames(cls.description)}
			>
				{conference.description}
			</Label>
		</Card>
	);
};
