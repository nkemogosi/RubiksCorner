//Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//You can use CoffeeScript in this file: http://coffeescript.org/
//x = event.which || event.keyCode;
$(document).ready(function() {
    var running = false,
        stopped = true;
    var pastTime = $.now();
    var millsecs = 0,
        secs = 0,
        mins = 0,
        h1 = $("#timeVal"),
        delBtn = $(".delBtn"),
        t, dnfBtn = $(".dnfBtn"),
        plus2Btn = $(".plus2Btn"),
        saveBtn = $(".saveBtn");
    hideBtns();
    $(document).keypress(function(e) {

        if (e.keyCode == 32) {
            let currentTime = $.now();
            if (stopped && !running) {
                pastTime = currentTime;
            } else if (running) {
                clearTimeout(t);
                running = false;
                stopped = false;
                showBtns();
            }
        }
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 32) {
            let currentTime = $.now();
            if (currentTime - pastTime >= 100 && stopped && !running) {
                running = true;
                stopwatch();
            }

        }
    });

    function stopwatch() {
        t = setTimeout(add, 10);
    }

    function add() {
        millsecs++;
        if (millsecs >= 100) {
            millsecs = 0;
            secs++;
            if (secs >= 60) {
                secs = 0;
                mins++;
            }
        }
        let str = (mins ? (mins > 9 ? mins : "0" + mins) : "00") + ":" + (secs ? (secs > 9 ? secs : "0" + secs) : "00") + ":" + (millsecs > 9 ? millsecs : "0" + millsecs);
        h1.html(str);
        stopwatch();
    }

    function resetClock() {
        location.reload();
        hideBtns();
    }

    function hideBtns() {
        delBtn.hide();
        plus2Btn.hide();
        dnfBtn.hide();
        saveBtn.hide();

    }

    function showBtns() {
        delBtn.show();
        plus2Btn.show();
        dnfBtn.show();
        saveBtn.show();
    }

    function save(dnf = false, plus2 = 0) {
        if (plus2 == 2) {

        }
        if (dnf) {

        }
        resetClock();
    }
    delBtn.click(resetClock);
    saveBtn.click(save);
    dnfBtn.click(resetClock);
    plus2Btn.click(resetClock);


});
