export const enum UserRole {
	GUEST = -1,
	USER = 0,
	MODERATOR = 1,
	ADMIN = 2,
}

export interface User {
	id: number;
	mail?: string;
	role: UserRole;
	info?: string;
	name?: string;
	picture?: string; // url
}

export const mockUser: User = {
	id: 1,
	mail: "mail@mail.mail",
	role: UserRole.ADMIN,
	info: "info",
};
