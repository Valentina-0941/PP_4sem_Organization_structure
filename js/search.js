document.addEventListener('DOMContentLoaded', function () {
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
    applyFilterBtn.addEventListener('click', function () {
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
        var cards = document.querySelectorAll('.card');
        cards.forEach(function (card) {
            var cardName = card.querySelector('.card-title').innerText.trim().toLowerCase();
            if (inputName !== '' && !cardName.includes(inputName)) {
                card.style.display = 'none';
            } else {
                card.style.display = 'block';
            }
        });

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