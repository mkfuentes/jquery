/*$.ajax({
    url: "https://rickandmortyapi.com/api/character",
    data: data,
    success: success,
    dataType: dataType
  });*/
  /*
Verbos de http
Operaciones CRUD
    C reate
    R ead
    U pdate
    D elete
Get : traer datos
Post : enviar datos
Delete : eliminar datos
Patch : actualizar datos
*/
$(document).on('click','.delete-user',(event) => {
    let userKey = $(event.target).data("user-key");
    console.log(userKey)
    $.ajax({
        url:`https://jquerycrud-ed8dc.firebaseio.com/users/${userKey}.json`,
        method:"DELETE",
        success:(response)=>{
            console.log(response)
            printUsers();
        }
    })
})
const getUsers = () => {
    $.ajax({
        url: "https://jquerycrud-ed8dc.firebaseio.com/users/.json",
        method: "GET",
        success: (response) => {
            console.log(response)
            console.log(typeof response)
            $.each(response, (key, value) => {
                $("body").append(`
                    <p><b>User key: ${key}</b> <i>User Name: ${value.userName}</i></p>
                `)
            })
        }
    });
}
var userObject = {
    userName: "Fernanda",
    userAge: "23",
    userPhone: "5554545455"
}
const patchUser = () => {
    $.ajax({
        url: "https://jquerycrud-ed8dc.firebaseio.com/users/-LyWw5mZ9bCv9Q-YrEUK.json",
        method: "PATCH",
        data: JSON.stringify({userName:"Fernanda Palacios"}),
        success: (response) => {
            console.log(response);
            printUsers();
        }
    });
}
const postUser = (userData) => {
    $.ajax({
        url: "https://jquerycrud-ed8dc.firebaseio.com/users/.json",
        method: "POST",
        data: JSON.stringify(userData),
        success: (response) => {
            console.log(response);
            printUsers();
        }
    });
}
const getUserData = () => {
    let userName = $("#user-name").val()
    let userAge = $("#user-age").val()
    let userPhone = $("#user-phone").val()
    let userObject = {userName, userAge, userPhone}
    postUser(userObject);
}
const printUsers = () => {
    let usersCollection = {};
    $("#users-table tbody").empty();
    $.ajax({
        url:"https://jquerycrud-ed8dc.firebaseio.com/users/.json",
        method:"GET",
        success:(response) => {
            usersCollection = response;
            let i = 1;
            $.each(usersCollection, (key, value) => {
                $("#users-table tbody").append(`
                <tr>
                    <th scope="row">${i}</th>
                    <td>${key}</td>
                    <td>${value.userName}</td>
                    <td>${value.userAge}</td>
                    <td>${value.userPhone}</td>
                    <td><div class="btn btn-danger delete-user" data-user-key=${key}>Eliminar</div></td>
                </tr>
                `)
                i++
            })
        }
    })
}
printUsers()
