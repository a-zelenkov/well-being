import { Button, Card, Label, Select, Text } from "@gravity-ui/uikit";
import { routerPaths } from "app/providers/router/router";
import classNames from "classnames";
import { deleteUser } from "entities/user/model/UserSlice";
import { User, UserRole } from "entities/user/User";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { AvatarWithName } from "shared/ui/AvatarWithName/AvatarWithName";
import { DateText } from "shared/ui/DateText/DateText";
import cls from "./UserCard.m.scss";

interface ConferenceCardProps {
	user: User;
}

export const UserCard: FC<ConferenceCardProps> = ({ user }) => {
	const dispatch = useAppDispatch();

	const onDeleteButtonClick = () => {
		dispatch(deleteUser(user.id));
	};
	return (
		<Card className={classNames(cls.root)}>
			<div className={cls["title-section"]}>
				<AvatarWithName user={user} />
				<div className={cls["title-section-info"]}>
					<Text>{user.email} </Text>
					<Text>{user.info}</Text>
					<Select
						defaultValue={[user.role]}
						options={[
							{
								label: "Сотрудник",
								value: UserRole.USER,
								// disabled: user.role < UserRole.MODERATOR,
							},
							{
								label: "Модератор",
								value: UserRole.MODERATOR,
								// disabled: user.role < UserRole.ADMIN,
							},
							{ label: "Администратор", value: UserRole.ADMIN, disabled: true },
						]}
						onUpdate={e => console.log(e)}
					/>
				</div>
				<div className={cls["title-section-btns"]}>
					<Button
						size="l"
						view="action"
						onClick={onDeleteButtonClick}
					>
						Удалить
					</Button>
				</div>
			</div>
		</Card>
	);
};
