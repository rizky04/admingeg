const Player = require('./model')
const Voucher = require('../voucher/model')
const Category = require('../category/model')
const Payment = require('../payment/model')
const Nominal = require('../nominal/model')
const Bank = require('../bank/model')

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
    },
    category : async(req, res)=>{
        try {
            const category = await Category.find()
            res.status(200).json({ data: category})
        } catch (err) {
            res.status(500).json({message: err.message || `Internal server error`})
        }
    },
    checkout : async (req, res) =>{
        try {
            const {accountUser, name, nominal, voucher, payment, bank} = req.body

            const res_voucher = await Voucher.findOne({_id : voucher})
            .select('name category _id thumbnail user')
            .populate('category')
            .populate('user')
            if (!res_voucher) return res.status(404).json({message: 'voucher game tidak ditemukan'})

            const res_nominal = await Nominal.findOne({_id : nominal})
            if(!res_nominal) return res.status(404).json({message: 'nominal tidak ditemukan'})

            const res_payment = await Payment.findOne({_id : payment})
            if(!res_payment) return res.status(404).json({message: 'Payment tidak ditemukan'})

            const res_bank = await Bank.findOne({_id : bank})
            if(!res_bank) return res.status(404).json({message: 'data bank tidak ditemukan'})

            let tac = (10 / 100) * res.nominal._doc.price;
            let value = res_nominal._doc.price - TextTrack;

            const payload = {
                historyVoucherTopup: {
                    gameName : res_voucher._doc.name,
                    category : res_voucher._doc.category ? res_voucher._doc.category.name : '',
                    thumbnail : res_voucher._doc.thumbnail,
                    coinName : res_nominal._doc.coinName,
                    coinQuantity : res_nominal._doc.coinQuantity,
                    price: res_nominal._doc.price
                },
                historyPayment : {
                    name : {type : String, require: [true, 'Nama Harus diisi']},
                    type : {type : String, require: [true, 'Tipe pembayaran harus diisi']},
                    bankName : {type : String, require: [true, 'Nama Bank harus diisi']},
                    noRekening : {type : String, require: [true, 'Tipe pembayaran harus diisi']},
                },
            }

        } catch (err) {
            res.status(500).json({message: err.message || `Internal server error`})
        }
    }
}