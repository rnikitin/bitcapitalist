/**
 * Created by Roman on 16.12.13.
 */

var Bitstamp = require('bitstamp');


exports.register = function (app) {
    app.post('/api/bitstamp/transactions', api.get_transactions);
    app.get('/api/bitstamp/price', api.get_price);
};

var api = {};

api.get_transactions = function (req, res) {
    var bitstampClient = new Bitstamp(req.body.api_key, req.body.api_secret, req.body.client_id);

    bitstampClient.user_transactions(0, function (err, result) {
        if (!err && !result.error) {
            res.json(result);
        }
        else {
            res.json(500, err || result.error);
        }
    });
};

api.get_price = function (req, res) {
    var bitstampClient = new Bitstamp();

    bitstampClient.ticker(function (err, result) {
        if (!err) {
            res.json(result);
        }
        else {
            res.json(500, err);
        }
    });
};

exports.api = api;