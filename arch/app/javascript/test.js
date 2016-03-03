// -----------------------------------------------------------------------------
// Copyright 2016 by Samsung Electronics, Inc.
//
// Department: SRT - Bravo
// -----------------------------------------------------------------------------

/*
 Disclaimer: This code is for demonstrative purposes only and not intended for production environments
 */

var widgetAPI;
var tvKey;
var pluginAPI;

var Main = {

	
};

/**
 * Entry Point for app
 */
Main.onLoad = function () {


	var settings={

	}


	var initAPI = function(){
		console.log('init API');
		widgetAPI = new Common.API.Widget();
		tvKey = new Common.API.TVKeyValue();
		pluginAPI = new Common.API.Plugin();
		widgetAPI.sendReadyEvent();
		Main.sefPlugin = $('#sefPlugin')[0];
		Main.sefPluginForLFD = $('#sefPluginForLFD')[0];
		//Main.sefPluginForLFD.Open('LFD', '1.000', 'LFD');
	///	Main.sefPluginForLFD.Open('LFD', '1.000', 'LFD');
		//Main.sefPlugin.Open('Window', '1.000', 'Window');
		Main.sefPluginForLFD.Open('Window', '1.000', 'Window');

		//Main.sefPlugin.Execute('SetSource',39);
		//Main.sefPlugin.Close();
		Main.sefPluginForLFD.Execute('SetSource',31);
	}

	var current=1;
//if(typeof Common !=='undefined')
	initAPI();
	console.log('Started Example 3 4');
	$('#Loading').hide();
	var switchSorce = function(){
		var id = selected.attr('data-cmd');
		if(isNaN(Number(id))) return;
		console.log('selected cmd '+id+ '  '+selected.text());
		var num = parseInt(id);
		current = num;
		Main.sefPlugin.Execute('SetSource',num);
		$('#CurrentTV').removeClass('closed');
		$('#watching').text(selected.text());

		$('#Loading').fadeIn();
		setTimeout(function(){
			$('#Loading').fadeOut();
		},5000);
	}


	$('#SouceControl').on('click','a',function(evt){
		var el = $(evt.currentTarget);
		console.log('click '+ el.data('cmd'));
		$('#SouceControl').children().removeClass('selected');
		el.addClass('selected');
		selected = el;
		switchSorce();
	})

	var timer=0;
	var isMenu = true;

	var selected;
	var onMenuOpen = function(){
			selected.addClass('blink');
		setTimeout(function(){
			selected.removeClass('blink');
		},3000);
	}


	var openMenu = function(){
		$('#SmallMenu').removeClass('closed')
		isMenu = true;
		onMenuOpen();
	}




	$(document).on('click',function(){
		console.log('doc click current '+current);
	 if(isMenu==false)openMenu();
	 clearTimeout(timer);
	 if(current ==0) return;
		console.log('setting timeoutd')
	 timer = setTimeout(function(){
	 isMenu = false;
		 console.log('asdding class closed')
		// TweenMax.to($('#SmallMenu'),0.5,{y:30});
	 $('#SmallMenu').addClass('closed');
	 },5000);


	 })



	window.onHide = onHide;
	//enable key input

	var onKeyDown = function(evt){
		console.log('keydown');
	}
	window.addEventListener('keydown', onKeyDown);
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
var timer10min=0;
Main.onKeyDown = function (event) {
	var keyCode = event.keyCode;
console.log(keyCode);
	if(timer10min==0){
		$('#SmallMenu').removeClass('closed');
		isMenu = true;
	}



};

function onHide(){
    Main.sefPlugin.Close();
	Main.sefPluginLFD.Close();
}




/**
 * Adds text to a UI element
 * @param {String} text
 */

console.log = function(args){
	$.post('/','Log '+args.toString());
}
console.error = function(args){
	$.post('/','Error '+args.toString());
}

/**
 * Generic Error handler for uncaught JS errors
 * @param errMsg
 * @param url
 * @param lineNum
 * @returns {boolean}
 */
window.onerror = function handleError(errMsg, url, lineNum) {

    return false;
};

function onHide(){
	Main.sefPluginForLFD.Close();
	Main.sefPlugin.Close();
}


