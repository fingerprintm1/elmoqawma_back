/**
 * Page User List
 */

'use strict';
let image_path = document.documentElement.getAttribute('data-base-url') + '/images/';
// Datatable (jquery)
$(function () {

  var dt_user_table = $('.datatables-users'),
    select2 = $('.select2'),
    userView = baseUrl + 'app/user/view/account',
    statusObj = {
      0: { title: 'Pending', class: 'bg-label-warning' },
      1: { title: 'Active', class: 'bg-label-success' },
      // 3: { title: 'Inactive', class: 'bg-label-secondary' }
    };

  if (select2.length) {
    var $this = select2;
    $this.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Select Country',
      dropdownParent: $this.parent()
    });
  }
  
  // Users datatable
  let lang = document.documentElement.dir == 'rtl' ? 'ar' : 'en';
  if (dt_user_table.length) {
    var dt_user = dt_user_table.DataTable({
      ajax: '/getOffers', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: "id"},
        { data: `name_${lang}` },
        { data: 'price' },
        { data: 'subscribers' },
        { data: 'stars' },
        { data: 'duration' },
        { data: 'created_at' },
        { data: 'action' },
      ],
      columnDefs: [
        {
          // User Status
          targets: 0,
          render: function (data, type, full, meta) {
            var $id = full['id'];

            return (
              '<span class="badge">' + $id + '</span>'
            );
          }
        },
        {
          targets: 1,
          render: function (data, type, full, meta) {
            var name = full[`name_${lang}`];
            return "<span class='text-truncate d-flex align-items-center'>" + name + '</span>';
          }
        },
        {
          targets: 2,
          render: function (data, type, full, meta) {
            var price = full['price'];
            return "<span class='text-truncate d-flex align-items-center'>" + price+ '</span>';
          }
        },
        {
          targets: 3,
          render: function (data, type, full, meta) {
            var subscribers = full['subscribers'];
            return "<span class='text-truncate d-flex  align-items-center '>" + subscribers + '</span>';
          }
        },
        {
          targets: 4,
          render: function (data, type, full, meta) {
            var stars = full['stars'];
            return "<span class='text-truncate d-flex  align-items-center'>" + stars + '</span>';
          }
        },
        {
          targets: 5,
          render: function (data, type, full, meta) {
            var duration = full['duration'];
            var direction = lang == 'ar' ? "ltr" : "rtl";
            return `<span dir="${direction}" class='text-truncate d-flex  align-items-center justify-content-end badge bg-label-success'> ${duration} </span>`;
          }
        },
        {
          targets: 6,
          render: function(data, type, full, meta) {
            var created_at = new Date(full['created_at']).toISOString();
            if (lang == 'ar') {
              created_at = created_at.slice(11, 19) + " " + created_at.slice(0, 10);
            } else {
              created_at = created_at.slice(0, 10) + " " + created_at.slice(11, 19);
            }
            return `<span class='text-truncate d-flex align-items-center'>${created_at}</span>`;
          }
        },
        {
          // Actions
          targets: -1,
          title: lang == 'ar' ? 'الإجراءات' : 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            let parent = `
              <div class="d-flex align-items-center">
                <a href="/offer/edit/${full.id}" class="text-body ms-1"><i class="ti ti-edit ti-sm me-2"></i></a>
                <a onclick="return confirm('هل انت متأكد')" href="/offer/delete/${full.id}" class="text-body "><i class="ti ti-trash ti-sm mx-2"></i></a>
              </div>
            `
            return parent;
          }
        }
      ],
      order: [[0, 'desc']],
      dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 10,
      language: {
        sLengthMenu: `${lang == 'ar' ? 'عرض' : 'show'} _MENU_`,
        search: `${lang == 'ar' ? 'بحث...' : 'search...'}`,
        searchPlaceholder:`${lang == 'ar' ? 'بحث...' : 'search...'}`
      },
      lengthMenu: [7, 10, 25, 50, 75, 100],
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
                columns: [0, 1, 2, 3, 4, 6],
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
                columns: [0, 1, 2, 3, 4, 6],
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
                columns: [0, 1, 2, 3, 4, 6],
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
                columns: [0, 1, 2, 3, 4, 6],
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
                columns: [0, 1, 2, 3, 4, 6],
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
