document.addEventListener('DOMContentLoaded', function () {
    const tableSelect = document.getElementById('tableSelect');
    const dataThead = document.getElementById('data-table-head');
    const dataTbody = document.getElementById('data-table-body');

    let keys;

    window.loadTable = function () {
        if (tableSelect.value !== 'Выберите таблицу...') {
            fetchTableData(tableSelect.value);
        } else {
            alert('Пожалуйста, выберите таблицу.');
        }
    }

    window.add = function () {
        if (tableSelect.value !== 'Выберите таблицу...') {
            openAddModal(keys, 0);
            modal.show();
        } else {
            alert('Пожалуйста, выберите таблицу.');
        }
    }

    window.saveItem = async function () {
        const id = document.getElementById('id') ? document.getElementById('id').value : '';
        const firstName = document.getElementById('firstName') ? document.getElementById('firstName').value : '';
        const lastName = document.getElementById('lastName') ? document.getElementById('lastName').value : '';
        const patronymic = document.getElementById('patronymic') ? document.getElementById('patronymic').value : '';
        const name = document.getElementById('name') ? document.getElementById('name').value : '';
        const departments = document.getElementById('departments') ? document.getElementById('departments').value : '';
        const group = document.getElementById('group') ? document.getElementById('group').value : '';
        const division = document.getElementById('division') ? document.getElementById('division').value : '';
        const type = document.getElementById('type') ? document.getElementById('type').value : '';
        const entity = document.getElementById('entity') ? document.getElementById('entity').value : '';

        const newItem = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            patronymic: patronymic,
            name: name,
            departments: departments,
            group: group,
            division: division,
            type: type,
            entity: entity

        };
        let test1;
        switch (tableSelect.value) {
            case "Departments":
                test1 = await fetch('/api/admin/editDepartment?params=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                break;
            case "DepartmentsGroups":
                test1 = await fetch('/api/admin/editDepartmentGroup?params=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                break;
            case "Divisions":
                test1 = await fetch('/api/admin/editDivision?params=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                break;
            case "Employees":
                test1 = await fetch('/api/admin/editEmployee?params=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                break;
            case "Entities":
                test1 = await fetch('/api/admin/editEntity?params=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                break;
            case "Groups":
                test1 = await fetch('/api/admin/editGroup?params=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                break;
            case "Locations":
                test1 = await fetch('/api/admin/editDepartment?params=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                break;
            case "PositionTypes":
                test1 = await fetch('/api/admin/editPositionType?params=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                break;
            case "Positions":
                test1 = await fetch('/api/admin/editPosition?params=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                break;
            case "Records":
                test1 = await fetch('/api/admin/editRecord?params=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                break;
            default:
                console.log('Неизвестная таблица:', tableName);
        }
        console.log('Сохранение нового элемента:', newItem);
    }


    async function fetchTableData() {
        try {
            const response = await fetch(`/api/admin/getAll${tableSelect.value}`);
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            const dataTable = await response.json();

            // Очистка таблицы перед обновлением
            dataThead.innerHTML = '';
            dataTbody.innerHTML = '';

            if (dataTable.length === 0) {
                alert('Данные отсутствуют.');
                return;
            }

            // Извлечение ключей столбцов из первого объекта
            keys = Object.keys(dataTable[0]);

            // Создание заголовков столбцов
            keys.forEach(key => {
                const th = document.createElement('th');
                th.textContent = key;
                dataThead.appendChild(th);
            });

            // Отображение данных в таблице
            dataTable.forEach(rowData => {
                const tr = document.createElement('tr');

                // Создание ячеек для каждого столбца
                keys.forEach(key => {
                    const td = document.createElement('td');
                    if (typeof rowData[key] === 'object' && rowData[key] !== null) {
                        // Обработка вложенных объектов
                        if (rowData[key].name) {
                            td.textContent = rowData[key].name;
                        } else {
                            td.textContent = ''; // Пример обработки глубже вложенных объектов
                        }
                    } else {
                        // Обработка простых значений
                        td.textContent = rowData[key];
                    }
                    tr.appendChild(td);
                });

                // Создание кнопок для редактирования и удаления
                const tdActions = document.createElement('td');
                const editBtn = document.createElement('button');
                editBtn.classList.add('btn', 'btn-sm', 'btn-primary');
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', function () {
                    openAddModal(keys, rowData.id);
                    modal.show();
                });
                tdActions.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger', 'mx-1');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', function () {
                    deleteRow(rowData.id); // Передача ID строки для удаления
                });
                tdActions.appendChild(deleteBtn);

                tr.appendChild(tdActions);

                // Добавление строки в тело таблицы
                dataTbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Ошибка загрузки данных', error);
        }
    }

    async function deleteRow(id) {
        const s = '/api/admin/delete?table=' + tableSelect.value + '&id=' + id
        console.log(s);
        const serverResp = await fetch(s)
        // fetch(s, {
        //     method: 'DELETE',
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response.text(); // или response.json(), если сервер возвращает JSON
        //         } else {
        //             throw new Error('Ошибка при удалении элемента');
        //         }
        //     })
        //     .then(data => {
        //         console.log('Успешно удалено:', data);
        //     })
        //     .catch(error => {
        //         console.error('Ошибка:', error);
        //     });
    }

    function openAddModal(keys, id) {
        const modalElement = document.getElementById('newItemModal');
        const modalBody = modalElement.querySelector('.modal-body');
        modalBody.innerHTML = '';
        keys.forEach(key => {
            switch (key) {
                case 'id':
                    modalBody.innerHTML +=
                        `<div class="mb-3">
                        <label for="${key}" class="form-label">Id</label>
                        <input type="text" class="form-control" id="${key}" aria-describedby="idHelp">
                        <div id="idHelp" class="form-text">Введите id</div>
                    </div>`;
                    break;
                case 'fullName':
                case 'firstName':
                case 'lastName':
                case 'patronymic':
                    modalBody.innerHTML +=
                        `<div class="mb-3">
                        <label for="firstName" class="form-label">ФИО</label>
                        <input type="text" class="form-control" id="firstName" aria-describedby="firstNameHelp">
                        <div id="firstNameHelp" class="form-text">Фамилия</div>
                        <input type="text" class="form-control" id="lastName" aria-describedby="lastNameHelp" >
                        <div id="lastNameHelp" class="form-text">Имя</div>
                        <input type="text" class="form-control" id="patronymic" aria-describedby="patronymicHelp">
                        <div id="patronymicHelp" class="form-text">Отчество</div>
                          </div>`;
                    break;
                case 'name':
                case 'departments':
                case 'group':
                case 'division':
                case 'type':
                case 'entity':
                    modalBody.innerHTML +=
                        `<div class="mb-3">
                        <label for="${key}" class="form-label">${key}</label>
                        <input type="text" class="form-control" id="${key}" aria-describedby="nameHelp">
                        <div id="nameHelp" class="form-text">Введите название ${key}</div>
                        </div>`;
                    break;
                default:
                    console.log('Неизвестный ключ:', key);
            }
        });

        if (id !== 0) {
            const inputId = document.getElementById('id');
            inputId.value = id;
        }
    }

    // Функция для создания модального окна
    function createModal() {
        // Создание основных элементов модального окна
        const modal = document.createElement('div');
        modal.classList.add('modal', 'fade');
        modal.id = 'newItemModal';
        modal.tabIndex = '-1';
        modal.setAttribute('aria-labelledby', 'newItemModalLabel');
        modal.setAttribute('aria-hidden', 'true');

        const modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        modal.appendChild(modalDialog);

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalDialog.appendChild(modalContent);

        // Создание заголовка модального окна
        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        modalContent.appendChild(modalHeader);

        const modalTitle = document.createElement('h5');
        modalTitle.classList.add('modal-title');
        modalTitle.id = 'newItemModalLabel';
        modalTitle.textContent = 'Добавить/Отредактировать элемент';
        modalHeader.appendChild(modalTitle);

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.classList.add('btn-close');
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');
        modalHeader.appendChild(closeButton);

        // Создание тела модального окна (формы)
        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalContent.appendChild(modalBody);

        const form = document.createElement('form');
        modalBody.appendChild(form);

        // Создание подвала модального окна (кнопки)
        const modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        modalContent.appendChild(modalFooter);

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.classList.add('btn', 'btn-secondary');
        cancelButton.setAttribute('data-bs-dismiss', 'modal');
        cancelButton.textContent = 'Отмена';
        modalFooter.appendChild(cancelButton);

        const saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.classList.add('btn', 'btn-primary');
        saveButton.textContent = 'Отправить';
        modalFooter.appendChild(saveButton);

        // Добавление модального окна в DOM
        document.body.appendChild(modal);

        // Инициализация модального окна с использованием Bootstrap
        const modalInstance = new bootstrap.Modal(modal);

        // Обработчик клика по кнопке "Сохранить"
        saveButton.addEventListener('click', function () {
            saveItem();
            modalInstance.hide();
        });

        return modalInstance;
    }

    // Инициализация модального окна
    const modal = createModal();

});
