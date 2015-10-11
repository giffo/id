/**
 * this just tests that the module is installed correctly, and runs through all the methods.
 */

var ID = require("./index");
//var ID = require("giffo-id");


console.time("init time");
var id = new ID(1024);
console.timeEnd("init time");



var a = 0;
console.time("1000 next");
for(var i=0;i<1000;i++) {
	a = id.next(8);
	
}
console.timeEnd("1000 next");
console.log("next 8 chars: "+a);


console.log("next: "+id.next() +"\n next() notice: should be web url friendly and should not change with encode uri");


var s = id.next(100);
if(s !== encodeURI(s)) {
	
	console.log("encodeURI caused changes");	
	console.log("encodeURI + "+s +" = "+encodeURI(s));
}


console.log("uuid-v4: " + id.uuid());

console.log("base 62: "+ id.base62());

console.log("base 64: "+id.base64());
console.log("base 64 4 chars: "+id.base64(4));

console.log("base hex 4 chars: "+id.hex(4));

/**
 * proposed usage within utils module
 *
 * utils.id(length); length being 32
 * utils.uuid();
 * utils.salt(length); length being 12?
 */	
 
 var NUM = 100000;
 var uuid = ID(10000);
 console.time(NUM+" id(s) using uuid")
 for(i = 0;i < NUM; i++) {
	//a = uuid.next(36);
	a = uuid.uuid();
 }
 console.timeEnd(NUM+" id(s) using uuid");