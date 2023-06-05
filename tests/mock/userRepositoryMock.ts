import { IUserRepository } from '../../src/core/user/model/iUserRepository';
import { User } from '../../src/core/user/model/user';

export class UserRepositoryMock implements IUserRepository {
	user: User[];
	constructor() {
		this.user = [];
	}

	async save({
		name,
		email,
		password,
		createAt,
	}: Omit<User, 'id'>): Promise<void> {
		this.user.push({
			id: 1,
			name,
			email,
			password,
			createAt,
		});
		return;
	}
	async find(email: string): Promise<string | null> {
		for (let i = 0; i < this.user.length; i++) {
			if (this.user[i].email == email) {
				return this.user[i].email;
			}
		}
		return null;
	}
}
