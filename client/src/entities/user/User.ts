export enum UserRole {
	USER = 0,
	MODERATOR = 1,
	ADMIN = 2,
}

export interface User {
	id: number;
	mail: string;
	role: UserRole;
	info: string;
	// это не всё
}
