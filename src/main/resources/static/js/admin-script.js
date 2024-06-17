document.addEventListener('DOMContentLoaded', async function () {

    var tableSelect = document.getElementById('tableSelect');
    tableSelect.getAll();
    console
    const serverResponse = await fetch(`/api/getAllCardData`);
    const cardInfos = await serverResponse.json();


    $(document).ready(function() {
        $('#tableSelect').on('change', function() {
            var selectedTable = $(this).val();
            if (selectedTable) {
                fetchTableData(selectedTable);
            }
        });

        $('#dataForm').on('submit', function(event) {
            event.preventDefault();
            // Handle form submission
        });
    });

    function fetchTableData(tableName) {
        $.ajax({
            url: `/getAll${tableName}`,
            method: 'GET',
            success: function (data) {
                var tableBody = $('#data-table-body');
                tableBody.empty();
                data.forEach(function (row) {
                    var rowHtml = '<tr>';
                    rowHtml += `<td>${row.id}</td>`;
                    rowHtml += `<td>${row.number || ''}</td>`;
                    rowHtml += `<td>${row.entity || ''}</td>`;
                    rowHtml += `<td>${row.location || ''}</td>`;
                    rowHtml += `<td>${row.division || ''}</td>`;
                    rowHtml += `<td>${row.department || ''}</td>`;
                    rowHtml += `<td>${row.group || ''}</td>`;
                    rowHtml += `<td>${row.position || ''}</td>`;
                    rowHtml += `<td>${row.fullName || ''}</td>`;
                    rowHtml += `<td>${row.type || ''}</td>`;
                    rowHtml += `<td><button class="btn btn-sm btn-primary" onclick="editRow(${row.id})">Edit</button> <button class="btn btn-sm btn-danger" onclick="deleteRow(${row.id})">Delete</button></td>`;
                    rowHtml += '</tr>';
                    tableBody.append(rowHtml);
                });
            }
        });
    }

    function openAddModal() {
        // Logic to open the add/edit modal
    }

    function editRow(id) {
        // Logic to edit a row
    }

    function deleteRow(id) {
        // Logic to delete a row
    }
});