const Transaction = require('./model')

module.exports={
    index: async(res, req)=>{
        try{
            const alertMessage = res.flash("alertMessage")
            const alertStatus = res.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const transaction = await Transaction.find().populate('player')
            console.log(transaction);
            req.render('admin/transaction/view_transaction', {
                transaction,
                alert,
                name : res.session.user.name,
                title: 'Transaction Page',
            })
        } catch (err){
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/transaction');
        }
    },
    actionStatus : async (req, res)=> {
        try {
            const {id} = req.params
           const {status} = req.query
           await Transaction.findByIdAndUpdate({_id : id}, {status})
           req.flash('alertMessage', "Berhasil edit status transaction")
            req.flash('alertStatus', "info")
            res.redirect('/transaction');
        } catch (err) {
            console.log(err)
            res.redirect('/transaction');
        }
    },
}
