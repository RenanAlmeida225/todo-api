import { User } from './user';

export interface IUserRepository {
	save({ name, email, password, createAt }: Omit<User, 'id'>): Promise<void>;
	find(email: string): Promise<string | null>;
}
