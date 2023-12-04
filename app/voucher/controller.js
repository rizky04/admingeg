const Voucher = require('./model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports={
    index: async(res, req)=>{
        try{
            const voucher = await Voucher.find()
            .populate('categories')
            .populate('nominals')
            req.render('admin/voucher/view_voucher', {voucher})
        } catch (err){
           console.log(err)
        }
    },
    viewCreate : async(res, req)=>{
        try {
            const category = await Category.find()
            const nominal = await Nominal.find()
            req.render('admin/voucher/create', {
                category, nominal
            })
        } catch (err) {
            console.log(err)            
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
                        res.redirect('/voucher');
                    } catch (err) {
                        console.log(err);
                    }
                })
            }else{
                const voucher = new Voucher({
                    name,
                    categories,
                    nominals
                })
                await voucher.save();
                res.redirect('/voucher');
            }
        } catch (err) {
            console.log(err)
        }
    },
    viewEdit : async(req, res)=> {
        try {
            const { id } = req.params
            const voucher = await Voucher.findOne({_id : id})
            res.render('admin/voucher/edit', {
                voucher
            })
        } catch (err) {
            console.log(err)
        }
    },
    actionEdit : async(req, res)=> {
        try {
            const {id} = req.params;
            const {name, status, thumbnail, categories, nominals} = req.body;
            const voucher = await Voucher.findOneAndUpdate({
                _id : id
            }, {name, status, thumbnail, categories, nominals})
            res.redirect('/voucher')
        } catch (err) {
            console.log(err)
        }
    },
    actionDelete : async(req, res)=> {
        try {
            const { id } = req.params;
            const voucher = await Voucher.deleteOne({_id: id});
            res.redirect('/voucher')
        } catch (err) {
            console.log(err)
        }
    }
}
