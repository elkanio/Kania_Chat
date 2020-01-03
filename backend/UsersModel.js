const mongoose = require('mongoose');
const {Schema} = mongoose;

const usersSchema = new Schema({
    id: Number,
    name: String,
})

var User = mongoose.model('users', usersSchema);