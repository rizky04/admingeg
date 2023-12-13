const Player = require('../player/model')

const path = require('path')
const fs = require('fs')
const config = require('../../config')

const bcrypt = require('bcryptjs')


module.exports={
    signup : async (req, res, next)=>{
        try {
            const payload = req.body

            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootePath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)
                src.on('end', async()=>{
                    try {
                        const player = new Player({...payload, avatar: filename})

                        await player.save()
                        
                        delete player._doc.password
                        
                        res.status(201).json({
                            data: player,
                            message: "data berhasil dikirim"
                        })
                    } catch (err) {
                        if (err && err.name === "ValidationError") {
                            return res.status(422).json({
                                error: 1,
                                message: err.message,
                                fields: err.error
                            })
                        }
                        next(err)
                    }
                })
            } else {
                let player = new Player(payload)

                await player.save()
                
                delete player._doc.password
                
                res.status(201).json({
                    data: player
                })
            }
        } catch (err) {
            if (err && err.name === "ValidationError") {
                return res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.error
                })
            }
            next(err)
        }
    },

    signin : (req, res, next)=>{
        const {email, password} = req.body
        Player.findOne({ email : email }).then((player)=>{
            if (player) {
                const checkPassword = bcrypt.compareSync(password, player.password)
                if (checkPassword) {
                    const tokem = jwt.sign({
                        player : {
                            id : player.id,
                            username : player.username,
                            email : email.email,
                            name : player.name,
                            phoneNumber : player.id,
                            avatar : player.id,
                        }
                    })
                } else {
                    res.status(403).json({
                        message: 'Password yang anda masukkan salah'
                    })
                }
            } else {
              res.status(403).json({
                message : 'email yang anda maskkan belum terdaftar'
              })  
            }
        }).catch(()=>{
            res.status(500).json({
                message: err.message || `internal server error`
            })
        })
    }
}