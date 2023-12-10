const Category = require('./model')

module.exports={
    index: async(res, req)=>{
        try{
            const alertMessage = res.flash("alertMessage")
            const alertStatus = res.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const category = await Category.find()
            console.log(alert);
            req.render('admin/category/view_category', {
                category, 
                alert,
                name : res.session.user.name,
                title: 'Category Page',})
        } catch (err){
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    viewCreate : async(res, req)=>{
        try {
            req.render('admin/category/create', {
                name : res.session.user.name,
                title: 'Create Bank Page',
            })
        } catch (err) {
            console.log(err)            
        }
    },
    actionCreate : async(req, res)=> {
        try {
            const { name } = req.body;

            let category = await Category({ name })
            await category.save();
            
            req.flash('alertMessage', "Berhasil tambah kategori")
            req.flash('alertStatus', "success")

            res.redirect('/category')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const category = await Category.findOne({_id : id})
            res.render('admin/category/edit', {
                category,
                name : req.session.user.name,
                title: 'Edit Bank Page',
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const {name} = req.body;
            const category = await Category.findOneAndUpdate({
                _id : id
            }, {name})
            req.flash('alertMessage', "Berhasil edit kategori")
            req.flash('alertStatus', "warning")
            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const category = await Category.deleteOne({_id: id});
            req.flash('alertMessage', "Berhasil hapus kategori")
            req.flash('alertStatus', "danger")

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    }
}
