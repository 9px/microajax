/*
Copyright (c) 2008 Stefan Lange-Hegermann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

function microAjax(url, callbackFunction)
{
	this.bindFunction = function (caller, object) {
		return function() {
			return caller.apply(object, new Array(object));
		}
	}

	this.stateChange = function (object) {
		if (this.request.readyState==4) {
			this.callbackFunction(this.request.responseText);
		}
	}

	this.getRequest = function() {
		if (window.ActiveXObject)
			return new ActiveXObject('Microsoft.XMLHTTP');
		else if (window.XMLHttpRequest)
			return new XMLHttpRequest();
		else
			return false;
	}

	if (arguments[2])
		this.postBody = arguments[2];
	else 
		this.postBody="";

	this.callbackFunction=callbackFunction;
	this.url=url;	
	this.request = this.getRequest();

	if(this.request) {
		this.request.onreadystatechange = this.bindFunction(this.stateChange, this);

		if (this.postBody!="") {
			this.request.open("POST", url, true);
			this.request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			this.request.setRequestHeader('Connection', 'close');
		} else {
			this.request.open("GET", url, true);
		}

		this.request.send(this.postBody);
	}
}

