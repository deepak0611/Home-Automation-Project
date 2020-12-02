// Load Wi-Fi library
#include <ESP8266WiFi.h>
#include<ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include "DHT.h"

#define DHTTYPE DHT11
#define dht_pin 2 //GPIO 2 corresponds to D4 of nodeMCU
DHT dht(dht_pin , DHTTYPE);

// Network credentials
const char* ssid     = "Redmi";
const char* password = "18117033";
// Set web server port number to 80
WiFiServer server(80);

// Assign output variables to GPIO pins
const int output1 = 5;
const int output2 = 4;
const int output3 = 14;
const int output4 = 12;

int j=50;
float t;
float h;

void setup() {
  Serial.begin(115200);

  
  // Initialize the output variables as outputs
  pinMode(output1, OUTPUT);
  pinMode(output2, OUTPUT);
  pinMode(output3, OUTPUT);
  pinMode(output4, OUTPUT);
    
  // Set outputs to LOW
  digitalWrite(output1, HIGH);
  digitalWrite(output2, HIGH);
  digitalWrite(output3, HIGH);
  digitalWrite(output4, HIGH);

  dht.begin();//initialize the DHT sensor
 

  // Connect to Wi-Fi network with SSID and password
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

    
  
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
}



 
void loop() 
{  
  
   //temperature sensor reads data every 2 minutes
   if(j==50){
   h = dht.readHumidity();     //  relative humidity in percentage 
   t = dht.readTemperature();     // Read temperature as Celsius (the default)
   Serial.print(" Humidity: ");
   Serial.print(h);
   Serial.print("%  Temperature: ");
   Serial.print(t);
   Serial.println("");
   j=0;
   }
   
  
  
  if (WiFi.status() == WL_CONNECTED) 
  {


   HTTPClient http2; //Object of class HTTPClient
   String url2 = "http://deepak0611.pythonanywhere.com/hardware_status_manager/";
   url2.concat(t);
print(url2);
   url2.concat(‘/’);

   url2.concat(h);
print(url2);

   http2.begin(url2);
   int httpcode2=http2.GET();
  

    HTTPClient http; //Object of class HTTPClient
    http.begin("http://deepak0611.pythonanywhere.com/pin_state/");
    int httpCode = http.GET();
  

    if (httpCode > 0) 
    {

      if(httpCode == HTTP_CODE_OK) {
             //HTTP_CODE_OK means code == 200
               String payload = http.getString();// gives us the message received by the GET Request
               //Serial.println(payload);// Displays the message onto the Serial Monitor

            // calculated memory required using https://arduinojson.org/v6/assistant/
               const size_t capacity = JSON_ARRAY_SIZE(4) + 4*JSON_OBJECT_SIZE(11) + 210;
               DynamicJsonDocument doc(capacity);
   
               const char* json = payload.c_str();            
               deserializeJson(doc, json); 

              for(int i = 0; i <4; i++) {   
                          JsonObject root_0 = doc[i];
                          int root_0_id = root_0["id"]; // 1
                          int root_0_pin_no = root_0["pin_no"]; // 5
                          bool root_0_state = root_0["state"]; // false

              
                  if( digitalRead(root_0_pin_no) ==  root_0_state){
                     digitalWrite(root_0_pin_no, !root_0_state);
                    } 
       }    
     }    
   }
    http.end(); //Close connection
  }
  j++;
  delay(1000);
}
   
