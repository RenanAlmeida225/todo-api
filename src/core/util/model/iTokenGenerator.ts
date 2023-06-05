export interface ITokenGenerator {
	encrypt(plaintext: string): string;
	decrypt(ciphertext: string): string;
}
