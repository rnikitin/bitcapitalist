/**
 * Created by Roman on 09.12.13.
 */

var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

module.exports.connect = function(callback){
    var transactions = nStore.new('../data/transactions.db', function () {
        // we connected
        callback(transactions);
    });
};