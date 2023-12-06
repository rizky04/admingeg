const Bank = require('./model')

module.exports={
    index: async(res, req)=>{
        try{
            const bank = await Bank.find()
            req.render('admin/bank/view_bank', {bank})
        } catch (err){
           console.log(err)
        }
    },
    viewCreate : async(res, req)=>{
        try {
            req.render('admin/bank/create')
        } catch (err) {
            console.log(err)            
        }
    },
    actionCreate : async(req, res)=> {
        try {
            const { name, nameBank, noRekening } = req.body;

            let bank = await Bank({ name, nameBank, noRekening })
            await bank.save();

            res.redirect('/bank')

        } catch (err) {
            console.log(err)
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const bank = await Bank.findOne({_id : id})
            res.render('admin/bank/edit', {
                bank
            })
        } catch (err) {
            console.log(err)
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const {name, nameBank, noRekening} = req.body;
            const bank = await Bank.findOneAndUpdate({
                _id : id
            }, {name, nameBank, noRekening})
            res.redirect('/bank')
        } catch (err) {
            console.log(err)
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const bank = await Bank.deleteOne({_id: id});
            res.redirect('/bank')
        } catch (err) {
            console.log(err)
        }
    }
}
