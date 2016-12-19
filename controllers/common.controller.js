var request = require("request");

var CommonController = function () {
} 

CommonController._displayResponse = function(status, message, show){  
  var manualShowLog = false;
  console.log('---');
  if(show)
  	console.log('==> Response ==> ', status, message);
  else if(manualShowLog)
    console.log('==> Response ==> ', status, message);
  else
  	console.log('==> Response ==> Trace not activated for response');
  console.log('==============');
};

CommonController._sendError = function(res, message, httpCode){
	if(!httpCode)
		httpCode = 200;

  var errorMessage = null;
  console.log("error message ->", message);

  if(message && message.internErrorCode && message.sound){
    errorMessage = { error : { code: message.internErrorCode, text: message.text, sound: message.sound, voice: message.voice } };
  }
  else if(message && message.internErrorCode){
    errorMessage = { error : { code: message.internErrorCode, text: message.text } } ;
  }
  else {
    errorMessage = { error : { code: 1, text: "Technical error" } } ;
    console.log('==> Initial Error ==> ', message);
  }

	return res.status(httpCode).send(errorMessage);
}

CommonController._sendResponse = function(res, message, show){	
	
	if(message) {
		CommonController._displayResponse("200", message, show);
		return res.status("200").send(message);
	}
	CommonController._displayResponse("200", " No message ", show);
	return res.status("200").send();
}

CommonController._sendEvent = function(err, res, message, event){
  var messageToSend;

  if(!err){
    message.message.sound = true;
    message.message.voice = true;
    CommonController._sendResponse(res, message, false);
    messageToSend = event;
  }
  else {
    message.sound = true;
    message.voice = false;
    CommonController._sendError(res, message);
    messageToSend = "<b>Error</b> : " + JSON.stringify(message.text) + " (code:" + JSON.stringify(message.internErrorCode) + ").";
    if (event)
      messageToSend =  event;
  }

  request({
    headers: {
      'Content-Type': 'application/json'
    },
    uri: "https://websocketdevice.herokuapp.com/scanevent",
    method: "POST",
    form: {
      message: messageToSend
    }
  }, function(err, response, body) {
    if (err)
      console.log('==> SCAN received error ==> ', err);
  });
};

module.exports = CommonController;



