function display_sti(id){
    document.getElementsByClassName("schedule_time_input")[id-1].style.display="block";
}

function change_state(id_no,pin_no,flag) {
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
  xhttp.open("GET", "change_state/"+pin_no, true);
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