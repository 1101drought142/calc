var calc_data = {
    tabs : [
        {
            active : true, 
        },
        {
            active : false,
        },
        {
            active : false,
        },
        {
            active : false,
        },
    ]
}

var next_buttons = document.querySelectorAll(".next");
var prev_buttons = document.querySelectorAll(".prev");
var dynamic_bodies = document.querySelectorAll(".calc_right_part");

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
        calc_data["tabs"][active]["active"] = false;
        calc_data["tabs"][active + 1]["active"] = true;

        dynamic_bodies.forEach( function (tab, i) {
            if (i == active + 1) {
                tab.classList.add("calc_right_part__active");
            } else {
                tab.classList.remove("calc_right_part__active");
            }
        }) 
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
        console.log(calc_data["tabs"]);
    })
});

prev_buttons.forEach(element => {
    element.addEventListener("click", (event) => {
        move_last_slide();
        console.log(calc_data["tabs"]);
    })
});