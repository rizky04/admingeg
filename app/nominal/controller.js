const Nominal = require('./model')

module.exports={
    index: async(res, req)=>{
        try{
            const alertMessage = res.flash("alertMessage")
            const alertStatus = res.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            
            const nominal = await Nominal.find()
            req.render('admin/nominal/view_nominal', {
                nominal, 
                alert,
                name : res.session.user.name,
                title: 'Nominal Page'})
        } catch (err){
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/nominal');
        }
    },
    viewCreate : async(res, req)=>{
        try {
            req.render('admin/nominal/create', {
                name : res.session.user.name,
                title: 'Create Nominal Page',
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/nominal');          
        }
    },
    actionCreate : async(req, res)=> {
        try {
            const { coinQuantity, coinName, price } = req.body;

            let nominal = await Nominal({ coinQuantity, coinName, price })
            await nominal.save();

            req.flash('alertMessage', "Berhasil tambah nominal")
            req.flash('alertStatus', "success")

            res.redirect('/nominal')

        } catch (err) {
             req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const nominal = await Nominal.findOne({_id : id})
            res.render('admin/nominal/edit', {
                nominal,
                name : req.session.user.name,
                title: 'Edit Nominal Page',
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const {coinQuantity, coinName, price} = req.body;
            const nominal = await Nominal.findOneAndUpdate({
                _id : id
            }, {coinQuantity, coinName, price})
            req.flash('alertMessage', "Berhasil edit Nominal")
            req.flash('alertStatus', "warning")
            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const nominal = await Nominal.deleteOne({_id: id});
            req.flash('alertMessage', "Berhasil hapus nominal")
            req.flash('alertStatus', "danger")
            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    }
}
