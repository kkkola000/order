// Фиктивный пароль
const PASSWORD = "123456";

// Фиктивные данные заказов
let orders = [
    { id: 1, item: "Коляска A", quantity: 2, status: "Доставлено" },
    { id: 2, item: "Коляска B", quantity: 1, status: "В пути" },
];

// Текущий редактируемый заказ
let currentOrder = null;

// Элементы DOM
const loginDiv = document.getElementById("login");
const ordersDiv = document.getElementById("orders");
const editOrderDiv = document.getElementById("editOrder");
const ordersTable = document.getElementById("ordersTable");
const errorText = document.getElementById("error");

// Элементы формы редактирования
const editItem = document.getElementById("editItem");
const editQuantity = document.getElementById("editQuantity");
const editStatus = document.getElementById("editStatus");

// Показать окно входа при загрузке
window.onload = function () {
    loginDiv.style.display = "block";
};

// Вход
function login() {
    const password = document.getElementById("password").value;
    if (password === PASSWORD) {
        loginDiv.style.display = "none";
        ordersDiv.style.display = "block";
        renderOrders();
    } else {
        errorText.textContent = "Неверный пароль!";
    }
}

// Выход
function logout() {
    ordersDiv.style.display = "none";
    loginDiv.style.display = "block";
    errorText.textContent = "";
}

// Рендер списка заказов
function renderOrders() {
    ordersTable.innerHTML = "";
    orders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.item}</td>
            <td>${order.quantity}</td>
            <td>${order.status}</td>
            <td>
                <button onclick="editOrder(${order.id})">Редактировать</button>
            </td>
        `;
        ordersTable.appendChild(row);
    });
}

// Редактирование заказа
function editOrder(id) {
    currentOrder = orders.find(order => order.id === id);
    if (currentOrder) {
        editItem.value = currentOrder.item;
        editQuantity.value = currentOrder.quantity;
        editStatus.value = currentOrder.status;

        ordersDiv.style.display = "none";
        editOrderDiv.style.display = "block";
    }
}

// Сохранение изменений
function saveOrder(event) {
    event.preventDefault();
    if (currentOrder) {
        currentOrder.item = editItem.value;
        currentOrder.quantity = parseInt(editQuantity.value, 10);
        currentOrder.status = editStatus.value;

        editOrderDiv.style.display = "none";
        ordersDiv.style.display = "block";
        renderOrders();
    }
}

// Отмена редактирования
function cancelEdit() {
    editOrderDiv.style.display = "none";
    ordersDiv.style.display = "block";
}
