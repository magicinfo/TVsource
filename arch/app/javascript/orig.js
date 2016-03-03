// -----------------------------------------------------------------------------
// Copyright 2016 by Samsung Electronics, Inc.
//
// Department: SRT - Bravo
// -----------------------------------------------------------------------------

/*
 Disclaimer: This code is for demonstrative purposes only and not intended for production environments
 */

var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var pluginAPI = new Common.API.Plugin();

var Main = {

	
};

/**
 * Entry Point for app
 */
Main.onLoad = function () {
	widgetAPI.sendReadyEvent();
	Main.log('Started Example');
	
	//init LFD api that contains the seamless play api
	Main.sefPlugin = $('#sefPlugin')[0];
	Main.sefPluginForLFD = $('#sefPluginForLFD')[0];
    Main.sefPluginForLFD.Open('LFD', '1.000', 'LFD');
	
	Main.sefPlugin.Open('Window', '1.000', 'Window');	

	Main.sefPlugin.Execute('SetSource',31);	
	$("#source-to-see").html("SAT TV");
		  $("#watching").html("You are watching FIBE TV");
		  
		  
		  
	var switche = $("#toggle-source");
	switche.bind("touchend", function(){
		var s = Main.sefPlugin.Execute('GetSource');
		Main.log('switch '+s);
		if(s == 31){
			Main.log('switch DVI');
			Main.sefPlugin.Execute('SetSource',39);//39 = DVI source
			$("#source-to-see").html("FIBE TV");
			$("#watching").html("You are watching SAT TV");
		}if(s==39){
			 Main.log('switch to HDMI');
		    Main.sefPlugin.Execute('SetSource',31);//31 = HDMI source
			$("#source-to-see").html("SAT TV");
		    $("#watching").html("You are watching FIBE TV");
			
		}
		
	});

		
		  
	window.onHide = onHide;
	//enable key input
	window.addEventListener('keydown', Main.onKeyDown, false);
};

/**
 * Cleanup on page exit
 */
Main.onUnload = function () {
	if (Main.sefPlugin) {
		Main.sefPlugin.Close();
	}
	if (Main.sefPluginForLFD) {
		Main.sefPluginForLFD.Close();
	}
};

/**
 * Handles a key press
 * @param {KeyboardEvent} event
 */
Main.onKeyDown = function (event) {
    var keyCode = event.keyCode;
//  Main.log(keyCode);
    switch (keyCode) {
		case tvKey.KEY_1:
		  Main.log('switch DVI');
		  Main.sefPlugin.Execute('SetSource',39);
		  $("#source-to-see").html("FIBE TV");
		  $("#watching").html("You are watching SAT TV");
		  break;
		 case tvKey.KEY_2:
		  Main.log('switch to HDMI');
		  Main.sefPlugin.Execute('SetSource',31);
			$("#source-to-see").html("SAT TV");
		  $("#watching").html("You are watching FIBE TV");
		  break;
		
		case tvKey.KEY_6:
		 $( "div" ).toggle();
		  break;
		
		//reload page
		case tvKey.KEY_0:
		  Main.log('Reloading');
		  window.location.reload(true);
		  break;
    }
};

function onHide()
{   
	
    Main.sefPlugin.Close();
	Main.sefPluginLFD.Close();
}




/**
 * Adds text to a UI element
 * @param {String} text
 */
Main.log = function (text) {
    console.log(text);
    Main._logCount = Main._logCount || 0;
    var numStr = ('00000000' + ++Main._logCount).substr(-5);
    var scrollbox = $('#scrollbox');
    scrollbox.append('<div><span class="logNum">' + '[' + (new Date().getTime()) + '] ' + numStr + '</span> : ' + text + '</div>').scrollTop(scrollbox[0].scrollHeight);

  //max log length
    if (scrollbox.children().length > 1000) {
		scrollbox.find('div').slice(0, 1).remove();
    }
};

/**
 * Generic Error handler for uncaught JS errors
 * @param errMsg
 * @param url
 * @param lineNum
 * @returns {boolean}
 */
window.onerror = function handleError(errMsg, url, lineNum) {
    Main.log('Error Message: ' + errMsg);
    Main.log('  URL: ' + url);
    Main.log('  Line: ' + lineNum);
    return false;
};

function onHide(){
	Main.sefPluginForLFD.Close();
	Main.sefPlugin.Close();
}


