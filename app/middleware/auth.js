const express = require('express');
const user = require('../user/model');
const app = express();

const config = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Player = require('../player/model')

module.exports = {
    isLoginAdmin:  (req, res, next) => {
        if (req.session.user === null || req.session.user === undefined) {
            res.redirect('/')
            console.log("los")
        }else{
            next();
            console.log("crot")
        }
    },
    isLoginPlayer : async(req, res, next)=>{
        try {
            const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
            const data = jwt.verify(token, config.jwtKey)
            const player = await Player.findOne({_id : data.player.id})
            if (!player) {
                throw new Error()
            }
            req.player = player
            req.token = token
            next()
        } catch (err) {
            res.status(401).json({
                error: 'Not authorized to access this resources'
            })
        }
    }
}