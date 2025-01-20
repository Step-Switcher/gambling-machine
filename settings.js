// god i wish there was an easier way to do this
function roul_setting(mode, sub_mode_one, sub_mode_two) {
    if (mode == 1) {
        game.roul_mode = 1;
        document.getElementById("roul_mode_1").style.backgroundColor = "#3A0313";
        document.getElementById("roul_mode_2").style.backgroundColor = "#6A0636";
        document.getElementById("roul_mode_sub1").style.display = "block";
        document.getElementById("roul_mode_sub2").style.display = "none";
        if (sub_mode_one == 1) {
            game.roul_sub_1 = 1;
            document.getElementById("roul_a_a").style.backgroundColor = "#3A0313";
            document.getElementById("roul_a_b").style.backgroundColor = "#6A0636";
        } else if (sub_mode_one == 2) {
            game.roul_sub_1 = 0;
            document.getElementById("roul_a_b").style.backgroundColor = "#3A0313";
            document.getElementById("roul_a_a").style.backgroundColor = "#6A0636";
        } 
        if (sub_mode_two == 1) {
            game.roul_sub_2 = 18;
            document.getElementById("roul_b_a").style.backgroundColor = "#3A0313";
            document.getElementById("roul_b_b").style.backgroundColor = "#6A0636";
        } else if (sub_mode_two == 2) {
            game.roul_sub_2 = 36;
            document.getElementById("roul_b_b").style.backgroundColor = "#3A0313";
            document.getElementById("roul_b_a").style.backgroundColor = "#6A0636";
        }
        if (sub_mode_one == 3 && sub_mode_two == 0) {
            game.roul_sub_1 = 3;
            game.roul_sub_2 = 0;
            document.getElementById("roul_a_a").style.backgroundColor = "#6A0636";
            document.getElementById("roul_a_b").style.backgroundColor = "#6A0636";
            document.getElementById("roul_b_a").style.backgroundColor = "#6A0636";
            document.getElementById("roul_b_b").style.backgroundColor = "#6A0636";
        }
    } else if (mode == 2) {
        game.roul_mode = 2;
        document.getElementById("roul_mode_2").style.backgroundColor = "#3A0313";
        document.getElementById("roul_mode_1").style.backgroundColor = "#6A0636";
        document.getElementById("roul_mode_sub2").style.display = "block";
        document.getElementById("roul_mode_sub1").style.display = "none";
    } 
}

function five_dice_sett(mode) {
    if (mode != 0 /*&& game.dice_mode_ticks == 0*/) {
        //game.dice_mode_ticks = game.fvdc_mode_max;
        switch (mode) {
            case 1:
                game.dice_mode = 1;
                document.getElementById("fvdc_mode_two").style.backgroundColor = "#3A0313";
                document.getElementById("fvdc_mode_tutu").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_three").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_full").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_four").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_five").style.backgroundColor = "#6A0636";
                break;
            case 2:
                game.dice_mode = 2;
                document.getElementById("fvdc_mode_two").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_tutu").style.backgroundColor = "#3A0313";
                document.getElementById("fvdc_mode_three").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_full").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_four").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_five").style.backgroundColor = "#6A0636";
                break;
            case 3:
                game.dice_mode = 3;
                document.getElementById("fvdc_mode_two").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_tutu").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_three").style.backgroundColor = "#3A0313";
                document.getElementById("fvdc_mode_full").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_four").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_five").style.backgroundColor = "#6A0636";
                break;
            case 4:
                game.dice_mode = 4;
                document.getElementById("fvdc_mode_two").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_tutu").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_three").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_full").style.backgroundColor = "#3A0313";
                document.getElementById("fvdc_mode_four").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_five").style.backgroundColor = "#6A0636";
                break;
            case 5:
                game.dice_mode = 5;
                document.getElementById("fvdc_mode_two").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_tutu").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_three").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_full").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_four").style.backgroundColor = "#3A0313";
                document.getElementById("fvdc_mode_five").style.backgroundColor = "#6A0636";
                break;
            case 6:
                game.dice_mode = 6;
                document.getElementById("fvdc_mode_two").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_tutu").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_three").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_full").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_four").style.backgroundColor = "#6A0636";
                document.getElementById("fvdc_mode_five").style.backgroundColor = "#3A0313";
                break;
        }
    } else if (mode == 0) {
        game.dice_mode = 0;
        // game.dice_mode_ticks = 0;
        document.getElementById("fvdc_mode_two").style.backgroundColor = "#6A0636";
        document.getElementById("fvdc_mode_tutu").style.backgroundColor = "#6A0636";
        document.getElementById("fvdc_mode_three").style.backgroundColor = "#6A0636";
        document.getElementById("fvdc_mode_full").style.backgroundColor = "#6A0636";
        document.getElementById("fvdc_mode_four").style.backgroundColor = "#6A0636";
        document.getElementById("fvdc_mode_five").style.backgroundColor = "#6A0636";
    }
}

function jack_sett(mode) {
    game.jack_mode = mode;
    switch (mode) {
        case 0:
            document.getElementById("jack_mode_reset").style.backgroundColor = "#6A0636";
            document.getElementById("jack_mode_ace").style.backgroundColor = "#6A0636";
            document.getElementById("jack_mode_num").style.backgroundColor = "#6A0636";
            document.getElementById("jack_mode_face").style.backgroundColor = "#6A0636";
            break;
        case 1:
            document.getElementById("jack_mode_reset").style.backgroundColor = "#6A0636";
            document.getElementById("jack_mode_ace").style.backgroundColor = "#3A0313";
            document.getElementById("jack_mode_num").style.backgroundColor = "#6A0636";
            document.getElementById("jack_mode_face").style.backgroundColor = "#6A0636";
            break;
        case 2:
            document.getElementById("jack_mode_reset").style.backgroundColor = "#6A0636";
            document.getElementById("jack_mode_ace").style.backgroundColor = "#6A0636";
            document.getElementById("jack_mode_num").style.backgroundColor = "#3A0313";
            document.getElementById("jack_mode_face").style.backgroundColor = "#6A0636";
            break;
        case 3:
            document.getElementById("jack_mode_reset").style.backgroundColor = "#6A0636";
            document.getElementById("jack_mode_ace").style.backgroundColor = "#6A0636";
            document.getElementById("jack_mode_num").style.backgroundColor = "#6A0636";
            document.getElementById("jack_mode_face").style.backgroundColor = "#3A0313";
            break;
    }
}