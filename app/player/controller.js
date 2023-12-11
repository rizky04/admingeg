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
    },
    detailPage: async(req, res)=>{
        try {
            const {id} = req.params
            const voucher = await Voucher.findOne({_id : id})
            .populate('categories')
            .populate('nominals')
            .populate('user', '_id name phoneNumber')

            if (!voucher) {
                return res.status(404).json({message:"voucher game tidak ditemukan!"})
            }

            res.status(200).json({data: voucher})
        } catch (error) {
            res.status(500).json({message: error.message || `internal server error`})
        }
    }
}