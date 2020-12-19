const mongoose = require('mongoose')
const Schema = mongoose.Schema

const posts = new Schema({
    name: String,  
    cityHistory:Array,
    married:Array,
    stories:Array,
    histPlaces:Array,
    holyPlaces:Array,
})

const Post = mongoose.model('posts', posts)


module.exports = Post
