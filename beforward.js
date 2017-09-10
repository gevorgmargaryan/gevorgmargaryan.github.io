init();

function hide(list, el) {
    el && el.parent().parent().hide();

    el || $('[id^="bid_number_"] a').map(function() {
        el = $(this);
        if (list.indexOf(parseInt(el.text())) >= 0 || list.indexOf(el.text()) >= 0) {
            el.closest('tr[class^="ColorGreed"]').hide();
        }
    });
}

function add() {
    list = JSON.parse(localStorage.getItem('list'));
    el = $(this).parent().find('[id^="bid_number_"] a');

    list.push(el.text());
    localStorage.setItem('list', JSON.stringify(list));

    hide([el.text()], el);
}

function init() {
    $('td[id^="grade_"]').map(function() {
        this.onclick = add;
    });

    list = JSON.parse(localStorage.getItem('list'));

    list = list || ['8G87580358', '8I56605027', 'F702101163', '1J25070018', 1538920134, '1P00009426', 'F707500069', '1J250700181', 650650058, 1538580023, '1836040004', '1536990158', 'F701910976', 'F703500543', '1K20250071', '8G87584061', '1L21910002', 'F606510091', '8A62105279', 'F517130201', 22701076, 22704707, 84050, 50313, 80046, 58135, 20598, 5187, 59103, 83003, 84039, 80205, 80164, 59007, 57, 1121, 58221, 58013];

    localStorage.setItem('list', JSON.stringify(list));

    hide(list);
}
