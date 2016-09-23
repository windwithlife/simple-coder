/**
 * Created by zhangyq on 2015/7/23.
 */


(function(factory) {

    // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
    // We use `self` instead of `window` for `WebWorker` support.
    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global);

    // Set up Backbone appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'jquery', 'exports','backbone'], function(_, $, exports,backbone) {
            // Export global even in AMD case in case this script is loaded with
            // others that may still expect a global Backbone.
            root.Simple = factory(root, exports, _, $,backbone);
            return Simple;
        });

        // Next for Node.js or CommonJS. jQuery may not be needed as a module.
    } else if (typeof exports !== 'undefined') {
        var _ = require('underscore'), $;
        try { $ = require('jquery'); } catch(e) {};
        var backbone = require("backbone");
        factory(root, exports, _, $,backbone);

        // Finally, as a browser global.
    } else {
        root.Simple = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$),root.Backbone);
    }

}(function(root, Simple, _, $,Backbone) {

    var PageView = Simple.PageView = Backbone.View.extend({});
    //var Events   = Simple.Events = Backbone.Events.extend({});
    var Model    = Simple.Model = Backbone.Model.extend({});
    var Router   = Simple.Router = Backbone.Router.extend({});

    var UIComponets  = Simple.UIComponets = {};

   //PageView declaration section
    PageView.prototype.loadScreenData = function(){
        console.log('PageView:loadScreenData');

    };
    PageView.prototype.back = function(){
        console.log('back');

    };
    PageView.prototype.onLoad = function(){
        console.log('PageView:onLoad');
    };
    PageView.prototype.onShow = function(){
        console.log('PageView:show');
    };
    PageView.prototype.render = function(){
        console.log('PageView:render');
    };
    PageView.prototype.renderSEO = function(){
        console.log('PageView:SEO');
    };




    // Helper function to correctly set up the prototype chain for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent` constructor function.
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };

    // Set up inheritance for the model, collection, router, view and history.
    //Model.extend  = Router.extend = PageView.extend = extend;
    Simple.extend = extend;
    return Simple;
}));
