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
    function createCategoryHeader(categoryName, collapseId) {
        const header = document.createElement('div');
        header.innerHTML = `
            <p>
                <a class="btn btn-light w-100 dropdown-toggle text-start" data-bs-toggle="collapse" href="#${collapseId}" role="button" aria-expanded="false" aria-controls="${collapseId}">
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
                const yurFaceHeader = createCategoryHeader(yurFace.name, yurFaceCollapseId);
                cardsContainer.appendChild(yurFaceHeader);
                const yurFaceContainer = yurFaceHeader.querySelector(`#${yurFaceCollapseId}`);

                yurFace.children.forEach(location => {
                    const locationCollapseId = 'collapseLocation' + collapseIdCounter++;
                    const locationHeader = createCategoryHeader(location.name, locationCollapseId);
                    yurFaceContainer.appendChild(locationHeader);
                    const locationContainer = locationHeader.querySelector(`#${locationCollapseId}`);

                    location.children.forEach(subdivision => {
                        const subdivisionCollapseId = 'collapseSubdivision' + collapseIdCounter++;
                        const subdivisionHeader = createCategoryHeader(subdivision.name, subdivisionCollapseId);
                        locationContainer.appendChild(subdivisionHeader);
                        const subdivisionContainer = subdivisionHeader.querySelector(`#${subdivisionCollapseId}`);

                        subdivision.children.forEach(department => {
                            const departmentCollapseId = 'collapseDepartment' + collapseIdCounter++;
                            const departmentHeader = createCategoryHeader(department.name, departmentCollapseId);
                            subdivisionContainer.appendChild(departmentHeader);
                            const departmentContainer = departmentHeader.querySelector(`#${departmentCollapseId}`);

                            department.children.forEach(group => {
                                const groupCollapseId = 'collapseGroup' + collapseIdCounter++;
                                const groupHeader = createCategoryHeader(group.name, groupCollapseId);
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

    // Обработчик клика на карточке
    document.addEventListener('click', function (event) {
        var target = event.target.closest('.card');
        if (!target) return;

        var fullName = target.getAttribute('data-fio');
        var jobPosition = target.getAttribute('data-name'); // Используем data-name для должности
        var numberPos = target.getAttribute('data-pos_number'); // Используем data-pos_number для номера позиции
        var jobType = target.getAttribute('data-job_type'); // Используем data-job_type для типа работы
        var group = target.getAttribute('data-group');
        var department = target.getAttribute('data-department');
        var subdivision = target.getAttribute('data-subdivision');
        var location = target.getAttribute('data-location');
        var yurFace = target.getAttribute('data-yurface'); // Используем data-yurface для юридического лица

        var employeeInfo = `
        <h5 id="name">${fullName}</h5>
        <p id="jobTitle">Должность: ${jobPosition}</p>
        <p id="numberPos">Номер позиции: ${numberPos}</p>
        <p id="jobType">Тип работы: ${jobType}</p>
        <p id="group">Группа: ${group}</p>
        <p id="department">Отдел: ${department}</p>
        <p id="subdivision">Подразделение: ${subdivision}</p>
        <p id="location">Локация: ${location}</p>
        <p id="yurFace">Юр. лицо: ${yurFace}</p>
    `;

        var offcanvasBody = document.querySelector('.offcanvas-body');
        offcanvasBody.innerHTML = employeeInfo;
    });


    // Обработчик клика на кнопку "Разделить на категории"
    document.querySelector('.divide_into_categories').addEventListener('click', function () {
        isCategorized = !isCategorized; // Меняем состояние
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
});
