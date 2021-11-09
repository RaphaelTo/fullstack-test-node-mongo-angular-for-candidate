import mongoose from 'mongoose';
import { EnvVariable } from '@/Interfaces/env';

const {
	DATABASE_NAME,
	DATABASE_HOST,
	DATABASE_PORT,
	DATABASE_ROOT_USERNAME,
	DATABASE_ROOT_PASSWORD,
}: EnvVariable = process.env;

const connectAtMongoDB = async (): Promise<void> => {
	try {
		await mongoose.connect(
			`mongodb://${DATABASE_ROOT_USERNAME}:${DATABASE_ROOT_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?authSource=admin`,
		);
		console.log('Connected at mongodb');
	} catch (err) {
		throw err;
	}
};

export { connectAtMongoDB };
