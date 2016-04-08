// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var application = angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform, $cordovaTouchID) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    $cordovaTouchID.checkSupport().then(function() {
      //2
      $cordovaTouchID.authenticate("Please authenticate with your fingerprint!").then(function() {
         // 3
         alert("You are a trusty mate! Come in and find out...")
      }, function (error) { // 4
         // Hopefully, there will be a better callback code in future releases
         if (error == "Fallback authentication mechanism selected.") {
               // User selected to enter a password 
         } else {
               alert("Sorry, we are not able to grant access.");
         }
      });
   }, function (error) { // 5
      alert(error); // TouchID not supported
   });
    
  });
});

application.controller("ExampleController", function($scope, $cordovaBarcodeScanner) {
 
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
 
});


application.state('login', {
   url: '/login',
   templateUrl: 'templates/login.html'
});