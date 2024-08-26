// pages/api/externalRequest.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        // Return 405 Method Not Allowed if the request is not a POST
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    const { con_cat, offset } = req.body;

    try {
        // Make an external API request
        const response = await axios.get(`https://blockchain.info/multiaddr?active=${con_cat}&offset=${offset ?? 0}`);

        // Send the external API response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
}
