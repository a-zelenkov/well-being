export enum AttachmentType {
	LINK = 0,
	// тут могут быть ссылки на конференцию, материалы и т.п
	// пока пишем логику только для ссылок
}

export interface Attachment {
	id: number;
	conferenceId: number; // нам, наверно, не нужно
	content: string;
	type: AttachmentType;
}

export const mockAttachment: Attachment = {
	id: 1,
	conferenceId: 1,
	content: "string",
	type: AttachmentType.LINK
}
