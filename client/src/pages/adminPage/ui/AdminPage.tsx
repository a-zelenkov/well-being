import classNames from "classnames";
import { getAllUsers, getUserProfile } from "entities/user/model/selectors";
import { fetchUsers } from "entities/user/model/UserSlice";
import { UserRole } from "entities/user/User";
import { useEffect } from "react";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { UserCard } from "widgets/userCard";
import cls from "./AdminPage.m.scss";

export const AdminPage = () => {
	const user = useAppSelector(getUserProfile);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);
	const users = useAppSelector(getAllUsers);

	if (user.role < UserRole.MODERATOR) return <div className={classNames(cls.root)}>Недостаточно прав</div>;

	return (
		<div className={classNames(cls.root)}>
			{users.map(it => (
				<UserCard
					key={it.id}
					user={it}
				/>
			))}
		</div>
	);
};
