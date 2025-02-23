const axios = require('axios');
const API_KEY = '398223c7f66aa86567662820'; // Replace with your actual API key

// Controller to get exchange rates
const getExchangeRate = async (req, res) => {
    const { base, target } = req.params;
    console.log(base, target);
    if (!base || !target) {
        return res.status(400).json({ error: 'Base and target currencies are required' });
    }

    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`);
        console.log(response.data);
        const rate = response.data.conversion_rates[target];

        if (!rate) {
            return res.status(404).json({ error: 'Exchange rate not found' });
        }

        res.json({ base, target, rate });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exchange rate' });
    }
};

// Controller to get all supported currencies
const getSupportedCurrencies = async (req, res) => {
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
        const { supported_codes } = response.data;

        if (!supported_codes) {
            return res.status(404).json({ error: 'Currencies not found' });
        }

        const currencies = supported_codes.map(([code, name]) => ({ code, name }));
        res.json({ currencies });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch supported currencies' });
    }
};

module.exports = {
    getExchangeRate,
    getSupportedCurrencies,
};