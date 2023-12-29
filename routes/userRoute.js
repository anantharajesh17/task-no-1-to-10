const express = require('express');
const finaltask = require('../controller/userController');

const {uploadImage,updateImage,getAllImages}= require('../controller/imgController');
const multer = require('multer');
const router =express.Router();
const geo = require('../controller/mapController')
//route config
//1.crud config
router.get('/page',finaltask.page)
router.post('/register',finaltask.create);
router.get('/getall',finaltask.findAll);

//2.img api
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//getallimages
router.get('/getallimages',getAllImages)
// post
router.post('/',upload.single('image'),uploadImage);
// put
router.put('/:id', upload.single('image'),updateImage);

router.post('/geocode',geo)



module.exports = router;