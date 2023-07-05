const data = local();
let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPhoneNumber = /^(?:\+84|0)(?:\d{9,10})$/;
let editIndex = -1;
const searchValue = document.getElementById('searchValue');
function render(val) {
    let newContent = ''
    if (searchValue.value === '') {
        data.forEach((item, index) => {
            newContent += `<tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.hometown}</td>
                    <td>${item.gender === 'men' ? 'nam' : 'nu'}</td>
                    <td>
                        <button onclick="edit('${+item.id}')">edit</button>
                        <button onclick="handleDelete(${+item.id})">delete</button>
                    </td>
                </tr>`
        });
    } else {
        val.forEach((item, index) => {
            newContent += `<tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.hometown}</td>
                    <td>${item.gender === 'men' ? 'nam' : 'nu'}</td>
                    <td>
                        <button onclick="edit('${index}')">edit</button>
                        <button onclick="handleDelete(${index})">delete</button>
                    </td>
                </tr>`
        });
    }
    document.querySelector('#album').innerHTML = newContent
}
function handleDelete(id) {
    const deleteItem = data.find(item => item.id === id);
    if (deleteItem.id === id) {
        const index = data.indexOf(deleteItem);
        data.splice(index, 1);
    }
    render(deleteItem);
    const myArrayJson = JSON.stringify(data);
    localStorage.setItem('data', myArrayJson);
}

function edit(id) {
    const index = data.find(el => el.id === +id)
    console.log(index);
    const name = index.name
    const email = index.email
    const phone = index.phone
    const hometown = index.hometown
    const gender = index.gender
    document.getElementById('name').value = name
    document.getElementById('email').value = email
    document.getElementById('phone').value = phone
    document.getElementById('hometown').value = hometown
    const menRadio = document.getElementById('men');
    const womenRadio = document.getElementById('women');
    if (gender === 'men') {
        menRadio.checked = true;
        womenRadio.checked = false;
    } else {
        menRadio.checked = false;
        womenRadio.checked = true;
    }
    editIndex = id;
    document.getElementById('isCheckButton').innerHTML = 'edit'
}

function submit() {
    const value = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value
    const hometown = document.getElementById('hometown').value
    const gender = document.querySelector('input[name="genderS"]:checked').value
    if (editIndex !== -1) {
        let newValue = { id: +editIndex, email: email, name: value, phone: phone, hometown: hometown, gender: gender };
        validate(newValue)
    } else {
        let newValue = {}
        if (data.length === 0) {
            newValue = { id: 0, email: email, name: value, phone: phone, hometown: hometown, gender: gender }
        } else {
            const maxId = Math.max(...data.map(item => item.id));
            newValue = { id: maxId + 1, email: email, name: value, phone: phone, hometown: hometown, gender: gender }
        }
        validate(newValue)
    }
    editIndex = -1;
    document.getElementById('isCheckButton').innerHTML = 'add'
}
function validate(params) {
    console.log(editIndex);
    console.log(params);
    let isValid = false
    if (params.name.length === 0) {
        isValid = true
        document.getElementById('errName').style.display = 'block'
    }
    if (params.email.length === 0) {
        isValid = true
        document.getElementById('errEmail').style.display = 'block'
    }
    if (!mailFormat.test(params.email) && params.email !== '') {
        document.getElementById('errEmail').innerHTML = 'Email chưa đúng định dạng'
        document.getElementById('errEmail').style.display = 'block'
        isValid = true;
    }
    if (!regexPhoneNumber.test(params.phone)) {
        document.getElementById('errPhone').innerHTML = 'SĐT chưa đúng định dạng'
        document.getElementById('errPhone').style.display = 'block'
        isValid = true;
    }
    if (params.phone.length === 0) {
        isValid = true
        document.getElementById('errPhone').style.display = 'block'
    }
    if (params.hometown.length === 0) {
        isValid = true
        document.getElementById('errHometown').style.display = 'block'
    }
    if (isValid === false) {
        const isCheckId = data.find(el => el.id === +params.id)
        console.log(isCheckId);
        if (isCheckId !== undefined) {
            data[+editIndex] = params
            const myArrayJson = JSON.stringify(data);
            localStorage.setItem('data', myArrayJson);
            render(data)
            document.getElementById('errName').style.display = 'none'
            document.getElementById('errEmail').style.display = 'none'
            document.getElementById('errPhone').style.display = 'none'
            document.getElementById('errHometown').style.display = 'none'
            // 
            document.getElementById('name').value = ''
            document.getElementById('email').value = ''
            document.getElementById('phone').value = ''
            document.getElementById('hometown').value = ''
        } else {
            const index = data.findIndex(el => el.email === params.email)
            if (index === -1) {
                data.push(params)
                const myArrayJson = JSON.stringify(data);
                localStorage.setItem('data', myArrayJson);
                render(data)
                document.getElementById('errName').style.display = 'none'
                document.getElementById('errEmail').style.display = 'none'
                document.getElementById('errPhone').style.display = 'none'
                document.getElementById('errHometown').style.display = 'none'
                // 
                document.getElementById('name').value = ''
                document.getElementById('email').value = ''
                document.getElementById('phone').value = ''
                document.getElementById('hometown').value = ''
            } else {
                document.getElementById('errEmail').innerHTML = 'Email đã được đăng ký'
                document.getElementById('errEmail').style.display = 'block'
            }
        }
    } else {
        return
    }
}

function handleSort() {
    data.sort((a, b) => a.name.localeCompare(b.name));
    render(data);
}

function local() {
    const results = localStorage.getItem('data');
    const myArray = JSON.parse(results);
    return myArray ? myArray : []
}

function search() {
    const newValue = searchValue.value;
    const filter = data.filter((item) => item.name.toLowerCase().includes(newValue.toLowerCase()));
    render(filter);
}

render() 