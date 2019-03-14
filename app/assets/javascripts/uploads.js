/* global $ */
/* global bootbox */
/* global basic_tooltip */

//-----------------------------------------------------------------------------------
//          START "NEW UPLOADS" JS                                                  |
//-----------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $(".newUploadProductAssociation").hide();
  $(".newUploadPartAssociation").hide();
  $(".newUploadTaskAssociation").hide();
  $("#addFileButton").on("click", function() { // Secondary button that clicks the hidden "Add Item" button.  Required due to Helper parameters.
    $(".add_child_upload").click();
    $(this).removeClass("tempMargin");
  });

  $(document).on('click', 'a.add_child_upload', function() {
    var association, new_id, regexp, template, fields;
    association = $(this).attr('data-association');
    template = $('#' + association + '_fields_template').html();
    regexp = new RegExp('new_' + association, 'g');
    new_id = (new Date).getTime();
    fields = $(this).closest(".defaultNoTabsForm");
    $(this).parent().before(template.replace(regexp, new_id));
    fields.find(".newUploadProductSearch").select2({
      theme:"bootstrap",
      placeholder: "Select Associated Products...",
      containerCssClass: "combo-items-table-product-search",
      selectOnClose: false,
      dropdownAutoWidth : true
    });
    fields.find(".newUploadPartSearch").select2({
      theme:"bootstrap",
      placeholder: "Select Associated Parts...",
      containerCssClass: "combo-items-table-product-search",
      selectOnClose: false,
      dropdownAutoWidth : true
    });
    fields.find(".newUploadTaskSearch").select2({
      theme:"bootstrap",
      placeholder: "Select Associated Tasks...",
      containerCssClass: "combo-items-table-product-search",
      selectOnClose: false,
      dropdownAutoWidth : true
    });
    basic_tooltip(".new_upload_add_product_association_button .fa-question-circle", "Add Product Association", add_product_association_tooltip);
    basic_tooltip(".new_upload_add_part_association_button .fa-question-circle", "Add Part Association", add_part_association_tooltip);
    basic_tooltip(".new_upload_add_task_association_button .fa-question-circle", "Add Task Association", add_task_association_tooltip);
    basic_tooltip(".product_association_tooltip", "Product Associations", product_association_tooltip, "right");
    basic_tooltip(".part_association_tooltip", "Part Associations", part_association_tooltip, "right");
    basic_tooltip(".task_association_tooltip", "Task Associations", task_association_tooltip, "right");
    return false;
  });

  $(document).on("click", ".new_upload_remove_file_button", function() {
    $(this).closest(".new_upload_fields").find(".remove_child_upload").click();
  });
  $(document).on("click", 'a.remove_child_upload', function() {
    var hidden_field = $(this).prev('input[type=hidden]')[0];
    if(hidden_field) {
      hidden_field.value = '1';
    }
    $(this).parents('.fields').remove();
    return false;
  });

  $(document).on("click", ".new_upload_add_comment_button", function() {
    $(this).closest(".new_upload_fields").find(".add_child_upload_comment").click();
  });

  $(document).on("click", "a.add_child_upload_comment", function() {
    var new_id, regexp, template;
    template = $(this).closest(".new_upload_fields").find(".comments_fields_template").html();
    regexp = new RegExp("new_comments", "g");
    new_id = (new Date).getTime();
    $(this).parent().before(template.replace(regexp, new_id));
    return false;
  });

  $(document).on("click", ".upload_comment_remove_button", function() {
    var fields = $(this).closest(".new_upload_comment_fields");
    bootbox.confirm("Are you sure you want to remove this comment?", function(result){
      if (result === true) {
        fields.next("input[type=hidden]").remove();
        fields.remove();
      }
    });
  });

  $(document).on("click", ".new_upload_add_product_association_button", function() {
    $(this).addClass("disabled");
    $(this).closest(".new_upload_fields").find(".newUploadProductAssociation").show();
  });
  $(document).on("click", ".new_upload_add_part_association_button", function() {
    $(this).addClass("disabled");
    $(this).closest(".new_upload_fields").find(".newUploadPartAssociation").show();
  });
  $(document).on("click", ".new_upload_add_task_association_button", function() {
    $(this).addClass("disabled");
    $(this).closest(".new_upload_fields").find(".newUploadTaskAssociation").show();
  });

  $(document).on("click", ".product_association_remove_button", function() {
    var fields = $(this).closest(".newUploadProductAssociation");
    var fields2 = $(this).closest(".new_upload_fields");
    bootbox.confirm("Are you sure you want to clear these product associations?", function(result){
      if (result === true) {
        fields.find(".newUploadProductSearch").val([]).trigger("change");
        fields.hide();
        fields2.find(".new_upload_add_product_association_button").removeClass("disabled");
      }
    });
  });
  $(document).on("click", ".part_association_remove_button", function() {
    var fields = $(this).closest(".newUploadPartAssociation");
    var fields2 = $(this).closest(".new_upload_fields");
    bootbox.confirm("Are you sure you want to clear these part associations?", function(result){
      if (result === true) {
        fields.find(".newUploadPartSearch").val([]).trigger("change");
        fields.hide();
        fields2.find(".new_upload_add_part_association_button").removeClass("disabled");
      }
    });
  });
  $(document).on("click", ".task_association_remove_button", function() {
    var fields = $(this).closest(".newUploadTaskAssociation");
    var fields2 = $(this).closest(".new_upload_fields");
    bootbox.confirm("Are you sure you want to clear these task associations?", function(result){
      if (result === true) {
        fields.find(".newUploadTaskSearch").val([]).trigger("change");
        fields.hide();
        fields2.find(".new_upload_add_task_association_button").removeClass("disabled");
      }
    });
  });

  $("#addUploadBatchCommentButton").on("click", function() {
    $(".add_comment").click();
  });

});

$(document).on("click", "#uploadBatchFirstSubmit", function(e) {
  e.preventDefault();
  $(".comments_fields_template").html("");
  $(".uploads_fields_template").html("");
  $("#uploadFilesButton").click();
});

var add_product_association_tooltip = "<ul>"+
                                      "  <li>Click here to add a Product Association.</li>"+
                                      "  <li>An association will tie this file together and be attributed with a selected product.</li>"+
                                      "  <li>You may select multiple products for the file to be associated with.</li>"+
                                      "</ul>";

var add_part_association_tooltip = "<ul>"+
                                   "  <li>Click here to add a Part Association.</li>"+
                                   "  <li>An association will tie this file together and be attributed with a selected part.</li>"+
                                   "  <li>You may select multiple parts for the file to be associated with.</li>"+
                                   "</ul>";

var add_task_association_tooltip = "<ul>"+
                                   "  <li>Click here to add a Task Association.</li>"+
                                   "  <li>An association will tie this file together and be attributed with a selected task.</li>"+
                                   "  <li>You may select multiple tasks for the file to be associated with.</li>"+
                                   "</ul>";

var product_association_tooltip = "<ul>"+
                                  "  <li>You may select multiple products for the file to be associated with.</li>"+
                                  "  <li>Click in an empty part of the box to add additional product associations.</li>"+
                                  "</ul>";

var part_association_tooltip = "<ul>"+
                               "  <li>You may select multiple parts for the file to be associated with.</li>"+
                               "  <li>Click in an empty part of the box to add additional part associations.</li>"+
                               "</ul>";

var task_association_tooltip = "<ul>"+
                               "  <li>You may select multiple tasks for the file to be associated with.</li>"+
                               "  <li>Click in an empty part of the box to add additional task associations.</li>"+
                               "</ul>";



//-----------------------------------------------------------------------------------
//          START "UPLOADS INDEX" JS                                                |
//-----------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#productUploadsIndex").on("click", function() {
    setTimeout(function(){ // Hacky way to fix the "Individual" tables header columns.  Used in conjunction with the hidden "#ihHackFixButton" below
    $("#productUploadsHackFixButton").click();
    },200);
  });
  $("#partUploadsIndex").on("click", function() {
    setTimeout(function(){ // Hacky way to fix the "Individual" tables header columns.  Used in conjunction with the hidden "#ihHackFixButton" below
    $("#partUploadsHackFixButton").click();},200);
  });
  $("#comboItemUploadsIndex").on("click", function() {
    setTimeout(function(){ // Hacky way to fix the "Individual" tables header columns.  Used in conjunction with the hidden "#ihHackFixButton" below
    $("#comboItemUploadsHackFixButton").click();},200);
  });
});

$(document).on("turbolinks:load", function() {
  var table = $("#uploadsDataTable").DataTable({
    renderer: "bootstrap",
    "aaSorting": [],
    "scrollX": true,
    "scrollY": true,
    "colReorder": true,
    "dom": "<'uploads-toolbar'><'top-row paginate'p>t<'bottom-row paginate'ip>",
    "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
    "pageLength": 25,
    "bJQueryUI": true,
    "columnDefs": [
      { type: "file-size", targets: 3 },
      {
      "targets": 0,
      "orderable": false
      }
    ],
    "order": [[1, "desc"]],
    "oLanguage": {"sZeroRecords": "No uploads to display for this view"}
  });
  table.page.len(25).draw();
  $("div.uploads-toolbar").html(""+
    "<ul class='nav nav-tabs'>"+
    "  <li><div class='dataTables_filter'><input type='search' class='form-control' id='uploadsSearch' placeholder='Search Table...'></div>"+
    "  <li>"+
    "    <div class='dataTables_length'>"+
    "     <select "+
    "       class='form-control'"+
    "       title='Number of records to show'"+
    "       id='uploadsLength'>"+
    "       <option value='5'>5</option>"+
    "       <option selected='selected' value='25'>25</option>"+
    "       <option value='50'>50</option>"+
    "       <option value='100'>100</option>"+
    "       <option value='-1'>All</option>"+
    "     </select>"+
    "   </div>"+
    "  </li>"+
    "</ul>"+
    "");
  $("#uploadsSearch").addClear();
  $("#uploadsSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });
      $("#uploadsSearch").keyup(function(){
    table.search($(this).val()).draw();
  });

  $("#uploadsLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  function format (attributes) {
    return ""+
   "<div class='glider'>"+
   "  <table class='upload-listing-expando'>"+
   "    <thead>"+
   "      <tr>"+
   "        <th>Product Associations</th>"+
   "        <th>Part Associations</th>"+
  // "        <th>User Associations</th>"+
   "        <th>Task Associations</th>"+
  // "        <th>Vendor Upload Associations</th>"+
   "        <th>Belongs to File Upload Batch</th>"+
   "        <th>Delete File</th>"+
   "      </tr>"+
   "    </thead>"+
   ""+attributes+
   "  </table>"+
   "</div>";
  }

  $("#uploadsDataTable").on("click", "td.details-control", function() {
    var tr = $(this).closest("tr");
    var td = $(tr).find("td:first-child");
    var row = table.row(tr);
    if (row.child.isShown()) {
      $("div.glider", row.child()).slideUp(function() {
        row.child.hide();
        tr.removeClass("shown");
      });
    }
    else {
      row.child(format(tr.data("child-attributes")), "no-padding").show();
      tr.addClass("shown");
      $("div.glider", row.child()).slideDown();
    }
  });
  $(".deleteUpload").on("click", function() {
    var id = $(this).attr("id");
    bootbox.confirm("Are you sure you want to delete this file?", function(result){
      if (result === true) {
        $(".uploadDelete[id='"+id+"'").click();
      }
    });
  });
});

//-----------------------------------------------------------------------------------
//          START "PRODUCTS INDEX" JS                                               |
//-----------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  var table = $("#productUploadsDataTable").DataTable({
    renderer: "bootstrap",
    "aaSorting": [],
    "scrollX": true,
    "scrollY": true,
    "colReorder": true,
    "dom": "<'productUploads-toolbar'><'top-row paginate'p>t<'bottom-row paginate'ip>",
    "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
    "bJQueryUI": true,
    "columnDefs": [
      { type: "file-size", targets: 4 }
    ],
    "order": [[0, "asc"]],
    "oLanguage": {"sZeroRecords": "No images to display for this view"},
  });
  table.page.len(50000).draw();
  $("div.productUploads-toolbar").html(""+
    "<ul class='nav nav-tabs'>"+
    "  <li><a class='btn hidden' id='productUploadsHackFixButton'></a></li>"+
    "  <li><div class='dataTables_filter'><input type='search' class='form-control' id='productUploadsSearch' placeholder='Search Table...'></div>"+
    "  <li>"+
    "    <div class='dataTables_length'>"+
    "     <select "+
    "       class='form-control'"+
    "       title='Number of records to show'"+
    "       id='productUploadsLength'>"+
    "       <option value='5'>5</option>"+
    "       <option selected='selected' value='25'>25</option>"+
    "       <option value='50'>50</option>"+
    "       <option value='100'>100</option>"+
    "       <option value='-1'>All</option>"+
    "     </select>"+
    "   </div>"+
    "  </li>"+
    "</ul>"+
    "");
  $("#productUploadsSearch").addClear();
  $("#productUploadsSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });
      $("#productUploadsSearch").keyup(function(){
    table.search($(this).val()).draw();
  });

  $("#productUploadsLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });
  $("#productUploadsHackFixButton").on("click", function(){
    table.page.len(25).draw(); // Fixes header column width issues
  });
});

//-----------------------------------------------------------------------------------
//          START "PARTS INDEX" JS                                                  |
//-----------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  var table = $("#partUploadsDataTable").DataTable({
    renderer: "bootstrap",
    "aaSorting": [],
    "scrollX": true,
    "scrollY": true,
    "colReorder": true,
    "dom": "<'partUploads-toolbar'><'top-row paginate'p>t<'bottom-row paginate'ip>",
    "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
    "pageLength": 25,
    "bJQueryUI": true,
    "columnDefs": [
      { type: "file-size", targets: 4 }
    ],
    "order": [[0, "asc"]],
    "oLanguage": {"sZeroRecords": "No images to display for this view"}
  });
  table.page.len(50000).draw();
  $("div.partUploads-toolbar").html(""+
    "<ul class='nav nav-tabs'>"+
    "  <li><a class='btn hidden' id='partUploadsHackFixButton'></a></li>"+
    "  <li><div class='dataTables_filter'><input type='search' class='form-control' id='partUploadsSearch' placeholder='Search Table...'></div>"+
    "  <li>"+
    "    <div class='dataTables_length'>"+
    "     <select "+
    "       class='form-control'"+
    "       title='Number of records to show'"+
    "       id='partUploadsLength'>"+
    "       <option value='5'>5</option>"+
    "       <option selected='selected' value='25'>25</option>"+
    "       <option value='50'>50</option>"+
    "       <option value='100'>100</option>"+
    "       <option value='-1'>All</option>"+
    "     </select>"+
    "   </div>"+
    "  </li>"+
    "</ul>"+
    "");
  $("#partUploadsSearch").addClear();
  $("#partUploadsSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });
      $("#partUploadsSearch").keyup(function(){
    table.search($(this).val()).draw();
  });

  $("#partUploadsLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });
  $("#partUploadsHackFixButton").on("click", function(){
    table.page.len(25).draw(); // Fixes header column width issues
  });
});

//-----------------------------------------------------------------------------------
//          START "COMBO ITEMS INDEX" JS                                            |
//-----------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  var table = $("#comboItemUploadsDataTable").DataTable({
    renderer: "bootstrap",
    "aaSorting": [],
    "scrollX": true,
    "scrollY": true,
    "colReorder": true,
    "dom": "<'comboItemUploads-toolbar'><'top-row paginate'p>t<'bottom-row paginate'ip>",
    "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
    "pageLength": 25,
    "bJQueryUI": true,
    "columnDefs": [
      { type: "file-size", targets: 4 }
    ],
    "order": [[0, "asc"]],
    "oLanguage": {"sZeroRecords": "No images to display for this view"}
  });
  table.page.len(50000).draw();
  $("div.comboItemUploads-toolbar").html(""+
    "<ul class='nav nav-tabs'>"+
    "  <li><a class='btn hidden' id='comboItemUploadsHackFixButton'></a></li>"+
    "  <li><div class='dataTables_filter'><input type='search' class='form-control' id='comboItemUploadsSearch' placeholder='Search Table...'></div>"+
    "  <li>"+
    "    <div class='dataTables_length'>"+
    "     <select "+
    "       class='form-control'"+
    "       title='Number of records to show'"+
    "       id='comboItemUploadsLength'>"+
    "       <option value='5'>5</option>"+
    "       <option selected='selected' value='25'>25</option>"+
    "       <option value='50'>50</option>"+
    "       <option value='100'>100</option>"+
    "       <option value='-1'>All</option>"+
    "     </select>"+
    "   </div>"+
    "  </li>"+
    "</ul>"+
    "");
  $("#comboItemUploadsSearch").addClear();
  $("#comboItemUploadsSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });
      $("#comboItemUploadsSearch").keyup(function(){
    table.search($(this).val()).draw();
  });

  $("#comboItemUploadsLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });
  $("#comboItemUploadsHackFixButton").on("click", function(){
    table.page.len(25).draw(); // Fixes header column width issues
  });
});


// This function allows the File Size column to be sortable
$.fn.dataTable.ext.type.order["file-size-pre"] = function ( data ) {
  var matches = data.match( /^(\d+(?:\.\d+)?)\s*([a-z]+)/i );
  var multipliers = {
    Byte:  1,
    Bytes: 2,
    KB: 1024,
    MB: 1048576,
    GB: 1073741824,
    TB: 1099511627776,
    PB: 1125899906842624
  };

  if (matches) {
    var multiplier = multipliers[matches[2]];
    return parseFloat( matches[1] ) * multiplier;
  } 
  else {
    return -1;
  }
};