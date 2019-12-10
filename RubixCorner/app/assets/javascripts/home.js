//Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//You can use CoffeeScript in this file: http://coffeescript.org/
//x = event.which || event.keyCode;
$(document).ready(function() {
 $("#settingsButton").hover(function(){
   $(this).toggleClass('fa-spin')
 });
  var keyDown = false,
      dnf = false,
      plus2 = false,
      timeDelay=501,
      stopped=false,
      pastTime=0,
      millisecs=0,secs=0,mins=0,
      h1 = $("#timeVal"),
      delBtn = $(".delBtn"),
      t, dnfBtn = $(".dnfBtn"),
      plus2Btn = $(".plus2Btn"),
      saveBtn = $(".saveBtn")
      autostart=0;
      hideBtns();
  $(document).keypress(function(e) {
      if(keyDown){
        return;
      }
    if(e.keyCode ===32){
      pastTime=$.now();
      keyDown=true;
      setTimeout(changeColour,timeDelay);
    }
  });
  $(document).keyup(function(e) {
      if (e.keyCode === 32) {
          keyDown=false;
          $("body").css("background-color","#D8D4D4");
          if($.now()-pastTime>=timeDelay){
            if((millisecs+secs+mins)>0){
              save();
            }
            if(autostart==0){
              startStopwatch();
            }else{

            }

          }else{
            clearTimeout(t);
            stopped=true;
            showBtns();
            save();
          }
      }
  });
  function startStopwatch(){
   t = setTimeout(add,10)
  }
  function add() {
        millisecs++;
        if (millisecs >= 100) {
            millisecs = 0;
            secs++;
            if (secs >= 60) {
                secs = 0;
                mins++;
            }
        }
        let str = (mins ? (mins > 9 ? mins : "0" + mins) : "00") + ":" + (secs ? (secs > 9 ? secs : "0" + secs) : "00") + ":" + (millisecs > 9 ? millisecs : "0" + millisecs);

        h1.html(str);
        startStopwatch();
    }
  function changeColour(){
    if(keyDown&&$.now()-pastTime>=timeDelay){
      $("body").css("background-color","#00ff00");
    }
  }
  function resetClock() {
      millisecs = 0;
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
  function showBtns() {
      delBtn.show();
      plus2Btn.show();
      dnfBtn.show();
      saveBtn.show();
  }
  function hideBtns() {
      delBtn.hide();
      plus2Btn.hide();
      dnfBtn.hide();
      saveBtn.hide();
  }
  function save() {
        if (plus2) {
          secs+=2;
        }
        if (dnf) {

        }
      //  if(readCookie("user_signed_in")!=null){
         alert("test");
          $.ajax({
            url: "/r_times.json",
            type: "POST",
            data: {"id":1,"minutes":mins,"seconds":secs,"millisecs":millisecs,"dnf":dnf,"plus2":plus2},
            success: function(data) {
              console.log(data);
            }
          });
      //  }else{

      //  }

        resetClock();
    }
    function updatePuzzle(){
      var size = document.getElementById('puzzleSize').value;
      var puzzle = document.getElementById('puzzle').value;
      var test ="";
      console.log(test);
      alert(test);
      switch(puzzle){
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        case 8:
          break;
        case 9:
          break;

      }
    }
    function readCookie(name) {
      var cookieName = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(cookieName) == 0) return c.substring(cookieName.length,c.length);
      }
      return null;
  }
});
