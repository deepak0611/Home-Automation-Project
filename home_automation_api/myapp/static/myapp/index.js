

// function to display "set_time_schedule" class on button click
function display_sti(id,pin_no){
//    document.getElementsByClassName("schedule_time_input")[id-1].style.display="block";
    $('#schedule_set_pin').text(id);
    $('#schedule_set_actual_pin_no').text(pin_no);
//    $('#scheduleModal').modal('show');

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

            if(myjson.temp_sensitivity_status){
                var curr_temp = parseInt(document.getElementById("show_temp").textContent);
                var sensitive_action;
                if(myjson.sensitive_action==true){sensitive_action=1;}
                else{sensitive_action=0;}
                if(curr_temp > myjson.sensitive_temp){
                    if(myjson.state != myjson.sensitive_action){
                        change_state(i+1,myjson.pin_no,sensitive_action,0);
                    }
                }
                else{
                    if(sensitive_action==1){sensitive_action=0;}
                    else{sensitive_action=1;}
                    if(myjson.state == myjson.sensitive_action){
                        change_state(i+1,myjson.pin_no,sensitive_action,0);
                    }
                }
                dynamic_state_change(myjson.id,myjson.state);
                continue;
            }


            if((myjson.toggler) == "gac"){
                document.getElementsByClassName("gac_value")[i].innerHTML= (myjson.toggler) ;
                var onoff;
                if(myjson.state==1){onoff="ON";}
                else{onoff="OFF"}
                document.getElementsByClassName("gac_notifier")[i].innerHTML= "Switch "+(i+1).toString() + " turned " + onoff +" by google assisstant";
            }
            else if((myjson.toggler) == "bc"){
                document.getElementsByClassName("gac_value")[i].innerHTML= (myjson.toggler) ;
                var onoff;
                if(myjson.state==1){onoff="ON";}
                else{onoff="OFF"}
                document.getElementsByClassName("gac_notifier")[i].innerHTML= "Switch "+(i+1).toString() + " turned " + onoff +" from browser";
            }
            else if((myjson.toggler) == "sc"){
                document.getElementsByClassName("gac_value")[i].innerHTML= (myjson.toggler) ;
                var onoff;
                if(myjson.state==1){onoff="ON";}
                else{onoff="OFF"}
                document.getElementsByClassName("gac_notifier")[i].innerHTML= "Switch "+(i+1).toString() + " turned " + onoff +" according to schedule";
            }
//            else{
//                document.getElementsByClassName("gac_notifier")[i].innerHTML= "";
//            }




            if(myjson.schedule_status){


                var f=0;
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
//                    console.log("inside schedule time");
                    if(myjson.interrupt==1){
                        document.getElementsByClassName("interrupt_alerter")[i].style.display="block";
                    }
                    else{
                        document.getElementsByClassName("interrupt_alerter")[i].style.display="none";
                        if(myjson.state==0){
//                            console.log("change_State from sh");
                            change_state(i+1,myjson.pin_no,1,0);
                        }
                        if((h==myjson.end_hr && m==myjson.end_min) && s==59){
//                            if(myjson.state==1){
//                                console.log("change_State from eh");
                                change_state(i+1,myjson.pin_no,0,0);
//                            }
                        }
                    }
                }
                else{
                //This code is working fine -> outside schedule time everything is fine
//                    console.log("outside schedule time");
                    document.getElementsByClassName("interrupt_alerter")[i].style.display="none";
                    if(myjson.interrupt==1){
//                        console.log("I am here to handle interrupt");
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
    var myvar2=setInterval(hardware_checker, 3000);
}

function hardware_checker(){
    var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var str = this.responseText;
            var res = str.split(" ");
            if(parseInt(document.getElementById("hardware_status").textContent) == parseInt(res[0])){
                document.getElementById("hardware_connection").innerHTML="Hardware not connected";
                document.getElementById("hardware_connection").style.backgroundColor="red";
                document.getElementById("hardware_status").innerHTML = "0";
                hardware_reseter();
            }
            else{
                document.getElementById("hardware_connection").innerHTML="Hardware connected";
                document.getElementById("hardware_connection").style.backgroundColor="green";
                document.getElementById("hardware_status").innerHTML = res[0];
            }
            document.getElementById("show_temp").innerHTML = res[1];
            document.getElementById("show_humid").innerHTML = res[2];
        }
      };
      xhttp.open("GET", "../hardware_status/", true);
      xhttp.send();
}

function hardware_reseter(){
    var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        }
      };
      xhttp.open("GET", "../hardware_reseter/", true);
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

function show_temp_mode(id_no){
    document.getElementsByClassName("temp_mode_div")[id_no-1].style.display="block";
    document.getElementsByClassName("actual_switch")[id_no-1].style.display = "none";
}
function show_normal_mode(id_no){
    document.getElementsByClassName("normal_mode_div")[id_no-1].style.display="block";
    document.getElementsByClassName("actual_switch")[id_no-1].style.display = "block";
}

// To set schedule time on the sever through ajax call
function set_schedule_time(){
    var sh=document.getElementById("sh").value;
    var sm=document.getElementById("sm").value;
    var eh=document.getElementById("eh").value;
    var em=document.getElementById("em").value;
    var id_no=parseInt(document.getElementById("schedule_set_pin").textContent);
    var pin_no=parseInt(document.getElementById("schedule_set_actual_pin_no").textContent);

  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementsByClassName("schedule_off")[id_no-1].style.display="none";
        document.getElementsByClassName("schedule_on")[id_no-1].style.display="block";
//        document.getElementsByClassName("schedule_time_input")[id_no-1].style.display="none";
        document.getElementsByClassName("interrupt_alerter")[id_no-1].style.display="none";

        document.getElementsByClassName("sh_s")[id_no-1].innerHTML=sh;
        document.getElementsByClassName("sm_s")[id_no-1].innerHTML=sm;
        document.getElementsByClassName("eh_s")[id_no-1].innerHTML=eh;
        document.getElementsByClassName("em_s")[id_no-1].innerHTML=em;
        $('#scheduleModal').modal('hide');
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
//        document.getElementsByClassName("schedule_time_input")[id_no-1].style.display="none";
        document.getElementsByClassName("interrupt_alerter")[id_no-1].style.display="none";
    }
  };
  xhttp.open("GET", "remove_schedule_time/"+pin_no, true);
  xhttp.send();
}

function display_temp_modal(id,pin_no){
    document.getElementById("temp_set_pin").innerHTML =id;
    document.getElementById("temp_set_actual_pin_no").innerHTML =pin_no;
}

function temp_range_data_shower(){
    document.getElementById("temp_set_info").innerHTML = document.getElementById("temp_range").value +"&#8451"  ;
}

function activate_temp_sensitivity(){
  var id = parseInt(document.getElementById("temp_set_pin").textContent);
  var pin_no = parseInt(document.getElementById("temp_set_actual_pin_no").textContent);
  var temp = parseInt(document.getElementById("temp_range").value);
  var ele = document.getElementsByName("temp_action");
  var kk,cmd;
  for(kk=0;kk<ele.length;kk++){
    if(ele[kk].checked){cmd=ele[kk].value;}
  }
  var onoff;
  if(cmd==1){onoff="ON";}
  else{onoff="OFF"}
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementsByClassName("normal_mode_div")[id-1].style.display = "none";
        document.getElementsByClassName("temp_mode_div")[id-1].style.display = "block";
        document.getElementsByClassName("actual_switch")[id-1].style.display = "none";
        document.getElementsByClassName("sensitive_action_span")[id-1].innerHTML = onoff;
        document.getElementsByClassName("sensitive_temp_span")[id-1].innerHTML = temp;
        $('#tempModal').modal('hide');
    }
  };
  xhttp.open("GET", "activate_temp_sensitivity/"+pin_no+"/"+temp+"/"+cmd, true);
  xhttp.send();

}
function remove_temp_sensitivity(id,pin_no){
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementsByClassName("temp_mode_div")[id-1].style.display = "none";
        document.getElementsByClassName("normal_mode_div")[id-1].style.display = "block";
        document.getElementsByClassName("actual_switch")[id-1].style.display = "block";
    }
  };
  xhttp.open("GET", "remove_temp_sensitivity/"+pin_no, true);
  xhttp.send();

}


//function temp_rise_remaider_modal(){
//    $('#remainderModal').modal('show');
//}
//function set_remainder(){
//
//}