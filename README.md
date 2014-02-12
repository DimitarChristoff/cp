cp
==

A tiny currency pair demo via [epik](http://dimitarchristoff.github.io/epik), a micro MVC framework for the web.

## Installing

Clone the repo, cd into it, then:

```sh
$ npm install
$ bower install
$ grunt
```

This will add all dependencies and start the express server on [http://localhost:8000/](http://localhost:8000/). It will
also compile the `pairs.less` file for you and try to open a web browser.

## Rationale

The aim is to demonstrate how code can be shared between epik components on the client and on the server, as well as
being able to create a fast, responsive app with multiple DOM updates per second and bi-directional data bindings.

You can tweak the server tick rates, by default a currency ticks at random every 100 to 1000ms. The app should remain
with minimal CPU usage even with 50 or 100 currency pairs.

## Implementation

There are only two view controllers - one for all the pairs (adding and instantiating) and one view per pair. However,
you can easily have a single VC for all currencies of the same type and implement it via markup, letting `rivets.js`
bindings take care of things.

Notable dependencies are:

 - requirejs - module loading
 - [epik](http://dimitarchristoff.github.io/epik) - MVC framework
 - [primish](http://dimitarchristoff.github.io/primish) - Class inheritance
 - [rivets.js](http://www.rivetsjs.com/) - DOM bindings
 - [big.js](https://github.com/MikeMcl/big.js/) - Working with floats

Internally, `lodash` and `jquery` are also available through epik.