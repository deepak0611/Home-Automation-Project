// function to display "set_time_schedule" class on button click
function display_sti(id){
    document.getElementsByClassName("schedule_time_input")[id-1].style.display="block";
}
//check toggler
function toggledBy(state,id_no){
    var onoff;
    if(state==1){onoff="ON";}
    else{onoff="OFF"}
    if(document.getElementsByClassName("gac_value")[id_no-1].textContent=="bc"){
        document.getElementsByClassName("gac_notifier")[id_no-1].innerHTML= "Switch "+(id_no).toString() + " turned " + onoff +" from browser";
    }
    else if(document.getElementsByClassName("gac_value")[id_no-1].textContent=="sc"){
        document.getElementsByClassName("gac_notifier")[id_no-1].innerHTML= "Switch "+(id_no).toString() + " turned " + onoff +" according to schedule";
    }
    else{
        document.getElementsByClassName("gac_notifier")[id_no-1].innerHTML= "Switch "+(id_no).toString() + " turned " + onoff +" by google assisstant";
    }
}








// Toggle on/off state of a pin
function change_state(id_no,pin_no,to_state,interrupt) {
   console.log("change_state");
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if(to_state==1){
            document.getElementsByClassName("switch_off")[id_no-1].style.display="none";
            document.getElementsByClassName("switch_on")[id_no-1].style.display="block";
            document.getElementsByClassName("switch_box")[id_no-1].style.borderLeftColor="blue";

        }
        else{
            document.getElementsByClassName("switch_on")[id_no-1].style.display="none";
            document.getElementsByClassName("switch_off")[id_no-1].style.display="block";
            document.getElementsByClassName("switch_box")[id_no-1].style.borderLeftColor="green";
        }

        //change toggler
        var onoff;
        if(to_state==1){onoff="ON";}
        else{onoff="OFF"}
        if(interrupt==1){
            document.getElementsByClassName("gac_value")[id_no-1].innerHTML= "bc";
            document.getElementsByClassName("gac_notifier")[id_no-1].innerHTML= "Switch "+(id_no).toString() + " turned " + onoff +" from browser";
        }
        else{
            document.getElementsByClassName("gac_value")[id_no-1].innerHTML= "sc";
            document.getElementsByClassName("gac_notifier")[id_no-1].innerHTML= "Switch "+(id_no).toString() + " turned " + onoff +" according to schedule";
        }


    }
  };
  xhttp.open("GET", "change_state/"+pin_no+"/"+interrupt+"/"+to_state, true);
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
        document.getElementsByClassName("interrupt_alerter")[id_no-1].style.display="none";

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
        document.getElementsByClassName("interrupt_alerter")[id_no-1].style.display="none";
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
//            document.getElementById("gac_notifier").innerHTML+= "<br>I am not getting correctly";


            if((myjson.toggler) == "gac"){
                document.getElementsByClassName("gac_value")[i].innerHTML= (myjson.toggler) ;
                var onoff;
                if(myjson.state==1){onoff="ON";}
                else{onoff="OFF"}
                document.getElementsByClassName("gac_notifier")[i].innerHTML= "Switch "+(i+1).toString() + " turned " + onoff +" by google assisstant";
            }
//            else{
//                document.getElementsByClassName("gac_notifier")[i].innerHTML= "";
//            }




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
                    console.log("inside schedule time");
                    if(myjson.interrupt==1){
                        document.getElementsByClassName("interrupt_alerter")[i].style.display="block";
                    }
                    else{
                        document.getElementsByClassName("interrupt_alerter")[i].style.display="none";
                        if(myjson.state==0){
                            console.log("change_State from sh");
                            change_state(i+1,myjson.pin_no,1,0);
                        }
                        if(h==myjson.end_hr && m==myjson.end_min && s==59){
//                            if(myjson.state==1){
                                console.log("change_State from eh");
                                change_state(i+1,myjson.pin_no,0,0);
//                            }
                        }
                    }
                }
                else{
                //This code is working fine -> outside schedule time everything is fine
                    console.log("outside schedule time");
                    document.getElementsByClassName("interrupt_alerter")[i].style.display="none";
                    if(myjson.interrupt==1){
                        console.log("I am here to handle interrupt");
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





function for_hardware(){
    var myvar2=setInterval(hardware_checker, 1000);
}

function hardware_checker(){
    var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(document.getElementById("hardware_status").textContent == this.responseText){
                document.getElementById("hardware_connection").innerHTML="Hardware not connected";
                document.getElementById("hardware_connection").style.backgroundColor="red";
            }
            else{
                document.getElementById("hardware_connection").innerHTML="Hardware connected";
                document.getElementById("hardware_connection").style.backgroundColor="green";
                document.getElementById("hardware_status").innerHTML = this.responseText;
            }
        }
      };
      xhttp.open("GET", "hardware_status/", true);
      xhttp.send();
}


function pin_name_editor(id_no){
    document.getElementsByClassName("pin_name")[id_no-1].style.display="none";
    document.getElementsByClassName("edit_pin_name")[id_no-1].style.display="none";
    document.getElementsByClassName("pin_name_input")[id_no-1].style.display="inline";
    document.getElementsByClassName("submit_pin_name")[id_no-1].style.display="inline";
}

function pin_name_submitter(id_no){
    var new_name= document.getElementsByClassName("pin_name_input")[id_no-1].value;
    document.getElementsByClassName("pin_name_input")[id_no-1].style.display="none";
    document.getElementsByClassName("submit_pin_name")[id_no-1].style.display="none";

    document.getElementsByClassName("pin_name")[id_no-1].innerHTML= new_name;
    document.getElementsByClassName("pin_name")[id_no-1].style.display="inline-block";
    document.getElementsByClassName("edit_pin_name")[id_no-1].style.display="inline";

      var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        }
      };
      xhttp.open("GET", "change_pin_name/"+id_no+"/"+new_name, true);
      xhttp.send();

}