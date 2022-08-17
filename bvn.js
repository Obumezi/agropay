const axios = require('axios');
require('dotenv').config();

const fsi = process.env.FSI_URL


async function bvnDetails(bvn) {
    try {
        if (!bvn) return { error: 'bvn not passed' };
        const res = await axios.get(`${fsi}/kyc/bvns/${bvn}?bvn=${bvn}`, {
            headers: {
                'sandbox-key': process.env.SANDBOX_SECRET,
                Authorization: `Bearer ${process.env.SANDBOX_SECRET}`
            }
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = bvnDetails;

