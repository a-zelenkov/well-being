import classNames from "classnames";
import { Comment } from "entities/comment/Comment";
import { FC } from "react";
import { AvatarWithName } from "../AvatarWithName/AvatarWithName";
import cls from "./CommentItem.m.scss";

interface CommentItemProps {
	comment: Comment;
}

export const CommentItem: FC<CommentItemProps> = props => {
	const { comment } = props;
	return (
		<div className={classNames(cls.root)}>
			{/* уменьшить и добавить поле для текста */}
			<AvatarWithName user={comment.sender} />
		</div>
	);
};
