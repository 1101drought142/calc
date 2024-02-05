let dateInput = document.getElementById("start-date");
//dateInput.min = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));
const yes_status = "img/Yes_Check_Circle.svg.png";
const no_status = "img/istockphoto-1294482883-612x612.jpg";
var current_where = null;
var cities_data = {};
var palets = [
    {
        name : "0-200 кг",
        maxweight: 200,
    },
    {
        name : "200-300 кг",
        maxweight: 300,
    },
    {
        name : "300-400 кг",
        maxweight: 400,
    },
    {
        name : "400-500 кг",
        maxweight: 500,
    },
]
var boxes = [
    {
        name : "Коробка 60x40x40",
        volume: 0.096,
    },
    {
        name : "Коробка 50x40x40",
        volume: 0.080,
    },
    {
        name : "Коробка 45x45x45",
        volume: 0.091,
    },
    {
        name : "Коробка 58x58x58",
        volume: 0.195,
    },
    {
        name : "Коробка 20x20x20",
        volume: 0.008,
    },
    {
        name : "Коробка 20x20x60",
        volume: 0.024,
    },
    {
        name : "Коробка 56x56x23",
        volume: 0.072,
    },
    {
        name : "Добавить свою",
        volume: "add_box",
    },
]

var calc_data = {
    tabs : [
        {
            active : true, 
            input_name : "from",
            input_type : "radio",
            value: 0,
            set_cities: true,
        },
        {
            active : false,
            input_name : "where",
            input_type : "checkbox",
            value: 0,
            set_where_data: true,
        },
        {
            active : false,
            input_name : "type_otpravlenie",
            input_type : "radio",
            value: 0,
            set_otpravlenie_content : true,
        },
        {
            active : false,
            input_name : "container_types[]",
            input_type : "checkbox",
            value: [],
            check_if_need_to_add_new_box : true,
        },
        {
            active : false,
            input_name : "parameters[]",
            input_type : "number",
            value: [],
            go_back : true,
        },
        {
            active : false,
            input_name : "container_count[]",
            input_type : "number",
            value: 0,
            set_count : true,
        },
        {
            active : false,
            input_name : "additional[]",
            input_type : "checkbox",
            value: [],
            not_necessery: true,
            renew_box: true,
        },
        {
            active : false,
            input_name : "name[]",
            input_type : "text",
            value: 0,
            set_restriction : true,
            set_result: true,

        },
        {
            active : false,
        },
    ]
}

var prices = {
    kazan : {
        rus_name: "Казань",
        tula : {
            rus_name: "Тула",
            korobki : 5210,
            pallets: [
                3000,
                3500,
                4500,
                5000
            ]
        },
        koledino : {
            rus_name: "Коледино",
            korobki : 5210,
            pallets: [
                3000,
                3500,
                4500,
                5000
            ]
        },
        elektrostal : {
            rus_name: "Электросталь",
            korobki : 5210,
            pallets: [
                3000,
                3500,
                4500,
                5000
            ]
        },
        podolsk : {
            rus_name: "Подольск",
            korobki : 5210,
            pallets: [
                3000,
                3500,
                4500,
                5000
            ]
        },
        beliestolbi : {
            rus_name: "Белые столбы",
            korobki : 5210,
            pallets: [
                3000,
                3500,
                4500,
                5000
            ]
        },
        yamsofino : {
            rus_name: "ЯМ Софьино",
            korobki : 5210,
            pallets: [
                3000,
                3500,
                4500,
                5000
            ]
        },
        ozon_sofiono : {
            rus_name: "ОЗОН Софьино",
            korobki : 5210,
            pallets: [
                3000,
                3500,
                4500,
                5000
            ]
        },
        shushari : {
            rus_name: "Шушары",
            korobki : 8340,
            pallets: [
                6000,
                6500,
                7000,
                7500
            ]
        },
        krasnodar : {
            rus_name: "Краснодар",
            korobki : 8340,
            pallets: [
                6500,
                7000,
                7500,
                8000
            ]
        },
        ekaterinburg : {
            rus_name: "Екатеринбург",
            korobki : 7815,
            pallets: [
                4000,
                4500,
                5000,
                5500
            ]
        },
        novosibirsk : {
            rus_name: "Новосибирск",
            korobki : 16670,
            pallets: [
                7500,
                8000,
                8500,
                9000
            ]
        },
        nevinomisk : {
            rus_name: "Невиномыск",
            korobki : 9900,
            pallets: [
                8000,
                8500,
                9000,
                9500
            ]
        },
    },
    moscow : {
        rus_name: "Москва",
        kazan : {
            rus_name: "Казань",
            korobki : 7815,
            pallets: [
                4500,
                5000,
                5500,
                6000
            ]
        },
        shushari : {
            rus_name: "Шушары",
            korobki : 5210,
            pallets: [
                3500,
                4000,
                4500,
                5000
            ]
        },
        ekaterinburg : {
            rus_name: "Екатеринбург",
            korobki : 10420,
            pallets: [
                7500,
                8000,
                8500,
                9000
            ]
        },
        krasnodar : {
            rus_name: "Краснодар",
            korobki : 8340,
            pallets: [
                5500,
                5000,
                6500,
                7000
            ]
        },
    }
}



var next_buttons = document.querySelectorAll(".next");
var prev_buttons = document.querySelectorAll(".prev");
var dynamic_bodies = document.querySelectorAll(".calc_right_part");


function get_from_city() {
    return calc_data["tabs"][0]["value"];
}
function get_to_city() {
    return calc_data["tabs"][1]["value"];
}
function get_otpravlenie_type() {
    return calc_data["tabs"][2]["value"];
}
function get_container_types(code) {
    return cities_data[code]["types"];
}
function get_box_params() {
    return calc_data["tabs"][4]["value"];
}
function get_container_count(code) {
    return cities_data[code]["count"];
}
function get_personal() {
    return calc_data["tabs"][6]["value"];
}
function get_additional_info(code) {
    return cities_data[code]["additional"];
}
function get_min_sum(code){
    return prices[get_from_city()][code]["pallets"].slice(-1)[0] / 10;
}
function sum_list(list){
    result = 0
    list.forEach(function (element) {
        result += +element
    })
    return result;
}
function calc_percent() {
    let tabs_length = calc_data["tabs"].length;
    let curent_tab = get_active_tab_index() + 1;

    let percent = Math.round( curent_tab / tabs_length * 100 );
    return percent;
}
function set_percent() {
    let percent = calc_percent();

    document.getElementById("js_progres_perc").style.width = percent + "%";
    document.getElementById("js_progress_count").textContent = percent;
}
function get_input_values(input_list){
    let empty_flag = false;
    let res_values = [];
    input_list.forEach( function (input) {
        if (input.type == "radio" || input.type == "checkbox" || input.type == "number" || input.type == "text" || input.type == "datetime-local"){
            if (input.checked) {
                res_values.push(input.value);
            } else if (input.value && input.type == "number"){
                res_values.push(input.value);
            } else if (input.value && input.type == "text"){
                res_values.push(input.value);
            } else if (input.value && input.type == "datetime-local"){
                res_values.push(input.value);
            }else if (!input.value && input.hasAttribute('required')){
                empty_flag = true;
            }
        } else {
            if (input.value) {
                res_values.push(input.value);
            }
        }
    })
    if (empty_flag){
        return [];
    }
    return res_values;
}

function get_step_value(){
    let active = get_active_tab_index();
    let result;
    dynamic_bodies.forEach( function (tab, i) {
        if (i == active) {
            let input_name = calc_data["tabs"][i]["input_name"];
            let inputs = tab.querySelectorAll(`input[name='${ input_name }']`)
            result =  get_input_values(inputs);
        }
    }) 
    return result;
}

function get_active_tab_index(){
    let active;
    calc_data["tabs"].forEach( function (tab, i)  {
        if (tab["active"] == true){
            active = i;
        }
    })
    return active;
}

function set_prices(container){
    container.innerHTML = "";
    get_container_types(current_where).forEach(function (korobka_type_id) {
        var temp_korobka = boxes[korobka_type_id];
        var input = document.createElement("input");
        input.className = "one_row_input";
        input.setAttribute('type', 'number');
        input.setAttribute('name', "container_count[]");
        input.setAttribute('required', "");
        input.setAttribute('placeholder', "Введите кол.во коробов для отправки (" + temp_korobka["name"] + ")");
        input.setAttribute('max', "16");
        input.setAttribute('min', "0");

        var description = document.createElement("div");
        description.className = "two_list_blocks";
        description.innerHTML = "<ul> <li> <span class='pink_color'>1</span> " + temp_korobka["name"] + " - <span class='pink_color'> <span>" + (+temp_korobka["volume"] * +prices[get_from_city()][current_where]["korobki"]).toFixed(2)  + " руб </span></span></li> </ul>";
        container.appendChild(input)
        container.appendChild(description)
    })
}

function set_restrictions(){
    restriction_blocks = document.querySelectorAll("[data-restriction]");
    restriction_blocks.forEach( function (restriction_block) {
        restriction_block.checked = false;
        

        if (restriction_block.dataset.onlykorobki && get_otpravlenie_type() == "pallets"){
            return;
        }
        if (restriction_block.dataset.onlykorobkiblock && get_otpravlenie_type() == "pallets"){
            restriction_block.setAttribute('disabled', '');
            return;
        } else {
            restriction_block.removeAttribute('disabled');    
        }
        if (restriction_block.dataset.pallets && get_otpravlenie_type() == "pallets"){
            restriction_block.removeAttribute('disabled');
            return;
        }
        if (restriction_block.dataset.maxkorobki){
            if ( +restriction_block.dataset.maxkorobki < sum_list(get_container_count(current_where)) ){
                restriction_block.setAttribute('disabled', '');
            } else {
                restriction_block.removeAttribute('disabled');    
            }
        }
        if (restriction_block.dataset.minkorobki) {
            if ( +restriction_block.dataset.minkorobki >= sum_list(get_container_count(current_where)) ){
                restriction_block.setAttribute('disabled', '');
            } else {
                restriction_block.removeAttribute('disabled');    
            }
        }
        if (restriction_block.dataset.minkorobkicheck) {
            if ( +restriction_block.dataset.minkorobkicheck <= sum_list(get_container_count(current_where)) ){
                restriction_block.setAttribute('disabled', '');
                restriction_block.checked = true;

            } else {
                restriction_block.removeAttribute('disabled');
                restriction_block.checked = false;    
            }
        }
    })
}


function set_cities(from_city) {
    container = document.getElementById("to_cities_container");
    container.innerHTML = "";
    for (const [key, value] of Object.entries(prices[from_city])) {
        if (key != "rus_name") {
            let label = document.createElement("label"); 
            label.className = "cart_variant_button";
            let text = document.createElement("p");
            text.textContent = value.rus_name;
            let input = document.createElement("input");
            input.setAttribute('type', 'checkbox');
            input.setAttribute('name', "where");
            if (calc_data["tabs"][1].length > 0){
                input.setAttribute('checked');
            }
            input.value = key;
            label.appendChild(text);
            label.appendChild(input);
            container.appendChild(label)
        }
    }
}
function set_cities_types(){
    container = document.querySelector(".choosen_cities");
    container.innerHTML = "";
    cities_data = {}
    get_to_city().forEach( function (city, i) {
        let text_block = document.createElement("p");
        let status_image = document.createElement("img");
        let city_container = document.createElement("div");

        text_block.textContent = prices[get_from_city()][city]["rus_name"];

        status_image.className = "choosen_city_img";
        status_image.src = no_status;
        status_image.dataset.code = city;


        city_container.className = "choosen_city";

        city_container.appendChild(text_block);
        city_container.appendChild(status_image);
        city_container.onclick = function () { change_city(city) };
        container.appendChild(city_container)

        if (!cities_data[city]){
            cities_data[city] = 
            {
                "type": null,
                "types": [],
                "count": [],
                "additional": [],
                "result_shown": false,
            };
        }
    })

    current_where = get_to_city()[0];

    document.getElementById("where_block").textContent = "Текущий город - " + prices[get_from_city()][current_where]["rus_name"];
}

function get_next_city(){
    for (const [key, value] of Object.entries(cities_data)) {
        console.log(key, value)
        if (!value["is_finished"]){
            return key; 
        }
    }
}   
function check_if_city_is_finished(code){
    if (cities_data[code]["type"] && cities_data[code]["count"] && cities_data[code]["types"]  && cities_data[code]["additional"]){
        cities_data[code]["is_finished"] = true;
        return true;
    }
    return false;
}
function check_if_cities_is_finished(){
    for (const [key, value] of Object.entries(cities_data)) {
        if (!check_if_city_is_finished(key)){
            return false;
        }
    }
    return true;
}
function set_container_types(container){
    container.innerHTML = "";
    palets.forEach( function (box, i) {
        let label = document.createElement("label"); 
        label.className = "cart_variant_button";
        let text = document.createElement("p");
        text.textContent = box.name;
        let input = document.createElement("input");
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', "container_types[]");
        if (calc_data["tabs"][1].length > 0){
            input.setAttribute('checked');
        }
        input.value = i;
        label.appendChild(text);
        label.appendChild(input);
        container.appendChild(label)
    })
}

function set_pallet_count(container){
    container.innerHTML = "";
    get_container_types(current_where).forEach(function (korobka_type_id) {
        var temp_palet = palets[korobka_type_id];
        var input = document.createElement("input");
        input.className = "one_row_input";
        input.setAttribute('type', 'number');
        input.setAttribute('name', "container_count[]");
        input.setAttribute('required', "");
        input.style.marginBottom = "10px"
        input.setAttribute('placeholder', "Введите кол.во палетов для отправки (" + temp_palet["name"] + ")");
        input.setAttribute('max', "16");
        input.setAttribute('min', "0");
        container.appendChild(input)
    })
}

function set_korobki(container) {
    container.innerHTML = "";
    boxes.forEach( function (box, i) {
        let label = document.createElement("label"); 
        label.className = "cart_variant_button";
        let text = document.createElement("p");
        text.textContent = box.name;
        let input = document.createElement("input");
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', "container_types[]");
        input.value = i;
        label.appendChild(text);
        label.appendChild(input);
        container.appendChild(label)
    })
}

function set_otpravlenie_content(){
    let header = document.getElementById("otpravlenie_type_name");
    let container = document.getElementById("otpravlenie_type_container");
    if (get_otpravlenie_type() == "boxes"){
        header.textContent = "Типы коробок";
        set_korobki(container);
    } else {
        header.textContent = "Вес паллет";
        set_container_types(container);
    }
}


function set_otpravlenie_count_content(){
    let header = document.getElementById("otpravlenie_type_count_name");
    let container = document.getElementById("otpravlenie_type_count_container");
    if (get_otpravlenie_type() == "boxes"){
        header.textContent = "Количество коробок";
        set_prices(container);
    } else {
        header.textContent = "Количество паллет";
        set_pallet_count(container);
    }
}


function calc_volume(city_code) {
    result = 0;
    id_list = get_container_types(city_code);
    count_list = get_container_count(city_code);
    count_list.forEach(function (element, i) {
        temp_box = boxes[id_list[i]];
        
        console.log(element)
        console.log(temp_box["volume"])

        result += temp_box["volume"] * element
    })
    return result;
}
function calc_result_price_pallets(city_code){
    result = 0;
    id_list = get_container_types(city_code);
    count_list = get_container_count(city_code);
    count_list.forEach(function (element, i) {
        temp_box_id = id_list[i];
        result += element * prices[get_from_city()][city_code]["pallets"][temp_box_id]
    })
    return result;
}
function calc_max_weight(city_code){
    result = 0;
    id_list = get_container_types(city_code);
    count_list = get_container_count(city_code);
    count_list.forEach(function (element, i) {
        temp_box = palets[id_list[i]];
        result += temp_box["maxweight"] * element
    })
    return result;
}
function calc_result_price(city_code) {
    result = 0;
    id_list = get_container_types(city_code);
    count_list = get_container_count(city_code);
    count_list.forEach(function (element, i) {
        temp_box = boxes[id_list[i]];
        let temp_r = temp_box["volume"] * element * prices[get_from_city()][city_code]["korobki"];
        result += temp_r;
    })
    let max_price = prices[get_from_city()][city_code]["pallets"][0];
    if (result > max_price){
        result = max_price;
    }
    return result;
}


function add_additional_rows(container, priceblock, code) {
    get_additional_info(code).forEach( function (additional) {
        
        if (additional == "small_dostavka"){
            var row_name = "Доставка по городу";
            var price = 500;
        } else if (additional == "big_dostavka") {
            var row_name = "Доставка по городу";
            var price = 1000;
        } else if (additional == "palletirovanie") {
            var row_name = "Паллетирование";
            if (get_otpravlenie_type() == "pallets"){
                var price = 350 * +sum_list(get_container_count(code));
            } else {
                var price = 350;
            }
        } else if (additional == "pallet") {
            var row_name = "Паллета";
            if (get_otpravlenie_type() == "pallets"){
                var price = 250 * +sum_list(get_container_count(code));
            } else {
                var price = 250;
            }
        }
    
        var result_row = document.createElement("div"); 
        result_row.className = "result_row result_row__extra_row";
        var result_row_name = document.createElement("div"); 
        result_row_name.className = "row_name";
        result_row_name.textContent = row_name;
        var result_row_value = document.createElement("div"); 
        result_row_value.className = "row_value";
        result_row_value.textContent = price + " P";
        result_row.append(result_row_name);
        //let priceblock24 = $('*[placeholder="Другая сумма"]');;

        //     console.log(priceblock24);


        //      priceblock24.val = +priceblock.textContent + +price;
                //  console.log(price);
        // console.log(priceblock24.val);
        result_row.append(result_row_value);




        container.append(result_row)    
        priceblock.textContent = +priceblock.textContent + +price
    })
}



function set_result() {
    //
    let current_city = null;
    let current_city_data = null;
    for (const [key, value] of Object.entries(cities_data)) {
        if (value["result_shown"] == false){
            current_city = key;
            current_city_data = value;
            cities_data[key]["result_shown"] = true;
            break;
        }
    }
    let button_name = "Оформить";
    for (const [key, value] of Object.entries(cities_data)) {
        if (value["result_shown"] == false){
            button_name = "Далее";
            break;
        }
    }
    document.querySelector("#last_button").textContent = button_name;
    let fromblock = document.querySelector("[data-fromblock]");
    let toblock = document.querySelector("[data-toblock]");
    let count_blocks = document.querySelectorAll("[data-blockcount]");
    let priceblock = document.querySelector("[data-resultprice]");

    let blockvolumeall = document.querySelectorAll("[data-blockvolumeall]");
    let otpravlenie_type_name = document.querySelectorAll("[data-otpravlenietype]");
    let rowallname = document.querySelectorAll("[data-rowallname]");
    let rowallcount = document.querySelectorAll("[data-rowallcount]");

    result_top_container = document.querySelector(".result_row__column");
    result_container = document.getElementById("result_calc_columnn");

    fromblock.textContent = prices[get_from_city()]["rus_name"];

    toblock.textContent = prices[get_from_city()][current_city]["rus_name"];

    
    if (get_from_city() == "kazan") {
        document.getElementById("moscow_text").style.display = "none";
        document.getElementById("kazan_text").style.display = "block";
    } else {
        document.getElementById("moscow_text").style.display = "block";
        document.getElementById("kazan_text").style.display = "none";
    }
    let rowallname_text = "";
    let rowallcount_text = "";
    
    count_blocks.forEach(element => {
        element.textContent = sum_list(get_container_count(current_city))
    });
    let min_price = get_min_sum(current_city);
    if (cities_data[current_city]["type"] == "boxes") {
        rowallname_text = "Всего коробов:";
        rowallcount_text = "Общий объем коробов:";
        blockvolumeall.forEach(element => {
            element.textContent = calc_volume(current_city).toFixed(3) + "  м³";
        });
        let result_price_temp = calc_result_price(current_city).toFixed(3)
        if (min_price > result_price_temp){
            result_price_temp = min_price;
        }
        priceblock.textContent = result_price_temp;

    } else if (cities_data[current_city]["type"] == "pallets"){
        rowallname_text = "Всего палет:";
        rowallcount_text = "Общий максимальный вес палет:";
        blockvolumeall.forEach(element => {
            element.textContent = calc_max_weight(current_city).toFixed(3) + "  кг";
        });
        let result_price_temp = calc_result_price_pallets(current_city).toFixed(3)
        if (min_price > result_price_temp){
            result_price_temp = min_price;
        }
        priceblock.textContent = result_price_temp;
        
    }


    

    rowallname.forEach(element => {
        element.textContent = rowallname_text;
    })
    rowallcount.forEach(element => {
        element.textContent = rowallcount_text;
    })

    let text;
    otpravlenie_type_name.forEach(element => {
    
        if (get_otpravlenie_type() == "boxes") {
            text = "Короб";
        } else if (get_otpravlenie_type() == "pallets"){
            text = "Паллеты";
        }
        element.textContent = text;
    });


    extra_rows = document.querySelectorAll(".result_row__extra_row");
    extra_rows.forEach( function (row) {
        row.remove()
    })

    let container_text;
    let container_quanity;
    get_container_types(current_city).forEach( function (element, i) {
        var result_row = document.createElement("div"); 
        result_row.className = "result_row result_row__extra_row";
        var result_row_name = document.createElement("div"); 
        result_row_name.className = "row_name";

        if (get_otpravlenie_type() == "boxes") {
            container_text = boxes[element]["name"] + " объём " + (boxes[element]["volume"] * get_container_count(current_city)[i]).toFixed(3) + " м³";
            container_quanity = +get_container_count(current_city)[i] + " шт";
        } else if (get_otpravlenie_type() == "pallets"){
            container_text = "Паллета " + palets[element]["name"];
            container_quanity = +get_container_count(current_city)[i] + " шт";
        }
        result_row_name.textContent = container_text;
        var result_row_value = document.createElement("div"); 
        result_row_value.className = "row_value";
        result_row_value.textContent = container_quanity;
        result_row.append(result_row_name);
        result_row.append(result_row_value);
        result_top_container.append(result_row)    

    })
    if (get_additional_info(current_city).length != 0){

        add_additional_rows(result_container, priceblock, current_city);
    }



    priceblock.textContent = parseFloat(priceblock.textContent).toFixed();
}

function add_new_box(){
    
    height = get_box_params()[0];
    width = get_box_params()[1];
    lenght = get_box_params()[2];
    
    element = {
        name : `Коробка ${height}x${width}x${lenght}`,
        volume : +((+height * +width * +lenght) / 1000000).toFixed(3)
    }

    boxes.splice( boxes.length - 1, 0, element);
}

function check_if_need_to_add_box(){
    let flag = false
    get_container_types(current_where).forEach( function (element) {
        if (boxes[element].volume == "add_box"){
            flag = true;
        }
    })
    return flag;
}
function move_next_slide(){
    // console.log(calc_data);
    console.log(cities_data);
    let active = get_active_tab_index();
    if (calc_data["tabs"].length - 1 == active){

    } else {
        
        if (get_step_value().length != 0 || calc_data["tabs"][active]["not_necessery"] == true) {
            var step = 1;
            console.log(get_step_value())
            console.log(calc_data["tabs"][active])
            if (calc_data["tabs"][active]["input_type"] == "radio"){
                calc_data["tabs"][active]["value"] = get_step_value()[0];
            } else {
                calc_data["tabs"][active]["value"] = get_step_value();
            }
            //step 3
            if (calc_data["tabs"][active]["set_otpravlenie_content"]){
                set_otpravlenie_content();
                cities_data[current_where]["type"] = get_step_value()[0];
            }
            //step 5
            if (calc_data["tabs"][active]["set_count"]){
                set_restrictions();
                cities_data[current_where]["count"] = get_step_value();
            }
            //set count of boxes 
            if (calc_data["tabs"][active]["renew_box"]){
                cities_data[current_where]["additional"] = get_step_value();
                if (check_if_city_is_finished(current_where)){
                    image = document.querySelector("[data-code=" + current_where);
                    image.src = yes_status;
                    current_where = get_next_city();
                    if (check_if_cities_is_finished()){
                        document.getElementById("where_block").textContent = "Все города заполнены";
                    } else {
                        document.getElementById("where_block").textContent = "Текущий город - " + prices[get_from_city()][current_where]["rus_name"];
                        step = -4;
                    }
                }
            }

            //step 1
            if (calc_data["tabs"][active]["set_cities"]){
                set_cities(calc_data["tabs"][active]["value"]);
            }
            //step 2
            if (calc_data["tabs"][active]["set_where_data"]){
                set_cities_types(); 
            }
            
            //step 4
            if (calc_data["tabs"][active]["check_if_need_to_add_new_box"]){
                cities_data[current_where]["types"] = get_step_value();
                if (check_if_need_to_add_box()) {
                    step = 1;
                } else {
                    set_otpravlenie_count_content();
                    step = 2;
                }
            }
            
            // extra step to add new box 
            if (calc_data["tabs"][active]["go_back"]){
                add_new_box();
                set_otpravlenie_content();
                step = -1;
            }
            
           
            //step 6
            if (calc_data["tabs"][active]["set_result"]){
                set_result();
            }

            calc_data["tabs"][active]["active"] = false;
            calc_data["tabs"][active + step]["active"] = true;

            dynamic_bodies.forEach( function (tab, i) {
                if (i == active + step) {
                    tab.classList.add("calc_right_part__active");
                } else {
                    tab.classList.remove("calc_right_part__active");
                }
            })
            set_percent();
            document.getElementById("error_span").textContent = ""; 
        } else {
            document.getElementById("error_span").textContent = "Не выбрана опция";
        }
    }
}

function move_last_slide(){
    let active = get_active_tab_index();
    if (0 == active){
    } else {
        var step = 1;
        
        if (calc_data["tabs"][active - step]["go_back"]){
            step = 2;
        }

        calc_data["tabs"][active]["value"] = get_step_value();
        calc_data["tabs"][active]["active"] = false;
        calc_data["tabs"][active - step]["active"] = true;
        
        dynamic_bodies.forEach( function (tab, i) {
            if (i == active - step) {
                tab.classList.add("calc_right_part__active");
            } else {
                tab.classList.remove("calc_right_part__active");
            }
        }) 
        set_percent();
        document.getElementById("error_span").textContent = ""; 
    }
}
function change_city(code){
    calc_data["tabs"].forEach( function (tab) { 
        tab["active"] = false;
    })
    calc_data["tabs"][2]["active"] = true;
    dynamic_bodies.forEach( function (tab, i) {
        if (i == 2) {
            tab.classList.add("calc_right_part__active");
        } else {
            tab.classList.remove("calc_right_part__active");
        }
    }) 

    current_where = code;
    document.getElementById("where_block").textContent = "Текущий город - " + prices[get_from_city()][current_where]["rus_name"];
}


next_buttons.forEach(element => {
    element.addEventListener("click", (event) => {
        move_next_slide();
    })
});

prev_buttons.forEach(element => {
    element.addEventListener("click", (event) => {
        move_last_slide();
    })
});

document.getElementById("last_button").addEventListener("click", function(event) {
    let flag = true;
    for (const [key, value] of Object.entries(cities_data)) {
        if (value["result_shown"] == false){
            flag = false;
        }
    }
    if (flag) {
        dynamic_bodies.forEach( function (tab, i) {
            tab.classList.remove("calc_right_part__active");
        })
        document.getElementById("result_block").classList.add("calc_right_part__active");

        from_city = prices[get_from_city()]["rus_name"];
        to_city = prices[get_from_city()][get_to_city()]["rus_name"]
        
        personal = "";

        get_personal().forEach(function (element) {
            personal += element + ",";
        })
        console.log(calc_data);
        var containers = "";
        var additional_info = "";
        var result_price = 0;
        if (get_otpravlenie_type() == "boxes") {
            get_container_types().forEach(function (korobka_type_id, i) {
                var temp_korobka = boxes[korobka_type_id];
                containers += `${temp_korobka["name"]}; Обьем : ${temp_korobka["volume"]} м2; Количество : ${get_container_count()[i]}; Цена за доставку коробок : ${(temp_korobka["volume"] * get_container_count()[i] * prices[get_from_city()][get_to_city()]["korobki"]).toFixed(3) } Р \n`;
            })
            var result_price = parseFloat(calc_result_price().toFixed(3));

        } else if (get_otpravlenie_type() == "pallets"){
            get_container_types().forEach(function (korobka_type_id, i) {
                var temp_pallet = palets[korobka_type_id];
                containers += `Паллет : ${temp_pallet["name"]}; Количество : ${get_container_count()[i]}; Цена : ${(+get_container_count()[i] * +prices[get_from_city()][get_to_city()]["pallets"][korobka_type_id]).toFixed(2)} Р \n`;
            })
            var result_price = parseFloat(calc_result_price_pallets().toFixed(3));

        }

        get_additional_info().forEach( function (additional) {
        
            if (additional == "small_dostavka"){
                var row_name = "Доставка по городу";
                var price = 500;
            } else if (additional == "big_dostavka") {
                var row_name = "Доставка по городу";
                var price = 1000;
            } else if (additional == "palletirovanie") {
                var row_name = "Паллетирование";
                var price = 350;
            } else if (additional == "pallet") {
                var row_name = "Паллета";
                var price = 250;
            }
            additional_info += `${row_name} Цена : ${price} Р\n`
            result_price = parseFloat(result_price) + parseFloat(price.toFixed(2));
        })
        result_price = document.querySelector("[data-resultprice]").textContent;
        // Создать объект XMLHttpRequest
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        xhr.open('POST', 'send_message_calc.php');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Обработать успешный ответ
                    let response = xhr.responseText;
                    if (response.success === false) {
                        console.log("error")
                    } else {
                        // Перенаправить на другую страницу
                        console.log("success")
                        console.log(response)
                    }
                } else {
                    // Обработать ошибку запроса
                    console.error('Ошибка запроса:', xhr.status);
                }
            }
        };
        formData.append("from_city", from_city);
        formData.append("to_city", to_city);
        formData.append("result_price", result_price);
        formData.append("personal", personal);
        formData.append("containers", containers);
        formData.append("additional_info", additional_info);
        formData.append("type", get_otpravlenie_type());
        // Отправить данные формы
        xhr.send(formData);


        console.log(result_price);
        console.log(personal);
    } else {
        set_result();
    }
})