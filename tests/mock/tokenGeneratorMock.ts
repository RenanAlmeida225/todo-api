import { ITokenGenerator } from '../../src/core/util/model/iTokenGenerator';

export class TokenGeneratorMock implements ITokenGenerator {
	encrypt(plaintext: string): string {
		return 'any_token';
	}
	decrypt(ciphertext: string): string {
		throw new Error('Method not implemented.');
	}
}
