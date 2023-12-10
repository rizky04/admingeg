const mongoose = require('mongoose')
let transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName : {type : String, require: [true, 'Nama game haru diisi']},
        category : {type : String, require: [true, 'Kategori harus diisi']},
        thumbnail : {type :String},
        coinName : {type: String, require: [true, 'Nama koin harus diisi']},
        coinQuantity : {type : String, require: [true, 'Jumlah koin harus diisi']},
        price: {type : Number}
    },
    historyPayment : {
        name : {type : String, require: [true, 'Nama Harus diisi']},
        type : {type : String, require: [true, 'Tipe pembayaran harus diisi']},
        bankName : {type : String, require: [true, 'Nama Bank harus diisi']},
        noRekening : {type : String, require: [true, 'Tipe pembayaran harus diisi']},
    },
    name : {
        type : String,
        require : [true, "nama harus diisi"],
        maxlength : [225, "panjang nama harus antara 3 - 255 karakter"],
        minlength : [3, "panjang nama harus antara 3 - 255 karakter"]
    },
    accountUser : {
        type : String,
        require : [true, "nama harus diisi"],
        maxlength : [225, "panjang nama harus antara 3 - 255 karakter"],
        minlength : [3, "panjang nama harus antara 3 - 255 karakter"]
    },
    tax : {
        type : Number,
        default : 0
    },
    value : {
        type : Number,
        default : 0,
    },
    status : {
        type : String,
        enum : ['pending', 'success', 'failed'],
        default : 'pending'
    },
    player : {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'Player'
    },
    historyUser : {
        name : {type: String, require: [true, 'nama player harus diisi.']},
        phoneNumber : {
            type : Number,
            require: [true, "nama akun harus diiisi"],
            maxlength: [13, "panjang nama harus antara 9 - 13 karakter"],
            minlength: [9, "panjang nama harus antara 9 - 13 karakter"],
        }
    },
    category : {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

    
},{timestamps: true})
module.exports = mongoose.model('Transaction', transactionSchema);