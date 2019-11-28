//Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//You can use CoffeeScript in this file: http://coffeescript.org/
//x = event.which || event.keyCode;
$(document).ready(function() {
    var running = false,
        stopped = true,
        keyDown = false,
        dnf = false,
        plus2 = false;

    var pastTime = $.now();
    var currentTime = $.now();
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
        if(keyDown){
          return;
        }
        if (e.keyCode === 32) {
          setTimeout(changeColor,100);
          keyDown=true;
          if(stopped&&!running){
            if((mins+secs+millsecs)!=0){
              save();
            }
            startTimer();
            stopped=false;
          }else if(!stopped&&running){
              startTimer();
          }
        }
    });
    function startTimer(){
      let currentTime = $.now();
      if (!running) {
          pastTime = currentTime;
      } else if (running) {
          running = false;
          stopped = true;
          showBtns();
          clearTimeout(t);
      }
    }
    $(document).keyup(function(e) {
        if (e.keyCode === 32) {
            keyDown=false;
            let currentTime = $.now();

            if (currentTime - pastTime >= 1000  && !running&&!stopped) {
                running = true;
                stopwatch();
            }

        }
    });
    function changeColor(){
      if(){

      }
      $("body").css("background-color","green");
    }
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
        millsecs = 0;
        secs  = 0;
        mins=0;
        h1.html("00:00:00");
        running = false;
        stopped = true;
        keyDown = false;
        if(delBtn.is(":visible")){
          hideBtns();
        }

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

    function save() {
        if (plus) {
          secs+=2;
        }
        if (dnf) {

        }
        resetClock();
    }
    delBtn.click(resetClock);
    saveBtn.click(save);
  //  dnfBtn.click(resetClock);
    plus2Btn.click(resetClock);


});
