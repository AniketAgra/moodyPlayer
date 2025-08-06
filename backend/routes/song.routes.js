const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadFile = require('../service/storage.service.js'); 
const songModel = require('../models/song.model.js')


const upload = multer({storage:multer.memoryStorage()});



router.post('/songs',upload.single('audio'),async(req, res)=>{
    
    const fileData = await uploadFile(req.file);

    const song = await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        audio:fileData.url,
        mood:req.body.mood
    })

    res.status(201).json({
        message: 'Song uploaded successfully',
        song: song
    })
})

router.get('/songs',async(req,res)=>{
    const {mood} = req.query;  //req.query since we are getting mood from query params

    const songs = await songModel.find({
        mood : mood
    })

    res.status(200).json({
        message:"Songs fetched successfully",
        song : songs
    })
})

module.exports = router;
