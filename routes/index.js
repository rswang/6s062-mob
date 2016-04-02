var express = require('express');
var router = express.Router();
var Entry = require('../models/Entry');
var io = require('../io');

/* GET home page. */
router.get('/', function(req, res, next) {
    Entry.find({}, function(err, entries) {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(entries);
    })
});

router.post('/', function(req, res, next) {
    var data = req.body.message;
    Entry.create({data: data}, function(err, newEntry) {
        if (err) {
            res.status(500).send(err);
        } else {
					io.emit("message", data);
        	res.status(200).send("Success");
				}
    })
});

router.get('/home', function(req, res) {
    Entry.find({}, function(err, entries) {
        if (err) {
            res.status(500).send(err);
        }
        res.render('index', {title: '6.S062', entries: entries});
    })
})

module.exports = router;
