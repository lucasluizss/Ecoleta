import knex from 'knex';
import path from 'path';

const connection = knex({
	client: 'sqlite3',
	connection: {
		filename: path.resolve(__dirname, 'database.sqlite'),
		connectTimeout: 90000
	},
	useNullAsDefault: true,
	pool: {
		max: 7,
		min: 3,
		acquireTimeoutMillis: 30000,
		idleTimeoutMillis: 30000,
		reapIntervalMillis: 1000,
	}
});

export default connection;