const User = require('../models/userModel')

exports.addUser = async (req, res) => {
	try {
		const user = await User.findOne({ login: req.body.login })
		if (user) {
			return res.status(400).send('That user already exisits!');
		} else {
			const user = await User.create(req.body)
			res.status(200).json(user)
		}
	} catch (error) {
		console.log(error.mesage)
		res.status(500).json({message: error.message})
	}
}

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({})
		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

exports.loginUser = async (req, res) => {
	const {login, password} = req.body
	
	try {
		const user = await User.login(login, password)
		res.status(200).json(user)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
	
}

exports.addData = async (req, res) => {
	const { login, password, city, time, pm2_5, pm10 } = req.body
	
	try {
		await User.login(login, password)
		const user = await User.findOneAndUpdate({ login: login }, {city: city, time: time, pm2_5: pm2_5, pm10: pm10}, { new: true })
		res.status(200).json(user)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

exports.addRecord = async (req, res) => {
	const { login, password, time, pm2_5, pm10 } = req.body
	
	try {
		await User.login(login, password)
		const user = await User.findOneAndUpdate({ login: login }, { $push: {time: time, pm2_5: pm2_5, pm10: pm10}})
		res.status(200).json(user)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

