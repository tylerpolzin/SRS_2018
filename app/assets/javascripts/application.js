//= require rails-ujs
//= require turbolinks
//X require pdfmake/build/pdfmake.js 
//X require pdfmake/build/vfs_fonts.js
//= require moment.min.js
//= require dateTimeFormat.js
//= require collapsibleLists.js
//= require jquery3
//= require jquery_ujs
//= require jquery-ui
//= require jquery.purr
//X require jquery-fileupload
//X require jquery.contextMenu.js
//= require bootstrap-sprockets
//= require jquery-bootstrap-purr.min.js
//= require bootstrap-datepicker/core
//= require bootstrap-add-clear.js
//= require best_in_place
//= require best_in_place.jquery-ui
//= require best_in_place.purr
//= require select2-full
//= require bootbox
//= require jquery.dataTables.min.js
//= require dataTables.buttons.min.js
//= require buttons.colVis.min.js
//= require buttons.html5.min.js
//= require buttons.print.min.js
//= require buttons.bootstrap4.min.js
//= require dataTables.colReorder.min.js
//X require jquery.dataTables.yadcf.js
//= require inputmask
//= require jquery.inputmask
//X require inputmask.extensions
//X require inputmask.date.extensions
//= require inputmask.phone.extensions
//X require inputmask.numeric.extensions
//X require inputmask.regex.extensions
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
  $(".defaultDiv").animate({left: 200, opacity: 100}, 500); // Slides all main DIV content in from the left
  $(".phone_mask").inputmask({"mask": "(999) 999-9999"});
  $(".zip_mask").inputmask({ mask: "99999[-9999]", greedy: false });

  $("select").on("select2:select", function(){
    $(this).closest("tr").next().find("input select").focus();
  });

  // Child Fields Template Loader
  $(document).on('click', 'a.add_child', function() {
    var association, new_id, regexp, template;
    association = $(this).attr('data-association');
    template = $('#' + association + '_fields_template').html();
    regexp = new RegExp('new_' + association, 'g');
    new_id = (new Date).getTime();
    $(this).parent().before(template.replace(regexp, new_id));
    return false;
  });
  $(document).on("click", 'a.remove_child', function() {
    var hidden_field = $(this).prev('input[type=hidden]')[0];
    if(hidden_field) {
      hidden_field.value = '1';
    }
    $(this).parents('.fields').remove();
    return false;
  });

  $(document).on('click', 'a.add_comment', function() { // Generic for Comment Fields
    var association, new_id, regexp, template;
    association = $(this).attr('data-association');
    template = $('#' + association + '_fields_template').html();
    regexp = new RegExp('new_' + association, 'g');
    new_id = (new Date).getTime();
    $(this).parent().before(template.replace(regexp, new_id));
    return false;
  });
  $(document).on("click", 'a.remove_comment', function() {
    var hidden_field = $(this).prev('input[type=hidden]')[0];
    if(hidden_field) {
      hidden_field.value = '1';
    }
    $(this).parents('.comment_field').remove();
    return false;
  });

});

// forceNumeric() plug-in implementation
$.fn.forceNumeric = function () {

  return this.each(function () {
    $(this).keydown(function (e) {
      var key = e.which || e.keyCode;

      if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
        key >= 48 && key <= 57 || // numbers
        key >= 96 && key <= 105 || // Numeric keypad
        key == 190 || key == 188 || key == 189 || key == 109 || key == 110 || // comma, period and minus, . on keypad
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

