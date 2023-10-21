import { Attachment, mockAttachment } from "entities/attachment/Attachment";
import { Comment, mockComment } from "entities/comment/Comment";
import { User, mockUser } from "entities/user/User";
import { Direction } from "readline";

export interface Conference {
	id: number;
	name: string;
	expert: User;
	startsAt: Date;
	description: string;
	direction: Direction;
	attachments: Attachment[];
	comments: Comment[];
	audience: User[];
}

export const mockConference: Conference = {
	id: 1,
	name: "conferenceName",
	expert: mockUser,
	startsAt: new Date(Date.now()),
	description: "description",
	direction: 1,
	attachments: [mockAttachment],
	comments: [mockComment],
	audience: [],
};
