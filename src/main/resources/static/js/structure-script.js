document.addEventListener('DOMContentLoaded', async function () {
    const serverResponse = await fetch(`/api/getAllCardData`);
    const cardInfos = await serverResponse.json();
    let sortingOrder = '';
    let originalOrder = [];

    // Функция для создания карточки сотрудника
    function createEmployeeCard(record) {
        const card = document.createElement('div');
        card.classList.add('card', 'p-2', 'btn');
        card.setAttribute('data-bs-toggle', 'offcanvas');
        card.setAttribute('data-bs-target', '#offcanvasExample');
        card.setAttribute('aria-controls', 'offcanvasExample');
        card.setAttribute('id-card', record.recordId);
        var fullName = record.employee == null ? "Вакансия" :
            record.employee.firstName + " " + record.employee.lastName + " " + record.employee.patronymic;
        card.innerHTML = `
            <div class="card-body text-center">
                <h6 class="card-title">${fullName}</h6>
                <div class="card-text">
                    <p>${record.position.name}</p>
                </div>
            </div>
        `;
        return card;
    }

    // Функция для обработки данных и создания карточекэ
    function processEmployeeData(cardInfos) {
        const cardsContainer = document.querySelector('#employeeCards');
        cardsContainer.innerHTML = '';

        const uncategorizedContainer = document.createElement('div');
        uncategorizedContainer.classList.add('cards', 'd-flex', 'row', 'gap-3', 'my-4', 'mx-2');
        cardsContainer.appendChild(uncategorizedContainer);

        cardInfos.forEach(record => {
            uncategorizedContainer.appendChild(createEmployeeCard(record));
        });

        // Сохраняем исходный порядок карточек
        originalOrder = Array.from(uncategorizedContainer.children);
    }

    // Функция для обновления контента Offcanvas
    function updateOffcanvasContent(data) {
        const offcanvasContent = document.getElementById('offcanvasContent');
        offcanvasContent.innerHTML = `
            <h4>${data.fullName}</h4>
            <p>${data.position}</p>
            <hr>
            <p>Юр.лица: ${data.entity}</p>
            <p>Локация: ${data.location}</p>
            <p>Подразделение: ${data.division}</p>
            <p>Отдел: ${data.department}</p>
            <p>Группа: ${data.group}</p>
            <p>Тип работы: ${data.type}</p>
            <p>Номер позиции: ${data.number}</p>
        `;
    }

    // Обработчик клика на кнопку "Вывести свободные должности"
    const showVacantPositionsBtn = document.querySelector('.show-vacant-positions');
    showVacantPositionsBtn.addEventListener('click', async function () {
        console.log("Вывести свободные должности");
        var freeJobResp = await fetch('/api/getAllFree');
        var freeJob = await freeJobResp.json();
        console.log(freeJob);

        processEmployeeData(freeJob);
    });

    // Передача данных при открытии Offcanvas
    const offcanvasElement = document.getElementById('offcanvasExample');
    offcanvasElement.addEventListener('show.bs.offcanvas', async function (event) {
        const resp = await fetch('/api/getAllInfo?id=' + event.relatedTarget.getAttribute('id-card'));
        const data = await resp.json();
        updateOffcanvasContent(data);
    });
    

    // Функция для сортировки карточек
    function sortCards(order) {
        const cardsContainer = document.querySelector('.cards');
        let sortedCards = Array.from(cardsContainer.children);

        if (order === 'asc') {
            sortedCards.sort((a, b) => {
                const textA = a.querySelector(".card-title").innerText.toLowerCase();
                const textB = b.querySelector(".card-title").innerText.toLowerCase();
                return textA.localeCompare(textB);
            });
        } else if (order === 'desc') {
            sortedCards.sort((a, b) => {
                const textA = a.querySelector(".card-title").innerText.toLowerCase();
                const textB = b.querySelector(".card-title").innerText.toLowerCase();
                return textB.localeCompare(textA);
            });
        } else {
            sortedCards = originalOrder;
        }

        cardsContainer.innerHTML = '';
        sortedCards.forEach(card => cardsContainer.appendChild(card));
    }

    // Обработчик клика на кнопку "Сортировка"
    const sortAlphabeticallyBtn = document.querySelector('.sort');
    sortAlphabeticallyBtn.addEventListener('click', function () {
        switch (sortingOrder) {
            case 'asc':
                sortingOrder = 'desc';
                break;
            case 'desc':
                sortingOrder = '';
                break;
            default:
                sortingOrder = 'asc';
                break;
        }

        sortCards(sortingOrder);

        // Обновляем текст кнопки
        const sortButton = document.querySelector('.sort a');
        switch (sortingOrder) {
            case 'asc':
                sortButton.textContent = 'Отсортировать от Я до А';
                break;
            case 'desc':
                sortButton.textContent = 'Без сортировки';
                break;
            default:
                sortButton.textContent = 'Отсортировать от А до Я';
                break;
        }
    });

    // Загружаем данные о сотрудниках и создаем карточки
    processEmployeeData(cardInfos);


    var openModalBtn = document.getElementById('openModalBtn');
    var searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
    var applyFilterBtn = document.querySelector('#applyFilterBtn');
    var clearFilterBtn = document.querySelector('#clearFilterBtn');
    var filterBox = document.querySelector('.filter-box');
    var closeModalBtns = document.querySelectorAll('[data-bs-dismiss="modal"]');

    // Открыть модальное окно при нажатии на кнопку
    openModalBtn.addEventListener('click', function () {
        searchModal.show();
    });

    // Применить фильтр
    applyFilterBtn.addEventListener('click', async function () {
        var inputNumberPos = document.getElementById('inputNumberPos').value.trim();
        var inputYurFace = document.getElementById('inputYurFace').value.trim();
        var inputLocation = document.getElementById('inputLocation').value.trim();
        var inputSubdivision = document.getElementById('inputSubdivision').value.trim();
        var inputDepartment = document.getElementById('inputDepartment').value.trim();
        var inputGroup = document.getElementById('inputGroup').value.trim();
        var inputJobTitle = document.getElementById('inputJobTitle').value.trim();
        var inputName = document.getElementById('inputName').value.trim().toLowerCase();
        var inputJobType = document.getElementById('inputJobType').value.trim();

        filterBox.innerHTML = ''; // Очищаем содержимое filter-box перед добавлением новых элементов

        if (inputNumberPos !== '') {
            filterBox.innerHTML += `<div class="btn btn-light py-1 px-3" style="border-radius: 16px;">
                <span onclick="removeFilterItem(this, 'inputNumberPos')">Номер позиции: ${inputNumberPos}</span>
            </div>`;
        }
        if (inputYurFace !== '') {
            filterBox.innerHTML += `<div class="btn btn-light py-1 px-3" style="border-radius: 16px;">
                <span onclick="removeFilterItem(this, 'inputYurFace')">Юр. лицо: ${inputYurFace}</span>
            </div>`;
        }
        if (inputLocation !== '') {
            filterBox.innerHTML += `<div class="btn btn-light py-1 px-3" style="border-radius: 16px;">
                <span onclick="removeFilterItem(this, 'inputLocation')">Локация: ${inputLocation}</span>
            </div>`;
        }
        if (inputSubdivision !== '') {
            filterBox.innerHTML += `<div class="btn btn-light py-1 px-3" style="border-radius: 16px;">
                <span onclick="removeFilterItem(this, 'inputSubdivision')">Подразделение: ${inputSubdivision}</span>
            </div>`;
        }
        if (inputDepartment !== '') {
            filterBox.innerHTML += `<div class="btn btn-light py-1 px-3" style="border-radius: 16px;">
                <span onclick="removeFilterItem(this, 'inputDepartment')">Отдел: ${inputDepartment}</span>
            </div>`;
        }
        if (inputGroup !== '') {
            filterBox.innerHTML += `<div class="btn btn-light py-1 px-3" style="border-radius: 16px;">
                <span onclick="removeFilterItem(this, 'inputGroup')">Группа: ${inputGroup}</span>
            </div>`;
        }
        if (inputJobTitle !== '') {
            filterBox.innerHTML += `<div class="btn btn-light py-1 px-3" style="border-radius: 16px;">
                <span onclick="removeFilterItem(this, 'inputJobTitle')">Должность: ${inputJobTitle}</span>
            </div>`;
        }
        if (inputName !== '') {
            filterBox.innerHTML += `<div class="btn btn-light py-1 px-3" style="border-radius: 16px;">
                <span onclick="removeFilterItem(this, 'inputName')">ФИО: ${inputName}</span>
            </div>`;
        }
        if (inputJobType !== '') {
            filterBox.innerHTML += `<div class="btn btn-light py-1 px-3" style="border-radius: 16px;">
                <span onclick="removeFilterItem(this, 'inputJobType')">Тип работы: ${inputJobType}</span>
            </div>`;
        }

        // Применяем фильтрацию карточек

        const dict = {};
        if (inputNumberPos !== '') {
            dict['number'] = inputNumberPos;
        }
        if (inputYurFace !== '') {
            dict['entity'] = inputYurFace;
        }
        if (inputLocation !== '') {
            dict['location'] = inputLocation;
        }
        if (inputSubdivision !== '') {''
            dict['division'] = inputSubdivision;
        }
        if (inputDepartment !== '') {
            dict['department'] = inputDepartment;
        }
        if (inputGroup !== '') {
            dict['group'] = inputGroup;
        }
        if (inputJobTitle !== '') {
            dict['position'] = inputJobTitle;
        }
        if (inputName !== '') {
            dict['fullName'] = inputName;
        }
        if (inputJobType !== '') {
            dict['type'] = inputJobType;
        }

        const temp1 = await fetch('/api/filter?params=',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dict),
        });
        const temp2 = await temp1.json();
        console.log(temp2);
        processEmployeeData(temp2);

        // Закрываем модальное окно после применения фильтра
        searchModal.hide();
    });

    // Сбросить фильтр
    clearFilterBtn.addEventListener('click', function () {
        var filterInputs = document.querySelectorAll('.form-control');
        filterInputs.forEach(function (input) {
            input.value = '';
        });

        var cards = document.querySelectorAll('.card');
        cards.forEach(function (card) {
            card.style.display = 'block';
        });
        filterBox.innerHTML = ''; // Очищаем содержимое filter-box
    });

    // Удалить элемент в filter-box
    window.removeFilterItem = function (element, inputId) {
        element.parentNode.remove();
        document.getElementById(inputId).value = '';

        // После удаления элемента из filter-box, вызываем функцию, обновляющую фильтр
        applyFilterBtn.click();
    };

    // Закрыть модальное окно
    closeModalBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            searchModal.hide();
        });
    });
});