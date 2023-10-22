var calc_data = {
    tabs : [
        {
            active : true, 
            input_name : "from",
            input_type : "radio",
            value: 0,
        },
        {
            active : false,
            input_name : "where",
            input_type : "radio",
            value: 0,
            set_prices : true,
        },
        {
            active : false,
            input_name : "box_count",
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
        },
        {
            active : false,
        },
    ]
}

var prices = {
    kazan : {
        rus_name: "Казань",
        ekaterinburg : {
            rus_name: "Екатеринбург",
            korobki : {
                1 : 750,
                2 : 1500,
                3 : 2250,
                4 : 3000,
                5 : 3750,
                6 : 4000,
                7 : 4000,
                8 : 4400,
                9 : 4400,
                10 : 4800,
            }
        },
        novosibirsk : {
            rus_name: "Новосибирск",
            korobki : {
                1 : 1600,
                2 : 3200,
                3 : 4850,
                4 : 6400,
                5 : 7500,
                6 : 7500,
                7 : 7500,
                8 : 7900,
                9 : 7900,
                10 : 8300,
            }
        },
        shushari : {
            rus_name: "Шушары",
            korobki : {
                1 : 800,
                2 : 1600,
                3 : 2400,
                4 : 3200,
                5 : 4000,
                6 : 4800,
                7 : 5600,
                8 : 6400,
                9 : 6400,
                10 : 6800,
            }
        },
        krasnodar : {
            rus_name: "Краснодар",
            korobki : {
                1 : 800,
                2 : 1600,
                3 : 2400,
                4 : 3200,
                5 : 4000,
                6 : 4800,
                7 : 5600,
                8 : 6400,
                9 : 6400,
                10 : 6800,
            }
        },
        mixed : {
            rus_name: "Коледино, Электросталь, Тула, Белые столбы, Софьино (ОЗ, ЯМ)",
            korobki : {
                1 : 500,
                2 : 1000,
                3 : 1500,
                4 : 2000,
                5 : 2500,
                6 : 3000,
                7 : 3000,
                8 : 3400,
                9 : 3400,
                10 : 4800,
            }
        }
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
        if (input.type == "radio" || input.type == "checkbox"){
            if (input.checked) {
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
    prices_blocks = document.querySelectorAll("[data-price]");
    prices_blocks.forEach( function (price_block) {
        price_block.textContent = prices[calc_data["tabs"][0]["value"]][calc_data["tabs"][1]["value"]]["korobki"][price_block.dataset.price_count]
    })
}

function set_restrictions(){
    restriction_blocks = document.querySelectorAll("[data-restriction]");
    restriction_blocks.forEach( function (restriction_block) {
        if (restriction_block.dataset.maxkorobki){
            if ( +restriction_block.dataset.maxkorobki < calc_data.tabs[2].value ){
                restriction_block.setAttribute('disabled', '');
            } else {
                restriction_block.removeAttribute('disabled');    
            }
        }
        if (restriction_block.dataset.minkorobki) {
            if ( +restriction_block.dataset.minkorobki >= calc_data.tabs[2].value ){
                restriction_block.setAttribute('disabled', '');
            } else {
                restriction_block.removeAttribute('disabled');    
            }
        }
    })
}

function set_result() {
    fromblock = document.querySelector("[data-fromblock]");
    toblock = document.querySelector("[data-toblock]");
    count_blocks = document.querySelectorAll("[data-blockcount]");
    priceblock = document.querySelector("[data-resultprice]");
    fromblock.textContent = prices[calc_data.tabs[0]["value"]]["rus_name"];
    toblock.textContent = prices[calc_data.tabs[0]["value"]][calc_data.tabs[1]["value"]]["rus_name"];

    count_blocks.forEach(element => {
        element.textContent = calc_data.tabs[2]["value"];
    });
    temp_count = calc_data.tabs[2]["value"];
    if (temp_count >= 10){
        temp_count = 10;
    }
    priceblock.textContent = prices[calc_data.tabs[0]["value"]][calc_data.tabs[1]["value"]]["korobki"][temp_count]
}

function move_next_slide(){
    let active = get_active_tab_index();
    if (calc_data["tabs"].length - 1 == active){

    } else {
        
        if (get_step_value().length != 0) {
            if (calc_data["tabs"][active]["input_type"] == "radio" || calc_data["tabs"][active]["input_type"] == "int"){
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
            calc_data["tabs"][active]["active"] = false;
            calc_data["tabs"][active + 1]["active"] = true;

            dynamic_bodies.forEach( function (tab, i) {
                if (i == active + 1) {
                    tab.classList.add("calc_right_part__active");
                } else {
                    tab.classList.remove("calc_right_part__active");
                }
            })
            set_percent();
            document.getElementById("error_span").textContent = ""; 
            console.log(calc_data);
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
        console.log(calc_data);
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