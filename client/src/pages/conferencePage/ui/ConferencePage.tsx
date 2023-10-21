import { Button, Card, Label, Tabs, Text } from "@gravity-ui/uikit";
import { CommentType } from "entities/comment/Comment";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { AvatarWithName } from "shared/ui/AvatarWithName/AvatarWithName";
import { DateText } from "shared/ui/DateText/DateText";
import cls from "./ConferencePage.m.scss";

export const ConferencePage = () => {
	const { id } = useParams();
	const conference = useAppSelector(state =>
		state.conferencesState.conferences.find(conferenceItem => conferenceItem.id === +id!),
	)!;

	const tabsItems = [
		{ id: CommentType.QUESTION, title: "Вопросы" },
		{ id: CommentType.COMMENT, title: "Комментарии" },
		{ id: CommentType.SUGGESTION, title: "Предложения" },
	].map(tab => ({ ...tab, id: tab.id.toString() }));

	const [activeTab, setActiveTab] = useState<string>("1");

	return (
		<div className={cls.root}>
			<div className={cls["title-section"]}>
				<Text variant="header-2"> {conference.name}</Text>
				<DateText date={conference.startsAt} />
			</div>
			<div className={cls["expert-section"]}>
				<AvatarWithName user={conference.expert} />
				<Button
					size="l"
					view="action"
				>
					Записаться на мероприятие
				</Button>
			</div>
			<Card className={cls.description}>
				<Text>{conference.description}</Text>
			</Card>
			<Tabs
				items={tabsItems}
				activeTab={activeTab}
				onSelectTab={tabId => setActiveTab(tabId)}
				className={cls.tabs}
			/>
		</div>
	);
};
