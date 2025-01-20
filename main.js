// i can either fix this later or continue with the most batshit insane setup possible

var game = {
    money: 0,
    current_game: 0,

    multiplier: 1,
    mult_tick_max: 5,
    mult_tick: 0,

    effects: false,
    effects_list: [],
    effects_strings: [],
    effect_tick_max: 0,
    effect_tick_cool: 0,
    speedup: false,
    divided: false,

    roul_increment: 1,
    roul_up_count: 0,
    roul_count_real: 0,
    roul_up_cost: 10,
    roul_spins: 0,
    roul_auto: false,
    roul_auto_mode: false,
    roul_mode: 0,
    roul_sub_1: 0,
    roul_sub_2: 0,

    dice_unlock: false,
    dice_base: 1,
    dice_up_count: 0,
    dice_count_real: 0,
    dice_up_cost: 2000,
    dice_rolls: 0,
    dice_auto: false,
    dice_auto_mode: false,
    dice_mode: 0,
    dice_mode_ticks: 0,
    fvdc_mode_max: 5,

    jack_unlock: false,
    jack_base: 100000,
    jack_up_count: 0,
    jack_count_real: 0,
    jack_up_cost: 30000000,
    jack_card_inv: ["A", 2,3,4,5,6,7,8,9,10,"J","Q","K",
                    "A", 2,3,4,5,6,7,8,9,10,"J","Q","K",
                    "A", 2,3,4,5,6,7,8,9,10,"J","Q","K",
                    "A", 2,3,4,5,6,7,8,9,10,"J","Q","K"],
    jack_hand: [],
    jack_ace_count: 0,
    jack_ace_adjust: 1,
    jack_hand_value: 0,
    jack_pulls: 0,
    jack_auto: false,
    jack_auto_mode: false,
    jack_mode: 0,

    slot_unlock: false,
    slot_power: 1,
    slot_up_count: 0,
    slot_count_real: 0,
    slot_up_cost: 1 * (10 ** 11),
    slot_spins: 0,
    slot_effect_list: [1,2,3,4,5,6,7],
    slot_effect_timers: [0,0,0,0,0,0,0],
    slot_effect_hits: [0,0,0,0,0,0,0],
    slot_auto: false,
    slot_auto_mode: false,
    slot_mode: 0,


    auto_count: 0,
    main_tick_max: 3000,
    main_tick_cool: 0,
    roul_tick_max: 3000,
    roul_tick_cool: 0,
    fvdc_tick_max: 3000,
    fvdc_tick_cool: 0,
    jack_tick_max: 3000,
    jack_tick_cool: 0,
    slot_tick_max: 3000,
    slot_tick_cool: 0
}

function roul_up_add() {
    if (game.money >= game.roul_up_cost) {
        game.money -= game.roul_up_cost;
        
        game.roul_increment += 1;

        game.roul_count_real++;
        if (game.roul_up_count == game.roul_count_real - 1) {
            game.roul_up_count++;
        }

        game.roul_up_cost = 10 * (1.25 ** game.roul_count_real);
        game.roul_up_cost =
         Math.ceil((Math.round(game.roul_up_cost * 100) / 100).toFixed(2));
        money_update();

        document.getElementById("roul_upgrade").innerHTML =
         "higher payouts <br> (" 
         + game.roul_increment + " -> " + (game.roul_increment + 1) 
         + ") <br> costs " + standard_notation(game.roul_up_cost, "short") + " money";
    }
}

function fvdc_up_add() {
    if (game.money >= game.dice_up_cost) {
        game.money -= game.dice_up_cost;
        
        game.dice_base += 0.2;

        game.dice_count_real++;
        if (game.dice_up_count == game.dice_count_real - 1) {
            game.dice_up_count++;
        }

        game.dice_up_cost = 3000 * (1.5 ** game.dice_count_real);
        game.dice_up_cost =
         Math.ceil((Math.round(game.dice_up_cost * 100) / 100).toFixed(2));
        money_update();

        let next = game.dice_base + 0.2
        next = (Math.round(next * 10) / 10).toFixed(1);
        document.getElementById("fvdc_upgrade").innerHTML =
         "higher base multiplier <br> (" 
         + (Math.round(game.dice_base * 10) / 10).toFixed(1) + " -> " + next 
         + ") <br> costs " + standard_notation(game.dice_up_cost, "short") + " money";
    }
}

function jack_up_add() {
    if (game.money >= game.jack_up_cost) {
        game.money -= game.jack_up_cost;
        
        game.jack_base += 50000;

        game.jack_count_real++;
        if (game.jack_up_count == game.jack_count_real - 1) {
            game.jack_up_count++;
        }

        game.jack_up_cost = 30000000 * (1.375 ** game.jack_count_real);
        game.jack_up_cost =
         Math.ceil((Math.round(game.jack_up_cost * 100) / 100).toFixed(2));
        money_update();

        document.getElementById("jack_upgrade").innerHTML =
         "higher payouts <br> (" 
         + standard_notation(game.jack_base, "short") + " -> " 
         + standard_notation((game.jack_base + 50000), "short")
         + ") <br> costs " + standard_notation(game.jack_up_cost, "short") + " money";
    }
}
function slot_up_add() {
    if (game.money >= game.slot_up_cost) {
        game.money -= game.slot_up_cost;
        
        game.slot_power += 0.1;

        game.slot_count_real++;
        if (game.slot_up_count == game.slot_count_real - 1) {
            game.slot_up_count++;
        }

        game.slot_up_cost = (1 * (10 ** 12)) * (1.5 ** game.slot_count_real);
        game.slot_up_cost =
         Math.ceil((Math.round(game.slot_up_cost * 100) / 100).toFixed(2));
        money_update();
    

        let next = game.slot_power + 0.1;
        next = (Math.round(next * 10) / 10).toFixed(1);
        document.getElementById("slots_upgrade").innerHTML =
         "stronger effects <br> (x" 
         + (Math.round(game.slot_power * 10) / 10).toFixed(1) + " -> x" 
         + next
         + ") <br> costs " + standard_notation(game.slot_up_cost, "short") + " money";
    }
}
function auto_roulette() {
    if (game.money >= 200 && !game.roul_auto) {
        game.money -= 200;
        game.roul_auto = true;
        game.roul_auto_mode = true;
        game.auto_count++;
        game.main_tick_cool = 0;
        document.getElementById("roul_increment").style.visibility = "hidden";
        roulette();
    }
    if (!game.roul_auto_mode && game.roul_auto) {
        game.auto_count++;
        roulette();
        document.getElementById("roul_increment").style.visibility = "hidden";
        document.getElementById("roul_auto").innerHTML =
         "auto roulette <br><br> mode: on";
        
        game.roul_auto_mode = true;
    } else if (game.roul_auto_mode && game.roul_auto) {
        game.auto_count--;
        document.getElementById("roul_increment").style.visibility = "visible";
        document.getElementById("roul_auto").innerHTML =
         "auto roulette <br><br> mode: off";
        
        game.roul_auto_mode = false;
    }
}

function auto_dice() {
    if (game.money >= 20000 && !game.dice_auto) {
        game.money -= 20000;
        game.dice_auto = true;
        game.dice_auto_mode = true;
        game.auto_count++;
        game.main_tick_cool = 0;
        document.getElementById("five_dice_roll").style.visibility = "hidden";
        five_dice();
    }
    if (!game.dice_auto_mode && game.dice_auto) {
        game.auto_count++;
        five_dice();
        document.getElementById("five_dice_roll").style.visibility = "hidden";
        document.getElementById("five_dice_auto").innerHTML =
         "auto dice <br><br> mode: on";
        
        game.dice_auto_mode = true;
    } else if (game.dice_auto_mode && game.dice_auto) {
        game.auto_count--;
        document.getElementById("five_dice_roll").style.visibility = "visible";
        document.getElementById("five_dice_auto").innerHTML =
         "auto dice <br><br> mode: off";
        
        game.dice_auto_mode = false;
    }
}

function auto_jack() {
    if (game.money >= 4 * (10 ** 8) && !game.jack_auto) {
        game.money -= 4 * (10 ** 8);
        game.jack_auto = true;
        game.jack_auto_mode = true;
        game.auto_count++;
        game.main_tick_cool = 0;
        document.getElementById("blackjack_draw").style.visibility = "hidden";
        blackjack();
    }
    if (!game.jack_auto_mode && game.jack_auto) {
        game.auto_count++;
        blackjack();
        document.getElementById("blackjack_draw").style.visibility = "hidden";
        document.getElementById("jack_auto").innerHTML =
         "auto blackjack <br><br> mode: on";
        
        game.jack_auto_mode = true;
    } else if (game.jack_auto_mode && game.jack_auto) {
        game.jack_count--;
        document.getElementById("blackjack_draw").style.visibility = "visible";
        document.getElementById("jack_auto").innerHTML =
         "auto blackjack <br><br> mode: off";
        
        game.jack_auto_mode = false;
    }
}

function auto_slots() {
    if (game.money >= 6 * (10 ** 12) && !game.slot_auto) {
        game.money -= 6 * (10 ** 12);
        game.slot_auto = true;
        game.slot_auto_mode = true;
        game.auto_count++;
        game.main_tick_cool = 0;
        document.getElementById("slots_spin").style.visibility = "hidden";
        slot_machine();
    }
    if (!game.slot_auto_mode && game.slot_auto) {
        game.auto_count++;
        slot_machine();
        document.getElementById("slots_spin").style.visibility = "hidden";
        document.getElementById("slots_auto").innerHTML =
         "auto slot machine <br><br> mode: on";
        
        game.slot_auto_mode = true;
    } else if (game.slot_auto_mode && game.slot_auto) {
        game.slot_count--;
        document.getElementById("slots_spin").style.visibility = "visible";
        document.getElementById("slots_auto").innerHTML =
         "auto slot machine <br><br> mode: off";
        
        game.slot_auto_mode = false;
    }
}

function game_change(change) {
    let games = ["roulette", "five_dice", "blackjack", "slot_machine"];
    for (let i = 0; i < games.length; i++) {
        if (i == change) {
            game.current_game = change;
            document.getElementById(games[i]).style.display = "flex";
        } else {
            document.getElementById(games[i]).style.display = "none";
        }
    }
}

// mercy functions
function money_update() {
    document.getElementById("money").innerHTML =
     standard_notation((Math.round(game.money * 100) / 100).toFixed(2), "long") + " money";
}

function standard_notation(number, form) {
    if (number > 1000) {
        let convert = Math.floor((Math.log10(number) / 3) - 1);
        let prefix = ""
        let leading = number / (10 ** ((3 * convert) + 3));
        if (leading >= 100) {
            leading = leading.toFixed(1);
        } else if (leading >= 10 && leading < 100) {
            leading = leading.toFixed(2);
        } else {
            leading = leading.toFixed(3);
        }
        switch (convert) {
            case 0: 
                prefix = " k";
                break;
            case 1:
                prefix = " m";
                break;
            case 2:
                prefix = " b";
                break;
            case 3:
                prefix = " tr";
                break;
            case 4:
                prefix = " quadr"
                break;
            case 5:
                prefix = " quint"
                break;
        }
        if (form == "short") {
            switch (convert) {
                case 0: 
                    prefix = " K";
                    break;
                case 1:
                    prefix = " M";
                    break;
                case 2:
                    prefix = " B";
                    break;
                case 3:
                    prefix = " T";
                    break;
                case 4:
                    prefix = " Qa";
                    break;
                case 5:
                    prefix = " Qu"
                    break;
            }
            return leading + prefix;
        }
        if (form == "long" && number >= 1000000) {
            return leading + prefix + "illion";
        } else {
            return leading + " thousand";
        }

    } else {
        return number;
    }
}
function mult_new(mult) {
    game.multiplier = mult;
    document.getElementById("multiplier").innerHTML =
     "current multi: x" + standard_notation(game.multiplier, "short");
}

function tick_update(tick_choice, tick_max, id, decrement) {
    if (tick_choice <= tick_max && tick_choice > 0 && decrement == 1) {
        tick_choice -= 100;
    }
    if (id === "cooldown" && game.auto_count > 0) {
        document.getElementById(id).innerHTML =
         "all auto ticks occur every " + tick_max/1000 + " seconds";
    } else if (id !== "cooldown") {
        document.getElementById(id).innerHTML =
         "cooldown: " + tick_choice/1000 + " seconds";
    }
    return tick_choice;
}
function unlock_check() {
    if (game.money >= 300 && !game.dice_unlock) {
        document.getElementById("select_roul").style.visibility = "visible";
        document.getElementById("select_dice").style.visibility = "visible";
    }
    if (game.dice_unlock) {
        document.getElementById("select_roul").style.visibility = "visible";
        document.getElementById("select_dice").style.visibility = "visible";
    }

    if (game.money >= 1000000 && !game.jack_unlock) {
        document.getElementById("select_jack").style.visibility = "visible";
    }
    if (game.jack_unlock) {
        document.getElementById("select_jack").style.visibility = "visible";
    }

    if (game.money >= 4 * (10 ** 10) && !game.slot_unlock) {
        document.getElementById("select_slot").style.visibility = "visible";
    }
    if (game.slot_unlock) {
        document.getElementById("select_slot").style.visibility = "visible";
    }
}
function cost_check() {
    let check = 0;
    if (game.roul_count_real == game.roul_up_count) {
        check++;
    }
    if (game.dice_count_real == game.dice_up_count) {
        check++;
    }
    if (game.jack_count_real == game.jack_up_count) {
        check++;
    }
    if (game.slot_count_real == game.slot_up_count) {
        check++;
    }
    if (check == 4) {
        game.divided = false;
    }
}
function effect(pick) {
    if (game.slot_effect_timers[pick] > 0) {
        let strength = game.slot_effect_hits[pick]
        if (pick == 0) {
            return (216 * strength * game.slot_power);
        } else if (pick == 1) {
            return (81 * strength * game.slot_power);
        } else if (pick == 2) {
            return (100 * strength * game.slot_power);
        } else if (pick == 3) {
            return (7 * strength * game.slot_power);
        } else if (pick == 4) {
            return (777 * strength * game.slot_power);
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}
function effect_handle() {
    let check = 0;
    let string = [];
    for (let i = 0; i < game.slot_effect_timers.length; i++) {
        if (game.slot_effect_timers[i] == 0) {
            if (i == 5) {
                // do some shit
                game.speedup = false
                game.main_tick_max = 3000;
                game.roul_tick_max = 3000;
                game.fvdc_tick_max = 3000;
                game.jack_tick_max = 3000;
                game.slot_tick_max = 3000;
            }
            check++;
        } else if (game.slot_effect_timers[i] > 0) {
            game.slot_effect_timers[i]--;
            if (game.slot_effect_timers[i] != 0) {
                switch (i) {
                    case 0:
                        string.push("x" + game.slot_effect_hits[i] + 
                        " roulette multiplier for " + 
                        game.slot_effect_timers[i] + " more ticks");
                        break;
                    case 1:
                        string.push("x" + game.slot_effect_hits[i] + 
                        " dice multiplier for " + 
                        game.slot_effect_timers[i] + " more ticks");
                        break;
                    case 2:
                        string.push("x" + game.slot_effect_hits[i] + 
                        " blackjack multiplier for " + 
                        game.slot_effect_timers[i] + " more ticks");
                        break;
                    case 3:
                        string.push("x" + game.slot_effect_hits[i] + 
                        " all bets multiplier for " + 
                        game.slot_effect_timers[i] + " more ticks");
                        break;
                    case 4:
                        string.push("x" + game.slot_effect_hits[i] + 
                        " all machines multiplier for " + 
                        game.slot_effect_timers[i] + " more ticks");
                        break;
                    case 5:
                        string.push("x" + game.slot_effect_hits[i] + 
                        " faster ticks for " + 
                        game.slot_effect_timers[i] + " more ticks");
                        break;
                    case 6:
                        string.push("costs for all upgrades reduced " +
                         game.slot_effect_hits[i] + " times");
                        break;
                }
            }
        }
    }
    let final_string = "" 
    for (let j = 0; j < string.length; j++) {
        if (j != string.length - 1) {
            final_string += (string[j] + ", ");
        } else {
            final_string += string[j];
        }
    }
    document.getElementById("slot_sub_info").innerHTML = "current effects: " + final_string;

    if (check == 7) {
        game.effects = false;
        document.getElementById("slot_sub_info").innerHTML = "";
    }
}
var main_loop = window.setInterval(function() {
    if (game.main_tick_cool <= game.main_tick_max && game.main_tick_cool > 0) {
        game.main_tick_cool = tick_update(game.main_tick_cool, game.main_tick_max, "cooldown", 1);
        game.roul_tick_cool = tick_update(game.roul_tick_cool, game.roul_tick_max, "roul_ticks", 1);
        game.fvdc_tick_cool = tick_update(game.fvdc_tick_cool, game.fvdc_tick_max, "fvdc_ticks", 1);
        game.jack_tick_cool = tick_update(game.jack_tick_cool, game.jack_tick_max, "jack_ticks", 1);
        game.slot_tick_cool = tick_update(game.slot_tick_cool, game.slot_tick_max, "slot_ticks", 1);
    }
    money_update();
    unlock_check();
    cost_check();
    if (game.main_tick_cool == 0) {
        if (game.effects) {
            effect_handle();
        }
        if (game.slot_auto_mode) {
            slot_machine();
        }
        if (game.dice_auto_mode) {
            five_dice();
        }
        if (game.roul_auto_mode) {
            roulette();
        }
        if (game.jack_auto_mode) {
            blackjack();
        }
        game.main_tick_cool = game.main_tick_max;
    }
  }, 100);


var save_loop = window.setInterval(function() {
    localStorage.setItem("gambling_machine", JSON.stringify(game))
}, 15000);

var save_game = JSON.parse(localStorage.getItem("gambling_machine"))
if (save_game !== null) {
  game = save_game
};

