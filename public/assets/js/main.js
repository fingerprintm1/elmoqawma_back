'use strict';
  function showMessage (type = "success", message) {
    $(`.container_alert_js`).attr("hidden", false);
    $(`.${type}_message`).text(message);
    $(`.parent_${type}_message`).attr("hidden", false);
    setTimeout(() => {
      $(`.container_alert_js`).attr("hidden", true);
      $(`.${type}_message`).text("");
      $(`.parent_${type}_message`).attr("hidden", true);
    }, 2000)
  }
  function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status == 404;

  }
let menu,
    animate,
    isRtl = window.Helpers.isRtl(),
    isDarkStyle = window.Helpers.isDarkStyle(),
    isHorizontalLayout = !1;
document.getElementById('layout-menu') &&
(isHorizontalLayout = document.getElementById('layout-menu').classList.contains('menu-horizontal')),
    (function () {
        'undefined' != typeof Waves &&
        (Waves.init(),
            Waves.attach(".btn[class*='btn-']:not([class*='btn-outline-']):not([class*='btn-label-'])", ['waves-light']),
            Waves.attach("[class*='btn-outline-']"),
            Waves.attach("[class*='btn-label-']"),
            Waves.attach('.pagination .page-item .page-link')),
            document.querySelectorAll('#layout-menu').forEach(function (e) {
                (menu = new Menu(e, {
                    orientation: isHorizontalLayout ? 'horizontal' : 'vertical',
                    closeChildren: !!isHorizontalLayout,
                    showDropdownOnHover: localStorage.getItem('templateCustomizer-' + templateName + '--ShowDropdownOnHover')
                        ? 'true' === localStorage.getItem('templateCustomizer-' + templateName + '--ShowDropdownOnHover')
                        : void 0 === window.templateCustomizer || window.templateCustomizer.settings.defaultShowDropdownOnHover
                })),
                    window.Helpers.scrollToActive((animate = !1)),
                    (window.Helpers.mainMenu = menu);
            }),
            document.querySelectorAll('.layout-menu-toggle').forEach(e => {
                e.addEventListener('click', e => {
                    if (
                        (e.preventDefault(),
                            window.Helpers.toggleCollapsed(),
                        config.enableMenuLocalStorage && !window.Helpers.isSmallScreen())
                    )
                        try {
                            localStorage.setItem(
                                'templateCustomizer-' + templateName + '--LayoutCollapsed',
                                String(window.Helpers.isCollapsed())
                            );
                        } catch (e) {}
                });
            }),
            window.Helpers.swipeIn('.drag-target', function (e) {
                window.Helpers.setCollapsed(!1);
            }),
            window.Helpers.swipeOut('#layout-menu', function (e) {
                window.Helpers.isSmallScreen() && window.Helpers.setCollapsed(!0);
            });
        let e = document.getElementsByClassName('menu-inner'),
            t = document.getElementsByClassName('menu-inner-shadow')[0];
        e.length > 0 &&
        t &&
        e[0].addEventListener('ps-scroll-y', function () {
            this.querySelector('.ps__thumb-y').offsetTop ? (t.style.display = 'block') : (t.style.display = 'none');
        });
        let s = document.querySelector('.style-switcher-toggle');
        function a(e) {
            [].slice.call(document.querySelectorAll('[data-app-' + e + '-img]')).map(function (t) {
                const s = t.getAttribute('data-app-' + e + '-img');
                t.src = assetsPath + 'img/' + s;
            });
        }
        window.templateCustomizer
            ? (s &&
            s.addEventListener('click', function () {
                window.Helpers.isLightStyle()
                    ? window.templateCustomizer.setStyle('dark')
                    : window.templateCustomizer.setStyle('light');
            }),
                window.Helpers.isLightStyle()
                    ? (s &&
                    (s.querySelector('i').classList.add('ti-moon-stars'),
                        new bootstrap.Tooltip(s, { title: 'Dark mode', fallbackPlacements: ['bottom'] })),
                        a('light'))
                    : (s &&
                    (s.querySelector('i').classList.add('ti-sun'),
                        new bootstrap.Tooltip(s, { title: 'Light mode', fallbackPlacements: ['bottom'] })),
                        a('dark')))
            : s.parentElement.remove();
        let o = document.documentElement.getAttribute('lang'),
            n = document.getElementsByClassName('dropdown-language');
        if (null !== o && n.length) {
            let e = document.querySelector('a[data-language=' + o + ']'),
                t = e.childNodes[1].className;
            e.classList.add('selected');
            document.querySelector('.dropdown-language .dropdown-toggle').childNodes[1].className = t;
        }
        const l = document.querySelector('.dropdown-notifications-all'),
            i = document.querySelectorAll('.dropdown-notifications-read');
        l &&
        l.addEventListener('click', e => {
            i.forEach(e => {
                e.closest('.dropdown-notifications-item').classList.add('marked-as-read');
            });
        }),
        i &&
        i.forEach(e => {
            e.addEventListener('click', t => {
                e.closest('.dropdown-notifications-item').classList.toggle('marked-as-read');
            });
        });
        document.querySelectorAll('.dropdown-notifications-archive').forEach(e => {
            e.addEventListener('click', t => {
                e.closest('.dropdown-notifications-item').remove();
            });
        });
        [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (e) {
            return new bootstrap.Tooltip(e);
        });
        const r = function (e) {
            'show.bs.collapse' == e.type || 'show.bs.collapse' == e.type
                ? e.target.closest('.accordion-item').classList.add('active')
                : e.target.closest('.accordion-item').classList.remove('active');
        };
        [].slice.call(document.querySelectorAll('.accordion')).map(function (e) {
            e.addEventListener('show.bs.collapse', r), e.addEventListener('hide.bs.collapse', r);
        });
        if (
            (isRtl && Helpers._addClass('dropdown-menu-end', document.querySelectorAll('#layout-navbar .dropdown-menu')),
                window.Helpers.setAutoUpdate(!0),
                window.Helpers.initPasswordToggle(),
                window.Helpers.initSpeechToText(),
                window.Helpers.initNavbarDropdownScrollbar(),
                window.addEventListener(
                    'resize',
                    function (e) {
                        window.innerWidth >= window.Helpers.LAYOUT_BREAKPOINT &&
                        document.querySelector('.search-input-wrapper') &&
                        (document.querySelector('.search-input-wrapper').classList.add('d-none'),
                            (document.querySelector('.search-input').value = '')),
                        document.querySelector("[data-template^='horizontal-menu']") &&
                        setTimeout(function () {
                            window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT
                                ? document.getElementById('layout-menu') &&
                                document.getElementById('layout-menu').classList.contains('menu-horizontal') &&
                                menu.switchMenu('vertical')
                                : document.getElementById('layout-menu') &&
                                document.getElementById('layout-menu').classList.contains('menu-vertical') &&
                                menu.switchMenu('horizontal');
                        }, 100);
                    },
                    !0
                ),
            !isHorizontalLayout &&
            !window.Helpers.isSmallScreen() &&
            ('undefined' != typeof TemplateCustomizer &&
            window.templateCustomizer.settings.defaultMenuCollapsed &&
            window.Helpers.setCollapsed(!0, !1),
            'undefined' != typeof config && config.enableMenuLocalStorage))
        )
            try {
                null !== localStorage.getItem('templateCustomizer-' + templateName + '--LayoutCollapsed') &&
                'false' !== localStorage.getItem('templateCustomizer-' + templateName + '--LayoutCollapsed') &&
                window.Helpers.setCollapsed(
                    'true' === localStorage.getItem('templateCustomizer-' + templateName + '--LayoutCollapsed'),
                    !1
                );
            } catch (e) {}
    })(),
'undefined' != typeof $ &&
$(function () {
    window.Helpers.initSidebarToggle();
    var e = $('.search-toggler'),
        t = $('.search-input-wrapper'),
        s = $('.search-input'),
        a = $('.content-backdrop');
    if (
        (e.length &&
        e.on('click', function () {
            t.length && (t.toggleClass('d-none'), s.focus());
        }),
            $(document).on('keydown', function (e) {
                let a = e.ctrlKey,
                    o = 191 === e.which;
                a && o && t.length && (t.toggleClass('d-none'), s.focus());
            }),
            s.on('focus', function () {
                t.hasClass('container-xxl') && t.find('.twitter-typeahead').addClass('container-xxl');
            }),
            s.length)
    ) {
        var o = function (e) {
                return function (t, s) {
                    let a;
                    (a = []),
                        e.filter(function (e) {
                            if (e.name.toLowerCase().startsWith(t.toLowerCase())) a.push(e);
                            else {
                                if (
                                    e.name.toLowerCase().startsWith(t.toLowerCase()) ||
                                    !e.name.toLowerCase().includes(t.toLowerCase())
                                )
                                    return [];
                                a.push(e),
                                    a.sort(function (e, t) {
                                        return t.name < e.name ? 1 : -1;
                                    });
                            }
                        }),
                        s(a);
                };
            },
            n = 'search-vertical.json';
        if ($('#layout-menu').hasClass('menu-horizontal')) n = 'search-horizontal.json';
        var l,
            i = $.ajax({ url: assetsPath + 'json/' + n, dataType: 'json', async: !1 }).responseJSON;
        s.each(function () {
            var e = $(this);
            s
                .typeahead(
                    {
                        hint: !1,
                        classNames: {
                            menu: 'tt-menu navbar-search-suggestion',
                            cursor: 'active',
                            suggestion: 'suggestion d-flex justify-content-between px-3 py-2 w-100'
                        }
                    },
                    {
                        name: 'pages',
                        display: 'name',
                        limit: 5,
                        source: o(i.pages),
                        templates: {
                            header: '<h6 class="suggestions-header text-primary mb-0 mx-3 mt-3 pb-2">Pages</h6>',
                            suggestion: function ({ url: e, icon: t, name: s }) {
                                return (
                                    '<a href="' +
                                    baseUrl +
                                    e +
                                    '"><div><i class="ti ' +
                                    t +
                                    ' me-2"></i><span class="align-middle">' +
                                    s +
                                    '</span></div></a>'
                                );
                            },
                            notFound:
                                '<div class="not-found px-3 py-2"><h6 class="suggestions-header text-primary mb-2">Pages</h6><p class="py-2 mb-0"><i class="ti ti-alert-circle ti-xs me-2"></i> No Results Found</p></div>'
                        }
                    },
                    {
                        name: 'files',
                        display: 'name',
                        limit: 4,
                        source: o(i.files),
                        templates: {
                            header: '<h6 class="suggestions-header text-primary mb-0 mx-3 mt-3 pb-2">Files</h6>',
                            suggestion: function ({ src: e, name: t, subtitle: s, meta: a }) {
                                return (
                                    '<a href="javascript:;"><div class="d-flex w-50"><img class="me-3" src="' +
                                    assetsPath +
                                    e +
                                    '" alt="' +
                                    t +
                                    '" height="32"><div class="w-75"><h6 class="mb-0">' +
                                    t +
                                    '</h6><small class="text-muted">' +
                                    s +
                                    '</small></div></div><small class="text-muted">' +
                                    a +
                                    '</small></a>'
                                );
                            },
                            notFound:
                                '<div class="not-found px-3 py-2"><h6 class="suggestions-header text-primary mb-2">Files</h6><p class="py-2 mb-0"><i class="ti ti-alert-circle ti-xs me-2"></i> No Results Found</p></div>'
                        }
                    },
                    {
                        name: 'members',
                        display: 'name',
                        limit: 4,
                        source: o(i.members),
                        templates: {
                            header: '<h6 class="suggestions-header text-primary mb-0 mx-3 mt-3 pb-2">Members</h6>',
                            suggestion: function ({ name: e, src: t, subtitle: s }) {
                                return (
                                    '<a href="' +
                                    baseUrl +
                                    'app/user/view/account"><div class="d-flex align-items-center"><img class="rounded-circle me-3" src="' +
                                    assetsPath +
                                    t +
                                    '" alt="' +
                                    e +
                                    '" height="32"><div class="user-info"><h6 class="mb-0">' +
                                    e +
                                    '</h6><small class="text-muted">' +
                                    s +
                                    '</small></div></div></a>'
                                );
                            },
                            notFound:
                                '<div class="not-found px-3 py-2"><h6 class="suggestions-header text-primary mb-2">Members</h6><p class="py-2 mb-0"><i class="ti ti-alert-circle ti-xs me-2"></i> No Results Found</p></div>'
                        }
                    }
                )
                .bind('typeahead:render', function () {
                    a.addClass('show').removeClass('fade');
                })
                .bind('typeahead:select', function (e, t) {
                    'javascript:;' !== t.url && (window.location = baseUrl + t.url);
                })
                .bind('typeahead:close', function () {
                    s.val(''), e.typeahead('val', ''), t.addClass('d-none'), a.addClass('fade').removeClass('show');
                }),
                s.on('keyup', function () {
                    '' == s.val() && a.addClass('fade').removeClass('show');
                });
        }),
            $('.navbar-search-suggestion').each(function () {
                l = new PerfectScrollbar($(this)[0], { wheelPropagation: !1, suppressScrollX: !0 });
            }),
            s.on('keyup', function () {
                l.update();
            });
    }
});
