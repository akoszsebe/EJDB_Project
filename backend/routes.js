"use strict"
let path = require('path')


module.exports = (app,dataBase) => {
	console.log('mak')
	app.get('/', (req,res) => {
		res.sendFile(path.resolve('./backend/pages/index.html'))
	})

	app.get('/transaction', (req,res) => {
		res.sendFile(path.resolve('./backend/pages/transaction.html'))
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

	app.get('/api/loadUser', (req,res) => {
		var id = req.query.id;
		console.log('load', id);
	
		dataBase.loadUser(id,function(data){ 
			res.json(data);           
		})
	})
	
	app.get('/api/removeUser', (req,res) => {
		var id = req.query.id;
		console.log('load', id);
	
		dataBase.removeUser(id,function(data){ 
			res.json(data);           
		})
	})
	
	app.get('/api/updateUser', (req, res) => {
		var objBody;
		
		if(req.query.id != undefined){
			objBody = req.query
			console.log(req.query);
		}
		else{
			objBody = req.body
			console.log(req.body);
		}
		var id = objBody.id;
		var name = objBody.name;
		var male = objBody.male;	
		var age = objBody.age;
		dataBase.updateUser(id,name,male,age,function(callback){
			res.json(callback);
		})
	})
	
	
	app.get('/api/updatemultiUser', (req, res) => {
		var objBody;
		console.log("UPPPDATTEE ")
		if(req.query.id1 != undefined){
			objBody = req.query
			console.log(req.query);
		}
		else{
			objBody = req.body
			console.log(req.body);
		}
		var id1 = objBody.id1;
		var name1 = objBody.name1;
		var id2 = objBody.id2;	
		var name2 = objBody.name2;
		dataBase.multiupdateUserTransaction(id1,name1,id2,name2,function(callback){
			res.json(callback);
		})
	})
}
