import bcrypt from 'bcrypt';

const hash = async (valueToHash: string): Promise<string> => {
	try {
		const getSalt = await bcrypt.genSalt(10);
		return await bcrypt.hash(valueToHash, getSalt);
	} catch {
		throw 'Error hash';
	}
};

const decrypt = async (
	valueDecrypted: string,
	valueCrypted: string,
): Promise<boolean | string> => {
	try {
		const compare = await bcrypt.compare(valueDecrypted, valueCrypted);
		return compare;
	} catch {
		throw 'Error decrypt';
	}
};

export { hash, decrypt };
