import { IDateFormat } from '../../util/model/iDateFormat';
import { ITokenGenerator } from '../../util/model/iTokenGenerator';
import { IUserRepository } from '../model/iUserRepository';
import { IUserService } from '../model/iUserService';
import { User } from '../model/user';

export class UserService implements IUserService {
	#repository: IUserRepository;
	#dateFormat: IDateFormat;
	#tokenGenerator: ITokenGenerator;
	constructor(
		repository: IUserRepository,
		dateFormat: IDateFormat,
		tokenGenerator: ITokenGenerator,
	) {
		this.#repository = repository;
		this.#dateFormat = dateFormat;
		this.#tokenGenerator = tokenGenerator;
	}
	get repository() {
		return this.#repository;
	}
	async register({
		name,
		email,
		password,
	}: Omit<User, 'id' | 'createAt'>): Promise<string | null> {
		const emailExists = await this.repository.find(email);
		if (emailExists) return null;
		await this.#repository.save({
			name,
			email,
			password,
			createAt: this.#dateFormat.format(new Date()),
		});
		return this.#tokenGenerator.encrypt(email);
	}
	login({
		email,
		password,
	}: Pick<User, 'email' | 'password'>): Promise<string | null> {
		throw new Error('Method not implemented.');
	}
}
