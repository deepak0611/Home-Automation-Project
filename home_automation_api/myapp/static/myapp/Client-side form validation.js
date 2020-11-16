 function showinstruction(){
    document.getElementsByClassName('pchecker')[0].style.display="block";
  }

var arr=[0,0,0,0,0];   
function passcheckerfunc(){
  arr=[0,0,0,0,0];  
  var p=document.getElementById('password1').value;
  var i;
  var punc="@%$^&!#*";

  for(i=0;i<p.length;i++){
    if(p[i]>='A' && p[i]<='Z')arr[0]=1;
    if(p[i]>='a' && p[i]<='z')arr[1]=1;
    if(p[i]-'0' >=0 && p[i]-'0' <10)arr[2]=1;
    var x=punc.indexOf(p[i]);
    if(x>=0)arr[3]=1; 
  }

  if(p.length >=8)arr[4]=1;
  
  for(i=0;i<5;i++){
    if(arr[i]==1){
      var II=document.createElement("I");
      II.setAttribute("class","fa fa-check-circle done");  
      document.getElementsByClassName("ch")[i].innerHTML="";
      document.getElementsByClassName("ch")[i].appendChild(II);
    }
    else{
      var II=document.createElement("I");
      II.setAttribute("class","fa fa-exclamation-circle not-done");  
      document.getElementsByClassName("ch")[i].innerHTML="";
      document.getElementsByClassName("ch")[i].appendChild(II);
    }
  }

}

function showpassword(){
  var tp=document.getElementById("password1").type;
  if(tp=="password"){
    document.getElementById("password1").type="text";
    document.getElementById("password2").type="text";
  }
  else{
    document.getElementById("password1").type="password";
    document.getElementById("password2").type="password";
  } 
}
  

function wholefv(){
  var validity=1;

  // name validation
  if(document.getElementById("name").value == ""){
    document.getElementById("namealert").style.display ="block";
    document.getElementById("name").style.borderColor="red";
  }
  else{
    document.getElementById("namealert").style.display ="none";
    document.getElementById("name").style.borderColor="lightgrey";
    validity+=1;
  }


  //email validation
  if(document.getElementById("email").value == ""){
    document.getElementById("emailalert").style.display="block";
    document.getElementById("emailalert").innerHTML="Email is required";
    document.getElementById("email").style.borderColor="red";
  }
  else{
    var eml=document.getElementById("email").value;
    if(eml.indexOf('@') >0){
      document.getElementById("emailalert").style.display="none";
      document.getElementById("email").style.borderColor="lightgrey";
      validity+=1;
    }
    else{
      document.getElementById("emailalert").style.display="block";
      document.getElementById("emailalert").innerHTML="Please give a valid email id";
      document.getElementById("email").style.borderColor="red";
    }
    
  }



  //password validation
  if(document.getElementById("password1").value == ""){
    document.getElementById("p1alert").style.display="block";
    document.getElementById("p1alert").innerHTML="Password is required";
    document.getElementById("password1").style.borderColor="red";
  }
  else{
    var c=0,k=0;
    for(k=0;k<5;k++){
      if(arr[k]==1)c+=1;
    }

    if(c==5){
      document.getElementById("p1alert").style.display="none";
      document.getElementById("password1").style.borderColor="lightgrey";
      validity+=1;
    }
    else{
       document.getElementById("p1alert").style.display="block";
       document.getElementById("p1alert").innerHTML="Password is not strong";
       document.getElementById("password1").style.borderColor="red";
    }
    
  }


  //password matching
  if(document.getElementById("password1").value != document.getElementById("password2").value){
    document.getElementById("p2alert").style.display="block";
    document.getElementById("password2").style.borderColor="red";
  }
  else{
    document.getElementById("p2alert").style.display="none";
    document.getElementById("password2").style.borderColor="lightgrey";
    validity+=1;
  }



if(validity==5){
  document.getElementById("submitbtn").click();
}


}