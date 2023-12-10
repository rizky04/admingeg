const Transaction = require('./model')

module.exports={
    index: async(res, req)=>{
        try{
            const transaction = await Transaction.find().populate('player')
            console.log(transaction);
            req.render('admin/transaction/view_transaction', {transaction})
        } catch (err){
           console.log(err)
        }
    },
    actionStatus : async (req, res)=> {
        try {
            const {id} = req.params
           const {status} = req.query
           await Transaction.findByIdAndUpdate({_id : id}, {status})
            res.redirect('/transaction');
        } catch (err) {
            console.log(err)
            res.redirect('/transaction');
        }
    },
}
