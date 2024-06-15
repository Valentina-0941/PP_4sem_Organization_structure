    document.addEventListener('DOMContentLoaded', function () {
        const jsonFilePath = '/data.json'; // Путь к вашему JSON файлу
        let isCategorized = false; // Флаг для отслеживания состояния категорий
    
        // Функция для создания карточки сотрудника
        function createEmployeeCard(employee) {
            const card = document.createElement('div');
            card.classList.add('card', 'p-3', 'btn');
            card.setAttribute('data-bs-toggle', 'offcanvas');
            card.setAttribute('data-bs-target', '#offcanvasExample');
            card.setAttribute('aria-controls', 'offcanvasExample');
            card.innerHTML = `
                <div class="card-img-top img-fluid" style="background: url(source/img/no_photo.jpg) center; background-size: cover; width:150px; height: 180px;"></div>
                <div class="card-body text-center">
                    <h6 class="card-title">${employee.fio}</h6>
                    <div class="card-text">
                        <p>${employee.name}</p>
                    </div>
                </div>
            `;
            Object.entries(employee).forEach(([key, value]) => {
                card.setAttribute(`data-${key}`, value);
            });
            return card;
        }
    
        // Функция для создания заголовка категории
        function createCategoryHeader(categoryName, collapseId, level) {
            const header = document.createElement('div');
            header.innerHTML = `
                <p>
                    <a class="btn btn-light w-100 dropdown-toggle text-start category-level-${level}" data-bs-toggle="collapse" href="#${collapseId}" role="button" aria-expanded="false" aria-controls="${collapseId}">
                        ${categoryName}
                    </a>
                </p>
                <div class="collapse" id="${collapseId}"></div>
            `;
            return header;
        }

    
        // Функция для обработки данных и создания карточек
        function processEmployeeData(data, categorized) {
            const cardsContainer = document.querySelector('#employeeCards');
            cardsContainer.innerHTML = '';
    
            if (categorized) {
                let collapseIdCounter = 1;
                data.children.forEach(yurFace => {
                    const yurFaceCollapseId = 'collapseYurFace' + collapseIdCounter++;
                    const yurFaceHeader = createCategoryHeader(yurFace.name, yurFaceCollapseId, 1); // Уровень 1
                    cardsContainer.appendChild(yurFaceHeader);
                    const yurFaceContainer = yurFaceHeader.querySelector(`#${yurFaceCollapseId}`);

                    yurFace.children.forEach(location => {
                        const locationCollapseId = 'collapseLocation' + collapseIdCounter++;
                        const locationHeader = createCategoryHeader(location.name, locationCollapseId, 2); // Уровень 2
                        yurFaceContainer.appendChild(locationHeader);
                        const locationContainer = locationHeader.querySelector(`#${locationCollapseId}`);

                        location.children.forEach(subdivision => {
                            const subdivisionCollapseId = 'collapseSubdivision' + collapseIdCounter++;
                            const subdivisionHeader = createCategoryHeader(subdivision.name, subdivisionCollapseId, 3); // Уровень 3
                            locationContainer.appendChild(subdivisionHeader);
                            const subdivisionContainer = subdivisionHeader.querySelector(`#${subdivisionCollapseId}`);

                            subdivision.children.forEach(department => {
                                const departmentCollapseId = 'collapseDepartment' + collapseIdCounter++;
                                const departmentHeader = createCategoryHeader(department.name, departmentCollapseId, 4); // Уровень 4
                                subdivisionContainer.appendChild(departmentHeader);
                                const departmentContainer = departmentHeader.querySelector(`#${departmentCollapseId}`);

                                department.children.forEach(group => {
                                    const groupCollapseId = 'collapseGroup' + collapseIdCounter++;
                                    const groupHeader = createCategoryHeader(group.name, groupCollapseId, 5); // Уровень 5
                                    departmentContainer.appendChild(groupHeader);
                                    const groupContainer = document.createElement('div');
                                    groupContainer.classList.add('cards', 'd-flex', 'row', 'gap-3', 'my-4', 'mx-2');
                                    groupHeader.querySelector(`#${groupCollapseId}`).appendChild(groupContainer);

                                    group.children.forEach(position => {
                                        const card = createEmployeeCard({
                                            name: position.name,
                                            fio: position.children[0].fio,
                                            job_type: position.children[0].job_type,
                                            pos_number: position.children[0].pos_number,
                                            yurFace: yurFace.name,
                                            location: location.name,
                                            subdivision: subdivision.name,
                                            department: department.name,
                                            group: group.name
                                        });
                                        groupContainer.appendChild(card);
                                    });
                                });
                            });
                        });
                    });
                });
            } else {
                const uncategorizedContainer = document.createElement('div');
                uncategorizedContainer.classList.add('cards', 'd-flex', 'row', 'gap-3', 'my-4', 'mx-2');
                cardsContainer.appendChild(uncategorizedContainer);
    
                data.children.forEach(yurFace => {
                    yurFace.children.forEach(location => {
                        location.children.forEach(subdivision => {
                            subdivision.children.forEach(department => {
                                department.children.forEach(group => {
                                    group.children.forEach(position => {
                                        const card = createEmployeeCard({
                                            name: position.name,
                                            fio: position.children[0].fio,
                                            job_type: position.children[0].job_type,
                                            pos_number: position.children[0].pos_number,
                                            yurFace: yurFace.name,
                                            location: location.name,
                                            subdivision: subdivision.name,
                                            department: department.name,
                                            group: group.name
                                        });
                                        uncategorizedContainer.appendChild(card);
                                    });
                                });
                            });
                        });
                    });
                });
            }
        }

        // Функция для блокировки/разблокировки кнопок
        function toggleButtons(isDisabled) {
            const buttons = document.querySelectorAll('.my-3 .btn:not(.divide_into_categories)');
            buttons.forEach(button => {
                button.disabled = isDisabled;
                if (isDisabled) {
                    button.classList.add('disabled'); // Добавляем стиль для выделения блокированных кнопок
                } else {
                    button.classList.remove('disabled');
                }
            });
        }

        // Загружаем данные о сотрудниках из json файла и создаем карточки
        fetch(jsonFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных о сотрудниках');
                }
                return response.json();
            })
            .then(data => {
                processEmployeeData(data, isCategorized);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных о сотрудниках:', error);
            });

        // Обработчик клика на кнопку "Разделить на категории"
        const divideIntoCategoriesBtn = document.querySelector('.divide_into_categories');
        divideIntoCategoriesBtn.addEventListener('click', function () {
            isCategorized = !isCategorized; // Меняем состояние

            // Блокировка/разблокировка других кнопок
            toggleButtons(isCategorized);

            // Изменение стиля нажатой кнопки (необязательно, пример)
            if (isCategorized) {
                divideIntoCategoriesBtn.classList.add('btn-primary'); // Пример класса для нажатой кнопки, можно адаптировать под ваш стиль
            } else {
                divideIntoCategoriesBtn.classList.remove('btn-primary');
            }

            fetch(jsonFilePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при загрузке данных о сотрудниках');
                    }
                    return response.json();
                })
                .then(data => {
                    processEmployeeData(data, isCategorized);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке данных о сотрудниках:', error);
                });
        });

        // Обработчик клика на кнопку "Вывести свободные должности"
        const showVacantPositionsBtn = document.querySelector('.show-vacant-positions');
        showVacantPositionsBtn.addEventListener('click', function () {
            console.log("Вывести свободные должности");
            // Здесь может быть ваша логика для кнопки "Вывести свободные должности"
        });

        // Обработчик клика на кнопку "По алфавиту"
        const sortAlphabeticallyBtn = document.querySelector('.sort');
        sortAlphabeticallyBtn.addEventListener('click', function () {
            console.log("По алфавиту");
            document.addEventListener('DOMContentLoaded', function () {
                // Находим кнопку "По алфавиту" и иконку для сортировки
                var sortButton = document.querySelector('.sort');
                var icon = document.getElementById('iconSort');

                // Переменная для отслеживания текущего порядка сортировки (по возрастанию или убыванию)
                var ascendingOrder = true;
                var clickCount = 0; // Счетчик кликов

                // Добавляем обработчик события на клик по кнопке
                sortButton.addEventListener('click', function () {
                    // Увеличиваем счетчик кликов
                    clickCount++;

                    // Получаем все карточки
                    var cards = document.querySelectorAll('.cards .card');

                    // Преобразуем NodeList в массив для удобства работы
                    var cardsArray = Array.from(cards);

                    // Сортируем карточки по алфавиту по тексту внутри элемента с классом 'card-title'
                    cardsArray.sort(function (a, b) {
                        var titleA = a.querySelector('.card-title').textContent.trim().toLowerCase();
                        var titleB = b.querySelector('.card-title').textContent.trim().toLowerCase();
                        return ascendingOrder ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
                    });

                    // Очищаем контейнер карточек
                    var cardContainer = document.querySelector('.cards');
                    cardContainer.innerHTML = '';

                    // Вставляем отсортированные карточки обратно в контейнер
                    cardsArray.forEach(function (card) {
                        cardContainer.appendChild(card);
                    });

                    // Инвертируем переменную для отслеживания текущего порядка сортировки
                    ascendingOrder = !ascendingOrder;

                    // Изменяем иконку сортировки в зависимости от текущего порядка сортировки
                    if (ascendingOrder) {
                        icon.setAttribute('src', 'source/icon/fi-rr-sort-alpha-down.svg');
                    } else {
                        icon.setAttribute('src', 'source/icon/fi-rr-sort-alpha-up.svg');
                    }

                    // Если кликов было три, сбрасываем сортировку
                    if (clickCount === 3) {
                        // Сбрасываем сортировку
                        cardsArray.sort(function (a, b) {
                            return 0; // Не меняем порядок элементов
                        });

                        // Очищаем контейнер и вставляем карточки в исходном порядке
                        cardContainer.innerHTML = '';
                        cardsArray.forEach(function (card) {
                            cardContainer.appendChild(card);
                        });

                        // Сбрасываем переменные
                        ascendingOrder = true;
                        clickCount = 0;

                        // Возвращаем исходную иконку сортировки
                        icon.setAttribute('src', 'source/icon/fi-rr-sort-alpha.svg');
                    }
                });

                // Находим кнопку "Разделить на категории"
                var divideButton = document.querySelector('.divide_into_categories');

                // Добавляем обработчик клика по кнопке
                divideButton.addEventListener('click', function () {
                    // Получаем все карточки
                    var cards = document.querySelectorAll('.cards .card');

                    // Создаем объект для хранения категорий
                    var categories = {};

                    // Перебираем каждую карточку
                    cards.forEach(function (card) {
                        // Получаем данные о карточке из атрибутов data-*
                        var yurFace = card.getAttribute('data-ЮЛ');
                        var location = card.getAttribute('data-Локация');
                        var subdivision = card.getAttribute('data-Подразделение');
                        var department = card.getAttribute('data-Отдел');
                        var group = card.getAttribute('data-Группа');

                        // Формируем идентификатор категории
                        var categoryKey = `${yurFace}_${location}_${subdivision}_${department}_${group}`;

                        // Проверяем, существует ли такая категория в объекте categories
                        if (!categories[categoryKey]) {
                            // Если категория не существует, создаем новую
                            categories[categoryKey] = {
                                yurFace: yurFace,
                                location: location,
                                subdivision: subdivision,
                                department: department,
                                group: group,
                                cards: [] // Массив для хранения карточек в этой категории
                            };
                        }

                        // Добавляем текущую карточку в соответствующую категорию
                        categories[categoryKey].cards.push(card);
                    });

                    // Очищаем контейнер с карточками перед добавлением категорий
                    var cardContainer = document.querySelector('.cards');
                    cardContainer.innerHTML = '';

                    // Перебираем все категории и вставляем их содержимое в контейнер
                    Object.keys(categories).forEach(function (key) {
                        var category = categories[key];

                        // Создаем элементы для категории
                        var categoryTitle = document.createElement('h3');
                        categoryTitle.textContent = `${category.yurFace} / ${category.location} / ${category.subdivision} / ${category.department} / ${category.group}`;
                        cardContainer.appendChild(categoryTitle);

                        // Добавляем карточки в категорию
                        category.cards.forEach(function (card) {
                            cardContainer.appendChild(card);
                        });
                    });
                });
            });
        });
    });
