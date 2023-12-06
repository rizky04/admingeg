const User = require('./model')
const bcrypt = require('bcryptjs')
module.exports = {
    viewSigin: async (res, req) => {
        try {
            req.render('admin/user/view_login')
        } catch (err) {
            console.log(err)
        }
    },
    actionSignin: async (res, req) => {
        try {
            const { email, password } = req.body
            const check = await User.finOne({ email: email })

            if (user) {
                if (user.status === "Y") {
                    const checkPassword = await bcrypt.compare(password, check.password)
                    if (checkPassword) {
                        res.redirect('/dashboard')
                    } else {
                        res.redirect('/')
                    }
                } else {
                    res.redirect('/')
                }
            } else {
                res.redirect('/')
            }

        } catch (err) {
            console.log(err)
        }
    }
}