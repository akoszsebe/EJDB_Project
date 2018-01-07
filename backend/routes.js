"use strict"
let path = require('path')


module.exports = (app,dataBase) => {
	console.log('mak')
	// app.get('/device/getConfigurationPage', (req,res) => {
	// 	res.sendFile(path.resolve('./backend/pages/configpage.html'))
	// })

	app.get('/api/saveUser', (req, res) => {
		var objBody;
		
		if(req.query.name != undefined){
			objBody = req.query
			console.log(req.query);
		}
		else{
			objBody = req.body
			console.log(req.body);
		}
		var name = objBody.name;
		var male = objBody.male;	
		var age = objBody.age;
		dataBase.saveUser(name,male,age,function(error){
			if(error){
				console.error('error:',error)
			}
		})
		res.send("OK");
	})

	app.get('/api/listUsers', (req,res) => {
	
		console.log('list');
	
		dataBase.listUsers(function(data){ 
			res.json(data);           
		})
	})

	app.get('/', (req,res) => {
		res.send("SmartHomeServer")
	})
}