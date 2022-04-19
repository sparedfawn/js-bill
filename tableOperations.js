import {Bill} from "./Bill.js";
import {Product} from "./Product.js";
import {makeMovable, updateIndex} from "./dragAndDrop.js";

const bill = new Bill();


window.onbeforeunload = () => {

    let list = document.querySelectorAll("tr.draggable");

    for (let element of list) {
        let index = Array.prototype.indexOf.call(list, element)
        element.cells[0].innerHTML = String( index + 1);
        
        localStorage.setItem('name' + index, element.cells[1].innerHTML)
        localStorage.setItem('amount' + index, element.cells[2].innerHTML)
        localStorage.setItem('price' + index, element.cells[3].innerHTML)
    }
}

let i = 0
while (localStorage['name' + i] !== undefined) {

    let product = new Product(localStorage['name' + i], 
                              localStorage['price' + i], 
                              localStorage['amount' + i])

    bill.addProduct(product)
    createRow(product)

    localStorage.removeItem('name' + i)
    localStorage.removeItem('price' + i)
    localStorage.removeItem('amount' + i)

    i++
}

document.getElementById('header').innerText = 'Paragon ' + new Date().toDateString()

document.getElementById("addProduct").onclick = () => {

    if (!isNaN(document.getElementById("priceValue").value) &&
        !isNaN(document.getElementById("amountValue").value)) {

        let name = document.getElementById("nameValue").value
        let price = Math.round(document.getElementById("priceValue").value * 100) / 100
        let amount = Math.round(document.getElementById("amountValue").value * 100) / 100

        let product = new Product(name, price, amount)

        bill.addProduct(product)
        createRow(product)

        for (let id of ['nameValue', 'priceValue', 'amountValue']) {

            document.getElementById(id).value = ''
        }
    } else {
        alert('Podano dane zlego typu')
    }
}

function createRow(product) {

    let index = Array.prototype.indexOf.call(bill.products, product)

    let row = document.createElement("tr");
    let target = document.querySelector("tfoot");

    row.draggable = true;
    row.classList.add("draggable");

    row.insertCell(0).innerHTML = String(index + 1);
    row.insertCell(1).innerHTML = product.name;
    row.insertCell(2).innerHTML = product.amount;
    row.insertCell(3).innerHTML = product.price;
    row.insertCell(4).innerHTML = product.sum;

    let editButton = document.createElement('button')
    editButton.innerHTML = 'Edytuj'

    let editButtonCell = row.insertCell(5)
    editButtonCell.appendChild(editButton)
    editButtonCell.style.backgroundColor = 'white'


    let deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Usun'

    let deleteButtonCell = row.insertCell(6)
    deleteButtonCell.appendChild(deleteButton)
    deleteButtonCell.style.backgroundColor = 'white'

    target.parentNode.insertBefore(row, target);

    updateSum()

    if (index % 2 === 0)
        row.style.backgroundColor = "#8BBEE8FF"
    else
        row.style.backgroundColor = "#A8D5BAFF"


    makeMovable(row)


    editButton.onclick = () => {

        let rows = document.querySelectorAll("tr")
        let index = Array.prototype.indexOf.call(rows, row)

        if (editButton.classList.contains('edit')) {

            editButton.classList.remove('edit')

            for (let i = 1; i <= 3; i++) {

                let inputField = row.cells[i].children[0]

                let value = inputField.value

                inputField.parentElement.removeChild(inputField)

                row.cells[i].innerHTML = value
            }

            bill.editProduct(index - 1,
                row.cells[1].innerHTML,
                row.cells[2].innerHTML,
                row.cells[3].innerHTML)

            row.cells[4].innerHTML = bill.products[index - 1].sum

            updateSum()

        } else {

            editButton.classList.add('edit')

            for (let i = 1; i <= 3; i++) {

                let value = row.cells[i].innerHTML
                row.cells[i].innerHTML = ''
                let inputField = document.createElement('input')
                inputField.value = value
                row.cells[i].appendChild(inputField)
            }

        }
    }

    deleteButton.onclick = () => {

        let rows = document.querySelectorAll("tr")
        let index = Array.prototype.indexOf.call(rows, row)

        row.parentElement.removeChild(rows[index])

        bill.deleteProduct(index - 1)

        updateSum()
        updateIndex()
    }
}

function updateSum() {

    document.getElementById('value').innerHTML = bill.sum.toString()
}