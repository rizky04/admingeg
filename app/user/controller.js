
module.exports={
    viewSigin: async(res, req)=>{
        try{
            req.render('admin/user/view_login')
        } catch (err){
            console.log(err)
        }
    }
}