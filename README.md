###giffo-id

It's purpose was to allow me to create quality random ID strings. For usage in ID'ing game elements, session IDs and password salts etc.

I wrote this around the end of 2012, it is a buffered random string generator using crypto.randomBytes in nodejs.

Calling randomBytes was over 200 times slower in windows(7) compared to linux at the time (no idea what the difference is now).



#####install

	npm install -g giffo-id 

#####import

	var ID = require("giffo-id");

#####Constructor

	var id = new ID(bufferSize);

#####or short cut method

	var id = require("giffo-id")(bufferSize); 

	// the larger the bufferCapacity the less times it will have to reinitialize the buffer.

#####usage
	id.next(10); // returns a random string of 10 character length


#####API Methods.

    .next(length);

returns a random string of characters.
if no length param is given the default length 32. *It is web url friendly.*


    .uuid();

returns a version 4 [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29 "UUID")


	.base64(length)

returns a random string based on base 64


	.base62(length)
	
to make things web friendly this uses base62

	.hex(length)

returns base16


####license
MIT