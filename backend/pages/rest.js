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
            var tmp = JSON.stringify(data,null,3);
            document.getElementById("oneuser").innerHTML = tmp;
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