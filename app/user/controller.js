const User = require('./model')
const bcrypt = require('bcryptjs')
const session = require('express-session')


module.exports = {
    viewSigin: async (req, res) => {
        try {
            if (req.session.user === null || req.session.user === undefined) {
                res.render('admin/user/view_login')
                console.log("error 1");
            } else {
                res.redirect('/dashboard')
                console.log("sukses 2");
            }
        } catch (err) {
            console.log(err)
            res.redirect('/')
        }
    },
    actionSignin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const check = await User.findOne({ email: email })

            if (check) {
                if (check.status === "Y") {
                    const checkPassword = await bcrypt.compare(password, check.password)
                    if (checkPassword) {
                        req.session.user = {
                            id: check._id,
                            email: check.email,
                            status: check.status,
                            name: check.name,
                        }
                        res.redirect('/dashboard')
                    } else {
                        res.redirect('/')
                        console.log("error 2");
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
    },
    actionLogout: (req, res)=>{
        req.session.destroy();
        res.redirect('/');
    }
}