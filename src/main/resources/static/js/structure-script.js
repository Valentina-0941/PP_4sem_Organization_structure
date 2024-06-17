document.addEventListener('DOMContentLoaded', async function () {
    // const jsonFilePath = '/data.json'; // Путь к вашему JSON файлу

    const serverResponse = await fetch(`/api/getRecords`);
    const data = await serverResponse.json();

    console.log("TEST")
    console.log(data[801].employee.firstName)
    console.log(data);


    let isCategorized = false; // Флаг для отслеживания состояния категорий
    let sortingOrder = '';


    // Функция для создания карточки сотрудника
    function createEmployeeCard(record) {
        const card = document.createElement('div');
        card.classList.add('card', 'p-3', 'btn');
        card.setAttribute('data-bs-toggle', 'offcanvas');
        card.setAttribute('data-bs-target', '#offcanvasExample');
        card.setAttribute('aria-controls', 'offcanvasExample');
        card.innerHTML = `
            <div class="card-img-top img-fluid" style="background: url(source/img/no_photo.jpg) center; background-size: cover; width:150px; height: 180px;"></div>
            <div class="card-body text-center">
                <h6 class="card-title">${record.employee.firstName + " " + record.employee.lastName + " " + record.employee.patronymic}</h6>
                <div class="card-text">
                    <p>${record.position.name}</p>
                </div>
            </div>
        `;
        Object.entries(record).forEach(([key, value]) => {
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

        const uncategorizedContainer = document.createElement('div');
        uncategorizedContainer.classList.add('cards', 'd-flex', 'row', 'gap-3', 'my-4', 'mx-2');
        cardsContainer.appendChild(uncategorizedContainer);

        const sortedData = sortEmployeesAlphabetically(data.children);


        data.forEach(record => {
            console.log(record)
            const card = createEmployeeCard(record);
            uncategorizedContainer.appendChild(card);
        });

        // if (categorized) {
        //     let collapseIdCounter = 1;
        //     data.children.forEach(yurFace => {
        //         const yurFaceCollapseId = 'collapseYurFace' + collapseIdCounter++;
        //         const yurFaceHeader = createCategoryHeader(yurFace.name, yurFaceCollapseId, 1); // Уровень 1
        //         cardsContainer.appendChild(yurFaceHeader);
        //         const yurFaceContainer = yurFaceHeader.querySelector(`#${yurFaceCollapseId}`);
        //
        //         yurFace.children.forEach(location => {
        //             const locationCollapseId = 'collapseLocation' + collapseIdCounter++;
        //             const locationHeader = createCategoryHeader(location.name, locationCollapseId, 2); // Уровень 2
        //             yurFaceContainer.appendChild(locationHeader);
        //             const locationContainer = locationHeader.querySelector(`#${locationCollapseId}`);
        //
        //             location.children.forEach(subdivision => {
        //                 const subdivisionCollapseId = 'collapseSubdivision' + collapseIdCounter++;
        //                 const subdivisionHeader = createCategoryHeader(subdivision.name, subdivisionCollapseId, 3); // Уровень 3
        //                 locationContainer.appendChild(subdivisionHeader);
        //                 const subdivisionContainer = subdivisionHeader.querySelector(`#${subdivisionCollapseId}`);
        //
        //                 subdivision.children.forEach(department => {
        //                     const departmentCollapseId = 'collapseDepartment' + collapseIdCounter++;
        //                     const departmentHeader = createCategoryHeader(department.name, departmentCollapseId, 4); // Уровень 4
        //                     subdivisionContainer.appendChild(departmentHeader);
        //                     const departmentContainer = departmentHeader.querySelector(`#${departmentCollapseId}`);
        //
        //                     department.children.forEach(group => {
        //                         const groupCollapseId = 'collapseGroup' + collapseIdCounter++;
        //                         const groupHeader = createCategoryHeader(group.name, groupCollapseId, 5); // Уровень 5
        //                         departmentContainer.appendChild(groupHeader);
        //                         const groupContainer = document.createElement('div');
        //                         groupContainer.classList.add('cards', 'd-flex', 'row', 'gap-3', 'my-4', 'mx-2');
        //                         groupHeader.querySelector(`#${groupCollapseId}`).appendChild(groupContainer);
        //
        //                         group.children.forEach(position => {
        //                             const card = createEmployeeCard({
        //                                 name: position.name,
        //                                 fio: position.children[0].fio,
        //                                 job_type: position.children[0].job_type,
        //                                 pos_number: position.children[0].pos_number,
        //                                 yurFace: yurFace.name,
        //                                 location: location.name,
        //                                 subdivision: subdivision.name,
        //                                 department: department.name,
        //                                 group: group.name
        //                             });
        //                             groupContainer.appendChild(card);
        //                         });
        //                     });
        //                 });
        //             });
        //         });
        //     });
        // } else {
        //     const uncategorizedContainer = document.createElement('div');
        //     uncategorizedContainer.classList.add('cards', 'd-flex', 'row', 'gap-3', 'my-4', 'mx-2');
        //     cardsContainer.appendChild(uncategorizedContainer);
        //
        //     const sortedData = sortEmployeesAlphabetically(data.children);
        //
        //
        //     data.forEach(record => {
        //         const card = createEmployeeCard(record);
        //         uncategorizedContainer.appendChild(card);
        //     });
        //
        //     // sortedData.forEach(yurFace => {
        //     //     yurFace.children.forEach(location => {
        //     //         location.children.forEach(subdivision => {
        //     //             subdivision.children.forEach(department => {
        //     //                 department.children.forEach(group => {
        //     //                     group.children.forEach(position => {
        //     //                         const card = createEmployeeCard({
        //     //                             name: position.name,
        //     //                             fio: position.children[0].fio,
        //     //                             job_type: position.children[0].job_type,
        //     //                             pos_number: position.children[0].pos_number,
        //     //                             yurFace: yurFace.name,
        //     //                             location: location.name,
        //     //                             subdivision: subdivision.name,
        //     //                             department: department.name,
        //     //                             group: group.name
        //     //                         });
        //     //                         uncategorizedContainer.appendChild(card);
        //     //                     });
        //     //                 });
        //     //             });
        //     //         });
        //     //     });
        //     // });
        // }
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

    function sortEmployeesAlphabetically(data, order) {
        if (!data || !Array.isArray(data)) return [];

        const sortedData = data.map(yurFace => {
            yurFace.children = yurFace.children.map(location => {
                location.children = location.children.map(subdivision => {
                    subdivision.children = subdivision.children.map(department => {
                        department.children = department.children.map(group => {
                            group.children.sort((a, b) => {
                                if (order === 'asc') {
                                    return a.children[0].fio.localeCompare(b.children[0].fio);
                                } else if (order === 'desc') {
                                    return b.children[0].fio.localeCompare(a.children[0].fio);
                                }
                            });
                            return group;
                        });

                        if (order === 'asc') {
                            department.children.sort((a, b) => a.name.localeCompare(b.name));
                        } else if (order === 'desc') {
                            department.children.sort((a, b) => b.name.localeCompare(a.name));
                        }
                        return department;
                    });

                    if (order === 'asc') {
                        subdivision.children.sort((a, b) => a.name.localeCompare(b.name));
                    } else if (order === 'desc') {
                        subdivision.children.sort((a, b) => b.name.localeCompare(a.name));
                    }
                    return subdivision;
                });

                if (order === 'asc') {
                    location.children.sort((a, b) => a.name.localeCompare(b.name));
                } else if (order === 'desc') {
                    location.children.sort((a, b) => b.name.localeCompare(a.name));
                }
                return location;
            });

            if (order === 'asc') {
                yurFace.children.sort((a, b) => a.name.localeCompare(b.name));
            } else if (order === 'desc') {
                yurFace.children.sort((a, b) => b.name.localeCompare(a.name));
            }
            return yurFace;
        });

        if (order === 'asc') {
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === 'desc') {
            sortedData.sort((a, b) => b.name.localeCompare(a.name));
        }

        return sortedData;
    }


    // Функция для обновления текста и иконки кнопки "По алфавиту"
    function updateSortButtonUI() {
        const sortButton = document.querySelector('.sort');

        switch (sortingOrder) {
            case 'asc':
                sortButton.innerHTML = `
                    <a class="icon-link icon-link-hover link-underline link-underline-opacity-0" href="#">
                        Сортировка от А до Я
                    </a>
                `;
                break;
            case 'desc':
                sortButton.innerHTML = `
                    <a class="icon-link icon-link-hover link-underline link-underline-opacity-0" href="#">
                        Сортировка от Я до А
                    </a>
                `;
                break;
            default:
                sortButton.innerHTML = `
                    <a class="icon-link icon-link-hover link-underline link-underline-opacity-0" href="#">
                        Без сортировки
                    </a>
                `;
                break;
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

        updateSortButtonUI(); // Обновляем текст кнопки

        // Повторно обрабатываем данные с учетом нового порядка сортировки
        fetch(jsonFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных о сотрудниках');
                }
                return response.json();
            })
            .then(data => {
                const sortedData = sortEmployeesAlphabetically(data.children);
                processEmployeeData({children: sortedData}, isCategorized);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных о сотрудниках:', error);
            });
    });


    // Обработчик клика на кнопку "Поиск"
    const abcd = document.querySelector('.show-vacant-positions');
    showVacantPositionsBtn.addEventListener('click', function () {
        console.log("Вывести свободные должности");
        // Здесь может быть ваша логика для кнопки "Поиск"
    });

});
