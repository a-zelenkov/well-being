import { Attachment } from "entities/attachment/Attachment";
import { User } from "entities/user/User";
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
