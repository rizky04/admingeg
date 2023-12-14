const Player = require('./model')
const Voucher = require('../voucher/model')
const Category = require('../category/model')
const Payment = require('../payment/model')
const Nominal = require('../nominal/model')
const Bank = require('../bank/model')
const Transaction = require('../transaction/model')

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

    voucher : async(req, res)=>{
        try {
            const {id} = req.params
            const voucher = await Voucher.findOne({_id : id})
            res.status(200).json({ data: voucher})
        } catch (err) {
            res.status(500).json({message: err.message || `Internal server error`})
        }
    },

    checkout : async (req, res) =>{
        try {
            const { voucher, nominal, payment, bank, name, accountUser } = req.body

            const res_voucher = await Voucher.findOne({ id : voucher})
            
            .select('name category _id thumbnail user')
            .populate('category')
            .populate('user')

            if (!res_voucher) return res.status(404).json({message: 'voucher game tidak ditemukan'})

            const res_nominal = await Nominal.findOne({id : nominal})
            if(!res_nominal) return res.status(404).json({message: 'nominal tidak ditemukan'})

            const res_payment = await Payment.findOne({id : payment})
            if(!res_payment) return res.status(404).json({message: 'Payment tidak ditemukan'})

            const res_bank = await Bank.findOne({id : bank})
            if(!res_bank) return res.status(404).json({message: 'data bank tidak ditemukan'})

            let tax = (10 / 100) * res_nominal.price;
            let value = res_nominal.price - tax;

            const payload = {
                historyVoucherTopup: {
                    gameName : res_voucher.name,
                    category : res_voucher.category ? res_voucher.category.name : '',
                    thumbnail : res_voucher.thumbnail,
                    coinName : res_nominal.coinName,
                    coinQuantity : res_nominal.coinQuantity,
                    price: res_nominal.price
                },
                historyPayment : {
                    name : res_bank.name,
                    type : res_payment.type,
                    bankName : res_bank.bankName,
                    noRekening : res_bank.noRekening,
                },
                name : name,
                accountUser : accountUser,
                tax : tax,
                value : value,
                player : req.player.id,
                historyUser : {
                    name : res_voucher.user?.name,
                    phoneNumber : res_voucher.user?.phoneNumber
                },
                category : res_voucher.category?.id,
                user : res_voucher.user?.id,
            }

            const transaction = new Transaction(payload)

            await transaction.save()
            
            res.status(201).json({
                data: transaction
            })

        } catch (err) {
            res.status(500).json({message: err.message || `Internal server error`})
        }
    }
}