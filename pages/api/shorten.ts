import { NextApiRequest, NextApiResponse } from "next";
import { COLLECTION_NAMES } from "../../types";
import { connect } from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { url, alias } = req.body;

    if (!url || !alias) {
        return res.status(400).json({ message: "URL and alias are required" });
    }

    const db = await connect();
    const collection = db.collection(COLLECTION_NAMES.URL_INFO);

    const existing = await collection.findOne({ alias });
    if (existing) {
        return res.status(409).json({ message: "Alias already taken" });
    }

    await collection.insertOne({ url, alias });
    res.status(200).json({ alias });
}