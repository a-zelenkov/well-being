import { mockUser, User } from "entities/user/User";

export enum CommentType {
	QUESTION = 0,
	COMMENT = 1,
	SUGGESTION = 2,
}

export interface Comment {
	id: number;
	conferenceId: number; // нам, наверно, не нужно
	text: string;
	sender: User;
	type: CommentType;
	createdAt: Date;
}

export const mockComment: Comment = {
	id: 12,
	conferenceId: 1,
	text: "hello world",
	sender: mockUser,
	type: CommentType.COMMENT,
	createdAt: new Date(Date.now()),
};
