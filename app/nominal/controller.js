const Nominal = require('./model')

module.exports={
    index: async(res, req)=>{
        try{
            const nominal = await Nominal.find()
            req.render('admin/nominal/view_nominal', {nominal})
        } catch (err){
           console.log(err)
        }
    },
    viewCreate : async(res, req)=>{
        try {
            req.render('admin/nominal/create')
        } catch (err) {
            console.log(err)            
        }
    },
    actionCreate : async(req, res)=> {
        try {
            const { coinQuantity, coinName, price } = req.body;

            let nominal = await Nominal({ coinQuantity, coinName, price })
            await nominal.save();

            res.redirect('/nominal')

        } catch (err) {
            console.log(err)
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const nominal = await Nominal.findOne({_id : id})
            res.render('admin/nominal/edit', {
                nominal
            })
        } catch (err) {
            console.log(err)
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const {coinQuantity, coinName, price} = req.body;
            const nominal = await Nominal.findOneAndUpdate({
                _id : id
            }, {coinQuantity, coinName, price})
            res.redirect('/nominal')
        } catch (err) {
            console.log(err)
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const nominal = await Nominal.deleteOne({_id: id});
            res.redirect('/nominal')
        } catch (err) {
            console.log(err)
        }
    }
}
