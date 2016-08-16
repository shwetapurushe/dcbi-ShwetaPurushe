/**
 * Created by Shweta on 8/16/16.
 */
(function(){
	"use strict";

	//creating the main app module (parent module)
	angular.module('dcbiApp', []);

	//main app controller (this is the parent of all controllers)
	angular.module('dcbiApp').controller('dcbiAppController', dcbiAppController);

	function dcbiAppController()
	{
		var dcbiCtrl = this;

		dcbiCtrl.greeting = "Hello Dcbi!"
	}

})();