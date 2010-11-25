require.paths.unshift('/usr/local/lib/node/')

var express = require('express'),
    app = express.createServer(),
    ws = require('socket.io').listen(app);
    
var clients = [];
    
ws.on('connection', function(client){
  clients[clients.length] = client;
  client.send({system:true,m:'welcome'});
  
  client.on('message', function(msg){
    console.log("Messaggio arrivato: " + msg);
    send_all_except(client, msg);
  })
})

function send_all_except(except, msg){
  for(var i = 0, len = clients.length; i < len; i++){
    var client = clients[i];
    if(client !== except){
      client.send(msg);
    }
  }
}

app.listen(8125);