const PASSWORD = "123456"; // Пароль для входа

// Проверка пароля при входе
document.getElementById("submitPassword").addEventListener("click", () => {
  const inputPassword = document.getElementById("passwordInput").value;

  if (inputPassword === PASSWORD) {
    // Скрываем модальное окно и показываем содержимое
    document.getElementById("passwordModal").style.display = "none";
    document.body.style.display = "block";
  } else {
    // Показываем сообщение об ошибке
    document.getElementById("error").style.display = "block";
  }
});

// Инициализация данных
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let editingOrderId = null;

// Отрисовка таблицы
function renderOrders() {
  const ordersTable = document.getElementById("ordersTable");
  ordersTable.innerHTML = "";

  orders.forEach((order, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customerName}</td>
      <td>${order.amount}</td>
      <td>${order.status}</td>
      <td>
        <button class="btn btn-edit" onclick="editOrder(${index})">Редактировать</button>
        <button class="btn btn-status" onclick="changeStatus(${index})">Сменить статус</button>
      </td>
    `;

    ordersTable.appendChild(row);
  });
}

// Добавление заказа
document.getElementById("addOrder").addEventListener("click", () => {
  const newOrder = {
    id: Date.now(),
    customerName: "Новый клиент",
    amount: 0,
    status: "Новый",
  };
  orders.push(newOrder);
  saveOrders();
  renderOrders();
});

// Редактирование заказа
function editOrder(index) {
  const order = orders[index];
  editingOrderId = index;

  document.getElementById("customerName").value = order.customerName;
  document.getElementById("orderAmount").value = order.amount;
  document.getElementById("orderStatus").value = order.status;

  document.getElementById("modal").style.display = "block";
}

// Сохранение изменений
document.getElementById("saveOrder").addEventListener("click", () => {
  const name = document.getElementById("customerName").value;
  const amount = document.getElementById("orderAmount").value;
  const status = document.getElementById("orderStatus").value;

  orders[editingOrderId] = { ...orders[editingOrderId], customerName: name, amount: Number(amount), status };
  saveOrders();
  renderOrders();
  closeModal();
});

// Смена статуса
function changeStatus(index) {
  const statuses = ["Новый", "Обрабатывается", "Отправлен", "Завершен"];
  const currentStatus = orders[index].status;
  const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
  orders[index].status = nextStatus;

  saveOrders();
  renderOrders();
}

// Закрытие модального окна
document.getElementById("closeModal").addEventListener("click", closeModal);
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Сохранение данных в localStorage
function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Инициализация
renderOrders();
