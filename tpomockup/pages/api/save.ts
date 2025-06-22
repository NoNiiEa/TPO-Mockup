import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongoose';
import Report from '../../models/report';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await connectToDatabase();
            const reportData = req.body;
            const report = new Report(reportData);
            await report.save();

            return res.status(201).json({ message: 'Report saved successfully', report });
        } catch (error) {
            console.error('Error saving report:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
