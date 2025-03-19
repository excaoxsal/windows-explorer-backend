import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    // host: 'localhost',
    // database: 'E_AUDIT',
    // password: 'min',
    'host' : '10.202.253.124',//dev_inet
	'password' : 'datinptp@2018',//dev_inet
	'database' : 'E_AUDIT_DEV',//dev_inet
    port: 5432,
});

client.connect();

export default client;