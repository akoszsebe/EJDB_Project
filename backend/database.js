"use strict"
let EJDB = require("ejdb");

let db = EJDB.open('Dbs/ujdb',
                    EJDB.DEFAULT_OPEN_MODE );
 
var DataBase = module.exports = function () {
	this.init()
}

DataBase.prototype.init = function () {
	var self = this
	console.log("connected to ejdb");
}

DataBase.prototype.close = function () {
	var self = this
	db.close();
	console.log("disconnected from ejdb");
}


DataBase.prototype.saveUser = function(name,male,age,_callback) {
	var self = this

	var user = {
		name : name,
    	male : male,
    	age : age
	};
	
	db.save("users", user, function(err, oids) {
		if (err) {
			console.error(err);
			return _callback(false);
		}
		console.log("User OID: " + user["_id"]);	 
		return _callback(true);
	});
	 
}

DataBase.prototype.listUsers = function (_callback) {
	var self = this;
	
	db.find('users', function(err, cursor, count) {
        if (err) {
            console.error(err);
            return _callback(null);
		}
		
		var data = [];
        console.log("Found " + count + " users");
		
		while (cursor.next()) {
			var tmp = {};
			tmp.id = cursor.field('_id');
			tmp.name = cursor.field('name');
			tmp.male = cursor.field('male');
			tmp.age = cursor.field('age'); 
			console.log("User --- ", tmp);
			data.push(tmp);
		}

        cursor.close();
        return _callback(data);
    });
}

DataBase.prototype.loadUser = function (id,_callback) {
	var self = this;
	
	db.load('users',id, function(err, data) {
        if (err) {
            console.error(err);
            return _callback(null);
		}
        console.log("Found " + data + " users");
        return _callback(data);
    });
}

DataBase.prototype.removeUser = function (id,_callback) {
	var self = this;
	
	db.remove('users',id, function(data) {
        if (data != undefined) {
            return _callback(false);
		}
        console.log("removed " + data + " users");
        return _callback(true);
    });
}

DataBase.prototype.updateUser = function (id,name,male,age,_callback) {
	var self = this;

    db.update('users',{ '_id': id, $set :{'name': name, 'male': male, 'age' : age}}, function(err,count) {
        if (err != undefined) {
            return _callback(false);
		}
        console.log("updated " + count +"  err: "+ err+ " users");
        return _callback(true);
	});
	
}

DataBase.prototype.updateUserTransaction = function (id,name,male,age,_callback) {
	var self = this;
	
	var user = {
		id : id,
		name : name,
    	male : male,
    	age : age
	};
	
db.beginTransaction('users', function(error) {
    	db.update('users',{ '_id': id, $set :{'name': name, 'male': male, 'age' : age}}, function(err,count) {
        	if (err != undefined) {
            	db.rollbackTransaction('users', function(e){
            		console.log("rollback ",e);
            		return _callback(false);
            	});
			}
        	console.log("updated " + count +"  err: "+ err+ " users");
        	db.commitTransaction('users',function(e) {
        		console.log("commit ",e);
        		return _callback(true);	
        	})
		});
	})
}


DataBase.prototype.multiupdateUserTransaction = function (id1,name1,id2,name2,_callback) {
	var self = this;
	
db.beginTransaction('users', function(error) {
    	db.update('users',{ '_id': id1, $set :{'name': name1 }}, function(err,count) {
        	if (name1 == 'hiba') err = "hiba";
        	if (err != undefined) {
            	db.rollbackTransaction('users', function(e){
            		console.log("rollback ",e);
            		return _callback(false);
            	});
			} else {
        		console.log("updated " + count +"  err: "+ err+ " users");
	        	db.update('users',{ '_id': id2, $set :{'name': name2 }}, function(err,count) {
	        		if (name2 == 'hiba') err = "hiba";
		        	if (err != undefined) {
		            	db.rollbackTransaction('users', function(e){
		            		console.log("rollback ",e);
		            		return _callback(false);
		            	});
					} else {
		        		console.log("updated " + count +"  err: "+ err+ " users");
		        		db.commitTransaction('users',function(e) {
		        			console.log("commit ",e);
		        			return _callback(true);	
		        		})
					}
				});
			}
		});
		
	})
}