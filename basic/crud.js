const data = [
    { id: 0, name: 'hung' },
    { id: 1, name: 'hung 1' },
    { id: 2, name: 'hung 2' }
]

const nameNV = document.getElementById('nameNV');

let indexEdit = -1

function handleAdd() {
    if (indexEdit !== -1) {
        data[indexEdit] = { id: indexEdit, name: nameNV.value }
        nameNV.value = ''
    } else {
        if (data.length === 0) {
            data.push({ id: 0, name: nameNV.value })
            nameNV.value = ''
        } else {
            const maxId = Math.max(...data.map(item => item.id))
            data.push({ id: maxId + 1, name: nameNV.value })
            nameNV.value = ''
        }
    }
    render(data);
}

function handleEdit(id) {
    const updatedItems = data.find(item => item.id === id);
    document.getElementById('nameNV').value = updatedItems.name
    indexEdit = id
    console.log(indexEdit);
}

function handleDelete(id) {
    const deleteItem = data.find(item => item.id === id);
    if (deleteItem.id === id) {
        const index = data.indexOf(deleteItem);
        data.splice(index, 1);
    }
    render(deleteItem);
}

function render() {
    let newContent = '';
    data.forEach((item, index) => {
        newContent += `
        <p><span> ${index + 1} -- </span>${item.name} 
        <button onclick="handleEdit(${item.id})" class="btn-edit">edit</button>
        <button onclick="handleDelete(${item.id})" class="btn-delete">delete</button>
        </p>
        `;
    });
    document.querySelector('#show').innerHTML = newContent;
}
render()