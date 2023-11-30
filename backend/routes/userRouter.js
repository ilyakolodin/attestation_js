const express = require('express')
const userController = require("../controllers/userController")
const userRouter = express.Router()

userRouter.post('/signup', userController.addUser)
userRouter.get('/users', userController.getUsers)
userRouter.post('/login', userController.loginUser)
userRouter.post('/add-data', userController.addData)
userRouter.post('/add-record', userController.addRecord)

module.exports = userRouter