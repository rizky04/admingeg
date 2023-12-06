const Payment = require('./model')
const Bank = require('../bank/model')

module.exports={
    index: async(res, req)=>{
        try{
            const payment = await Payment.find()
            .populate('banks')
            req.render('admin/payment/view_payment', {payment})
        } catch (err){
           console.log(err)
        }
    },
    viewCreate : async(res, req)=>{
        try {
            const banks = await Bank.find()
            req.render('admin/payment/create',{banks})
        } catch (err) {
            console.log(err)            
        }
    },
    actionCreate : async(req, res)=> {
        try {
            const { type, banks } = req.body;
            let payment = await Payment({ type, banks })
            await payment.save();

            res.redirect('/payment')

        } catch (err) {
            console.log(err)
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const banks = await Bank.find()
            const payment = await Payment.findOne({_id : id}).populate('banks')
            res.render('admin/payment/edit', {
                payment , banks
            })
        } catch (err) {
            console.log(err)
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const {type, banks} = req.body;
            const payment = await Payment.findOneAndUpdate({
                _id : id
            }, {type, banks})
            res.redirect('/payment')
        } catch (err) {
            console.log(err)
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const payment = await Payment.deleteOne({_id: id});
            res.redirect('/payment')
        } catch (err) {
            console.log(err)
        }
    },
    actionStatus : async (req, res)=> {
        try {
            const {id} = req.params
            let payment = await Payment.findOne({_id : id})

            let status = payment.status === 'Y' ? 'N' : 'Y';

            payment = await Payment.findOneAndUpdate({_id : id}, {status});
            res.redirect('/payment');
        } catch (err) {
            console.log(err)
            res.redirect('/payment');
        }
    },
}
