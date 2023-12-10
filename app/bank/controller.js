const Bank = require('./model')

module.exports={
    index: async(res, req)=>{
        try{
            const alertMessage = res.flash("alertMessage")
            const alertStatus = res.flash("alertStatus")
            const alert = {message: alertMessage, status: alertStatus}

            const bank = await Bank.find()
            req.render('admin/bank/view_bank', {
                bank ,
                alert,
                name : res.session.user.name,
                title: 'Bank Page',
            })
        } catch (err){
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    },
    viewCreate : async(res, req)=>{
        try {
            req.render('admin/bank/create' , {
                name : res.session.user.name,
                title: 'Create Bank Page',
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')            
        }
    },
    actionCreate : async(req, res)=> {
        try {
            const { name, nameBank, noRekening } = req.body;

            let bank = await Bank({ name, nameBank, noRekening })
            await bank.save();

            req.flash('alertMessage', "Berhasil tambah bank")
            req.flash('alertStatus', "success")

            res.redirect('/bank')

        } catch (err) {
             req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const bank = await Bank.findOne({_id : id})
            res.render('admin/bank/edit', {
                bank,
                name : req.session.user.name,
                title: 'Edit Bank Page',
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const {name, nameBank, noRekening} = req.body;
            const bank = await Bank.findOneAndUpdate({
                _id : id
            }, {name, nameBank, noRekening})
            req.flash('alertMessage', "Berhasil edit bank")
            req.flash('alertStatus', "warning")
            res.redirect('/bank')
        } catch (err) {
            console.log(err)
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const bank = await Bank.deleteOne({_id: id});
            req.flash('alertMessage', "Berhasil hapus bank")
            req.flash('alertStatus', "danger")
            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    }
}
