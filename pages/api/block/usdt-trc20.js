// pages/api/externalRequest.js
import axios from 'axios';

export default async function handler(req, res) {

    const api_key = process.env.TRON_API_KEY;

    if (req.method !== 'POST') {
        // Return 405 Method Not Allowed if the request is not a POST
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    const { address } = req.body;

    const headers = {
        'Authorization': 'Bearer your-token',
        'Custom-Header': 'custom-value',
        'TRON-PRO-API-KEY': api_key
    };

    try {
        // Make an external API request
        const response = await axios.get(`https://api.trongrid.io/v1/accounts/${address}/transactions/trc20?limit=200&contract_address=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t&only_confirmed=true`, {
            headers: headers
        });

        // Send the external API response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
}
