const Transaction = require('../transaction/model')
const Voucher = require('../voucher/model')
const Player = require('../player/model')
const Category = require('../category/model')
module.exports={
    index: async(res, req)=>{
        try{
            const transaction = await Transaction.countDocuments();
            const voucher = await Voucher.countDocuments();
            const player = await Player.countDocuments();
            const category = await Category.countDocuments();
            req.render('index', {
                name : res.session.user.name,
                title: 'Dashboard Page',
                count : {
                    transaction, 
                    player, 
                    voucher, 
                    category
                }
            })
        } catch (err){
            console.log(err)
        }
    }
}