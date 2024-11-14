import { MongoClient, Db } from "mongodb";
import { formatLog } from "../utils/formatLog";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is undefined");
}

const DB_NAME = process.env.DB_NAME as string;
if (!DB_NAME) {
    throw new Error("DB_NAME environment variable is undefined");
}

let cachedDB: Db | null = null;

const options = {
    tlsAllowInvalidCertificates: true,
};

export async function connect(): Promise<Db> {
    if (cachedDB) {
        console.info(formatLog("Using cached database connection!"));
        return cachedDB;
    }

    console.info(formatLog("No cached database connection found. Creating a new one."));
    
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db: Db = client.db(DB_NAME);
    
    cachedDB = db;
    return cachedDB;
}