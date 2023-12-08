const Transaction = require('./model')

module.exports={
    index: async(res, req)=>{
        try{
            const transaction = await Transaction.find()
            .populate('banks')
            req.render('admin/transaction/view_transaction', {transaction})
        } catch (err){
           console.log(err)
        }
    },
    viewCreate : async(res, req)=>{
        try {
            const banks = await Bank.find()
            req.render('admin/transaction/create',{banks})
        } catch (err) {
            console.log(err)            
        }
    },
    actionCreate : async(req, res)=> {
        try {
            const { type, banks } = req.body;
            let transaction = await transaction({ type, banks })
            await transaction.save();

            res.redirect('/transaction')

        } catch (err) {
            console.log(err)
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const banks = await Bank.find()
            const transaction = await transaction.findOne({_id : id}).populate('banks')
            res.render('admin/transaction/edit', {
                transaction , banks
            })
        } catch (err) {
            console.log(err)
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const {type, banks} = req.body;
            const transaction = await transaction.findOneAndUpdate({
                _id : id
            }, {type, banks})
            res.redirect('/transaction')
        } catch (err) {
            console.log(err)
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const transaction = await transaction.deleteOne({_id: id});
            res.redirect('/transaction')
        } catch (err) {
            console.log(err)
        }
    },
    actionStatus : async (req, res)=> {
        try {
            const {id} = req.params
            let transaction = await transaction.findOne({_id : id})

            let status = transaction.status === 'Y' ? 'N' : 'Y';

            transaction = await transaction.findOneAndUpdate({_id : id}, {status});
            res.redirect('/transaction');
        } catch (err) {
            console.log(err)
            res.redirect('/transaction');
        }
    },
}
