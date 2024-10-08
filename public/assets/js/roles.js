/**
 * App user list
 */

'use strict';

// Datatable (jquery)
$(function() {
    var dtUserTable = $('.datatables-basic'),
        statusObj = {
            1: { title: 'Pending', class: 'bg-label-warning' },
            2: { title: 'Active', class: 'bg-label-success' },
            3: { title: 'Inactive', class: 'bg-label-secondary' }
        };
    // Users List datatable
    let lang = document.documentElement.dir == 'rtl' ? 'ar' : 'en';

    if (dtUserTable.length) {
        var dtUser = dtUserTable.DataTable({
            ajax: '/getRolesApi', // JSON file to add data
            columns: [
                // columns according to JSON
                { data: "id" },
                { data: 'name' },
                { data: 'created_at' },
                { data: '' },
                { data: '' }

            ],
            columnDefs: [{
                    // For checkbox
                    targets: 0,
                    orderable: false,
                    searchable: false,
                    className: "check-all",
                    responsivePriority: 3,
                    render: function(data, type, full) {
                        var $id = full["id"];
                        return `<input type="checkbox" data-id="${$id}" name="deleteAll[]" class="delete-all dt-checkboxes form-check-input">`;
                    },
                    checkboxes: {
                        selectAllRender: '<input type="checkbox" class="form-check-input">'
                    }
                },
                {
                    // User Status
                    targets: 1,
                    render: function(data, type, full, meta) {
                        var $id = full['id'];

                        return (
                            '<span class="badge">' + $id + '</span>'
                        );
                    }
                },
                {
                    // User Role
                    targets: 2,
                    render: function(data, type, full, meta) {
                        var $name = full['name'];
                        return "<span class='text-truncate d-flex align-items-center'>" + $name + '</span>';
                    }
                },
                {
                    // User Role
                    targets: 3,
                    render: function(data, type, full, meta) {
                        var $created_at = new Date(full['created_at']);
                        let year = $created_at.getFullYear();
                        let month = $created_at.getMonth() < 10 ? `0${$created_at.getMonth()}` : $created_at.getMonth();
                        let dey = $created_at.getDay() < 10 ? `0${$created_at.getDay()}` : $created_at.getDay();
                        let hour = $created_at.getHours() < 10 ? `0${$created_at.getHours()}` : $created_at.getHours();
                        let minutes = $created_at.getMinutes() < 10 ? `0${$created_at.getMinutes()}` : $created_at.getMinutes();
                        let seconds = $created_at.getSeconds() < 10 ? `0${$created_at.getSeconds()}` : $created_at.getSeconds();
                        return `<span class='text-truncate d-flex align-items-center'>${dey}-${month}-${year} ${seconds}:${minutes}:${hour}</span>`;
                    }
                },
                {
                    // Actions
                    targets: -1,
                    title: lang == 'ar' ? "الإجراءات" : 'Actions',
                    searchable: false,
                    orderable: false,
                    render: function(data, type, full, meta) {
                        let parent = `
              <div class="d-flex align-items-center">
                <a href="/role/edit/${full.id}" class="text-body"><i class="ti ti-edit ti-sm me-2"></i></a>
                <a onclick="return confirm('Are you sure?')" href="/role/delete/${full.id}" class="text-body"><i class="ti ti-trash ti-sm mx-2"></i></a>
              </div>
            `
            return parent;
          }
        }
      ],
      order: [[1, 'desc']],
      dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: `${lang == 'ar' ? 'عرض' : 'show'} _MENU_`,
        search: `${lang == 'ar' ? 'بحث...' : 'search...'}`,
        searchPlaceholder:`${lang == 'ar' ? 'بحث...' : 'search...'}`
      },
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-primary dropdown-toggle me-2',
          text: '<i class="ti ti-file-export me-sm-1"></i> <span class="d-none d-sm-inline-block">Export</span>',
          buttons: [
            {
              extend: 'print',
              text: '<i class="ti ti-printer me-1" ></i>Print',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                  .css('color', config.colors.headingColor)
                  .css('border-color', config.colors.borderColor)
                  .css('background-color', config.colors.bodyBg);
                $(win.document.body)
                  .find('table')
                  .addClass('compact')
                  .css('color', 'inherit')
                  .css('border-color', 'inherit')
                  .css('background-color', 'inherit');
              }
            },
            {
              extend: 'csv',
              text: '<i class="ti ti-file-text me-1" ></i>Csv',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'excel',
              text: '<i class="ti ti-file-spreadsheet me-1"></i>Excel',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'pdf',
              text: '<i class="ti ti-file-description me-1"></i>Pdf',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'copy',
              text: '<i class="ti ti-copy me-1" ></i>Copy',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
          ]
        },
      ],
    });
    $('div.head-label').html(`<h5 class="card-title mb-0">${lang == 'ar' ? 'بحث في جميع الحقول ...' : 'search in all fields'}</h5>`);
  }
});

