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
//X require bootstrap-datetimepicker.min.js
//X require twitter/bootstrap/rails/confirm
//= require bootstrap-add-clear.js
//= require best_in_place
//= require best_in_place.jquery-ui
//= require best_in_place.purr
//= require select2-full
//= require bootbox
//= require dataTables.min.js
//X require dataTables/jquery.dataTables
//X require dataTables/bootstrap/3/jquery.dataTables.bootstrap
//= require dataTables.buttons.min.js
//= require buttons.colVis.min.js
//= require buttons.html5.min.js
//= require buttons.print.min.js
//= require buttons.bootstrap4.min.js
//X require dataTables.autoFill.min.js
//= require dataTables.colReorder.min.js
//= require dataTables.fixedColumns.min.js
//= require dataTables.fixedHeader.min.js
//X require jquery.dataTables.yadcf.js
//X require autoFill.jqueryui.min.js
//X require autoFill.bootstrap4.min.js
//X require dataTables.keyTable.min.js
//X require dataTables.responsive.min.js
//X require responsive.bootstrap4.min.js
//= require jszip.min.js
//X require pdfmake.min.js.map
//= require underscore
//X require gmaps/google
//= require_tree .
/*global $*/
/*global bootbox */

// Activating Best In Place
$(document).on("turbolinks:load", function() {
  $(".best_in_place").best_in_place(); // Enables the Best In Place gem for in-line editing
  $("input[type='number']").forceNumeric(); // Use to accept only numbers in number_fields
  $(".defaultDiv").animate({left: 0, opacity: 100}, 500); // Slides all main DIV content in from the left
});

// forceNumeric() plug-in implementation
$.fn.forceNumeric = function () {

  return this.each(function () {
    $(this).keydown(function (e) {
      var key = e.which || e.keyCode;

      if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
        key >= 48 && key <= 57 || // numbers
        key >= 96 && key <= 105 || // Numeric keypad
        key == 190 || key == 188 || key == 109 || key == 110 || // comma, period and minus, . on keypad
        key == 8 || key == 9 || key == 13 || // Backspace and Tab and Enter
        key == 35 || key == 36 || // Home and End
        key == 37 || key == 39 || // left and right arrows
        key == 46 || key == 45) // Del and Ins
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


// This fixes Select2 boxes so they automatically open when tabbed to
$(document).on('focus', 'span.select2', function () {
  $(this).prev('select:not([multiple])').select2('open');
});