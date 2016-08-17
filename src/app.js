/**
 * Created by Shweta on 8/16/16.
 */
(function(){
	"use strict";

	//creating the main app module (parent module)
	angular.module('dcbiApp', ['dcbiApp.data']);

	//main app controller (this is the parent of all controllers)
	angular.module('dcbiApp').controller('dcbiAppController', dcbiAppController);

	dcbiAppController.$inject = ['queryService'];
	function dcbiAppController(queryService)
	{
		var dcbiCtrl = this;

		dcbiCtrl.greeting = "Hello Dcbi!";

		queryService.makeRequest();
	}

})();//will be using the IIFE pattern through out project