[![Bower version](https://badge.fury.io/bo/angular-responsive-height.svg)](http://badge.fury.io/bo/angular-responsive-height) [![Build Status](https://travis-ci.org/sullinger/angular-responsive-height.svg?branch=master)](https://travis-ci.org/sullinger/angular-responsive-height) [![Coverage Status](https://coveralls.io/repos/sullinger/angular-responsive-height/badge.svg?branch=master)](https://coveralls.io/r/sullinger/angular-responsive-height?branch=master)  
[![Hire SliceMeNice](https://img.shields.io/badge/Need%20Support%3F-Hire%20SliceMeNice-red.svg)](http://www.slicemenice.de)
# angular-responsive-height

An angular directive that calculates the height of an element respecting a given aspect ratio or preferred height in relation to the viewport's height.

## How to install

```
bower install angular-responsive-height --save
```


## How to use

Reference the module in your app.

```javascript
(function() {

  angular
    .module( 'someApp', [
      'angular.responsiveHeight'
    ] );

})();
```

Use the directive in your templates.

In the following example, the element will have a minimum height of 200px, but will not get larger than 80% of the viewport's height.

```
<responsive-height data-aspect-ratio="1.6" data-min-height="200px" data-max-height="80%"></responsive-height>
```


## Release History

__1.1.0__

  * Added more unit tests.

__1.0.0__

  * First stable release of angular-responsive-height.
