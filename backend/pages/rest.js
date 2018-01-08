function loadAllUsers(){
    $.ajax({
        url: '/api/listUsers',
        data: {},
        success: function (data) {
            var tmp = JSON.stringify(data,null,3);
            document.getElementById("list").innerHTML = tmp;
        },
        error: function () {
        }
    });
}

function loadUser(){
    var id = document.getElementById("id").value;
    if (id == "") {
        alert('id is required');
        retrun;
    }
    $.ajax({
        url: '/api/loadUser?id='+id,
        data: {},
        success: function (data) {
            document.getElementById("updtaediv").classList.remove('hidden');
            document.getElementById("updtaediv").classList.add('show');
            document.getElementById("upusr").value = data.name;
            document.getElementById("upage").value = data.age;
            if( data.male == 'true') document.getElementById("upradiotrue").checked = true;
                else document.getElementById("upradiofalse").checked = true;
        },
        error: function () {
        }
    });
}


function removeUser(){
    var id = document.getElementById("id").value;
    if (id == "") {
        alert('id is required');
        retrun;
    }
    $.ajax({
        url: '/api/removeUser?id='+id,
        data: {},
        success: function (data) {
            document.getElementById("upusr").value = "";
            document.getElementById("upage").value = "";
            if( data.male == 'true') document.getElementById("upradiotrue").checked = true;
                else document.getElementById("upradiofalse").checked = true;
        },
        error: function () {
        }
    });
}


function saveUser(){
    var name = document.getElementById("usr").value;
    var male = document.getElementById('radiotrue').checked;
    var age = document.getElementById("age").value;
    $.ajax({
        url: '/api/saveUser?name='+name+'&male='+male+'&age='+age,
        data: {},
        success: function (data) {
            var tmp = JSON.stringify(data);
            if (tmp == 'true') {
                    document.getElementById("btsave").classList.remove('btn-primary');
                    document.getElementById("btsave").classList.add('btn-success');
                    setTimeout(function(){
                        document.getElementById("btsave").classList.remove('btn-success');
                        document.getElementById("btsave").classList.add('btn-primary');   
                    },1000)
                }
                else alert('failed');
        },
        error: function () {
        }
    });
}

function updateUser(){
    var id = document.getElementById("id").value;
    var name = document.getElementById("upusr").value;
    var male = document.getElementById('upradiotrue').checked;
    var age = document.getElementById("upage").value;
    $.ajax({
        url: '/api/updateUser?id='+id+'&name='+name+'&male='+male+'&age='+age,
        data: {},
        success: function (data) {
            var tmp = JSON.stringify(data);
            if (tmp == 'true') {
                    document.getElementById("btupdate").classList.remove('btn-primary');
                    document.getElementById("btupdate").classList.add('btn-success');
                    setTimeout(function(){
                        document.getElementById("btupdate").classList.remove('btn-success');
                        document.getElementById("btupdate").classList.add('btn-primary');   
                    },1000)
                }
                else alert('failed');
        },
        error: function () {
        }
    });
}


function multiuploadUsers(){
    var id1 = document.getElementById("id1").value;
    var name1 = document.getElementById("upusr1").value;
    var id2 = document.getElementById('id2').value;
    var name2 = document.getElementById("upusr2").value;
    $.ajax({
        url: '/api/updatemultiUser?id1='+id1+'&name1='+name1+'&id2='+id2+'&name2='+name2,
        data: {},
        success: function (data) {
            var tmp = JSON.stringify(data);
            if (tmp == 'true') {
                    document.getElementById("success").classList.remove('hidden');
                    document.getElementById("failed").classList.add('hidden');
                } else{
                        document.getElementById("failed").classList.remove('hidden');
                        document.getElementById("success").classList.add('hidden');   
                }
            loadAllUsers();
        },
        error: function () {
        }
    });
}