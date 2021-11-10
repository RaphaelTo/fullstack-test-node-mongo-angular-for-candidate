import { hash, decrypt } from '../../utils/crypt';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('method crypt', () => {
	it('should return string hashed the hash method', async () => {
		const pass = '1234';
		//@ts-ignore
		bcrypt.hash.mockResolvedValue('hash');
		const expectedValue = 'hash';

		expect.assertions(1);
		const hashPassword = await hash(pass);

		expect(hashPassword).toBe(expectedValue);
	});

	it('should return boolean if the string is same as hash', async () => {
		const pass = '123';
		const hashValue = 'hash';
		//@ts-ignore
		bcrypt.compare.mockResolvedValue(true);

		expect.assertions(1);
		const checkPassword = await decrypt(pass, hashValue);

		expect(checkPassword).toBeTruthy();
	});
});
