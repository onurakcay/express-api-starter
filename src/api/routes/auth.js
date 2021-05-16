const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/user_model');

mongoose.connect("mongodb://localhost:27017/test01");

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        res.json({
            users: users,
        });
    });

});

router.post('/get', (req, res) => {
    User.findOne({ _id: req.body.id }, (err, user) => {
        res.json({
            user: user,
        });
    });

});
router.post('/login', (req, res) => {
    setTimeout(function () {
        User.findOne({ mail: req.body.mail, password: req.body.password }, (err, user) => {
            if (user) {
                res.status(200).json({
                    message: 'Giriş Başarılı.',
                    user: user._id
                });
            } else if (!user) {
                res.status(401).json({
                    message: 'Kullanıcı Bulunamadı.',

                });
            } else if (err) {
                res.status(500).json({
                    message: 'Bağlantı Hatası.',

                });
            } else {
                res.status(500).json({
                    message: 'Bilinmeyen bir hata oluştu.',

                });
            }
        });
    }, 1000);
});

router.post('/add', (req, res) => {
    const user = User({
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password
    });
    user.save();
    console.log("Sonuç:" + user);
    res.status(200).json({
        message: 'Başarıyla Kaydedildi',
        user: user
    });
});

module.exports = router;
