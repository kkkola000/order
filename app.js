// Фиктивный пароль
const PASSWORD = "123456";

// Фиктивные данные заказов
let orders = [
    { id: 1, item: "Коляска A", description: "Красная коляска для новорожденных", status: "Доставлено" },
    { id: 2, item: "Коляска B", description: "Коляска с 3 колесами, для активных родителей", status: "В пути" },
];

// Текущий редактируемый заказ
let currentOrder = null;

// Элементы DOM
const loginDiv = document.getElementById("login");
const ordersDiv = document.getElementById("orders");
const editOrderDiv = document.getElementById("editOrder");
const addOrderFormDiv = document.getElementById("addOrderForm");
const ordersTable = document.getElementById("ordersTable");
const errorText = document.getElementById("error");

// Элементы формы редактирования
const editItem = document.getElementById("editItem");
const editDescription = document.getElementById("editDescription");
const editStatus = document.getElementById("editStatus");

// Элементы формы добавления нового заказа
const newItem = document.getElementById("newItem");
const newDescription = document.getElementById("newDescription");
const newStatus = document.getElementById("newStatus");

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
            <td>${order.description}</td>
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
        editDescription.value = currentOrder.description;
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
        currentOrder.description = editDescription.value;
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

// Показать форму добавления нового заказа
function showAddOrderForm() {
    addOrderFormDiv.style.display = "block";
    ordersDiv.style.display = "none";
}

// Добавить новый заказ
function addOrder(event) {
    event.preventDefault();
    const newOrder = {
        id: orders.length + 1,
        item: newItem.value,
        description: newDescription.value,
        status: newStatus.value
    };
    orders.push(newOrder);

    addOrderFormDiv.style.display = "none";
    ordersDiv.style.display = "block";
    renderOrders();
}

// Отмена добавления нового заказа
function cancelAddOrder() {
    addOrderFormDiv.style.display = "none";
    ordersDiv.style.display = "block";
}
