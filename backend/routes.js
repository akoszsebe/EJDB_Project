"use strict"
let path = require('path')


module.exports = (app,dataBase) => {
	console.log('mak')
	app.get('/', (req,res) => {
		res.sendFile(path.resolve('./backend/pages/index.html'))
	})

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
		dataBase.saveUser(name,male,age,function(callback){
			if(callback){
				res.json(callback);
			}
		})
	})

	app.get('/api/listUsers', (req,res) => {
	
		console.log('list');
	
		dataBase.listUsers(function(data){ 
			res.json(data);           
		})
	})

}
