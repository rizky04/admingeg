const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
let playerSchema = mongoose.Schema({
    role  :  {
        type : String,
        enum : ['admin', 'user'],
        default : 'user'
    },
    status : {
        type : String,
        enum : ['Y', 'N'],
        default : 'Y'
    },
    email :  {
        type : String,
        require : [true, 'email harus diisi'],
    },
    password  : {
        type: String,
        require : [true, 'password harus diisi'],
        maxLenght : [255, "panjang password maksimal 255 karakter"]
    },
    phoneNumber  : {
        type: String,
        require : [true, 'phone number harus diisi'],
        maxLenght : [255, "panjang phone number maksimal 255 karakter"],
        minLenght : [3, "panjang phone number maksimal 3 - 255 karakter"]
    },
    username  : {
        type: String,
        require : [true, 'username harus diisi'],
        maxLenght : [255, "panjang username maksimal 255 karakter"],
        minLenght : [3, "panjang username maksimal 3 - 255 karakter"]
    },
    name  : {
        type: String,
        require : [true, 'name harus diisi'],
        maxLenght : [255, "panjang name maksimal 255 karakter"],
        minLenght : [3, "panjang name maksimal 3 - 255 karakter"]
    },
    avatar :  {
        type : String
    },
    fileName : {type : String},
    favorite : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    }

    
},{timestamps: true})


playerSchema.path('email').validate(async function (value){
    try {
        const count = await this.model('Player').countDocuments({ email : value})
        return !count;
    } catch (err) {
        throw err;
    }
}, attr => `${attr.value} sudah terdaftar`)

playerSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next();
})

module.exports = mongoose.model('Player', playerSchema);