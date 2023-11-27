const Category = require('./model')

module.exports={
    index: async(res, req)=>{
        try{
            const alertMessage = req.flash("alerMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alerMessage, status: alertStatus}
            const category = await Category.find()
            req.render('admin/category/view_category', {category})
        } catch (err){
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    viewCreate : async(res, req)=>{
        try {
            req.render('admin/category/create')
        } catch (err) {
            console.log(err)            
        }
    },
    actionCreate : async(req, res)=> {
        try {
            const { name } = req.body;

            let category = await Category({ name })
            await category.save();

            res.redirect('/category')

        } catch (err) {
            console.log(err)
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const category = await Category.findOne({_id : id})
            res.render('admin/category/edit', {
                category
            })
        } catch (err) {
            console.log(err)
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const {name} = req.body;
            const category = await Category.findOneAndUpdate({
                _id : id
            }, {name})
            res.redirect('/category')
        } catch (err) {
            console.log(err)
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const category = await Category.deleteOne({_id: id});
            res.redirect('/category')
        } catch (err) {
            console.log(err);
        }
    }
}

// const deleteduser = await User.deleteOne({_id:req.params.id});
