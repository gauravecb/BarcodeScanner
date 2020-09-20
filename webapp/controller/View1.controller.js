sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.kumar.scan.BarcodeScanner.controller.View1", {
	onInit: function() {
		   var selectedDeviceId;
		   this.codeReader  = new ZXing.BrowserMultiFormatReader();
	    //  console.log('ZXing code reader initialized')
	      this.codeReader.getVideoInputDevices()
	        .then((videoInputDevices) => {
	          const sourceSelect = this.getView().byId("Select")
	          selectedDeviceId = videoInputDevices[0].deviceId
	          if (videoInputDevices.length >= 1) {
	            videoInputDevices.forEach((element) => {
	              const sourceOption = new sap.ui.core.Item({
	            	  key :  element.deviceId,
	            	  text :  element.label
	              })
	              sourceSelect.addItem(sourceOption)
	              
	            })
	            
	            
	          }
	        /*   document.getElementById('startButton').addEventListener('click', () => {
	            codeReader.decodeFromInputVideoDeviceContinuously(selectedDeviceId, 'video', (result, err) => {
	              if (result) {
	                console.log(result)
	                document.getElementById('result').textContent = result.text
	              }
	              if (err && !(err instanceof ZXing.NotFoundException)) {
	                console.error(err)
	                document.getElementById('result').textContent = err
	              }
	            })
	            console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
	          }) */
	         /*  document.getElementById('resetButton').addEventListener('click', () => {
	            codeReader.reset()
	            document.getElementById('result').textContent = '';
	            console.log('Reset.')
	          }) */
	        })
	        .catch((err) => {
	          console.error(err)
	        })
	},
	
	
	onPressStart: function()	 {
		var selectedDeviceId = this.getView().byId("Select").getSelectedKey();
		var oResult = this.getView().byId("result")
		var sID = this.createId("video")
		  //const codeReader = new ZXing.BrowserMultiFormatReader()
         this.codeReader.decodeFromInputVideoDeviceContinuously(selectedDeviceId, sID , (result, err) => {
           if (result) {
             console.log(result)
             oResult.setText("Result: " + result.text) 
           }
           if (err && !(err instanceof ZXing.NotFoundException)) {
             console.error(err)
             oResult.setText(err) ; 
           }
         })
         console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
       },
       onPressReset: function()  {
    	   var oResult = this.getView().byId("result")
    	   //const codeReader = new ZXing.BrowserMultiFormatReader()
    	   this.codeReader.reset()
           oResult.setText("Result: ") ; 
           console.log('Reset.')
         }

	});
});