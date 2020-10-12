function display_sti(id){
    document.getElementsByClassName("schedule_time_input")[id-1].style.display="block";
}

function change_state(id_no,pin_no,flag,interrupt) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if(flag){
            document.getElementsByClassName("switch_on")[id_no-1].style.display="none";
            document.getElementsByClassName("switch_off")[id_no-1].style.display="block";
        }
        else{
            document.getElementsByClassName("switch_off")[id_no-1].style.display="none";
            document.getElementsByClassName("switch_on")[id_no-1].style.display="block";
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

  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var obj=JSON.parse(this.responseText);
        var i=0;
        for(i=0;i<4;i++){
            var myjson=obj[i];
            if(myjson.schedule_status){
//                console.log("Schedule on");
//                console.log(!myjson.interrupt);
                if(!myjson.interrupt){

                    if(!myjson.state && ((myjson.start_hr==myjson.end_hr && h==myjson.start_hr && m>=myjson.start_min && m<=myjson.end_min)||
                    (h>=myjson.start_hr && h<=myjson.end_hr && ( (h==myjson.start_hr && m>=myjson.start_min) || (h==myjson.end_hr && m<=myjson.end_min)
                    || (h!=myjson.start_hr && h!=myjson.end_hr) ))
                    )
                    ){
//                        console.log("inside here");
                        change_state(i+1,myjson.pin_no,0,0);
                    }
                    else if( myjson.state && ((myjson.start_hr==myjson.end_hr && h==myjson.start_hr &&( m<myjson.start_min || m>myjson.end_min ) )||
                    ((h<=myjson.start_hr || h>=myjson.end_hr) && ( (h==myjson.start_hr && m < myjson.start_min) || (h==myjson.end_hr && m > myjson.end_min)
                    || (h!=myjson.start_hr && h!=myjson.end_hr) ))
                    )
                    ){
//                         console.log("inside out");
                         change_state(i+1,myjson.pin_no,1,0);
                    }

                    document.getElementsByClassName("interrupt_alerter")[i].style.display="none";
                }
                else{
                    document.getElementsByClassName("interrupt_alerter")[i].style.display="block";
                }

                if( ((myjson.start_hr==myjson.end_hr && h==myjson.start_hr &&( m<myjson.start_min || m>myjson.end_min ) )||
                ((h<=myjson.start_hr || h>=myjson.end_hr) && ( (h==myjson.start_hr && m < myjson.start_min) || (h==myjson.end_hr && m > myjson.end_min)
                || (h!=myjson.start_hr && h!=myjson.end_hr) ))
                )
                ){

                     document.getElementsByClassName("interrupt_alerter")[i].style.display="none";
//                     console.log("interrupt back to normal");
                     interrupt_handler(myjson.pin_no);
                }
            }
            dynamic_state_change(myjson.id,myjson.pin_no,myjson.state);
        }
    }
  };
  xhttp.open("GET", "pin_state/", true);
  xhttp.send();
}

function dynamic_state_change(id_no,pin_no,flag) {
    if(!flag){
        document.getElementsByClassName("switch_on")[id_no-1].style.display="none";
        document.getElementsByClassName("switch_off")[id_no-1].style.display="block";
    }
    else{
        document.getElementsByClassName("switch_off")[id_no-1].style.display="none";
        document.getElementsByClassName("switch_on")[id_no-1].style.display="block";
    }
}


function interrupt_handler(pin_no){

    var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
//            console.log(this.responseText);
        }
      };
      xhttp.open("GET", "interrupt_handler/"+pin_no, true);
      xhttp.send();


}
