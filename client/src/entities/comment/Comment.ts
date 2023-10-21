import { mockUser, User } from "entities/user/User";

export enum CommentType {
	QUESTION = 0,
	COMMENT = 1,
	SUGGESTION = 2,
}

export interface Comment {
	id: number;
	text: string;
	sender: User;
	type: CommentType;
	createdAt: string;
}

export const mockComment: Comment = {
	id: 12,
	text: "hello world",
	sender: mockUser,
	type: CommentType.COMMENT,
	createdAt: new Date().toJSON(),
};
