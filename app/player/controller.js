const Player = require('./model')
const Voucher = require('../voucher/model')

module.exports = {
    landingPage : async(req, res)=> {
        try {
        const voucher = await Voucher.find()
        .select('_id name status categories thumbnail')
        .populate('categories')

        res.status(200).json({data: voucher})
        } catch (error) {
            res.status(500).json({message: error.message || `terjadi kesalahan pada server`})
        }
    }
}