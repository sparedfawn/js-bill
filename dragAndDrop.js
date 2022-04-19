const container = document.querySelector('.container')

export function makeMovable(draggable) {

    container.appendChild(draggable);
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
}

container.addEventListener('dragover', e => {
    e.preventDefault()
    let afterElement = getDragAfterElement(container, e.clientY)
    let draggable = document.querySelector('.dragging');
    if (afterElement == null) {
        container.appendChild(draggable);
        updateIndex();
    } else {
        container.insertBefore(draggable, afterElement);
        updateIndex();
    }
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {

        let box = child.getBoundingClientRect()
        let offset = y - box.top - box.height / 2

        if (offset < 0 && offset > closest.offset)
            return { offset: offset, element: child }
        else
            return closest

    }, { offset: Number.NEGATIVE_INFINITY }).element
}


export function updateIndex(){
    let list = document.querySelectorAll("tr.draggable");

    for (let element of list) {
        let index = Array.prototype.indexOf.call(list, element)
        element.cells[0].innerHTML = String( index + 1);
        if (index % 2 === 0) {
            element.style.backgroundColor = "#8BBEE8FF"
        }
        else {
            element.style.backgroundColor = "#A8D5BAFF"
        }
    }
}
