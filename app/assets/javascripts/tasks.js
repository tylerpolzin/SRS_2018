/*global $*/
/*global bootbox*/
/*global dateFormat*/
/*global CollapsibleLists*/

//------------------------------------------------------------------------------------------------------
//                           "NEW" related JS                                                          |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  var dateSelect = new Date().format("dddd, mmmm dS, yyyy, h:MM TT");
  $(".btn-toolbar").hide();
  $("#newTaskEcommOrders").hide();
  $("#newTaskWarrantyOrders").hide();
  $(".newTaskUploadsTopBorder").hide();
  $(".newTaskUploadsBottomBorder").hide();

  $("#newTaskTab").on("click", function() {
    $("#addEcommOrderButton").hide();
    $("#addWarrantyOrderButton").hide();
    $("#addTaskFileButton").hide();
  });

  $("#newTaskFiles").on("click", function() {
    $("#addEcommOrderButton").hide();
    $("#addWarrantyOrderButton").hide();
    $("#addTaskFileButton").show();
  });

  $("#newTaskEcommOrders").on("click", function() {
    $("#addWarrantyOrderButton").hide();
    $("#addTaskFileButton").hide();
    $("#addEcommOrderButton").show();
  });

  $("#newTaskWarrantyOrders").on("click", function() {
    $("#addTaskFileButton").hide();
    $("#addEcommOrderButton").hide();
    $("#addWarrantyOrderButton").show();
  });

  if ($("#taskTypeSelect option:selected").text() == "Select Type...") {
    $("#taskTypeSelect option:selected").attr("disabled", true);
  }
  if ($("#taskRecipientSelect option:selected").text() == "Select Recipient...") {
    $("#taskRecipientSelect option:selected").attr("disabled", true);
  }
  
  $("#taskTypeSelect").on("change", function() {
    if ($(this).find("option:selected").val() == "Ecomm Orders") {
      if ($(".newWarrantyOrdersContainer").find(".warranty_order_fields").length > 0) {
        bootbox.confirm("Changing the Task Type now will remove all existing Warranty Orders.  Are you sure you want to do this?", function(result){
          if (result === true) { // Change to Ecomm Order
            $("#newTaskName").val("Ecomm Orders for " + dateSelect);
            $("#newTaskWarrantyOrders").hide();
            $("#newTaskEcommOrders").show();
            $(".newWarrantyOrdersContainer").find(".warranty_order_fields").remove();
          }
          else { // Revert to Warranty Order
            $("#newTaskEcommOrders").hide();
            $("#newTaskWarrantyOrders").show();
            $("#taskTypeSelect").val("Warranty Orders");
          }
        });
      }
      else { // Activate Ecomm Order
        $("#newTaskName").val("Ecomm Orders for " + dateSelect);
        $("#newTaskWarrantyOrders").hide();
        $("#newTaskEcommOrders").show();
      }
    }
    if ($(this).find("option:selected").val() == "Warranty Orders") {
      if ($(".newEcommOrdersContainer").find(".ecomm_order_fields").length > 0) {
        bootbox.confirm("Changing the Task Type now will remove all existing Ecomm Orders.  Are you sure you want to do this?", function(result){
          if (result === true) { // Change to Warranty Order
            $("#newTaskName").val("Warranty Orders for " + dateSelect);
            $("#newTaskEcommOrders").hide();
            $("#newTaskWarrantyOrders").show();
            $(".newEcommOrdersContainer").find(".ecomm_order_fields").remove();
          }
          else { // Revert to Ecomm Order
            $("#newTaskWarrantyOrders").hide();
            $("#newTaskEcommOrders").show();
            $("#taskTypeSelect").val("Ecomm Orders");
          }
        });
      }
      else { // Activate Warranty Order
        $("#newTaskName").val("Warranty Orders for " + dateSelect);
        $("#newTaskEcommOrders").hide();
        $("#newTaskWarrantyOrders").show();
      }
    }
  });

  $("#taskDatepicker").datepicker({ // for "Due Date" column
      format: "yyyy-mm-dd",
      clearBtn: true,
      autoclose: true,
      startView: 0,
      maxViewMode: 2,
      todayBtn: true,
      todayHighlight: true
  });

  $("#addEcommOrderButton").on("click", function() { // Secondary button that clicks the hidden "Add Item" button.  Required due to Helper parameters.
    $(".add_child_ecomm_order").click();
    $(".newEcommOrdersContainer").find(".initialBlankDiv").hide();
  });
  $("#addTaskFileButton").on("click", function() {
    $(".add_child_new_task_upload").click();
    $(".newTaskUploadsTopBorder").show();
    $(".newTaskUploadsBottomBorder").show();
    $(".newTaskUploadsContainer").find(".initialBlankDiv").hide();
  });

  $("#newTaskName").dblclick(function() {
    $(this).prop("readonly", false);
    $(this).removeClass("cursor-fix");
  });

  $(document).on("click", "#taskFirstSubmit", function(e) {
    e.preventDefault();
    $(".line_items_fields_template").html("");
    $("createTaskSubmitButton").click();
  });

});

$(document).on("click", "a.remove_child_new_task_upload", function() { // Triggers the removal of the relevant "Item Select" table row when clicked
  var hidden_field = $(this).prev("input[type=hidden]")[0];
  if(hidden_field) {
    hidden_field.value = "1";
  }
  $(this).parents(".new_task_upload_fields").remove();
  return false;
});

$(document).on("click", "a.add_child_new_task_upload", function() {
  var association, new_id, regexp, template;
  association = $(this).attr("data-association");
  template = $("#" + association + "_fields_template").html();
  regexp = new RegExp("new_" + association, "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  return false;
});

$(document).on("click", "a.remove_child_ecomm_order", function() { // Triggers the removal of the relevant "Item Select" table row when clicked
  var hidden_field = $(this).prev("input[type=hidden]")[0];
  if(hidden_field) {
    hidden_field.value = "1";
  }
  $(this).parents(".ecomm_order_fields").remove();
  return false;
});

$(document).on("click", "a.add_child_ecomm_order", function() {
  var association, new_id, regexp, template, prev;
  association = $(this).attr("data-association");
  template = $("#" + association + "_fields_template").html();
  regexp = new RegExp("new_" + association, "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  prev = $(this).parent().prev();
  prev.find(".ecomm_order-duedate-datepicker").datepicker({
    format: "yyyy-mm-dd",
    clearBtn: true,
    autoclose: true,
    startView: 0,
    maxViewMode: 2,
    todayBtn: true,
    todayHighlight: true,
    orientation: "bottom"
  });
  return false;
});

$(document).on("click", "a.remove_child_ecomm_order_line_item", function() { // Triggers the removal of the relevant "Item Select" table row when clicked
  var hidden_field = $(this).prev("input[type=hidden]")[0];
  if(hidden_field) {
    hidden_field.value = "1";
  }
  $(this).parents(".new_task_upload_fields").remove();
  return false;
});

$(document).on("click", "a.add_child_ecomm_order_line_item", function() {
  var new_id, regexp, template;
  template = $(this).parent().parent().find(".line_items_fields_template").html();
  regexp = new RegExp("new_line_items", "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  return false;
});

$(document).on("click", ".addTaskEcommOrderLineItemButton", function() {
  $(this).parent().parent().parent().parent().parent().find(".add_child_ecomm_order_line_item").click();
});
