//Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//You can use CoffeeScript in this file: http://coffeescript.org/
//x = event.which || event.keyCode;
$(document).ready(function() {
  function convertToValue(min,sec,mill){
    return min*600+sec*100+mill;  //converting min sec and mill u=into a useful value to calculate with
  }
  if(readCookie("user_signed_in")!=null){ //Check if user has been signed in
    $.ajax({ // Calling an ajax get request to get all of the times for the user that is currently logged in
      url: "/r_times",
      type: "GET",
      data: {},
      success: function(data) {
        data.forEach(function(item,index){ // Looping through the list of JSON objects and adding the values to the table
          let value = convertToValue(parseInt(item.minutes,10),parseInt(item.seconds,10),parseInt(item.millisecs,10));
          addToTable(value,item.datetime);
              calculateStats();
        });


      },
      error: function(jqXHR, exception) {
        alert(exception+"y");
      }

    });
  }
 $("#settingsButton").hover(function(){
   $(this).toggleClass('fa-spin')
 });
  var keyDown = false,
      dnf = false,
      plus2 = false,
      timeDelay=501,
      stopped=true,
      pastTime=0,
      millisecs=0,secs=0,mins=0,
      h1 = $("#timeVal"),
      delBtn = $(".delBtn"),
      t, dnfBtn = $(".dnfBtn"),
      plus2Btn = $(".plus2Btn"),
      autostart=0,
      displayTime = true;
  $(document).keypress(function(e) {
      if(keyDown){// Ensures no double presses to reset the stopwatch
        return;
      }
    if(e.keyCode ===32){
      pastTime=$.now();
      keyDown=true;
      setTimeout(changeColour,timeDelay); // Set a time delay
    }
  });
  $(document).keyup(function(e) {
      if (e.keyCode === 32) {
          keyDown=false;
          $("body").css("background-color","#D8D4D4");
          if($.now()-pastTime>=timeDelay){
            h1.html("00:00:00");
            if(autostart==0){
              stopped = false;
              startStopwatch();
            }else{

            }

          }else{// Stop the stopwatch and save to the database if user is signed in
            if(!stopped){
              clearTimeout(t);
              stopped=true;
              save();
            }
          }
      }
  });
  function startStopwatch(){
   t = setTimeout(add,10) // Calls the add method to counted the elapsed time
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
        //Using ternary operators to format the numbers to 00:00:00 format
        if(displayTime){
        let str = (mins ? (mins > 9 ? mins : "0" + mins) : "00") + ":" + (secs ? (secs > 9 ? secs : "0" + secs) : "00") + ":" + (millisecs > 9 ? millisecs : "0" + millisecs);
        h1.html(str); // Display time
      }else{
        h1.html(""); //Dont display
      }
        startStopwatch(); // Continue stopwatch
    }
  function changeColour(){
    if(keyDown&&$.now()-pastTime>=timeDelay){
      $("body").css("background-color","#00ff00");
    }
  }
  function resetClock() { //Reset all the appropriate variables
      millisecs = 0;
      secs  = 0;
      mins=0;
      stopped = true;
      keyDown = false;
      updatePuzzle();
  }
  function save() {
        if(readCookie("user_signed_in")!=null){
          $.ajax({
            url: "/r_times",
            type: "POST",
            data: {"minutes":mins,"seconds":secs,"millisecs":millisecs,"dnf":dnf,"plus2":plus2},
            success: function(data) {
              console.log(data);
            },
            error: function(jqXHR, exception) {
              alert(exception);
            }

          });
        }
        addToTable(convertToValue(mins,secs,millisecs));
        calculateStats();
        resetClock();
    }
  function addToTable(value, datetime=false){ //Prepending a new row to the times table
    let newRow = ""
    if(($.type(datetime) === "boolean")){ // If data has been retrieved from the previous ajax call
      datetime=new Date();
      newRow ="<tr data-value=\""+value+"\"><td>"+convertToTime(value)+"</td><td>"+datetime.getFullYear()+"-"+datetime.getMonth()+"-"+datetime.getDay()+"</td></tr>"
    }else{
      newRow ="<tr data-value=\""+value+"\"><td>"+convertToTime(value)+"</td><td>"+datetime+"</td></tr>"
    }
    $("#timeTableBody").prepend(newRow);
  }
  function updatePuzzle(){ // call the create_scramble action to generate new scramble
    var size = document.getElementById('puzzleSize').value;
    var puzzle = document.getElementById('puzzle').value;
    $.ajax({ // post an ajax request to get the scramble
      url: "/create_scramble",
      type: "POST",
      data: {"puzzleSize":size,"puzzle":puzzle},
      success: function(data) {
        $("#puzzleScramble").html(data.value);
      },
      error: function(jqXHR, exception) {
        alert(exception);
      }

    });

    }
    function readCookie(name) { // Read cookie
      var cookieName = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(cookieName) == 0) return c.substring(cookieName.length,c.length);
      }
      return null;
  }
  function convertToTime(time){ // Convert signle value into its string representation
    var mins=0,secs=0,mills=0;
    mins=Math.floor(time/600);
    time=time-(mins*600);
    secs=Math.floor(time/100);
    time=time-(secs*100);
    mills= Math.floor(time);
    return (mins ? (mins > 9 ? mins : "0" + mins) : "00") + ":" + (secs ? (secs > 9 ? secs : "0" + secs) : "00") + ":" + (mills > 9 ? mills : "0" + mills);
  }
  function calculateStats(){ //calculate stats of the score
    let arrTimes = [];
    //Getting each table row and extracting the data value attribute
    $("#timeTableBody > tr").each(function(index,tr){
    let data =$(tr).data("value");
    arrTimes.push(parseInt(data));
    });
    //The destructuring assignment syntax is a JavaScript expression that makes it possible to extract data from arrays or objects into distinct variables
    let best = Math.min(...arrTimes);
    let worst = Math.max(...arrTimes);
    let avg = (arrTimes.reduce((previous, current) => current += previous))/arrTimes.length; //Does a sum reduction on the array
    $("#statBest").html(convertToTime(best));
    $("#statWorst").html(convertToTime(worst));
    $("#statAvg").html(convertToTime(avg));
    if(arrTimes.length>4){ //  Do the calculations for the last 5 values
      let last5Arr= arrTimes.slice(0,4);
      let last5Avg = (last5Arr.reduce((previous, current) => current += previous))/last5Arr.length;
      let best3_5 = Math.min(...last5Arr);
      let worst3_5 = Math.max(...last5Arr);
      let last3_5Avg =(last5Arr.reduce((previous, current) => current += previous))-(best3_5-worst3_5)/last5Arr.length;
      $("#statAvgLast5").html(convertToTime(last3_5Avg));
      $("#statLast3of5").html(convertToTime(last3_5Avg));
    }
    //Find median
    arrTimes.sort((a, b) => a - b);
    let lowMiddle = Math.floor((arrTimes.length - 1) / 2);
    let highMiddle = Math.ceil((arrTimes.length - 1) / 2);
    let median = (arrTimes[lowMiddle] + arrTimes[highMiddle]) / 2;
    $("#statMedian").html(convertToTime(median));
  }
});
