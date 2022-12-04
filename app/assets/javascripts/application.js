// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap
//= require rails-ujs
//= require turbolinks
//= require quagga
//= require_tree .

function order_by_occurrence(arr) {
  var counts = {};
  arr.forEach(function(value) {
    if(!counts[value]) {
      counts[value] = 0;
    }
    counts[value]++;
  });

  return Object.keys(counts).sort(function(curKey,nextKey) {
    return counts[curKey] < counts[nextKey];
  });
}

function load_quagga(){
  console.log(navigator.mediaDevices);
  if ($('#barcode-scanner').length > 0 && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {

    var last_result = [];
    console.log(Quagga.initialized);
    if (Quagga.initialized == undefined) {
      Quagga.onDetected(function(result) {
        console.log('inside of onDetected.........');
        var last_code = result.codeResult.code;
        console.log("result.codeResult.code: " + last_code);
        last_result.push(last_code);
        console.log(last_result.length);
        if (last_result.length > 20) {
          console.log("last result: " + last_result);
          code = order_by_occurrence(last_result)[0];
          console.log("code: " + code);
          last_result = [];
          Quagga.stop();
          $.ajax({
            type: "POST",
            url: '/products/get_barcode',
            data: { upc: code }
          });
        }
      });
    }

    Quagga.init({
     inputStream : {
       name : "Live",
       type : "LiveStream",
       numOfWorkers: navigator.hardwareConcurrency,
       target: document.querySelector('#barcode-scanner')
     },
     decoder: {
         readers : ['ean_reader','ean_8_reader']
     }
   },function(err) {
       if (err) { console.log(err); return }
       Quagga.initialized = true;
       Quagga.start();
   });

  }
}

$(document).on('turbolinks:load', load_quagga);
