var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    birthday: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['Female', 'Mail'],
    },
    Phone: {
        type: Number
    },
    address: {
        type: String,
        maxlength: 45
    },
    houseNo: {
        type: Number
    },
    city: {
        type: String,
        maxlength: 12
    },
    state: {
        type: String,
        enum: ["Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"]
    },
    zip: {
        type: Number,
        
    }
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);