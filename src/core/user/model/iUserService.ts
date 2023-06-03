import { User } from './user';

export interface IUserService {
	register({
		name,
		email,
		password,
	}: Omit<User, 'id' | 'createAt'>): Promise<string>;
	login({
		email,
		password,
	}: Pick<User, 'email' | 'password'>): Promise<string | null>;
}
