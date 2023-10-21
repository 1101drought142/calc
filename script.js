var calc_data = {
    tabs : [
        {
            active : true, 
            input_name : "from",
        },
        {
            active : false,
            input_name : "where",

        },
        {
            active : false,
            input_name : "box_count",
        },
        {
            active : false,
            input_name : "additional[]"
        },
        {
            active : false,
        },
    ]
}

var next_buttons = document.querySelectorAll(".next");
var prev_buttons = document.querySelectorAll(".prev");
var dynamic_bodies = document.querySelectorAll(".calc_right_part");

function calc_percent() {
    
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

function move_next_slide(){
    let active = get_active_tab_index();
    if (calc_data["tabs"].length - 1 == active){

    } else {
        console.log(get_step_value())
        if (get_step_value().length != 0) {
            calc_data["tabs"][active]["active"] = false;
            calc_data["tabs"][active + 1]["active"] = true;

            dynamic_bodies.forEach( function (tab, i) {
                if (i == active + 1) {
                    tab.classList.add("calc_right_part__active");
                } else {
                    tab.classList.remove("calc_right_part__active");
                }
            })
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
        calc_data["tabs"][active]["active"] = false;
        calc_data["tabs"][active - 1]["active"] = true;

        dynamic_bodies.forEach( function (tab, i) {
            if (i == active - 1) {
                tab.classList.add("calc_right_part__active");
            } else {
                tab.classList.remove("calc_right_part__active");
            }
        }) 
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