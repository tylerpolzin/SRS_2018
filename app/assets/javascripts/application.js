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
//= require jquery3
//= require jquery_ujs
//= require jquery-ui
//= require jquery-fileupload
//= require jquery.contextMenu.js
//= require bootstrap-sprockets
//= require jquery-bootstrap-purr.min.js
//= require twitter/bootstrap/rails/confirm
//= require bootstrap-add-clear.js
//= require best_in_place
//= require best_in_place.jquery-ui
//= require best_in_place.purr
//= require select2-full
//= require dataTables.min.js
//= require dataTables/jquery.dataTables
//= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
//X require autoFill.bootstrap4.min.js
//X require autoFill.jqueryui.min.js
//X require buttons.bootstrap4.min.js
//X require dataTables.colReorder.min.js
//= require dataTables.buttons.min.js
//= require buttons.colVis.min.js
//= require buttons.html5.min.js
//= require buttons.print.min.js
//= require dataTables.autoFill.min.js
//= require dataTables.fixedColumns.min.js
//= require dataTables.fixedHeader.min.js
//= require dataTables.keyTable.min.js
//= require dataTables.responsive.min.js
//= require responsive.bootstrap4.min.js
//= require jszip.min.js
//X require pdfmake.min.js.map
//= require underscore
//= require gmaps/google
//= require_tree .
/*global $*/


// Activating Best In Place
$(document).on("turbolinks:load", function() {
  $(".best_in_place").best_in_place();
});

// Activating basic datatable
$(document).on("turbolinks:load", function() {
  $('#datatable-basic').DataTable( {
    "scrollX": true,
    "aLengthMenu": [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
    "pageLength": 100
  });
});

// Accept only numbers in number field inputs
$('input[type="number"]').regexMask(/^\d+$/);