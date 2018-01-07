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


function saveUser(){
    var name = document.getElementById("usr").value;
    var male = document.getElementById('radiotrue').checked;
    var age = document.getElementById("age").value;
    $.ajax({
        url: '/api/saveUser?name='+name+'&male='+male+'&age='+age,
        data: {},
        success: function (data) {
            var tmp = JSON.stringify(data);
            if (tmp == 'true') alert('success')
                else alert('failed');
        },
        error: function () {
        }
    });
}