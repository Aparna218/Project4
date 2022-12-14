const shortid = require('shortid');
const validUrl = require('valid-url');
const urlModel = require('../models/urlModel');
const { isValidUrl, isValidBody } = require('../util/validator');
const { SET_ASYNC, GET_ASYNC } = require('../caching/redis');

//createUrl
const createUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!isValidBody(req.body)) return res.status(400).send({ status: false, message: 'Please enter data on the body.' });
        if (!isValidUrl(longUrl)) return res.status(400).send({ status: false, message: ` '${longUrl}' this url isn't valid.` });
        if (!validUrl.isUri(longUrl)) return res.status(400).send({ status: false, message: 'Please enter valid url2' });

        let urlCode = shortid.generate().toLowerCase();
        const shortUrl = `http://localhost:3000/${urlCode}`;
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
        if (!shortid.isValid(urlCode)) return res.status(400).send({ status: false, message: `'${urlCode}' this shortUrl is invalid` });

        //existsCache
        let existsCache = await GET_ASYNC(`${urlCode}`);
        existsCache = JSON.parse(existsCache);
        if (existsCache) return res.status(302).redirect(existsCache.longUrl);

        //existUrl
        const existUrl = await urlModel.findOne({ urlCode });
        if (!existUrl) return res.status(404).send({ message: `No url found by this '${urlCode}' shortid.` });

        //setCache
        await SET_ASYNC(`${urlCode}`, JSON.stringify(existUrl));
        return res.status(302).redirect(existUrl.longUrl);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err.message });
    }
};

module.exports = { createUrl, getUrl };
