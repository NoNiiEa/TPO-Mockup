import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('police-report');
    const collection = db.collection('reports');

    const result = await collection.insertOne(req.body);

    return res.status(200).json({ message: 'Saved', id: result.insertedId });
  } catch (err) {
    console.error('Error saving report:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}