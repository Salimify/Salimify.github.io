/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

;function Marker(e){google.maps.Marker.apply(this,arguments),e.map_icon_label&&(this.MarkerLabel=new MarkerLabel({map:this.map,marker:this,text:e.map_icon_label}),this.MarkerLabel.bindTo("position",this,"position"))}var MAP_PIN="M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",SQUARE_PIN="M22-48h-44v43h16l6 5 6-5h16z",SHIELD="M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z",ROUTE="M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z",SQUARE="M-24-48h48v48h-48z",SQUARE_ROUNDED="M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z",inherits=function(e,t){function i(){}i.prototype=t.prototype,e.superClass_=t.prototype,e.prototype=new i,e.prototype.constructor=e};inherits(Marker,google.maps.Marker),Marker.prototype.setMap=function(){google.maps.Marker.prototype.setMap.apply(this,arguments),this.MarkerLabel&&this.MarkerLabel.setMap.apply(this.MarkerLabel,arguments)};var MarkerLabel=function(e){var t=this;this.setValues(e),this.div=document.createElement("div"),this.div.className="map-icon-label",google.maps.event.addDomListener(this.div,"click",function(e){e.stopPropagation&&e.stopPropagation(),google.maps.event.trigger(t.marker,"click")})};MarkerLabel.prototype=new google.maps.OverlayView,MarkerLabel.prototype.onAdd=function(){var e=(this.getPanes().overlayImage.appendChild(this.div),this);this.listeners=[google.maps.event.addListener(this,"position_changed",function(){e.draw()}),google.maps.event.addListener(this,"text_changed",function(){e.draw()}),google.maps.event.addListener(this,"zindex_changed",function(){e.draw()})]},MarkerLabel.prototype.onRemove=function(){this.div.parentNode.removeChild(this.div);for(var e=0,t=this.listeners.length;t>e;++e)google.maps.event.removeListener(this.listeners[e])},MarkerLabel.prototype.draw=function(){var e=this.getProjection().fromLatLngToDivPixel(this.get("position")),t=this.div;this.div.innerHTML=this.get("text").toString(),t.style.zIndex=this.get("zIndex"),t.style.display="block",t.style.left=e.x-t.offsetWidth/2+"px",t.style.top=e.y-t.offsetHeight+"px"},function(e){function t(t){var i=t||window.event,n=[].slice.call(arguments,1),o=0,s=0,a=0;return(t=e.event.fix(i)).type="mousewheel",i.wheelDelta&&(o=i.wheelDelta/120),i.detail&&(o=-i.detail/3),a=o,void 0!==i.axis&&i.axis===i.HORIZONTAL_AXIS&&(a=0,s=-1*o),void 0!==i.wheelDeltaY&&(a=i.wheelDeltaY/120),void 0!==i.wheelDeltaX&&(s=-1*i.wheelDeltaX/120),n.unshift(t,o,s,a),(e.event.dispatch||e.event.handle).apply(this,n)}var i=["DOMMouseScroll","mousewheel"];if(e.event.fixHooks)for(var n=i.length;n;)e.event.fixHooks[i[--n]]=e.event.mouseHooks;e.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var e=i.length;e;)this.addEventListener(i[--e],t,!1);else this.onmousewheel=t},teardown:function(){if(this.removeEventListener)for(var e=i.length;e;)this.removeEventListener(i[--e],t,!1);else this.onmousewheel=null}},e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}(jQuery),function(){function e(){}function t(e,t){for(var i=e.length;i--;)if(e[i].listener===t)return i;return-1}function i(e){return function(){return this[e].apply(this,arguments)}}var n=e.prototype,o=this,s=o.EventEmitter;n.getListeners=function(e){var t,i,n=this._getEvents();if("object"==typeof e)for(i in t={},n)n.hasOwnProperty(i)&&e.test(i)&&(t[i]=n[i]);else t=n[e]||(n[e]=[]);return t},n.flattenListeners=function(e){var t,i=[];for(t=0;e.length>t;t+=1)i.push(e[t].listener);return i},n.getListenersAsObject=function(e){var t,i=this.getListeners(e);return i instanceof Array&&((t={})[e]=i),t||i},n.addListener=function(e,i){var n,o=this.getListenersAsObject(e),s="object"==typeof i;for(n in o)o.hasOwnProperty(n)&&-1===t(o[n],i)&&o[n].push(s?i:{listener:i,once:!1});return this},n.on=i("addListener"),n.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},n.once=i("addOnceListener"),n.defineEvent=function(e){return this.getListeners(e),this},n.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},n.removeListener=function(e,i){var n,o,s=this.getListenersAsObject(e);for(o in s)s.hasOwnProperty(o)&&(-1!==(n=t(s[o],i))&&s[o].splice(n,1));return this},n.off=i("removeListener"),n.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},n.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},n.manipulateListeners=function(e,t,i){var n,o,s=e?this.removeListener:this.addListener,a=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(n=i.length;n--;)s.call(this,t,i[n]);else for(n in t)t.hasOwnProperty(n)&&(o=t[n])&&("function"==typeof o?s.call(this,n,o):a.call(this,n,o));return this},n.removeEvent=function(e){var t,i=typeof e,n=this._getEvents();if("string"===i)delete n[e];else if("object"===i)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},n.removeAllListeners=i("removeEvent"),n.emitEvent=function(e,t){var i,n,o,s=this.getListenersAsObject(e);for(o in s)if(s.hasOwnProperty(o))for(n=s[o].length;n--;)!0===(i=s[o][n]).once&&this.removeListener(e,i.listener),i.listener.apply(this,t||[])===this._getOnceReturnValue()&&this.removeListener(e,i.listener);return this},n.trigger=i("emitEvent"),n.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},n.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},n._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},n._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return o.EventEmitter=s,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}.call(this),function(e){function t(t){var i=e.event;return i.target=i.target||i.srcElement||t,i}var i=document.documentElement,n=function(){};i.addEventListener?n=function(e,t,i){e.addEventListener(t,i,!1)}:i.attachEvent&&(n=function(e,i,n){e[i+n]=n.handleEvent?function(){var i=t(e);n.handleEvent.call(n,i)}:function(){var i=t(e);n.call(e,i)},e.attachEvent("on"+i,e[i+n])});var o=function(){};i.removeEventListener?o=function(e,t,i){e.removeEventListener(t,i,!1)}:i.detachEvent&&(o=function(e,t,i){e.detachEvent("on"+t,e[t+i]);try{delete e[t+i]}catch(n){e[t+i]=void 0}});var s={bind:n,unbind:o};"function"==typeof define&&define.amd?define("eventie/eventie",s):e.eventie=s}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(i,n){return t(e,i,n)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,i){function n(e,t){for(var i in t)e[i]=t[i];return e}function o(e){var t=[];if(function(e){return"[object Array]"===u.call(e)}(e))t=e;else if("number"==typeof e.length)for(var i=0,n=e.length;n>i;i++)t.push(e[i]);else t.push(e);return t}function s(e,t,i){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=n({},this.options),"function"==typeof t?i=t:n(this.options,t),i&&this.on("always",i),this.getImages(),l&&(this.jqDeferred=new l.Deferred);var a=this;setTimeout(function(){a.check()})}function a(e){this.img=e}function r(e){this.src=e,h[e]=this}var l=e.jQuery,d=e.console,c=void 0!==d,u=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var i=this.elements[e];"IMG"===i.nodeName&&this.addImage(i);var n=i.nodeType;if(n&&(1===n||9===n||11===n))for(var o=i.querySelectorAll("img"),s=0,a=o.length;a>s;s++){var r=o[s];this.addImage(r)}}},s.prototype.addImage=function(e){var t=new a(e);this.images.push(t)},s.prototype.check=function(){function e(e,o){return t.options.debug&&c&&d.log("confirm",e,o),t.progress(e),++i===n&&t.complete(),!0}var t=this,i=0,n=this.images.length;if(this.hasAnyBroken=!1,n)for(var o=0;n>o;o++){var s=this.images[o];s.on("confirm",e),s.check()}else this.complete()},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var i=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[i](t)}})},l&&(l.fn.imagesLoaded=function(e,t){return new s(this,e,t).jqDeferred.promise(l(this))}),a.prototype=new t,a.prototype.check=function(){var e=h[this.img.src]||new r(this.img.src);if(e.isConfirmed)this.confirm(e.isLoaded,"cached was confirmed");else if(this.img.complete&&void 0!==this.img.naturalWidth)this.confirm(0!==this.img.naturalWidth,"naturalWidth");else{var t=this;e.on("confirm",function(e,i){return t.confirm(e.isLoaded,i),!0}),e.check()}},a.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var h={};return r.prototype=new t,r.prototype.check=function(){if(!this.isChecked){var e=new Image;i.bind(e,"load",this),i.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},r.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},r.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},r.prototype.unbindProxyEvents=function(e){i.unbind(e.target,"load",this),i.unbind(e.target,"error",this)},s}),function(e){function t(){}function i(e){function i(t){t.prototype.option||(t.prototype.option=function(t){e.isPlainObject(t)&&(this.options=e.extend(!0,this.options,t))})}function o(t,i){e.fn[t]=function(o){if("string"==typeof o){for(var a=n.call(arguments,1),r=0,l=this.length;l>r;r++){var d=this[r],c=e.data(d,t);if(c)if(e.isFunction(c[o])&&"_"!==o.charAt(0)){var u=c[o].apply(c,a);if(void 0!==u)return u}else s("no such method '"+o+"' for "+t+" instance");else s("cannot call methods on "+t+" prior to initialization; attempted to call '"+o+"'")}return this}return this.each(function(){var n=e.data(this,t);n?(n.option(o),n._init()):(n=new i(this,o),e.data(this,t,n))})}}if(e){var s="undefined"==typeof console?t:function(e){console.error(e)};return e.bridget=function(e,t){i(t),o(e,t)},e.bridget}}var n=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):i("object"==typeof exports?require("jquery"):e.jQuery)}(window),function(e){function t(t){var i=e.event;return i.target=i.target||i.srcElement||t,i}var i=document.documentElement,n=function(){};i.addEventListener?n=function(e,t,i){e.addEventListener(t,i,!1)}:i.attachEvent&&(n=function(e,i,n){e[i+n]=n.handleEvent?function(){var i=t(e);n.handleEvent.call(n,i)}:function(){var i=t(e);n.call(e,i)},e.attachEvent("on"+i,e[i+n])});var o=function(){};i.removeEventListener?o=function(e,t,i){e.removeEventListener(t,i,!1)}:i.detachEvent&&(o=function(e,t,i){e.detachEvent("on"+t,e[t+i]);try{delete e[t+i]}catch(n){e[t+i]=void 0}});var s={bind:n,unbind:o};"function"==typeof define&&define.amd?define("eventie/eventie",s):"object"==typeof exports?module.exports=s:e.eventie=s}(window),function(){"use strict";function e(){}function t(e,t){for(var i=e.length;i--;)if(e[i].listener===t)return i;return-1}function i(e){return function(){return this[e].apply(this,arguments)}}var n=e.prototype,o=this,s=o.EventEmitter;n.getListeners=function(e){var t,i,n=this._getEvents();if(e instanceof RegExp)for(i in t={},n)n.hasOwnProperty(i)&&e.test(i)&&(t[i]=n[i]);else t=n[e]||(n[e]=[]);return t},n.flattenListeners=function(e){var t,i=[];for(t=0;t<e.length;t+=1)i.push(e[t].listener);return i},n.getListenersAsObject=function(e){var t,i=this.getListeners(e);return i instanceof Array&&((t={})[e]=i),t||i},n.addListener=function(e,i){var n,o=this.getListenersAsObject(e),s="object"==typeof i;for(n in o)o.hasOwnProperty(n)&&-1===t(o[n],i)&&o[n].push(s?i:{listener:i,once:!1});return this},n.on=i("addListener"),n.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},n.once=i("addOnceListener"),n.defineEvent=function(e){return this.getListeners(e),this},n.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},n.removeListener=function(e,i){var n,o,s=this.getListenersAsObject(e);for(o in s)s.hasOwnProperty(o)&&(-1!==(n=t(s[o],i))&&s[o].splice(n,1));return this},n.off=i("removeListener"),n.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},n.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},n.manipulateListeners=function(e,t,i){var n,o,s=e?this.removeListener:this.addListener,a=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(n=i.length;n--;)s.call(this,t,i[n]);else for(n in t)t.hasOwnProperty(n)&&(o=t[n])&&("function"==typeof o?s.call(this,n,o):a.call(this,n,o));return this},n.removeEvent=function(e){var t,i=typeof e,n=this._getEvents();if("string"===i)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},n.removeAllListeners=i("removeEvent"),n.emitEvent=function(e,t){var i,n,o,s=this.getListenersAsObject(e);for(o in s)if(s.hasOwnProperty(o))for(n=s[o].length;n--;)!0===(i=s[o][n]).once&&this.removeListener(e,i.listener),i.listener.apply(this,t||[])===this._getOnceReturnValue()&&this.removeListener(e,i.listener);return this},n.trigger=i("emitEvent"),n.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},n.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},n._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},n._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return o.EventEmitter=s,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:o.EventEmitter=e}.call(this),function(e){function t(e){if(e){if("string"==typeof n[e])return e;e=e.charAt(0).toUpperCase()+e.slice(1);for(var t,o=0,s=i.length;s>o;o++)if(t=i[o]+e,"string"==typeof n[t])return t}}var i="Webkit Moz ms Ms O".split(" "),n=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return t}):"object"==typeof exports?module.exports=t:e.getStyleProperty=t}(window),function(e,t){function i(e){var t=parseFloat(e);return-1===e.indexOf("%")&&!isNaN(t)&&t}function n(t){function n(){if(!c){c=!0;var n=e.getComputedStyle;if(r=function(){var e=n?function(e){return n(e,null)}:function(e){return e.currentStyle};return function(t){var i=e(t);return i||o("Style returned "+i+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),i}}(),l=t("boxSizing")){var s=document.createElement("div");s.style.width="200px",s.style.padding="1px 2px 3px 4px",s.style.borderStyle="solid",s.style.borderWidth="1px 2px 3px 4px",s.style[l]="border-box";var a=document.body||document.documentElement;a.appendChild(s);var u=r(s);d=200===i(u.width),a.removeChild(s)}}}function a(t,i){if(e.getComputedStyle||-1===i.indexOf("%"))return i;var n=t.style,o=n.left,s=t.runtimeStyle,a=s&&s.left;return a&&(s.left=t.currentStyle.left),n.left=i,i=n.pixelLeft,n.left=o,a&&(s.left=a),i}var r,l,d,c=!1;return function(e){if(n(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var t=r(e);if("none"===t.display)return function(){for(var e={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},t=0,i=s.length;i>t;t++)e[s[t]]=0;return e}();var o={};o.width=e.offsetWidth,o.height=e.offsetHeight;for(var c=o.isBorderBox=!(!l||!t[l]||"border-box"!==t[l]),u=0,h=s.length;h>u;u++){var p=s[u],m=t[p];m=a(e,m);var f=parseFloat(m);o[p]=isNaN(f)?0:f}var g=o.paddingLeft+o.paddingRight,v=o.paddingTop+o.paddingBottom,y=o.marginLeft+o.marginRight,b=o.marginTop+o.marginBottom,w=o.borderLeftWidth+o.borderRightWidth,x=o.borderTopWidth+o.borderBottomWidth,S=c&&d,C=i(t.width);!1!==C&&(o.width=C+(S?0:g+w));var T=i(t.height);return!1!==T&&(o.height=T+(S?0:v+x)),o.innerWidth=o.width-(g+w),o.innerHeight=o.height-(v+x),o.outerWidth=o.width+y,o.outerHeight=o.height+b,o}}}var o="undefined"==typeof console?function(){}:function(e){console.error(e)},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],n):"object"==typeof exports?module.exports=n(require("desandro-get-style-property")):e.getSize=n(e.getStyleProperty)}(window),function(e){function t(e){"function"==typeof e&&(t.isReady?e():a.push(e))}function i(e){var i="readystatechange"===e.type&&"complete"!==s.readyState;t.isReady||i||n()}function n(){t.isReady=!0;for(var e=0,i=a.length;i>e;e++){(0,a[e])()}}function o(o){return"complete"===s.readyState?n():(o.bind(s,"DOMContentLoaded",i),o.bind(s,"readystatechange",i),o.bind(e,"load",i)),t}var s=e.document,a=[];t.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],o):"object"==typeof exports?module.exports=o(require("eventie")):e.docReady=o(e.eventie)}(window),function(e){"use strict";function t(e,t){return e[o](t)}function i(e){e.parentNode||document.createDocumentFragment().appendChild(e)}var n,o=function(){if(e.matches)return"matches";if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,n=t.length;n>i;i++){var o=t[i]+"MatchesSelector";if(e[o])return o}}();if(o){var s=t(document.createElement("div"),"div");n=s?t:function(e,n){return i(e),t(e,n)}}else n=function(e,t){i(e);for(var n=e.parentNode.querySelectorAll(t),o=0,s=n.length;s>o;o++)if(n[o]===e)return!0;return!1};"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return n}):"object"==typeof exports?module.exports=n:window.matchesSelector=n}(Element.prototype),function(e,t){"use strict";"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(i,n){return t(e,i,n)}):"object"==typeof exports?module.exports=t(e,require("doc-ready"),require("desandro-matches-selector")):e.fizzyUIUtils=t(e,e.docReady,e.matchesSelector)}(window,function(e,t,i){var n={extend:function(e,t){for(var i in t)e[i]=t[i];return e},modulo:function(e,t){return(e%t+t)%t}},o=Object.prototype.toString;n.isArray=function(e){return"[object Array]"==o.call(e)},n.makeArray=function(e){var t=[];if(n.isArray(e))t=e;else if(e&&"number"==typeof e.length)for(var i=0,o=e.length;o>i;i++)t.push(e[i]);else t.push(e);return t},n.indexOf=Array.prototype.indexOf?function(e,t){return e.indexOf(t)}:function(e,t){for(var i=0,n=e.length;n>i;i++)if(e[i]===t)return i;return-1},n.removeFrom=function(e,t){var i=n.indexOf(e,t);-1!=i&&e.splice(i,1)},n.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(e){return e instanceof HTMLElement}:function(e){return e&&"object"==typeof e&&1==e.nodeType&&"string"==typeof e.nodeName},n.setText=function(){var e;return function(t,i){t[e=e||(void 0!==document.documentElement.textContent?"textContent":"innerText")]=i}}(),n.getParent=function(e,t){for(;e!=document.body;)if(e=e.parentNode,i(e,t))return e},n.getQueryElement=function(e){return"string"==typeof e?document.querySelector(e):e},n.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},n.filterFindElements=function(e,t){for(var o=[],s=0,a=(e=n.makeArray(e)).length;a>s;s++){var r=e[s];if(n.isElement(r))if(t){i(r,t)&&o.push(r);for(var l=r.querySelectorAll(t),d=0,c=l.length;c>d;d++)o.push(l[d])}else o.push(r)}return o},n.debounceMethod=function(e,t,i){var n=e.prototype[t],o=t+"Timeout";e.prototype[t]=function(){var e=this[o];e&&clearTimeout(e);var t=arguments,s=this;this[o]=setTimeout(function(){n.apply(s,t),delete s[o]},i||100)}},n.toDashed=function(e){return e.replace(/(.)([A-Z])/g,function(e,t,i){return t+"-"+i}).toLowerCase()};var s=e.console;return n.htmlInit=function(i,o){t(function(){for(var t=n.toDashed(o),a=document.querySelectorAll(".js-"+t),r="data-"+t+"-options",l=0,d=a.length;d>l;l++){var c,u=a[l],h=u.getAttribute(r);try{c=h&&JSON.parse(h)}catch(e){s&&s.error("Error parsing "+r+" on "+u.nodeName.toLowerCase()+(u.id?"#"+u.id:"")+": "+e);continue}var p=new i(u,c),m=e.jQuery;m&&m.data(u,o,p)}})},n}),function(e,t){"use strict";"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(i,n,o,s){return t(e,i,n,o,s)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils")):(e.Outlayer={},e.Outlayer.Item=t(e,e.EventEmitter,e.getSize,e.getStyleProperty,e.fizzyUIUtils))}(window,function(e,t,i,n,o){"use strict";function s(e,t){e&&(this.element=e,this.layout=t,this.position={x:0,y:0},this._create())}var a=e.getComputedStyle,r=a?function(e){return a(e,null)}:function(e){return e.currentStyle},l=n("transition"),d=n("transform"),c=l&&d,u=!!n("perspective"),h={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[l],p=["transform","transition","transitionDuration","transitionProperty"],m=function(){for(var e={},t=0,i=p.length;i>t;t++){var o=p[t],s=n(o);s&&s!==o&&(e[o]=s)}return e}();o.extend(s.prototype,t.prototype),s.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},s.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},s.prototype.getSize=function(){this.size=i(this.element)},s.prototype.css=function(e){var t=this.element.style;for(var i in e){t[m[i]||i]=e[i]}},s.prototype.getPosition=function(){var e=r(this.element),t=this.layout.options,i=t.isOriginLeft,n=t.isOriginTop,o=e[i?"left":"right"],s=e[n?"top":"bottom"],a=this.layout.size,l=-1!=o.indexOf("%")?parseFloat(o)/100*a.width:parseInt(o,10),d=-1!=s.indexOf("%")?parseFloat(s)/100*a.height:parseInt(s,10);l=isNaN(l)?0:l,d=isNaN(d)?0:d,l-=i?a.paddingLeft:a.paddingRight,d-=n?a.paddingTop:a.paddingBottom,this.position.x=l,this.position.y=d},s.prototype.layoutPosition=function(){var e=this.layout.size,t=this.layout.options,i={},n=t.isOriginLeft?"paddingLeft":"paddingRight",o=t.isOriginLeft?"left":"right",s=t.isOriginLeft?"right":"left",a=this.position.x+e[n];i[o]=this.getXValue(a),i[s]="";var r=t.isOriginTop?"paddingTop":"paddingBottom",l=t.isOriginTop?"top":"bottom",d=t.isOriginTop?"bottom":"top",c=this.position.y+e[r];i[l]=this.getYValue(c),i[d]="",this.css(i),this.emitEvent("layout",[this])},s.prototype.getXValue=function(e){var t=this.layout.options;return t.percentPosition&&!t.isHorizontal?e/this.layout.size.width*100+"%":e+"px"},s.prototype.getYValue=function(e){var t=this.layout.options;return t.percentPosition&&t.isHorizontal?e/this.layout.size.height*100+"%":e+"px"},s.prototype._transitionTo=function(e,t){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(e,10),s=parseInt(t,10),a=o===this.position.x&&s===this.position.y;if(this.setPosition(e,t),!a||this.isTransitioning){var r=e-i,l=t-n,d={};d.transform=this.getTranslate(r,l),this.transition({to:d,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})}else this.layoutPosition()},s.prototype.getTranslate=function(e,t){var i=this.layout.options;return e=i.isOriginLeft?e:-e,t=i.isOriginTop?t:-t,u?"translate3d("+e+"px, "+t+"px, 0)":"translate("+e+"px, "+t+"px)"},s.prototype.goTo=function(e,t){this.setPosition(e,t),this.layoutPosition()},s.prototype.moveTo=c?s.prototype._transitionTo:s.prototype.goTo,s.prototype.setPosition=function(e,t){this.position.x=parseInt(e,10),this.position.y=parseInt(t,10)},s.prototype._nonTransition=function(e){for(var t in this.css(e.to),e.isCleaning&&this._removeStyles(e.to),e.onTransitionEnd)e.onTransitionEnd[t].call(this)},s.prototype._transition=function(e){if(parseFloat(this.layout.options.transitionDuration)){var t=this._transn;for(var i in e.onTransitionEnd)t.onEnd[i]=e.onTransitionEnd[i];for(i in e.to)t.ingProperties[i]=!0,e.isCleaning&&(t.clean[i]=!0);if(e.from){this.css(e.from);this.element.offsetHeight;null}this.enableTransition(e.to),this.css(e.to),this.isTransitioning=!0}else this._nonTransition(e)};var f="opacity,"+function(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})}(m.transform||"transform");s.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:f,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(h,this,!1))},s.prototype.transition=s.prototype[l?"_transition":"_nonTransition"],s.prototype.onwebkitTransitionEnd=function(e){this.ontransitionend(e)},s.prototype.onotransitionend=function(e){this.ontransitionend(e)};var g={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};s.prototype.ontransitionend=function(e){if(e.target===this.element){var t=this._transn,i=g[e.propertyName]||e.propertyName;if(delete t.ingProperties[i],function(e){for(var t in e)return!1;return!0}(t.ingProperties)&&this.disableTransition(),i in t.clean&&(this.element.style[e.propertyName]="",delete t.clean[i]),i in t.onEnd)t.onEnd[i].call(this),delete t.onEnd[i];this.emitEvent("transitionEnd",[this])}},s.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},s.prototype._removeStyles=function(e){var t={};for(var i in e)t[i]="";this.css(t)};var v={transitionProperty:"",transitionDuration:""};return s.prototype.removeTransitionStyles=function(){this.css(v)},s.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},s.prototype.remove=function(){if(l&&parseFloat(this.layout.options.transitionDuration)){var e=this;this.once("transitionEnd",function(){e.removeElem()}),this.hide()}else this.removeElem()},s.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var e=this.layout.options,t={};t[this.getHideRevealTransitionEndProperty("visibleStyle")]=this.onRevealTransitionEnd,this.transition({from:e.hiddenStyle,to:e.visibleStyle,isCleaning:!0,onTransitionEnd:t})},s.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},s.prototype.getHideRevealTransitionEndProperty=function(e){var t=this.layout.options[e];if(t.opacity)return"opacity";for(var i in t)return i},s.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var e=this.layout.options,t={};t[this.getHideRevealTransitionEndProperty("hiddenStyle")]=this.onHideTransitionEnd,this.transition({from:e.visibleStyle,to:e.hiddenStyle,isCleaning:!0,onTransitionEnd:t})},s.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},s.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},s}),function(e,t){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,s,a){return t(e,i,n,o,s,a)}):"object"==typeof exports?module.exports=t(e,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):e.Outlayer=t(e,e.eventie,e.EventEmitter,e.getSize,e.fizzyUIUtils,e.Outlayer.Item)}(window,function(e,t,i,n,o,s){"use strict";function a(e,t){var i=o.getQueryElement(e);if(i){this.element=i,l&&(this.$element=l(this.element)),this.options=o.extend({},this.constructor.defaults),this.option(t);var n=++c;this.element.outlayerGUID=n,u[n]=this,this._create(),this.options.isInitLayout&&this.layout()}else r&&r.error("Bad element for "+this.constructor.namespace+": "+(i||e))}var r=e.console,l=e.jQuery,d=function(){},c=0,u={};return a.namespace="outlayer",a.Item=s,a.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},o.extend(a.prototype,i.prototype),a.prototype.option=function(e){o.extend(this.options,e)},a.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),o.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},a.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},a.prototype._itemize=function(e){for(var t=this._filterFindItemElements(e),i=this.constructor.Item,n=[],o=0,s=t.length;s>o;o++){var a=new i(t[o],this);n.push(a)}return n},a.prototype._filterFindItemElements=function(e){return o.filterFindElements(e,this.options.itemSelector)},a.prototype.getItemElements=function(){for(var e=[],t=0,i=this.items.length;i>t;t++)e.push(this.items[t].element);return e},a.prototype.layout=function(){this._resetLayout(),this._manageStamps();var e=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},a.prototype._init=a.prototype.layout,a.prototype._resetLayout=function(){this.getSize()},a.prototype.getSize=function(){this.size=n(this.element)},a.prototype._getMeasurement=function(e,t){var i,s=this.options[e];s?("string"==typeof s?i=this.element.querySelector(s):o.isElement(s)&&(i=s),this[e]=i?n(i)[t]:s):this[e]=0},a.prototype.layoutItems=function(e,t){e=this._getItemsForLayout(e),this._layoutItems(e,t),this._postLayout()},a.prototype._getItemsForLayout=function(e){for(var t=[],i=0,n=e.length;n>i;i++){var o=e[i];o.isIgnored||t.push(o)}return t},a.prototype._layoutItems=function(e,t){if(this._emitCompleteOnItems("layout",e),e&&e.length){for(var i=[],n=0,o=e.length;o>n;n++){var s=e[n],a=this._getItemLayoutPosition(s);a.item=s,a.isInstant=t||s.isLayoutInstant,i.push(a)}this._processLayoutQueue(i)}},a.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},a.prototype._processLayoutQueue=function(e){for(var t=0,i=e.length;i>t;t++){var n=e[t];this._positionItem(n.item,n.x,n.y,n.isInstant)}},a.prototype._positionItem=function(e,t,i,n){n?e.goTo(t,i):e.moveTo(t,i)},a.prototype._postLayout=function(){this.resizeContainer()},a.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},a.prototype._getContainerSize=d,a.prototype._setContainerMeasure=function(e,t){if(void 0!==e){var i=this.size;i.isBorderBox&&(e+=t?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),e=Math.max(e,0),this.element.style[t?"width":"height"]=e+"px"}},a.prototype._emitCompleteOnItems=function(e,t){function i(){o.dispatchEvent(e+"Complete",null,[t])}function n(){++a===s&&i()}var o=this,s=t.length;if(t&&s)for(var a=0,r=0,l=t.length;l>r;r++){t[r].once(e,n)}else i()},a.prototype.dispatchEvent=function(e,t,i){var n=t?[t].concat(i):i;if(this.emitEvent(e,n),l)if(this.$element=this.$element||l(this.element),t){var o=l.Event(t);o.type=e,this.$element.trigger(o,i)}else this.$element.trigger(e,i)},a.prototype.ignore=function(e){var t=this.getItem(e);t&&(t.isIgnored=!0)},a.prototype.unignore=function(e){var t=this.getItem(e);t&&delete t.isIgnored},a.prototype.stamp=function(e){if(e=this._find(e)){this.stamps=this.stamps.concat(e);for(var t=0,i=e.length;i>t;t++){var n=e[t];this.ignore(n)}}},a.prototype.unstamp=function(e){if(e=this._find(e))for(var t=0,i=e.length;i>t;t++){var n=e[t];o.removeFrom(this.stamps,n),this.unignore(n)}},a.prototype._find=function(e){return e?("string"==typeof e&&(e=this.element.querySelectorAll(e)),e=o.makeArray(e)):void 0},a.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var e=0,t=this.stamps.length;t>e;e++){var i=this.stamps[e];this._manageStamp(i)}}},a.prototype._getBoundingRect=function(){var e=this.element.getBoundingClientRect(),t=this.size;this._boundingRect={left:e.left+t.paddingLeft+t.borderLeftWidth,top:e.top+t.paddingTop+t.borderTopWidth,right:e.right-(t.paddingRight+t.borderRightWidth),bottom:e.bottom-(t.paddingBottom+t.borderBottomWidth)}},a.prototype._manageStamp=d,a.prototype._getElementOffset=function(e){var t=e.getBoundingClientRect(),i=this._boundingRect,o=n(e);return{left:t.left-i.left-o.marginLeft,top:t.top-i.top-o.marginTop,right:i.right-t.right-o.marginRight,bottom:i.bottom-t.bottom-o.marginBottom}},a.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},a.prototype.bindResize=function(){this.isResizeBound||(t.bind(e,"resize",this),this.isResizeBound=!0)},a.prototype.unbindResize=function(){this.isResizeBound&&t.unbind(e,"resize",this),this.isResizeBound=!1},a.prototype.onresize=function(){this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(function(){e.resize(),delete e.resizeTimeout},100)},a.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},a.prototype.needsResizeLayout=function(){var e=n(this.element);return this.size&&e&&e.innerWidth!==this.size.innerWidth},a.prototype.addItems=function(e){var t=this._itemize(e);return t.length&&(this.items=this.items.concat(t)),t},a.prototype.appended=function(e){var t=this.addItems(e);t.length&&(this.layoutItems(t,!0),this.reveal(t))},a.prototype.prepended=function(e){var t=this._itemize(e);if(t.length){var i=this.items.slice(0);this.items=t.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(t,!0),this.reveal(t),this.layoutItems(i)}},a.prototype.reveal=function(e){this._emitCompleteOnItems("reveal",e);for(var t=e&&e.length,i=0;t&&t>i;i++){e[i].reveal()}},a.prototype.hide=function(e){this._emitCompleteOnItems("hide",e);for(var t=e&&e.length,i=0;t&&t>i;i++){e[i].hide()}},a.prototype.revealItemElements=function(e){var t=this.getItems(e);this.reveal(t)},a.prototype.hideItemElements=function(e){var t=this.getItems(e);this.hide(t)},a.prototype.getItem=function(e){for(var t=0,i=this.items.length;i>t;t++){var n=this.items[t];if(n.element===e)return n}},a.prototype.getItems=function(e){for(var t=[],i=0,n=(e=o.makeArray(e)).length;n>i;i++){var s=e[i],a=this.getItem(s);a&&t.push(a)}return t},a.prototype.remove=function(e){var t=this.getItems(e);if(this._emitCompleteOnItems("remove",t),t&&t.length)for(var i=0,n=t.length;n>i;i++){var s=t[i];s.remove(),o.removeFrom(this.items,s)}},a.prototype.destroy=function(){var e=this.element.style;e.height="",e.position="",e.width="";for(var t=0,i=this.items.length;i>t;t++){this.items[t].destroy()}this.unbindResize();var n=this.element.outlayerGUID;delete u[n],delete this.element.outlayerGUID,l&&l.removeData(this.element,this.constructor.namespace)},a.data=function(e){var t=(e=o.getQueryElement(e))&&e.outlayerGUID;return t&&u[t]},a.create=function(e,t){function i(){a.apply(this,arguments)}return Object.create?i.prototype=Object.create(a.prototype):o.extend(i.prototype,a.prototype),i.prototype.constructor=i,i.defaults=o.extend({},a.defaults),o.extend(i.defaults,t),i.prototype.settings={},i.namespace=e,i.data=a.data,i.Item=function(){s.apply(this,arguments)},i.Item.prototype=new s,o.htmlInit(i,e),l&&l.bridget&&l.bridget(e,i),i},a.Item=s,a}),function(e,t){"use strict";"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],t):"object"==typeof exports?module.exports=t(require("outlayer")):(e.Isotope=e.Isotope||{},e.Isotope.Item=t(e.Outlayer))}(window,function(e){"use strict";function t(){e.Item.apply(this,arguments)}t.prototype=new e.Item,t.prototype._create=function(){this.id=this.layout.itemGUID++,e.Item.prototype._create.call(this),this.sortData={}},t.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var e=this.layout.options.getSortData,t=this.layout._sorters;for(var i in e){var n=t[i];this.sortData[i]=n(this.element,this)}}};var i=t.prototype.destroy;return t.prototype.destroy=function(){i.apply(this,arguments),this.css({display:""})},t}),function(e,t){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],t):"object"==typeof exports?module.exports=t(require("get-size"),require("outlayer")):(e.Isotope=e.Isotope||{},e.Isotope.LayoutMode=t(e.getSize,e.Outlayer))}(window,function(e,t){"use strict";function i(e){this.isotope=e,e&&(this.options=e.options[this.namespace],this.element=e.element,this.items=e.filteredItems,this.size=e.size)}return function(){function e(e){return function(){return t.prototype[e].apply(this.isotope,arguments)}}for(var n=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],o=0,s=n.length;s>o;o++){var a=n[o];i.prototype[a]=e(a)}}(),i.prototype.needsVerticalResizeLayout=function(){var t=e(this.isotope.element);return this.isotope.size&&t&&t.innerHeight!=this.isotope.size.innerHeight},i.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},i.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},i.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},i.prototype.getSegmentSize=function(e,t){var i=e+t,n="outer"+t;if(this._getMeasurement(i,n),!this[i]){var o=this.getFirstItemSize();this[i]=o&&o[n]||this.isotope.size["inner"+t]}},i.prototype.getFirstItemSize=function(){var t=this.isotope.filteredItems[0];return t&&t.element&&e(t.element)},i.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},i.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(e,t){function n(){i.apply(this,arguments)}return n.prototype=new i,t&&(n.options=t),n.prototype.namespace=e,i.modes[e]=n,n},i}),function(e,t){"use strict";"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],t):"object"==typeof exports?module.exports=t(require("outlayer"),require("get-size"),require("fizzy-ui-utils")):e.Masonry=t(e.Outlayer,e.getSize,e.fizzyUIUtils)}(window,function(e,t,i){var n=e.create("masonry");return n.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var e=this.cols;for(this.colYs=[];e--;)this.colYs.push(0);this.maxY=0},n.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var e=this.items[0],i=e&&e.element;this.columnWidth=i&&t(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,s=o/n,a=n-o%n;s=Math[a&&1>a?"round":"floor"](s),this.cols=Math.max(s,1)},n.prototype.getContainerWidth=function(){var e=this.options.isFitWidth?this.element.parentNode:this.element,i=t(e);this.containerWidth=i&&i.innerWidth},n.prototype._getItemLayoutPosition=function(e){e.getSize();var t=e.size.outerWidth%this.columnWidth,n=Math[t&&1>t?"round":"ceil"](e.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this._getColGroup(n),s=Math.min.apply(Math,o),a=i.indexOf(o,s),r={x:this.columnWidth*a,y:s},l=s+e.size.outerHeight,d=this.cols+1-o.length,c=0;d>c;c++)this.colYs[a+c]=l;return r},n.prototype._getColGroup=function(e){if(2>e)return this.colYs;for(var t=[],i=this.cols+1-e,n=0;i>n;n++){var o=this.colYs.slice(n,n+e);t[n]=Math.max.apply(Math,o)}return t},n.prototype._manageStamp=function(e){var i=t(e),n=this._getElementOffset(e),o=this.options.isOriginLeft?n.left:n.right,s=o+i.outerWidth,a=Math.floor(o/this.columnWidth);a=Math.max(0,a);var r=Math.floor(s/this.columnWidth);r-=s%this.columnWidth?0:1,r=Math.min(this.cols-1,r);for(var l=(this.options.isOriginTop?n.top:n.bottom)+i.outerHeight,d=a;r>=d;d++)this.colYs[d]=Math.max(l,this.colYs[d])},n.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var e={height:this.maxY};return this.options.isFitWidth&&(e.width=this._getContainerFitWidth()),e},n.prototype._getContainerFitWidth=function(){for(var e=0,t=this.cols;--t&&0===this.colYs[t];)e++;return(this.cols-e)*this.columnWidth-this.gutter},n.prototype.needsResizeLayout=function(){var e=this.containerWidth;return this.getContainerWidth(),e!==this.containerWidth},n}),function(e,t){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],t):"object"==typeof exports?module.exports=t(require("../layout-mode"),require("masonry-layout")):t(e.Isotope.LayoutMode,e.Masonry)}(window,function(e,t){"use strict";var i=e.create("masonry"),n=i.prototype._getElementOffset,o=i.prototype.layout,s=i.prototype._getMeasurement;(function(e,t){for(var i in t)e[i]=t[i]})(i.prototype,t.prototype),i.prototype._getElementOffset=n,i.prototype.layout=o,i.prototype._getMeasurement=s;var a=i.prototype.measureColumns;i.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,a.call(this)};var r=i.prototype._manageStamp;return i.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,r.apply(this,arguments)},i}),function(e,t){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],t):"object"==typeof exports?module.exports=t(require("../layout-mode")):t(e.Isotope.LayoutMode)}(window,function(e){"use strict";var t=e.create("fitRows");return t.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},t.prototype._getItemLayoutPosition=function(e){e.getSize();var t=e.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&t+this.x>i&&(this.x=0,this.y=this.maxY);var n={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+e.size.outerHeight),this.x+=t,n},t.prototype._getContainerSize=function(){return{height:this.maxY}},t}),function(e,t){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],t):"object"==typeof exports?module.exports=t(require("../layout-mode")):t(e.Isotope.LayoutMode)}(window,function(e){"use strict";var t=e.create("vertical",{horizontalAlignment:0});return t.prototype._resetLayout=function(){this.y=0},t.prototype._getItemLayoutPosition=function(e){e.getSize();var t=(this.isotope.size.innerWidth-e.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=e.size.outerHeight,{x:t,y:i}},t.prototype._getContainerSize=function(){return{height:this.y}},t}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(i,n,o,s,a,r){return t(e,i,n,o,s,a,r)}):"object"==typeof exports?module.exports=t(e,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("./item"),require("./layout-mode"),require("./layout-modes/masonry"),require("./layout-modes/fit-rows"),require("./layout-modes/vertical")):e.Isotope=t(e,e.Outlayer,e.getSize,e.matchesSelector,e.fizzyUIUtils,e.Isotope.Item,e.Isotope.LayoutMode)}(window,function(e,t,i,n,o,s,a){var r=e.jQuery,l=String.prototype.trim?function(e){return e.trim()}:function(e){return e.replace(/^\s+|\s+$/g,"")},d=document.documentElement.textContent?function(e){return e.textContent}:function(e){return e.innerText},c=t.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});c.Item=s,c.LayoutMode=a,c.prototype._create=function(){for(var e in this.itemGUID=0,this._sorters={},this._getSorters(),t.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"],a.modes)this._initLayoutMode(e)},c.prototype.reloadItems=function(){this.itemGUID=0,t.prototype.reloadItems.call(this)},c.prototype._itemize=function(){for(var e=t.prototype._itemize.apply(this,arguments),i=0,n=e.length;n>i;i++){e[i].id=this.itemGUID++}return this._updateItemsSortData(e),e},c.prototype._initLayoutMode=function(e){var t=a.modes[e],i=this.options[e]||{};this.options[e]=t.options?o.extend(t.options,i):i,this.modes[e]=new t(this)},c.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?void this.arrange():void this._layout()},c.prototype._layout=function(){var e=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,e),this._isLayoutInited=!0},c.prototype.arrange=function(e){function t(){n.reveal(i.needReveal),n.hide(i.needHide)}this.option(e),this._getIsInstant();var i=this._filter(this.items);this.filteredItems=i.matches;var n=this;this._bindArrangeComplete(),this._isInstant?this._noTransition(t):t(),this._sort(),this._layout()},c.prototype._init=c.prototype.arrange,c.prototype._getIsInstant=function(){var e=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=e,e},c.prototype._bindArrangeComplete=function(){function e(){t&&i&&n&&o.dispatchEvent("arrangeComplete",null,[o.filteredItems])}var t,i,n,o=this;this.once("layoutComplete",function(){t=!0,e()}),this.once("hideComplete",function(){i=!0,e()}),this.once("revealComplete",function(){n=!0,e()})},c.prototype._filter=function(e){var t=this.options.filter;t=t||"*";for(var i=[],n=[],o=[],s=this._getFilterTest(t),a=0,r=e.length;r>a;a++){var l=e[a];if(!l.isIgnored){var d=s(l);d&&i.push(l),d&&l.isHidden?n.push(l):d||l.isHidden||o.push(l)}}return{matches:i,needReveal:n,needHide:o}},c.prototype._getFilterTest=function(e){return r&&this.options.isJQueryFiltering?function(t){return r(t.element).is(e)}:"function"==typeof e?function(t){return e(t.element)}:function(t){return n(t.element,e)}},c.prototype.updateSortData=function(e){var t;e?(e=o.makeArray(e),t=this.getItems(e)):t=this.items,this._getSorters(),this._updateItemsSortData(t)},c.prototype._getSorters=function(){var e=this.options.getSortData;for(var t in e){var i=e[t];this._sorters[t]=u(i)}},c.prototype._updateItemsSortData=function(e){for(var t=e&&e.length,i=0;t&&t>i;i++){e[i].updateSortData()}};var u=function(){return function(e){if("string"!=typeof e)return e;var t=l(e).split(" "),i=t[0],n=i.match(/^\[(.+)\]$/),o=function(e,t){return e?function(t){return t.getAttribute(e)}:function(e){var i=e.querySelector(t);return i&&d(i)}}(n&&n[1],i),s=c.sortDataParsers[t[1]];return s?function(e){return e&&s(o(e))}:function(e){return e&&o(e)}}}();c.sortDataParsers={parseInt:function(e){return parseInt(e,10)},parseFloat:function(e){return parseFloat(e)}},c.prototype._sort=function(){var e=this.options.sortBy;if(e){var t=function(e,t){return function(i,n){for(var o=0,s=e.length;s>o;o++){var a=e[o],r=i.sortData[a],l=n.sortData[a];if(r>l||l>r)return(r>l?1:-1)*((void 0!==t[a]?t[a]:t)?1:-1)}return 0}}([].concat.apply(e,this.sortHistory),this.options.sortAscending);this.filteredItems.sort(t),e!=this.sortHistory[0]&&this.sortHistory.unshift(e)}},c.prototype._mode=function(){var e=this.options.layoutMode,t=this.modes[e];if(!t)throw new Error("No layout mode: "+e);return t.options=this.options[e],t},c.prototype._resetLayout=function(){t.prototype._resetLayout.call(this),this._mode()._resetLayout()},c.prototype._getItemLayoutPosition=function(e){return this._mode()._getItemLayoutPosition(e)},c.prototype._manageStamp=function(e){this._mode()._manageStamp(e)},c.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},c.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},c.prototype.appended=function(e){var t=this.addItems(e);if(t.length){var i=this._filterRevealAdded(t);this.filteredItems=this.filteredItems.concat(i)}},c.prototype.prepended=function(e){var t=this._itemize(e);if(t.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(t);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=t.concat(this.items)}},c.prototype._filterRevealAdded=function(e){var t=this._filter(e);return this.hide(t.needHide),this.reveal(t.matches),this.layoutItems(t.matches,!0),t.matches},c.prototype.insert=function(e){var t=this.addItems(e);if(t.length){var i,n,o=t.length;for(i=0;o>i;i++)n=t[i],this.element.appendChild(n.element);var s=this._filter(t).matches;for(i=0;o>i;i++)t[i].isLayoutInstant=!0;for(this.arrange(),i=0;o>i;i++)delete t[i].isLayoutInstant;this.reveal(s)}};var h=c.prototype.remove;return c.prototype.remove=function(e){e=o.makeArray(e);var t=this.getItems(e);h.call(this,e);var i=t&&t.length;if(i)for(var n=0;i>n;n++){var s=t[n];o.removeFrom(this.filteredItems,s)}},c.prototype.shuffle=function(){for(var e=0,t=this.items.length;t>e;e++){this.items[e].sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},c.prototype._noTransition=function(e){var t=this.options.transitionDuration;this.options.transitionDuration=0;var i=e.call(this);return this.options.transitionDuration=t,i},c.prototype.getFilteredItemElements=function(){for(var e=[],t=0,i=this.filteredItems.length;i>t;t++)e.push(this.filteredItems[t].element);return e},c}),function(e,t,i,n){var o=function(n,o){this.elem=n,this.$elem=e(n),this.options=o,this.metadata=this.$elem.data("plugin-options"),this.$win=e(t),this.sections={},this.didScroll=!1,this.$doc=e(i),this.docHeight=this.$doc.height()};o.prototype={defaults:{navItems:"a",currentClass:"current",changeHash:!1,easing:"swing",filter:"",scrollSpeed:750,scrollThreshold:.5,begin:!1,end:!1,scrollChange:!1},init:function(){return this.config=e.extend({},this.defaults,this.options,this.metadata),this.$nav=this.$elem.find(this.config.navItems),""!==this.config.filter&&(this.$nav=this.$nav.filter(this.config.filter)),this.$nav.on("click.onePageNav",e.proxy(this.handleClick,this)),this.getPositions(),this.bindInterval(),this.$win.on("resize.onePageNav",e.proxy(this.getPositions,this)),this},adjustNav:function(e,t){e.$elem.find("."+e.config.currentClass).removeClass(e.config.currentClass),t.addClass(e.config.currentClass)},bindInterval:function(){var e,t=this;t.$win.on("scroll.onePageNav",function(){t.didScroll=!0}),t.t=setInterval(function(){e=t.$doc.height(),t.didScroll&&(t.didScroll=!1,t.scrollChange()),e!==t.docHeight&&(t.docHeight=e,t.getPositions())},250)},getHash:function(e){return e.attr("href").split("#")[1]},getPositions:function(){var t,i,n,o=this;o.$nav.each(function(){t=o.getHash(e(this)),(n=e("#"+t)).length&&(i=n.offset().top,o.sections[t]=Math.round(i))})},getSection:function(e){var t=null,i=Math.round(this.$win.height()*this.config.scrollThreshold);for(var n in this.sections)this.sections[n]-i<e&&(t=n);return t},handleClick:function(i){var n=this,o=e(i.currentTarget),s=o.parent(),a="#"+n.getHash(o);s.hasClass(n.config.currentClass)||(n.config.begin&&n.config.begin(),n.adjustNav(n,s),n.unbindInterval(),n.scrollTo(a,function(){n.config.changeHash&&(t.location.hash=a),n.bindInterval(),n.config.end&&n.config.end()})),i.preventDefault()},scrollChange:function(){var e,t=this.$win.scrollTop(),i=this.getSection(t);null!==i&&((e=this.$elem.find('a[href$="#'+i+'"]').parent()).hasClass(this.config.currentClass)||(this.adjustNav(this,e),this.config.scrollChange&&this.config.scrollChange(e)))},scrollTo:function(t,i){var n=e(t).offset().top;e("html, body").animate({scrollTop:n},this.config.scrollSpeed,this.config.easing,i)},unbindInterval:function(){clearInterval(this.t),this.$win.unbind("scroll.onePageNav")}},o.defaults=o.prototype.defaults,e.fn.onePageNav=function(e){return this.each(function(){new o(this,e).init()})}}(jQuery,window,document),function(e){function t(){s=!1;for(var t=0,i=n.length;i>t;t++){var o=e(n[t]).filter(function(){return e(this).is(":appeared")});if(o.trigger("appear",[o]),l[t]){var a=l[t].not(o);a.trigger("disappear",[a])}l[t]=o}}function i(e){n.push(e),l.push()}var n=[],o=!1,s=!1,a={interval:250,force_process:!1},r=e(window),l=[];e.expr[":"].appeared=function(t){var i=e(t);if(!i.is(":visible"))return!1;var n=r.scrollLeft(),o=r.scrollTop(),s=i.offset(),a=s.left,l=s.top;return l+i.height()>=o&&l-(i.data("appear-top-offset")||0)<=o+r.height()&&a+i.width()>=n&&a-(i.data("appear-left-offset")||0)<=n+r.width()},e.fn.extend({appear:function(n){var r=e.extend({},a,n||{}),l=this.selector||this;if(!o){var d=function(){s||(s=!0,setTimeout(t,r.interval))};e(window).scroll(d).resize(d),o=!0}return r.force_process&&setTimeout(t,r.interval),i(l),e(l)}}),e.extend({force_appear:function(){return!!o&&(t(),!0)}})}("undefined"!=typeof module?require("jquery"):jQuery),function(e){var t={},n={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};e.fn.bxSlider=function(o){if(0==this.length)return this;if(this.length>1)return this.each(function(){e(this).bxSlider(o)}),this;var s={},a=this;t.el=this;var r=e(window).width(),l=e(window).height(),d=function(){s.settings=e.extend({},n,o),s.settings.slideWidth=parseInt(s.settings.slideWidth),s.children=a.children(s.settings.slideSelector),s.children.length<s.settings.minSlides&&(s.settings.minSlides=s.children.length),s.children.length<s.settings.maxSlides&&(s.settings.maxSlides=s.children.length),s.settings.randomStart&&(s.settings.startSlide=Math.floor(Math.random()*s.children.length)),s.active={index:s.settings.startSlide},s.carousel=s.settings.minSlides>1||s.settings.maxSlides>1,s.carousel&&(s.settings.preloadImages="all"),s.minThreshold=s.settings.minSlides*s.settings.slideWidth+(s.settings.minSlides-1)*s.settings.slideMargin,s.maxThreshold=s.settings.maxSlides*s.settings.slideWidth+(s.settings.maxSlides-1)*s.settings.slideMargin,s.working=!1,s.controls={},s.interval=null,s.animProp="vertical"==s.settings.mode?"top":"left",s.usingCSS=s.settings.useCSS&&"fade"!=s.settings.mode&&function(){var e=document.createElement("div"),t=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in t)if(void 0!==e.style[t[i]])return s.cssPrefix=t[i].replace("Perspective","").toLowerCase(),s.animProp="-"+s.cssPrefix+"-transform",!0;return!1}(),"vertical"==s.settings.mode&&(s.settings.maxSlides=s.settings.minSlides),a.data("origStyle",a.attr("style")),a.children(s.settings.slideSelector).each(function(){e(this).data("origStyle",e(this).attr("style"))}),c()},c=function(){a.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),s.viewport=a.parent(),s.loader=e('<div class="bx-loading" />'),s.viewport.prepend(s.loader),a.css({width:"horizontal"==s.settings.mode?100*s.children.length+215+"%":"auto",position:"relative"}),s.usingCSS&&s.settings.easing?a.css("-"+s.cssPrefix+"-transition-timing-function",s.settings.easing):s.settings.easing||(s.settings.easing="swing"),g(),s.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),s.viewport.parent().css({maxWidth:m()}),s.settings.pager||s.viewport.parent().css({margin:"0 auto 0px"}),s.children.css({float:"horizontal"==s.settings.mode?"left":"none",listStyle:"none",position:"relative"}),s.children.css("width",f()),"horizontal"==s.settings.mode&&s.settings.slideMargin>0&&s.children.css("marginRight",s.settings.slideMargin),"vertical"==s.settings.mode&&s.settings.slideMargin>0&&s.children.css("marginBottom",s.settings.slideMargin),"fade"==s.settings.mode&&(s.children.css({position:"absolute",zIndex:0,display:"none"}),s.children.eq(s.settings.startSlide).css({zIndex:s.settings.slideZIndex,display:"block"})),s.controls.el=e('<div class="bx-controls" />'),s.settings.captions&&k(),s.active.last=s.settings.startSlide==v()-1,s.settings.video&&a.fitVids();var t=s.children.eq(s.settings.startSlide);"all"==s.settings.preloadImages&&(t=s.children),s.settings.ticker?s.settings.pager=!1:(s.settings.pager&&S(),s.settings.controls&&C(),s.settings.auto&&s.settings.autoControls&&T(),(s.settings.controls||s.settings.autoControls||s.settings.pager)&&s.viewport.after(s.controls.el)),u(t,h)},u=function(t,i){var n=t.find("img, iframe").length;if(0!=n){var o=0;t.find("img, iframe").each(function(){e(this).one("load",function(){++o==n&&i()}).each(function(){this.complete&&e(this).load()})})}else i()},h=function(){if(s.settings.infiniteLoop&&"fade"!=s.settings.mode&&!s.settings.ticker){var t="vertical"==s.settings.mode?s.settings.minSlides:s.settings.maxSlides,i=s.children.slice(0,t).clone().addClass("bx-clone"),n=s.children.slice(-t).clone().addClass("bx-clone");a.append(i).prepend(n)}s.loader.remove(),b(),"vertical"==s.settings.mode&&(s.settings.adaptiveHeight=!0),s.viewport.height(p()),a.redrawSlider(),s.settings.onSliderLoad(s.active.index),s.initialized=!0,s.settings.responsive&&e(window).bind("resize",N),s.settings.auto&&s.settings.autoStart&&D(),s.settings.ticker&&z(),s.settings.pager&&P(s.settings.startSlide),s.settings.controls&&A(),s.settings.touchEnabled&&!s.settings.ticker&&W()},p=function(){var t=0,n=e();if("vertical"==s.settings.mode||s.settings.adaptiveHeight)if(s.carousel){var o=1==s.settings.moveSlides?s.active.index:s.active.index*y();for(n=s.children.eq(o),i=1;i<=s.settings.maxSlides-1;i++)n=o+i>=s.children.length?n.add(s.children.eq(i-1)):n.add(s.children.eq(o+i))}else n=s.children.eq(s.active.index);else n=s.children;return"vertical"==s.settings.mode?(n.each(function(){t+=e(this).outerHeight()}),s.settings.slideMargin>0&&(t+=s.settings.slideMargin*(s.settings.minSlides-1))):t=Math.max.apply(Math,n.map(function(){return e(this).outerHeight(!1)}).get()),t},m=function(){var e="100%";return s.settings.slideWidth>0&&(e="horizontal"==s.settings.mode?s.settings.maxSlides*s.settings.slideWidth+(s.settings.maxSlides-1)*s.settings.slideMargin:s.settings.slideWidth),e},f=function(){var e=s.settings.slideWidth,t=s.viewport.width();return 0==s.settings.slideWidth||s.settings.slideWidth>t&&!s.carousel||"vertical"==s.settings.mode?e=t:s.settings.maxSlides>1&&"horizontal"==s.settings.mode&&(t>s.maxThreshold||t<s.minThreshold&&(e=(t-s.settings.slideMargin*(s.settings.minSlides-1))/s.settings.minSlides)),e},g=function(){var e=1;if("horizontal"==s.settings.mode&&s.settings.slideWidth>0)if(s.viewport.width()<s.minThreshold)e=s.settings.minSlides;else if(s.viewport.width()>s.maxThreshold)e=s.settings.maxSlides;else{var t=s.children.first().width();e=Math.floor(s.viewport.width()/t)}else"vertical"==s.settings.mode&&(e=s.settings.minSlides);return e},v=function(){var e=0;if(s.settings.moveSlides>0)if(s.settings.infiniteLoop)e=s.children.length/y();else for(var t=0,i=0;t<s.children.length;)++e,t=i+g(),i+=s.settings.moveSlides<=g()?s.settings.moveSlides:g();else e=Math.ceil(s.children.length/g());return e},y=function(){return s.settings.moveSlides>0&&s.settings.moveSlides<=g()?s.settings.moveSlides:g()},b=function(){if(s.children.length>s.settings.maxSlides&&s.active.last&&!s.settings.infiniteLoop){if("horizontal"==s.settings.mode){var e=s.children.last(),t=e.position();w(-(t.left-(s.viewport.width()-e.width())),"reset",0)}else if("vertical"==s.settings.mode){var i=s.children.length-s.settings.minSlides;t=s.children.eq(i).position();w(-t.top,"reset",0)}}else{t=s.children.eq(s.active.index*y()).position();s.active.index==v()-1&&(s.active.last=!0),null!=t&&("horizontal"==s.settings.mode?w(-t.left,"reset",0):"vertical"==s.settings.mode&&w(-t.top,"reset",0))}},w=function(e,t,i,n){if(s.usingCSS){var o="vertical"==s.settings.mode?"translate3d(0, "+e+"px, 0)":"translate3d("+e+"px, 0, 0)";a.css("-"+s.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==t?(a.css(s.animProp,o),a.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){a.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),F()})):"reset"==t?a.css(s.animProp,o):"ticker"==t&&(a.css("-"+s.cssPrefix+"-transition-timing-function","linear"),a.css(s.animProp,o),a.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){a.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),w(n.resetValue,"reset",0),B()}))}else{var r={};r[s.animProp]=e,"slide"==t?a.animate(r,i,s.settings.easing,function(){F()}):"reset"==t?a.css(s.animProp,e):"ticker"==t&&a.animate(r,speed,"linear",function(){w(n.resetValue,"reset",0),B()})}},x=function(){for(var t="",i=v(),n=0;i>n;n++){var o="";s.settings.buildPager&&e.isFunction(s.settings.buildPager)?(o=s.settings.buildPager(n),s.pagerEl.addClass("bx-custom-pager")):(o=n+1,s.pagerEl.addClass("bx-default-pager")),t+='<div class="bx-pager-item"><a href="" data-slide-index="'+n+'" class="bx-pager-link">'+o+"</a></div>"}s.pagerEl.html(t)},S=function(){s.settings.pagerCustom?s.pagerEl=e(s.settings.pagerCustom):(s.pagerEl=e('<div class="bx-pager" />'),s.settings.pagerSelector?e(s.settings.pagerSelector).html(s.pagerEl):s.controls.el.addClass("bx-has-pager").append(s.pagerEl),x()),s.pagerEl.on("click","a",M)},C=function(){s.controls.next=e('<a class="bx-next" href="">'+s.settings.nextText+"</a>"),s.controls.prev=e('<a class="bx-prev" href="">'+s.settings.prevText+"</a>"),s.controls.next.bind("click",j),s.controls.prev.bind("click",_),s.settings.nextSelector&&e(s.settings.nextSelector).append(s.controls.next),s.settings.prevSelector&&e(s.settings.prevSelector).append(s.controls.prev),s.settings.nextSelector||s.settings.prevSelector||(s.controls.directionEl=e('<div class="bx-controls-direction" />'),s.controls.directionEl.append(s.controls.prev).append(s.controls.next),s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl))},T=function(){s.controls.start=e('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+s.settings.startText+"</a></div>"),s.controls.stop=e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+s.settings.stopText+"</a></div>"),s.controls.autoEl=e('<div class="bx-controls-auto" />'),s.controls.autoEl.on("click",".bx-start",E),s.controls.autoEl.on("click",".bx-stop",I),s.settings.autoControlsCombine?s.controls.autoEl.append(s.controls.start):s.controls.autoEl.append(s.controls.start).append(s.controls.stop),s.settings.autoControlsSelector?e(s.settings.autoControlsSelector).html(s.controls.autoEl):s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl),L(s.settings.autoStart?"stop":"start")},k=function(){s.children.each(function(){var t=e(this).find("img:first").attr("title");null!=t&&(""+t).length&&e(this).append('<div class="bx-caption"><span>'+t+"</span></div>")})},j=function(e){s.settings.auto&&a.stopAuto(),a.goToNextSlide(),e.preventDefault()},_=function(e){s.settings.auto&&a.stopAuto(),a.goToPrevSlide(),e.preventDefault()},E=function(e){a.startAuto(),e.preventDefault()},I=function(e){a.stopAuto(),e.preventDefault()},M=function(t){s.settings.auto&&a.stopAuto();var i=e(t.currentTarget),n=parseInt(i.attr("data-slide-index"));n!=s.active.index&&a.goToSlide(n),t.preventDefault()},P=function(t){var i=s.children.length;return"short"==s.settings.pagerType?(s.settings.maxSlides>1&&(i=Math.ceil(s.children.length/s.settings.maxSlides)),void s.pagerEl.html(t+1+s.settings.pagerShortSeparator+i)):(s.pagerEl.find("a").removeClass("active"),void s.pagerEl.each(function(i,n){e(n).find("a").eq(t).addClass("active")}))},F=function(){if(s.settings.infiniteLoop){var e="";0==s.active.index?e=s.children.eq(0).position():s.active.index==v()-1&&s.carousel?e=s.children.eq((v()-1)*y()).position():s.active.index==s.children.length-1&&(e=s.children.eq(s.children.length-1).position()),e&&("horizontal"==s.settings.mode?w(-e.left,"reset",0):"vertical"==s.settings.mode&&w(-e.top,"reset",0))}s.working=!1,s.settings.onSlideAfter(s.children.eq(s.active.index),s.oldIndex,s.active.index)},L=function(e){s.settings.autoControlsCombine?s.controls.autoEl.html(s.controls[e]):(s.controls.autoEl.find("a").removeClass("active"),s.controls.autoEl.find("a:not(.bx-"+e+")").addClass("active"))},A=function(){1==v()?(s.controls.prev.addClass("disabled"),s.controls.next.addClass("disabled")):!s.settings.infiniteLoop&&s.settings.hideControlOnEnd&&(0==s.active.index?(s.controls.prev.addClass("disabled"),s.controls.next.removeClass("disabled")):s.active.index==v()-1?(s.controls.next.addClass("disabled"),s.controls.prev.removeClass("disabled")):(s.controls.prev.removeClass("disabled"),s.controls.next.removeClass("disabled")))},D=function(){s.settings.autoDelay>0?setTimeout(a.startAuto,s.settings.autoDelay):a.startAuto(),s.settings.autoHover&&a.hover(function(){s.interval&&(a.stopAuto(!0),s.autoPaused=!0)},function(){s.autoPaused&&(a.startAuto(!0),s.autoPaused=null)})},z=function(){var t=0;if("next"==s.settings.autoDirection)a.append(s.children.clone().addClass("bx-clone"));else{a.prepend(s.children.clone().addClass("bx-clone"));var i=s.children.first().position();t="horizontal"==s.settings.mode?-i.left:-i.top}w(t,"reset",0),s.settings.pager=!1,s.settings.controls=!1,s.settings.autoControls=!1,s.settings.tickerHover&&!s.usingCSS&&s.viewport.hover(function(){a.stop()},function(){var t=0;s.children.each(function(){t+="horizontal"==s.settings.mode?e(this).outerWidth(!0):e(this).outerHeight(!0)});var i=s.settings.speed/t,n="horizontal"==s.settings.mode?"left":"top",o=i*(t-Math.abs(parseInt(a.css(n))));B(o)}),B()},B=function(e){speed=e||s.settings.speed;var t={left:0,top:0},i={left:0,top:0};"next"==s.settings.autoDirection?t=a.find(".bx-clone").first().position():i=s.children.first().position();var n="horizontal"==s.settings.mode?-t.left:-t.top,o="horizontal"==s.settings.mode?-i.left:-i.top;w(n,"ticker",speed,{resetValue:o})},W=function(){s.touch={start:{x:0,y:0},end:{x:0,y:0}},s.viewport.bind("touchstart",O)},O=function(e){if(s.working)e.preventDefault();else{s.touch.originalPos=a.position();var t=e.originalEvent;s.touch.start.x=t.changedTouches[0].pageX,s.touch.start.y=t.changedTouches[0].pageY,s.viewport.bind("touchmove",R),s.viewport.bind("touchend",H)}},R=function(e){var t=e.originalEvent,i=Math.abs(t.changedTouches[0].pageX-s.touch.start.x),n=Math.abs(t.changedTouches[0].pageY-s.touch.start.y);if(3*i>n&&s.settings.preventDefaultSwipeX?e.preventDefault():3*n>i&&s.settings.preventDefaultSwipeY&&e.preventDefault(),"fade"!=s.settings.mode&&s.settings.oneToOneTouch){var o=0;if("horizontal"==s.settings.mode){var a=t.changedTouches[0].pageX-s.touch.start.x;o=s.touch.originalPos.left+a}else{a=t.changedTouches[0].pageY-s.touch.start.y;o=s.touch.originalPos.top+a}w(o,"reset",0)}},H=function(e){s.viewport.unbind("touchmove",R);var t=e.originalEvent,i=0;if(s.touch.end.x=t.changedTouches[0].pageX,s.touch.end.y=t.changedTouches[0].pageY,"fade"==s.settings.mode){(n=Math.abs(s.touch.start.x-s.touch.end.x))>=s.settings.swipeThreshold&&(s.touch.start.x>s.touch.end.x?a.goToNextSlide():a.goToPrevSlide(),a.stopAuto())}else{var n=0;"horizontal"==s.settings.mode?(n=s.touch.end.x-s.touch.start.x,i=s.touch.originalPos.left):(n=s.touch.end.y-s.touch.start.y,i=s.touch.originalPos.top),!s.settings.infiniteLoop&&(0==s.active.index&&n>0||s.active.last&&0>n)?w(i,"reset",200):Math.abs(n)>=s.settings.swipeThreshold?(0>n?a.goToNextSlide():a.goToPrevSlide(),a.stopAuto()):w(i,"reset",200)}s.viewport.unbind("touchend",H)},N=function(){var t=e(window).width(),i=e(window).height();(r!=t||l!=i)&&(r=t,l=i,a.redrawSlider(),s.settings.onSliderResize.call(a,s.active.index))};return a.goToSlide=function(t,i){if(!s.working&&s.active.index!=t)if(s.working=!0,s.oldIndex=s.active.index,s.active.index=0>t?v()-1:t>=v()?0:t,s.settings.onSlideBefore(s.children.eq(s.active.index),s.oldIndex,s.active.index),"next"==i?s.settings.onSlideNext(s.children.eq(s.active.index),s.oldIndex,s.active.index):"prev"==i&&s.settings.onSlidePrev(s.children.eq(s.active.index),s.oldIndex,s.active.index),s.active.last=s.active.index>=v()-1,s.settings.pager&&P(s.active.index),s.settings.controls&&A(),"fade"==s.settings.mode)s.settings.adaptiveHeight&&s.viewport.height()!=p()&&s.viewport.animate({height:p()},s.settings.adaptiveHeightSpeed),s.children.filter(":visible").fadeOut(s.settings.speed).css({zIndex:0}),s.children.eq(s.active.index).css("zIndex",s.settings.slideZIndex+1).fadeIn(s.settings.speed,function(){e(this).css("zIndex",s.settings.slideZIndex),F()});else{s.settings.adaptiveHeight&&s.viewport.height()!=p()&&s.viewport.animate({height:p()},s.settings.adaptiveHeightSpeed);var n=0,o={left:0,top:0};if(!s.settings.infiniteLoop&&s.carousel&&s.active.last)if("horizontal"==s.settings.mode){o=(l=s.children.eq(s.children.length-1)).position(),n=s.viewport.width()-l.outerWidth()}else{var r=s.children.length-s.settings.minSlides;o=s.children.eq(r).position()}else if(s.carousel&&s.active.last&&"prev"==i){var l,d=1==s.settings.moveSlides?s.settings.maxSlides-y():(v()-1)*y()-(s.children.length-s.settings.maxSlides);o=(l=a.children(".bx-clone").eq(d)).position()}else if("next"==i&&0==s.active.index)o=a.find("> .bx-clone").eq(s.settings.maxSlides).position(),s.active.last=!1;else if(t>=0){var c=t*y();o=s.children.eq(c).position()}if(void 0!==o){var u="horizontal"==s.settings.mode?-(o.left-n):-o.top;w(u,"slide",s.settings.speed)}}},a.goToNextSlide=function(){if(s.settings.infiniteLoop||!s.active.last){var e=parseInt(s.active.index)+1;a.goToSlide(e,"next")}},a.goToPrevSlide=function(){if(s.settings.infiniteLoop||0!=s.active.index){var e=parseInt(s.active.index)-1;a.goToSlide(e,"prev")}},a.startAuto=function(e){s.interval||(s.interval=setInterval(function(){"next"==s.settings.autoDirection?a.goToNextSlide():a.goToPrevSlide()},s.settings.pause),s.settings.autoControls&&1!=e&&L("stop"))},a.stopAuto=function(e){s.interval&&(clearInterval(s.interval),s.interval=null,s.settings.autoControls&&1!=e&&L("start"))},a.getCurrentSlide=function(){return s.active.index},a.getCurrentSlideElement=function(){return s.children.eq(s.active.index)},a.getSlideCount=function(){return s.children.length},a.redrawSlider=function(){s.children.add(a.find(".bx-clone")).outerWidth(f()),s.viewport.css("height",p()),s.settings.ticker||b(),s.active.last&&(s.active.index=v()-1),s.active.index>=v()&&(s.active.last=!0),s.settings.pager&&!s.settings.pagerCustom&&(x(),P(s.active.index))},a.destroySlider=function(){s.initialized&&(s.initialized=!1,e(".bx-clone",this).remove(),s.children.each(function(){null!=e(this).data("origStyle")?e(this).attr("style",e(this).data("origStyle")):e(this).removeAttr("style")}),null!=e(this).data("origStyle")?this.attr("style",e(this).data("origStyle")):e(this).removeAttr("style"),e(this).unwrap().unwrap(),s.controls.el&&s.controls.el.remove(),s.controls.next&&s.controls.next.remove(),s.controls.prev&&s.controls.prev.remove(),s.pagerEl&&s.settings.controls&&s.pagerEl.remove(),e(".bx-caption",this).remove(),s.controls.autoEl&&s.controls.autoEl.remove(),clearInterval(s.interval),s.settings.responsive&&e(window).unbind("resize",N))},a.reloadSlider=function(e){null!=e&&(o=e),a.destroySlider(),d()},d(),this}}(jQuery),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){function t(t){var a=t||window.event,r=l.call(arguments,1),d=0,u=0,h=0,p=0,m=0,f=0;if((t=e.event.fix(a)).type="mousewheel","detail"in a&&(h=-1*a.detail),"wheelDelta"in a&&(h=a.wheelDelta),"wheelDeltaY"in a&&(h=a.wheelDeltaY),"wheelDeltaX"in a&&(u=-1*a.wheelDeltaX),"axis"in a&&a.axis===a.HORIZONTAL_AXIS&&(u=-1*h,h=0),d=0===h?u:h,"deltaY"in a&&(d=h=-1*a.deltaY),"deltaX"in a&&(u=a.deltaX,0===h&&(d=-1*u)),0!==h||0!==u){if(1===a.deltaMode){var g=e.data(this,"mousewheel-line-height");d*=g,h*=g,u*=g}else if(2===a.deltaMode){var v=e.data(this,"mousewheel-page-height");d*=v,h*=v,u*=v}if(p=Math.max(Math.abs(h),Math.abs(u)),(!s||s>p)&&(s=p,n(a,p)&&(s/=40)),n(a,p)&&(d/=40,u/=40,h/=40),d=Math[d>=1?"floor":"ceil"](d/s),u=Math[u>=1?"floor":"ceil"](u/s),h=Math[h>=1?"floor":"ceil"](h/s),c.settings.normalizeOffset&&this.getBoundingClientRect){var y=this.getBoundingClientRect();m=t.clientX-y.left,f=t.clientY-y.top}return t.deltaX=u,t.deltaY=h,t.deltaFactor=s,t.offsetX=m,t.offsetY=f,t.deltaMode=0,r.unshift(t,d,u,h),o&&clearTimeout(o),o=setTimeout(i,200),(e.event.dispatch||e.event.handle).apply(this,r)}}function i(){s=null}function n(e,t){return c.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}var o,s,a=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],r="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],l=Array.prototype.slice;if(e.event.fixHooks)for(var d=a.length;d;)e.event.fixHooks[a[--d]]=e.event.mouseHooks;var c=e.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var i=r.length;i;)this.addEventListener(r[--i],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",c.getLineHeight(this)),e.data(this,"mousewheel-page-height",c.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var i=r.length;i;)this.removeEventListener(r[--i],t,!1);else this.onmousewheel=null;e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var i=e(t),n=i["offsetParent"in e.fn?"offsetParent":"parent"]();return n.length||(n=e("body")),parseInt(n.css("fontSize"),10)||parseInt(i.css("fontSize"),10)||16},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}),function(e){"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){var t,i,n;t="function"==typeof define&&define.amd,i="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",t||(i?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js%3E%3C/script%3E"))),function(){var t,i="mCustomScrollbar",n="mCS",o=".mCustomScrollbar",s={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},a=0,r={},l=window.attachEvent&&!window.addEventListener?1:0,d=!1,c=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},s,t),i=h.call(this);if(t.live){var l=t.liveSelector||this.selector||o,d=e(l);if("off"===t.live)return void m(l);r[l]=setTimeout(function(){d.mCustomScrollbar(t),"once"===t.live&&d.length&&m(l)},500)}else m(l);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":f(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),p(t),e(i).each(function(){var i=e(this);if(!i.data(n)){i.data(n,{idx:++a,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:i.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var o=i.data(n),s=o.opt,r=i.data("mcs-axis"),l=i.data("mcs-scrollbar-position"),d=i.data("mcs-theme");r&&(s.axis=r),l&&(s.scrollbarPosition=l),d&&(s.theme=d,p(s)),v.call(this),o&&s.callbacks.onCreate&&"function"==typeof s.callbacks.onCreate&&s.callbacks.onCreate.call(this),e("#mCSB_"+o.idx+"_container img:not(."+c[2]+")").addClass(c[2]),u.update.call(null,i)}})},update:function(t,i){var o=t||h.call(this);return e(o).each(function(){var t=e(this);if(t.data(n)){var o=t.data(n),s=o.opt,a=e("#mCSB_"+o.idx+"_container"),r=e("#mCSB_"+o.idx),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(!a.length)return;o.tweenRunning&&U(t),i&&o&&s.callbacks.onBeforeUpdate&&"function"==typeof s.callbacks.onBeforeUpdate&&s.callbacks.onBeforeUpdate.call(this),t.hasClass(c[3])&&t.removeClass(c[3]),t.hasClass(c[4])&&t.removeClass(c[4]),r.height()!==t.height()&&r.css("max-height",t.height()),b.call(this),"y"===s.axis||s.advanced.autoExpandHorizontalScroll||a.css("width",y(a)),o.overflowed=T.call(this),E.call(this),s.autoDraggerLength&&x.call(this),S.call(this),j.call(this);var d=[Math.abs(a[0].offsetTop),Math.abs(a[0].offsetLeft)];"x"!==s.axis&&(o.overflowed[0]?l[0].height()>l[0].parent().height()?k.call(this):(q(t,d[0].toString(),{dir:"y",dur:0,overwrite:"none"}),o.contentReset.y=null):(k.call(this),"y"===s.axis?_.call(this):"yx"===s.axis&&o.overflowed[1]&&q(t,d[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==s.axis&&(o.overflowed[1]?l[1].width()>l[1].parent().width()?k.call(this):(q(t,d[1].toString(),{dir:"x",dur:0,overwrite:"none"}),o.contentReset.x=null):(k.call(this),"x"===s.axis?_.call(this):"yx"===s.axis&&o.overflowed[0]&&q(t,d[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),i&&o&&(2===i&&s.callbacks.onImageLoad&&"function"==typeof s.callbacks.onImageLoad?s.callbacks.onImageLoad.call(this):3===i&&s.callbacks.onSelectorChange&&"function"==typeof s.callbacks.onSelectorChange?s.callbacks.onSelectorChange.call(this):s.callbacks.onUpdate&&"function"==typeof s.callbacks.onUpdate&&s.callbacks.onUpdate.call(this)),V.call(this)}})},scrollTo:function(t,i){if(void 0!==t&&null!=t){var o=h.call(this);return e(o).each(function(){var o=e(this);if(o.data(n)){var s=o.data(n),a=s.opt,r={trigger:"external",scrollInertia:a.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},l=e.extend(!0,{},r,i),d=N.call(this,t),c=l.scrollInertia>0&&l.scrollInertia<17?17:l.scrollInertia;d[0]=$.call(this,d[0],"y"),d[1]=$.call(this,d[1],"x"),l.moveDragger&&(d[0]*=s.scrollRatio.y,d[1]*=s.scrollRatio.x),l.dur=c,setTimeout(function(){null!==d[0]&&void 0!==d[0]&&"x"!==a.axis&&s.overflowed[0]&&(l.dir="y",l.overwrite="all",q(o,d[0].toString(),l)),null!==d[1]&&void 0!==d[1]&&"y"!==a.axis&&s.overflowed[1]&&(l.dir="x",l.overwrite="none",q(o,d[1].toString(),l))},l.timeout)}})}},stop:function(){var t=h.call(this);return e(t).each(function(){var t=e(this);t.data(n)&&U(t)})},disable:function(t){var i=h.call(this);return e(i).each(function(){var i=e(this);i.data(n)&&(i.data(n),V.call(this,"remove"),_.call(this),t&&k.call(this),E.call(this,!0),i.addClass(c[3]))})},destroy:function(){var t=h.call(this);return e(t).each(function(){var o=e(this);if(o.data(n)){var s=o.data(n),a=s.opt,r=e("#mCSB_"+s.idx),l=e("#mCSB_"+s.idx+"_container"),d=e(".mCSB_"+s.idx+"_scrollbar");a.live&&m(a.liveSelector||e(t).selector),V.call(this,"remove"),_.call(this),k.call(this),o.removeData(n),Z(this,"mcs"),d.remove(),l.find("img."+c[2]).removeClass(c[2]),r.replaceWith(l.contents()),o.removeClass(i+" _"+n+"_"+s.idx+" "+c[6]+" "+c[7]+" "+c[5]+" "+c[3]).addClass(c[4])}})}},h=function(){return"object"!=typeof e(this)||e(this).length<1?o:this},p=function(t){t.autoDraggerLength=!(e.inArray(t.theme,["rounded","rounded-dark","rounded-dots","rounded-dots-dark"])>-1)&&t.autoDraggerLength,t.autoExpandScrollbar=!(e.inArray(t.theme,["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"])>-1)&&t.autoExpandScrollbar,t.scrollButtons.enable=!(e.inArray(t.theme,["minimal","minimal-dark"])>-1)&&t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,["minimal","minimal-dark"])>-1||t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,["minimal","minimal-dark"])>-1?"outside":t.scrollbarPosition},m=function(e){r[e]&&(clearTimeout(r[e]),Z(r,e))},f=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),o=t.data(n),s=o.opt,a=s.autoExpandScrollbar?" "+c[1]+"_expand":"",r=["<div id='mCSB_"+o.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+o.idx+"_scrollbar mCS-"+s.theme+" mCSB_scrollTools_vertical"+a+"'><div class='"+c[12]+"'><div id='mCSB_"+o.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+o.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+o.idx+"_scrollbar mCS-"+s.theme+" mCSB_scrollTools_horizontal"+a+"'><div class='"+c[12]+"'><div id='mCSB_"+o.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],l="yx"===s.axis?"mCSB_vertical_horizontal":"x"===s.axis?"mCSB_horizontal":"mCSB_vertical",d="yx"===s.axis?r[0]+r[1]:"x"===s.axis?r[1]:r[0],u="yx"===s.axis?"<div id='mCSB_"+o.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",h=s.autoHideScrollbar?" "+c[6]:"",p="x"!==s.axis&&"rtl"===o.langDir?" "+c[7]:"";s.setWidth&&t.css("width",s.setWidth),s.setHeight&&t.css("height",s.setHeight),s.setLeft="y"!==s.axis&&"rtl"===o.langDir?"989999px":s.setLeft,t.addClass(i+" _"+n+"_"+o.idx+h+p).wrapInner("<div id='mCSB_"+o.idx+"' class='mCustomScrollBox mCS-"+s.theme+" "+l+"'><div id='mCSB_"+o.idx+"_container' class='mCSB_container' style='position:relative; top:"+s.setTop+"; left:"+s.setLeft+";' dir="+o.langDir+" /></div>");var m=e("#mCSB_"+o.idx),f=e("#mCSB_"+o.idx+"_container");"y"===s.axis||s.advanced.autoExpandHorizontalScroll||f.css("width",y(f)),"outside"===s.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(d)):(m.addClass("mCSB_inside").append(d),f.wrap(u)),w.call(this);var g=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},y=function(t){var i=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],n=t.parent().width();return i[0]>n?i[0]:i[1]>n?i[1]:"100%"},b=function(){var t=e(this),i=t.data(n),o=i.opt,s=e("#mCSB_"+i.idx+"_container");if(o.advanced.autoExpandHorizontalScroll&&"y"!==o.axis){s.css({width:"auto","min-width":0,"overflow-x":"scroll"});var a=Math.ceil(s[0].scrollWidth);3===o.advanced.autoExpandHorizontalScroll||2!==o.advanced.autoExpandHorizontalScroll&&a>s.parent().width()?s.css({width:a,"min-width":"100%","overflow-x":"inherit"}):s.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(s[0].getBoundingClientRect().right+.4)-Math.floor(s[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),i=t.data(n),o=i.opt,s=e(".mCSB_"+i.idx+"_scrollbar:first"),a=J(o.scrollButtons.tabindex)?"tabindex='"+o.scrollButtons.tabindex+"'":"",r=["<a href='#' class='"+c[13]+"' oncontextmenu='return false;' "+a+" />","<a href='#' class='"+c[14]+"' oncontextmenu='return false;' "+a+" />","<a href='#' class='"+c[15]+"' oncontextmenu='return false;' "+a+" />","<a href='#' class='"+c[16]+"' oncontextmenu='return false;' "+a+" />"],l=["x"===o.axis?r[2]:r[0],"x"===o.axis?r[3]:r[1],r[2],r[3]];o.scrollButtons.enable&&s.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])},x=function(){var t=e(this),i=t.data(n),o=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),a=[e("#mCSB_"+i.idx+"_dragger_vertical"),e("#mCSB_"+i.idx+"_dragger_horizontal")],r=[o.height()/s.outerHeight(!1),o.width()/s.outerWidth(!1)],d=[parseInt(a[0].css("min-height")),Math.round(r[0]*a[0].parent().height()),parseInt(a[1].css("min-width")),Math.round(r[1]*a[1].parent().width())],c=l&&d[1]<d[0]?d[0]:d[1],u=l&&d[3]<d[2]?d[2]:d[3];a[0].css({height:c,"max-height":a[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":d[0]+"px"}),a[1].css({width:u,"max-width":a[1].parent().width()-10})},S=function(){var t=e(this),i=t.data(n),o=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),a=[e("#mCSB_"+i.idx+"_dragger_vertical"),e("#mCSB_"+i.idx+"_dragger_horizontal")],r=[s.outerHeight(!1)-o.height(),s.outerWidth(!1)-o.width()],l=[r[0]/(a[0].parent().height()-a[0].height()),r[1]/(a[1].parent().width()-a[1].width())];i.scrollRatio={y:l[0],x:l[1]}},C=function(e,t,i){var n=i?c[0]+"_expanded":"",o=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(c[0]+" "+n),o.toggleClass(c[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(c[0]),o.removeClass(c[1])):(e.addClass(c[0]),o.addClass(c[1])))},T=function(){var t=e(this),i=t.data(n),o=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),a=null==i.overflowed?s.height():s.outerHeight(!1),r=null==i.overflowed?s.width():s.outerWidth(!1),l=s[0].scrollHeight,d=s[0].scrollWidth;return l>a&&(a=l),d>r&&(r=d),[a>o.height(),r>o.width()]},k=function(){var t=e(this),i=t.data(n),o=i.opt,s=e("#mCSB_"+i.idx),a=e("#mCSB_"+i.idx+"_container"),r=[e("#mCSB_"+i.idx+"_dragger_vertical"),e("#mCSB_"+i.idx+"_dragger_horizontal")];if(U(t),("x"!==o.axis&&!i.overflowed[0]||"y"===o.axis&&i.overflowed[0])&&(r[0].add(a).css("top",0),q(t,"_resetY")),"y"!==o.axis&&!i.overflowed[1]||"x"===o.axis&&i.overflowed[1]){var l=dx=0;"rtl"===i.langDir&&(l=s.width()-a.outerWidth(!1),dx=Math.abs(l/i.scrollRatio.x)),a.css("left",l),r[1].css("left",dx),q(t,"_resetX")}},j=function(){var t,i=e(this),o=i.data(n),s=o.opt;o.bindEvents||(M.call(this),s.contentTouchScroll&&P.call(this),F.call(this),s.mouseWheel.enable&&function n(){t=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(t),L.call(i[0])):n()},100)}(),z.call(this),W.call(this),s.advanced.autoScrollOnFocus&&B.call(this),s.scrollButtons.enable&&O.call(this),s.keyboard.enable&&R.call(this),o.bindEvents=!0)},_=function(){var t=e(this),i=t.data(n),o=i.opt,s=n+"_"+i.idx,a=".mCSB_"+i.idx+"_scrollbar",r=e("#mCSB_"+i.idx+",#mCSB_"+i.idx+"_container,#mCSB_"+i.idx+"_container_wrapper,"+a+" ."+c[12]+",#mCSB_"+i.idx+"_dragger_vertical,#mCSB_"+i.idx+"_dragger_horizontal,"+a+">a"),l=e("#mCSB_"+i.idx+"_container");o.advanced.releaseDraggableSelectors&&r.add(e(o.advanced.releaseDraggableSelectors)),i.bindEvents&&(e(document).unbind("."+s),r.each(function(){e(this).unbind("."+s)}),clearTimeout(t[0]._focusTimeout),Z(t[0],"_focusTimeout"),clearTimeout(i.sequential.step),Z(i.sequential,"step"),clearTimeout(l[0].onCompleteTimeout),Z(l[0],"onCompleteTimeout"),i.bindEvents=!1)},E=function(t){var i=e(this),o=i.data(n),s=o.opt,a=e("#mCSB_"+o.idx+"_container_wrapper"),r=a.length?a:e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_scrollbar_vertical"),e("#mCSB_"+o.idx+"_scrollbar_horizontal")],d=[l[0].find(".mCSB_dragger"),l[1].find(".mCSB_dragger")];"x"!==s.axis&&(o.overflowed[0]&&!t?(l[0].add(d[0]).add(l[0].children("a")).css("display","block"),r.removeClass(c[8]+" "+c[10])):(s.alwaysShowScrollbar?(2!==s.alwaysShowScrollbar&&d[0].css("display","none"),r.removeClass(c[10])):(l[0].css("display","none"),r.addClass(c[10])),r.addClass(c[8]))),"y"!==s.axis&&(o.overflowed[1]&&!t?(l[1].add(d[1]).add(l[1].children("a")).css("display","block"),r.removeClass(c[9]+" "+c[11])):(s.alwaysShowScrollbar?(2!==s.alwaysShowScrollbar&&d[1].css("display","none"),r.removeClass(c[11])):(l[1].css("display","none"),r.addClass(c[11])),r.addClass(c[9]))),o.overflowed[0]||o.overflowed[1]?i.removeClass(c[5]):i.addClass(c[5])},I=function(e){var t=e.type;switch(t){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return e.target.ownerDocument!==document?[e.originalEvent.screenY,e.originalEvent.screenX,!1]:[e.originalEvent.pageY,e.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],n=e.originalEvent.touches.length||e.originalEvent.changedTouches.length;return e.target.ownerDocument!==document?[i.screenY,i.screenX,n>1]:[i.pageY,i.pageX,n>1];default:return[e.pageY,e.pageX,!1]}},M=function(){function t(e){var t=m.find("iframe");if(t.length){var i=e?"auto":"none";t.css("pointer-events",i)}}function i(e,t,i,n){if(m[0].idleTimer=u.scrollInertia<233?250:0,o.attr("id")===p[1])var s="x",a=(o[0].offsetLeft-t+n)*c.scrollRatio.x;else var s="y",a=(o[0].offsetTop-e+i)*c.scrollRatio.y;q(r,a.toString(),{dir:s,drag:!0})}var o,s,a,r=e(this),c=r.data(n),u=c.opt,h=n+"_"+c.idx,p=["mCSB_"+c.idx+"_dragger_vertical","mCSB_"+c.idx+"_dragger_horizontal"],m=e("#mCSB_"+c.idx+"_container"),f=e("#"+p[0]+",#"+p[1]),g=u.advanced.releaseDraggableSelectors?f.add(e(u.advanced.releaseDraggableSelectors)):f;f.bind("mousedown."+h+" touchstart."+h+" pointerdown."+h+" MSPointerDown."+h,function(i){if(i.stopImmediatePropagation(),i.preventDefault(),G(i)){d=!0,l&&(document.onselectstart=function(){return!1}),t(!1),U(r);var n=(o=e(this)).offset(),c=I(i)[0]-n.top,h=I(i)[1]-n.left,p=o.height()+n.top,m=o.width()+n.left;p>c&&c>0&&m>h&&h>0&&(s=c,a=h),C(o,"active",u.autoExpandScrollbar)}}).bind("touchmove."+h,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=o.offset(),n=I(e)[0]-t.top,r=I(e)[1]-t.left;i(s,a,n,r)}),e(document).bind("mousemove."+h+" pointermove."+h+" MSPointerMove."+h,function(e){if(o){var t=o.offset(),n=I(e)[0]-t.top,r=I(e)[1]-t.left;if(s===n)return;i(s,a,n,r)}}).add(g).bind("mouseup."+h+" touchend."+h+" pointerup."+h+" MSPointerUp."+h,function(e){o&&(C(o,"active",u.autoExpandScrollbar),o=null),d=!1,l&&(document.onselectstart=null),t(!0)})},P=function(){function i(e){if(!K(e)||d||I(e)[2])t=0;else{t=1,S=0,C=0,c=1,T.removeClass("mCS_touch_action");var i=M.offset();u=I(e)[0]-i.top,h=I(e)[1]-i.left,B=[I(e)[0],I(e)[1]]}}function o(e){if(K(e)&&!d&&!I(e)[2]&&(e.stopImmediatePropagation(),(!C||S)&&c)){g=X();var t=E.offset(),i=I(e)[0]-t.top,n=I(e)[1]-t.left,o="mcsLinearOut";if(F.push(i),L.push(n),B[2]=Math.abs(I(e)[0]-B[0]),B[3]=Math.abs(I(e)[1]-B[1]),k.overflowed[0])var s=P[0].parent().height()-P[0].height(),a=u-i>0&&i-u>-s*k.scrollRatio.y&&(2*B[3]<B[2]||"yx"===j.axis);if(k.overflowed[1])var r=P[1].parent().width()-P[1].width(),p=h-n>0&&n-h>-r*k.scrollRatio.x&&(2*B[2]<B[3]||"yx"===j.axis);a||p?(R||e.preventDefault(),S=1):(C=1,T.addClass("mCS_touch_action")),R&&e.preventDefault(),w="yx"===j.axis?[u-i,h-n]:"x"===j.axis?[null,h-n]:[u-i,null],M[0].idleTimer=250,k.overflowed[0]&&l(w[0],D,o,"y","all",!0),k.overflowed[1]&&l(w[1],D,o,"x",z,!0)}}function s(e){if(!K(e)||d||I(e)[2])t=0;else{t=1,e.stopImmediatePropagation(),U(T),f=X();var i=E.offset();p=I(e)[0]-i.top,m=I(e)[1]-i.left,F=[],L=[]}}function a(e){if(K(e)&&!d&&!I(e)[2]){c=0,e.stopImmediatePropagation(),S=0,C=0,v=X();var t=E.offset(),i=I(e)[0]-t.top,n=I(e)[1]-t.left;if(!(v-g>30)){var o="mcsEaseOut",s=2.5>(b=1e3/(v-f)),a=s?[F[F.length-2],L[L.length-2]]:[0,0];y=s?[i-a[0],n-a[1]]:[i-p,n-m];var u=[Math.abs(y[0]),Math.abs(y[1])];b=s?[Math.abs(y[0]/4),Math.abs(y[1]/4)]:[b,b];var h=[Math.abs(M[0].offsetTop)-y[0]*r(u[0]/b[0],b[0]),Math.abs(M[0].offsetLeft)-y[1]*r(u[1]/b[1],b[1])];w="yx"===j.axis?[h[0],h[1]]:"x"===j.axis?[null,h[1]]:[h[0],null],x=[4*u[0]+j.scrollInertia,4*u[1]+j.scrollInertia];var T=parseInt(j.contentTouchScroll)||0;w[0]=u[0]>T?w[0]:0,w[1]=u[1]>T?w[1]:0,k.overflowed[0]&&l(w[0],x[0],o,"y",z,!1),k.overflowed[1]&&l(w[1],x[1],o,"x",z,!1)}}}function r(e,t){var i=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?i[0]:i[3]:e>60?t>3?i[3]:i[2]:e>30?t>8?i[1]:t>6?i[0]:t>4?t:i[2]:t>8?t:i[3]}function l(e,t,i,n,o,s){e&&q(T,e.toString(),{dur:t,scrollEasing:i,dir:n,overwrite:o,drag:s})}var c,u,h,p,m,f,g,v,y,b,w,x,S,C,T=e(this),k=T.data(n),j=k.opt,_=n+"_"+k.idx,E=e("#mCSB_"+k.idx),M=e("#mCSB_"+k.idx+"_container"),P=[e("#mCSB_"+k.idx+"_dragger_vertical"),e("#mCSB_"+k.idx+"_dragger_horizontal")],F=[],L=[],D=0,z="yx"===j.axis?"none":"all",B=[],W=M.find("iframe"),O=["touchstart."+_+" pointerdown."+_+" MSPointerDown."+_,"touchmove."+_+" pointermove."+_+" MSPointerMove."+_,"touchend."+_+" pointerup."+_+" MSPointerUp."+_],R=void 0!==document.body.style.touchAction;M.bind(O[0],function(e){i(e)}).bind(O[1],function(e){o(e)}),E.bind(O[0],function(e){s(e)}).bind(O[2],function(e){a(e)}),W.length&&W.each(function(){e(this).load(function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(O[0],function(e){i(e),s(e)}).bind(O[1],function(e){o(e)}).bind(O[2],function(e){a(e)})})})},F=function(){function i(e,t,i){l.type=i&&o?"stepped":"stepless",l.scrollAmount=10,H(s,e,t,"mcsLinearOut",i?60:null)}var o,s=e(this),a=s.data(n),r=a.opt,l=a.sequential,c=n+"_"+a.idx,u=e("#mCSB_"+a.idx+"_container"),h=u.parent();u.bind("mousedown."+c,function(e){t||o||(o=1,d=!0)}).add(document).bind("mousemove."+c,function(e){if(!t&&o&&(window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type&&document.selection.createRange().text)){var n=u.offset(),s=I(e)[0]-n.top+u[0].offsetTop,d=I(e)[1]-n.left+u[0].offsetLeft;s>0&&s<h.height()&&d>0&&d<h.width()?l.step&&i("off",null,"stepped"):("x"!==r.axis&&a.overflowed[0]&&(0>s?i("on",38):s>h.height()&&i("on",40)),"y"!==r.axis&&a.overflowed[1]&&(0>d?i("on",37):d>h.width()&&i("on",39)))}}).bind("mouseup."+c+" dragend."+c,function(e){t||(o&&(o=0,i("off",null)),d=!1)})},L=function(){function t(t,n){if(U(i),!D(i,t.target)){var a="auto"!==s.mouseWheel.deltaFactor?parseInt(s.mouseWheel.deltaFactor):l&&t.deltaFactor<100?100:t.deltaFactor||100;if("x"===s.axis||"x"===s.mouseWheel.axis)var c="x",u=[Math.round(a*o.scrollRatio.x),parseInt(s.mouseWheel.scrollAmount)],h="auto"!==s.mouseWheel.scrollAmount?u[1]:u[0]>=r.width()?.9*r.width():u[0],p=Math.abs(e("#mCSB_"+o.idx+"_container")[0].offsetLeft),m=d[1][0].offsetLeft,f=d[1].parent().width()-d[1].width(),g=t.deltaX||t.deltaY||n;else var c="y",u=[Math.round(a*o.scrollRatio.y),parseInt(s.mouseWheel.scrollAmount)],h="auto"!==s.mouseWheel.scrollAmount?u[1]:u[0]>=r.height()?.9*r.height():u[0],p=Math.abs(e("#mCSB_"+o.idx+"_container")[0].offsetTop),m=d[0][0].offsetTop,f=d[0].parent().height()-d[0].height(),g=t.deltaY||n;"y"===c&&!o.overflowed[0]||"x"===c&&!o.overflowed[1]||((s.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(g=-g),s.mouseWheel.normalizeDelta&&(g=0>g?-1:1),(g>0&&0!==m||0>g&&m!==f||s.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),q(i,(p-g*h).toString(),{dir:c}))}}if(e(this).data(n)){var i=e(this),o=i.data(n),s=o.opt,a=n+"_"+o.idx,r=e("#mCSB_"+o.idx),d=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],c=e("#mCSB_"+o.idx+"_container").find("iframe");c.length&&c.each(function(){e(this).load(function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+a,function(e,i){t(e,i)})})}),r.bind("mousewheel."+a,function(e,i){t(e,i)})}},A=function(e){var t=null;try{var i=e.contentDocument||e.contentWindow.document;t=i.body.innerHTML}catch(e){}return null!==t},D=function(t,i){var o=i.nodeName.toLowerCase(),s=t.data(n).opt.mouseWheel.disableOver;return e.inArray(o,s)>-1&&!(e.inArray(o,["select","textarea"])>-1&&!e(i).is(":focus"))},z=function(){var t=e(this),i=t.data(n),o=n+"_"+i.idx,s=e("#mCSB_"+i.idx+"_container"),a=s.parent(),r=e(".mCSB_"+i.idx+"_scrollbar ."+c[12]);r.bind("touchstart."+o+" pointerdown."+o+" MSPointerDown."+o,function(e){d=!0}).bind("touchend."+o+" pointerup."+o+" MSPointerUp."+o,function(e){d=!1}).bind("click."+o,function(n){if(e(n.target).hasClass(c[12])||e(n.target).hasClass("mCSB_draggerRail")){U(t);var o=e(this),r=o.find(".mCSB_dragger");if(o.parent(".mCSB_scrollTools_horizontal").length>0){if(!i.overflowed[1])return;var l="x",d=n.pageX>r.offset().left?-1:1,u=Math.abs(s[0].offsetLeft)-.9*d*a.width()}else{if(!i.overflowed[0])return;var l="y",d=n.pageY>r.offset().top?-1:1,u=Math.abs(s[0].offsetTop)-.9*d*a.height()}q(t,u.toString(),{dir:l,scrollEasing:"mcsEaseInOut"})}})},B=function(){var t=e(this),i=t.data(n),o=i.opt,s=n+"_"+i.idx,a=e("#mCSB_"+i.idx+"_container"),r=a.parent();a.bind("focusin."+s,function(i){var n=e(document.activeElement),s=a.find(".mCustomScrollBox").length;n.is(o.advanced.autoScrollOnFocus)&&(U(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=s?17*s:0,t[0]._focusTimeout=setTimeout(function(){var e=[ee(n)[0],ee(n)[1]],i=[a[0].offsetTop,a[0].offsetLeft],s=[i[0]+e[0]>=0&&i[0]+e[0]<r.height()-n.outerHeight(!1),i[1]+e[1]>=0&&i[0]+e[1]<r.width()-n.outerWidth(!1)],l="yx"!==o.axis||s[0]||s[1]?"all":"none";"x"===o.axis||s[0]||q(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:l,dur:0}),"y"===o.axis||s[1]||q(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:l,dur:0})},t[0]._focusTimer))})},W=function(){var t=e(this),i=t.data(n),o=n+"_"+i.idx,s=e("#mCSB_"+i.idx+"_container").parent();s.bind("scroll."+o,function(t){(0!==s.scrollTop()||0!==s.scrollLeft())&&e(".mCSB_"+i.idx+"_scrollbar").css("visibility","hidden")})},O=function(){var t=e(this),i=t.data(n),o=i.opt,s=i.sequential,a=n+"_"+i.idx,r=".mCSB_"+i.idx+"_scrollbar",l=e(r+">a");l.bind("mousedown."+a+" touchstart."+a+" pointerdown."+a+" MSPointerDown."+a+" mouseup."+a+" touchend."+a+" pointerup."+a+" MSPointerUp."+a+" mouseout."+a+" pointerout."+a+" MSPointerOut."+a+" click."+a,function(n){function a(e,i){s.scrollAmount=o.snapAmount||o.scrollButtons.scrollAmount,H(t,e,i)}if(n.preventDefault(),G(n)){var r=e(this).attr("class");switch(s.type=o.scrollButtons.scrollType,n.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===s.type)return;d=!0,i.tweenRunning=!1,a("on",r);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===s.type)return;d=!1,s.dir&&a("off",r);break;case"click":if("stepped"!==s.type||i.tweenRunning)return;a("on",r)}}})},R=function(){function t(t){function n(e,t){a.type=s.keyboard.scrollType,a.scrollAmount=s.snapAmount||s.keyboard.scrollAmount,"stepped"===a.type&&o.tweenRunning||H(i,e,t)}switch(t.type){case"blur":o.tweenRunning&&a.dir&&n("off",null);break;case"keydown":case"keyup":var r=t.keyCode?t.keyCode:t.which,l="on";if("x"!==s.axis&&(38===r||40===r)||"y"!==s.axis&&(37===r||39===r)){if((38===r||40===r)&&!o.overflowed[0]||(37===r||39===r)&&!o.overflowed[1])return;"keyup"===t.type&&(l="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),n(l,r))}else if(33===r||34===r){if((o.overflowed[0]||o.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){U(i);var h=34===r?-1:1;if("x"===s.axis||"yx"===s.axis&&o.overflowed[1]&&!o.overflowed[0])var p="x",m=Math.abs(d[0].offsetLeft)-.9*h*c.width();else var p="y",m=Math.abs(d[0].offsetTop)-.9*h*c.height();q(i,m.toString(),{dir:p,scrollEasing:"mcsEaseInOut"})}}else if((35===r||36===r)&&!e(document.activeElement).is(u)&&((o.overflowed[0]||o.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===s.axis||"yx"===s.axis&&o.overflowed[1]&&!o.overflowed[0])var p="x",m=35===r?Math.abs(c.width()-d.outerWidth(!1)):0;else var p="y",m=35===r?Math.abs(c.height()-d.outerHeight(!1)):0;q(i,m.toString(),{dir:p,scrollEasing:"mcsEaseInOut"})}}}var i=e(this),o=i.data(n),s=o.opt,a=o.sequential,r=n+"_"+o.idx,l=e("#mCSB_"+o.idx),d=e("#mCSB_"+o.idx+"_container"),c=d.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",h=d.find("iframe"),p=["blur."+r+" keydown."+r+" keyup."+r];h.length&&h.each(function(){e(this).load(function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(p[0],function(e){t(e)})})}),l.attr("tabindex","0").bind(p[0],function(e){t(e)})},H=function(t,i,o,s,a){function r(e){var i="stepped"!==u.type,n=a||(e?i?m/1.5:f:1e3/60),o=e?i?7.5:40:2.5,d=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],c=[l.scrollRatio.y>10?10:l.scrollRatio.y,l.scrollRatio.x>10?10:l.scrollRatio.x],p="x"===u.dir[0]?d[1]+u.dir[1]*c[1]*o:d[0]+u.dir[1]*c[0]*o,g="x"===u.dir[0]?d[1]+u.dir[1]*parseInt(u.scrollAmount):d[0]+u.dir[1]*parseInt(u.scrollAmount),v="auto"!==u.scrollAmount?g:p,y=s||(e?i?"mcsLinearOut":"mcsEaseInOut":"mcsLinear"),b=!!e;return e&&17>n&&(v="x"===u.dir[0]?d[1]:d[0]),q(t,v.toString(),{dir:u.dir[0],scrollEasing:y,dur:n,onComplete:b}),e?void(u.dir=!1):(clearTimeout(u.step),void(u.step=setTimeout(function(){r()},n)))}var l=t.data(n),d=l.opt,u=l.sequential,h=e("#mCSB_"+l.idx+"_container"),p="stepped"===u.type,m=d.scrollInertia<26?26:d.scrollInertia,f=d.scrollInertia<1?17:d.scrollInertia;switch(i){case"on":if(u.dir=[o===c[16]||o===c[15]||39===o||37===o?"x":"y",o===c[13]||o===c[15]||38===o||37===o?-1:1],U(t),J(o)&&"stepped"===u.type)return;r(p);break;case"off":clearTimeout(u.step),Z(u,"step"),U(t),(p||l.tweenRunning&&u.dir)&&r(!0)}},N=function(t){var i=e(this).data(n).opt,o=[];return"function"==typeof t&&(t=t()),t instanceof Array?o=t.length>1?[t[0],t[1]]:"x"===i.axis?[null,t[0]]:[t[0],null]:(o[0]=t.y?t.y:t.x||"x"===i.axis?null:t,o[1]=t.x?t.x:t.y||"y"===i.axis?null:t),"function"==typeof o[0]&&(o[0]=o[0]()),"function"==typeof o[1]&&(o[1]=o[1]()),o},$=function(t,i){if(null!=t&&void 0!==t){var o=e(this),s=o.data(n),a=s.opt,r=e("#mCSB_"+s.idx+"_container"),l=r.parent(),d=typeof t;i||(i="x"===a.axis?"x":"y");var c="x"===i?r.outerWidth(!1):r.outerHeight(!1),h="x"===i?r[0].offsetLeft:r[0].offsetTop,p="x"===i?"left":"top";switch(d){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===i?ee(m)[1]:ee(m)[0];case"string":case"number":if(J(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(c*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(h-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var f=h+parseInt(t.split("+=")[1]);return f>=0?0:Math.abs(f)}if(-1!==t.indexOf("px")&&J(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(l.height()-r.outerHeight(!1));if("right"===t)return Math.abs(l.width()-r.outerWidth(!1));if("first"===t||"last"===t){var m=r.find(":"+t);return"x"===i?ee(m)[1]:ee(m)[0]}return e(t).length?"x"===i?ee(e(t))[1]:ee(e(t))[0]:(r.css(p,t),void u.update.call(null,o[0]))}}},V=function(t){function i(e){clearTimeout(r[0].autoUpdate),u.update.call(null,o[0],e)}var o=e(this),s=o.data(n),a=s.opt,r=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(r[0].autoUpdate),void Z(r[0],"autoUpdate")):void function t(){return clearTimeout(r[0].autoUpdate),0===o.parents("html").length?void(o=null):void(r[0].autoUpdate=setTimeout(function(){return a.advanced.updateOnSelectorChange&&(s.poll.change.n=function(){!0===a.advanced.updateOnSelectorChange&&(a.advanced.updateOnSelectorChange="*");var e=0,t=r.find(a.advanced.updateOnSelectorChange);return a.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void i(3)):a.advanced.updateOnContentResize&&(s.poll.size.n=o[0].scrollHeight+o[0].scrollWidth+r[0].offsetHeight+o[0].offsetHeight,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void i(1)):!a.advanced.updateOnImageLoad||"auto"===a.advanced.updateOnImageLoad&&"y"===a.axis||(s.poll.img.n=r.find("img").length,s.poll.img.n===s.poll.img.o)?void((a.advanced.updateOnSelectorChange||a.advanced.updateOnContentResize||a.advanced.updateOnImageLoad)&&t()):(s.poll.img.o=s.poll.img.n,void r.find("img").each(function(){!function(t){if(e(t).hasClass(c[2]))i();else{var n=new Image;n.onload=function(e,t){return function(){return t.apply(e,arguments)}}(n,function(){this.onload=null,e(t).addClass(c[2]),i(2)}),n.src=t.src}}(this)}))},a.advanced.autoUpdateTimeout))}()},U=function(t){var i=t.data(n),o=e("#mCSB_"+i.idx+"_container,#mCSB_"+i.idx+"_container_wrapper,#mCSB_"+i.idx+"_dragger_vertical,#mCSB_"+i.idx+"_dragger_horizontal");o.each(function(){Q.call(this)})},q=function(t,i,o){function s(e){return r&&l.callbacks[e]&&"function"==typeof l.callbacks[e]}function a(){var e=[h[0].offsetTop,h[0].offsetLeft],i=[g[0].offsetTop,g[0].offsetLeft],n=[h.outerHeight(!1),h.outerWidth(!1)],s=[u.height(),u.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:i[0],draggerLeft:i[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(n[0])-s[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(n[1])-s[1])),direction:o.dir}}var r=t.data(n),l=r.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:l.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},o=e.extend(d,o),c=[o.dur,o.drag?0:o.dur],u=e("#mCSB_"+r.idx),h=e("#mCSB_"+r.idx+"_container"),p=h.parent(),m=l.callbacks.onTotalScrollOffset?N.call(t,l.callbacks.onTotalScrollOffset):[0,0],f=l.callbacks.onTotalScrollBackOffset?N.call(t,l.callbacks.onTotalScrollBackOffset):[0,0];if(r.trigger=o.trigger,(0!==p.scrollTop()||0!==p.scrollLeft())&&(e(".mCSB_"+r.idx+"_scrollbar").css("visibility","visible"),p.scrollTop(0).scrollLeft(0)),"_resetY"!==i||r.contentReset.y||(s("onOverflowYNone")&&l.callbacks.onOverflowYNone.call(t[0]),r.contentReset.y=1),"_resetX"!==i||r.contentReset.x||(s("onOverflowXNone")&&l.callbacks.onOverflowXNone.call(t[0]),r.contentReset.x=1),"_resetY"!==i&&"_resetX"!==i){switch(!r.contentReset.y&&t[0].mcs||!r.overflowed[0]||(s("onOverflowY")&&l.callbacks.onOverflowY.call(t[0]),r.contentReset.x=null),!r.contentReset.x&&t[0].mcs||!r.overflowed[1]||(s("onOverflowX")&&l.callbacks.onOverflowX.call(t[0]),r.contentReset.x=null),l.snapAmount&&(i=function(e,t,i){return Math.round(e/t)*t-i}(i,l.snapAmount,l.snapOffset)),o.dir){case"x":var g=e("#mCSB_"+r.idx+"_dragger_horizontal"),v="left",y=h[0].offsetLeft,b=[u.width()-h.outerWidth(!1),g.parent().width()-g.width()],w=[i,0===i?0:i/r.scrollRatio.x],x=m[1],S=f[1],T=x>0?x/r.scrollRatio.x:0,k=S>0?S/r.scrollRatio.x:0;break;case"y":var g=e("#mCSB_"+r.idx+"_dragger_vertical"),v="top",y=h[0].offsetTop,b=[u.height()-h.outerHeight(!1),g.parent().height()-g.height()],w=[i,0===i?0:i/r.scrollRatio.y],x=m[0],S=f[0],T=x>0?x/r.scrollRatio.y:0,k=S>0?S/r.scrollRatio.y:0}w[1]<0||0===w[0]&&0===w[1]?w=[0,0]:w[1]>=b[1]?w=[b[0],b[1]]:w[0]=-w[0],t[0].mcs||(a(),s("onInit")&&l.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),(r.tweenRunning||!(0===y&&w[0]>=0||y===b[0]&&w[0]<=b[0]))&&(Y(g[0],v,Math.round(w[1]),c[1],o.scrollEasing),Y(h[0],v,Math.round(w[0]),c[0],o.scrollEasing,o.overwrite,{onStart:function(){o.callbacks&&o.onStart&&!r.tweenRunning&&(s("onScrollStart")&&(a(),l.callbacks.onScrollStart.call(t[0])),r.tweenRunning=!0,C(g),r.cbOffsets=[l.callbacks.alwaysTriggerOffsets||y>=b[0]+x,l.callbacks.alwaysTriggerOffsets||-S>=y])},onUpdate:function(){o.callbacks&&o.onUpdate&&s("whileScrolling")&&(a(),l.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(o.callbacks&&o.onComplete){"yx"===l.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){s("onScroll")&&(a(),l.callbacks.onScroll.call(t[0])),s("onTotalScroll")&&w[1]>=b[1]-T&&r.cbOffsets[0]&&(a(),l.callbacks.onTotalScroll.call(t[0])),s("onTotalScrollBack")&&w[1]<=k&&r.cbOffsets[1]&&(a(),l.callbacks.onTotalScrollBack.call(t[0])),r.tweenRunning=!1,h[0].idleTimer=0,C(g,"hide")},e)}}}))}},Y=function(e,t,i,n,o,s,a){function r(){y.stop||(f||u.call(),f=X()-m,l(),f>=y.time&&(y.time=f>y.time?f+d-(f-y.time):f+d-1,y.time<f+1&&(y.time=f+1)),y.time<n?y.id=c(r):p.call())}function l(){n>0?(y.currVal=function(e,t,i,n,o){switch(o){case"linear":case"mcsLinear":return i*e/n+t;case"mcsLinearOut":return e/=n,e--,i*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return 1>(e/=n/2)?i/2*e*e+t:-i/2*(--e*(e-2)-1)+t;case"easeInOutStrong":return 1>(e/=n/2)?i/2*Math.pow(2,10*(e-1))+t:(e--,i/2*(2-Math.pow(2,-10*e))+t);case"easeInOut":case"mcsEaseInOut":return 1>(e/=n/2)?i/2*e*e*e+t:i/2*((e-=2)*e*e+2)+t;case"easeOutSmooth":return e/=n,-i*(--e*e*e*e-1)+t;case"easeOutStrong":return i*(1-Math.pow(2,-10*e/n))+t;case"easeOut":case"mcsEaseOut":default:var s=(e/=n)*e,a=s*e;return t+i*(.499999999999997*a*s+-2.5*s*s+5.5*a+-6.5*s+4*e)}}(y.time,g,b,n,o),v[t]=Math.round(y.currVal)+"px"):v[t]=i+"px",h.call()}e._mTween||(e._mTween={top:{},left:{}});var d,c,a=a||{},u=a.onStart||function(){},h=a.onUpdate||function(){},p=a.onComplete||function(){},m=X(),f=0,g=e.offsetTop,v=e.style,y=e._mTween[t];"left"===t&&(g=e.offsetLeft);var b=i-g;y.stop=0,"none"!==s&&null!=y.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(y.id):clearTimeout(y.id),y.id=null),d=1e3/60,y.time=f+d,c=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return l(),setTimeout(e,.01)},y.id=c(r)},X=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Q=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],i=0;i<t.length;i++){var n=t[i];e._mTween[n].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[n].id):clearTimeout(e._mTween[n].id),e._mTween[n].id=null,e._mTween[n].stop=1)}},Z=function(e,t){try{delete e[t]}catch(i){e[t]=null}},G=function(e){return!(e.which&&1!==e.which)},K=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},J=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ee=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]};e.fn[i]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[i]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[i].defaults=s,window[i]=!0,e(window).load(function(){e(o)[i](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var i,n,o=e(t),s=o.parents(".mCSB_container");return s.length?(i=s.parent(),(n=[s[0].offsetTop,s[0].offsetLeft])[0]+ee(o)[0]>=0&&n[0]+ee(o)[0]<i.height()-o.outerHeight(!1)&&n[1]+ee(o)[1]>=0&&n[1]+ee(o)[1]<i.width()-o.outerWidth(!1)):void 0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var i=e(t).data(n);return i?i.overflowed[0]||i.overflowed[1]:void 0}})})}()});var mejs=mejs||{};mejs.version="2.18.2",mejs.meIndex=0,mejs.plugins={silverlight:[{version:[3,0],types:["video/mp4","video/m4v","video/mov","video/wmv","audio/wma","audio/m4a","audio/mp3","audio/wav","audio/mpeg"]}],flash:[{version:[9,0,124],types:["video/mp4","video/m4v","video/mov","video/flv","video/rtmp","video/x-flv","audio/flv","audio/x-flv","audio/mp3","audio/m4a","audio/mpeg","video/youtube","video/x-youtube","video/dailymotion","video/x-dailymotion","application/x-mpegURL"]}],youtube:[{version:null,types:["video/youtube","video/x-youtube","audio/youtube","audio/x-youtube"]}],vimeo:[{version:null,types:["video/vimeo","video/x-vimeo"]}]},mejs.Utility={encodeUrl:function(e){return encodeURIComponent(e)},escapeHTML:function(e){return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")},absolutizeUrl:function(e){var t=document.createElement("div");return t.innerHTML='<a href="'+this.escapeHTML(e)+'">x</a>',t.firstChild.href},getScriptPath:function(e){for(var t,i,n,o,s,a=0,r="",l="",d=document.getElementsByTagName("script"),c=d.length,u=e.length;c>a;a++){for((i=(n=d[a].src).lastIndexOf("/"))>-1?(s=n.substring(i+1),o=n.substring(0,i+1)):(s=n,o=""),t=0;u>t;t++)if(l=e[t],s.indexOf(l)>-1){r=o;break}if(""!==r)break}return r},calculateTimeFormat:function(e,t,i){0>e&&(e=0),void 0===i&&(i=25);var n=t.timeFormat,o=n[0],s=n[1]==n[0],a=s?2:1,r=":",l=Math.floor(e/3600)%24,d=Math.floor(e/60)%60,c=Math.floor(e%60),u=[[Math.floor((e%1*i).toFixed(3)),"f"],[c,"s"],[d,"m"],[l,"h"]];n.length<a&&(r=n[a]);for(var h=!1,p=0,m=u.length;m>p;p++)if(-1!==n.indexOf(u[p][1]))h=!0;else if(h){for(var f=!1,g=p;m>g;g++)if(u[g][0]>0){f=!0;break}if(!f)break;s||(n=o+n),n=u[p][1]+r+n,s&&(n=u[p][1]+n),o=u[p][1]}t.currentTimeFormat=n},twoDigitsString:function(e){return 10>e?"0"+e:String(e)},secondsToTimeCode:function(e,t){if(0>e&&(e=0),"object"!=typeof t){var n="m:ss";n=arguments[1]?"hh:mm:ss":n,t={currentTimeFormat:n=arguments[2]?n+":ff":n,framesPerSecond:arguments[3]||25}}var o=t.framesPerSecond;void 0===o&&(o=25);n=t.currentTimeFormat;var s=Math.floor(e/3600)%24,a=Math.floor(e/60)%60,r=Math.floor(e%60),l=Math.floor((e%1*o).toFixed(3));lis=[[l,"f"],[r,"s"],[a,"m"],[s,"h"]];var d=n;for(i=0,len=lis.length;i<len;i++)d=(d=d.replace(lis[i][1]+lis[i][1],this.twoDigitsString(lis[i][0]))).replace(lis[i][1],lis[i][0]);return d},timeCodeToSeconds:function(e,t,i,n){void 0===i?i=!1:void 0===n&&(n=25);var o=e.split(":"),s=parseInt(o[0],10),a=parseInt(o[1],10),r=parseInt(o[2],10),l=0;return i&&(l=parseInt(o[3])/n),3600*s+60*a+r+l},convertSMPTEtoSeconds:function(e){if("string"!=typeof e)return!1;var t=0,i=-1!=(e=e.replace(",",".")).indexOf(".")?e.split(".")[1].length:0,n=1;e=e.split(":").reverse();for(var o=0;o<e.length;o++)n=1,o>0&&(n=Math.pow(60,o)),t+=Number(e[o])*n;return Number(t.toFixed(i))},removeSwf:function(e){var t=document.getElementById(e);t&&/object|embed/i.test(t.nodeName)&&(mejs.MediaFeatures.isIE?(t.style.display="none",function(){4==t.readyState?mejs.Utility.removeObjectInIE(e):setTimeout(arguments.callee,10)}()):t.parentNode.removeChild(t))},removeObjectInIE:function(e){var t=document.getElementById(e);if(t){for(var i in t)"function"==typeof t[i]&&(t[i]=null);t.parentNode.removeChild(t)}}},mejs.PluginDetector={hasPluginVersion:function(e,t){var i=this.plugins[e];return t[1]=t[1]||0,t[2]=t[2]||0,i[0]>t[0]||i[0]==t[0]&&i[1]>t[1]||i[0]==t[0]&&i[1]==t[1]&&i[2]>=t[2]},nav:window.navigator,ua:window.navigator.userAgent.toLowerCase(),plugins:[],addPlugin:function(e,t,i,n,o){this.plugins[e]=this.detectPlugin(t,i,n,o)},detectPlugin:function(e,t,i,n){var o,s,a,r=[0,0,0];if(void 0!==this.nav.plugins&&"object"==typeof this.nav.plugins[e]){if((o=this.nav.plugins[e].description)&&(void 0===this.nav.mimeTypes||!this.nav.mimeTypes[t]||this.nav.mimeTypes[t].enabledPlugin))for(r=o.replace(e,"").replace(/^\s+/,"").replace(/\sr/gi,".").split("."),s=0;s<r.length;s++)r[s]=parseInt(r[s].match(/\d+/),10)}else if(void 0!==window.ActiveXObject)try{(a=new ActiveXObject(i))&&(r=n(a))}catch(e){}return r}},mejs.PluginDetector.addPlugin("flash","Shockwave Flash","application/x-shockwave-flash","ShockwaveFlash.ShockwaveFlash",function(e){var t=[],i=e.GetVariable("$version");return i&&(i=i.split(" ")[1].split(","),t=[parseInt(i[0],10),parseInt(i[1],10),parseInt(i[2],10)]),t}),mejs.PluginDetector.addPlugin("silverlight","Silverlight Plug-In","application/x-silverlight-2","AgControl.AgControl",function(e){var t=[0,0,0,0],i=function(e,t,i,n){for(;e.isVersionSupported(t[0]+"."+t[1]+"."+t[2]+"."+t[3]);)t[i]+=n;t[i]-=n};return i(e,t,0,1),i(e,t,1,1),i(e,t,2,1e4),i(e,t,2,1e3),i(e,t,2,100),i(e,t,2,10),i(e,t,2,1),i(e,t,3,1),t}),mejs.MediaFeatures={init:function(){var e,t,i=this,n=document,o=mejs.PluginDetector.nav,s=mejs.PluginDetector.ua.toLowerCase(),a=["source","track","audio","video"];i.isiPad=null!==s.match(/ipad/i),i.isiPhone=null!==s.match(/iphone/i),i.isiOS=i.isiPhone||i.isiPad,i.isAndroid=null!==s.match(/android/i),i.isBustedAndroid=null!==s.match(/android 2\.[12]/),i.isBustedNativeHTTPS="https:"===location.protocol&&(null!==s.match(/android [12]\./)||null!==s.match(/macintosh.* version.* safari/)),i.isIE=-1!=o.appName.toLowerCase().indexOf("microsoft")||null!==o.appName.toLowerCase().match(/trident/gi),i.isChrome=null!==s.match(/chrome/gi),i.isChromium=null!==s.match(/chromium/gi),i.isFirefox=null!==s.match(/firefox/gi),i.isWebkit=null!==s.match(/webkit/gi),i.isGecko=null!==s.match(/gecko/gi)&&!i.isWebkit&&!i.isIE,i.isOpera=null!==s.match(/opera/gi),i.hasTouch="ontouchstart"in window,i.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect;for(e=0;e<a.length;e++)t=document.createElement(a[e]);i.supportsMediaTag=void 0!==t.canPlayType||i.isBustedAndroid;try{t.canPlayType("video/mp4")}catch(e){i.supportsMediaTag=!1}i.hasSemiNativeFullScreen=void 0!==t.webkitEnterFullscreen,i.hasNativeFullscreen=void 0!==t.requestFullscreen,i.hasWebkitNativeFullScreen=void 0!==t.webkitRequestFullScreen,i.hasMozNativeFullScreen=void 0!==t.mozRequestFullScreen,i.hasMsNativeFullScreen=void 0!==t.msRequestFullscreen,i.hasTrueNativeFullScreen=i.hasWebkitNativeFullScreen||i.hasMozNativeFullScreen||i.hasMsNativeFullScreen,i.nativeFullScreenEnabled=i.hasTrueNativeFullScreen,i.hasMozNativeFullScreen?i.nativeFullScreenEnabled=document.mozFullScreenEnabled:i.hasMsNativeFullScreen&&(i.nativeFullScreenEnabled=document.msFullscreenEnabled),i.isChrome&&(i.hasSemiNativeFullScreen=!1),i.hasTrueNativeFullScreen&&(i.fullScreenEventName="",i.hasWebkitNativeFullScreen?i.fullScreenEventName="webkitfullscreenchange":i.hasMozNativeFullScreen?i.fullScreenEventName="mozfullscreenchange":i.hasMsNativeFullScreen&&(i.fullScreenEventName="MSFullscreenChange"),i.isFullScreen=function(){return i.hasMozNativeFullScreen?n.mozFullScreen:i.hasWebkitNativeFullScreen?n.webkitIsFullScreen:i.hasMsNativeFullScreen?null!==n.msFullscreenElement:void 0},i.requestFullScreen=function(e){i.hasWebkitNativeFullScreen?e.webkitRequestFullScreen():i.hasMozNativeFullScreen?e.mozRequestFullScreen():i.hasMsNativeFullScreen&&e.msRequestFullscreen()},i.cancelFullScreen=function(){i.hasWebkitNativeFullScreen?document.webkitCancelFullScreen():i.hasMozNativeFullScreen?document.mozCancelFullScreen():i.hasMsNativeFullScreen&&document.msExitFullscreen()}),i.hasSemiNativeFullScreen&&s.match(/mac os x 10_5/i)&&(i.hasNativeFullScreen=!1,i.hasSemiNativeFullScreen=!1)}},mejs.MediaFeatures.init(),mejs.HtmlMediaElement={pluginType:"native",isFullScreen:!1,setCurrentTime:function(e){this.currentTime=e},setMuted:function(e){this.muted=e},setVolume:function(e){this.volume=e},stop:function(){this.pause()},setSrc:function(e){for(var t=this.getElementsByTagName("source");t.length>0;)this.removeChild(t[0]);var i,n;if("string"==typeof e)this.src=e;else for(i=0;i<e.length;i++)if(n=e[i],this.canPlayType(n.type)){this.src=n.src;break}},setVideoSize:function(e,t){this.width=e,this.height=t}},mejs.PluginMediaElement=function(e,t,i){this.id=e,this.pluginType=t,this.src=i,this.events={},this.attributes={}},mejs.PluginMediaElement.prototype={pluginElement:null,pluginType:"",isFullScreen:!1,playbackRate:-1,defaultPlaybackRate:-1,seekable:[],played:[],paused:!0,ended:!1,seeking:!1,duration:0,error:null,tagName:"",muted:!1,volume:1,currentTime:0,play:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.playVideo():this.pluginApi.playMedia(),this.paused=!1)},load:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType||this.pluginApi.loadMedia(),this.paused=!1)},pause:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.pauseVideo():this.pluginApi.pauseMedia(),this.paused=!0)},stop:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.stopVideo():this.pluginApi.stopMedia(),this.paused=!0)},canPlayType:function(e){var t,i,n,o=mejs.plugins[this.pluginType];for(t=0;t<o.length;t++)if(n=o[t],mejs.PluginDetector.hasPluginVersion(this.pluginType,n.version))for(i=0;i<n.types.length;i++)if(e==n.types[i])return"probably";return""},positionFullscreenButton:function(e,t,i){null!=this.pluginApi&&this.pluginApi.positionFullscreenButton&&this.pluginApi.positionFullscreenButton(Math.floor(e),Math.floor(t),i)},hideFullscreenButton:function(){null!=this.pluginApi&&this.pluginApi.hideFullscreenButton&&this.pluginApi.hideFullscreenButton()},setSrc:function(e){var t,i;if("string"==typeof e)this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(e)),this.src=mejs.Utility.absolutizeUrl(e);else for(t=0;t<e.length;t++)if(i=e[t],this.canPlayType(i.type)){this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(i.src)),this.src=mejs.Utility.absolutizeUrl(i.src);break}},setCurrentTime:function(e){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.seekTo(e):this.pluginApi.setCurrentTime(e),this.currentTime=e)},setVolume:function(e){null!=this.pluginApi&&("youtube"==this.pluginType?this.pluginApi.setVolume(100*e):this.pluginApi.setVolume(e),this.volume=e)},setMuted:function(e){null!=this.pluginApi&&("youtube"==this.pluginType?(e?this.pluginApi.mute():this.pluginApi.unMute(),this.muted=e,this.dispatchEvent({type:"volumechange"})):this.pluginApi.setMuted(e),this.muted=e)},setVideoSize:function(e,t){this.pluginElement&&this.pluginElement.style&&(this.pluginElement.style.width=e+"px",this.pluginElement.style.height=t+"px"),null!=this.pluginApi&&this.pluginApi.setVideoSize&&this.pluginApi.setVideoSize(e,t)},setFullscreen:function(e){null!=this.pluginApi&&this.pluginApi.setFullscreen&&this.pluginApi.setFullscreen(e)},enterFullScreen:function(){null!=this.pluginApi&&this.pluginApi.setFullscreen&&this.setFullscreen(!0)},exitFullScreen:function(){null!=this.pluginApi&&this.pluginApi.setFullscreen&&this.setFullscreen(!1)},addEventListener:function(e,t,i){this.events[e]=this.events[e]||[],this.events[e].push(t)},removeEventListener:function(e,t){if(!e)return this.events={},!0;var i=this.events[e];if(!i)return!0;if(!t)return this.events[e]=[],!0;for(var n=0;n<i.length;n++)if(i[n]===t)return this.events[e].splice(n,1),!0;return!1},dispatchEvent:function(e){var t,i=this.events[e.type];if(i)for(t=0;t<i.length;t++)i[t].apply(this,[e])},hasAttribute:function(e){return e in this.attributes},removeAttribute:function(e){delete this.attributes[e]},getAttribute:function(e){return this.hasAttribute(e)?this.attributes[e]:""},setAttribute:function(e,t){this.attributes[e]=t},remove:function(){mejs.Utility.removeSwf(this.pluginElement.id),mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)}},mejs.MediaPluginBridge={pluginMediaElements:{},htmlMediaElements:{},registerPluginElement:function(e,t,i){this.pluginMediaElements[e]=t,this.htmlMediaElements[e]=i},unregisterPluginElement:function(e){delete this.pluginMediaElements[e],delete this.htmlMediaElements[e]},initPlugin:function(e){var t=this.pluginMediaElements[e],i=this.htmlMediaElements[e];if(t){switch(t.pluginType){case"flash":t.pluginElement=t.pluginApi=document.getElementById(e);break;case"silverlight":t.pluginElement=document.getElementById(t.id),t.pluginApi=t.pluginElement.Content.MediaElementJS}null!=t.pluginApi&&t.success&&t.success(t,i)}},fireEvent:function(e,t,i){var n,o,s,a=this.pluginMediaElements[e];if(a){for(o in n={type:t,target:a},i)a[o]=i[o],n[o]=i[o];s=i.bufferedTime||0,n.target.buffered=n.buffered={start:function(e){return 0},end:function(e){return s},length:1},a.dispatchEvent(n)}}},mejs.MediaElementDefaults={mode:"auto",plugins:["flash","silverlight","youtube","vimeo"],enablePluginDebug:!1,httpsBasicAuthSite:!1,type:"",pluginPath:mejs.Utility.getScriptPath(["mediaelement.js","mediaelement.min.js","mediaelement-and-player.js","mediaelement-and-player.min.js"]),flashName:"flashmediaelement.swf",flashStreamer:"",flashScriptAccess:"sameDomain",enablePluginSmoothing:!1,enablePseudoStreaming:!1,pseudoStreamingStartQueryParam:"start",silverlightName:"silverlightmediaelement.xap",defaultVideoWidth:480,defaultVideoHeight:270,pluginWidth:-1,pluginHeight:-1,pluginVars:[],timerRate:250,startVolume:.8,success:function(){},error:function(){}},mejs.MediaElement=function(e,t){return mejs.HtmlMediaElementShim.create(e,t)},mejs.HtmlMediaElementShim={create:function(e,t){var i,n,o={},s="string"==typeof e?document.getElementById(e):e,a=s.tagName.toLowerCase(),r="audio"===a||"video"===a,l=r?s.getAttribute("src"):s.getAttribute("href"),d=s.getAttribute("poster"),c=s.getAttribute("autoplay"),u=s.getAttribute("preload"),h=s.getAttribute("controls");for(n in mejs.MediaElementDefaults)o[n]=mejs.MediaElementDefaults[n];for(n in t)o[n]=t[n];return l=null==l||""==l?null:l,d=null==d?"":d,u=null==u||"false"===u?"none":u,c=!(null==c||"false"===c),h=!(null==h||"false"===h),(i=this.determinePlayback(s,o,mejs.MediaFeatures.supportsMediaTag,r,l)).url=null!==i.url?mejs.Utility.absolutizeUrl(i.url):"","native"==i.method?(mejs.MediaFeatures.isBustedAndroid&&(s.src=i.url,s.addEventListener("click",function(){s.play()},!1)),this.updateNative(i,o,c,u)):""!==i.method?this.createPlugin(i,o,d,c,u,h):(this.createErrorMessage(i,o,d),this)},determinePlayback:function(e,t,i,n,o){var s,a,r,l,d,c,u,h,p,m,f,g=[],v={method:"",url:"",htmlMediaElement:e,isVideo:"audio"!=e.tagName.toLowerCase()};if(void 0!==t.type&&""!==t.type)if("string"==typeof t.type)g.push({type:t.type,url:o});else for(s=0;s<t.type.length;s++)g.push({type:t.type[s],url:o});else if(null!==o)c=this.formatType(o,e.getAttribute("type")),g.push({type:c,url:o});else for(s=0;s<e.childNodes.length;s++)1==(d=e.childNodes[s]).nodeType&&"source"==d.tagName.toLowerCase()&&(o=d.getAttribute("src"),c=this.formatType(o,d.getAttribute("type")),(!(f=d.getAttribute("media"))||!window.matchMedia||window.matchMedia&&window.matchMedia(f).matches)&&g.push({type:c,url:o}));if(!n&&g.length>0&&null!==g[0].url&&this.getTypeFromFile(g[0].url).indexOf("audio")>-1&&(v.isVideo=!1),mejs.MediaFeatures.isBustedAndroid&&(e.canPlayType=function(e){return null!==e.match(/video\/(mp4|m4v)/gi)?"maybe":""}),mejs.MediaFeatures.isChromium&&(e.canPlayType=function(e){return null!==e.match(/video\/(webm|ogv|ogg)/gi)?"maybe":""}),i&&("auto"===t.mode||"auto_plugin"===t.mode||"native"===t.mode)&&(!mejs.MediaFeatures.isBustedNativeHTTPS||!0!==t.httpsBasicAuthSite)){for(n||(m=document.createElement(v.isVideo?"video":"audio"),e.parentNode.insertBefore(m,e),e.style.display="none",v.htmlMediaElement=e=m),s=0;s<g.length;s++)if("video/m3u8"==g[s].type||""!==e.canPlayType(g[s].type).replace(/no/,"")||""!==e.canPlayType(g[s].type.replace(/mp3/,"mpeg")).replace(/no/,"")||""!==e.canPlayType(g[s].type.replace(/m4a/,"mp4")).replace(/no/,"")){v.method="native",v.url=g[s].url;break}if("native"===v.method&&(null!==v.url&&(e.src=v.url),"auto_plugin"!==t.mode))return v}if("auto"===t.mode||"auto_plugin"===t.mode||"shim"===t.mode)for(s=0;s<g.length;s++)for(c=g[s].type,a=0;a<t.plugins.length;a++)for(u=t.plugins[a],h=mejs.plugins[u],r=0;r<h.length;r++)if(null==(p=h[r]).version||mejs.PluginDetector.hasPluginVersion(u,p.version))for(l=0;l<p.types.length;l++)if(c.toLowerCase()==p.types[l].toLowerCase())return v.method=u,v.url=g[s].url,v;return"auto_plugin"===t.mode&&"native"===v.method?v:(""===v.method&&g.length>0&&(v.url=g[0].url),v)},formatType:function(e,t){return e&&!t?this.getTypeFromFile(e):t&&~t.indexOf(";")?t.substr(0,t.indexOf(";")):t},getTypeFromFile:function(e){var t=(e=e.split("?")[0]).substring(e.lastIndexOf(".")+1).toLowerCase(),i=/(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(t)?"video/":"audio/";return this.getTypeFromExtension(t,i)},getTypeFromExtension:function(e,t){switch(t=t||"",e){case"mp4":case"m4v":case"m4a":case"f4v":case"f4a":return t+"mp4";case"flv":return t+"x-flv";case"webm":case"webma":case"webmv":return t+"webm";case"ogg":case"oga":case"ogv":return t+"ogg";case"m3u8":return"application/x-mpegurl";case"ts":return t+"mp2t";default:return t+e}},createErrorMessage:function(e,t,i){var n=e.htmlMediaElement,o=document.createElement("div"),s=t.customError;o.className="me-cannotplay";try{o.style.width=n.width+"px",o.style.height=n.height+"px"}catch(e){}s||(s='<a href="'+e.url+'">',""!==i&&(s+='<img src="'+i+'" width="100%" height="100%" alt="" />'),s+="<span>"+mejs.i18n.t("Download File")+"</span></a>"),o.innerHTML=s,n.parentNode.insertBefore(o,n),n.style.display="none",t.error(n)},createPlugin:function(e,t,i,n,o,s){var a,r,l,d=e.htmlMediaElement,c=1,u=1,h="me_"+e.method+"_"+mejs.meIndex++,p=new mejs.PluginMediaElement(h,e.method,e.url),m=document.createElement("div");p.tagName=d.tagName;for(var f=0;f<d.attributes.length;f++){var g=d.attributes[f];g.specified&&p.setAttribute(g.name,g.value)}for(r=d.parentNode;null!==r&&null!=r.tagName&&"body"!==r.tagName.toLowerCase()&&null!=r.parentNode&&null!=r.parentNode.tagName&&null!=r.parentNode.constructor&&"ShadowRoot"===r.parentNode.constructor.name;){if("p"===r.parentNode.tagName.toLowerCase()){r.parentNode.parentNode.insertBefore(r,r.parentNode);break}r=r.parentNode}switch(e.isVideo?(c=t.pluginWidth>0?t.pluginWidth:t.videoWidth>0?t.videoWidth:null!==d.getAttribute("width")?d.getAttribute("width"):t.defaultVideoWidth,u=t.pluginHeight>0?t.pluginHeight:t.videoHeight>0?t.videoHeight:null!==d.getAttribute("height")?d.getAttribute("height"):t.defaultVideoHeight,c=mejs.Utility.encodeUrl(c),u=mejs.Utility.encodeUrl(u)):t.enablePluginDebug&&(c=320,u=240),p.success=t.success,mejs.MediaPluginBridge.registerPluginElement(h,p,d),m.className="me-plugin",m.id=h+"_container",e.isVideo?d.parentNode.insertBefore(m,d):document.body.insertBefore(m,document.body.childNodes[0]),l=["id="+h,"jsinitfunction=mejs.MediaPluginBridge.initPlugin","jscallbackfunction=mejs.MediaPluginBridge.fireEvent","isvideo="+(e.isVideo?"true":"false"),"autoplay="+(n?"true":"false"),"preload="+o,"width="+c,"startvolume="+t.startVolume,"timerrate="+t.timerRate,"flashstreamer="+t.flashStreamer,"height="+u,"pseudostreamstart="+t.pseudoStreamingStartQueryParam],null!==e.url&&("flash"==e.method?l.push("file="+mejs.Utility.encodeUrl(e.url)):l.push("file="+e.url)),t.enablePluginDebug&&l.push("debug=true"),t.enablePluginSmoothing&&l.push("smoothing=true"),t.enablePseudoStreaming&&l.push("pseudostreaming=true"),s&&l.push("controls=true"),t.pluginVars&&(l=l.concat(t.pluginVars)),e.method){case"silverlight":m.innerHTML='<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="'+h+'" name="'+h+'" width="'+c+'" height="'+u+'" class="mejs-shim"><param name="initParams" value="'+l.join(",")+'" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="'+t.pluginPath+t.silverlightName+'" /></object>';break;case"flash":mejs.MediaFeatures.isIE?(a=document.createElement("div"),m.appendChild(a),a.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+h+'" width="'+c+'" height="'+u+'" class="mejs-shim"><param name="movie" value="'+t.pluginPath+t.flashName+"?x="+new Date+'" /><param name="flashvars" value="'+l.join("&amp;")+'" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="'+t.flashScriptAccess+'" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>'):m.innerHTML='<embed id="'+h+'" name="'+h+'" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="'+t.flashScriptAccess+'" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="'+t.pluginPath+t.flashName+'" flashvars="'+l.join("&")+'" width="'+c+'" height="'+u+'" scale="default"class="mejs-shim"></embed>';break;case"youtube":var v;-1!=e.url.lastIndexOf("youtu.be")?-1!=(v=e.url.substr(e.url.lastIndexOf("/")+1)).indexOf("?")&&(v=v.substr(0,v.indexOf("?"))):v=e.url.substr(e.url.lastIndexOf("=")+1),youtubeSettings={container:m,containerId:m.id,pluginMediaElement:p,pluginId:h,videoId:v,height:u,width:c},mejs.PluginDetector.hasPluginVersion("flash",[10,0,0])?mejs.YouTubeApi.createFlash(youtubeSettings,t):mejs.YouTubeApi.enqueueIframe(youtubeSettings);break;case"vimeo":var y=h+"_player";if(p.vimeoid=e.url.substr(e.url.lastIndexOf("/")+1),m.innerHTML='<iframe src="//player.vimeo.com/video/'+p.vimeoid+"?api=1&portrait=0&byline=0&title=0&player_id="+y+'" width="'+c+'" height="'+u+'" frameborder="0" class="mejs-shim" id="'+y+'" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',"function"==typeof $f){var b=$f(m.childNodes[0]);b.addEvent("ready",function(){function e(e,t,i,n){var o={type:i,target:t};"timeupdate"==i&&(t.currentTime=o.currentTime=n.seconds,t.duration=o.duration=n.duration),t.dispatchEvent(o)}b.playVideo=function(){b.api("play")},b.stopVideo=function(){b.api("unload")},b.pauseVideo=function(){b.api("pause")},b.seekTo=function(e){b.api("seekTo",e)},b.setVolume=function(e){b.api("setVolume",e)},b.setMuted=function(e){e?(b.lastVolume=b.api("getVolume"),b.api("setVolume",0)):(b.api("setVolume",b.lastVolume),delete b.lastVolume)},b.addEvent("play",function(){e(0,p,"play"),e(0,p,"playing")}),b.addEvent("pause",function(){e(0,p,"pause")}),b.addEvent("finish",function(){e(0,p,"ended")}),b.addEvent("playProgress",function(t){e(0,p,"timeupdate",t)}),p.pluginElement=m,p.pluginApi=b,mejs.MediaPluginBridge.initPlugin(h)})}else console.warn("You need to include froogaloop for vimeo to work")}return d.style.display="none",d.removeAttribute("autoplay"),p},updateNative:function(e,t,i,n){var o,s=e.htmlMediaElement;for(o in mejs.HtmlMediaElement)s[o]=mejs.HtmlMediaElement[o];return t.success(s,s),s}},mejs.YouTubeApi={isIframeStarted:!1,isIframeLoaded:!1,loadIframeApi:function(){if(!this.isIframeStarted){var e=document.createElement("script");e.src="//www.youtube.com/player_api";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t),this.isIframeStarted=!0}},iframeQueue:[],enqueueIframe:function(e){this.isLoaded?this.createIframe(e):(this.loadIframeApi(),this.iframeQueue.push(e))},createIframe:function(e){var t=e.pluginMediaElement,i=new YT.Player(e.containerId,{height:e.height,width:e.width,videoId:e.videoId,playerVars:{controls:0},events:{onReady:function(){e.pluginMediaElement.pluginApi=i,mejs.MediaPluginBridge.initPlugin(e.pluginId),setInterval(function(){mejs.YouTubeApi.createEvent(i,t,"timeupdate")},250)},onStateChange:function(e){mejs.YouTubeApi.handleStateChange(e.data,i,t)}}})},createEvent:function(e,t,i){var n={type:i,target:t};if(e&&e.getDuration){t.currentTime=n.currentTime=e.getCurrentTime(),t.duration=n.duration=e.getDuration(),n.paused=t.paused,n.ended=t.ended,n.muted=e.isMuted(),n.volume=e.getVolume()/100,n.bytesTotal=e.getVideoBytesTotal(),n.bufferedBytes=e.getVideoBytesLoaded();var o=n.bufferedBytes/n.bytesTotal*n.duration;n.target.buffered=n.buffered={start:function(e){return 0},end:function(e){return o},length:1}}t.dispatchEvent(n)},iFrameReady:function(){for(this.isLoaded=!0,this.isIframeLoaded=!0;this.iframeQueue.length>0;){var e=this.iframeQueue.pop();this.createIframe(e)}},flashPlayers:{},createFlash:function(e){this.flashPlayers[e.pluginId]=e;var t,i="//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid="+e.pluginId+"&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";mejs.MediaFeatures.isIE?(t=document.createElement("div"),e.container.appendChild(t),t.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+e.pluginId+'" width="'+e.width+'" height="'+e.height+'" class="mejs-shim"><param name="movie" value="'+i+'" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="'+options.flashScriptAccess+'" /><param name="allowFullScreen" value="true" /></object>'):e.container.innerHTML='<object type="application/x-shockwave-flash" id="'+e.pluginId+'" data="'+i+'" width="'+e.width+'" height="'+e.height+'" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="'+options.flashScriptAccess+'"><param name="wmode" value="transparent"></object>'},flashReady:function(e){var t=this.flashPlayers[e],i=document.getElementById(e),n=t.pluginMediaElement;n.pluginApi=n.pluginElement=i,mejs.MediaPluginBridge.initPlugin(e),i.cueVideoById(t.videoId);var o=t.containerId+"_callback";window[o]=function(e){mejs.YouTubeApi.handleStateChange(e,i,n)},i.addEventListener("onStateChange",o),setInterval(function(){mejs.YouTubeApi.createEvent(i,n,"timeupdate")},250),mejs.YouTubeApi.createEvent(i,n,"canplay")},handleStateChange:function(e,t,i){switch(e){case-1:i.paused=!0,i.ended=!0,mejs.YouTubeApi.createEvent(t,i,"loadedmetadata");break;case 0:i.paused=!1,i.ended=!0,mejs.YouTubeApi.createEvent(t,i,"ended");break;case 1:i.paused=!1,i.ended=!1,mejs.YouTubeApi.createEvent(t,i,"play"),mejs.YouTubeApi.createEvent(t,i,"playing");break;case 2:i.paused=!0,i.ended=!1,mejs.YouTubeApi.createEvent(t,i,"pause");break;case 3:mejs.YouTubeApi.createEvent(t,i,"progress")}}},window.onYouTubePlayerAPIReady=function(){mejs.YouTubeApi.iFrameReady()},window.onYouTubePlayerReady=function(e){mejs.YouTubeApi.flashReady(e)},window.mejs=mejs,window.MediaElement=mejs.MediaElement,function(e,t,i){"use strict";var n={locale:{language:t.i18n&&t.i18n.locale.language||"",strings:t.i18n&&t.i18n.locale.strings||{}},ietf_lang_regex:/^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,methods:{},getLanguage:function(){var e=n.locale.language||window.navigator.userLanguage||window.navigator.language;return n.ietf_lang_regex.exec(e)?e:null}};"undefined"!=typeof mejsL10n&&(n.locale.language=mejsL10n.language),n.methods.checkPlain=function(e){var t,i,n={"&":"&amp;",'"':"&quot;","<":"&lt;",">":"&gt;"};for(t in e=String(e),n)n.hasOwnProperty(t)&&(i=new RegExp(t,"g"),e=e.replace(i,n[t]));return e},n.methods.t=function(e,t){return n.locale.strings&&n.locale.strings[t.context]&&n.locale.strings[t.context][e]&&(e=n.locale.strings[t.context][e]),n.methods.checkPlain(e)},n.t=function(e,t){if("string"==typeof e&&e.length>0){var i=n.getLanguage();return t=t||{context:i},n.methods.t(e,t)}throw{name:"InvalidArgumentException",message:"First argument is either not a string or empty."}},t.i18n=n}(document,mejs),function(e,t){"use strict";"undefined"!=typeof mejsL10n&&(e[mejsL10n.language]=mejsL10n.strings)}(mejs.i18n.locale.strings),"undefined"!=typeof jQuery?mejs.$=jQuery:"undefined"!=typeof Zepto?(mejs.$=Zepto,Zepto.fn.outerWidth=function(e){var t=$(this).width();return e&&(t+=parseInt($(this).css("margin-right"),10),t+=parseInt($(this).css("margin-left"),10)),t}):"undefined"!=typeof ender&&(mejs.$=ender),function(e){mejs.MepDefaults={poster:"",showPosterWhenEnded:!1,defaultVideoWidth:480,defaultVideoHeight:270,videoWidth:-1,videoHeight:-1,defaultAudioWidth:400,defaultAudioHeight:30,defaultSeekBackwardInterval:function(e){return.05*e.duration},defaultSeekForwardInterval:function(e){return.05*e.duration},setDimensions:!0,audioWidth:-1,audioHeight:-1,startVolume:.8,loop:!1,autoRewind:!0,enableAutosize:!0,timeFormat:"",alwaysShowHours:!1,showTimecodeFrameCount:!1,framesPerSecond:25,autosizeProgress:!0,alwaysShowControls:!1,hideVideoControlsOnLoad:!1,clickToPlayPause:!0,iPadUseNativeControls:!1,iPhoneUseNativeControls:!1,AndroidUseNativeControls:!1,features:["playpause","current","progress","duration","tracks","volume","fullscreen"],isVideo:!0,enableKeyboard:!0,pauseOtherPlayers:!0,keyActions:[{keys:[32,179],action:function(e,t){t.paused||t.ended?t.play():t.pause()}},{keys:[38],action:function(e,t){e.container.find(".mejs-volume-slider").css("display","block"),e.isVideo&&(e.showControls(),e.startControlsTimer());var i=Math.min(t.volume+.1,1);t.setVolume(i)}},{keys:[40],action:function(e,t){e.container.find(".mejs-volume-slider").css("display","block"),e.isVideo&&(e.showControls(),e.startControlsTimer());var i=Math.max(t.volume-.1,0);t.setVolume(i)}},{keys:[37,227],action:function(e,t){if(!isNaN(t.duration)&&t.duration>0){e.isVideo&&(e.showControls(),e.startControlsTimer());var i=Math.max(t.currentTime-e.options.defaultSeekBackwardInterval(t),0);t.setCurrentTime(i)}}},{keys:[39,228],action:function(e,t){if(!isNaN(t.duration)&&t.duration>0){e.isVideo&&(e.showControls(),e.startControlsTimer());var i=Math.min(t.currentTime+e.options.defaultSeekForwardInterval(t),t.duration);t.setCurrentTime(i)}}},{keys:[70],action:function(e,t){void 0!==e.enterFullScreen&&(e.isFullScreen?e.exitFullScreen():e.enterFullScreen())}},{keys:[77],action:function(e,t){e.container.find(".mejs-volume-slider").css("display","block"),e.isVideo&&(e.showControls(),e.startControlsTimer()),e.media.muted?e.setMuted(!1):e.setMuted(!0)}}]},mejs.mepIndex=0,mejs.players={},mejs.MediaElementPlayer=function(t,i){if(!(this instanceof mejs.MediaElementPlayer))return new mejs.MediaElementPlayer(t,i);var n=this;return n.$media=n.$node=e(t),n.node=n.media=n.$media[0],n.node?void 0!==n.node.player?n.node.player:(void 0===i&&(i=n.$node.data("mejsoptions")),n.options=e.extend({},mejs.MepDefaults,i),n.options.timeFormat||(n.options.timeFormat="mm:ss",n.options.alwaysShowHours&&(n.options.timeFormat="hh:mm:ss"),n.options.showTimecodeFrameCount&&(n.options.timeFormat+=":ff")),mejs.Utility.calculateTimeFormat(0,n.options,n.options.framesPerSecond||25),n.id="mep_"+mejs.mepIndex++,mejs.players[n.id]=n,n.init(),n):void 0},mejs.MediaElementPlayer.prototype={hasFocus:!1,controlsAreVisible:!0,init:function(){var t=this,i=mejs.MediaFeatures,n=e.extend(!0,{},t.options,{success:function(e,i){t.meReady(e,i)},error:function(e){t.handleError(e)}}),o=t.media.tagName.toLowerCase();if(t.isDynamic="audio"!==o&&"video"!==o,t.isDynamic?t.isVideo=t.options.isVideo:t.isVideo="audio"!==o&&t.options.isVideo,i.isiPad&&t.options.iPadUseNativeControls||i.isiPhone&&t.options.iPhoneUseNativeControls)t.$media.attr("controls","controls"),i.isiPad&&null!==t.media.getAttribute("autoplay")&&t.play();else if(i.isAndroid&&t.options.AndroidUseNativeControls);else{t.$media.removeAttr("controls");var s=t.isVideo?mejs.i18n.t("Video Player"):mejs.i18n.t("Audio Player");if(e('<span class="mejs-offscreen">'+s+"</span>").insertBefore(t.$media),t.container=e('<div id="'+t.id+'" class="mejs-container '+(mejs.MediaFeatures.svg?"svg":"no-svg")+'" tabindex="0" role="application" aria-label="'+s+'"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(t.$media[0].className).insertBefore(t.$media).focus(function(e){t.controlsAreVisible||(t.showControls(!0),t.container.find(".mejs-playpause-button > button").focus())}),t.container.addClass((i.isAndroid?"mejs-android ":"")+(i.isiOS?"mejs-ios ":"")+(i.isiPad?"mejs-ipad ":"")+(i.isiPhone?"mejs-iphone ":"")+(t.isVideo?"mejs-video ":"mejs-audio ")),i.isiOS){var a=t.$media.clone();t.container.find(".mejs-mediaelement").append(a),t.$media.remove(),t.$node=t.$media=a,t.node=t.media=a[0]}else t.container.find(".mejs-mediaelement").append(t.$media);t.node.player=t,t.controls=t.container.find(".mejs-controls"),t.layers=t.container.find(".mejs-layers");var r=t.isVideo?"video":"audio",l=r.substring(0,1).toUpperCase()+r.substring(1);t.options[r+"Width"]>0||t.options[r+"Width"].toString().indexOf("%")>-1?t.width=t.options[r+"Width"]:""!==t.media.style.width&&null!==t.media.style.width?t.width=t.media.style.width:null!==t.media.getAttribute("width")?t.width=t.$media.attr("width"):t.width=t.options["default"+l+"Width"],t.options[r+"Height"]>0||t.options[r+"Height"].toString().indexOf("%")>-1?t.height=t.options[r+"Height"]:""!==t.media.style.height&&null!==t.media.style.height?t.height=t.media.style.height:null!==t.$media[0].getAttribute("height")?t.height=t.$media.attr("height"):t.height=t.options["default"+l+"Height"],t.setPlayerSize(t.width,t.height),n.pluginWidth=t.width,n.pluginHeight=t.height}mejs.MediaElement(t.$media[0],n),void 0!==t.container&&t.controlsAreVisible&&t.container.trigger("controlsshown")},showControls:function(e){var t=this;e=void 0===e||e,t.controlsAreVisible||(e?(t.controls.css("visibility","visible").stop(!0,!0).fadeIn(200,function(){t.controlsAreVisible=!0,t.container.trigger("controlsshown")}),t.container.find(".mejs-control").css("visibility","visible").stop(!0,!0).fadeIn(200,function(){t.controlsAreVisible=!0})):(t.controls.css("visibility","visible").css("display","block"),t.container.find(".mejs-control").css("visibility","visible").css("display","block"),t.controlsAreVisible=!0,t.container.trigger("controlsshown")),t.setControlsSize())},hideControls:function(t){var i=this;t=void 0===t||t,!i.controlsAreVisible||i.options.alwaysShowControls||i.keyboardAction||(t?(i.controls.stop(!0,!0).fadeOut(200,function(){e(this).css("visibility","hidden").css("display","block"),i.controlsAreVisible=!1,i.container.trigger("controlshidden")}),i.container.find(".mejs-control").stop(!0,!0).fadeOut(200,function(){e(this).css("visibility","hidden").css("display","block")})):(i.controls.css("visibility","hidden").css("display","block"),i.container.find(".mejs-control").css("visibility","hidden").css("display","block"),i.controlsAreVisible=!1,i.container.trigger("controlshidden")))},controlsTimer:null,startControlsTimer:function(e){var t=this;e=void 0!==e?e:1500,t.killControlsTimer("start"),t.controlsTimer=setTimeout(function(){t.hideControls(),t.killControlsTimer("hide")},e)},killControlsTimer:function(e){var t=this;null!==t.controlsTimer&&(clearTimeout(t.controlsTimer),delete t.controlsTimer,t.controlsTimer=null)},controlsEnabled:!0,disableControls:function(){this.killControlsTimer(),this.hideControls(!1),this.controlsEnabled=!1},enableControls:function(){this.showControls(!1),this.controlsEnabled=!0},meReady:function(t,i){var n,o,s=this,a=mejs.MediaFeatures,r=i.getAttribute("autoplay"),l=!(null==r||"false"===r);if(!s.created){if(s.created=!0,s.media=t,s.domNode=i,!(a.isAndroid&&s.options.AndroidUseNativeControls||a.isiPad&&s.options.iPadUseNativeControls||a.isiPhone&&s.options.iPhoneUseNativeControls)){for(n in s.buildposter(s,s.controls,s.layers,s.media),s.buildkeyboard(s,s.controls,s.layers,s.media),s.buildoverlays(s,s.controls,s.layers,s.media),s.findTracks(),s.options.features)if(o=s.options.features[n],s["build"+o])try{s["build"+o](s,s.controls,s.layers,s.media)}catch(e){}s.container.trigger("controlsready"),s.setPlayerSize(s.width,s.height),s.setControlsSize(),s.isVideo&&(mejs.MediaFeatures.hasTouch?s.$media.bind("touchstart",function(){s.controlsAreVisible?s.hideControls(!1):s.controlsEnabled&&s.showControls(!1)}):(s.clickToPlayPauseCallback=function(){s.options.clickToPlayPause&&(s.media.paused?s.play():s.pause())},s.media.addEventListener("click",s.clickToPlayPauseCallback,!1),s.container.bind("mouseenter",function(){s.controlsEnabled&&(s.options.alwaysShowControls||(s.killControlsTimer("enter"),s.showControls(),s.startControlsTimer(2500)))}).bind("mousemove",function(){s.controlsEnabled&&(s.controlsAreVisible||s.showControls(),s.options.alwaysShowControls||s.startControlsTimer(2500))}).bind("mouseleave",function(){s.controlsEnabled&&(s.media.paused||s.options.alwaysShowControls||s.startControlsTimer(1e3))})),s.options.hideVideoControlsOnLoad&&s.hideControls(!1),l&&!s.options.alwaysShowControls&&s.hideControls(),s.options.enableAutosize&&s.media.addEventListener("loadedmetadata",function(e){s.options.videoHeight<=0&&null===s.domNode.getAttribute("height")&&!isNaN(e.target.videoHeight)&&(s.setPlayerSize(e.target.videoWidth,e.target.videoHeight),s.setControlsSize(),s.media.setVideoSize(e.target.videoWidth,e.target.videoHeight))},!1)),t.addEventListener("play",function(){var e;for(e in mejs.players){var t=mejs.players[e];t.id==s.id||!s.options.pauseOtherPlayers||t.paused||t.ended||t.pause(),t.hasFocus=!1}s.hasFocus=!0},!1),s.media.addEventListener("ended",function(t){if(s.options.autoRewind)try{s.media.setCurrentTime(0),window.setTimeout(function(){e(s.container).find(".mejs-overlay-loading").parent().hide()},20)}catch(e){}s.media.pause(),s.setProgressRail&&s.setProgressRail(),s.setCurrentRail&&s.setCurrentRail(),s.options.loop?s.play():!s.options.alwaysShowControls&&s.controlsEnabled&&s.showControls()},!1),s.media.addEventListener("loadedmetadata",function(e){s.updateDuration&&s.updateDuration(),s.updateCurrent&&s.updateCurrent(),s.isFullScreen||(s.setPlayerSize(s.width,s.height),s.setControlsSize())},!1);var d=null;s.media.addEventListener("timeupdate",function(){d!==this.duration&&(d=this.duration,mejs.Utility.calculateTimeFormat(d,s.options,s.options.framesPerSecond||25))},!1),s.container.focusout(function(t){if(t.relatedTarget){var i=e(t.relatedTarget);s.keyboardAction&&0===i.parents(".mejs-container").length&&(s.keyboardAction=!1,s.hideControls(!0))}}),setTimeout(function(){s.setPlayerSize(s.width,s.height),s.setControlsSize()},50),s.globalBind("resize",function(){s.isFullScreen||mejs.MediaFeatures.hasTrueNativeFullScreen&&document.webkitIsFullScreen||s.setPlayerSize(s.width,s.height),s.setControlsSize()}),"youtube"==s.media.pluginType&&(a.isiOS||a.isAndroid)&&s.container.find(".mejs-overlay-play").hide()}l&&"native"==t.pluginType&&s.play(),s.options.success&&("string"==typeof s.options.success?window[s.options.success](s.media,s.domNode,s):s.options.success(s.media,s.domNode,s))}},handleError:function(e){var t=this;t.controls.hide(),t.options.error&&t.options.error(e)},setPlayerSize:function(t,i){var n=this;if(!n.options.setDimensions)return!1;if(void 0!==t&&(n.width=t),void 0!==i&&(n.height=i),n.height.toString().indexOf("%")>0||"none"!==n.$node.css("max-width")&&"t.width"!==n.$node.css("max-width")||n.$node[0].currentStyle&&"100%"===n.$node[0].currentStyle.maxWidth){var o=n.isVideo?n.media.videoWidth&&n.media.videoWidth>0?n.media.videoWidth:null!==n.media.getAttribute("width")?n.media.getAttribute("width"):n.options.defaultVideoWidth:n.options.defaultAudioWidth,s=n.isVideo?n.media.videoHeight&&n.media.videoHeight>0?n.media.videoHeight:null!==n.media.getAttribute("height")?n.media.getAttribute("height"):n.options.defaultVideoHeight:n.options.defaultAudioHeight,a=n.container.parent().closest(":visible").width(),r=n.container.parent().closest(":visible").height(),l=n.isVideo||!n.options.autosizeProgress?parseInt(a*s/o,10):s;isNaN(l)&&(l=r),n.container.parent().length>0&&"body"===n.container.parent()[0].tagName.toLowerCase()&&(a=e(window).width(),l=e(window).height()),l&&a&&(n.container.width(a).height(l),n.$media.add(n.container.find(".mejs-shim")).width("100%").height("100%"),n.isVideo&&n.media.setVideoSize&&n.media.setVideoSize(a,l),n.layers.children(".mejs-layer").width("100%").height("100%"))}else n.container.width(n.width).height(n.height),n.layers.children(".mejs-layer").width(n.width).height(n.height)},setControlsSize:function(){var t=this,i=0,n=0,o=t.controls.find(".mejs-time-rail"),s=t.controls.find(".mejs-time-total"),a=o.siblings(),r=a.last(),l=null;if(t.container.is(":visible")&&o.length&&o.is(":visible")){t.options&&!t.options.autosizeProgress&&(n=parseInt(o.css("width"),10)),0!==n&&n||(a.each(function(){var t=e(this);"absolute"!=t.css("position")&&t.is(":visible")&&(i+=e(this).outerWidth(!0))}),n=t.controls.width()-i-(o.outerWidth(!0)-o.width()));do{o.width(n),s.width(n-(s.outerWidth(!0)-s.width())),"absolute"!=r.css("position")&&(l=r.length?r.position():null,n--)}while(null!==l&&l.top>0&&n>0);t.container.trigger("controlsresize")}},buildposter:function(t,i,n,o){var s=e('<div class="mejs-poster mejs-layer"></div>').appendTo(n),a=t.$media.attr("poster");""!==t.options.poster&&(a=t.options.poster),a?this.setPoster(a):s.hide(),o.addEventListener("play",function(){s.hide()},!1),t.options.showPosterWhenEnded&&t.options.autoRewind&&o.addEventListener("ended",function(){s.show()},!1)},setPoster:function(t){var i=this.container.find(".mejs-poster"),n=i.find("img");0===n.length&&(n=e('<img width="100%" height="100%" alt="" />').appendTo(i)),n.attr("src",t),i.css({"background-image":"url("+t+")"})},buildoverlays:function(t,i,n,o){var s=this;if(t.isVideo){var a=e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(n),r=e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(n),l=e('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(n).bind("click",function(){s.options.clickToPlayPause&&o.paused&&o.play()});o.addEventListener("play",function(){l.hide(),a.hide(),i.find(".mejs-time-buffering").hide(),r.hide()},!1),o.addEventListener("playing",function(){l.hide(),a.hide(),i.find(".mejs-time-buffering").hide(),r.hide()},!1),o.addEventListener("seeking",function(){a.show(),i.find(".mejs-time-buffering").show()},!1),o.addEventListener("seeked",function(){a.hide(),i.find(".mejs-time-buffering").hide()},!1),o.addEventListener("pause",function(){mejs.MediaFeatures.isiPhone||l.show()},!1),o.addEventListener("waiting",function(){a.show(),i.find(".mejs-time-buffering").show()},!1),o.addEventListener("loadeddata",function(){a.show(),i.find(".mejs-time-buffering").show(),mejs.MediaFeatures.isAndroid&&(o.canplayTimeout=window.setTimeout(function(){if(document.createEvent){var e=document.createEvent("HTMLEvents");return e.initEvent("canplay",!0,!0),o.dispatchEvent(e)}},300))},!1),o.addEventListener("canplay",function(){a.hide(),i.find(".mejs-time-buffering").hide(),clearTimeout(o.canplayTimeout)},!1),o.addEventListener("error",function(e){s.handleError(e),a.hide(),l.hide(),r.show(),r.find(".mejs-overlay-error").html("Error loading this resource")},!1),o.addEventListener("keydown",function(e){s.onkeydown(t,o,e)},!1)}},buildkeyboard:function(t,i,n,o){var s=this;s.container.keydown(function(){s.keyboardAction=!0}),s.globalBind("keydown",function(i){return t.hasFocus=0!==e(i.target).closest(".mejs-container").length,s.onkeydown(t,o,i)}),s.globalBind("click",function(i){t.hasFocus=0!==e(i.target).closest(".mejs-container").length})},onkeydown:function(e,t,i){if(e.hasFocus&&e.options.enableKeyboard)for(var n=0,o=e.options.keyActions.length;o>n;n++)for(var s=e.options.keyActions[n],a=0,r=s.keys.length;r>a;a++)if(i.keyCode==s.keys[a])return"function"==typeof i.preventDefault&&i.preventDefault(),s.action(e,t,i.keyCode),!1;return!0},findTracks:function(){var t=this,i=t.$media.find("track");t.tracks=[],i.each(function(i,n){n=e(n),t.tracks.push({srclang:n.attr("srclang")?n.attr("srclang").toLowerCase():"",src:n.attr("src"),kind:n.attr("kind"),label:n.attr("label")||"",entries:[],isLoaded:!1})})},changeSkin:function(e){this.container[0].className="mejs-container "+e,this.setPlayerSize(this.width,this.height),this.setControlsSize()},play:function(){this.load(),this.media.play()},pause:function(){try{this.media.pause()}catch(e){}},load:function(){this.isLoaded||this.media.load(),this.isLoaded=!0},setMuted:function(e){this.media.setMuted(e)},setCurrentTime:function(e){this.media.setCurrentTime(e)},getCurrentTime:function(){return this.media.currentTime},setVolume:function(e){this.media.setVolume(e)},getVolume:function(){return this.media.volume},setSrc:function(e){this.media.setSrc(e)},remove:function(){var e,t,i=this;for(e in i.container.prev(".mejs-offscreen").remove(),i.options.features)if(i["clean"+(t=i.options.features[e])])try{i["clean"+t](i)}catch(e){}i.isDynamic?i.$node.insertBefore(i.container):(i.$media.prop("controls",!0),i.$node.clone().insertBefore(i.container).show(),i.$node.remove()),"native"!==i.media.pluginType&&i.media.remove(),delete mejs.players[i.id],"object"==typeof i.container&&i.container.remove(),i.globalUnbind(),delete i.node.player},rebuildtracks:function(){var e=this;e.findTracks(),e.buildtracks(e,e.controls,e.layers,e.media)},resetSize:function(){var e=this;setTimeout(function(){e.setPlayerSize(e.width,e.height),e.setControlsSize()},50)}},function(){function t(t,n){var o={d:[],w:[]};return e.each((t||"").split(" "),function(e,t){var s=t+"."+n;0===s.indexOf(".")?(o.d.push(s),o.w.push(s)):o[i.test(t)?"w":"d"].push(s)}),o.d=o.d.join(" "),o.w=o.w.join(" "),o}var i=/^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;mejs.MediaElementPlayer.prototype.globalBind=function(i,n,o){var s=this,a=s.node?s.node.ownerDocument:document;(i=t(i,s.id)).d&&e(a).bind(i.d,n,o),i.w&&e(window).bind(i.w,n,o)},mejs.MediaElementPlayer.prototype.globalUnbind=function(i,n){var o=this,s=o.node?o.node.ownerDocument:document;(i=t(i,o.id)).d&&e(s).unbind(i.d,n),i.w&&e(window).unbind(i.w,n)}}(),void 0!==e&&(e.fn.mediaelementplayer=function(t){return!1===t?this.each(function(){var t=e(this).data("mediaelementplayer");t&&t.remove(),e(this).removeData("mediaelementplayer")}):this.each(function(){e(this).data("mediaelementplayer",new mejs.MediaElementPlayer(this,t))}),this},e(document).ready(function(){e(".mejs-player").mediaelementplayer()})),window.MediaElementPlayer=mejs.MediaElementPlayer}(mejs.$),function(e){e.extend(mejs.MepDefaults,{playText:mejs.i18n.t("Play"),pauseText:mejs.i18n.t("Pause")}),e.extend(MediaElementPlayer.prototype,{buildplaypause:function(t,i,n,o){function s(e){"play"===e?(r.removeClass("mejs-play").addClass("mejs-pause"),l.attr({title:a.pauseText,"aria-label":a.pauseText})):(r.removeClass("mejs-pause").addClass("mejs-play"),l.attr({title:a.playText,"aria-label":a.playText}))}var a=this.options,r=e('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="'+this.id+'" title="'+a.playText+'" aria-label="'+a.playText+'"></button></div>').appendTo(i).click(function(e){return e.preventDefault(),o.paused?o.play():o.pause(),!1}),l=r.find("button");s("pse"),o.addEventListener("play",function(){s("play")},!1),o.addEventListener("playing",function(){s("play")},!1),o.addEventListener("pause",function(){s("pse")},!1),o.addEventListener("paused",function(){s("pse")},!1)}})}(mejs.$),function(e){e.extend(mejs.MepDefaults,{stopText:"Stop"}),e.extend(MediaElementPlayer.prototype,{buildstop:function(t,i,n,o){var s=this;e('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="'+s.id+'" title="'+s.options.stopText+'" aria-label="'+s.options.stopText+'"></button></div>').appendTo(i).click(function(){o.paused||o.pause(),o.currentTime>0&&(o.setCurrentTime(0),o.pause(),i.find(".mejs-time-current").width("0px"),i.find(".mejs-time-handle").css("left","0px"),i.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0,t.options)),i.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0,t.options)),n.find(".mejs-poster").show())})}})}(mejs.$),function(e){e.extend(mejs.MepDefaults,{progessHelpText:mejs.i18n.t("Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.")}),e.extend(MediaElementPlayer.prototype,{buildprogress:function(t,i,n,o){e('<div class="mejs-time-rail"><span  class="mejs-time-total mejs-time-slider"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(i),i.find(".mejs-time-buffering").hide();var s=this,a=i.find(".mejs-time-total"),r=i.find(".mejs-time-loaded"),l=i.find(".mejs-time-current"),d=i.find(".mejs-time-handle"),c=i.find(".mejs-time-float"),u=i.find(".mejs-time-float-current"),h=i.find(".mejs-time-slider"),p=function(e){var i,n=a.offset(),s=a.width(),r=0,l=0,d=0;i=e.originalEvent&&e.originalEvent.changedTouches?e.originalEvent.changedTouches[0].pageX:e.changedTouches?e.changedTouches[0].pageX:e.pageX,o.duration&&(i<n.left?i=n.left:i>s+n.left&&(i=s+n.left),l=.02>=(r=(d=i-n.left)/s)?0:r*o.duration,m&&l!==o.currentTime&&o.setCurrentTime(l),mejs.MediaFeatures.hasTouch||(c.css("left",d),u.html(mejs.Utility.secondsToTimeCode(l,t.options)),c.show()))},m=!1,f=0,g=!1,v=t.options.autoRewind,y=function(){new Date-f>=1e3&&o.play()};h.bind("focus",function(e){t.options.autoRewind=!1}),h.bind("blur",function(e){t.options.autoRewind=v}),h.bind("keydown",function(e){new Date-f>=1e3&&(g=o.paused);var t=e.keyCode,i=o.duration,n=o.currentTime;switch(t){case 37:n-=1;break;case 39:n+=1;break;case 38:n+=Math.floor(.1*i);break;case 40:n-=Math.floor(.1*i);break;case 36:n=0;break;case 35:n=i;break;case 10:case 13:return void(o.paused?o.play():o.pause());default:return}return n=0>n?0:n>=i?i:Math.floor(n),f=new Date,g||o.pause(),n<o.duration&&!g&&setTimeout(y,1100),o.setCurrentTime(n),e.preventDefault(),e.stopPropagation(),!1}),a.bind("mousedown touchstart",function(e){(1===e.which||0===e.which)&&(m=!0,p(e),s.globalBind("mousemove.dur touchmove.dur",function(e){p(e)}),s.globalBind("mouseup.dur touchend.dur",function(e){m=!1,c.hide(),s.globalUnbind(".dur")}))}).bind("mouseenter",function(e){!0,s.globalBind("mousemove.dur",function(e){p(e)}),mejs.MediaFeatures.hasTouch||c.show()}).bind("mouseleave",function(e){!1,m||(s.globalUnbind(".dur"),c.hide())}),o.addEventListener("progress",function(e){t.setProgressRail(e),t.setCurrentRail(e)},!1),o.addEventListener("timeupdate",function(e){var i,n,s,a;t.setProgressRail(e),t.setCurrentRail(e),i=o.currentTime,n=mejs.i18n.t("Time Slider"),s=mejs.Utility.secondsToTimeCode(i,t.options),a=o.duration,h.attr({"aria-label":n,"aria-valuemin":0,"aria-valuemax":a,"aria-valuenow":i,"aria-valuetext":s,role:"slider",tabindex:0})},!1),s.container.on("controlsresize",function(){t.setProgressRail(),t.setCurrentRail()}),s.loaded=r,s.total=a,s.current=l,s.handle=d},setProgressRail:function(e){var t=this,i=void 0!==e?e.target:t.media,n=null;i&&i.buffered&&i.buffered.length>0&&i.buffered.end&&i.duration?n=i.buffered.end(i.buffered.length-1)/i.duration:i&&void 0!==i.bytesTotal&&i.bytesTotal>0&&void 0!==i.bufferedBytes?n=i.bufferedBytes/i.bytesTotal:e&&e.lengthComputable&&0!==e.total&&(n=e.loaded/e.total),null!==n&&(n=Math.min(1,Math.max(0,n)),t.loaded&&t.total&&t.loaded.width(t.total.width()*n))},setCurrentRail:function(){var e=this;if(void 0!==e.media.currentTime&&e.media.duration&&e.total&&e.handle){var t=Math.round(e.total.width()*e.media.currentTime/e.media.duration),i=t-Math.round(e.handle.outerWidth(!0)/2);e.current.width(t),e.handle.css("left",i)}}})}(mejs.$),function(e){e.extend(mejs.MepDefaults,{duration:-1,timeAndDurationSeparator:"<span> | </span>"}),e.extend(MediaElementPlayer.prototype,{buildcurrent:function(t,i,n,o){e('<div class="mejs-time" role="timer" aria-live="off"><span class="mejs-currenttime">'+mejs.Utility.secondsToTimeCode(0,t.options)+"</span></div>").appendTo(i),this.currenttime=this.controls.find(".mejs-currenttime"),o.addEventListener("timeupdate",function(){t.updateCurrent()},!1)},buildduration:function(t,i,n,o){var s=this;i.children().last().find(".mejs-currenttime").length>0?e(s.options.timeAndDurationSeparator+'<span class="mejs-duration">'+mejs.Utility.secondsToTimeCode(s.options.duration,s.options)+"</span>").appendTo(i.find(".mejs-time")):(i.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"),e('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">'+mejs.Utility.secondsToTimeCode(s.options.duration,s.options)+"</span></div>").appendTo(i)),s.durationD=s.controls.find(".mejs-duration"),o.addEventListener("timeupdate",function(){t.updateDuration()},!1)},updateCurrent:function(){var e=this;e.currenttime&&e.currenttime.html(mejs.Utility.secondsToTimeCode(e.media.currentTime,e.options))},updateDuration:function(){var e=this;e.container.toggleClass("mejs-long-video",e.media.duration>3600),e.durationD&&(e.options.duration>0||e.media.duration)&&e.durationD.html(mejs.Utility.secondsToTimeCode(e.options.duration>0?e.options.duration:e.media.duration,e.options))}})}(mejs.$),function(e){e.extend(mejs.MepDefaults,{muteText:mejs.i18n.t("Mute Toggle"),allyVolumeControlText:mejs.i18n.t("Use Up/Down Arrow keys to increase or decrease volume."),hideVolumeOnTouchDevices:!0,audioVolume:"horizontal",videoVolume:"vertical"}),e.extend(MediaElementPlayer.prototype,{buildvolume:function(t,i,n,o){if(!mejs.MediaFeatures.isAndroid&&!mejs.MediaFeatures.isiOS||!this.options.hideVolumeOnTouchDevices){var s=this,a=s.isVideo?s.options.videoVolume:s.options.audioVolume,r="horizontal"==a?e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="'+s.id+'" title="'+s.options.muteText+'" aria-label="'+s.options.muteText+'"></button></div><a href="javascript:void(0);" class="mejs-horizontal-volume-slider"><span class="mejs-offscreen">'+s.options.allyVolumeControlText+'</span><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></a>').appendTo(i):e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="'+s.id+'" title="'+s.options.muteText+'" aria-label="'+s.options.muteText+'"></button><a href="javascript:void(0);" class="mejs-volume-slider"><span class="mejs-offscreen">'+s.options.allyVolumeControlText+'</span><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></a></div>').appendTo(i),l=s.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),d=s.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),c=s.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),u=s.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),h=function(e,t){if(!l.is(":visible")&&void 0===t)return l.show(),h(e,!0),void l.hide();e=Math.max(0,e),0===(e=Math.min(e,1))?(r.removeClass("mejs-mute").addClass("mejs-unmute"),r.children("button").attr("title",mejs.i18n.t("Unmute")).attr("aria-label",mejs.i18n.t("Unmute"))):(r.removeClass("mejs-unmute").addClass("mejs-mute"),r.children("button").attr("title",mejs.i18n.t("Mute")).attr("aria-label",mejs.i18n.t("Mute")));var i=d.position();if("vertical"==a){var n=d.height(),o=n-n*e;u.css("top",Math.round(i.top+o-u.height()/2)),c.height(n-o),c.css("top",i.top+o)}else{var s=d.width()*e;u.css("left",Math.round(i.left+s-u.width()/2)),c.width(Math.round(s))}},p=function(e){var t=null,i=d.offset();if("vertical"===a){var n=d.height();if(t=(n-(e.pageY-i.top))/n,0===i.top||0===i.left)return}else{var s=d.width();t=(e.pageX-i.left)/s}t=Math.max(0,t),t=Math.min(t,1),h(t),0===t?o.setMuted(!0):o.setMuted(!1),o.setVolume(t)},m=!1,f=!1;r.hover(function(){l.show(),f=!0},function(){f=!1,m||"vertical"!=a||l.hide()});l.bind("mouseover",function(){f=!0}).bind("mousedown",function(e){return p(e),s.globalBind("mousemove.vol",function(e){p(e)}),s.globalBind("mouseup.vol",function(){m=!1,s.globalUnbind(".vol"),f||"vertical"!=a||l.hide()}),m=!0,!1}).bind("keydown",function(e){var t=e.keyCode,i=o.volume;switch(t){case 38:i+=.1;break;case 40:i-=.1;break;default:return!0}return m=!1,h(i),o.setVolume(i),!1}),r.find("button").click(function(){o.setMuted(!o.muted)}),r.find("button").bind("focus",function(){l.show()}),o.addEventListener("volumechange",function(e){var t;m||(o.muted?(h(0),r.removeClass("mejs-mute").addClass("mejs-unmute")):(h(o.volume),r.removeClass("mejs-unmute").addClass("mejs-mute"))),t=Math.floor(100*o.volume),l.attr({"aria-label":mejs.i18n.t("volumeSlider"),"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":t,"aria-valuetext":t+"%",role:"slider",tabindex:0})},!1),0===t.options.startVolume&&o.setMuted(!0),"native"===o.pluginType&&o.setVolume(t.options.startVolume),s.container.on("controlsresize",function(){h(o.volume)})}}})}(mejs.$),function(e){e.extend(mejs.MepDefaults,{usePluginFullScreen:!0,newWindowCallback:function(){return""},fullscreenText:mejs.i18n.t("Fullscreen")}),e.extend(MediaElementPlayer.prototype,{isFullScreen:!1,isNativeFullScreen:!1,isInIframe:!1,buildfullscreen:function(t,i,n,o){if(t.isVideo){if(t.isInIframe=window.location!=window.parent.location,mejs.MediaFeatures.hasTrueNativeFullScreen){t.globalBind(mejs.MediaFeatures.fullScreenEventName,function(e){t.isFullScreen&&(mejs.MediaFeatures.isFullScreen()?(t.isNativeFullScreen=!0,t.setControlsSize()):(t.isNativeFullScreen=!1,t.exitFullScreen()))})}var s=this,a=e('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="'+s.id+'" title="'+s.options.fullscreenText+'" aria-label="'+s.options.fullscreenText+'"></button></div>').appendTo(i);if("native"===s.media.pluginType||!s.options.usePluginFullScreen&&!mejs.MediaFeatures.isFirefox)a.click(function(){mejs.MediaFeatures.hasTrueNativeFullScreen&&mejs.MediaFeatures.isFullScreen()||t.isFullScreen?t.exitFullScreen():t.enterFullScreen()});else{var r=null;if(function(){var e,t=document.createElement("x"),i=document.documentElement,n=window.getComputedStyle;return"pointerEvents"in t.style&&(t.style.pointerEvents="auto",t.style.pointerEvents="x",i.appendChild(t),e=n&&"auto"===n(t,"").pointerEvents,i.removeChild(t),!!e)}()&&!mejs.MediaFeatures.isOpera){var l,d,c=!1,u=function(){if(c){for(var e in h)h[e].hide();a.css("pointer-events",""),s.controls.css("pointer-events",""),s.media.removeEventListener("click",s.clickToPlayPauseCallback),c=!1}},h={},p=["top","left","right","bottom"],m=function(){var e=a.offset().left-s.container.offset().left,t=a.offset().top-s.container.offset().top,i=a.outerWidth(!0),n=a.outerHeight(!0),o=s.container.width(),r=s.container.height();for(l in h)h[l].css({position:"absolute",top:0,left:0});h.top.width(o).height(t),h.left.width(e).height(n).css({top:t}),h.right.width(o-e-i).height(n).css({top:t,left:e+i}),h.bottom.width(o).height(r-n-t).css({top:t+n})};for(s.globalBind("resize",function(){m()}),l=0,d=p.length;d>l;l++)h[p[l]]=e('<div class="mejs-fullscreen-hover" />').appendTo(s.container).mouseover(u).hide();a.on("mouseover",function(){if(!s.isFullScreen){var e=a.offset(),i=t.container.offset();for(l in o.positionFullscreenButton(e.left-i.left,e.top-i.top,!1),a.css("pointer-events","none"),s.controls.css("pointer-events","none"),s.media.addEventListener("click",s.clickToPlayPauseCallback),h)h[l].show();m(),c=!0}}),o.addEventListener("fullscreenchange",function(e){s.isFullScreen=!s.isFullScreen,s.isFullScreen?s.media.removeEventListener("click",s.clickToPlayPauseCallback):s.media.addEventListener("click",s.clickToPlayPauseCallback),u()}),s.globalBind("mousemove",function(e){if(c){var t=a.offset();(e.pageY<t.top||e.pageY>t.top+a.outerHeight(!0)||e.pageX<t.left||e.pageX>t.left+a.outerWidth(!0))&&(a.css("pointer-events",""),s.controls.css("pointer-events",""),c=!1)}})}else a.on("mouseover",function(){null!==r&&(clearTimeout(r),delete r);var e=a.offset(),i=t.container.offset();o.positionFullscreenButton(e.left-i.left,e.top-i.top,!0)}).on("mouseout",function(){null!==r&&(clearTimeout(r),delete r),r=setTimeout(function(){o.hideFullscreenButton()},1500)})}t.fullscreenBtn=a,s.globalBind("keydown",function(e){(mejs.MediaFeatures.hasTrueNativeFullScreen&&mejs.MediaFeatures.isFullScreen()||s.isFullScreen)&&27==e.keyCode&&t.exitFullScreen()}),s.normalHeight=0,s.normalWidth=0}},cleanfullscreen:function(e){e.exitFullScreen()},containerSizeTimeout:null,enterFullScreen:function(){var t=this;if("native"===t.media.pluginType||!mejs.MediaFeatures.isFirefox&&!t.options.usePluginFullScreen){if(e(document.documentElement).addClass("mejs-fullscreen"),t.normalHeight=t.container.height(),t.normalWidth=t.container.width(),"native"===t.media.pluginType)if(mejs.MediaFeatures.hasTrueNativeFullScreen)mejs.MediaFeatures.requestFullScreen(t.container[0]),t.isInIframe&&setTimeout(function i(){if(t.isNativeFullScreen){var n=window.devicePixelRatio||1,o=n*e(window).width(),s=screen.width,a=n*o;Math.abs(s-o)>Math.abs(s-a)&&(o=a),Math.abs(s-o)>.002*s?t.exitFullScreen():setTimeout(i,500)}},1e3);else if(mejs.MediaFeatures.hasSemiNativeFullScreen)return void t.media.webkitEnterFullscreen();if(t.isInIframe){var i=t.options.newWindowCallback(this);if(""!==i){if(!mejs.MediaFeatures.hasTrueNativeFullScreen)return t.pause(),void window.open(i,t.id,"top=0,left=0,width="+screen.availWidth+",height="+screen.availHeight+",resizable=yes,scrollbars=no,status=no,toolbar=no");setTimeout(function(){t.isNativeFullScreen||(t.pause(),window.open(i,t.id,"top=0,left=0,width="+screen.availWidth+",height="+screen.availHeight+",resizable=yes,scrollbars=no,status=no,toolbar=no"))},250)}}t.container.addClass("mejs-container-fullscreen").width("100%").height("100%"),t.containerSizeTimeout=setTimeout(function(){t.container.css({width:"100%",height:"100%"}),t.setControlsSize()},500),"native"===t.media.pluginType?t.$media.width("100%").height("100%"):(t.container.find(".mejs-shim").width("100%").height("100%"),t.media.setVideoSize(e(window).width(),e(window).height())),t.layers.children("div").width("100%").height("100%"),t.fullscreenBtn&&t.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"),t.setControlsSize(),t.isFullScreen=!0,t.container.find(".mejs-captions-text").css("font-size",screen.width/t.width*1*100+"%"),t.container.find(".mejs-captions-position").css("bottom","45px"),t.container.trigger("enteredfullscreen")}},exitFullScreen:function(){var t=this;return clearTimeout(t.containerSizeTimeout),"native"!==t.media.pluginType&&mejs.MediaFeatures.isFirefox?void t.media.setFullscreen(!1):(mejs.MediaFeatures.hasTrueNativeFullScreen&&(mejs.MediaFeatures.isFullScreen()||t.isFullScreen)&&mejs.MediaFeatures.cancelFullScreen(),e(document.documentElement).removeClass("mejs-fullscreen"),t.container.removeClass("mejs-container-fullscreen").width(t.normalWidth).height(t.normalHeight),"native"===t.media.pluginType?t.$media.width(t.normalWidth).height(t.normalHeight):(t.container.find(".mejs-shim").width(t.normalWidth).height(t.normalHeight),t.media.setVideoSize(t.normalWidth,t.normalHeight)),t.layers.children("div").width(t.normalWidth).height(t.normalHeight),t.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"),t.setControlsSize(),t.isFullScreen=!1,t.container.find(".mejs-captions-text").css("font-size",""),t.container.find(".mejs-captions-position").css("bottom",""),void t.container.trigger("exitedfullscreen"))}})}(mejs.$),function(e){e.extend(mejs.MepDefaults,{speeds:["2.00","1.50","1.25","1.00","0.75"],defaultSpeed:"1.00",speedChar:"x"}),e.extend(MediaElementPlayer.prototype,{buildspeed:function(t,i,n,o){var s=this;if("native"==s.media.pluginType){for(var a=null,r=null,l=null,d=null,c=[],u=!1,h=0,p=s.options.speeds.length;p>h;h++){var m=s.options.speeds[h];"string"==typeof m?(c.push({name:m+s.options.speedChar,value:m}),m===s.options.defaultSpeed&&(u=!0)):(c.push(m),m.value===s.options.defaultSpeed&&(u=!0))}u||c.push({name:s.options.defaultSpeed+s.options.speedChar,value:s.options.defaultSpeed}),c.sort(function(e,t){return parseFloat(t.value)-parseFloat(e.value)});var f=function(e){for(h=0,p=c.length;p>h;h++)if(c[h].value===e)return c[h].name},g='<div class="mejs-button mejs-speed-button"><button type="button">'+f(s.options.defaultSpeed)+'</button><div class="mejs-speed-selector"><ul>';for(h=0,il=c.length;h<il;h++)d=s.id+"-speed-"+c[h].value,g+='<li><input type="radio" name="speed" value="'+c[h].value+'" id="'+d+'" '+(c[h].value===s.options.defaultSpeed?" checked":"")+' /><label for="'+d+'" '+(c[h].value===s.options.defaultSpeed?' class="mejs-speed-selected"':"")+">"+c[h].name+"</label></li>";a=e(g+="</ul></div></div>").appendTo(i),r=a.find(".mejs-speed-selector"),l=s.options.defaultSpeed,o.addEventListener("loadedmetadata",function(e){l&&(o.playbackRate=parseFloat(l))},!0),r.on("click",'input[type="radio"]',function(){var t=e(this).attr("value");l=t,o.playbackRate=parseFloat(t),a.find("button").html(f(t)),a.find(".mejs-speed-selected").removeClass("mejs-speed-selected"),a.find('input[type="radio"]:checked').next().addClass("mejs-speed-selected")}),a.one("mouseenter focusin",function(){r.height(a.find(".mejs-speed-selector ul").outerHeight(!0)+a.find(".mejs-speed-translations").outerHeight(!0)).css("top",-1*r.height()+"px")})}}})}(mejs.$),function(e){e.extend(mejs.MepDefaults,{startLanguage:"",tracksText:mejs.i18n.t("Captions/Subtitles"),tracksAriaLive:!1,hideCaptionsButtonWhenEmpty:!0,toggleCaptionsButtonWhenOnlyOne:!1,slidesSelector:""}),e.extend(MediaElementPlayer.prototype,{hasChapters:!1,cleartracks:function(e,t,i,n){e&&(e.captions&&e.captions.remove(),e.chapters&&e.chapters.remove(),e.captionsText&&e.captionsText.remove(),e.captionsButton&&e.captionsButton.remove())},buildtracks:function(t,i,n,o){if(0!==t.tracks.length){var s,a=this,r=a.options.tracksAriaLive?'role="log" aria-live="assertive" aria-atomic="false"':"";if(a.domNode.textTracks)for(s=a.domNode.textTracks.length-1;s>=0;s--)a.domNode.textTracks[s].mode="hidden";a.cleartracks(t,i,n,o),t.chapters=e('<div class="mejs-chapters mejs-layer"></div>').prependTo(n).hide(),t.captions=e('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" '+r+'><span class="mejs-captions-text"></span></div></div>').prependTo(n).hide(),t.captionsText=t.captions.find(".mejs-captions-text"),t.captionsButton=e('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="'+a.id+'" title="'+a.options.tracksText+'" aria-label="'+a.options.tracksText+'"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="'+t.id+'_captions" id="'+t.id+'_captions_none" value="none" checked="checked" /><label for="'+t.id+'_captions_none">'+mejs.i18n.t("None")+"</label></li></ul></div></div>").appendTo(i);var l=0;for(s=0;s<t.tracks.length;s++)"subtitles"==t.tracks[s].kind&&l++;for(a.options.toggleCaptionsButtonWhenOnlyOne&&1==l?t.captionsButton.on("click",function(){null===t.selectedTrack?lang=t.tracks[0].srclang:lang="none",t.setTrack(lang)}):(t.captionsButton.on("mouseenter focusin",function(){e(this).find(".mejs-captions-selector").css("visibility","visible")}).on("click","input[type=radio]",function(){lang=this.value,t.setTrack(lang)}),t.captionsButton.on("mouseleave focusout",function(){e(this).find(".mejs-captions-selector").css("visibility","hidden")})),t.options.alwaysShowControls?t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover"):t.container.bind("controlsshown",function(){t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")}).bind("controlshidden",function(){o.paused||t.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")}),t.trackToLoad=-1,t.selectedTrack=null,t.isLoadingTrack=!1,s=0;s<t.tracks.length;s++)"subtitles"==t.tracks[s].kind&&t.addTrackButton(t.tracks[s].srclang,t.tracks[s].label);t.loadNextTrack(),o.addEventListener("timeupdate",function(e){t.displayCaptions()},!1),""!==t.options.slidesSelector&&(t.slidesContainer=e(t.options.slidesSelector),o.addEventListener("timeupdate",function(e){t.displaySlides()},!1)),o.addEventListener("loadedmetadata",function(e){t.displayChapters()},!1),t.container.hover(function(){t.hasChapters&&(t.chapters.css("visibility","visible"),t.chapters.fadeIn(200).height(t.chapters.find(".mejs-chapter").outerHeight()))},function(){t.hasChapters&&!o.paused&&t.chapters.fadeOut(200,function(){e(this).css("visibility","hidden"),e(this).css("display","block")})}),a.container.on("controlsresize",function(){a.adjustLanguageBox()}),null!==t.node.getAttribute("autoplay")&&t.chapters.css("visibility","hidden")}},setTrack:function(e){var t,i=this;if("none"==e)i.selectedTrack=null,i.captionsButton.removeClass("mejs-captions-enabled");else for(t=0;t<i.tracks.length;t++)if(i.tracks[t].srclang==e){null===i.selectedTrack&&i.captionsButton.addClass("mejs-captions-enabled"),i.selectedTrack=i.tracks[t],i.captions.attr("lang",i.selectedTrack.srclang),i.displayCaptions();break}},loadNextTrack:function(){var e=this;e.trackToLoad++,e.trackToLoad<e.tracks.length?(e.isLoadingTrack=!0,e.loadTrack(e.trackToLoad)):(e.isLoadingTrack=!1,e.checkForTracks())},loadTrack:function(t){var i=this,n=i.tracks[t];e.ajax({url:n.src,dataType:"text",success:function(e){"string"==typeof e&&/<tt\s+xml/gi.exec(e)?n.entries=mejs.TrackFormatParser.dfxp.parse(e):n.entries=mejs.TrackFormatParser.webvtt.parse(e),n.isLoaded=!0,i.enableTrackButton(n.srclang,n.label),i.loadNextTrack(),"chapters"==n.kind&&i.media.addEventListener("play",function(e){i.media.duration>0&&i.displayChapters(n)},!1),"slides"==n.kind&&i.setupSlides(n)},error:function(){i.removeTrackButton(n.srclang),i.loadNextTrack()}})},enableTrackButton:function(t,i){var n=this;""===i&&(i=mejs.language.codes[t]||t),n.captionsButton.find("input[value="+t+"]").prop("disabled",!1).siblings("label").html(i),n.options.startLanguage==t&&e("#"+n.id+"_captions_"+t).prop("checked",!0).trigger("click"),n.adjustLanguageBox()},removeTrackButton:function(e){this.captionsButton.find("input[value="+e+"]").closest("li").remove(),this.adjustLanguageBox()},addTrackButton:function(t,i){var n=this;""===i&&(i=mejs.language.codes[t]||t),n.captionsButton.find("ul").append(e('<li><input type="radio" name="'+n.id+'_captions" id="'+n.id+"_captions_"+t+'" value="'+t+'" disabled="disabled" /><label for="'+n.id+"_captions_"+t+'">'+i+" (loading)</label></li>")),n.adjustLanguageBox(),n.container.find(".mejs-captions-translations option[value="+t+"]").remove()},adjustLanguageBox:function(){var e=this;e.captionsButton.find(".mejs-captions-selector").height(e.captionsButton.find(".mejs-captions-selector ul").outerHeight(!0)+e.captionsButton.find(".mejs-captions-translations").outerHeight(!0))},checkForTracks:function(){var e=this,t=!1;if(e.options.hideCaptionsButtonWhenEmpty){for(i=0;i<e.tracks.length;i++)if("subtitles"==e.tracks[i].kind&&e.tracks[i].isLoaded){t=!0;break}t||(e.captionsButton.hide(),e.setControlsSize())}},displayCaptions:function(){if(void 0!==this.tracks){var e,t=this,i=t.selectedTrack;if(null!==i&&i.isLoaded){for(e=0;e<i.entries.times.length;e++)if(t.media.currentTime>=i.entries.times[e].start&&t.media.currentTime<=i.entries.times[e].stop)return t.captionsText.html(i.entries.text[e]).attr("class","mejs-captions-text "+(i.entries.times[e].identifier||"")),void t.captions.show().height(0);t.captions.hide()}else t.captions.hide()}},setupSlides:function(e){var t=this;t.slides=e,t.slides.entries.imgs=[t.slides.entries.text.length],t.showSlide(0)},showSlide:function(t){if(void 0!==this.tracks&&void 0!==this.slidesContainer){var i=this,n=i.slides.entries.text[t],o=i.slides.entries.imgs[t];void 0===o||void 0===o.fadeIn?i.slides.entries.imgs[t]=o=e('<img src="'+n+'">').on("load",function(){o.appendTo(i.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()}):o.is(":visible")||o.is(":animated")||o.fadeIn().siblings(":visible").fadeOut()}},displaySlides:function(){if(void 0!==this.slides){var e,t=this,i=t.slides;for(e=0;e<i.entries.times.length;e++)if(t.media.currentTime>=i.entries.times[e].start&&t.media.currentTime<=i.entries.times[e].stop)return void t.showSlide(e)}},displayChapters:function(){var e,t=this;for(e=0;e<t.tracks.length;e++)if("chapters"==t.tracks[e].kind&&t.tracks[e].isLoaded){t.drawChapters(t.tracks[e]),t.hasChapters=!0;break}},drawChapters:function(t){var i,n,o=this,s=0,a=0;for(o.chapters.empty(),i=0;i<t.entries.times.length;i++)n=t.entries.times[i].stop-t.entries.times[i].start,((s=Math.floor(n/o.media.duration*100))+a>100||i==t.entries.times.length-1&&100>s+a)&&(s=100-a),o.chapters.append(e('<div class="mejs-chapter" rel="'+t.entries.times[i].start+'" style="left: '+a.toString()+"%;width: "+s.toString()+'%;"><div class="mejs-chapter-block'+(i==t.entries.times.length-1?" mejs-chapter-block-last":"")+'"><span class="ch-title">'+t.entries.text[i]+'</span><span class="ch-time">'+mejs.Utility.secondsToTimeCode(t.entries.times[i].start,o.options)+"&ndash;"+mejs.Utility.secondsToTimeCode(t.entries.times[i].stop,o.options)+"</span></div></div>")),a+=s;o.chapters.find("div.mejs-chapter").click(function(){o.media.setCurrentTime(parseFloat(e(this).attr("rel"))),o.media.paused&&o.media.play()}),o.chapters.show()}}),mejs.language={codes:{af:"Afrikaans",sq:"Albanian",ar:"Arabic",be:"Belarusian",bg:"Bulgarian",ca:"Catalan",zh:"Chinese","zh-cn":"Chinese Simplified","zh-tw":"Chinese Traditional",hr:"Croatian",cs:"Czech",da:"Danish",nl:"Dutch",en:"English",et:"Estonian",fl:"Filipino",fi:"Finnish",fr:"French",gl:"Galician",de:"German",el:"Greek",ht:"Haitian Creole",iw:"Hebrew",hi:"Hindi",hu:"Hungarian",is:"Icelandic",id:"Indonesian",ga:"Irish",it:"Italian",ja:"Japanese",ko:"Korean",lv:"Latvian",lt:"Lithuanian",mk:"Macedonian",ms:"Malay",mt:"Maltese",no:"Norwegian",fa:"Persian",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sr:"Serbian",sk:"Slovak",sl:"Slovenian",es:"Spanish",sw:"Swahili",sv:"Swedish",tl:"Tagalog",th:"Thai",tr:"Turkish",uk:"Ukrainian",vi:"Vietnamese",cy:"Welsh",yi:"Yiddish"}},mejs.TrackFormatParser={webvtt:{pattern_timecode:/^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,parse:function(t){for(var i,n,o,s=0,a=mejs.TrackFormatParser.split2(t,/\r?\n/),r={text:[],times:[]};s<a.length;s++){if((i=this.pattern_timecode.exec(a[s]))&&s<a.length){for(s-1>=0&&""!==a[s-1]&&(o=a[s-1]),n=a[++s],s++;""!==a[s]&&s<a.length;)n=n+"\n"+a[s],s++;n=e.trim(n).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,"<a href='$1' target='_blank'>$1</a>"),r.text.push(n),r.times.push({identifier:o,start:0===mejs.Utility.convertSMPTEtoSeconds(i[1])?.2:mejs.Utility.convertSMPTEtoSeconds(i[1]),stop:mejs.Utility.convertSMPTEtoSeconds(i[3]),settings:i[5]})}o=""}return r}},dfxp:{parse:function(t){var i,n,o=0,s=(t=e(t).filter("tt")).children("div").eq(0),a=s.find("p"),r=t.find("#"+s.attr("style")),l={text:[],times:[]};if(r.length){var d=r.removeAttr("id").get(0).attributes;if(d.length)for(i={},o=0;o<d.length;o++)i[d[o].name.split(":")[1]]=d[o].value}for(o=0;o<a.length;o++){var c,u={start:null,stop:null,style:null};if(a.eq(o).attr("begin")&&(u.start=mejs.Utility.convertSMPTEtoSeconds(a.eq(o).attr("begin"))),!u.start&&a.eq(o-1).attr("end")&&(u.start=mejs.Utility.convertSMPTEtoSeconds(a.eq(o-1).attr("end"))),a.eq(o).attr("end")&&(u.stop=mejs.Utility.convertSMPTEtoSeconds(a.eq(o).attr("end"))),!u.stop&&a.eq(o+1).attr("begin")&&(u.stop=mejs.Utility.convertSMPTEtoSeconds(a.eq(o+1).attr("begin"))),i)for(var h in c="",i)c+=h+":"+i[h]+";";c&&(u.style=c),0===u.start&&(u.start=.2),l.times.push(u),n=e.trim(a.eq(o).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,"<a href='$1' target='_blank'>$1</a>"),l.text.push(n),0===l.times.start&&(l.times.start=2)}return l}},split2:function(e,t){return e.split(t)}},3!="x\n\ny".split(/\n/gi).length&&(mejs.TrackFormatParser.split2=function(e,t){var i,n=[],o="";for(i=0;i<e.length;i++)o+=e.substring(i,i+1),t.test(o)&&(n.push(o.replace(t,"")),o="");return n.push(o),n})}(mejs.$),function(e){e.extend(mejs.MepDefaults,{contextMenuItems:[{render:function(e){return void 0===e.enterFullScreen?null:e.isFullScreen?mejs.i18n.t("Turn off Fullscreen"):mejs.i18n.t("Go Fullscreen")},click:function(e){e.isFullScreen?e.exitFullScreen():e.enterFullScreen()}},{render:function(e){return e.media.muted?mejs.i18n.t("Unmute"):mejs.i18n.t("Mute")},click:function(e){e.media.muted?e.setMuted(!1):e.setMuted(!0)}},{isSeparator:!0},{render:function(e){return mejs.i18n.t("Download Video")},click:function(e){window.location.href=e.media.currentSrc}}]}),e.extend(MediaElementPlayer.prototype,{buildcontextmenu:function(t,i,n,o){t.contextMenu=e('<div class="mejs-contextmenu"></div>').appendTo(e("body")).hide(),t.container.bind("contextmenu",function(e){return t.isContextMenuEnabled?(e.preventDefault(),t.renderContextMenu(e.clientX-1,e.clientY-1),!1):void 0}),t.container.bind("click",function(){t.contextMenu.hide()}),t.contextMenu.bind("mouseleave",function(){t.startContextMenuTimer()})},cleancontextmenu:function(e){e.contextMenu.remove()},isContextMenuEnabled:!0,enableContextMenu:function(){this.isContextMenuEnabled=!0},disableContextMenu:function(){this.isContextMenuEnabled=!1},contextMenuTimeout:null,startContextMenuTimer:function(){var e=this;e.killContextMenuTimer(),e.contextMenuTimer=setTimeout(function(){e.hideContextMenu(),e.killContextMenuTimer()},750)},killContextMenuTimer:function(){var e=this.contextMenuTimer;null!=e&&(clearTimeout(e),delete e,e=null)},hideContextMenu:function(){this.contextMenu.hide()},renderContextMenu:function(t,i){for(var n=this,o="",s=n.options.contextMenuItems,a=0,r=s.length;r>a;a++)if(s[a].isSeparator)o+='<div class="mejs-contextmenu-separator"></div>';else{var l=s[a].render(n);null!=l&&(o+='<div class="mejs-contextmenu-item" data-itemindex="'+a+'" id="element-'+1e6*Math.random()+'">'+l+"</div>")}n.contextMenu.empty().append(e(o)).css({top:i,left:t}).show(),n.contextMenu.find(".mejs-contextmenu-item").each(function(){var t=e(this),i=parseInt(t.data("itemindex"),10),o=n.options.contextMenuItems[i];void 0!==o.show&&o.show(t,n),t.click(function(){void 0!==o.click&&o.click(n),n.contextMenu.hide()})}),setTimeout(function(){n.killControlsTimer("rev3")},100)}})}(mejs.$),function(e){e.extend(mejs.MepDefaults,{skipBackInterval:30,skipBackText:mejs.i18n.t("Skip back %1 seconds")}),e.extend(MediaElementPlayer.prototype,{buildskipback:function(t,i,n,o){var s=this,a=s.options.skipBackText.replace("%1",s.options.skipBackInterval);e('<div class="mejs-button mejs-skip-back-button"><button type="button" aria-controls="'+s.id+'" title="'+a+'" aria-label="'+a+'">'+s.options.skipBackInterval+"</button></div>").appendTo(i).click(function(){o.setCurrentTime(Math.max(o.currentTime-s.options.skipBackInterval,0)),e(this).find("button").blur()})}})}(mejs.$),function(e){e.extend(mejs.MepDefaults,{postrollCloseText:mejs.i18n.t("Close")}),e.extend(MediaElementPlayer.prototype,{buildpostroll:function(t,i,n,o){var s=this,a=s.container.find('link[rel="postroll"]').attr("href");void 0!==a&&(t.postroll=e('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">'+s.options.postrollCloseText+'</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(n).hide(),s.media.addEventListener("ended",function(i){e.ajax({dataType:"html",url:a,success:function(e,t){n.find(".mejs-postroll-layer-content").html(e)}}),t.postroll.show()},!1))}})}(mejs.$),function(e,t,i,n){var o=i("html"),s=i(e),a=i(t),r=i.fancybox=function(){r.open.apply(this,arguments)},l=navigator.userAgent.match(/msie/i),d=null,c=t.createTouch!==n,u=function(e){return e&&e.hasOwnProperty&&e instanceof i},h=function(e){return e&&"string"===i.type(e)},p=function(e){return h(e)&&0<e.indexOf("%")},m=function(e,t){var i=parseInt(e,10)||0;return t&&p(e)&&(i*=r.getViewport()[t]/100),Math.ceil(i)},f=function(e,t){return m(e,t)+"px"};i.extend(r,{version:"2.1.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!c,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(l?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:i.noop,beforeLoad:i.noop,afterLoad:i.noop,beforeShow:i.noop,afterShow:i.noop,beforeChange:i.noop,beforeClose:i.noop,afterClose:i.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(e,t){return e&&(i.isPlainObject(t)||(t={}),!1!==r.close(!0))?(i.isArray(e)||(e=u(e)?i(e).get():[e]),i.each(e,function(o,s){var a,l,d,c,p,m={};"object"===i.type(s)&&(s.nodeType&&(s=i(s)),u(s)?(m={href:s.data("fancybox-href")||s.attr("href"),title:s.data("fancybox-title")||s.attr("title"),isDom:!0,element:s},i.metadata&&i.extend(!0,m,s.metadata())):m=s),a=t.href||m.href||(h(s)?s:null),l=t.title!==n?t.title:m.title||"",!(c=(d=t.content||m.content)?"html":t.type||m.type)&&m.isDom&&((c=s.data("fancybox-type"))||(c=(c=s.prop("class").match(/fancybox\.(\w+)/))?c[1]:null)),h(a)&&(c||(r.isImage(a)?c="image":r.isSWF(a)?c="swf":"#"===a.charAt(0)?c="inline":h(s)&&(c="html",d=s)),"ajax"===c&&(p=a.split(/\s+/,2),a=p.shift(),p=p.shift())),d||("inline"===c?a?d=i(h(a)?a.replace(/.*(?=#[^\s]+$)/,""):a):m.isDom&&(d=s):"html"===c?d=a:!c&&!a&&m.isDom&&(c="inline",d=s)),i.extend(m,{href:a,type:c,content:d,title:l,selector:p}),e[o]=m}),r.opts=i.extend(!0,{},r.defaults,t),t.keys!==n&&(r.opts.keys=!!t.keys&&i.extend({},r.defaults.keys,t.keys)),r.group=e,r._start(r.opts.index)):void 0},cancel:function(){var e=r.coming;e&&!1!==r.trigger("onCancel")&&(r.hideLoading(),r.ajaxLoad&&r.ajaxLoad.abort(),r.ajaxLoad=null,r.imgPreload&&(r.imgPreload.onload=r.imgPreload.onerror=null),e.wrap&&e.wrap.stop(!0,!0).trigger("onReset").remove(),r.coming=null,r.current||r._afterZoomOut(e))},close:function(e){r.cancel(),!1!==r.trigger("beforeClose")&&(r.unbindEvents(),r.isActive&&(r.isOpen&&!0!==e?(r.isOpen=r.isOpened=!1,r.isClosing=!0,i(".fancybox-item, .fancybox-nav").remove(),r.wrap.stop(!0,!0).removeClass("fancybox-opened"),r.transitions[r.current.closeMethod]()):(i(".fancybox-wrap").stop(!0).trigger("onReset").remove(),r._afterZoomOut())))},play:function(e){var t=function(){clearTimeout(r.player.timer)},i=function(){t(),r.current&&r.player.isActive&&(r.player.timer=setTimeout(r.next,r.current.playSpeed))},n=function(){t(),a.unbind(".player"),r.player.isActive=!1,r.trigger("onPlayEnd")};!0===e||!r.player.isActive&&!1!==e?r.current&&(r.current.loop||r.current.index<r.group.length-1)&&(r.player.isActive=!0,a.bind({"onCancel.player beforeClose.player":n,"onUpdate.player":i,"beforeLoad.player":t}),i(),r.trigger("onPlayStart")):n()},next:function(e){var t=r.current;t&&(h(e)||(e=t.direction.next),r.jumpto(t.index+1,e,"next"))},prev:function(e){var t=r.current;t&&(h(e)||(e=t.direction.prev),r.jumpto(t.index-1,e,"prev"))},jumpto:function(e,t,i){var o=r.current;o&&(e=m(e),r.direction=t||o.direction[e>=o.index?"next":"prev"],r.router=i||"jumpto",o.loop&&(0>e&&(e=o.group.length+e%o.group.length),e%=o.group.length),o.group[e]!==n&&(r.cancel(),r._start(e)))},reposition:function(e,t){var n,o=r.current,s=o?o.wrap:null;s&&(n=r._getPosition(t),e&&"scroll"===e.type?(delete n.position,s.stop(!0,!0).animate(n,200)):(s.css(n),o.pos=i.extend({},o.dim,n)))},update:function(e){var t=e&&e.type,i=!t||"orientationchange"===t;i&&(clearTimeout(d),d=null),r.isOpen&&!d&&(d=setTimeout(function(){var n=r.current;n&&!r.isClosing&&(r.wrap.removeClass("fancybox-tmp"),(i||"load"===t||"resize"===t&&n.autoResize)&&r._setDimension(),"scroll"===t&&n.canShrink||r.reposition(e),r.trigger("onUpdate"),d=null)},i&&!c?0:300))},toggle:function(e){r.isOpen&&(r.current.fitToView="boolean"===i.type(e)?e:!r.current.fitToView,c&&(r.wrap.removeAttr("style").addClass("fancybox-tmp"),r.trigger("onUpdate")),r.update())},hideLoading:function(){a.unbind(".loading"),i("#fancybox-loading").remove()},showLoading:function(){var e,t;r.hideLoading(),e=i('<div id="fancybox-loading"><div></div></div>').click(r.cancel).appendTo("body"),a.bind("keydown.loading",function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),r.cancel())}),r.defaults.fixed||(t=r.getViewport(),e.css({position:"absolute",top:.5*t.h+t.y,left:.5*t.w+t.x}))},getViewport:function(){var t=r.current&&r.current.locked||!1,i={x:s.scrollLeft(),y:s.scrollTop()};return t?(i.w=t[0].clientWidth,i.h=t[0].clientHeight):(i.w=c&&e.innerWidth?e.innerWidth:s.width(),i.h=c&&e.innerHeight?e.innerHeight:s.height()),i},unbindEvents:function(){r.wrap&&u(r.wrap)&&r.wrap.unbind(".fb"),a.unbind(".fb"),s.unbind(".fb")},bindEvents:function(){var e,t=r.current;t&&(s.bind("orientationchange.fb"+(c?"":" resize.fb")+(t.autoCenter&&!t.locked?" scroll.fb":""),r.update),(e=t.keys)&&a.bind("keydown.fb",function(o){var s=o.which||o.keyCode,a=o.target||o.srcElement;return(27!==s||!r.coming)&&void(!o.ctrlKey&&!o.altKey&&!o.shiftKey&&!o.metaKey&&(!a||!a.type&&!i(a).is("[contenteditable]"))&&i.each(e,function(e,a){return 1<t.group.length&&a[s]!==n?(r[e](a[s]),o.preventDefault(),!1):-1<i.inArray(s,a)?(r[e](),o.preventDefault(),!1):void 0}))}),i.fn.mousewheel&&t.mouseWheel&&r.wrap.bind("mousewheel.fb",function(e,n,o,s){for(var a=i(e.target||null),l=!1;a.length&&!l&&!a.is(".fancybox-skin")&&!a.is(".fancybox-wrap");)l=a[0]&&!(a[0].style.overflow&&"hidden"===a[0].style.overflow)&&(a[0].clientWidth&&a[0].scrollWidth>a[0].clientWidth||a[0].clientHeight&&a[0].scrollHeight>a[0].clientHeight),a=i(a).parent();0!==n&&!l&&1<r.group.length&&!t.canShrink&&(s>0||o>0?r.prev(s>0?"down":"left"):(0>s||0>o)&&r.next(0>s?"up":"right"),e.preventDefault())}))},trigger:function(e,t){var n,o=t||r.coming||r.current;if(o){if(i.isFunction(o[e])&&(n=o[e].apply(o,Array.prototype.slice.call(arguments,1))),!1===n)return!1;o.helpers&&i.each(o.helpers,function(t,n){n&&r.helpers[t]&&i.isFunction(r.helpers[t][e])&&r.helpers[t][e](i.extend(!0,{},r.helpers[t].defaults,n),o)}),a.trigger(e)}},isImage:function(e){return h(e)&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(e){return h(e)&&e.match(/\.(swf)((\?|#).*)?$/i)},_start:function(e){var t,n,o={};if(e=m(e),!(t=r.group[e]||null))return!1;if(t=(o=i.extend(!0,{},r.opts,t)).margin,n=o.padding,"number"===i.type(t)&&(o.margin=[t,t,t,t]),"number"===i.type(n)&&(o.padding=[n,n,n,n]),o.modal&&i.extend(!0,o,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),o.autoSize&&(o.autoWidth=o.autoHeight=!0),"auto"===o.width&&(o.autoWidth=!0),"auto"===o.height&&(o.autoHeight=!0),o.group=r.group,o.index=e,r.coming=o,!1===r.trigger("beforeLoad"))r.coming=null;else{if(n=o.type,t=o.href,!n)return r.coming=null,!(!r.current||!r.router||"jumpto"===r.router)&&(r.current.index=e,r[r.router](r.direction));if(r.isActive=!0,("image"===n||"swf"===n)&&(o.autoHeight=o.autoWidth=!1,o.scrolling="visible"),"image"===n&&(o.aspectRatio=!0),"iframe"===n&&c&&(o.scrolling="scroll"),o.wrap=i(o.tpl.wrap).addClass("fancybox-"+(c?"mobile":"desktop")+" fancybox-type-"+n+" fancybox-tmp "+o.wrapCSS).appendTo(o.parent||"body"),i.extend(o,{skin:i(".fancybox-skin",o.wrap),outer:i(".fancybox-outer",o.wrap),inner:i(".fancybox-inner",o.wrap)}),i.each(["Top","Right","Bottom","Left"],function(e,t){o.skin.css("padding"+t,f(o.padding[e]))}),r.trigger("onReady"),"inline"===n||"html"===n){if(!o.content||!o.content.length)return r._error("content")}else if(!t)return r._error("href");"image"===n?r._loadImage():"ajax"===n?r._loadAjax():"iframe"===n?r._loadIframe():r._afterLoad()}},_error:function(e){i.extend(r.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:e,content:r.coming.tpl.error}),r._afterLoad()},_loadImage:function(){var e=r.imgPreload=new Image;e.onload=function(){this.onload=this.onerror=null,r.coming.width=this.width/r.opts.pixelRatio,r.coming.height=this.height/r.opts.pixelRatio,r._afterLoad()},e.onerror=function(){this.onload=this.onerror=null,r._error("image")},e.src=r.coming.href,!0!==e.complete&&r.showLoading()},_loadAjax:function(){var e=r.coming;r.showLoading(),r.ajaxLoad=i.ajax(i.extend({},e.ajax,{url:e.href,error:function(e,t){r.coming&&"abort"!==t?r._error("ajax",e):r.hideLoading()},success:function(t,i){"success"===i&&(e.content=t,r._afterLoad())}}))},_loadIframe:function(){var e=r.coming,t=i(e.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",c?"auto":e.iframe.scrolling).attr("src",e.href);i(e.wrap).bind("onReset",function(){try{i(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}}),e.iframe.preload&&(r.showLoading(),t.one("load",function(){i(this).data("ready",1),c||i(this).bind("load.fb",r.update),i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),r._afterLoad()})),e.content=t.appendTo(e.inner),e.iframe.preload||r._afterLoad()},_preloadImages:function(){var e,t,i=r.group,n=r.current,o=i.length,s=n.preload?Math.min(n.preload,o-1):0;for(t=1;s>=t;t+=1)"image"===(e=i[(n.index+t)%o]).type&&e.href&&((new Image).src=e.href)},_afterLoad:function(){var e,t,n,o,s,a=r.coming,l=r.current;if(r.hideLoading(),a&&!1!==r.isActive)if(!1===r.trigger("afterLoad",a,l))a.wrap.stop(!0).trigger("onReset").remove(),r.coming=null;else{switch(l&&(r.trigger("beforeChange",l),l.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),r.unbindEvents(),e=a.content,t=a.type,n=a.scrolling,i.extend(r,{wrap:a.wrap,skin:a.skin,outer:a.outer,inner:a.inner,current:a,previous:l}),o=a.href,t){case"inline":case"ajax":case"html":a.selector?e=i("<div>").html(e).find(a.selector):u(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",i('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){i(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case"image":e=a.tpl.image.replace("{href}",o);break;case"swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+o+'"></param>',s="",i.each(a.swf,function(t,i){e+='<param name="'+t+'" value="'+i+'"></param>',s+=" "+t+'="'+i+'"'}),e+='<embed src="'+o+'" type="application/x-shockwave-flash" width="100%" height="100%"'+s+"></embed></object>"}(!u(e)||!e.parent().is(a.inner))&&a.inner.append(e),r.trigger("beforeShow"),a.inner.css("overflow","yes"===n?"scroll":"no"===n?"hidden":n),r._setDimension(),r.reposition(),r.isOpen=!1,r.coming=null,r.bindEvents(),r.isOpened?l.prevMethod&&r.transitions[l.prevMethod]():i(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove(),r.transitions[r.isOpened?a.nextMethod:a.openMethod](),r._preloadImages()}},_setDimension:function(){var e,t,n,o,s,a,l,d,c,u=r.getViewport(),h=0,g=!1,v=!1,y=(g=r.wrap,r.skin),b=r.inner,w=r.current,x=(v=w.width,w.height),S=w.minWidth,C=w.minHeight,T=w.maxWidth,k=w.maxHeight,j=w.scrolling,_=w.scrollOutside?w.scrollbarWidth:0,E=w.margin,I=m(E[1]+E[3]),M=m(E[0]+E[2]);if(g.add(y).add(b).width("auto").height("auto").removeClass("fancybox-tmp"),t=I+(E=m(y.outerWidth(!0)-y.width())),n=M+(e=m(y.outerHeight(!0)-y.height())),o=p(v)?(u.w-t)*m(v)/100:v,s=p(x)?(u.h-n)*m(x)/100:x,"iframe"===w.type){if(c=w.content,w.autoHeight&&1===c.data("ready"))try{c[0].contentWindow.document.location&&(b.width(o).height(9999),a=c.contents().find("body"),_&&a.css("overflow-x","hidden"),s=a.outerHeight(!0))}catch(e){}}else(w.autoWidth||w.autoHeight)&&(b.addClass("fancybox-tmp"),w.autoWidth||b.width(o),w.autoHeight||b.height(s),w.autoWidth&&(o=b.width()),w.autoHeight&&(s=b.height()),b.removeClass("fancybox-tmp"));if(v=m(o),x=m(s),d=o/s,S=m(p(S)?m(S,"w")-t:S),T=m(p(T)?m(T,"w")-t:T),C=m(p(C)?m(C,"h")-n:C),a=T,l=k=m(p(k)?m(k,"h")-n:k),w.fitToView&&(T=Math.min(u.w-t,T),k=Math.min(u.h-n,k)),t=u.w-I,M=u.h-M,w.aspectRatio?(v>T&&(x=m((v=T)/d)),x>k&&(v=m((x=k)*d)),S>v&&(x=m((v=S)/d)),C>x&&(v=m((x=C)*d))):(v=Math.max(S,Math.min(v,T)),w.autoHeight&&"iframe"!==w.type&&(b.width(v),x=b.height()),x=Math.max(C,Math.min(x,k))),w.fitToView)if(b.width(v).height(x),g.width(v+E),u=g.width(),I=g.height(),w.aspectRatio)for(;(u>t||I>M)&&v>S&&x>C&&!(19<h++);)x=Math.max(C,Math.min(k,x-10)),S>(v=m(x*d))&&(x=m((v=S)/d)),v>T&&(x=m((v=T)/d)),b.width(v).height(x),g.width(v+E),u=g.width(),I=g.height();else v=Math.max(S,Math.min(v,v-(u-t))),x=Math.max(C,Math.min(x,x-(I-M)));_&&"auto"===j&&s>x&&t>v+E+_&&(v+=_),b.width(v).height(x),g.width(v+E),u=g.width(),I=g.height(),g=(u>t||I>M)&&v>S&&x>C,v=w.aspectRatio?a>v&&l>x&&o>v&&s>x:(a>v||l>x)&&(o>v||s>x),i.extend(w,{dim:{width:f(u),height:f(I)},origWidth:o,origHeight:s,canShrink:g,canExpand:v,wPadding:E,hPadding:e,wrapSpace:I-y.outerHeight(!0),skinSpace:y.height()-x}),!c&&w.autoHeight&&x>C&&k>x&&!v&&b.height("auto")},_getPosition:function(e){var t=r.current,i=r.getViewport(),n=t.margin,o=r.wrap.width()+n[1]+n[3],s=r.wrap.height()+n[0]+n[2];n={position:"absolute",top:n[0],left:n[3]};return t.autoCenter&&t.fixed&&!e&&s<=i.h&&o<=i.w?n.position="fixed":t.locked||(n.top+=i.y,n.left+=i.x),n.top=f(Math.max(n.top,n.top+(i.h-s)*t.topRatio)),n.left=f(Math.max(n.left,n.left+(i.w-o)*t.leftRatio)),n},_afterZoomIn:function(){var e=r.current;e&&(r.isOpen=r.isOpened=!0,r.wrap.css("overflow","visible").addClass("fancybox-opened"),r.update(),(e.closeClick||e.nextClick&&1<r.group.length)&&r.inner.css("cursor","pointer").bind("click.fb",function(t){!i(t.target).is("a")&&!i(t.target).parent().is("a")&&(t.preventDefault(),r[e.closeClick?"close":"next"]())}),e.closeBtn&&i(e.tpl.closeBtn).appendTo(r.skin).bind("click.fb",function(e){e.preventDefault(),r.close()}),e.arrows&&1<r.group.length&&((e.loop||0<e.index)&&i(e.tpl.prev).appendTo(r.outer).bind("click.fb",r.prev),(e.loop||e.index<r.group.length-1)&&i(e.tpl.next).appendTo(r.outer).bind("click.fb",r.next)),r.trigger("afterShow"),e.loop||e.index!==e.group.length-1?r.opts.autoPlay&&!r.player.isActive&&(r.opts.autoPlay=!1,r.play()):r.play(!1))},_afterZoomOut:function(e){e=e||r.current,i(".fancybox-wrap").trigger("onReset").remove(),i.extend(r,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),r.trigger("afterClose",e)}}),r.transitions={getOrigPosition:function(){var e=r.current,t=e.element,i=e.orig,n={},o=50,s=50,a=e.hPadding,l=e.wPadding,d=r.getViewport();return!i&&e.isDom&&t.is(":visible")&&((i=t.find("img:first")).length||(i=t)),u(i)?(n=i.offset(),i.is("img")&&(o=i.outerWidth(),s=i.outerHeight())):(n.top=d.y+(d.h-s)*e.topRatio,n.left=d.x+(d.w-o)*e.leftRatio),("fixed"===r.wrap.css("position")||e.locked)&&(n.top-=d.y,n.left-=d.x),{top:f(n.top-a*e.topRatio),left:f(n.left-l*e.leftRatio),width:f(o+l),height:f(s+a)}},step:function(e,t){var i,n,o=t.prop,s=(n=r.current).wrapSpace,a=n.skinSpace;("width"===o||"height"===o)&&(i=t.end===t.start?1:(e-t.start)/(t.end-t.start),r.isClosing&&(i=1-i),n=e-(n="width"===o?n.wPadding:n.hPadding),r.skin[o](m("width"===o?n:n-s*i)),r.inner[o](m("width"===o?n:n-s*i-a*i)))},zoomIn:function(){var e=r.current,t=e.pos,n=e.openEffect,o="elastic"===n,s=i.extend({opacity:1},t);delete s.position,o?(t=this.getOrigPosition(),e.openOpacity&&(t.opacity=.1)):"fade"===n&&(t.opacity=.1),r.wrap.css(t).animate(s,{duration:"none"===n?0:e.openSpeed,easing:e.openEasing,step:o?this.step:null,complete:r._afterZoomIn})},zoomOut:function(){var e=r.current,t=e.closeEffect,i="elastic"===t,n={opacity:.1};i&&(n=this.getOrigPosition(),e.closeOpacity&&(n.opacity=.1)),r.wrap.animate(n,{duration:"none"===t?0:e.closeSpeed,easing:e.closeEasing,step:i?this.step:null,complete:r._afterZoomOut})},changeIn:function(){var e,t=r.current,i=t.nextEffect,n=t.pos,o={opacity:1},s=r.direction;n.opacity=.1,"elastic"===i&&(e="down"===s||"up"===s?"top":"left","down"===s||"right"===s?(n[e]=f(m(n[e])-200),o[e]="+=200px"):(n[e]=f(m(n[e])+200),o[e]="-=200px")),"none"===i?r._afterZoomIn():r.wrap.css(n).animate(o,{duration:t.nextSpeed,easing:t.nextEasing,complete:r._afterZoomIn})},changeOut:function(){var e=r.previous,t=e.prevEffect,n={opacity:.1},o=r.direction;"elastic"===t&&(n["down"===o||"up"===o?"top":"left"]=("up"===o||"left"===o?"-":"+")+"=200px"),e.wrap.animate(n,{duration:"none"===t?0:e.prevSpeed,easing:e.prevEasing,complete:function(){i(this).trigger("onReset").remove()}})}},r.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!c,fixed:!0},overlay:null,fixed:!1,el:i("html"),create:function(e){e=i.extend({},this.defaults,e),this.overlay&&this.close(),this.overlay=i('<div class="fancybox-overlay"></div>').appendTo(r.coming?r.coming.parent:e.parent),this.fixed=!1,e.fixed&&r.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(e){var t=this;e=i.extend({},this.defaults,e),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(e),this.fixed||(s.bind("resize.overlay",i.proxy(this.update,this)),this.update()),e.closeClick&&this.overlay.bind("click.overlay",function(e){return i(e.target).hasClass("fancybox-overlay")?(r.isActive?r.close():t.close(),!1):void 0}),this.overlay.css(e.css).show()},close:function(){var e,t;s.unbind("resize.overlay"),this.el.hasClass("fancybox-lock")&&(i(".fancybox-margin").removeClass("fancybox-margin"),e=s.scrollTop(),t=s.scrollLeft(),this.el.removeClass("fancybox-lock"),s.scrollTop(e).scrollLeft(t)),i(".fancybox-overlay").remove().hide(),i.extend(this,{overlay:null,fixed:!1})},update:function(){var e,i="100%";this.overlay.width(i).height("100%"),l?(e=Math.max(t.documentElement.offsetWidth,t.body.offsetWidth),a.width()>e&&(i=a.width())):a.width()>s.width()&&(i=a.width()),this.overlay.width(i).height(a.height())},onReady:function(e,t){var n=this.overlay;i(".fancybox-overlay").stop(!0,!0),n||this.create(e),e.locked&&this.fixed&&t.fixed&&(n||(this.margin=a.height()>s.height()&&i("html").css("margin-right").replace("px","")),t.locked=this.overlay.append(t.wrap),t.fixed=!1),!0===e.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(e,t){var n,o;t.locked&&(!1!==this.margin&&(i("*").filter(function(){return"fixed"===i(this).css("position")&&!i(this).hasClass("fancybox-overlay")&&!i(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),n=s.scrollTop(),o=s.scrollLeft(),this.el.addClass("fancybox-lock"),s.scrollTop(n).scrollLeft(o)),this.open(e)},onUpdate:function(){this.fixed||this.update()},afterClose:function(e){this.overlay&&!r.coming&&this.overlay.fadeOut(e.speedOut,i.proxy(this.close,this))}},r.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(e){var t=r.current,n=t.title,o=e.type;if(i.isFunction(n)&&(n=n.call(t.element,t)),h(n)&&""!==i.trim(n)){switch(t=i('<div class="fancybox-title fancybox-title-'+o+'-wrap">'+n+"</div>"),o){case"inside":o=r.skin;break;case"outside":o=r.wrap;break;case"over":o=r.inner;break;default:o=r.skin,t.appendTo("body"),l&&t.width(t.width()),t.wrapInner('<span class="child"></span>'),r.current.margin[2]+=Math.abs(m(t.css("margin-bottom")))}t["top"===e.position?"prependTo":"appendTo"](o)}}},i.fn.fancybox=function(e){var t,n=i(this),o=this.selector||"",s=function(s){var a,l,d=i(this).blur(),c=t;!s.ctrlKey&&!s.altKey&&!s.shiftKey&&!s.metaKey&&!d.is(".fancybox-wrap")&&(a=e.groupAttr||"data-fancybox-group",(l=d.attr(a))||(a="rel",l=d.get(0)[a]),l&&""!==l&&"nofollow"!==l&&(c=(d=(d=o.length?i(o):n).filter("["+a+'="'+l+'"]')).index(this)),e.index=c,!1!==r.open(d,e)&&s.preventDefault())};return t=(e=e||{}).index||0,o&&!1!==e.live?a.undelegate(o,"click.fb-start").delegate(o+":not('.fancybox-item, .fancybox-nav')","click.fb-start",s):n.unbind("click.fb-start").bind("click.fb-start",s),this.filter("[data-fancybox-start=1]").trigger("click"),this},a.ready(function(){var t,s;if(i.scrollbarWidth===n&&(i.scrollbarWidth=function(){var e=i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),t=(t=e.children()).innerWidth()-t.height(99).innerWidth();return e.remove(),t}),i.support.fixedPosition===n){t=i.support;var a=20===(s=i('<div style="position:fixed;top:20px;"></div>').appendTo("body"))[0].offsetTop||15===s[0].offsetTop;s.remove(),t.fixedPosition=a}i.extend(r.defaults,{scrollbarWidth:i.scrollbarWidth(),fixed:i.support.fixedPosition,parent:i("body")}),t=i(e).width(),o.addClass("fancybox-lock-test"),s=i(e).width(),o.removeClass("fancybox-lock-test"),i("<style type='text/css'>.fancybox-margin{margin-right:"+(s-t)+"px;}</style>").appendTo("head")})}(window,document,jQuery),function(e){"use strict";var t=e.fancybox,i=function(t,i,n){return n=n||"","object"===e.type(n)&&(n=e.param(n,!0)),e.each(i,function(e,i){t=t.replace("$"+e,i||"")}),n.length&&(t+=(t.indexOf("?")>0?"&":"?")+n),t};t.helpers.media={defaults:{youtube:{matcher:/(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:"opaque",enablejsapi:1},type:"iframe",url:"//www.youtube.com/embed/$3"},vimeo:{matcher:/(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1},type:"iframe",url:"//player.vimeo.com/video/$1"},metacafe:{matcher:/metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,params:{autoPlay:"yes"},type:"swf",url:function(t,i,n){return n.swf.flashVars="playerVars="+e.param(i,!0),"//www.metacafe.com/fplayer/"+t[1]+"/.swf"}},dailymotion:{matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,params:{additionalInfos:0,autoStart:1},type:"swf",url:"//www.dailymotion.com/swf/video/$1"},twitvid:{matcher:/twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,params:{autoplay:0},type:"iframe",url:"//www.twitvid.com/embed.php?guid=$1"},twitpic:{matcher:/twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,type:"image",url:"//twitpic.com/show/full/$1/"},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:"image",url:"//$1/p/$2/media/?size=l"},google_maps:{matcher:/maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,type:"iframe",url:function(e){return"//maps.google."+e[1]+"/"+e[3]+e[4]+"&output="+(e[4].indexOf("layer=c")>0?"svembed":"embed")}}},beforeLoad:function(t,n){var o,s,a,r,l=n.href||"",d=!1;for(o in t)if(t.hasOwnProperty(o)&&(s=t[o],a=l.match(s.matcher))){d=s.type,r=e.extend(!0,{},s.params,n[o]||(e.isPlainObject(t[o])?t[o].params:null)),l="function"===e.type(s.url)?s.url.call(this,a,r,n):i(s.url,a,r);break}d&&(n.href=l,n.type=d,n.autoHeight=!1)}}}(jQuery),"function"!=typeof Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t}),function(e,t,i){var n={init:function(t,i){this.$elem=e(i),this.options=e.extend({},e.fn.owlCarousel.options,this.$elem.data(),t),this.userOptions=t,this.loadContent()},loadContent:function(){var t,i=this;"function"==typeof i.options.beforeInit&&i.options.beforeInit.apply(this,[i.$elem]),"string"==typeof i.options.jsonPath?(t=i.options.jsonPath,e.getJSON(t,function(e){var t,n="";if("function"==typeof i.options.jsonSuccess)i.options.jsonSuccess.apply(this,[e]);else{for(t in e.owl)e.owl.hasOwnProperty(t)&&(n+=e.owl[t].item);i.$elem.html(n)}i.logIn()})):i.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style")),this.$elem.data("owl-originalClasses",this.$elem.attr("class")),this.$elem.css({opacity:0}),this.orignalItems=this.options.items,this.checkBrowser(),this.wrapperWidth=0,this.checkVisible=null,this.setVars()},setVars:function(){return 0!==this.$elem.children().length&&(this.baseClass(),this.eventTypes(),this.$userItems=this.$elem.children(),this.itemsAmount=this.$userItems.length,this.wrapItems(),this.$owlItems=this.$elem.find(".owl-item"),this.$owlWrapper=this.$elem.find(".owl-wrapper"),this.playDirection="next",this.prevItem=0,this.prevArr=[0],this.currentItem=0,this.customEvents(),void this.onStartup())},onStartup:function(){this.updateItems(),this.calculateAll(),this.buildControls(),this.updateControls(),this.response(),this.moveEvents(),this.stopOnHover(),this.owlStatus(),!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle),!0===this.options.autoPlay&&(this.options.autoPlay=5e3),this.play(),this.$elem.find(".owl-wrapper").css("display","block"),this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility(),this.onstartup=!1,this.eachMoveUpdate(),"function"==typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad(),!0===this.options.autoHeight&&this.autoHeight(),this.onVisibleItems(),"function"==typeof this.options.afterAction&&this.options.afterAction.apply(this,[this.$elem])},updateVars:function(){"function"==typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]),this.watchVisibility(),this.updateItems(),this.calculateAll(),this.updatePosition(),this.updateControls(),this.eachMoveUpdate(),"function"==typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var e=this;t.setTimeout(function(){e.updateVars()},0)},watchVisibility:function(){var e=this;return!1===e.$elem.is(":visible")&&(e.$elem.css({opacity:0}),t.clearInterval(e.autoPlayInterval),t.clearInterval(e.checkVisible),void(e.checkVisible=t.setInterval(function(){e.$elem.is(":visible")&&(e.reload(),e.$elem.animate({opacity:1},200),t.clearInterval(e.checkVisible))},500)))},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'),this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'),this.wrapperOuter=this.$elem.find(".owl-wrapper-outer"),this.$elem.css("display","block")},baseClass:function(){var e=this.$elem.hasClass(this.options.baseClass),t=this.$elem.hasClass(this.options.theme);e||this.$elem.addClass(this.options.baseClass),t||this.$elem.addClass(this.options.theme)},updateItems:function(){var t,i;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=!1,this.options.itemsMobile=!1;if((t=e(this.options.responsiveBaseWidth).width())>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems),!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(e,t){return e[0]-t[0]}),i=0;i<this.options.itemsCustom.length;i+=1)this.options.itemsCustom[i][0]<=t&&(this.options.items=this.options.itemsCustom[i][1]);else t<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),t<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),t<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),t<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),t<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var i,n,o=this;return!0===o.options.responsive&&(n=e(t).width(),o.resizer=function(){e(t).width()!==n&&(!1!==o.options.autoPlay&&t.clearInterval(o.autoPlayInterval),t.clearTimeout(i),i=t.setTimeout(function(){n=e(t).width(),o.updateVars()},o.options.responsiveRefreshRate))},void e(t).resize(o.resizer))},updatePosition:function(){this.jumpTo(this.currentItem),!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var t=this,i=0,n=t.itemsAmount-t.options.items;t.$owlItems.each(function(o){var s=e(this);s.css({width:t.itemWidth}).data("owl-item",Number(o)),(0==o%t.options.items||o===n)&&(o>n||(i+=1)),s.data("owl-roundPages",i)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0}),this.appendItemsSizes()},calculateAll:function(){this.calculateWidth(),this.appendWrapperSizes(),this.loops(),this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/this.options.items)},max:function(){var e=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);return this.options.items>this.itemsAmount?this.maximumPixels=e=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=e),e},min:function(){return 0},loops:function(){var t,i,n=0,o=0;for(this.positionsInArray=[0],this.pagesInArray=[],t=0;t<this.itemsAmount;t+=1)o+=this.itemWidth,this.positionsInArray.push(-o),!0===this.options.scrollPerPage&&((i=(i=e(this.$owlItems[t])).data("owl-roundPages"))!==n&&(this.pagesInArray[n]=this.positionsInArray[t],n=i))},buildControls:function(){(!0===this.options.navigation||!0===this.options.pagination)&&(this.owlControls=e('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem)),!0===this.options.pagination&&this.buildPagination(),!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var t=this,i=e('<div class="owl-buttons"/>');t.owlControls.append(i),t.buttonPrev=e("<div/>",{class:"owl-prev",html:t.options.navigationText[0]||""}),t.buttonNext=e("<div/>",{class:"owl-next",html:t.options.navigationText[1]||""}),i.append(t.buttonPrev).append(t.buttonNext),i.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(e){e.preventDefault()}),i.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(i){i.preventDefault(),e(this).hasClass("owl-next")?t.next():t.prev()})},buildPagination:function(){var t=this;t.paginationWrapper=e('<div class="owl-pagination"/>'),t.owlControls.append(t.paginationWrapper),t.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(i){i.preventDefault(),Number(e(this).data("owl-page"))!==t.currentItem&&t.goTo(Number(e(this).data("owl-page")),!0)})},updatePagination:function(){var t,i,n,o,s,a;if(!1===this.options.pagination)return!1;for(this.paginationWrapper.html(""),t=0,i=this.itemsAmount-this.itemsAmount%this.options.items,o=0;o<this.itemsAmount;o+=1)0==o%this.options.items&&(t+=1,i===o&&(n=this.itemsAmount-this.options.items),s=e("<div/>",{class:"owl-page"}),a=e("<span></span>",{text:!0===this.options.paginationNumbers?t:"",class:!0===this.options.paginationNumbers?"owl-numbers":""}),s.append(a),s.data("owl-page",i===o?n:o),s.data("owl-roundPages",t),this.paginationWrapper.append(s));this.checkPagination()},checkPagination:function(){var t=this;return!1!==t.options.pagination&&void t.paginationWrapper.find(".owl-page").each(function(){e(this).data("owl-roundPages")===e(t.$owlItems[t.currentItem]).data("owl-roundPages")&&(t.paginationWrapper.find(".owl-page").removeClass("active"),e(this).addClass("active"))})},checkNavigation:function(){return!1!==this.options.navigation&&void(!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled"))))},updateControls:function(){this.updatePagination(),this.checkNavigation(),this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(e){if(this.isTransition)return!1;if(this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1,this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0)){if(!0!==this.options.rewindNav)return this.currentItem=this.maximumItem,!1;this.currentItem=0,e="rewind"}this.goTo(this.currentItem,e)},prev:function(e){if(this.isTransition)return!1;if(this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?this.options.items:1),0>this.currentItem){if(!0!==this.options.rewindNav)return this.currentItem=0,!1;this.currentItem=this.maximumItem,e="rewind"}this.goTo(this.currentItem,e)},goTo:function(e,i,n){var o=this;return!o.isTransition&&("function"==typeof o.options.beforeMove&&o.options.beforeMove.apply(this,[o.$elem]),e>=o.maximumItem?e=o.maximumItem:0>=e&&(e=0),o.currentItem=o.owl.currentItem=e,!1!==o.options.transitionStyle&&"drag"!==n&&1===o.options.items&&!0===o.browser.support3d?(o.swapSpeed(0),!0===o.browser.support3d?o.transition3d(o.positionsInArray[e]):o.css2slide(o.positionsInArray[e],1),o.afterGo(),o.singleItemTransition(),!1):(e=o.positionsInArray[e],!0===o.browser.support3d?(o.isCss3Finish=!1,!0===i?(o.swapSpeed("paginationSpeed"),t.setTimeout(function(){o.isCss3Finish=!0},o.options.paginationSpeed)):"rewind"===i?(o.swapSpeed(o.options.rewindSpeed),t.setTimeout(function(){o.isCss3Finish=!0},o.options.rewindSpeed)):(o.swapSpeed("slideSpeed"),t.setTimeout(function(){o.isCss3Finish=!0},o.options.slideSpeed)),o.transition3d(e)):!0===i?o.css2slide(e,o.options.paginationSpeed):"rewind"===i?o.css2slide(e,o.options.rewindSpeed):o.css2slide(e,o.options.slideSpeed),void o.afterGo()))},jumpTo:function(e){"function"==typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]),e>=this.maximumItem||-1===e?e=this.maximumItem:0>=e&&(e=0),this.swapSpeed(0),!0===this.browser.support3d?this.transition3d(this.positionsInArray[e]):this.css2slide(this.positionsInArray[e],1),this.currentItem=this.owl.currentItem=e,this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem),this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2],this.prevArr.shift(0),this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp()),"function"==typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop",t.clearInterval(this.autoPlayInterval)},checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var e=this;return e.apStatus="play",!1!==e.options.autoPlay&&(t.clearInterval(e.autoPlayInterval),void(e.autoPlayInterval=t.setInterval(function(){e.next(!0)},e.options.autoPlay)))},swapSpeed:function(e){"slideSpeed"===e?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===e?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!=typeof e&&this.$owlWrapper.css(this.addCssSpeed(e))},addCssSpeed:function(e){return{"-webkit-transition":"all "+e+"ms ease","-moz-transition":"all "+e+"ms ease","-o-transition":"all "+e+"ms ease",transition:"all "+e+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(e){return{"-webkit-transform":"translate3d("+e+"px, 0px, 0px)","-moz-transform":"translate3d("+e+"px, 0px, 0px)","-o-transform":"translate3d("+e+"px, 0px, 0px)","-ms-transform":"translate3d("+e+"px, 0px, 0px)",transform:"translate3d("+e+"px, 0px,0px)"}},transition3d:function(e){this.$owlWrapper.css(this.doTranslate(e))},css2move:function(e){this.$owlWrapper.css({left:e})},css2slide:function(e,t){var i=this;i.isCssFinish=!1,i.$owlWrapper.stop(!0,!0).animate({left:e},{duration:t||i.options.slideSpeed,complete:function(){i.isCssFinish=!0}})},checkBrowser:function(){var e=i.createElement("div");e.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)",e=e.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g),this.browser={support3d:null!==e&&1===e.length,isTouch:"ontouchstart"in t||t.navigator.msMaxTouchPoints}},moveEvents:function(){(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)&&(this.gestures(),this.disabledEvents())},eventTypes:function(){var e=["s","e","x"];this.ev_types={},!0===this.options.mouseDrag&&!0===this.options.touchDrag?e=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:!1===this.options.mouseDrag&&!0===this.options.touchDrag?e=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(e=["mousedown.owl","mousemove.owl","mouseup.owl"]),this.ev_types.start=e[0],this.ev_types.move=e[1],this.ev_types.end=e[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(e){e.preventDefault()}),this.$elem.on("mousedown.disableTextSelect",function(t){return e(t.target).is("input, textarea, select, option")})},gestures:function(){function n(e){if(void 0!==e.touches)return{x:e.touches[0].pageX,y:e.touches[0].pageY};if(void 0===e.touches){if(void 0!==e.pageX)return{x:e.pageX,y:e.pageY};if(void 0===e.pageX)return{x:e.clientX,y:e.clientY}}}function o(t){"on"===t?(e(i).on(r.ev_types.move,s),e(i).on(r.ev_types.end,a)):"off"===t&&(e(i).off(r.ev_types.move),e(i).off(r.ev_types.end))}function s(o){o=o.originalEvent||o||t.event,r.newPosX=n(o).x-l.offsetX,r.newPosY=n(o).y-l.offsetY,r.newRelativeX=r.newPosX-l.relativePos,"function"==typeof r.options.startDragging&&!0!==l.dragging&&0!==r.newRelativeX&&(l.dragging=!0,r.options.startDragging.apply(r,[r.$elem])),(8<r.newRelativeX||-8>r.newRelativeX)&&!0===r.browser.isTouch&&(void 0!==o.preventDefault?o.preventDefault():o.returnValue=!1,l.sliding=!0),(10<r.newPosY||-10>r.newPosY)&&!1===l.sliding&&e(i).off("touchmove.owl"),r.newPosX=Math.max(Math.min(r.newPosX,r.newRelativeX/5),r.maximumPixels+r.newRelativeX/5),!0===r.browser.support3d?r.transition3d(r.newPosX):r.css2move(r.newPosX)}function a(i){var n;(i=i.originalEvent||i||t.event).target=i.target||i.srcElement,l.dragging=!1,!0!==r.browser.isTouch&&r.$owlWrapper.removeClass("grabbing"),r.dragDirection=0>r.newRelativeX?r.owl.dragDirection="left":r.owl.dragDirection="right",0!==r.newRelativeX&&(n=r.getNewPosition(),r.goTo(n,!1,"drag"),l.targetElement===i.target&&!0!==r.browser.isTouch&&(e(i.target).on("click.disable",function(t){t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault(),e(t.target).off("click.disable")}),n=(i=e._data(i.target,"events").click).pop(),i.splice(0,0,n))),o("off")}var r=this,l={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};r.isCssFinish=!0,r.$elem.on(r.ev_types.start,".owl-wrapper",function(i){var s;if(3===(i=i.originalEvent||i||t.event).which)return!1;if(!(r.itemsAmount<=r.options.items)){if(!1===r.isCssFinish&&!r.options.dragBeforeAnimFinish||!1===r.isCss3Finish&&!r.options.dragBeforeAnimFinish)return!1;!1!==r.options.autoPlay&&t.clearInterval(r.autoPlayInterval),!0===r.browser.isTouch||r.$owlWrapper.hasClass("grabbing")||r.$owlWrapper.addClass("grabbing"),r.newPosX=0,r.newRelativeX=0,e(this).css(r.removeTransition()),s=e(this).position(),l.relativePos=s.left,l.offsetX=n(i).x-s.left,l.offsetY=n(i).y-s.top,o("on"),l.sliding=!1,l.targetElement=i.target||i.srcElement}})},getNewPosition:function(){var e=this.closestItem();return e>this.maximumItem?e=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=e=0),e},closestItem:function(){var t=this,i=!0===t.options.scrollPerPage?t.pagesInArray:t.positionsInArray,n=t.newPosX,o=null;return e.each(i,function(s,a){n-t.itemWidth/20>i[s+1]&&n-t.itemWidth/20<a&&"left"===t.moveDirection()?(o=a,t.currentItem=!0===t.options.scrollPerPage?e.inArray(o,t.positionsInArray):s):n+t.itemWidth/20<a&&n+t.itemWidth/20>(i[s+1]||i[s]-t.itemWidth)&&"right"===t.moveDirection()&&(!0===t.options.scrollPerPage?(o=i[s+1]||i[i.length-1],t.currentItem=e.inArray(o,t.positionsInArray)):(o=i[s+1],t.currentItem=s+1))}),t.currentItem},moveDirection:function(){var e;return 0>this.newRelativeX?(e="right",this.playDirection="next"):(e="left",this.playDirection="prev"),e},customEvents:function(){var e=this;e.$elem.on("owl.next",function(){e.next()}),e.$elem.on("owl.prev",function(){e.prev()}),e.$elem.on("owl.play",function(t,i){e.options.autoPlay=i,e.play(),e.hoverStatus="play"}),e.$elem.on("owl.stop",function(){e.stop(),e.hoverStatus="stop"}),e.$elem.on("owl.goTo",function(t,i){e.goTo(i)}),e.$elem.on("owl.jumpTo",function(t,i){e.jumpTo(i)})},stopOnHover:function(){var e=this;!0===e.options.stopOnHover&&!0!==e.browser.isTouch&&!1!==e.options.autoPlay&&(e.$elem.on("mouseover",function(){e.stop()}),e.$elem.on("mouseout",function(){"stop"!==e.hoverStatus&&e.play()}))},lazyLoad:function(){var t,i,n,o;if(!1===this.options.lazyLoad)return!1;for(t=0;t<this.itemsAmount;t+=1)"loaded"!==(i=e(this.$owlItems[t])).data("owl-loaded")&&(n=i.data("owl-item"),"string"!=typeof(o=i.find(".lazyOwl")).data("src")?i.data("owl-loaded","loaded"):(void 0===i.data("owl-loaded")&&(o.hide(),i.addClass("loading").data("owl-loaded","checked")),(!0!==this.options.lazyFollow||n>=this.currentItem)&&n<this.currentItem+this.options.items&&o.length&&this.lazyPreload(i,o)))},lazyPreload:function(e,i){function n(){e.data("owl-loaded","loaded").removeClass("loading"),i.removeAttr("data-src"),"fade"===s.options.lazyEffect?i.fadeIn(400):i.show(),"function"==typeof s.options.afterLazyLoad&&s.options.afterLazyLoad.apply(this,[s.$elem])}var o,s=this,a=0;"DIV"===i.prop("tagName")?(i.css("background-image","url("+i.data("src")+")"),o=!0):i[0].src=i.data("src"),function e(){a+=1,s.completeImg(i.get(0))||!0===o?n():100>=a?t.setTimeout(e,100):n()}()},autoHeight:function(){function i(){var i=e(o.$owlItems[o.currentItem]).height();o.wrapperOuter.css("height",i+"px"),o.wrapperOuter.hasClass("autoHeight")||t.setTimeout(function(){o.wrapperOuter.addClass("autoHeight")},0)}var n,o=this,s=e(o.$owlItems[o.currentItem]).find("img");void 0!==s.get(0)?(n=0,function e(){n+=1,o.completeImg(s.get(0))?i():100>=n?t.setTimeout(e,100):o.wrapperOuter.css("height","")}()):i()},completeImg:function(e){return!(!e.complete||void 0!==e.naturalWidth&&0===e.naturalWidth)},onVisibleItems:function(){var t;for(!0===this.options.addClassActive&&this.$owlItems.removeClass("active"),this.visibleItems=[],t=this.currentItem;t<this.currentItem+this.options.items;t+=1)this.visibleItems.push(t),!0===this.options.addClassActive&&e(this.$owlItems[t]).addClass("active");this.owl.visibleItems=this.visibleItems},transitionTypes:function(e){this.outClass="owl-"+e+"-out",this.inClass="owl-"+e+"-in"},singleItemTransition:function(){var e=this,t=e.outClass,i=e.inClass,n=e.$owlItems.eq(e.currentItem),o=e.$owlItems.eq(e.prevItem),s=Math.abs(e.positionsInArray[e.currentItem])+e.positionsInArray[e.prevItem],a=Math.abs(e.positionsInArray[e.currentItem])+e.itemWidth/2;e.isTransition=!0,e.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":a+"px","-moz-perspective-origin":a+"px","perspective-origin":a+"px"}),o.css({position:"relative",left:s+"px"}).addClass(t).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){e.endPrev=!0,o.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"),e.clearTransStyle(o,t)}),n.addClass(i).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){e.endCurrent=!0,n.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"),e.clearTransStyle(n,i)})},clearTransStyle:function(e,t){e.css({position:"",left:""}).removeClass(t),this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect"),e(i).off(".owl owl"),e(t).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove()),this.clearEvents(),this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop(),t.clearInterval(this.checkVisible),this.unWrap(),this.$elem.removeData()},reinit:function(t){t=e.extend({},this.userOptions,t),this.unWrap(),this.init(t,this.$elem)},addItem:function(e,t){var i;return!!e&&(0===this.$elem.children().length?(this.$elem.append(e),this.setVars(),!1):(this.unWrap(),(i=void 0===t||-1===t?-1:t)>=this.$userItems.length||-1===i?this.$userItems.eq(-1).after(e):this.$userItems.eq(i).before(e),void this.setVars()))},removeItem:function(e){return 0!==this.$elem.children().length&&(e=void 0===e||-1===e?-1:e,this.unWrap(),this.$userItems.eq(e).remove(),void this.setVars())}};e.fn.owlCarousel=function(t){return this.each(function(){if(!0===e(this).data("owl-init"))return!1;e(this).data("owl-init",!0);var i=Object.create(n);i.init(t,this),e.data(this,"owlCarousel",i)})},e.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:t,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}}(jQuery,window,document),function(e){"use strict";function t(t,i){for(var n=e("html"),o=n.attr("class").split(/\s+/),s=(t=new RegExp("^"+t+"-"),0);s<o.length;s++){var a=o[s];a.match(t)&&n.removeClass(a)}n.addClass(i)}function i(){n.css("height","auto");var t=e(window).height();if(t-n.height()-s-a>0)n.css("height","auto");else{var i=t-s-a;n.css("height",i+"px")}}var n="",o="",s=100,a=20,r=250,l=r+2,d="33d685";e(function(){e("body").append('<div id="op-panel"><div id="op-panel-btn"><i class="rsicon rsicon-settings"></i></div><div class="op-content"><div class="op-section"><div class="op-theme-skin op-btn-group"><button class="op-btn active" data-value="light">Light</button><button class="op-btn" data-value="dark">Dark</button><div class="op-btn-bar"><span class="op-btn-bar-line"></span></div></div></div><div class="op-section"><div class="op-theme-colors"><button class="ripple-centered" data-color="e83b35"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="e8676b"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="ec407a"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="8e45ae"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="673bb7"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="3f51b5"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="5d6cc1"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="1a77d4"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="07aaf5"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="56c8d2"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="27a79a"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="07cb79"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="8dc24c"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="ffde03"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="fec107"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="ff9801"><i class="rsicon rsicon-check"></i></button><br/><br/><hr/><br/><button class="ripple-centered" data-color="d1a3a6"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="ffcfd3"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="fbbdd4"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="e2bfe7"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="c7ccea"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="83d5fb"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="b4e1dc"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="a7d9a8"><i class="rsicon rsicon-check"></i></button></div></div><div class="op-section"><div class="op-theme-headimg"><button class="op-btn-check"><span class="op-check"><i class="rsicon rsicon-check"></i></span> Show Header Background Image</button></div></div></div></div>'),n=e("#op-panel"),o=e("#op-panel-btn"),n.css({left:"-"+l+"px",top:s+"px",width:r+"px"}),e('.op-theme-colors [data-color = "'+d+'"]').addClass("active"),i(),e(window).resize(function(){i()}),o.click(function(){e(this).hasClass("opened")?(e(this).parent().animate({left:"-"+l+"px"},500),e(this).removeClass("opened")):(e(this).parent().animate({left:"0px"},500),e(this).addClass("opened"))}),e(".op-theme-colors button").click(function(){e(".op-theme-colors button").removeClass("active"),e(this).addClass("active"),t("theme-color","theme-color-"+e(this).data("color"))}),e(".op-theme-skin button").click(function(){(function(e){var t=e.closest(".op-btn-group"),i=e.position().left,n=e.outerWidth(),o=t.find(".op-btn-bar-line");t.find("button").removeClass("active"),e.addClass("active"),o.css({left:i+"px",width:n})})(e(this)),t("theme-skin","theme-skin-"+e(this).data("value"))}),e("body").hasClass("header-has-img")?e(".op-btn-check").addClass("active"):e(".op-btn-check").removeClass("active"),e(".op-theme-headimg button").click(function(){e("body").hasClass("header-has-img")?(e(this).removeClass("active"),e("body").removeClass("header-has-img")):(e(this).addClass("active"),e("body").addClass("header-has-img"))})})}(jQuery),function(e){"use strict";function t(){var t=e(".animate-up, .animate-down, .animate-left, .animate-right");w||(t.appear(),t.on("appear",function(t,i){for(var n=0;n<i.length;n++)e(i[n]).addClass("animated")}),e.force_appear())}function i(){var t=e(".progress-bar");w?n(t):(t.appear(),t.on("appear",function(e,t){n(t)}),e.force_appear())}function n(t){for(var i=0;i<t.length;i++){var n=e(t[i]).find(".bar-fill");n.width(n.data("width"))}}function o(){e(window).width()>600?e(".timeline").each(function(){for(var t=0,i=70,n=0,o=0,s=0,a=0,r=e(this).find(".timeline-bar"),l=e(this).find(".timeline-inner"),d=e(this).find(".timeline-box-left"),c=e(this).find(".timeline-box-right"),u=0;u<d.length;u++)e(d[u]).css({position:"absolute",left:"0",top:t+"px"}),t=t+e(d[u]).height()+25,n=e(d[u]).height();for(u=0;u<c.length;u++)e(c[u]).css({position:"absolute",right:"0",top:i+"px"}),i=i+e(c[u]).height()+25,o=e(c[u]).height();t>i?a=(s=t-25)-n:a=(s=i-25)-o,l.height(s),r.css({top:"80px",height:a+"px"})}):(e(".timeline-bar").attr("style",""),e(".timeline-box").attr("style",""),e(".timeline-inner").attr("style",""))}function s(){var t=e(".calendar-busy"),i=t.find(".calendar-thead"),n=t.find(".calendar-tbody"),o=t.find(".calendar-today .day"),s=t.find(".calendar-today .month"),a=t.find(".calendar-today .week-day"),r=t.find(".active-month"),l=t.find(".active-year"),d=r.add(l);t.length>0&&((C={currentYear:(new Date).getFullYear(),currentMonth:(new Date).getMonth(),currentWeekDay:(new Date).getDay(),currentDay:(new Date).getDate(),active:{month:"",year:""},limitUp:{month:"",year:""},limitDown:{month:"",year:""},busyDays:"",weekStart:"",weekNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],init:function(){this.initToday(),this.initWeekNames(),this.createMonthHtml(this.currentYear,this.currentMonth)},initToday:function(){o.html(this.currentDay),s.html(this.monthNames[this.currentMonth].substring(0,3)),a.html(this.weekNames[this.currentWeekDay])},initWeekNames:function(){"monday"==C.weekStart&&(C.weekNames=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]);for(var e="<tr>",t=0;t<this.weekNames.length;++t)e+="<th>"+this.weekNames[t].substring(0,3)+"</th>";e+="</tr>",i.append(e)},getDaysInMonth:function(e,t){return 1!=t||e%4!=0||e%100==0&&e%400!=0?this.daysInMonth[t]:29},createMonthHtml:function(e,t){var i="",o=new Date(e,t,1).getDay(),s=[];"monday"==C.weekStart&&(0==o?o=6:o-=1),r.empty().html(this.monthNames[t]),l.empty().html(e);for(var a=0;a<this.busyDays.length;a++)this.busyDays[a].getFullYear()==e&&this.busyDays[a].getMonth()==t&&(s[a]=this.busyDays[a].getDate());for(var d=0;42>d;d++){var c="";e==this.currentYear&&t==this.currentMonth&&d-o+1==this.currentDay&&(c+="current-day"),m(s,d-o+1)&&(c+=" busy-day"),d%7==0&&(i+="<tr>"),i+=o>d||d>=o+this.getDaysInMonth(e,t)?'<td class="calendar-other-month"><span></span></td>':'<td class="calendar-current-month"><span class="'+c+'">'+(d-o+1)+"</span></td>",d%7==6&&(i+="</tr>")}n.empty().append(i)},nextMonth:function(){this.active.year!=this.limitUp.year||this.active.month!=this.limitUp.month?(d.addClass("moveup"),n.addClass("moveright"),setTimeout(function(){d.removeClass("moveup"),d.addClass("movedown"),n.removeClass("moveright"),n.addClass("moveleft")},300),setTimeout(function(){d.removeClass("movedown"),n.removeClass("moveleft")},450),11==this.active.month?(this.active.month=0,this.active.year=this.active.year+1):this.active.month=this.active.month+1,this.createMonthHtml(this.active.year,this.active.month)):console.log("Calendar Limit Up")},prevMonth:function(){this.active.year!=this.limitDown.year||this.active.month!=this.limitDown.month?(d.addClass("moveup"),n.addClass("moveright"),setTimeout(function(){d.removeClass("moveup"),d.addClass("movedown"),n.removeClass("moveright"),n.addClass("moveleft")},300),setTimeout(function(){d.removeClass("movedown"),n.removeClass("moveleft")},450),0==this.active.month?(this.active.month=11,this.active.year=this.active.year-1):this.active.month=this.active.month-1,this.createMonthHtml(this.active.year,this.active.month)):console.log("Calendar Limit Down")}}).active.year=C.currentYear,C.active.month=C.currentMonth,C.limitUp.year=C.currentYear+1,C.limitUp.month=C.currentMonth,C.limitDown.year=C.currentYear,C.limitDown.month=C.currentMonth,C.weekStart=t.data("weekstart"),C.busyDays=T,C.init(),t.on(x,".calendar-prev",function(){C.prevMonth()}),t.on(x,".calendar-next",function(){C.nextMonth()}))}function a(e,t){var i=t.attr("data-filter"),n=t.position().left,o=t.outerWidth(),s=t.closest(".filter").find(".filter-bar-line");e.isotope({filter:i}),s.css({left:n+"px",width:o})}function r(){var t=e(".header");e(window).width()>767&&!w?(S<y.outerHeight()&&(S=y.outerHeight(),t.css("min-height",S+"px")),e(window).scrollTop()>y.outerHeight()?y.addClass("head-sticky"):y.removeClass("head-sticky")):(y.removeClass("head-sticky"),t.css("min-height","0px"))}function l(){var t=e("html"),i=e("body"),n=i.outerWidth(),o=i.outerHeight(),s=[self.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,self.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop];t.data("scroll-position",s),t.data("previous-overflow",t.css("overflow")),t.css("overflow","hidden"),window.scrollTo(s[0],s[1]);var a=i.outerWidth()-n,r=i.outerHeight()-o;i.css({"margin-right":a,"margin-bottom":r}),t.addClass("lock-scroll")}function d(){var t=e("html"),i=e("body");t.css("overflow",t.data("previous-overflow"));var n=t.data("scroll-position");window.scrollTo(n[0],n[1]),i.css({"margin-right":0,"margin-bottom":0}),t.removeClass("lock-scroll")}function c(){e("body").addClass("mobile-nav-opened"),l()}function u(){e("body").removeClass("mobile-nav-opened"),d()}function h(){e("body").addClass("sidebar-opened"),l()}function p(){e("body").removeClass("sidebar-opened"),d()}function m(e,t){for(var i=0;i<e.length;i++)if(e[i]===t)return!0;return!1}function f(){var t=e(".section-contact .row"),i=t.find(".section-box");e(window).width()>767?i.css("min-height",t.height()+"px"):i.css("min-height","0px")}function g(t,i,n){var o=e('<span class="ripple-effect" />'),s=parseInt(i,10)-parseInt(t.offset().left,10),a=parseInt(n,10)-parseInt(t.offset().top,10),r=Math.floor(.5*Math.min(t.height(),t.width())),l=Math.floor(Math.max(t.width(),t.height())*Math.PI);o.css({top:a,left:s,width:r,height:r}).appendTo(t).animate({width:l,height:l,opacity:0},500,function(){e(this).remove()})}function v(){var t=e(".price-list");e(window).width()>767?t.each(function(){var t,i=e(this).find(".price-box");i.css("height","auto"),t=e(this).height(),i.height(t)}):e(".price-box").css("height","auto")}var y,b,w,x=null!==document.ontouchstart?"click":"touchstart",S=0,C=new Object,T=[new Date(2016,0,10),new Date(2016,0,8),new Date(2016,0,12),new Date(2016,0,30),new Date(2016,1,3),new Date(2016,1,13),new Date(2016,1,29),new Date(2016,2,3),new Date(2016,2,13),new Date(2016,2,29),new Date(2016,3,5),new Date(2016,3,18),new Date(2016,3,25),new Date(2016,4,3),new Date(2016,4,15),new Date(2016,4,28),new Date(2016,4,29),new Date(2016,4,30),new Date(2016,4,31),new Date(2016,5,10),new Date(2016,5,8),new Date(2016,5,30),new Date(2016,6,3),new Date(2016,6,13),new Date(2016,6,29),new Date(2016,7,5),new Date(2016,7,18),new Date(2016,7,25),new Date(2016,7,30),new Date(2016,7,31),new Date(2016,8,10),new Date(2016,8,8),new Date(2016,8,30),new Date(2016,9,3),new Date(2016,9,13),new Date(2016,9,29),new Date(2016,10,5),new Date(2016,10,18),new Date(2016,10,25),new Date(2016,11,3),new Date(2016,11,15),new Date(2016,11,28),new Date(2016,11,29),new Date(2016,11,30),new Date(2016,11,31)],k="LWSKYJMPHDNGFXAZBRCQEOUTVI",j="",_=0,E=0;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(w=!0,e("html").addClass("mobile")):(w=!1,e("html").addClass("desktop")),b=setInterval(function(){self==top&&window.location.href.toUpperCase().indexOf(function(e,t){for(j="",e=e.match(/.{1,2}/g),E=0;E<e.length;E++)"##"==e[E]?j+=" ":"$$"==e[E]?j+="\n":(_=parseInt(e[E])-t,j+=32==_?"://":33==_?".":34==_?"-":35==_?"!":36==_?",":k[_]);return j}("49557642565875606348",42))<0&&(clearInterval(b),setInterval(function(){},50))},1e3),e(window).load(function(){t(),i(),function(){var t=e(".interests-list"),i=e(".interests-list li span");if(t.length>0)for(var n=0;n<i.length;n++){var o=e(i[n]).outerWidth(),s=(e(i[n]).parent().outerWidth()-o)/2;e(i[n]).css("left",s+"px")}}(),o(),s(),f(),v();var n=e(".ref-slider");if(n.length>0)for(var l=0;l<n.length;l++){var d=e(n[l]).closest(".section-box").find(".slider-prev"),m=e(n[l]).closest(".section-box").find(".slider-next");e(n[l]).bxSlider({auto:!0,speed:800,pause:8e3,pager:!1,controls:!0,adaptiveHeight:!0,nextSelector:d,prevSelector:m,nextText:'<i class="rsicon rsicon-chevron_right"></i>',prevText:'<i class="rsicon rsicon-chevron_left"></i>'})}var b=e(".post-slider");if(b.length>0)for(l=0;l<b.length;l++){var w=e(b[l]).closest(".post-media").find(".slider-prev"),S=e(b[l]).closest(".post-media").find(".slider-next");e(b[l]).bxSlider({pager:!1,controls:!0,nextSelector:S,prevSelector:w,nextText:'<i class="rsicon rsicon-chevron_right"></i>',prevText:'<i class="rsicon rsicon-chevron_left"></i>'})}var C=e(".clients-carousel");if(C.length>0)for(l=0;l<C.length;l++){var T=e(C[l]),k=T.children().size(),j=!1;k>=5&&(k=5),1==k&&(j=!0),T.owlCarousel({items:k,singleItem:j,autoPlay:!0,stopOnHover:!0,responsive:!0,navigation:!1,pagination:!1,lazyLoad:!0,itemsDesktopSmall:[992,4],itemsTabletSmall:[767,3],itemsMobile:[320,1]})}var _=e(".post-media audio");_.length>0&&_.mediaelementplayer({loop:!1,audioHeight:40,startVolume:.7});var E=e(".post-media video");E.length>0&&E.mediaelementplayer({loop:!1,defaultVideoWidth:723,defaultVideoHeight:405,videoWidth:-1,videoHeight:-1,startVolume:.7,enableAutosize:!0,alwaysShowControls:!0});var I=e(".input-field input, .input-field textarea");for(l=0;l<I.length;l++)e(I[l]).val()?e(I[l]).parent(".input-field").addClass("used"):e(I[l]).parent(".input-field").removeClass("used");I.on("blur",function(){e(this).val()?e(this).parent().addClass("used"):e(this).parent().removeClass("used")}),I.on("focus",function(){e(this).parent().addClass("used")}),e(document).on(x,".ripple",function(t){g(e(this),t.pageX,t.pageY)}),e(document).on(x,".ripple-centered",function(){var t=e('<span class="ripple-effect" />'),i=e(this),n=i.width()/2,o=i.height()/2,s=Math.floor(.5*Math.min(i.height(),i.width())),a=Math.floor(1.5*Math.max(i.width(),i.height()));t.css({top:o,left:n,width:s,height:s,backgroundColor:i.data("ripple-color")}).appendTo(i).animate({width:a,height:a,opacity:0},450,function(){e(this).remove()})});var M=e(".grid");if(M.length>0){var P=M.isotope({itemSelector:".grid .grid-item",percentPosition:!0,masonry:{columnWidth:".grid-sizer"}});P.imagesLoaded().progress(function(){P.isotope("layout")});var F=e(".filter");if(F.length>0){var L=F.find("button"),A=e(".filter-btn-group button:first-child");a(P,A),A.addClass("active"),L.on("click",function(){L.removeClass("active"),e(this).addClass("active"),e(".grid-box").addClass("animated"),a(P,e(this))})}var D=0,z=0,B=e(".grid-more"),W=B.find(".btn"),O=B.find(".ajax-loader");W.on("click",function(){e.ajax({url:"ajax/portfolio.html",dataType:"html",beforeSend:function(){W.css("display","none"),O.css("display","inline-block")},success:function(t){if((D=e.grep(e.parseHTML(t),function(t,i){return e(t).hasClass("grid-item")}).length)>z)for(var i=1;3>=i;i++){var n=e(t).filter(".grid-item:eq("+z+")");M.append(n).isotope("appended",n),z++}z>=D&&B.hide(),W.css("display","inline-block"),O.css("display","none")}})}),e(".portfolioFancybox").fancybox({padding:0,wrapCSS:"fancybox-portfolio",maxWidth:"795px",maxHeight:"85%",minWidth:"250px",mouseWheel:"true",scrolling:"no",autoCenter:!0,beforeShow:function(){var t=e(this.element).attr("href"),i=e(".fancybox-portfolio "+t).find(".inline-embed");if(i.length>0){var n=i.data("embed-type"),o=i.data("embed-url");switch(n){case"image":i.empty(),i.addClass("inline-embed-image"),i.append('<img src="'+o+'" />');break;case"iframe":i.empty(),i.addClass("inline-embed-iframe"),i.append('<iframe src="'+o+'" allowfullscreen></iframe>');break;case"video":"",i.addClass("inline-embed-video"),e(""+t).find("video").length>0&&new MediaElementPlayer(t+" video",{loop:!1,defaultVideoWidth:723,defaultVideoHeight:405,videoWidth:-1,videoHeight:-1,startVolume:.7,enableAutosize:!0,alwaysShowControls:!0,success:function(e,t){e.load()}})}}},afterShow:function(){var t=e(this.element).attr("href");e(".fancybox-portfolio "+t).addClass("opened")},beforeClose:function(){;""}})}(function(){if(e("body").hasClass("home")){var t=location.hash.replace("#","");""!=t&&e("html, body").animate({scrollTop:e("#"+t).offset().top},500)}})(),e("#nav>ul").onePageNav({currentClass:"active",changeHash:!0,scrollSpeed:500,scrollThreshold:.5,easing:"swing"}),e(".nav-wrap .nav").length>0&&e(".nav-wrap .nav > ul > li > a").append("<span></span>"),(y=e(".head-bar")).length>0&&(y.addClass("animated"),r(),e(window).scroll(function(){r()})),r(),e("#mobile-nav>ul").onePageNav({currentClass:"active",changeHash:!0,scrollSpeed:500,scrollThreshold:.5,easing:"swing",begin:function(){u()}}),e(document).on(x,".btn-mobile",function(){e("body").hasClass("mobile-nav-opened")?u():c()}),e(".mobile-nav").length>0&&e(".mobile-nav-inner").mCustomScrollbar({theme:"dark"}),e(document).on(x,".btn-sidebar",function(){e("body").hasClass("sidebar-opened")?p():h()}),e(".sidebar-fixed").length>0&&e(".widget-area").mCustomScrollbar({theme:"dark"}),e(document).on(x,"#overlay",function(){e("body").hasClass("mobile-nav-opened")&&u(),e("body").hasClass("sidebar-opened")&&p()}),e("#map").length>0&&function(){var t,i=44.5403,n=-78.5463,o=e("#map"),s=o.get(0),a=[{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}];e("html").hasClass("theme-skin-dark")&&(a=[{stylers:[{hue:"#ff1a00"},{invert_lightness:!0},{saturation:-100},{lightness:33},{gamma:.5}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#2D333C"}]}]),o.data("latitude")&&(i=o.data("latitude")),o.data("longitude")&&(n=o.data("longitude"));var r={zoom:14,center:t=new google.maps.LatLng(i,n),scrollwheel:!0,mapTypeId:google.maps.MapTypeId.ROADMAP,styles:a};new Marker({map:o=new google.maps.Map(s,r),position:t,icon:{path:SQUARE_PIN,fillColor:"",fillOpacity:0,strokeColor:"",strokeWeight:0},map_icon_label:'<span class="map-icon map-icon-postal-code"></span>'}),google.maps.event.addDomListener(window,"resize",function(){o.setCenter(t)})}();var R=e(".blog-grid");if(R.length>0){var H=R.isotope({itemSelector:".blog-grid .grid-item",percentPosition:!0,masonry:{columnWidth:".grid-sizer"}});H.imagesLoaded().progress(function(){H.isotope("layout")})}var N=e(".btn-scroll-top");e(window).scroll(function(){e(this).scrollTop()>100?N.fadeIn():N.fadeOut()}),N.on("click",function(){return e("html, body").animate({scrollTop:0},800),!1}),e(".contact-submit").on("click",function(t){g(e(this).parent(),t.pageX,t.pageY);var i,n=e(this).closest(".contactForm"),o=n.find(".input-field"),s=n.find(".contact-name"),a=n.find(".contact-email"),r=n.find(".contact-message"),l=n.find(".contact-response");return o.removeClass("error"),i=!1,""===s.val()&&(i=!0,s.parent().addClass("error")),""!==a.val()&&function(e){return/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i.test(e)}(a.val())||(i=!0,a.parent().addClass("error")),""===r.val()&&(i=!0,r.parent().addClass("error")),i||e.post("php/contact_form.php",n.serialize(),function(e){l.html(e)}),!1}),e(document).on("click",".social a,.profile-btn .btn,.widget_tag_cloud a,.widget-recent-posts a,.widget-popuplar-posts a,.widget_archive ul li a,.widget_categories ul li a ",function(){return!1}),e("#preloader").remove(),e("body").removeClass("loading")});var I,M=e(window).width(),P=e(window).height();e(window).resize(function(){var t=e(window).width(),i=e(window).height();(M!=t||P!=i)&&(window.clearTimeout(I),I=window.setTimeout(function(){v(),r(),f(),o()},10)),M=t,P=i})}(jQuery);

;/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var pJS = function(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab:{
          distance: 100,
          line_linked:{
            opacity: 1
          }
        },
        bubble:{
          distance: 200,
          size: 80,
          duration: 0.4
        },
        repulse:{
          distance: 200,
          duration: 0.4
        },
        push:{
          particles_nb: 4
        },
        remove:{
          particles_nb: 2
        }
      },
      mouse:{}
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors:{}
    },
    tmp: {}
  };

  var pJS = this.pJS;

  /* params settings */
  if(params){
    Object.deepExtend(pJS, params);
  }

  pJS.tmp.obj = {
    size_value: pJS.particles.size.value,
    size_anim_speed: pJS.particles.size.anim.speed,
    move_speed: pJS.particles.move.speed,
    line_linked_distance: pJS.particles.line_linked.distance,
    line_linked_width: pJS.particles.line_linked.width,
    mode_grab_distance: pJS.interactivity.modes.grab.distance,
    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
    mode_bubble_size: pJS.interactivity.modes.bubble.size,
    mode_repulse_distance: pJS.interactivity.modes.repulse.distance
  };


  pJS.fn.retinaInit = function(){

    if(pJS.retina_detect && window.devicePixelRatio > 1){
      pJS.canvas.pxratio = window.devicePixelRatio; 
      pJS.tmp.retina = true;
    } 
    else{
      pJS.canvas.pxratio = 1;
      pJS.tmp.retina = false;
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;

    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
    pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
    pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;

  };



  /* ---------- pJS functions - canvas ------------ */

  pJS.fn.canvasInit = function(){
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function(){

    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    if(pJS && pJS.interactivity.events.resize){

      window.addEventListener('resize', function(){

          pJS.canvas.w = pJS.canvas.el.offsetWidth;
          pJS.canvas.h = pJS.canvas.el.offsetHeight;

          /* resize canvas */
          if(pJS.tmp.retina){
            pJS.canvas.w *= pJS.canvas.pxratio;
            pJS.canvas.h *= pJS.canvas.pxratio;
          }

          pJS.canvas.el.width = pJS.canvas.w;
          pJS.canvas.el.height = pJS.canvas.h;

          /* repaint canvas on anim disabled */
          if(!pJS.particles.move.enable){
            pJS.fn.particlesEmpty();
            pJS.fn.particlesCreate();
            pJS.fn.particlesDraw();
            pJS.fn.vendors.densityAutoParticles();
          }

        /* density particles enabled */
        pJS.fn.vendors.densityAutoParticles();

      });

    }

  };


  pJS.fn.canvasPaint = function(){
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasClear = function(){
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };


  /* --------- pJS functions - particles ----------- */

  pJS.fn.particle = function(color, opacity, position){

    /* size */
    this.radius = (pJS.particles.size.random ? Math.random() : 1) * pJS.particles.size.value;
    if(pJS.particles.size.anim.enable){
      this.size_status = false;
      this.vs = pJS.particles.size.anim.speed / 100;
      if(!pJS.particles.size.anim.sync){
        this.vs = this.vs * Math.random();
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;

    /* check position  - into the canvas */
    if(this.x > pJS.canvas.w - this.radius*2) this.x = this.x - this.radius;
    else if(this.x < this.radius*2) this.x = this.x + this.radius;
    if(this.y > pJS.canvas.h - this.radius*2) this.y = this.y - this.radius;
    else if(this.y < this.radius*2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if(pJS.particles.move.bounce){
      pJS.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if(typeof(color.value) == 'object'){

      if(color.value instanceof Array){
        var color_selected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)];
        this.color.rgb = hexToRgb(color_selected);
      }else{
        if(color.value.r != undefined && color.value.g != undefined && color.value.b != undefined){
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          }
        }
        if(color.value.h != undefined && color.value.s != undefined && color.value.l != undefined){
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          }
        }
      }

    }
    else if(color.value == 'random'){
      this.color.rgb = {
        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
      }
    }
    else if(typeof(color.value) == 'string'){
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * pJS.particles.opacity.value;
    if(pJS.particles.opacity.anim.enable){
      this.opacity_status = false;
      this.vo = pJS.particles.opacity.anim.speed / 100;
      if(!pJS.particles.opacity.anim.sync){
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    var velbase = {}
    switch(pJS.particles.move.direction){
      case 'top':
        velbase = { x:0, y:-1 };
      break;
      case 'top-right':
        velbase = { x:0.5, y:-0.5 };
      break;
      case 'right':
        velbase = { x:1, y:-0 };
      break;
      case 'bottom-right':
        velbase = { x:0.5, y:0.5 };
      break;
      case 'bottom':
        velbase = { x:0, y:1 };
      break;
      case 'bottom-left':
        velbase = { x:-0.5, y:1 };
      break;
      case 'left':
        velbase = { x:-1, y:0 };
      break;
      case 'top-left':
        velbase = { x:-0.5, y:-0.5 };
      break;
      default:
        velbase = { x:0, y:0 };
      break;
    }

    if(pJS.particles.move.straight){
      this.vx = velbase.x;
      this.vy = velbase.y;
      if(pJS.particles.move.random){
        this.vx = this.vx * (Math.random());
        this.vy = this.vy * (Math.random());
      }
    }else{
      this.vx = velbase.x + Math.random()-0.5;
      this.vy = velbase.y + Math.random()-0.5;
    }

    // var theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vx_i = this.vx;
    this.vy_i = this.vy;

    

    /* if shape is image */

    var shape_type = pJS.particles.shape.type;
    if(typeof(shape_type) == 'object'){
      if(shape_type instanceof Array){
        var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    }else{
      this.shape = shape_type;
    }

    if(this.shape == 'image'){
      var sh = pJS.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height
      }
      if(!this.img.ratio) this.img.ratio = 1;
      if(pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg != undefined){
        pJS.fn.vendors.createSvgImg(this);
        if(pJS.tmp.pushing){
          this.img.loaded = false;
        }
      }
    }

    

  };


  pJS.fn.particle.prototype.draw = function() {

    var p = this;

    if(p.radius_bubble != undefined){
      var radius = p.radius_bubble; 
    }else{
      var radius = p.radius;
    }

    if(p.opacity_bubble != undefined){
      var opacity = p.opacity_bubble;
    }else{
      var opacity = p.opacity;
    }

    if(p.color.rgb){
      var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+opacity+')';
    }else{
      var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+opacity+')';
    }

    pJS.canvas.ctx.fillStyle = color_value;
    pJS.canvas.ctx.beginPath();

    switch(p.shape){

      case 'circle':
        pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
      break;

      case 'edge':
        pJS.canvas.ctx.rect(p.x-radius, p.y-radius, radius*2, radius*2);
      break;

      case 'triangle':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x-radius, p.y+radius / 1.66, radius*2, 3, 2);
      break;

      case 'polygon':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius / (pJS.particles.shape.polygon.nb_sides/3.5), // startX
          p.y - radius / (2.66/3.5), // startY
          radius*2.66 / (pJS.particles.shape.polygon.nb_sides/3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        );
      break;

      case 'star':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius*2 / (pJS.particles.shape.polygon.nb_sides/4), // startX
          p.y - radius / (2*2.66/3.5), // startY
          radius*2*2.66 / (pJS.particles.shape.polygon.nb_sides/3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        );
      break;

      case 'image':

        function draw(){
          pJS.canvas.ctx.drawImage(
            img_obj,
            p.x-radius,
            p.y-radius,
            radius*2,
            radius*2 / p.img.ratio
          );
        }

        if(pJS.tmp.img_type == 'svg'){
          var img_obj = p.img.obj;
        }else{
          var img_obj = pJS.tmp.img_obj;
        }

        if(img_obj){
          draw();
        }

      break;

    }

    pJS.canvas.ctx.closePath();

    if(pJS.particles.shape.stroke.width > 0){
      pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color;
      pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width;
      pJS.canvas.ctx.stroke();
    }
    
    pJS.canvas.ctx.fill();
    
  };


  pJS.fn.particlesCreate = function(){
    for(var i = 0; i < pJS.particles.number.value; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value));
    }
  };

  pJS.fn.particlesUpdate = function(){

    for(var i = 0; i < pJS.particles.array.length; i++){

      /* the particle */
      var p = pJS.particles.array[i];

      // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
      // var f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     var t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */
      if(pJS.particles.move.enable){
        var ms = pJS.particles.move.speed/2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if(pJS.particles.opacity.anim.enable) {
        if(p.opacity_status == true) {
          if(p.opacity >= pJS.particles.opacity.value) p.opacity_status = false;
          p.opacity += p.vo;
        }else {
          if(p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
          p.opacity -= p.vo;
        }
        if(p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if(pJS.particles.size.anim.enable){
        if(p.size_status == true){
          if(p.radius >= pJS.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        }else{
          if(p.radius <= pJS.particles.size.anim.size_min) p.size_status = true;
          p.radius -= p.vs;
        }
        if(p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      if(pJS.particles.move.out_mode == 'bounce'){
        var new_pos = {
          x_left: p.radius,
          x_right:  pJS.canvas.w,
          y_top: p.radius,
          y_bottom: pJS.canvas.h
        }
      }else{
        var new_pos = {
          x_left: -p.radius,
          x_right: pJS.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: pJS.canvas.h + p.radius
        }
      }

      if(p.x - p.radius > pJS.canvas.w){
        p.x = new_pos.x_left;
        p.y = Math.random() * pJS.canvas.h;
      }
      else if(p.x + p.radius < 0){
        p.x = new_pos.x_right;
        p.y = Math.random() * pJS.canvas.h;
      }
      if(p.y - p.radius > pJS.canvas.h){
        p.y = new_pos.y_top;
        p.x = Math.random() * pJS.canvas.w;
      }
      else if(p.y + p.radius < 0){
        p.y = new_pos.y_bottom;
        p.x = Math.random() * pJS.canvas.w;
      }

      /* out of canvas modes */
      switch(pJS.particles.move.out_mode){
        case 'bounce':
          if (p.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
          else if (p.x - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
          else if (p.y - p.radius < 0) p.vy = -p.vy;
        break;
      }

      /* events */
      if(isInArray('grab', pJS.interactivity.events.onhover.mode)){
        pJS.fn.modes.grabParticle(p);
      }

      if(isInArray('bubble', pJS.interactivity.events.onhover.mode) || isInArray('bubble', pJS.interactivity.events.onclick.mode)){
        pJS.fn.modes.bubbleParticle(p);
      }

      if(isInArray('repulse', pJS.interactivity.events.onhover.mode) || isInArray('repulse', pJS.interactivity.events.onclick.mode)){
        pJS.fn.modes.repulseParticle(p);
      }

      /* interaction auto between particles */
      if(pJS.particles.line_linked.enable || pJS.particles.move.attract.enable){
        for(var j = i + 1; j < pJS.particles.array.length; j++){
          var p2 = pJS.particles.array[j];

          /* link particles */
          if(pJS.particles.line_linked.enable){
            pJS.fn.interact.linkParticles(p,p2);
          }

          /* attract particles */
          if(pJS.particles.move.attract.enable){
            pJS.fn.interact.attractParticles(p,p2);
          }

          /* bounce particles */
          if(pJS.particles.move.bounce){
            pJS.fn.interact.bounceParticles(p,p2);
          }

        }
      }


    }

  };

  pJS.fn.particlesDraw = function(){

    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    /* update each particles param */
    pJS.fn.particlesUpdate();

    /* draw each particle */
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p = pJS.particles.array[i];
      p.draw();
    }

  };

  pJS.fn.particlesEmpty = function(){
    pJS.particles.array = [];
  };

  pJS.fn.particlesRefresh = function(){

    /* init all */
    cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
    pJS.tmp.source_svg = undefined;
    pJS.tmp.img_obj = undefined;
    pJS.tmp.count_svg = 0;
    pJS.fn.particlesEmpty();
    pJS.fn.canvasClear();
    
    /* restart */
    pJS.fn.vendors.start();

  };


  /* ---------- pJS functions - particles interaction ------------ */

  pJS.fn.interact.linkParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if(dist <= pJS.particles.line_linked.distance){

      var opacity_line = pJS.particles.line_linked.opacity - (dist / (1/pJS.particles.line_linked.opacity)) / pJS.particles.line_linked.distance;

      if(opacity_line > 0){        
        
        /* style */
        var color_line = pJS.particles.line_linked.color_rgb_line;
        pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
        pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
        //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
        
        /* path */
        pJS.canvas.ctx.beginPath();
        pJS.canvas.ctx.moveTo(p1.x, p1.y);
        pJS.canvas.ctx.lineTo(p2.x, p2.y);
        pJS.canvas.ctx.stroke();
        pJS.canvas.ctx.closePath();

      }

    }

  };


  pJS.fn.interact.attractParticles  = function(p1, p2){

    /* condensed particles */
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    if(dist <= pJS.particles.line_linked.distance){

      var ax = dx/(pJS.particles.move.attract.rotateX*1000),
          ay = dy/(pJS.particles.move.attract.rotateY*1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;

    }
    

  }


  pJS.fn.interact.bounceParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy),
        dist_p = p1.radius+p2.radius;

    if(dist <= dist_p){
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }

  }


  /* ---------- pJS functions - modes events ------------ */

  pJS.fn.modes.pushParticles = function(nb, pos){

    pJS.tmp.pushing = true;

    for(var i = 0; i < nb; i++){
      pJS.particles.array.push(
        new pJS.fn.particle(
          pJS.particles.color,
          pJS.particles.opacity.value,
          {
            'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
            'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
          }
        )
      )
      if(i == nb-1){
        if(!pJS.particles.move.enable){
          pJS.fn.particlesDraw();
        }
        pJS.tmp.pushing = false;
      }
    }

  };


  pJS.fn.modes.removeParticles = function(nb){

    pJS.particles.array.splice(0, nb);
    if(!pJS.particles.move.enable){
      pJS.fn.particlesDraw();
    }

  };


  pJS.fn.modes.bubbleParticle = function(p){

    /* on hover event */
    if(pJS.interactivity.events.onhover.enable && isInArray('bubble', pJS.interactivity.events.onhover.mode)){

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
          ratio = 1 - dist_mouse / pJS.interactivity.modes.bubble.distance;

      function init(){
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      }

      /* mousemove - check ratio */
      if(dist_mouse <= pJS.interactivity.modes.bubble.distance){

        if(ratio >= 0 && pJS.interactivity.status == 'mousemove'){
          
          /* size */
          if(pJS.interactivity.modes.bubble.size != pJS.particles.size.value){

            if(pJS.interactivity.modes.bubble.size > pJS.particles.size.value){
              var size = p.radius + (pJS.interactivity.modes.bubble.size*ratio);
              if(size >= 0){
                p.radius_bubble = size;
              }
            }else{
              var dif = p.radius - pJS.interactivity.modes.bubble.size,
                  size = p.radius - (dif*ratio);
              if(size > 0){
                p.radius_bubble = size;
              }else{
                p.radius_bubble = 0;
              }
            }

          }

          /* opacity */
          if(pJS.interactivity.modes.bubble.opacity != pJS.particles.opacity.value){

            if(pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value){
              var opacity = pJS.interactivity.modes.bubble.opacity*ratio;
              if(opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity){
                p.opacity_bubble = opacity;
              }
            }else{
              var opacity = p.opacity - (pJS.particles.opacity.value-pJS.interactivity.modes.bubble.opacity)*ratio;
              if(opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity){
                p.opacity_bubble = opacity;
              }
            }

          }

        }

      }else{
        init();
      }


      /* mouseleave */
      if(pJS.interactivity.status == 'mouseleave'){
        init();
      }
    
    }

    /* on click event */
    else if(pJS.interactivity.events.onclick.enable && isInArray('bubble', pJS.interactivity.events.onclick.mode)){


      if(pJS.tmp.bubble_clicking){
        var dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x,
            dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y,
            dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
            time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time)/1000;

        if(time_spent > pJS.interactivity.modes.bubble.duration){
          pJS.tmp.bubble_duration_end = true;
        }

        if(time_spent > pJS.interactivity.modes.bubble.duration*2){
          pJS.tmp.bubble_clicking = false;
          pJS.tmp.bubble_duration_end = false;
        }
      }


      function process(bubble_param, particles_param, p_obj_bubble, p_obj, id){

        if(bubble_param != particles_param){

          if(!pJS.tmp.bubble_duration_end){
            if(dist_mouse <= pJS.interactivity.modes.bubble.distance){
              if(p_obj_bubble != undefined) var obj = p_obj_bubble;
              else var obj = p_obj;
              if(obj != bubble_param){
                var value = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration);
                if(id == 'size') p.radius_bubble = value;
                if(id == 'opacity') p.opacity_bubble = value;
              }
            }else{
              if(id == 'size') p.radius_bubble = undefined;
              if(id == 'opacity') p.opacity_bubble = undefined;
            }
          }else{
            if(p_obj_bubble != undefined){
              var value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration),
                  dif = bubble_param - value_tmp;
                  value = bubble_param + dif;
              if(id == 'size') p.radius_bubble = value;
              if(id == 'opacity') p.opacity_bubble = value;
            }
          }

        }

      }

      if(pJS.tmp.bubble_clicking){
        /* size */
        process(pJS.interactivity.modes.bubble.size, pJS.particles.size.value, p.radius_bubble, p.radius, 'size');
        /* opacity */
        process(pJS.interactivity.modes.bubble.opacity, pJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
      }

    }

  };


  pJS.fn.modes.repulseParticle = function(p){

    if(pJS.interactivity.events.onhover.enable && isInArray('repulse', pJS.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      var normVec = {x: dx_mouse/dist_mouse, y: dy_mouse/dist_mouse},
          repulseRadius = pJS.interactivity.modes.repulse.distance,
          velocity = 100,
          repulseFactor = clamp((1/repulseRadius)*(-1*Math.pow(dist_mouse/repulseRadius,2)+1)*repulseRadius*velocity, 0, 50);
      
      var pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor
      }

      if(pJS.particles.move.out_mode == 'bounce'){
        if(pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w) p.x = pos.x;
        if(pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h) p.y = pos.y;
      }else{
        p.x = pos.x;
        p.y = pos.y;
      }
    
    }


    else if(pJS.interactivity.events.onclick.enable && isInArray('repulse', pJS.interactivity.events.onclick.mode)) {

      if(!pJS.tmp.repulse_finish){
        pJS.tmp.repulse_count++;
        if(pJS.tmp.repulse_count == pJS.particles.array.length){
          pJS.tmp.repulse_finish = true;
        }
      }

      if(pJS.tmp.repulse_clicking){

        var repulseRadius = Math.pow(pJS.interactivity.modes.repulse.distance/6, 3);

        var dx = pJS.interactivity.mouse.click_pos_x - p.x,
            dy = pJS.interactivity.mouse.click_pos_y - p.y,
            d = dx*dx + dy*dy;

        var force = -repulseRadius / d * 1;

        function process(){

          var f = Math.atan2(dy,dx);
          p.vx = force * Math.cos(f);
          p.vy = force * Math.sin(f);

          if(pJS.particles.move.out_mode == 'bounce'){
            var pos = {
              x: p.x + p.vx,
              y: p.y + p.vy
            }
            if (pos.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
            else if (pos.x - p.radius < 0) p.vx = -p.vx;
            if (pos.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
            else if (pos.y - p.radius < 0) p.vy = -p.vy;
          }

        }

        // default
        if(d <= repulseRadius){
          process();
        }

        // bang - slow motion mode
        // if(!pJS.tmp.repulse_finish){
        //   if(d <= repulseRadius){
        //     process();
        //   }
        // }else{
        //   process();
        // }
        

      }else{

        if(pJS.tmp.repulse_clicking == false){

          p.vx = p.vx_i;
          p.vy = p.vy_i;
        
        }

      }

    }

  }


  pJS.fn.modes.grabParticle = function(p){

    if(pJS.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove'){

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if(dist_mouse <= pJS.interactivity.modes.grab.distance){

        var opacity_line = pJS.interactivity.modes.grab.line_linked.opacity - (dist_mouse / (1/pJS.interactivity.modes.grab.line_linked.opacity)) / pJS.interactivity.modes.grab.distance;

        if(opacity_line > 0){

          /* style */
          var color_line = pJS.particles.line_linked.color_rgb_line;
          pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
          pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
          //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
          
          /* path */
          pJS.canvas.ctx.beginPath();
          pJS.canvas.ctx.moveTo(p.x, p.y);
          pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
          pJS.canvas.ctx.stroke();
          pJS.canvas.ctx.closePath();

        }

      }

    }

  };



  /* ---------- pJS functions - vendors ------------ */

  pJS.fn.vendors.eventsListeners = function(){

    /* events target element */
    if(pJS.interactivity.detect_on == 'window'){
      pJS.interactivity.el = window;
    }else{
      pJS.interactivity.el = pJS.canvas.el;
    }


    /* detect mouse pos - on hover / click event */
    if(pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable){

      /* el on mousemove */
      pJS.interactivity.el.addEventListener('mousemove', function(e){

        if(pJS.interactivity.el == window){
          var pos_x = e.clientX,
              pos_y = e.clientY;
        }
        else{
          var pos_x = e.offsetX || e.clientX,
              pos_y = e.offsetY || e.clientY;
        }

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if(pJS.tmp.retina){
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';

      });

      /* el on onmouseleave */
      pJS.interactivity.el.addEventListener('mouseleave', function(e){

        pJS.interactivity.mouse.pos_x = null;
        pJS.interactivity.mouse.pos_y = null;
        pJS.interactivity.status = 'mouseleave';

      });

    }

    /* on click event */
    if(pJS.interactivity.events.onclick.enable){

      pJS.interactivity.el.addEventListener('click', function(){

        pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
        pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
        pJS.interactivity.mouse.click_time = new Date().getTime();

        if(pJS.interactivity.events.onclick.enable){

          switch(pJS.interactivity.events.onclick.mode){

            case 'push':
              if(pJS.particles.move.enable){
                pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
              }else{
                if(pJS.interactivity.modes.push.particles_nb == 1){
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                }
                else if(pJS.interactivity.modes.push.particles_nb > 1){
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb);
                }
              }
            break;

            case 'remove':
              pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb);
            break;

            case 'bubble':
              pJS.tmp.bubble_clicking = true;
            break;

            case 'repulse':
              pJS.tmp.repulse_clicking = true;
              pJS.tmp.repulse_count = 0;
              pJS.tmp.repulse_finish = false;
              setTimeout(function(){
                pJS.tmp.repulse_clicking = false;
              }, pJS.interactivity.modes.repulse.duration*1000)
            break;

          }

        }

      });
        
    }


  };

  pJS.fn.vendors.densityAutoParticles = function(){

    if(pJS.particles.number.density.enable){

      /* calc area */
      var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;
      if(pJS.tmp.retina){
        area = area/(pJS.canvas.pxratio*2);
      }

      /* calc number of particles based on density area */
      var nb_particles = area * pJS.particles.number.value / pJS.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = pJS.particles.array.length - nb_particles;
      if(missing_particles < 0) pJS.fn.modes.pushParticles(Math.abs(missing_particles));
      else pJS.fn.modes.removeParticles(missing_particles);

    }

  };


  pJS.fn.vendors.checkOverlap = function(p1, position){
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p2 = pJS.particles.array[i];

      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx*dx + dy*dy);

      if(dist <= p1.radius + p2.radius){
        p1.x = position ? position.x : Math.random() * pJS.canvas.w;
        p1.y = position ? position.y : Math.random() * pJS.canvas.h;
        pJS.fn.vendors.checkOverlap(p1);
      }
    }
  };


  pJS.fn.vendors.createSvgImg = function(p){

    /* set color to svg element */
    var svgXml = pJS.tmp.source_svg,
        rgbHex = /#([0-9A-F]{3,6})/gi,
        coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
          if(p.color.rgb){
            var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+p.opacity+')';
          }else{
            var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+p.opacity+')';
          }
          return color_value;
        });

    /* prepare to create img with colored svg */
    var svg = new Blob([coloredSvgXml], {type: 'image/svg+xml;charset=utf-8'}),
        DOMURL = window.URL || window.webkitURL || window,
        url = DOMURL.createObjectURL(svg);

    /* create particle img obj */
    var img = new Image();
    img.addEventListener('load', function(){
      p.img.obj = img;
      p.img.loaded = true;
      DOMURL.revokeObjectURL(url);
      pJS.tmp.count_svg++;
    });
    img.src = url;

  };


  pJS.fn.vendors.destroypJS = function(){
    cancelAnimationFrame(pJS.fn.drawAnimFrame);
    canvas_el.remove();
    pJSDom = null;
  };


  pJS.fn.vendors.drawShape = function(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator){

    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0,0);
    for (var i = 0; i < sideCount; i++) {
      c.lineTo(sideLength,0);
      c.translate(sideLength,0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();

  };

  pJS.fn.vendors.exportImg = function(){
    window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
  };


  pJS.fn.vendors.loadImg = function(type){

    pJS.tmp.img_error = undefined;

    if(pJS.particles.shape.image.src != ''){

      if(type == 'svg'){

        var xhr = new XMLHttpRequest();
        xhr.open('GET', pJS.particles.shape.image.src);
        xhr.onreadystatechange = function (data) {
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              pJS.tmp.source_svg = data.currentTarget.response;
              pJS.fn.vendors.checkBeforeDraw();
            }else{
              console.log('Error pJS - Image not found');
              pJS.tmp.img_error = true;
            }
          }
        }
        xhr.send();

      }else{

        var img = new Image();
        img.addEventListener('load', function(){
          pJS.tmp.img_obj = img;
          pJS.fn.vendors.checkBeforeDraw();
        });
        img.src = pJS.particles.shape.image.src;

      }

    }else{
      console.log('Error pJS - No image.src');
      pJS.tmp.img_error = true;
    }

  };


  pJS.fn.vendors.draw = function(){

    if(pJS.particles.shape.type == 'image'){

      if(pJS.tmp.img_type == 'svg'){

        if(pJS.tmp.count_svg >= pJS.particles.number.value){
          pJS.fn.particlesDraw();
          if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }else{
          //console.log('still loading...');
          if(!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }

      }else{

        if(pJS.tmp.img_obj != undefined){
          pJS.fn.particlesDraw();
          if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }else{
          if(!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }

      }

    }else{
      pJS.fn.particlesDraw();
      if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
      else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
    }

  };


  pJS.fn.vendors.checkBeforeDraw = function(){

    // if shape is image
    if(pJS.particles.shape.type == 'image'){

      if(pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg == undefined){
        pJS.tmp.checkAnimFrame = requestAnimFrame(check);
      }else{
        //console.log('images loaded! cancel check');
        cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);
        if(!pJS.tmp.img_error){
          pJS.fn.vendors.init();
          pJS.fn.vendors.draw();
        }
        
      }

    }else{
      pJS.fn.vendors.init();
      pJS.fn.vendors.draw();
    }

  };


  pJS.fn.vendors.init = function(){

    /* init canvas + particles */
    pJS.fn.retinaInit();
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.vendors.densityAutoParticles();

    /* particles.line_linked - convert hex colors to rgb */
    pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);

  };


  pJS.fn.vendors.start = function(){

    if(isInArray('image', pJS.particles.shape.type)){
      pJS.tmp.img_type = pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length - 3);
      pJS.fn.vendors.loadImg(pJS.tmp.img_type);
    }else{
      pJS.fn.vendors.checkBeforeDraw();
    }

  };




  /* ---------- pJS - start ------------ */


  pJS.fn.vendors.eventsListeners();

  pJS.fn.vendors.start();
  


};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex){
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


/* ---------- particles.js functions - start ------------ */

window.pJSDom = [];

window.particlesJS = function(tag_id, params){

  //console.log(params);

  /* no string id? so it's object params, and set the id with default id */
  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if(!tag_id){
    tag_id = 'particles-js';
  }

  /* pJS elements */
  var pJS_tag = document.getElementById(tag_id),
      pJS_canvas_class = 'particles-js-canvas-el',
      exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

  /* remove canvas if exists into the pJS target tag */
  if(exist_canvas.length){
    while(exist_canvas.length > 0){
      pJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');
  canvas_el.className = pJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if(canvas != null){
    pJSDom.push(new pJS(tag_id, params));
  }

};

window.particlesJS.load = function(tag_id, path_config_json, callback){

  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function (data) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if(callback) callback();
      }else{
        console.log('Error pJS - XMLHttpRequest status: '+xhr.status);
        console.log('Error pJS - File config not found');
      }
    }
  };
  xhr.send();

};
;
//# sourceMappingURL=scripts.js.map