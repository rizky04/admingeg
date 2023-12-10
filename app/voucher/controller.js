const Voucher = require('./model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports={
    index: async(res, req)=>{
        try{
            const alertMessage = res.flash("alertMessage")
            const alertStatus = res.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const voucher = await Voucher.find()
            .populate('categories')
            .populate('nominals')
            req.render('admin/voucher/view_voucher', {
                voucher,
                alert,
                name : res.session.user.name,
                title: 'Voucher Page',})
        } catch (err){
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    viewCreate : async(res, req)=>{
        try {
            const category = await Category.find()
            const nominal = await Nominal.find()
            req.render('admin/voucher/create', {
                category, 
                nominal,  
                name : res.session.user.name,
                title: 'Create Bank Page',
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');           
        }
    },
    actionCreate : async(req, res)=> {
        try {
            const { name, categories, nominals } = req.body;
            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootePath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)
                src.on('end', async()=>{
                    try {
                        const voucher = new Voucher({
                            name,
                            categories,
                            nominals,
                            thumbnail: filename,
                        })
                        await voucher.save();
                        req.flash('alertMessage', "Berhasil tambah voucher")
                        req.flash('alertStatus', "success")
                        res.redirect('/voucher');
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/voucher');
                    }
                })
            }else{
                const voucher = new Voucher({
                    name,
                    categories,
                    nominals
                })
                await voucher.save();
                req.flash('alertMessage', "Berhasil tambah voucher")
                req.flash('alertStatus', "success")
                res.redirect('/voucher');
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/voucher');
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const category = await Category.find()
            const nominal = await Nominal.find()
            const voucher = await Voucher.findOne({_id : id})
            .populate('categories')
            .populate('nominals')
            res.render('admin/voucher/edit', {
                voucher,
                nominal,
                category,
                name : req.session.user.name,
                title: 'Edit Voucher Page',
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/voucher');
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const { name, categories, nominals } = req.body;
            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootePath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)
                src.on('end', async()=>{
                    try {
                        const voucher = await Voucher.findOne({_id: id})
                        let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
                        if (fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage)
                        }
                        await Voucher.findOneAndUpdate({
                            _id : id   
                        }, {
                            name,
                            categories,
                            nominals,
                            thumbnail: filename,
                        })
                        req.flash('alertMessage', "Berhasil edit voucher")
                        req.flash('alertStatus', "warning")
                        res.redirect('/voucher');
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/voucher');
                    }
                })
            }else{
                await Voucher.findOneAndUpdate({
                    _id : id   
                }, {
                    name,
                    categories,
                    nominals,
                })
                req.flash('alertMessage', "Berhasil edit voucher")
                req.flash('alertStatus', "warning")
                res.redirect('/voucher');
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const voucher = await Voucher.deleteOne({_id: id});
            req.flash('alertMessage', "Berhasil hapus voucher")
            req.flash('alertStatus', "danger")
            res.redirect('/voucher')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    actionStatus : async (req, res)=> {
        try {
            const {id} = req.params
            let voucher = await Voucher.findOne({_id : id})

            let status = voucher.status === 'Y' ? 'N' : 'Y'

            voucher = await Voucher.findOneAndUpdate({_id : id}, {status});
            req.flash('alertMessage', "Berhasil edit Status")
            req.flash('alertStatus', "info")
            res.redirect('/voucher');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
}
