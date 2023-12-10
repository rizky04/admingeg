const Payment = require('./model')
const Bank = require('../bank/model')

module.exports={
    index: async(res, req)=>{
        try{
            const alertMessage = res.flash("alertMessage")
            const alertStatus = res.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const payment = await Payment.find()
            .populate('banks')
            req.render('admin/payment/view_payment', {
                payment,
                alert,
                name : res.session.user.name,
                title: 'Payment Page',})
        } catch (err){
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    viewCreate : async(res, req)=>{
        try {
            const banks = await Bank.find()
            req.render('admin/payment/create',{
                banks,
                name : res.session.user.name,
                title: 'Create Payment Page',
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');          
        }
    },
    actionCreate : async(req, res)=> {
        try {
            const { type, banks } = req.body;
            let payment = await Payment({ type, banks })
            await payment.save();
            req.flash('alertMessage', "Berhasil tambah payment")
            req.flash('alertStatus', "success")

            res.redirect('/payment')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const banks = await Bank.find()
            const payment = await Payment.findOne({_id : id}).populate('banks')
            res.render('admin/payment/edit', {
                payment , 
                banks, 
                name : req.session.user.name,
                title: 'Edit Payment Page',
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const {type, banks} = req.body;
            const payment = await Payment.findOneAndUpdate({
                _id : id
            }, {type, banks})
            req.flash('alertMessage', "Berhasil edit payment")
            req.flash('alertStatus', "warning")
            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const payment = await Payment.deleteOne({_id: id});
            req.flash('alertMessage', "Berhasil hapus payment")
            req.flash('alertStatus', "danger")
            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    actionStatus : async (req, res)=> {
        try {
            const {id} = req.params
            let payment = await Payment.findOne({_id : id})

            let status = payment.status === 'Y' ? 'N' : 'Y';

            payment = await Payment.findOneAndUpdate({_id : id}, {status});
            req.flash('alertMessage', "Berhasil ubah status")
            req.flash('alertStatus', "info")
            res.redirect('/payment');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
}
