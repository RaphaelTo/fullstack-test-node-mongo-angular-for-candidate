export interface EnvVariable extends NodeJS.ProcessEnv {
	DATABASE_NAME?: string;
	DATABASE_HOST?: string;
	DATABASE_PORT?: string;
	DATABASE_ROOT_USERNAME?: string;
	DATABASE_ROOT_PASSWORD?: string;
	PORT?: string;
	URL_API?: string;
	SECRET_TOKEN?: string;
}
