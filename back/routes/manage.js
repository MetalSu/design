const express = require('express')
const router = express.Router()
const manageContro = require('../controller/manageContro')

//创建接口 /api/manage/add post
router.post('/add',manageContro.add)
router.post('/del/:id',manageContro.del)
router.get('/find',manageContro.find)
router.get('/:id',manageContro.findById)
router.post('/update',manageContro.update)
module.exports= router;