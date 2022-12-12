const shortid = require('shortid');
const validUrl = require('valid-url');
const urlModel = require('../models/urlModel');
const { isValidUrl, isValidBody } = require('../util/validator');

//createUrl
const createUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!isValidBody(req.body)) return res.status(400).send({ status: false, message: 'Please enter data on the body.' });
        if (!isValidUrl(longUrl)) return res.status(400).send({ status: false, message: ` '${longUrl}' this url isn't valid.` });
        if (!validUrl.isUri(longUrl)) return res.status(400).send({ status: false, message: 'Please enter valid url2' });

        let urlCode = shortid.generate().toLowerCase();
        const shortUrl = `http://localhost:3000/ + ${urlCode}`;
        const data = {
            longUrl: longUrl,
            shortUrl: shortUrl,
            urlCode: urlCode
        }

        const newUrl = await urlModel.create(data);
        const savaData = {
            longUrl: newUrl.longUrl,
            shortUrl: newUrl.shortUrl,
            urlCode: newUrl.urlCode
        }
        return res.status(201).send({ status: true, message: 'ShortUrl created successfully.', data: savaData });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err.message });
    }
};

//getUrl
const getUrl = async (req, res) => {
    try {
        const urlCode = req.params.urlCode;

        if (!shortid.isValid(urlCode)) return res.status(400).send({ status: false, message: `'${urlCode}' this shortUrl is invalid` })

        //existUrl
        const existUrl = await urlModel.findOne({ urlCode })
        if (!existUrl) return res.status(404).send({ message: `No url found by this '${urlCode}' shortid.` });
        return res.status(302).redirect(existUrl.longUrl)
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err.message });
    }
};

module.exports = { createUrl, getUrl };