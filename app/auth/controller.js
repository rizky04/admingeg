const Player = require('../player/model')

module.export={
    signup : async (req, res, next)=>{
        try {
            const payload = req.body

            if (req.file) {
                
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
    }
}