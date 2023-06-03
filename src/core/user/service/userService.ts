import { IUserService } from '../model/iUserService';
import { User } from '../model/user';

export class UserService implements IUserService {
	register({
		name,
		email,
		password,
	}: Omit<User, 'id' | 'createAt'>): Promise<string> {
		throw new Error('Method not implemented.');
	}
	login({
		email,
		password,
	}: Pick<User, 'email' | 'password'>): Promise<string | null> {
		throw new Error('Method not implemented.');
	}
}
