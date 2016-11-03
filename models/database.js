const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE todo_list ( id SERIAL PRIMARY KEY , name VARCHAR(100) NOT NULL , date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)');
query.on('end', () => { client.end(); });

