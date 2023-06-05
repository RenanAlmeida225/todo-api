import { it, expect, describe } from 'vitest';
import { UserService } from '../../../../src/core/user/service/userService';
import { UserRepositoryMock } from '../../../mock/userRepositoryMock';
import { DateFormartMock } from '../../../mock/DateFormartMock';
import { TokenGeneratorMock } from '../../../mock/tokenGeneratorMock';

function makeSut() {
	const tokenGenerator = new TokenGeneratorMock();
	const dateFormat = new DateFormartMock();
	const repository = new UserRepositoryMock();
	const sut = new UserService(repository, dateFormat, tokenGenerator);
	return { sut, repository, dateFormat, tokenGenerator };
}

describe('UserService', () => {
	const date = new Date(2000, 1, 1, 13);
	const formatDate = new DateFormartMock().format(date);
	describe('save', () => {
		it('should save user in db and return void', async () => {
			const user = {
				name: 'any_name',
				email: 'any_mail@mail.com',
				password: 'any_password',
			};
			const { sut, repository } = makeSut();
			const promise = await sut.register(user);
			expect(repository.user).toEqual([
				{ ...user, id: 1, createAt: formatDate },
			]);
			expect(promise).toEqual('any_token');
		});
	});
});
