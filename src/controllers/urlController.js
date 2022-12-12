const shortid = require('shortid');
const urlModel = require('../models/urlModel');
const { isValidUrl, isValidBody } = require('../util/validator');


//createUrl
const createUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!isValidBody(req.body)) return res.status(400).send({ status: false, message: 'Please enter data on the body.' });
        if (!isValidUrl(longUrl)) return res.status(400).send({ status: false, message: ` '${longUrl}' this url isn't valid.` });

        let urlCode = shortid.generate().toLowerCase();
        const shortUrl = `http://localhost:3000/ + ${urlCode}`;
        const data = {
            longUrl: longUrl,
            shortUrl: shortUrl,
            urlCode: urlCode
        }

        await urlModel.create(data);
        return res.status(201).send({ status: true, message: ` '${shortUrl}' this short url created successfully.`, data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err.message });
    }
};

//getUrl
const getUrl = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err.message });
    }
};

module.exports = { createUrl, getUrl };