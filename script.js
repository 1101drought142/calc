// var prices = {
//     kazan : {
//         rus_name: "Казань",
//         ekaterinburg : {
//             rus_name: "Екатеринбург",
//             korobki : {
//                 1 : 750,
//                 2 : 1500,
//                 3 : 2250,
//                 4 : 3000,
//                 5 : 3750,
//                 6 : 4000,
//                 7 : 4000,
//                 8 : 4400,
//                 9 : 4400,
//                 10 : 4800,
//             }
//         },
//         novosibirsk : {
//             rus_name: "Новосибирск",
//             korobki : {
//                 1 : 1600,
//                 2 : 3200,
//                 3 : 4850,
//                 4 : 6400,
//                 5 : 7500,
//                 6 : 7500,
//                 7 : 7500,
//                 8 : 7900,
//                 9 : 7900,
//                 10 : 8300,
//             }
//         },
//         shushari : {
//             rus_name: "Шушары",
//             korobki : {
//                 1 : 800,
//                 2 : 1600,
//                 3 : 2400,
//                 4 : 3200,
//                 5 : 4000,
//                 6 : 4800,
//                 7 : 5600,
//                 8 : 6400,
//                 9 : 6400,
//                 10 : 6800,
//             }
//         },
//         krasnodar : {
//             rus_name: "Краснодар",
//             korobki : {
//                 1 : 800,
//                 2 : 1600,
//                 3 : 2400,
//                 4 : 3200,
//                 5 : 4000,
//                 6 : 4800,
//                 7 : 5600,
//                 8 : 6400,
//                 9 : 6400,
//                 10 : 6800,
//             }
//         },
//         mixed : {
//             rus_name: "Коледино, Электросталь, Тула, Белые столбы, Софьино (ОЗ, ЯМ)",
//             korobki : {
//                 1 : 500,
//                 2 : 1000,
//                 3 : 1500,
//                 4 : 2000,
//                 5 : 2500,
//                 6 : 3000,
//                 7 : 3000,
//                 8 : 3400,
//                 9 : 3400,
//                 10 : 4800,
//             }
//         }
//     }
// }

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
            input_type : "radio",
            value: 0,
            set_korobki : true,
        },
        {
            active : false,
            input_name : "box",
            input_type : "checkbox",
            value: [],
            set_prices : true,
        },
        {
            active : false,
            input_name : "box_count[]",
            input_type : "int",
            value: 0,
            set_restriction: true,
        },
        {
            active : false,
            input_name : "additional[]",
            input_type : "checkbox",
            value: [],
            set_result: true,
            not_necessery: true,
        },
        {
            active : false,
        },
    ]
}

var prices = {
    kazan : {
        rus_name: "Казань",
        moscow : {
            rus_name: "Москва",
            korobki : 5000
        },
        shushari : {
            rus_name: "Шушары Краснодар",
            korobki : 8300
        },
    },
    moscow : {
        rus_name: "Москва",
        moscow : {
            rus_name: "Казань",
            korobki : 7500,
        },
        shushari : {
            rus_name: "Шушары Краснодар",
            korobki : 4800,
        },
        ekaterinburg : {
            rus_name: "Екатеринбург",
            korobki : 10000,
        },
        krasnodar : {
            rus_name: "Краснодар",
            korobki : 8000,
        },
    }
}
var next_buttons = document.querySelectorAll(".next");
var prev_buttons = document.querySelectorAll(".prev");
var dynamic_bodies = document.querySelectorAll(".calc_right_part");

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
    let res_values = [];
    input_list.forEach( function (input) {
        if (input.type == "radio" || input.type == "checkbox" || input.type == "number"){
            if (input.checked) {
                res_values.push(input.value);
            } else if (input.value && input.type == "number"){
                res_values.push(input.value);
            }
        } else {
            if (input.value) {
                res_values.push(input.value);
            }
        }
    })
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

function set_prices(){
    var inputs_container = document.getElementById("inputs_container_count");
    inputs_container.innerHTML = "";
    calc_data["tabs"][2]["value"].forEach(function (korobka_type_id) {
        var temp_korobka = boxes[korobka_type_id];
        var input = document.createElement("input");
        input.className = "one_row_input";
        input.setAttribute('type', 'number');
        input.setAttribute('name', "box_count[]");
        input.setAttribute('placeholder', "Введите кол.во коробов для отправки (" + temp_korobka["name"] + ")");
        input.setAttribute('max', "16");
        input.setAttribute('min', "0");
        var description = document.createElement("div");
        description.className = "two_list_blocks";
        description.innerHTML = "<ul> <li> <span class='pink_color'>1</span> " + temp_korobka["name"] + " - <span class='pink_color'> <span>" + (+temp_korobka["volume"] * +prices[calc_data["tabs"][0]["value"]][calc_data["tabs"][1]["value"]]["korobki"]).toFixed(2)  + " руб </span></span></li> </ul>";
        inputs_container.appendChild(input)
        inputs_container.appendChild(description)
    })
}

function set_restrictions(){
    restriction_blocks = document.querySelectorAll("[data-restriction]");
    restriction_blocks.forEach( function (restriction_block) {
        if (restriction_block.dataset.maxkorobki){
            if ( +restriction_block.dataset.maxkorobki < calc_data.tabs[3].value ){
                restriction_block.setAttribute('disabled', '');
            } else {
                restriction_block.removeAttribute('disabled');    
            }
        }
        if (restriction_block.dataset.minkorobki) {
            if ( +restriction_block.dataset.minkorobki >= calc_data.tabs[3].value ){
                restriction_block.setAttribute('disabled', '');
            } else {
                restriction_block.removeAttribute('disabled');    
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
            input.setAttribute('type', 'radio');
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
function set_korobki() {
    container = document.getElementById("korobki_container");
    container.innerHTML = "";
    boxes.forEach( function (box, i) {
        let label = document.createElement("label"); 
        label.className = "cart_variant_button";
        let text = document.createElement("p");
        text.textContent = box.name;
        let input = document.createElement("input");
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', "box");
        input.value = i;
        label.appendChild(text);
        label.appendChild(input);
        container.appendChild(label)
    })
}

function sum_list(list){
    result = 0
    list.forEach(function (element) {
        result += +element
    })
    return result;
}

function calc_volume() {
    result = 0;
    id_list = calc_data.tabs[2]["value"];
    count_list = calc_data.tabs[3]["value"];
    count_list.forEach(function (element, i) {
        temp_box = boxes[i];
        result += temp_box["volume"] * element
    })
    return result;
}

function calc_result_price() {
    result = 0;
    id_list = calc_data.tabs[2]["value"];
    count_list = calc_data.tabs[3]["value"];
    count_list.forEach(function (element, i) {
        temp_box = boxes[i];
        console.log()
        result += temp_box["volume"] * element * prices[calc_data["tabs"][0]["value"]][calc_data["tabs"][1]["value"]]["korobki"]
    })
    return result;
}

function set_result() {

    document.getElementById("last_button").style.display = "none";

    fromblock = document.querySelector("[data-fromblock]");
    toblock = document.querySelector("[data-toblock]");
    count_blocks = document.querySelectorAll("[data-blockcount]");
    priceblock = document.querySelector("[data-resultprice]");

    blockname = document.querySelectorAll("[data-blockname]");
    blockvolume = document.querySelectorAll("[data-blockvolume]");
    blockvolumeall = document.querySelectorAll("[data-blockvolumeall]");
    
    result_top_container = document.querySelector(".result_row__column");
    result_container = document.getElementById("result_calc_columnn");

    fromblock.textContent = prices[calc_data.tabs[0]["value"]]["rus_name"];
    toblock.textContent = prices[calc_data.tabs[0]["value"]][calc_data.tabs[1]["value"]]["rus_name"];

    count_blocks.forEach(element => {
        element.textContent = sum_list(calc_data.tabs[3]["value"])
    });
    
    blockname_str = "";
    boxes.forEach(element => {
        if (element.volume == calc_data.tabs[2]["value"]) {
            blockname_str = element.name;
        }
    });

    blockname.forEach(element => {
        element.textContent = blockname_str;
    });

    blockvolumeall.forEach(element => {
        element.textContent = calc_volume().toFixed(2);
    });


    priceblock.textContent = calc_result_price().toFixed(3);

    extra_rows = document.querySelectorAll(".result_row__extra_row");
    extra_rows.forEach( function (row) {
        row.remove()
    })

    calc_data['tabs'][2]["value"].forEach( function (element, i) {
        var result_row = document.createElement("div"); 
        result_row.className = "result_row result_row__extra_row";
        var result_row_name = document.createElement("div"); 
        result_row_name.className = "row_name";
        result_row_name.textContent = boxes[element]["name"] + " объём " + +boxes[element]["volume"] * +calc_data["tabs"][3]["value"][i] + " м³";
        var result_row_value = document.createElement("div"); 
        result_row_value.className = "row_value";
        result_row_value.textContent = +calc_data["tabs"][3]["value"][i] + " шт";
        result_row.append(result_row_name);
        result_row.append(result_row_value);
        result_top_container.append(result_row)    

    })
    if (calc_data["tabs"][4]["value"].length != 0){
        var result_row = document.createElement("div"); 
        result_row.className = "result_row result_row__extra_row";
        var result_row_name = document.createElement("div"); 
        result_row_name.className = "row_name";
        result_row_name.textContent = "Доставка по городу";
        var result_row_value = document.createElement("div"); 
        result_row_value.className = "row_value";
        result_row_value.textContent = calc_data["tabs"][4]["value"][0] + " P";
        result_row.append(result_row_name);
        result_row.append(result_row_value);
        result_container.append(result_row)    
        priceblock.textContent = +priceblock.textContent + +calc_data["tabs"][4]["value"][0]
    }
}

function move_next_slide(){
    let active = get_active_tab_index();
    if (calc_data["tabs"].length - 1 == active){

    } else {
        
        if (get_step_value().length != 0 || calc_data["tabs"][active]["not_necessery"] == true) {
            document.getElementById("last_button").style.display = "flex";

            if (calc_data["tabs"][active]["input_type"] == "radio"){
                calc_data["tabs"][active]["value"] = get_step_value()[0];
            } else {
                calc_data["tabs"][active]["value"] = get_step_value();
            }

            if (calc_data["tabs"][active]["set_prices"]){
                set_prices();
            }
            if (calc_data["tabs"][active]["set_restriction"]){
                set_restrictions();
            }
            if (calc_data["tabs"][active]["set_result"]){
                set_result();
            }
            if (calc_data["tabs"][active]["set_cities"]){
                set_cities(calc_data["tabs"][active]["value"]);
            }
            if (calc_data["tabs"][active]["set_korobki"]){
                set_korobki();
            }
            calc_data["tabs"][active]["active"] = false;
            calc_data["tabs"][active + 1]["active"] = true;

            dynamic_bodies.forEach( function (tab, i) {
                if (i == active + 1) {
                    tab.classList.add("calc_right_part__active");
                } else {
                    tab.classList.remove("calc_right_part__active");
                }
            })
            console.log(calc_data);
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
        calc_data["tabs"][active]["value"] = get_step_value();
        calc_data["tabs"][active]["active"] = false;
        calc_data["tabs"][active - 1]["active"] = true;

        dynamic_bodies.forEach( function (tab, i) {
            if (i == active - 1) {
                tab.classList.add("calc_right_part__active");
            } else {
                tab.classList.remove("calc_right_part__active");
            }
        }) 
        set_percent();
        document.getElementById("error_span").textContent = ""; 
    }
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