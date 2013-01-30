/**
 * This code is responsible for logging the asynchronous JavaScript events and
 * the timing events. The first part of the file is dedicated to a logger class
 * that currently logs the events on the console. The screen can be viewed using
 * tools like Firebug. The second part of the file redefines the browser's
 * setTimeout method. The code logs the relevant information both when the
 * timeout is created and when the callback happens. The final part of this file
 * replaces the browser's XMLHTTPRequest object and its relevant functions. This
 * part of the code logs the information when the XHR object is created and
 * sent, as well as when the callback function is executed. Counters for
 * Timeouts and XHRs are included in the code, so that at any time during
 * execution the number of active timeouts and XHRs is known.
 * 
 * @Author Saba Alimadadi
 */

var recordStarted = true;// false;
var displayCountdown = false;

/**
 * The logger class is responsible for logging the information on the console,
 * based on the type of the event that has happened. This event could be a DOM
 * event, an asynchronous AJAX request, or a timing event. The logging happens
 * at a fine-grained level, meaning that each of the aforementioned events are
 * broken into meaningful atomic actions which are logged individually. E.g. a
 * timeout event consists of smaller actions such as creating the timeout and
 * execution of the callback function; each of those are logged separately.
 */
var logger = {}

/**
 * Prints the information related to creation of a timeout to the console
 */
logger.logSetTimeout = function(func, delay) {
	if (!recordStarted)
		return;

	console.log("------------------------------------");
	console.log("TIMEOUT: NEW");
	var date = new Date();
	console.log("Time: (", date.getUTCFullYear(), "-", date.getUTCMonth(), "-",
			date.getUTCDate(), " ", date.getUTCHours(), ":", date
					.getUTCMinutes(), ":", date.getUTCSeconds(), ":", date
					.getUTCMilliseconds(), ")");

	func.id = totalNumOfTimeouts;
	console.log(" + Timeout ID:", func.id);
	console.log(" + Callback function: ", func);
	console.log(" + Delay: ", delay);
	var args = func.toString().match(/function\s+\w*\s*\((.*?)\)/)[1]
			.split(/\s*,\s*/);
	console.log(" + Function args: ", args);

	console.log("Number of active timeouts: ", timeoutCounter);

	/*
	 * var xmlhttp = new XMLHttpRequest();
	 * 
	 * xmlhttp.onreadystatechange = function() { if (xmlhttp.readyState==4) {
	 * //document.getElementById("xhrResponse").innerHTML = xmlhttp.responseText + "
	 * (used method: GET)"; System.out.println("DOM EVENT LOG SENT TO SERVER"); } }
	 * xmlhttp.open("POST","http://localhost:8080/same-game/same-game.html",true);
	 * String msg = "";
	 * 
	 * msg += "<timeout_new>";
	 * 
	 * msg += "<time>"; msg += "<year>"; msg += "</year>"; msg += "<month>";
	 * msg += "</month>"; msg += "<day>"; msg += "</day>"; msg += "<hour>";
	 * msg += "</hour>"; msg += "<minute>"; msg += "</minute>"; msg += "<second>";
	 * msg += "</second>"; msg += "<millisecond>"; msg += "</millisecond>";
	 * msg += "</time>";
	 * 
	 * 
	 * 
	 * msg += "<>"; msg += "</>";
	 * 
	 * msg += "</timeout_new>";
	 * 
	 * xmlhttp.send("+++++++++++++++++++++++++");
	 */
};

/**
 * Prints the information related to execution of the callback function of a
 * timeout to the console.
 */
logger.logTimeoutCallback = function(func) {
	if (!recordStarted)
		return;
	console.log("------------------------------------");
	console.log("TIMEOUT: CALLBACK");
	var date = new Date();
	console.log("Time: (", date.getUTCFullYear(), "-", date.getUTCMonth(), "-",
			date.getUTCDate(), " ", date.getUTCHours(), ":", date
					.getUTCMinutes(), ":", date.getUTCSeconds(), ":", date
					.getUTCMilliseconds(), ")");

	console.log(" + Timeout ID:", func.id);
	console.log(" + Callback function: ", func);
	console.log("Number of active timeouts: ", timeoutCounter);
	if (timeoutCounter == 0) {
		console.log("No more active timeouts. Total number of Timeouts: ",
				totalNumOfTimeouts);
		// The execution of all registered Timeouts is finished. Notify the
		// responsible unit.
	}

	send("TEST");

	test();

};

/**
 * Prints the information related to creation of a XMLHTTPRequest object to the
 * console
 */
logger.logXHROpen = function(xhr, method, url, async) {
	if (!recordStarted)
		return;
	console.log("------------------------------------");
	console.log("XMLHTTPREQUEST: OPEN");
	var date = new Date();
	console.log("Time: (", date.getUTCFullYear(), "-", date.getUTCMonth(), "-",
			date.getUTCDate(), " ", date.getUTCHours(), ":", date
					.getUTCMinutes(), ":", date.getUTCSeconds(), ":", date
					.getUTCMilliseconds(), ")");
	console.log(" + XHR ID: ", xhr.id);
	console.log(" + Method: ", method);
	console.log(" + URL: ", url);
	console.log(" + Async: ", async);

};

/**
 * Prints the information related to sending a XHR object to server on the
 * console
 */
logger.logXHRSend = function(xhr, str) {
	if (!recordStarted)
		return;
	console.log("------------------------------------");
	console.log("XMLHTTPREQUEST: SEND");
	console.log(" + XHR ID: ", xhr.id);
	console.log(" + Message (POST):", str);

};

/**
 * Prints the information related to getting the response of a XHR object and
 * executing the callback function on the console
 */
logger.logXHRResponse = function(xhr) {
	if (!recordStarted)
		return;
	console.log("------------------------------------");
	console.log("XMLHTTPREQUEST: RESPONSE");

	var date = new Date();
	console.log("Time: (", date.getUTCFullYear(), "-", date.getUTCMonth(), "-",
			date.getUTCDate(), " ", date.getUTCHours(), ":", date
					.getUTCMinutes(), ":", date.getUTCSeconds(), ":", date
					.getUTCMilliseconds(), ")");

	console.log(" + XHR ID: ", xhr.id);

	console.log(" + XHR callback function: ", xhr.onreadystatechange);
	console.log(" + XHR response headers: ", xhr.getAllResponseHeaders());
	console.log(" + XHR response: ", xhr.response);

	if (xhrCounter == 0) {
		var date = new Date();
		console.log("Total num of XHRs: ", totalNumOfXhrs, ". Time: (", date
				.getUTCFullYear(), "-", date.getUTCMonth(), "-", date
				.getUTCDate(), " ", date.getUTCHours(), ":", date
				.getUTCMinutes(), ":", date.getUTCSeconds(), ":", date
				.getUTCMilliseconds(), ")");
		// The execution of all registered XHRs is finished. Notify the
		// responsible unit.
	}

};

/**
 * Prints the information related to a DOM event on the console
 */
logger.logDOMEvent = function(type, targetEl, callback) {
	if (!recordStarted)
		return;
	console.log("------------------------------------");
	console.log("DOM EVENT HANDLED");
	var date = new Date();
	console.log("Time: (", date.getUTCFullYear(), "-", date.getUTCMonth(), "-",
			date.getUTCDate(), " ", date.getUTCHours(), ":", date
					.getUTCMinutes(), ":", date.getUTCSeconds(), ":", date
					.getUTCMilliseconds(), ")");
	console.log(" + Event type: ", arguments[0]);
	console.log(" + Target DOM element: ", arguments[1]);
	console.log(" + Handler function: ", arguments[2]);

	send("<timeout_new>");
	send("<time>");
	send("<year>");
	send(date.getUTCFullYear());
	send("</year>");
	send("<month>");
	send(date.getUTCMonth());
	send("</month>");
	send("<day>");
	send(date.getUTCDate());
	send("</day>");
	send("<hour>");
	send(date.getUTCHours());
	send("</hour>");
	send("<minute>");
	send(date.getUTCMinutes());
	send("</minute>");
	send("<second>");
	send(date.getUTCSeconds());
	send("</second>");
	send("<millisecond>");
	send(date.getUTCMilliseconds());
	send("</millisecond>");
	send("</time>");

	send("<event_type>");
	send(arguments[0]);
	send("</event_type>");
	send("<target_element>");
	send(arguments[1]);
	send("</target_element>");
	send("<handler>");
	send(arguments[2]);
	send("</arguments[2]>");

	/*
	 * var xmlhttp = new XMLHttpRequest();
	 * 
	 * xmlhttp.onreadystatechange = function() { if (xmlhttp.readyState==4) {
	 * //document.getElementById("xhrResponse").innerHTML = xmlhttp.responseText + "
	 * (used method: GET)"; System.out.println("DOM EVENT LOG SENT TO SERVER"); } }
	 * xmlhttp.open("POST","http://localhost:8080/same-game/same-game.html",true);
	 * 
	 * String msg = "";
	 * 
	 * msg += "<timeout_new>";
	 * 
	 * msg += "<time>"; msg += "<year>"; msg += "</year>"; msg += "<month>";
	 * msg += "</month>"; msg += "<day>"; msg += "</day>"; msg += "<hour>";
	 * msg += "</hour>"; msg += "<minute>"; msg += "</minute>"; msg += "<second>";
	 * msg += "</second>"; msg += "<millisecond>"; msg += "</millisecond>";
	 * msg += "</time>";
	 * 
	 * 
	 * 
	 * msg += "<>"; msg += "</>";
	 * 
	 * msg += "</timeout_new>";
	 * 
	 * xmlhttp.send("--------------------------------------------------------------------------------");
	 */
	/*
	 * send("TEST"); test();
	 */
};

/*******************************************************************************
 * ** *** ** TIMEOUTS *** ** ***
 ******************************************************************************/

var xhrCounter = 0;
var timeoutCounter = 0;

var totalNumOfXhrs = 0;
var totalNumOfTimeouts = 0;

// Keep the current setTimeout function
window.oldSetTimeout = window.setTimeout;

// Redefine setTimeout
window.setTimeout = function(func, delay, params) {
	// Increase the number of active timeouts
	timeoutCounter++;
	totalNumOfTimeouts++;

	var timeoutArgs = Array.prototype.slice.call(arguments, 2);

	// Log the creation of the timeout
	logger.logSetTimeout(func, delay);

	// Call the original timeout after logging
	window.oldSetTimeout(function(/* params */) {
		try {
			func.apply(null, timeoutArgs);
			timeoutCounter--;

			logger.logTimeoutCallback(func);
		} catch (exception) {
		}
	}, delay);
};

/*******************************************************************************
 * ** *** ** XMLHTTPREQUEST *** ** ***
 ******************************************************************************/

// Store the original XMLHTTPRequest object
var _XMLHttpRequest = XMLHttpRequest;
// Redefine XHR
XMLHttpRequest = function() {
	xhrCounter++;
	totalNumOfXhrs++;

	var xhr = new _XMLHttpRequest();
	// var xhr = new _XMLHttpRequest();

	xhr.id = totalNumOfXhrs;

	// Replace the function for opening a new request
	var _open = xhr.open;
	xhr.open = function(method, url, async) {
		logger.logXHROpen(xhr, method, url, async);
		return _open.apply(this, [ method, url, async ]);

	}

	// Replace the function for sending the previously created request
	var _send = xhr.send;
	xhr.send = function(str) {
		logger.logXHRSend(xhr, str);
		// The value of OnLoad declares when the response is back. Call the
		// logger function when the response is ready which cause the callback
		// function to be executed as well.
		var onload = function() {
			xhrCounter--;

			logger.logXHRResponse(xhr);
		}

		xhr.addEventListener("load", onload, false);

		return _send.apply(this, [ str ]);
	}

	return xhr;
}
