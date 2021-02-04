/*!
 * jQuery JavaScript Library v1.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://docs.jquery.com/License
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Jan 13 15:23:05 2010 -0500
 */
(function (window, undefined) {

  // Define a local copy of jQuery
  var jQuery = function (selector, context) {
    // The jQuery object is actually just the init constructor 'enhanced'
    return new jQuery.fn.init(selector, context);
  },

    // Map over jQuery in case of overwrite
    _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
    _$ = window.$,

    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,

    // A central reference to the root jQuery(document)
    rootjQuery,

    // A simple way to check for HTML strings or ID strings
    // (both of which we optimize for)
    quickExpr = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,

    // Is it a simple selector
    isSimple = /^.[^:#\[\.,]*$/,

    // Check if a string has a non-whitespace character in it
    rnotwhite = /\S/,

    // Used for trimming whitespace
    rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,

    // Match a standalone tag
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

    // Keep a UserAgent string for use with jQuery.browser
    userAgent = navigator.userAgent,

    // For matching the engine and version of the browser
    browserMatch,

    // Has the ready events already been bound?
    readyBound = false,

    // The functions to execute on DOM ready
    readyList = [],

    // The ready event handler
    DOMContentLoaded,

    // Save a reference to some core methods
    toString = Object.prototype.toString,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    push = Array.prototype.push,
    slice = Array.prototype.slice,
    indexOf = Array.prototype.indexOf;


  // Expose jQuery to the global object
  window.jQuery = window.$ = jQuery;

})(window);