let data =[]

let currentPage = 1

let dlID = undefined

let editId = undefined

const api_url = "https://reqres.in/api/users?page="

const getListUser = async (url) => {
    const response = await fetch(url);
    const res = await response.json(); 

    data = [...data,...res.data]
    renderListUser()
}

getListUser(api_url+currentPage)

const renderListUser = () =>{
    let listUser = ''

    data.forEach((item,index) =>{
        listUser += `
        <li class="media">
            <div class="cardUser d-flex">
                <img src="${item.avatar}" class="mr-3" alt="...">
                <div class="media-body">
                    <h5 class="mt-0 mb-1">${item.first_name} ${item.last_name}</h5>
                    <p class="card-text">${item.email}</p>
                </div>
                <button href="" class="btn btn-primary" onclick="btnEdit(${item.id})">Edit</button>
                <button href="" class="btn btn-danger" onclick="btnDelete(${item.id})" data-toggle="modal" data-target="#exampleModal">Delete</button>
            </div>
        </li>`
    })

    document.getElementById("users").innerHTML = listUser
}

document.getElementById('loadMore').onclick = () =>{
    currentPage++
    getListUser(`https://reqres.in/api/users?page=${currentPage}`)
}

document.getElementById("addRandom").onclick = () =>{
    newUser = `
    <form>
        <div class="form-group">
            <label for="InputName">First Name: </label>
            <input type="text" class="form-control" id="InputFirstName">
        </div>
        <div class="form-group">
            <label for="InputName">Last Name: </label>
            <input type="text" class="form-control" id="InputLastName">
        </div>
        <div class="form-group">
            <label for="InputEmail">Email: </label>
            <input type="email" class="form-control" id="InputEmail">
        </div>
        <div class="form-group">
            <label for="InputImg">Link Img: </label>
            <input type="text" class="form-control" id="InputImg">
        </div>
        <button type="button" class="btn btn-primary" onclick="addNewUser()">Submit</button>
        </form>`

    document.getElementById("formAdd").innerHTML = newUser
}

const randomID = () =>{
    let id = 0
    let rdID = undefined
  
    do{
        id = Math.floor(Math.random()*10)
        rdID = data.find(item => item.id == id)
    }
    while(rdID != undefined)
    
    return id
  }


function addNewUser(){

    const inputFirstName = document.getElementById("InputFirstName").value
    const inputLastName = document.getElementById("InputLastName").value 
    const inputEmail = document.getElementById("InputEmail").value
    const inputLinkImg = document.getElementById("InputImg").value
    

    
    document.getElementById("InputFirstName").value = " "
    document.getElementById("InputLastName").value = " "
    document.getElementById("InputEmail").value = " "
    document.getElementById("InputImg").value = " "

    if(inputFirstName == " "|| inputEmail == "" || inputLastName == "" || inputLinkImg ==""){
        alert("Vui lòng điền đủ thông tin")
    }
    else{
        let newUser = {id:randomID(),first_name:inputFirstName, last_name:inputLastName, email:inputEmail, avatar:inputLinkImg}
        data.push(newUser)
        renderListUser()
    }
}


function btnDelete(id){
    const deleteID = data.find(item =>item.id ==id)

    dlID = id
}

document.getElementById("deleteUser").onclick = () =>{
    data = data.filter(item => item.id != dlID)
    renderListUser()
}

document.getElementById("Reload").onclick = ()=>{
    window.location.reload("Refresh")
}

function btnEdit(id){
    editUser = `
        <div class="formEdit">
            <div class="form-group">
                <label for="InputName">First Name: </label>
                <input type="text" class="form-control" id="InputFirstName" >
            </div>
            <div class="form-group">
                <label for="InputName">Last Name: </label>
                <input type="text" class="form-control" id="InputLastName">
            </div>
            <div class="form-group">
                <label for="InputEmail">Email: </label>
                <input type="email" class="form-control" id="InputEmail">
            </div>
            <div class="form-group">
                <label for="InputImg">Link Img: </label>
                <input type="text" class="form-control" id="InputImg">
            </div>
            <button class="btn btn-primary" onclick="saveNewUser()">Save</button>
        </div>
        
        `

    document.getElementById("formAdd").innerHTML = editUser

    const index = data.find(item => item.id == id)
    document.getElementById("InputFirstName").value = index.first_name
    document.getElementById("InputLastName").value = index.last_name
    document.getElementById("InputEmail").value = index.email
    document.getElementById("InputImg").value = index.avatar

    editId = id
}

function saveNewUser(){ 
    const first_name = document.getElementById("InputFirstName").value
    const last_name = document.getElementById("InputLastName").value
    const email = document.getElementById("InputEmail").value
    const avatar = document.getElementById("InputImg").value

    document.getElementById("InputFirstName").value = " "
    document.getElementById("InputLastName").value = " "
    document.getElementById("InputEmail").value = " "
    document.getElementById("InputImg").value = " "
  
    if(first_name == " "|| last_name == "" || email == "" || avatar ==""){
        alert("Vui lòng điền đủ thông tin")
    }
    else{
        data = data.map((item,index)=>{
            if(item.id === editId){
                return {
                    ...item,
                    first_name:first_name,
                    last_name:last_name,
                    email: email,
                    avatar
                }
            }
            else {
                return item
            }
        })
        renderListUser()
    }
}
 
 