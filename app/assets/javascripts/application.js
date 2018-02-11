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
//= require rails-ujs
//= require turbolinks
//X require pdfmake/build/pdfmake.js 
//X require pdfmake/build/vfs_fonts.js
//= require moment.min.js
//= require jquery3
//= require jquery_ujs
//= require jquery-ui
//= require jquery.purr
//X require jquery-fileupload
//X require jquery.contextMenu.js
//= require bootstrap-sprockets
//= require jquery-bootstrap-purr.min.js
//= require bootstrap-datepicker/core
//= require bootstrap-datetimepicker.min.js
//X require twitter/bootstrap/rails/confirm
//= require bootstrap-add-clear.js
//= require best_in_place
//= require best_in_place.jquery-ui
//= require best_in_place.purr
//= require select2-full
//= require bootbox
//= require dataTables.min.js
//= require dataTables/jquery.dataTables
//= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
//= require dataTables.buttons.min.js
//= require buttons.colVis.min.js
//= require buttons.html5.min.js
//= require buttons.print.min.js
//= require buttons.bootstrap4.min.js
//= require dataTables.autoFill.min.js
//= require dataTables.colReorder.min.js
//= require dataTables.fixedColumns.min.js
//= require dataTables.fixedHeader.min.js
//X require jquery.dataTables.yadcf.js
//= require autoFill.jqueryui.min.js
//= require autoFill.bootstrap4.min.js
//= require dataTables.keyTable.min.js
//= require dataTables.responsive.min.js
//= require responsive.bootstrap4.min.js
//= require jszip.min.js
//X require pdfmake.min.js.map
//= require underscore
//X require gmaps/google
//= require_tree .
/*global $*/
/*global bootbox */

// Activating Best In Place
$(document).on("turbolinks:load", function() {
  $(".best_in_place").best_in_place();
});

// Accept only numbers in number field inputs
$(document).on("turbolinks:load", function() {
  $("input[type='number']").forceNumeric();
});

// forceNumeric() plug-in implementation
$.fn.forceNumeric = function () {

  return this.each(function () {
    $(this).keydown(function (e) {
      var key = e.which || e.keyCode;

      if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
        // numbers
        key >= 48 && key <= 57 ||
        // Numeric keypad
        key >= 96 && key <= 105 ||
        // comma, period and minus, . on keypad
        key == 190 || key == 188 || key == 109 || key == 110 ||
        // Backspace and Tab and Enter
        key == 8 || key == 9 || key == 13 ||
        // Home and End
        key == 35 || key == 36 ||
        // left and right arrows
        key == 37 || key == 39 ||
        // Del and Ins
        key == 46 || key == 45)
          return true;

          return false;
       });
   });
};

function basicConfirm (element) { // Basic dialog box to confirm any delete call
  bootbox.confirm("Are you sure you want to delete this "+element+"?", function(result){
    if (result === true) {
      $("."+element+"Delete").click();
    }
  });
  // Example code:
  // $(".deleteProduct").on("click", function(e) {
  //   e.preventDefault();
  //   basicConfirm("product");
  // });
}
