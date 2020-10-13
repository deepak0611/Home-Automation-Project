// function to display "set_time_schedule" class on button click
function display_sti(id){
    document.getElementsByClassName("schedule_time_input")[id-1].style.display="block";
}
// Toggle on/off state of a pin
function change_state(id_no,pin_no,flag,interrupt) {
   console.log("change_state");
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if(flag){
            document.getElementsByClassName("switch_on")[id_no-1].style.display="none";
            document.getElementsByClassName("switch_off")[id_no-1].style.display="block";
//            document.getElementsByClassName("switch_box")[id_no-1].style.boxShadow="none";
            document.getElementsByClassName("switch_box")[id_no-1].style.borderLeftColor="green";
        }
        else{
            document.getElementsByClassName("switch_off")[id_no-1].style.display="none";
            document.getElementsByClassName("switch_on")[id_no-1].style.display="block";
//            document.getElementsByClassName("switch_box")[id_no-1].style.boxShadow="5px 5px 10px Orange";
            document.getElementsByClassName("switch_box")[id_no-1].style.borderLeftColor="blue";
        }
    }
  };
  xhttp.open("GET", "change_state/"+pin_no+"/"+interrupt, true);
  xhttp.send();
}

function show_switch_on(id_no){
    document.getElementsByClassName("switch_on")[id_no-1].style.display="block";
}

function show_switch_off(id_no){
    document.getElementsByClassName("switch_off")[id_no-1].style.display="block";
}

function show_schedule_on(id_no){
    document.getElementsByClassName("schedule_on")[id_no-1].style.display="block";
}

function show_schedule_off(id_no){
    document.getElementsByClassName("schedule_off")[id_no-1].style.display="block";
}
// To set schedule time on the sever through ajax call
function set_schedule_time(pin_no,id_no){
    sh=document.getElementsByClassName("sh")[id_no-1].value;
    sm=document.getElementsByClassName("sm")[id_no-1].value;
    eh=document.getElementsByClassName("eh")[id_no-1].value;
    em=document.getElementsByClassName("em")[id_no-1].value;
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementsByClassName("schedule_off")[id_no-1].style.display="none";
        document.getElementsByClassName("schedule_on")[id_no-1].style.display="block";
        document.getElementsByClassName("schedule_time_input")[id_no-1].style.display="none";

        document.getElementsByClassName("sh_s")[id_no-1].innerHTML=sh;
        document.getElementsByClassName("sm_s")[id_no-1].innerHTML=sm;
        document.getElementsByClassName("eh_s")[id_no-1].innerHTML=eh;
        document.getElementsByClassName("em_s")[id_no-1].innerHTML=em;
    }
  };
  xhttp.open("GET", "set_schedule_time/"+pin_no+"/"+sh+"/"+sm+"/"+eh+"/"+em, true);
  xhttp.send();
}
// To remove schedule feature from a pin
function remove_schedule_time(id_no,pin_no){
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementsByClassName("schedule_off")[id_no-1].style.display="block";
        document.getElementsByClassName("schedule_on")[id_no-1].style.display="none";
        document.getElementsByClassName("schedule_time_input")[id_no-1].style.display="none";
    }
  };
  xhttp.open("GET", "remove_schedule_time/"+pin_no, true);
  xhttp.send();
}


function check_state(){
    deepak();
    var myvar=setInterval(deepak, 1000);
}

function deepak(){
    var d = new Date();
    var n = d.toLocaleTimeString();
    document.getElementById("show_time").innerHTML=n;
    var h= d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
        var obj=JSON.parse(this.responseText);
        var i=0;
        for(i=0;i<4;i++){
            var myjson=obj[i];

            if(myjson.schedule_status){
                  var f=0;
                console.log(myjson.interrupt);

                if(myjson.start_hr < myjson.end_hr){
                    if(h==myjson.start_hr && m >= myjson.start_min){f=1;}
                    else if(h==myjson.end_hr && m <= myjson.end_min){f=1;}
                    else if(h > myjson.start_hr && h < myjson.end_hr){f=1;}
                }
                else if(myjson.start_hr > myjson.end_hr){
                    if(h==myjson.start_hr && m >= myjson.start_min){f=1;}
                    else if(h==myjson.end_hr && m <= myjson.end_min){f=1;}
                    else if( ( h > myjson.end_hr && h < myjson.start_hr)==0 ){f=1;}
                }
                else if(myjson.start_hr == myjson.end_hr){
                    if(myjson.start_min <= myjson.end_min){
                        if(h==myjson.start_hr && m >= myjson.start_min && m <= myjson.end_min){f=1;}
                    }
                    else{
                        if( (h==myjson.start_hr && m > myjson.end_min && m < myjson.start_min)==0 ){f=1;}
                    }
                }


                if(f==1){

                    if(myjson.interrupt==1){
                        document.getElementsByClassName("interrupt_alerter")[i].style.display="block";
                    }
                    else{
                        if(myjson.state==0){
                            change_state(i+1,myjson.pin_no,0,0);
                        }
                        else if(h==myjson.end_hr && m==myjson.end_min && s==59){
                            if(myjson.state==1){
                                change_state(i+1,myjson.pin_no,1,0);
                            }
                        }
                    }
                }
                else{
                    document.getElementsByClassName("interrupt_alerter")[i].style.display="none";
                    if(myjson.interrupt==1){
                        interrupt_handler(myjson.pin_no,myjson.id );
                    }

                }

            }
            dynamic_state_change(myjson.id,myjson.state);
        }
    }
  };
  xhttp.open("GET", "pin_state/", true);
  xhttp.send();
}


// dynamically check for state_of_pin for each pin and respond the same on webpage
function dynamic_state_change(id_no , state_of_pin) {
    if(state_of_pin){
        document.getElementsByClassName("switch_off")[id_no-1].style.display="none";
        document.getElementsByClassName("switch_on")[id_no-1].style.display="block";
        document.getElementsByClassName("switch_box")[id_no-1].style.borderLeftColor="blue";
    }
    else{
        document.getElementsByClassName("switch_on")[id_no-1].style.display="none";
        document.getElementsByClassName("switch_off")[id_no-1].style.display="block";
        document.getElementsByClassName("switch_box")[id_no-1].style.borderLeftColor="green";
    }
}

// it will change the interrupt to 0, that means there is no user interrupt in between scheduled time
function interrupt_handler(pin_no,id){
    var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByClassName("interrupt_alerter")[id-1].style.display="none";
        }
      };
      xhttp.open("GET", "interrupt_handler/"+pin_no, true);
      xhttp.send();
}
