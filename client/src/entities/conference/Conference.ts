import { Attachment, mockAttachment } from "entities/attachment/Attachment";
import { Direction } from "entities/direction/Direction";
import { User, mockUser } from "entities/user/User";

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
	startsAt: new Date(),
	description: "description",
	direction: {
		id: 1,
		name: "mock",
	},
	attachments: [mockAttachment],
	comments: [],
	audience: [],
};
