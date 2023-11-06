module.exports={
    index: async(res, req)=>{
        try{
            req.render('index', {
                title: 'Amin Ganteng'
            })
        } catch (err){
            console.log(err)
        }
    }
}