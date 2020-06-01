import { init, MongoClient } from 'https://deno.land/x/mongo@v0.6.0/mod.ts';

// Initialize the plugin
await init();

function connectDB(dbName: string, url: string) {
  const client = new MongoClient();
  client.connectWithUri(url);

  return {
    getDatabase() {
      return client.database(dbName);
    },
  };
}

const env = Deno.env.toObject();
const dbName = env.DB_NAME || 'deno_talks_api';
const dbHostUrl = env.DB_HOST_URL || 'mongodb://localhost:27017';
const db = connectDB(dbName, dbHostUrl);

export default db;
