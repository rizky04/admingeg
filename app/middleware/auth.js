const express = require('express');
const user = require('../user/model');
const app = express();
module.exports = {
    isLoginAdmin:  (req, res, next) => {
        if (req.session.user === null || req.session.user === undefined) {
            res.redirect('/')
            console.log("los")
        }else{
            next();
            console.log("crot")
        }

    }
}