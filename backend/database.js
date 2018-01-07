"use strict"
let EJDB = require("ejdb");

let db = EJDB.open('Dbs/ujdb',
                    EJDB.DEFAULT_OPEN_MODE | EJDB.JBOTRUNC);
 
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
