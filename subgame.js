function roulette() {
    if (game.roul_tick_cool == 0) {
        game.roul_tick_cool = game.roul_tick_max;
        tick_update(game.main_tick_cool, game.main_tick_max, "cooldown", 0);
        tick_update(game.roul_tick_cool, game.roul_tick_max, "roul_ticks", 0);

        game.roul_spins++;
        if (game.roul_spins >= 1) {
            document.getElementById("roul_info").style.visibility = "visible";
            document.getElementById("roul_ticks").style.visibility = "visible";
            document.getElementById("roul_auto").style.visibility = "visible";
            document.getElementById("roul_upgrade").style.visibility = "visible";
        }
        if (game.roul_spins >= 10) {
            document.getElementById("roul_setting").style.display = "block";
        }

        let temp = game.roul_increment;
        let roul_spin = Math.floor(Math.random()*36) + 1;
        temp *= roul_handle(roul_spin, game.roul_mode);
        temp *= game.multiplier;
        temp *= effect(0);
        temp *= effect(4);

        document.getElementById("roul_info").innerHTML =
         "roulette: " + roul_spin + " (+" + standard_notation((Math.round(temp * 100) / 100).toFixed(2), "short") + " money)";
        game.money += temp;
        money_update();
    }
}

function roul_handle(spin, mode) {
    let roul_mult = 1;
    if (mode == 1) {
        if (spin % 2 == game.roul_sub_1 && game.roul_sub_1 != 3) {
            roul_mult *= 2;
            roul_mult *= effect(3);
        }
        if (spin <= game.roul_sub_2 && spin > game.roul_sub_2 - 18 && game.roul_sub_2 != 0) {
            roul_mult *= 2;
            roul_mult *= effect(3);
        }
    } else if (mode == 2) {
        let check = document.getElementById("roul_input").valueAsNumber;
        if (check === spin) {
            roul_mult *= 36;
            roul_mult *= effect(3);
        }
    }
    return roul_mult;
}



function five_dice() {
    if (game.money > 500 && !game.dice_unlock) {
        game.money -= 500;
        game.dice_unlock = true;
        document.getElementById("five_dice_text").style.visibility = "visible";
        document.getElementById("five_dice_auto").style.visibility = "visible";
        document.getElementById("fvdc_upgrade").style.visibility = "visible";
        document.getElementById("multiplier").style.display = "block";
        document.getElementById("five_dice_roll").innerHTML =
         "<br>roll five dice<br><br>";
    }
    if (game.dice_unlock) {
        document.getElementById("five_dice_text").style.visibility = "visible";
        document.getElementById("five_dice_auto").style.visibility = "visible";
        document.getElementById("fvdc_upgrade").style.visibility = "visible";
        document.getElementById("multiplier").style.display = "block";
        document.getElementById("five_dice_roll").innerHTML =
         "<br>roll five dice<br><br>";
    }
    if (game.dice_rolls >= 10) {
        document.getElementById("five_dice_sett").style.visibility = "visible";
    }

    if (game.dice_unlock && game.fvdc_tick_cool == 0) {
        game.fvdc_tick_cool = game.fvdc_tick_max;
        game.dice_rolls++;
        tick_update(game.main_tick_cool, game.main_tick_max, "cooldown", 0);
        tick_update(game.fvdc_tick_cool, game.fvdc_tick_max, "fvdc_ticks", 0);

        let dice = [0,0,0,0,0];
        for (let i = 0; i < 5; i++) {
            //determines the numbers
            var x = Math.floor(Math.random()*6 + 1);
            dice[i] = x;   
        }
        let count = [0,0,0,0,0,0];
        for (let k = 0; k < 5; k++) {
            // checks for how many times a number came up
            count[dice[k] - 1]++;
        }
        let combo = [0,0,0,0,0];
        for (let l = 0; l < 6; l++) {
            // checks for how many times a combo came up
            if (count[l] != 0) {
                combo[count[l] - 1]++;
            }
        }
        
        let dice_mult = game.dice_base;
        let dice_result = "";
        let dice_result_sett = 0;
        document.getElementById("five_dice_info").innerHTML =
         "five dice: " + dice;

        // rawdogging every possible case for outcomes
        if (combo[4] == 1) {
            dice_mult *= 729;
            dice_result = "five of a kind";
            dice_result_sett = 6;
            if (dice_result_sett == game.dice_mode) {
                dice_mult *= 64;
                dice_mult *= effect(3);
            }
        } else if (combo[3] == 1) {
            dice_mult *= 243;
            dice_result = "four of a kind";
            dice_result_sett = 5;
            if (dice_result_sett == game.dice_mode) {
                dice_mult *= 32;
                dice_mult *= effect(3);
            }
        } else if (combo[2] == 1 && combo[1] == 1) {
            dice_mult *= 81;
            dice_result = "full house";
            dice_result_sett = 4;
            if (dice_result_sett == game.dice_mode) {
                dice_mult *= 16;
                dice_mult *= effect(3);
            }
        } else if (combo[2] == 1 && combo[1] == 0) {
            dice_mult *= 27;
            dice_result = "three of a kind";
            dice_result_sett = 3;
            if (dice_result_sett == game.dice_mode) {
                dice_mult *= 8;
                dice_mult *= effect(3);
            }
        } else if (combo[1] == 2) {
            dice_mult *= 9;
            dice_result = "two pair";
            dice_result_sett = 2;
            if (dice_result_sett == game.dice_mode) {
                dice_mult *= 4;
                dice_mult *= effect(3);
            }
        } else if (combo[1] == 1) {
            dice_mult *= 3;
            dice_result = "pair";
            dice_result_sett = 1;
            if (dice_result_sett == game.dice_mode) {
                dice_mult *= 2;
                dice_mult *= effect(3);
            }
        } else {
            dice_mult *= 1;
            dice_result = "nothing special";
            dice_result_sett = 9;
        }
        dice_mult *= effect(1);
        dice_mult *= effect(4);

        dice_mult = (Math.round(dice_mult * 100) / 100).toFixed(2)
        document.getElementById("five_dice_subinf").innerHTML =
         "type of roll: " + dice_result + ", giving a x" + standard_notation(dice_mult, "short") + " multiplier";
        mult_new(dice_mult);
    }
}

function blackjack() {
    if (game.money > (10 ** 7) && !game.jack_unlock) {
        game.money -= (10 ** 7);
        game.jack_unlock = true;
        document.getElementById("jack_text").style.visibility = "visible";
        document.getElementById("jack_auto").style.visibility = "visible";
        document.getElementById("jack_upgrade").style.visibility = "visible";
        document.getElementById("blackjack_draw").innerHTML =
         "<br>draw blackjack cards<br><br>";
    }
    if (game.jack_unlock) {
        document.getElementById("jack_text").style.visibility = "visible";
        document.getElementById("jack_auto").style.visibility = "visible";
        document.getElementById("jack_upgrade").style.visibility = "visible";
        document.getElementById("blackjack_draw").innerHTML =
         "<br>draw blackjack cards<br><br>";
    }
    if (game.jack_pulls >= 10) {
        document.getElementById("jack_sett").style.visibility = "visible";
    }

    if (game.jack_hand_value < 21 && game.jack_tick_cool == 0) {
        game.jack_tick_cool = game.jack_tick_max;
        game.jack_pulls++;
        tick_update(game.main_tick_cool, game.main_tick_max, "cooldown", 0);
        tick_update(game.jack_tick_cool, game.jack_tick_max, "jack_ticks", 0);

        let s = Math.floor(Math.random()*game.jack_card_inv.length);
        let pull = game.jack_card_inv[s];
        game.jack_card_inv.splice(s,1);
        if (pull === "J" || pull === "Q" || pull === "K") {
            game.jack_hand_value += 10;
        } else if (pull === "A") {
            // do some bullshit here
            game.jack_ace_count++;
            if (game.jack_ace_count <= 1) {
                game.jack_hand_value += 11;
            } else {
                game.jack_hand_value += 1;
            }
        } else {
            game.jack_hand_value += pull;
        }
        game.jack_hand.push(pull);
        // adjust for aces
        if (game.jack_hand_value > 11 && game.jack_hand.includes("A") && game.jack_ace_adjust == 1) {
            game.jack_hand_value -= 10;
            game.jack_ace_adjust = 0;
        }
    }

    document.getElementById("jack_info").innerHTML =
    "blackjack: " + game.jack_hand + " with value of " + game.jack_hand_value;
    let result = game.jack_hand_value - 21;
    let payout = game.jack_base;
    let last_card = game.jack_hand[game.jack_hand.length -1];
    if (game.jack_hand_value >= 21) {
        if (result > 0) {
            payout /= (result + 9);
        }

        game.jack_card_inv = ["A", 2,3,4,5,6,7,8,9,10,"J","Q","K",
            "A", 2,3,4,5,6,7,8,9,10,"J","Q","K",
            "A", 2,3,4,5,6,7,8,9,10,"J","Q","K",
            "A", 2,3,4,5,6,7,8,9,10,"J","Q","K"];
        game.jack_hand = [];
        game.jack_ace_count = 0;
        game.jack_ace_adjust = 1;
        game.jack_hand_value = 0;
    } else {
        payout = 0;
    }
    payout *= jack_handle(last_card, game.jack_mode);
    payout *= game.multiplier;
    payout *= effect(2);
    payout *= effect(4);

    game.money += payout;
    money_update();
    document.getElementById("jack_sub_info").innerHTML =
    "payout: " + standard_notation((Math.round(payout * 100) / 100).toFixed(2), "short") + " money";

}

function jack_handle(card, mode) {
    let jack_mult = 1;
    if (mode == 1) {
        if (card === "A") {
            jack_mult *= 20
            jack_mult *= effect(3);
        }
    } else if (mode == 2) {
        if (card >= 2 && card <= 10) {
            jack_mult *= 2
            jack_mult *= effect(3);
        }
    } else if (mode == 3) {
        if (card === "J" || card === "Q" || card === "K") {
            jack_mult *= 5;
            jack_mult *= effect(3);
        }
    }
    return jack_mult;
}

function slot_machine() {
    if (game.money > 3 * (10 ** 11) && !game.slot_unlock) {
        game.money -= 3 * (10 ** 11);
        game.slot_unlock = true;
        document.getElementById("slot_text").style.visibility = "visible";
        document.getElementById("slots_auto").style.visibility = "visible";
        document.getElementById("slots_upgrade").style.visibility = "visible";
        document.getElementById("slots_spin").innerHTML =
         "<br>spin slot machine<br><br>";
    }
    if (game.slot_unlock) {
        document.getElementById("slot_text").style.visibility = "visible";
        document.getElementById("slots_auto").style.visibility = "visible";
        document.getElementById("slots_upgrade").style.visibility = "visible";
        document.getElementById("slots_spin").innerHTML =
         "<br>spin slot machine<br><br>";
    }

    if (game.slot_unlock && game.slot_tick_cool == 0) {
        game.slot_tick_cool = game.slot_tick_max;
        game.slot_spins++;
        tick_update(game.main_tick_cool, game.main_tick_max, "cooldown", 0);
        tick_update(game.slot_tick_cool, game.slot_tick_max, "slot_ticks", 0);
        // alright what the fuck is happening here
        let ring_a = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];
        let ring_b = [1,1,1,5,5,5,2,2,2,6,6,6,3,3,3,7,7,7,4,4,4];
        let ring_c = [1,1,1,7,7,7,6,6,6,5,5,5,4,4,4,3,3,3,2,2,2];
        let ring_list = [ring_a, ring_b, ring_c];
        let results = [];
        let lines = 0;
        game.slot_effect_timers = [0,0,0,0,0,0,0];
        game.slot_effect_hits = [0,0,0,0,0,0,0];
        effect_handle();


        for (g = 0; g < 3; g++) {
            let sub_results = [];
            let spin = Math.floor(Math.random()*21) + 21;
            let spin_up = (spin - 1) % 21;
            let spin_down =  (spin + 1) % 21;
            spin %= 21;
            // imprint the three spin variables onto rings and store that
            sub_results.push(ring_list[g][spin_up]);
            sub_results.push(ring_list[g][spin]);
            sub_results.push(ring_list[g][spin_down]);
            
            results.push(sub_results);
        }
        
        document.getElementById("slot_render").innerHTML =
         "  " + results[0][0] + " | " + results[1][0] + " | " + results[2][0] + "<br>" + 
         "  " + results[0][1] + " | " + results[1][1] + " | " + results[2][1] + "<br>" + 
         "  " + results[0][2] + " | " + results[1][2] + " | " + results[2][2];

        // im not dumb im just lazy
        if (results[0][0] == results[1][0] && results[1][0] == results[2][0]) {
            game.effects_list.push(results[0][0]);
            lines++;
        }
        if (results[0][1] == results[1][1] && results[1][1] == results[2][1]) {
            game.effects_list.push(results[0][1]);
            lines++;
        }
        if (results[0][2] == results[1][2] && results[1][2] == results[2][2]) {
            game.effects_list.push(results[0][2]);
            lines++;
        }
        if (results[0][0] == results[1][1] && results[1][1] == results[2][2]) {
            game.effects_list.push(results[0][0]);
            lines++;
        }
        if (results[0][2] == results[1][1] && results[1][1] == results[2][0]) {
            game.effects_list.push(results[0][2]);
            lines++;
        }
        slot_handle(game.effects_list);
        if (lines > 0) {
            game.effects = true;
            effect_handle();
        }
        game.effects_list = [];
    }
}

function slot_handle(feed) {
    let speedup_check = false
    for (let i = 0; i < feed.length; i++) {
        for (let j = 0; j < game.slot_effect_list.length; j++) {
            if (feed[i] == game.slot_effect_list[j]) {
                game.slot_effect_hits[j]++
                switch (game.slot_effect_list[j]) {
                    // 1 -> multi to roulette
                    // 2 -> multi to dice rolls
                    // 3 -> multi to blackjack
                    // 4 -> multi on all bets
                    // 5 -> multi to all machines
                    // 6 -> faster ticks
                    // minus one
                    case 1:
                    case 2:
                    case 3:
                        game.slot_effect_timers[j] = 21;
                        break;
                    case 4:
                    case 5:
                        game.slot_effect_timers[j] = 11;
                        break;
                    case 6:
                        if (!game.speedup) {
                            speedup_check = true;
                        }
                        break;
                    case 7:
                        // some freaky shit (divide costs)
                        if(!game.divided) {
                            game.divided = true
                            game.roul_count_real -= 6;
                            if (game.roul_count_real < 0) {
                                game.roul_count_real = 0;
                            }
                            roul_up_add();
                            game.dice_count_real -= 6;
                            if (game.dice_count_real < 0) {
                                game.dice_count_real = 0;
                            }
                            fvdc_up_add();
                            game.jack_count_real -= 6;
                            if (game.jack_count_real < 0) {
                                game.jack_count_real = 0;
                            }
                            jack_up_add();
                            game.slot_count_real -= 6;
                            if (game.slot_count_real < 0) {
                                game.slot_count_real = 0;
                            }
                            slot_up_add();
                        }
                }
            // there's something deathly wrong here
            }
        }
    }
    if (speedup_check) {
        game.slot_effect_timers[5] = 41;
        game.speedup = true;
        speedup_check = false;
        game.main_tick_max -= game.slot_effect_hits[5] * 300;
        game.main_tick_cool = game.main_tick_max;
        game.roul_tick_max -= game.slot_effect_hits[5] * 300;
        game.roul_tick_cool = game.roul_tick_max;
        game.fvdc_tick_max -= game.slot_effect_hits[5] * 300;
        game.fvdc_tick_cool = game.fvdc_tick_max;
        game.jack_tick_max -= game.slot_effect_hits[5] * 300;
        game.jack_tick_cool = game.jack_tick_max;
        game.slot_tick_max -= game.slot_effect_hits[5] * 300;
        game.slot_tick_cool = game.slot_tick_max;
    }
    
}