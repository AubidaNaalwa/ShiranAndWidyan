const express = require('express')
const router = express.Router()
const post = require('./posts')
const path = require('path')


router.get('/',function(req,res){
    console.log("ohh hi new visitor")
    res.send("connected")
})

router.get('/posts', async function(req, res){
    post.find({}, function(err, data){
        res.send({data})
    })
})

router.post('/posts', async function(req, res){
    const postFromClient = req.body
    const newPost =new post(postFromClient)
    newPost.save()
    res.end()
})

router.get('/image/:fileName/:number', async function(req, res){
    const fn = req.params.fileName
    const n = req.params.number
   
    res.sendFile( path.join(__dirname, `images/${fn}/${n}.jpg`));
})




module.exports = router