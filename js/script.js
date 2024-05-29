$(document).ready(function () {
    $.getJSON('/data', function (data) {
        let columns = Object.keys(data[0]);
        let thead = $('#dataTable thead tr');
        let tbody = $('#dataTable tbody');

        // Populate table headers
        columns.forEach(column => {
            thead.append(`<th>${column}</th>`);
        });

        // Populate table rows
        data.forEach(row => {
            let tr = $('<tr></tr>');
            columns.forEach(column => {
                tr.append(`<td>${row[column]}</td>`);
            });
            tbody.append(tr);
        });
    });

    // $('#searchInput').on('keyup', function () {
    //     let searchText = $(this).val().toLowerCase();
    //     let selectedColumn = $('#searchColumn').val();
    //     $('#dataTable tbody tr').filter(function () {
    //         if (selectedColumn === 'all') {
    //             return $(this).text().toLowerCase().indexOf(searchText) > -1;
    //         } else {
    //             return $(this).find(`td:eq(${selectedColumn})`).text().toLowerCase().indexOf(searchText) > -1;
    //         }
    //     }).toggle(true);
    // });

    $('#searchInput').on('keyup', function () {
        let searchText = $(this).val().toLowerCase();
        $('#dataTable tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1)
        });
    });

});
