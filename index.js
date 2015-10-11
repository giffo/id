var crypto = require("crypto");

// taken from my utils lib @ 22/11/14, probably written in 2012

/**
 *
 * one of the reasons:
 * (when I made this)calling randomBytes on dirty windows(7) is really slow, like 200+ times slower
 * so to counter this bullpoop we have a buffer and is available we give what the
 * buffer has to offer otherwise we async randomBytes filling the buffer while calling it again so we can serve
 * the callee asap.
 */


// i am just turning a byte into a char, wasting 2 bits per char


var ID = module.exports = function(size) {
	var base64 = ("89ab"+"01234567"+"cdefghijklmnopquvstrwxyz"+"ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"-_").split(""); // changed 62 and 63 into more url friendly characters
	var capacity = size || 4096;//8192;
	var index = -1000; // uninitalised index to show buffer is empty
	var buffer;

	if(!(this instanceof ID)) {
		return new ID(size); // undefined size gets defaulted anyway.
	}
	
	buffer = crypto.randomBytes(capacity);

	index = 0; // reset position of index now buffer has been filled
	

	/**
	 * generates a random string, length specified by length parameter
	 *
	 * length of string generated,
	 * range - of base64 variable, 16 is hex, 64 is base64, 62 is base62, defaults to base64
	 */
	function generate(length, range) {
		var bytes, str="";
		
		var gamma = range ? range-1 : 63;
	
		// if index is set and the length requested is less than the buffer has available
		if(length < (capacity - index) && index > -1 ) {
			// get from buffer
			bytes = buffer.slice(index, index+length); // TODO: check the speed of this slice
			index+=length;
		} else {

			if(index > 0) {
				index = -1;
				crypto.randomBytes(capacity, function(err, randomBytes) {
					if(err) {
						throw err;
					}

					//console.log("++");
					buffer = randomBytes;
					index = 0;
				});
			}
			bytes = crypto.randomBytes(length);


		}




		// turn the bytes into pretty characters
		for(var i=0; i<length;i++ ){
			str+=""+base64[bytes[i]&gamma]; //%range]; // mod bitwise
		}

		return str;
	}


// ??todo: should i rename the param "size" to length?
	return {
		/* return random string, length determined by the param */
		next:function(size) {
			return generate(size || 32, 64);
		},

		/**
		 * v4 of uuid
		 */
		uuid:function() {
			var g = generate(36, 16).split(""); // need 36 chars for uuid v4, 16 is hex

			g[8] = g[13] = g[18] = g[23] = "-";
			g[14] = "4";
			g[19] = generate(1,4); // 0, 1, a or b

			return g.join("");

		},


		/* util */
		base64:function(size) {
			return generate(size || 32, 64).replace(/[-]/g,"+").replace(/[_]/g,"/"); // replace the alt chars with trad. base64 chars
		},
		/* used for salt */
		base62:function(size) {
			return generate(size || 32, 62);
		},

		
		hex:function(size) {
			return generate(size || 8, 16);
		}
	} // end of return
};
