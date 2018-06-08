/*global $*/
/*global bootbox*/
/*global dateFormat*/
/*global CollapsibleLists*/
/*global basic_tooltip*/
/*global json*/

//------------------------------------------------------------------------------------------------------
//                           Task "NEW" related JS                                                     |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $(".taskDefaultDatepicker").datepicker({
    format: "yyyy-mm-dd",
    clearBtn: true,
    autoclose: true,
    startView: 0,
    maxViewMode: 2,
    todayBtn: true,
    todayHighlight: true,
    orientation: "bottom"
  });
  var dateSelect = new Date().format("dddd, mmmm dS, yyyy, h:MM TT"); // Used for the Task Title
  $(".btn-toolbar").hide();
  $("#newTaskEcommOrders").hide();
  $("#newTaskWarrantyOrders").hide();
  $(".warranty_order_reference").hide();
  $("div[class$='order_attributes']").hide();
  $(".newTaskUploadsContainer").hide();
  $(".trackingNumbersTopBorder").hide();
  $(".taskAttributesContainer").hide();
  $(".trackingNumbersBottomBorder").hide();
  basic_tooltip(".task_add_attributes_button .fa-question-circle", "Custom Attributes for Task", task_attributes_button_tooltip);
  basic_tooltip(".task_add_comment_button .fa-question-circle", "Task Comments", task_comments_button_tooltip);
  basic_tooltip(".task_add_file_button .fa-question-circle", "Add Files", task_files_button_tooltip);
  basic_tooltip(".files_remove_button", "Remove Files", "Removes all files from the current task");
  basic_tooltip("#taskFirstSubmit", "Create Task", "<ul><li>If you click this and nothing happens, make sure any required fields are filled in or removed.</li><li>Required fields have a red border around them.</li></ul>");
  basic_tooltip("#newTaskName", "Task Name", "<ul><li>Task name is automatically generated for consistency.</li><li>If you would like to enter your own, double-click on this field.</li></ul>");

  $("#newTaskTab").on("click", function() {
    $("#newTaskTab").removeClass("invalidPulse");
    $("#addEcommOrderButton").hide();
    $("#addWarrantyOrderButton").hide();
  });

  $("#newTaskFiles").on("click", function() {
    $("#newTaskFiles").removeClass("invalidPulse");
    $("#addEcommOrderButton").hide();
    $("#addWarrantyOrderButton").hide();
  });

  $("#newTaskEcommOrders").on("click", function() {
    $("#newTaskEcommOrders").removeClass("invalidPulse");
    $("#addWarrantyOrderButton").hide();
    $("#addEcommOrderButton").show();
  });

  $("#newTaskWarrantyOrders").on("click", function() {
    $("#newTaskWarrantyOrders").removeClass("invalidPulse");
    $("#addEcommOrderButton").hide();
    $("#addWarrantyOrderButton").show();
  });

  if ($("#taskTypeSelect option:selected").text() == "Select Type...") {
    $("#taskTypeSelect option:selected").attr("disabled", true);
  }
  if ($("#taskRecipientSelect option:selected").text() == "Select Recipient...") {
    $("#taskRecipientSelect option:selected").attr("disabled", true);
  }

  var currentType = [];
  $("#taskTypeSelect").on("change", function() {
    if ($(this).find("option:selected").val() == "E-Commerce Orders") {
      if ($(".newWarrantyOrdersContainer").find(".warranty_order_fields").length > 0) {
        bootbox.confirm("Changing the Task Type now will remove all existing Customer Orders.  Are you sure you want to do this?", function(result){
          if (result === true) { // Change to Ecomm Order
            $("#newTaskName").val("E-Commerce Orders for " + dateSelect);
            $("#newTaskWarrantyOrders").hide();
            $("#newTaskEcommOrders").show();
            $(".newWarrantyOrdersContainer").find(".warranty_order_fields").remove();
            currentType = "E-Commerce Orders";
          }
          else { // Revert to Customer Order
            $("#newTaskEcommOrders").hide();
            $("#newTaskWarrantyOrders").show();
            $("#taskTypeSelect").val("Customer Orders");
            currentType = "Customer Orders";
          }
        });
      }
      else { // Activate Ecomm Order
        $("#newTaskName").val("E-Commerce Orders for " + dateSelect);
        $("#newTaskWarrantyOrders").hide();
        $("#newTaskEcommOrders").show();
        currentType = "E-Commerce Orders";
      }
    }
    if ($(this).find("option:selected").val() == "Customer Orders") {
      if ($(".newEcommOrdersContainer").find(".ecomm_order_fields").length > 0) {
        bootbox.confirm("Changing the Task Type now will remove all existing E-Commerce Orders.  Are you sure you want to do this?", function(result){
          if (result === true) { // Change to Customer Order
            $("#newTaskName").val("Customer Orders for " + dateSelect);
            $("#newTaskEcommOrders").hide();
            $("#newTaskWarrantyOrders").show();
            $(".newEcommOrdersContainer").find(".ecomm_order_fields").remove();
            // Hacky way to remove the extra tracking number template that is generated
            $("#jstemplates_warranty_order").find("input[name^='task[ecomm']").closest(".tracking_numbers_fields_template").remove();
            currentType = "Customer Orders";
          }
          else { // Revert to Ecomm Order
            $("#newTaskWarrantyOrders").hide();
            $("#newTaskEcommOrders").show();
            $("#taskTypeSelect").val("E-Commerce Orders");
            currentType = "E-Commerce Orders";
          }
        });
      }
      else { // Activate Customer Order
        $("#newTaskName").val("Customer Orders for " + dateSelect);
        $("#newTaskEcommOrders").hide();
        $("#newTaskWarrantyOrders").show();
        // Hacky way to remove the extra tracking number template that is generated
        $("#jstemplates_warranty_order").find("input[name^='task[ecomm']").closest(".tracking_numbers_fields_template").remove();
        currentType = "Customer Orders";
      }
    }
    if ($(this).find("option:selected").val() == "Basic Task") {
      if ($("div[class*='OrdersContainer']").find("div[class*='_order_fields']").length > 0) {
        bootbox.confirm("Changing the Task Type now will remove all existing orders.  Are you sure you want to do this?", function(result){
          if (result === true) { // Remove all orders
            $("#newTaskName").val("Basic Task for " + dateSelect);
            $("#newTaskEcommOrders").hide();
            $("#newTaskWarrantyOrders").hide();
            $("div[class*='OrdersContainer']").find("div[class*='_order_fields']").remove();
            $("#jstemplates_warranty_order").find("input[name^='task[ecomm']").closest(".tracking_numbers_fields_template").remove();
            currentType = "Basic Task";
          }
          else {
            $("#taskTypeSelect").val(currentType);
          }
        });
      }
      else {
        $("#newTaskName").val("Basic Task for " + dateSelect);
        $("#newTaskEcommOrders").hide();
        $("#newTaskWarrantyOrders").hide();
        currentType = "Basic Task";
      }
    }
  });

  $("#addEcommOrderButton").on("click", function() { // Secondary button that clicks the hidden "Add Item" button.  Required due to Helper parameters.
    $(".add_child_ecomm_order").click();
    $(".newEcommOrdersContainer").find(".initialBlankDiv").hide();
  });
  
  $("#addWarrantyOrderButton").on("click", function() { // Secondary button that clicks the hidden "Add Item" button.  Required due to Helper parameters.
    $(".add_child_warranty_order").click();
    $(".newWarrantyOrdersContainer").find(".initialBlankDiv").hide();
  });

  $(".task_add_file_button").on("click", function() {
    $(".add_child_new_task_upload").click();
    $(".newTaskUploadsContainer").show();
    $(".editTaskUploadsContainer").show();
  });


  $("#newTaskName").dblclick(function() {
    $(this).prop("readonly", false);
    $(this).removeClass("cursor-fix");
  });

  $(document).on("click", "#taskFirstSubmit", function(e) {
    e.preventDefault();
    $('input:invalid, select:invalid').each(function () {
      // Find the tab-pane that this element is inside, and get the id
      var id = $(this).closest('.tab-pane').attr('id');
      // Find the link that corresponds to the pane and have it show
      $('.nav li a[href="#' + id + '"]').addClass("invalidPulse");
      return false;
    });
    var tr = $(".body").find("tr").length;
    if (tr > 1) {
      $(".hide-tag").remove();
    }
    $(".ecomm_orders_fields_template").html("");
    $(".warranty_orders_fields_template").html("");
    $("#createTaskSubmitButton").click();
  });





});

$(document).on("dblclick", ".orderNumberClick", function() { // Generates a unique order number for the given order when the field is double-clicked
  var letters = ["A", "B", "C", "E", "F", "G", "H", "J", "K", "M", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];
  var letter = letters[Math.floor(Math.random() * letters.length)];
  var letter2 = letters[Math.floor(Math.random() * letters.length)];
  var letter3 = letters[Math.floor(Math.random() * letters.length)];
  var MyDate = new Date();
  MyDate.setDate(MyDate.getDate());
  var date = MyDate.getFullYear().toString().substr(-2) + ("0" + (MyDate.getMonth()+1)).slice(-2) + ("0" + MyDate.getDate()).slice(-2);
  $(this).val(date+letter+letter2+letter3); // Format of order number comes out as a date plus three random letters. Ex: 180206EKB = 2018-02-06
});


$(document).on("click", "a.remove_child_new_task_upload", function() {
  var hidden_field = $(this).prev("input[type=hidden]")[0];
  if(hidden_field) {
    hidden_field.value = "1";
  }
  if ($(".newTaskUploadsContainer").children("div").length == 4) {
    $(".newTaskUploadsContainer").hide();
  }
  if ($(".editTaskUploadsContainer").children(".new_task_upload_fields").length == 0) {
    $(".editTaskUploadsContainer").hide();
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

$(document).on("change keyup", ".ecommOrderCustomerName", function() {
  $(this).closest(".ecomm_order_fields").find(".ecomm_order_title").html("E-Commerce Order for " + $(this).val());
});

$(document).on("keyup", ".warrantyOrderCustomerFirstName", function() {
  var current_order = $(this).closest(".warranty_order_fields");
  current_order.find(".warranty_order_title").html("Customer Order for " + $(this).val() + " " + current_order.find(".warrantyOrderCustomerLastName").val()).change();
});

$(document).on("keyup", ".warrantyOrderCustomerLastName", function() {
  var current_order = $(this).closest(".warranty_order_fields");
  current_order.find(".warranty_order_title").html("Customer Order for " + current_order.find(".warrantyOrderCustomerFirstName").val() + " " + $(this).val()).change();
});

$(document).on("click", "a.remove_child_ecomm_order", function() { // Triggers the removal of the relevant "Item Select" table row when clicked
  var tr = $(this).closest(".ecomm_order_fields");
  var hidden_field = $(this).prev("input[type=hidden]")[0];
  tr.find(".lineItemProductBox").val([]).trigger("change");
  tr.find(".lineItemPartBox").val([]).trigger("change");
  tr.find(".lineItemComboItemBox").val([]).trigger("change");
  tr.find(".lineItemQuantityBox").val("");
  if (hidden_field) {
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
  prev.find(".ecommOrderCancellationReasonRow").hide();
  prev.find(".ecommOrderCancellationReasonSelect").hide();
  prev.find(".shipMethodRow").children().hide();
  prev.find(".ecommOrderRetailerSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Retailer...",
    selectOnClose: true,
    tags: true
  });
  prev.find(".ecommOrderCarrierRequestSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Carrier...",
    selectOnClose: true,
    tags: true
  });
  prev.find(".ecommOrderShipMethodRequestSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Ship Method...",
    selectOnClose: true
  });
  prev.find(".taskDefaultDatepicker").datepicker({
    format: "yyyy-mm-dd",
    clearBtn: true,
    autoclose: true,
    startView: 0,
    maxViewMode: 2,
    todayBtn: true,
    todayHighlight: true,
    orientation: "bottom"
  });
  basic_tooltip(".ecomm_order_add_attributes_button .fa-question-circle", "Custom Attributes for E-Commerce Orders", ecomm_order_attributes_button_tooltip);
  basic_tooltip(".ecomm_order_add_comment_button .fa-question-circle", "Comments", ecomm_order_comments_button_tooltip);
  basic_tooltip(".ecomm_order_add_line_item_button .fa-question-circle", "Add Line Item", ecomm_order_line_item_button_tooltip);
  basic_tooltip(".ecomm_order_remove_button", "Remove this Order", "<ul><li>Deletes the selected order</li></ul>");
  basic_tooltip(".ecomm_order_ship_request_tooltip", "Add Ship Method Request", ecomm_order_ship_request_tooltip, "right");
  return false;
});

$(document).on("change", ".ecommOrderStatusSelect", function() { // Shows the "Cancellation Reason" input if the order is selected as Cancelled, else hides it
  var cancel_row = $(this).closest(".ecomm_order_fields").find(".ecommOrderCancellationReasonRow");
  var selected = $(this).find("option:selected").val();
  if (selected == "New") {
    cancel_row.find(".ecommOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.find(".ecommOrderCancellationReasonSelect").hide();
    cancel_row.find(".ecommOrderActiveBoolean").val("true");
  }
  if (selected == "Open") {
    cancel_row.find(".ecommOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.find(".ecommOrderCancellationReasonSelect").hide();
    cancel_row.find(".ecommOrderActiveBoolean").val("true");
  }
  if (selected == "Completed") {
    cancel_row.find(".ecommOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.find(".ecommOrderCancellationReasonSelect").hide();
    cancel_row.find(".ecommOrderActiveBoolean").val("false");
  }
  if (selected == "Cancelled") {
    cancel_row.find(".ecommOrderCancellationReasonSelect").prop("required", true);
    cancel_row.show();
    cancel_row.find(".ecommOrderCancellationReasonSelect").show();
    cancel_row.find(".ecommOrderActiveBoolean").val("false");
  }
});

$(document).on("change", ".ecommOrderRetailerSelect", function() { // Sets the default Ship Method Request based on retailer preference.
  var carrier = $(this).closest(".ecomm_order_fields").find(".ecommOrderCarrierRequestSelect");
  var selected = $(this).find("option:selected").val();
  if (selected == "Home Depot") {
    carrier.val("UPS").trigger("change");
  }
  if (selected == "Wal-Mart") {
    carrier.val("FedEx").trigger("change");
  }
  if (selected == "Wayfair") {
    carrier.val("UPS").trigger("change");
  }
  if (selected == "Amazon") {
    carrier.val("UPS").trigger("change");
  }
  if (selected == "Menards") {
    carrier.val("Cheapest Method").trigger("change");
  }
});

$(document).on("click", ".ecomm_order_add_ship_request_button", function() { // Shows the Ship Method Request inputs if the button is pressed
  var fields = $(this).closest(".ecomm_order_fields");
  fields.find(".ecommOrderCancellationReasonRow").show();
  fields.find(".shipMethodRow").children().show();
});

$(document).on("click", "a.remove_child_warranty_order", function() { // Triggers the removal of the selected order when clicked
  var tr = $(this).closest(".warranty_order_fields");
  var hidden_field = $(this).prev("input[type=hidden]")[0];
  tr.find(".lineItemProductBox").val([]).trigger("change");
  tr.find(".lineItemPartBox").val([]).trigger("change");
  tr.find(".lineItemComboItemBox").val([]).trigger("change");
  tr.find(".lineItemQuantityBox").val("");
  if(hidden_field) {
    hidden_field.value = "1";
  }
  $(this).parents(".warranty_order_fields").remove();
  return false;
});

$(document).on("click", "a.add_child_warranty_order", function() {
  var association, new_id, regexp, template, prev;
  association = $(this).attr("data-association");
  template = $("#" + association + "_fields_template").html();
  regexp = new RegExp("new_" + association, "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  prev = $(this).parent().prev();
  prev.find(".warrantyOrderCancellationReasonRow").hide();
  prev.find(".warrantyOrderCancellationReasonSelect").hide();
  prev.find(".shipMethodRow").children().hide();
  prev.find(".warrantyOrderCarrierRequestSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Carrier...",
    selectOnClose: true,
    tags: true
  });
  prev.find(".warrantyOrderShipMethodRequestSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Ship Method...",
    selectOnClose: true
  });
  prev.find(".taskDefaultDatepicker").datepicker({
    format: "yyyy-mm-dd",
    clearBtn: true,
    autoclose: true,
    startView: 0,
    maxViewMode: 2,
    todayBtn: true,
    todayHighlight: true,
    orientation: "bottom"
  });
  prev.find(".phone_mask").inputmask({"mask": "(999) 999-9999"});
  prev.find("select[id$='customer_attributes_country']").select2({
    theme: "bootstrap",
    placeholder: "Select Country...",
    selectOnClose: true
  });
  prev.find(".warrantyOrderCustomerState").select2({
    theme: "bootstrap",
    selectOnClose: true
  });
  basic_tooltip(".warranty_order_add_reference_button .fa-question-circle", "E-Commerce Order Reference", warranty_order_reference_button_tooltip);
  basic_tooltip(".warranty_order_add_attributes_button .fa-question-circle", "Custom Attributes for Customer Orders", warranty_order_attributes_button_tooltip);
  basic_tooltip(".warranty_order_add_comment_button .fa-question-circle", "Comments", warranty_order_comments_button_tooltip);
  basic_tooltip(".warranty_order_add_line_item_button .fa-question-circle", "Add Line Item", warranty_order_line_item_button_tooltip);
  basic_tooltip(".warranty_order_remove_button", "Remove this Order", "<ul><li>Deletes the selected order</li></ul>");
  basic_tooltip(".warranty_order_customer_tooltip", "Customer Details", warranty_order_customer_tooltip, "right");
  basic_tooltip(".warranty_order_customer_zipcode_tooltip", "Zip Code Select", warranty_order_customer_zipcode_tooltip, "right");
  basic_tooltip(".warranty_order_order_number_tooltip", "Order Number", warranty_order_order_number_tooltip, "right");
  basic_tooltip(".warranty_order_ship_request_tooltip", "Ship Method Request", warranty_order_ship_request_tooltip, "right");
  return false;
});

$(document).on("click", ".warranty_order_add_ship_request_button", function() { // Shows the Ship Method Request inputs if the button is pressed
  var fields = $(this).closest(".warranty_order_fields");
  fields.find(".warrantyOrderCancellationReasonRow").show();
  fields.find(".shipMethodRow").children().show();
});

$(document).on("change", ".warrantyOrderStatusSelect", function() {
  var cancel_row = $(this).closest(".warranty_order_fields").find(".warrantyOrderCancellationReasonRow");
  if ($(this).find("option:selected").val() == "New") {
    cancel_row.find(".warrantyOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.find(".warrantyOrderCancellationReasonSelect").hide();
    cancel_row.find(".warrantyOrderActiveBoolean").val("true");
  }
  if ($(this).find("option:selected").val() == "Open") {
    cancel_row.find(".warrantyOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.find(".warrantyOrderCancellationReasonSelect").hide();
    cancel_row.find(".warrantyOrderActiveBoolean").val("true");
  }
  if ($(this).find("option:selected").val() == "Completed") {
    cancel_row.find(".warrantyOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.find(".warrantyOrderCancellationReasonSelect").hide();
    cancel_row.find(".warrantyOrderActiveBoolean").val("false");
  }
  if ($(this).find("option:selected").val() == "Cancelled") {
    cancel_row.find(".warrantyOrderCancellationReasonSelect").prop("required", true);
    cancel_row.show();
    cancel_row.find(".warrantyOrderCancellationReasonSelect").show();
    cancel_row.find(".warrantyOrderActiveBoolean").val("false");
  }
});

$(document).on("keyup change", ".newWarrantyOrderCustomerContainer", function() {
  var city = $(this).find(".warrantyOrderCustomerCity").val();
  $(this).find(".warrantyOrderCustomerCityHidden").val(city);
  var state = $(this).find(".warrantyOrderCustomerState").find("option:selected").val();
  $(this).find(".warrantyOrderCustomerStateHidden").val(state);
});

$(document).on("keyup change", ".warrantyOrderCustomerZipcode", function() { // Zipcode API City/State filler
	var clientKey = "js-pUid3SvjqKdSM2jdU7pj1A3gKqjGNzLbA3YdOJlzEYQOLeRx9weZNl9NfB5MaIE2";
	var cache = {};
	var container = $(this).closest(".newWarrantyOrderCustomerContainer");
	var errorDiv = container.find("div.text-error");
	container.find(".warrantyOrderCustomerZipcodeHidden").val($(this).val());
	function handleResp(data) {
		if (data.error_msg) errorDiv.text(data.error_msg);
		else if ("city" in data) {
			container.find("input[id$='customer_attributes_lat']").val(data.lat);
			container.find("input[id$='customer_attributes_long']").val(data.lng);
			container.find("input[name='city']").val(data.city);
			container.find($(".warrantyOrderCustomerState").select2({
    theme: "bootstrap",
    selectOnClose: true
  })).val(data.state);
		}
	}

	$(function() {
		var zipcode = container.find("input[name='zipcode']").val().substring(0, 5);
		if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode)) {
			errorDiv.empty();
			if (zipcode in cache) {
				handleResp(cache[zipcode]);
			}
			else {
				var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/degrees";
				$.ajax({
					"url": url,
					"dataType": "json"
				}).done(function(data) {
					handleResp(data);
					cache[zipcode] = data;
					container.find(".warrantyOrderCustomerPhone").focus();
				}).fail(function(data) {
					if (data.responseText && (json = $.parseJSON(data.responseText))) {
						cache[zipcode] = json;
						if (json.error_msg)
							errorDiv.text(json.error_msg);
					}
					else
						errorDiv.text('Request failed.');
				});
			}
		}
	});
});

$(document).on("click", ".warranty_order_add_reference_button", function() {
  var current_order = $(this).closest(".warranty_order_fields");
  current_order.find(".warranty_order_reference").show();
  current_order.find(".warrantyOrderEcommOrderSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Ecomm Order Reference...",
    selectOnClose: true
  });
  if (current_order.find(".warranty_order_reference").is(":visible")) {
    current_order.find(".warranty_order_add_reference_button").addClass("disabled");
  }
});

$(document).on("click", ".task_add_attributes_button", function() {
  var contents = "<tr class='row new_row'>" + $(".taskAttributeTemplate").html()+ "</tr>";
  $(".taskAttributesContainer").show();
  $(".task_attributes").find(".body").append(contents);
  $(".task_attributes").find(".body").find(".row:last-child").find(".taskDynamicAttributeName").prop("required", true);
});

$(document).on("click", ".ecomm_order_add_attributes_button", function() {
  var current_order = $(this).closest(".ecomm_order_fields");
  var contents = "<tr class='row new_row'>" +current_order.find(".ecommOrderAttributeTemplate").html()+ "</tr>";
  current_order.find(".ecomm_order_attributes").show();
  current_order.find(".body").append(contents);
  current_order.find(".body").find(".row:last-child").find(".ecommOrderDynamicAttributeName").prop("required", true);
});

$(document).on("click", ".warranty_order_add_attributes_button", function() {
  var current_order = $(this).closest(".warranty_order_fields");
  var contents = "<tr class='row new_row'>" +current_order.find(".warrantyOrderAttributeTemplate").html()+ "</tr>";
  current_order.find(".warranty_order_attributes").show();
  current_order.find(".body").append(contents);
  current_order.find(".body").find(".row:last-child").find(".warrantyOrderDynamicAttributeName").prop("required", true);
});

$(document).on("keyup", ".taskDynamicAttributeName", function(){
  var nameElem, valueElem, value;
  nameElem = $(this);
  valueElem = nameElem.closest(".row").children("td").children(".text_field");
  value = nameElem.val();
  valueElem.attr("id", "task_details_"+value);
  valueElem.attr("name", "task[details]["+value+"]");
});

$(document).on("keyup", ".warrantyOrderDynamicAttributeName", function(){
  var nameElem, valueElem, value, attrTimestamp;
  nameElem = $(this);
  valueElem = nameElem.closest(".row").children("td").children(".text_field");
  value = nameElem.val();
  attrTimestamp = $(this).closest('tbody').find('.attrTimestamp').attr('id');
  valueElem.attr("id", "task_warranty_orders_attributes_"+attrTimestamp+"_details_"+value);
  valueElem.attr("name", "task[warranty_orders_attributes]["+attrTimestamp+"][details]["+value+"]");
});

$(document).on("keyup", ".ecommOrderDynamicAttributeName", function(){
  var nameElem, valueElem, value, attrTimestamp;
  nameElem = $(this);
  valueElem = nameElem.closest(".row").children("td").children(".text_field");
  value = nameElem.val();
  attrTimestamp = $(this).closest('tbody').find('.attrTimestamp').attr('id');
  valueElem.attr("id", "task_ecomm_orders_attributes_"+attrTimestamp+"_details_"+value);
  valueElem.attr("name", "task[ecomm_orders_attributes]["+attrTimestamp+"][details]["+value+"]");
});

$(document).on("click", ".taskRemoveAttributeRow", function(){
  if ($(".taskAttributesContainer").find(".body").find(".row").length == 2) {
    $(".taskAttributesContainer").hide();
    $(this).closest(".row").remove();
  }
  else {
    $(this).closest(".row").remove();
  }
});

$(document).on("click", ".orderRemoveAttributeRow", function(){
  if ($(this).closest(".orderAttributeContainer").find("tr").length == 2) {
    $(this).closest("div[class$='order_attributes']").hide();
    $(this).closest(".row").remove();
  }
  else {
    $(this).closest(".row").remove();
  }
});


$(document).on("change", ".lineItemItemType", function() {
  var tr = $(this).closest("tr");
  if ($(this).find("option:selected").text() == "Combo Item") {
    tr.find(".lineItemProductBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemPartBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemComboItemBox").next(".select2-container").removeClass("hidden");
    tr.find(".lineItemQuantityBox").val(1);
  }
  if ($(this).find("option:selected").text() == "Product") {
    tr.find(".lineItemComboItemBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemPartBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemProductBox").next(".select2-container").removeClass("hidden");
    tr.find(".lineItemQuantityBox").val(1);
  }
  if ($(this).find("option:selected").text() == "Part") {
    tr.find(".lineItemComboItemBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemProductBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemPartBox").next(".select2-container").removeClass("hidden");
    tr.find(".lineItemQuantityBox").val(1);
  }
  if ($(this).find("option:selected").text() == "Select Item Type...") {
    tr.find(".lineItemComboItemBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemProductBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemPartBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemQuantityBox").val(1);
  }
});

$(document).on("click", "a.add_child_task_comment", function() {
  var new_id, regexp, template;
  template = $("#jstemplates_new_task_comment").find(".comments_fields_template").html();
  regexp = new RegExp("new_comments", "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  return false;
});



$(document).on("click", "a.add_child_ecomm_order_comment", function() {
  var new_id, regexp, template;
  template = $(this).closest(".ecomm_order_fields").find(".comments_fields_template").html();
  regexp = new RegExp("new_comments", "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  return false;
});

$(document).on("click", "a.add_child_warranty_order_comment", function() {
  var new_id, regexp, template;
  template = $(this).closest(".warranty_order_fields").find(".comments_fields_template").html();
  regexp = new RegExp("new_comments", "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  return false;
});






$(document).on("click", "a.remove_child_line_item", function() {
  var tr = $(this).closest(".newLineItemContainer");
  var hidden_field = $(this).prev("input[type=hidden]")[0];
  tr.find(".lineItemProductBox").val([]).trigger("change");
  tr.find(".lineItemPartBox").val([]).trigger("change");
  tr.find(".lineItemComboItemBox").val([]).trigger("change");
  tr.find(".lineItemQuantityBox").val("");
  if(hidden_field) {
    hidden_field.value = "1";
  }
  $(this).parents(".new_task_line_item_fields").remove();
  return false;
});

$(document).on("click", "a.add_child_ecomm_order_line_item", function() {
  var new_id, regexp, template, prev;
  template = $(this).closest(".ecomm_order_fields").find(".line_items_fields_template").html();
  regexp = new RegExp("new_line_items", "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  prev = $(this).parent().prev();
  prev.find(".lineItemProductBox").select2({
    theme:"bootstrap",
    placeholder: "Select Product...",
    selectOnClose: true,
    allowClear: true
  });
  prev.find(".lineItemPartBox").select2({
    theme:"bootstrap",
    placeholder: "Select Part...",
    selectOnClose: true,
    allowClear: true
  });
  prev.find(".lineItemComboItemBox").select2({
    theme:"bootstrap",
    placeholder: "Select Combo Item...",
    selectOnClose: true,
    allowClear: true
  });
  prev.find(".select2-container").next(".select2-container").addClass("hidden"); // Cycles through the jstemplate to prepare all relevant box visibility on click
  prev.find(".select2-container").addClass("hidden");
  prev.find(".lineItemItemType").val("Product");
  prev.find(".lineItemProductBox").next(".select2-container").removeClass("hidden");

  return false;
});

$(document).on("click", "a.add_child_warranty_order_line_item", function() {
  var new_id, regexp, template, prev;
  template = $(this).closest(".warranty_order_fields").find(".line_items_fields_template").html();
  regexp = new RegExp("new_line_items", "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  prev = $(this).parent().prev();
  prev.find(".lineItemProductBox").select2({
    theme:"bootstrap",
    placeholder: "Select Product...",
    selectOnClose: true,
    allowClear: true
  });
  prev.find(".lineItemPartBox").select2({
    theme:"bootstrap",
    placeholder: "Select Part...",
    selectOnClose: true,
    allowClear: true
  });
  prev.find(".lineItemComboItemBox").select2({
    theme:"bootstrap",
    placeholder: "Select Combo Item...",
    selectOnClose: true,
    allowClear: true
  });
  prev.find(".select2-container").next(".select2-container").addClass("hidden"); // Cycles through the jstemplate to prepare all relevant box visibility on click
  prev.find(".select2-container").addClass("hidden");
  prev.find(".lineItemItemType").val("Product");
  prev.find(".lineItemProductBox").next(".select2-container").removeClass("hidden");

  return false;
});

$(document).on("click", "a.remove_child_line_item_tracking_number", function() { // Triggers the removal of the relevant "Tracking Number" table row when clicked
  var hidden_field = $(this).prev("input[type=hidden]")[0];
  var fields = $(this).parents(".line_item_tracking_number_fields");
  bootbox.confirm("Are you sure you want to remove this tracking number?", function(result){
    if (result === true) {
      if(hidden_field) {
        hidden_field.value = "1";
      }
      fields.remove();
    }
  });
  return false;
});

$(document).on("click", "a.add_child_line_item_tracking_number", function() {
  var association, new_id, regexp, template, prev;
  association = $(this).attr("data-association");
  template = $(this).closest(".new_task_line_item_fields").find(".tracking_numbers_fields_template").html();
  regexp = new RegExp("new_" + association, "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  basic_tooltip(".tracking_cost_tooltip", "Shipping Cost", shipping_cost_tooltip);
  basic_tooltip(".tracking_carrier_tooltip", "Shipping Carriers", shipping_carrier_tooltip);
  prev = $(this).parent().prev();
  $(this).closest(".new_task_line_item_fields").find(".trackingNumbersTopBorder").show();
  $(this).closest(".new_task_line_item_fields").find(".trackingNumbersBottomBorder").show();
  prev.find(".tracking-number-carrier-select").select2({
    theme:"bootstrap",
    placeholder: "Select Carrier...",
    selectOnClose: true,
    tags: true
  });
  prev.find(".tracking-number-ship-method-select").select2({
    theme:"bootstrap",
    placeholder: "Select Ship Method...",
    selectOnClose: true,
    dropdownCssClass: "dropdownSize",
    minimumResultsForSearch: Infinity
  });
  prev.find(".taskDefaultDatepicker").datepicker({
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

$(document).on("change", ".tracking-number-ship-method-select", function() {
  var current_line = $(this).closest(".line_item_tracking_number_fields");
  if ($(this).val() == "Snail Mail (USPS)") {
    current_line.find(".lineItemTrackingNumberCost").val("0.50");
  }
});





$(document).on("click", ".task_add_comment_button", function() {
  $(".add_child_task_comment").click();
});

$(document).on("click", ".ecomm_order_add_line_item_button", function() {
  $(this).closest(".ecomm_order_fields").find(".add_child_ecomm_order_line_item").click();
});

$(document).on("click", ".ecomm_order_add_comment_button", function() {
  $(this).closest(".ecomm_order_fields").find(".add_child_ecomm_order_comment").click();
});

$(document).on("click", ".warranty_order_add_line_item_button", function() {
  $(this).closest(".warranty_order_fields").find(".add_child_warranty_order_line_item").click();
});

$(document).on("click", ".warranty_order_add_comment_button", function() {
  $(this).closest(".warranty_order_fields").find(".add_child_warranty_order_comment").click();
});

$(document).on("click", ".line_item_add_tracking_number_button", function() {
  $(this).closest(".new_task_line_item_fields").find(".add_child_line_item_tracking_number").click();
});

$(document).on("click", ".ecomm_order_remove_button", function() {
  var fields = $(this).closest(".ecomm_order_fields");
  bootbox.confirm("Are you sure you want to remove this order?", function(result){
    if (result === true) {
      fields.find(".remove_child_ecomm_order").click();
    }
  });
});

$(document).on("click", ".warranty_order_remove_button", function() {
  var fields = $(this).closest(".warranty_order_fields");
  bootbox.confirm("Are you sure you want to remove this order?", function(result){
    if (result === true) {
      fields.find(".remove_child_warranty_order").click();
    }
  });
});

$(document).on("click", ".reference_remove_button", function() {
  var current_order = $(this).closest(".warranty_order_fields");
  bootbox.confirm("Are you sure you want to remove this order reference?", function(result){
    if (result === true) {
      current_order.find(".warrantyOrderEcommOrderSelect").val([]).trigger("change");
      current_order.find(".warranty_order_reference").hide();
      current_order.find(".warranty_order_add_reference_button").removeClass("disabled");
    }
  });
});

$(document).on("click", ".files_remove_button", function() {
  var main_div = $(this).closest(".newTaskUploadsContainer");
  bootbox.confirm("This will clear all selected files.  Are you sure?", function(result){
    if (result === true) {
      main_div.find(".new_task_upload_fields").remove();
      main_div.hide();
    }
  });
});

$(document).on("click", ".attributes_remove_button", function() {
  var current_order = $(this).closest("div[class$='order_attributes']");
  bootbox.confirm("This will clear all active attributes.  Are you sure?", function(result){
    if (result === true) {
      current_order.hide();
      current_order.find(".new_row").remove();
    }
  });
});

$(document).on("click", ".task_attributes_remove_button", function() {
  var current_order = $(this).closest(".taskAttributesContainer");
  bootbox.confirm("This will clear all active attributes.  Are you sure?", function(result){
    if (result === true) {
      current_order.hide();
      current_order.find(".new_row").remove();
    }
  });
});

$(document).on("click", ".comment_remove_button", function() {
  var fields = $(this).closest(".new_task_comment_fields");
  bootbox.confirm("Are you sure you want to remove this comment?", function(result){
    if (result === true) {
      fields.next("input[type=hidden]").remove();
      fields.remove();
    }
  });
});

$(document).on("click", ".line_item_remove_button", function() {
  var fields = $(this).closest(".new_task_line_item_fields");
  bootbox.confirm("Are you sure you want to remove this line item?", function(result){
    if (result === true) {
      fields.find(".remove_child_line_item").click();
    }
  });
});


var task_attributes_button_tooltip = "<ul>"+
                                     "  <li>Click here to add Custom Attributes.</li>"+
                                     "  <li>Custom Attributes can be used to add columns of data that aren't availablee within the existing parameters of this Task.</li>"+
                                     "  <li><b style='color:red;'>DO NOT</b> create more than one attribute with the same name. Duplicate attribute names are not allowed.  Duplicate descriptions are allowed.</li>"+
                                     "</ul>";


var task_comments_button_tooltip = "<ul>"+
                                   "  <li>Click here to add comments to this task.</li>"+
                                   "  <li>Details for this task or reminders for yourself that don't fit in any of the existing parameters can be added as a comment.</li>"+
                                   "  <li>Note that multiple comments are allowed and can be added to individual orders as well in their respective tabs.</li>"+
                                   "</ul>";

var task_files_button_tooltip = "<ul>"+
                                "  <li>Click here to add files to this task.</li>"+
                                "  <li>Most file formats are allowed.  If you come across a file that doesn't upload properly, please create a Bug Report and let Tyler know.</li>"+
                                "  <li>File uploads are permenant. If applicable, files uploaded here can later be associated with other tasks or items.</li>"+
                                "</ul>";

var ecomm_order_attributes_button_tooltip = "<ul>"+
                                            "  <li>Click here to add Custom Attributes.</li>"+
                                            "  <li>Custom Attributes can be used to add columns of data that aren't availablee within the existing parameters of this Ecomm Order.</li>"+
                                            "  <li><b style='color:red;'>DO NOT</b> create more than one attribute with the same name. Duplicate attribute names are not allowed.  Duplicate descriptions are allowed.</li>"+
                                            "  <li>Examples:"+
                                            "    <div style='display:flex;margin-top:2px;'><div class='form-control tooltip-input-example'>Requested Ship Method</div>&nbsp;&nbsp;&nbsp;<div class='form-control tooltip-input-example'>Next Day Air</div></div>"+
                                            "    <div style='display:flex;margin-top:3px;'><div class='form-control tooltip-input-example'>Email Reference</div>&nbsp;&nbsp;&nbsp;<div class='form-control tooltip-input-example'>Email timestamp here</div></div>"+
                                            "  </li>"+
                                            "</ul>";


var ecomm_order_comments_button_tooltip = "<ul>"+
                                          "  <li>Click here to add comments to this order.</li>"+
                                          "  <li>Details for this order or reminders for yourself that don't fit in any of the existing parameters can be added as a comment.</li>"+
                                          "  <li>Multiple comments are allowed.</li>"+
                                          "</ul>";

var ecomm_order_line_item_button_tooltip = "<ul>"+
                                           "  <li>Click here to select your line items for this order.</li>"+
                                           "  <li>Products: All general products.</li>"+
                                           "  <li>Parts: Parts & pieces that belong to a product (for example, a bath fan globe or Tuscany chip sample)</li>"+
                                           "  <li>Combo Items: A collection of products that belong to a single SKU (for example, the Firplak vanities)</li>"+
                                           "  <li>Multiple items can be selected for each order.</li>"+
                                           "  <li>Tracking numbers can be added via the 'Add Tracking Number' button within each Line Item.</li>"+
                                           "  <li>As of right now, there is <b style='color:red;'>NO</b> check in place to verify on-hand counts.  Please check quantities yourself until I implement this feature.</li>"+
                                           "</ul>";

var ecomm_order_ship_request_tooltip = "<ul>"+
                                       "  <li>If the Retailer has a default method of shipping, it will automatically be applied to the Ship Method Request.</li>"+
                                       "  <li>Otherwise, you can click here to add your own.</li>"+
                                       "  <li>If there is more than a one Ship Method Request per order, enter them as a Custom Attribute instead.</li>"+
                                       "</ul>";

var warranty_order_customer_tooltip = "<ul>"+
                                      "  <li>While it can't be done here, you can add custom attributes and comments to individual customers after their respective orders are created.</li>"+
                                      "  <li>You can do this by finding the customer in the Customers Table, and then editing their profile from there.</li>"+
                                      "</ul>";

var warranty_order_order_number_tooltip = "<ul>"+
                                          "  <li>Double click on the Order Number field to generate an order number.</li>"+
                                          "  <li>Order numbers are required and are generated for this site to help easily link and track orders.</li>"+
                                          "  <li>Example: <span style='color:#7ec5f3;'>'180416EFV'</span> translates to the date <span style='color:#7ec5f3;'>'2018-04-16'</span></li>"+
                                          "  <li>You may also enter your own Order Number if applicable.</li>"+
                                          "</ul>";

var warranty_order_ship_request_tooltip = "<ul>"+
                                          "  <li>If you have a requested ship method, click here to enter it below.</li>"+
                                          "  <li>Otherwise, the default is the cheapest available.</li>"+
                                          "</ul>";

var warranty_order_customer_zipcode_tooltip = "<ul>"+
                                              "  <li>Once you enter a valid Zip Code, the 'City' and 'State' fields should automatically fill in.</li>"+
                                              "  <li>Please note that we are using a free third party service for this feature and are limited to 50 requests a day, so please try to not abuse it!</li>"+
                                              "</ul>";

var warranty_order_reference_button_tooltip = "<ul>"+
                                              "  <li>Click here to add an E-Commerce Order reference to this order</li>"+
                                              "  <li>Add a reference if this Customer Order is a replacement or supplement to an existing E-Commerce order.</li>"+
                                              "</ul>";

var warranty_order_attributes_button_tooltip = "<ul>"+
                                               "  <li>Click here to add Custom Attributes.</li>"+
                                               "  <li>Custom Attributes can be used to add columns of data that aren't availablee within the existing parameters of this Customer Order.</li>"+
                                               "  <li><b style='color:red;'>DO NOT</b> create more than one attribute with the same name. Duplicate attribute names are not allowed.  Duplicate descriptions are allowed.</li>"+
                                               "  <li>Examples:"+
                                               "    <div style='display:flex;margin-top:2px;'><div class='form-control tooltip-input-example'>Paypal Invoice Number</div>&nbsp;&nbsp;&nbsp;<div class='form-control tooltip-input-example'>Number goes here</div></div>"+
                                               "    <div style='display:flex;margin-top:3px;'><div class='form-control tooltip-input-example'>Requested By</div>&nbsp;&nbsp;&nbsp;<div class='form-control tooltip-input-example'>Plumbing Manager at West Bend</div></div>"+
                                               "    <div style='display:flex;margin-top:3px;'><div class='form-control tooltip-input-example'>Email Reference</div>&nbsp;&nbsp;&nbsp;<div class='form-control tooltip-input-example'>Email timestamp here</div></div>"+
                                               "  </li>"+
                                               "</ul>";

var warranty_order_comments_button_tooltip = "<ul>"+
                                             "  <li>Click here to add comments to this order.</li>"+
                                             "  <li>Details for this order or reminders for yourself that don't fit in any of the existing parameters can be added as a comment.</li>"+
                                             "  <li>Multiple comments are allowed.</li>"+
                                             "</ul>";

var warranty_order_line_item_button_tooltip = "<ul>"+
                                              "  <li>Click here to select your line items for this order.</li>"+
                                              "  <li>Products: All general products.</li>"+
                                              "  <li>Parts: Parts & pieces that belong to a product (for example, a bath fan globe or Tuscany chip sample)</li>"+
                                              "  <li>Combo Items: A collection of products that belong to a single SKU (for example, the Firplak vanities)</li>"+
                                              "  <li>Multiple items can be selected for each order.</li>"+
                                              "  <li>Tracking numbers can be added via the 'Add Tracking Number' button within each Line Item.</li>"+
                                              "  <li>As of right now, there is <b style='color:red;'>NO</b> check in place to verify on-hand counts.  Please check quantities yourself until I implement this feature.</li>"+
                                              "</ul>";

var shipping_cost_tooltip = "<ul>"+
                            "  <li>If there are multiple tracking numbers with a single cost, only enter this cost into the first field, and keep the others at '0.00'</li>"+
                            "  <li>if you select 'Snail Mail' in the Ship Method field, the current federal postage rate will be automatically entered.</li>"+
                            "</ul>";

var shipping_carrier_tooltip = "<ul>"+
                               "  <li>If the Shipping Carrier you're looking for isn't shown, you can use the textbox in the dropdown to enter your own.</li>"+
                               "</ul>";

//------------------------------------------------------------------------------------------------------
//                          Task "EDIT" related JS                                                     |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {

  basic_tooltip(".edit_task_upload_remove_tooltip", "Mark for Deletion", "<ul><li>Check this box to remove the selected file once submitted.</li></ul>");
  basic_tooltip(".tracking_cost_tooltip", "Shipping Cost", shipping_cost_tooltip);
  basic_tooltip(".tracking_carrier_tooltip", "Shipping Carriers", shipping_carrier_tooltip);
  $(".editTaskUploadsContainer").hide();

  if ($(".editTaskContainer").find(".taskAttributesContainer").find(".row").length > 1) { // Shows the Task Attributes Container if any attributes are present
    $(".taskAttributesContainer").show();
  }
  if ($(".editTaskUploadsContainer").find(".new_task_upload_fields").length > 0) {
    $(".editTaskUploadsContainer").show();
  }

// -------------------------- ECOMM ORDER RELATED JS ----------------------------- //

  basic_tooltip(".ecommOrderCancellationReasonSelect", "Cancellation Reason", "<ul><li>Select Cancellation Reason here.</li><li>This field is required if the order is cancelled.</li></ul>");

  var ecomm_orders = $(".editEcommOrdersContainer");

  ecomm_orders.find(".ecommOrderCancellationReasonRow").find(".ecommOrderCancellationReasonSelect").hide();
  var ecommOrderStatus = ecomm_orders.find(".ecommOrderStatusSelect");
  ecommOrderStatus.each(function() { // Shows the "Select Cancellation Reason" box when "Cahcelled" is selected as a Status option
    var cellValue = $(this).find("option:selected").val();
    if (cellValue == "Cancelled") {
      $(this).closest(".ecomm_order_details").find(".ecommOrderCancellationReasonRow").find(".ecommOrderCancellationReasonSelect").show();
    }
  });


  ecomm_orders.find(".ecomm_order_attributes").each(function() { // Shows the E-Commerce Order Attributes Container if any attributes are present
     var fields = $(this);
    if ($(this).find(".row").length > 1) {
        fields.show();
    }
  });


  ecomm_orders.find(".ecommOrderCustomerName").each(function() { // Sets the Customer name in the header row for orders that already exist
    $(this).closest(".ecomm_order_fields").find(".ecomm_order_title").html("E-Commerce Order for " + $(this).val());
  });

  ecomm_orders.find(".ecommOrderRetailerSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Retailer...",
    selectOnClose: true,
    tags: true
  });
  ecomm_orders.find(".ecommOrderCarrierRequestSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Carrier...",
    selectOnClose: true,
    tags: true
  });
  ecomm_orders.find(".ecommOrderShipMethodRequestSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Ship Method...",
    selectOnClose: true
  });

  ecomm_orders.find(".new_task_line_item_fields").each(function() {
    var fields = $(this);
    if (fields.find(".trackingNumbersTopBorder").next(".line_item_tracking_number_fields").length) {
      fields.find(".trackingNumbersTopBorder").show();
      fields.find(".trackingNumbersBottomBorder").show();
    }
  });

  $(".lineItemEditProductBox").each(function() {
    var selected = $(this).closest("td").find(".edit_line_item_product_hide_tag");
    $(this).find("option[value='"+selected.attr("value")+"']").prop('selected', true).trigger("change");
    selected.val($(this).find("option:selected").val());
  });
  $(".lineItemEditPartBox").each(function() {
    var selected = $(this).closest("td").find(".edit_line_item_part_hide_tag").attr("value");
    $(this).find("option[value='"+selected+"']").prop('selected', true).trigger("change");
  });
  $(".lineItemEditComboItemBox").each(function() {
    var selected = $(this).closest("td").find(".edit_line_item_combo_item_hide_tag").attr("value");
    $(this).find("option[value='"+selected+"']").prop('selected', true).trigger("change");
  });

  ecomm_orders.find(".lineItemEditProductBox").select2({
    theme:"bootstrap",
    placeholder: "Select Product...",
    selectOnClose: true,
    allowClear: true
  }).trigger("change");
  ecomm_orders.find(".lineItemEditPartBox").select2({
    theme:"bootstrap",
    placeholder: "Select Part...",
    selectOnClose: true,
    allowClear: true
  }).trigger("change");
  ecomm_orders.find(".lineItemEditComboItemBox").select2({
    theme:"bootstrap",
    placeholder: "Select Combo Item...",
    selectOnClose: true,
    allowClear: true
  }).trigger("change");
  ecomm_orders.find(".newLineItemContainer").find(".select2-container").next(".select2-container").addClass("hidden"); // Cycles through the jstemplate to prepare all relevant box visibility on click
  ecomm_orders.find(".newLineItemContainer").find(".select2-container").addClass("hidden");

  ecomm_orders.find(".lineItemEditItemType").each(function() { // Shows the relevant Item select box depending on which "Item Type" is selected
    if ($(this).find("option:selected").val() == "Product") {
      $(this).closest("tr").find(".lineItemEditProductBox").next(".select2-container").removeClass("hidden");
    }
    if ($(this).find("option:selected").val() == "Part") {
      $(this).closest("tr").find(".lineItemEditPartBox").next(".select2-container").removeClass("hidden");
    }
    if ($(this).find("option:selected").val() == "Combo Item") {
      $(this).closest("tr").find(".lineItemEditComboItemBox").next(".select2-container").removeClass("hidden");
    }
  });

  ecomm_orders.find(".tracking-number-carrier-select.rendered").select2({
    theme:"bootstrap",
    placeholder: "Select Carrier...",
    selectOnClose: true,
    tags: true
  });
  ecomm_orders.find(".tracking-number-ship-method-select.rendered").select2({
    theme:"bootstrap",
    placeholder: "Select Ship Method...",
    selectOnClose: true,
    dropdownCssClass: "dropdownSize",
    minimumResultsForSearch: Infinity
  });


});

$(document).on("click", "#editTaskEcommOrders", function() {
  var attributes = $(".editEcommOrdersContainer").find(".orderAttributeContainer").find(".body");

  attributes.each(function() { // Sets the correct Task & Ecomm Order ID for the Ecomm Order Attributes
    var grabnum = $(this).closest(".ecomm_order_fields").next("input[type='hidden']").attr("id");

    $(this).children("input[type='hidden']").attr("name", grabnum.match(/\d+/))
                                            .attr("id", grabnum.match(/\d+/));
    $(this).children("input[type='hidden']:first-child").attr("name", "task[ecomm_orders_attributes]["+grabnum.match(/\d+/)+"][details]")
                                                        .attr("id", "task_ecomm_orders_attributes_"+grabnum.match(/\d+/)+"_details");
  });
  $("input[class$='_hide_tag']").each(function() { // Value doesn't properly appear unless this function is called
    $(this).val($(this).attr("value"));
  });
  
});

$(document).on("click", ".ecomm_order_edit_remove_button", function() {
  var fields = $(this).closest(".ecomm_order_fields");
  bootbox.confirm("Are you sure you want to remove this order?", function(result){
    if (result === true) {
      fields.find(".remove_child_ecomm_order").attr("value", "true");
      fields.hide();
      fields.find("input").prop("required", false);
      fields.find("select").prop("required", false);
    }
  });
});

$(document).on("click", ".ecomm_order_edit_add_comment_button", function() {
  $(this).closest(".ecomm_order_fields").find(".add_child_ecomm_order_edit_comment").click();
});


$(document).on("click", "a.add_child_ecomm_order_edit_comment", function() {
  var new_id, regexp, regexp2, template, grabnum;
  template = $(this).closest(".editEcommOrdersContainer").find(".comments_fields_template").html();
  regexp = new RegExp("new_comments", "g");
  regexp2 = new RegExp("new_ecomm_order", "g");
  new_id = (new Date).getTime();
  grabnum = $(this).closest(".ecomm_order_fields").next("input[type='hidden']").attr("id");
  $(this).parent().before(template.replace(regexp, new_id).replace(regexp2, grabnum.match(/\d+/)));
  return false;
});

$(document).on("click", ".ecomm_order_comment_edit_remove_button", function() {
  var fields = $(this).closest(".new_task_comment_fields");
  bootbox.confirm("Are you sure you want to remove this comment?", function(result){
    if (result === true) {
      fields.find(".remove_child_ecomm_order_edit_comment").attr("value", "true");
      fields.hide();
    }
  });
});

$(document).on("click", ".line_item_edit_remove_button", function() {
  var fields = $(this).closest(".new_task_line_item_fields");
  bootbox.confirm("Are you sure you want to remove this line item?", function(result){
    if (result === true) {
      fields.find(".remove_child_edit_line_item").attr("value", "true");
      fields.hide();
    }
  });
});

$(document).on("click", ".tracking_number_individual_remove_button", function() {
  var fields = $(this).closest(".line_item_tracking_number_fields");
  bootbox.confirm("Are you sure you want to remove this tracking number?", function(result){
    if (result === true) {
      fields.find(".remove_child_line_item_edit_tracking_number").attr("value", "true");
      fields.hide();
    }
  });
});

$(document).on("change", ".lineItemEditItemType", function() { // Enables or disables the relevant Item's dialog box depending on which Item Type is selected
  var tr = $(this).closest("tr");
  if ($(this).find("option:selected").text() == "Combo Item") {
    tr.find(".lineItemEditProductBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemEditPartBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemEditComboItemBox").next(".select2-container").removeClass("hidden");
    tr.find(".lineItemQuantityBox").val(1);
  }
  if ($(this).find("option:selected").text() == "Product") {
    tr.find(".lineItemEditComboItemBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemEditPartBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemEditProductBox").next(".select2-container").removeClass("hidden");
    tr.find(".lineItemQuantityBox").val(1);
  }
  if ($(this).find("option:selected").text() == "Part") {
    tr.find(".lineItemEditComboItemBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemEditProductBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemEditPartBox").next(".select2-container").removeClass("hidden");
    tr.find(".lineItemQuantityBox").val(1);
  }
  if ($(this).find("option:selected").text() == "Select Item Type...") {
    tr.find(".lineItemEditComboItemBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemEditProductBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemEditPartBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".lineItemQuantityBox").val(1);
  }
});

$(document).on("change", ".lineItemEditProductBox", function() { // Sets the non-selected Item's box value to NIL if it is not selected
  var tr = $(this).closest("td");
  tr.find(".edit_line_item_product_hide_tag").val($(this).find("option:selected").val());
  tr.find(".edit_line_item_part_hide_tag").val([]);
  tr.find(".edit_line_item_combo_item_hide_tag").val([]);
});

$(document).on("change", ".lineItemEditPartBox", function() {
  var tr = $(this).closest("td");
  tr.find(".edit_line_item_product_hide_tag").val([]);
  tr.find(".edit_line_item_part_hide_tag").val($(this).find("option:selected").val());
  tr.find(".edit_line_item_combo_item_hide_tag").val([]);
});

$(document).on("change", ".lineItemEditComboItemBox", function() {
  var tr = $(this).closest("td");
  tr.find(".edit_line_item_product_hide_tag").val([]);
  tr.find(".edit_line_item_part_hide_tag").val([]);
  tr.find(".edit_line_item_combo_item_hide_tag").val($(this).find("option:selected").val());
});

$(document).on("click", ".line_item_edit_add_tracking_number_button", function() {
  $(this).closest(".new_task_line_item_fields").find(".add_child_line_item_edit_tracking_number").click();
});

$(document).on("click", "a.add_child_line_item_edit_tracking_number", function() {
  var association, new_id, regexp, regexp2, regexp3, grabnum, grabnum2, template, prev;
  association = $(this).attr("data-association");
  template = $(this).closest(".new_task_line_item_fields").find(".tracking_numbers_fields_template").html();
  regexp = new RegExp("new_" + association, "g");
  regexp2 = new RegExp("new_ecomm_order", "g");
  regexp3 = new RegExp("new_line_item", "g");
  new_id = (new Date).getTime();
  grabnum = $(this).closest("div[class$='_order_fields']").next("input[type='hidden']").attr("id");
  grabnum2 = $(this).closest(".new_task_line_item_fields").next("input[type='hidden']").attr("id");
  $(this).parent().before(template.replace(regexp, new_id).replace(regexp2, grabnum.match(/\d+/)).replace(regexp3, grabnum2.match(/\d+/g)[1]));
  basic_tooltip(".tracking_cost_tooltip", "Shipping Cost", shipping_cost_tooltip);
  basic_tooltip(".tracking_carrier_tooltip", "Shipping Carriers", shipping_carrier_tooltip);
  prev = $(this).parent().prev();
  $(this).closest(".new_task_line_item_fields").find(".trackingNumbersTopBorder").show();
  $(this).closest(".new_task_line_item_fields").find(".trackingNumbersBottomBorder").show();
  prev.find(".tracking-number-carrier-select").select2({
    theme:"bootstrap",
    placeholder: "Select Carrier...",
    selectOnClose: true,
    tags: true
  });
  prev.find(".tracking-number-ship-method-select").select2({
    theme:"bootstrap",
    placeholder: "Select Ship Method...",
    selectOnClose: true,
    dropdownCssClass: "dropdownSize",
    minimumResultsForSearch: Infinity
  });
  prev.find(".taskDefaultDatepicker").datepicker({
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

// -------------------------- WARRANTY ORDER RELATED JS ---------------------------//

$(document).on("turbolinks:load", function() {

  basic_tooltip(".warrantyOrderCancellationReasonSelect", "Cancellation Reason", "<ul><li>Select Cancellation Reason here.</li><li>This field is required if the order is cancelled.</li></ul>");

  var warranty_orders = $(".editWarrantyOrdersContainer");
  
  warranty_orders.find(".warrantyOrderCancellationReasonRow").find(".warrantyOrderCancellationReasonSelect").hide();
  var warrantyOrderStatus = warranty_orders.find(".warrantyOrderStatusSelect");
  warrantyOrderStatus.each(function() { // Shows the "Select Cancellation Reason" box when "Cahcelled" is selected as a Status option
    var cellValue = $(this).find("option:selected").val();
    if (cellValue == "Cancelled") {
      $(this).closest(".warranty_order_details").find(".warrantyOrderCancellationReasonRow").find(".warrantyOrderCancellationReasonSelect").show();
    }
  });

  warranty_orders.find(".warranty_order_attributes").each(function() { // Shows the E-Commerce Order Attributes Container if any attributes are present
     var fields = $(this);
    if ($(this).find(".row").length > 1) {
        fields.show();
    }
  });

  warranty_orders.find(".warrantyOrderCustomerFirstName").each(function() { // Sets the Customer name in the header row for orders that already exist
    var fields = $(this).closest(".warranty_order_fields");
    fields.find(".warranty_order_title").html("Customer Order for " + $(this).val() + " " + fields.find(".warrantyOrderCustomerLastName").val());
  });

  warranty_orders.find(".warrantyOrderCarrierRequestSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Carrier...",
    selectOnClose: true,
    tags: true
  });
  warranty_orders.find(".warrantyOrderShipMethodRequestSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Ship Method...",
    selectOnClose: true
  });
  warranty_orders.find(".phone_mask").inputmask({"mask": "(999) 999-9999"});
  warranty_orders.find("select[id$='customer_attributes_country']").select2({
    theme: "bootstrap",
    placeholder: "Select Country...",
    selectOnClose: true
  });
  warranty_orders.find(".warrantyOrderCustomerState").select2({
    theme: "bootstrap",
    selectOnClose: true
  });

  warranty_orders.find(".new_task_line_item_fields").each(function() {
    var fields = $(this);
    if (fields.find(".trackingNumbersTopBorder").next(".line_item_tracking_number_fields").length) {
      fields.find(".trackingNumbersTopBorder").show();
      fields.find(".trackingNumbersBottomBorder").show();
    }
  });

  warranty_orders.find(".lineItemEditProductBox").select2({
    theme:"bootstrap",
    placeholder: "Select Product...",
    selectOnClose: true,
    allowClear: true
  }).trigger("change");
  warranty_orders.find(".lineItemEditPartBox").select2({
    theme:"bootstrap",
    placeholder: "Select Part...",
    selectOnClose: true,
    allowClear: true
  }).trigger("change");
  warranty_orders.find(".lineItemEditComboItemBox").select2({
    theme:"bootstrap",
    placeholder: "Select Combo Item...",
    selectOnClose: true,
    allowClear: true
  }).trigger("change");
  warranty_orders.find(".newLineItemContainer").find(".select2-container").next(".select2-container").addClass("hidden"); // Cycles through the jstemplate to prepare all relevant box visibility on click
  warranty_orders.find(".newLineItemContainer").find(".select2-container").addClass("hidden");

  warranty_orders.find(".lineItemEditItemType").each(function() { // Shows the relevant Item select box depending on which "Item Type" is selected
    if ($(this).find("option:selected").val() == "Product") {
      $(this).closest("tr").find(".lineItemEditProductBox").next(".select2-container").removeClass("hidden");
    }
    if ($(this).find("option:selected").val() == "Part") {
      $(this).closest("tr").find(".lineItemEditPartBox").next(".select2-container").removeClass("hidden");
    }
    if ($(this).find("option:selected").val() == "Combo Item") {
      $(this).closest("tr").find(".lineItemEditComboItemBox").next(".select2-container").removeClass("hidden");
    }
  });

  warranty_orders.find(".tracking-number-carrier-select.rendered").select2({
    theme:"bootstrap",
    placeholder: "Select Carrier...",
    selectOnClose: true,
    tags: true
  });
  warranty_orders.find(".tracking-number-ship-method-select.rendered").select2({
    theme:"bootstrap",
    placeholder: "Select Ship Method...",
    selectOnClose: true,
    dropdownCssClass: "dropdownSize",
    minimumResultsForSearch: Infinity
  });
  warranty_orders.find(".taskDefaultDatepicker").datepicker({
    format: "yyyy-mm-dd",
    clearBtn: true,
    autoclose: true,
    startView: 0,
    maxViewMode: 2,
    todayBtn: true,
    todayHighlight: true,
    orientation: "bottom"
  });


});

$(document).on("click", "#editTaskWarrantyOrders", function() {
  var attributes = $(".editWarrantyOrdersContainer").find(".orderAttributeContainer").find(".body");

  attributes.each(function() { // Sets the correct Task & Warranty Order ID for the Warranty Order Attributes
    var grabnum = $(this).closest(".warranty_order_fields").next("input[type='hidden']").attr("id");

    $(this).children("input[type='hidden']").attr("name", grabnum.match(/\d+/))
                                            .attr("id", grabnum.match(/\d+/));
    $(this).children("input[type='hidden']:first-child").attr("name", "task[warranty_orders_attributes]["+grabnum.match(/\d+/)+"][details]")
                                                        .attr("id", "task_warranty_orders_attributes_"+grabnum.match(/\d+/)+"_details");
  });
  $("input[class$='_hide_tag']").each(function() { // Value doesn't properly appear unless this function is called
    $(this).val($(this).attr("value"));
  });
});

$(document).on("click", ".warranty_order_edit_add_comment_button", function() {
  $(this).closest(".warranty_order_fields").find(".add_child_warranty_order_edit_comment").click();
});


$(document).on("click", "a.add_child_warranty_order_edit_comment", function() {
  var new_id, regexp, regexp2, template, grabnum;
  template = $(this).closest(".editWarrantyOrdersContainer").find(".comments_fields_template").html();
  regexp = new RegExp("new_comments", "g");
  regexp2 = new RegExp("new_warranty_order", "g");
  new_id = (new Date).getTime();
  grabnum = $(this).closest(".warranty_order_fields").next("input[type='hidden']").attr("id");
  $(this).parent().before(template.replace(regexp, new_id).replace(regexp2, grabnum.match(/\d+/)));
  return false;
});

$(document).on("click", ".warranty_order_edit_remove_button", function() {
  var fields = $(this).closest(".warranty_order_fields");
  bootbox.confirm("Are you sure you want to remove this order?", function(result){
    if (result === true) {
      fields.find(".remove_child_warranty_order").attr("value", "true");
      fields.hide();
      fields.find("input").prop("required", false);
      fields.find("select").prop("required", false);
    }
  });
});

$(document).on("click", ".warranty_order_comment_edit_remove_button", function() {
  var fields = $(this).closest(".new_task_comment_fields");
  bootbox.confirm("Are you sure you want to remove this comment?", function(result){
    if (result === true) {
      fields.find(".remove_child_warranty_order_edit_comment").attr("value", "true");
      fields.hide();
    }
  });
});
















$(document).on("click", "#editTaskFirstSubmit", function(e) {
  e.preventDefault();
  $('input:invalid, select:invalid').each(function () {
    // Find the tab-pane that this element is inside, and get the id
    var id = $(this).closest('.tab-pane').attr('id');
    // Find the link that corresponds to the pane and have it show
    $('.nav li a[href="#' + id + '"]').addClass("invalidPulse");
    return false;
  });
  var tr = $(".body").find("tr").length;
  if (tr > 1) {
    $(".hide-tag").remove();
  }
  $(".ecomm_orders_fields_template").html("");
  $(".warranty_orders_fields_template").html("");
  $(".line_items_fields_template").html("");
  $(".tracking_numbers_fields_template").html("");
  $("#editTaskSubmitButton").click();
});

//------------------------------------------------------------------------------------------------------
//                               Task "SHOW" related JS                                                |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function () {
  if ($("select[id*='OrderSelect']").attr("size") > 3) {
    $(".show_task_order_fields[id*='_order_number-']").hide();
  }
  $(".hidden_user_list span").each(function() { // Sets the correct Users Profile Name for the "Initiated By/For" column
    $(".task_initiated_id[id='" + $(this).attr("id") + "']").text( $(this).text() );
  });

  $("select[id*='OrderSelect'] option").each(function() { // Adds colored background to the dropdown for Order Selection
    if ($(this).attr("status") == "New") {
      $(this).addClass("order_status_new");
    }
    if ($(this).attr("status") == "Open") {
      $(this).addClass("order_status_open");
    }
    if ($(this).attr("status") == "Completed") {
      $(this).addClass("order_status_completed");
    }
    if ($(this).attr("status") == "Cancelled") {
      $(this).addClass("order_status_cancelled");
    }
  });
  
  $(".show_order_status").each(function() {
    var field = $(this);
    var cellValue = $(this).html();
    if (cellValue == "New") {
      $(this).parent().addClass("order_status_new");
    }
    if (cellValue == "Open") {
      $(this).parent().addClass("order_status_open");
    }
    if (cellValue == "Completed") {
      $(this).parent().addClass("order_status_completed");
    }
    if (cellValue == "Cancelled") {
      $(this).parent().addClass("order_status_cancelled");
    }
  });

  $("select[id*='OrderSelect']").on("change", function() {
    var selected = $("option:selected", this).val();
    $(".show_task_order_fields[id*='_order_number-']").hide();
    $(".show_task_order_fields[id*='_order_number-"+selected+"']").show();
    if (selected == "-1") {
      $(".show_task_order_fields[id*='_order_number-']").show();
    }
  });
});

//------------------------------------------------------------------------------------------------------
//                               Task "INDEX" related JS                                               |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  setTimeout(function(){ // Hacky way to fix the "Individual" tables header columns.  Used in conjunction with the hidden "#ihHackFixButton" below
  $("#tasksHackFixButton").click();},200);
  // Function to add a leading zero to dates between 1-9
  var MyDate = new Date();
  var date;
  MyDate.setDate(MyDate.getDate());
  date = MyDate.getFullYear() + "-" + ("0" + (MyDate.getMonth()+1)).slice(-2) + "-" + ("0" + MyDate.getDate()).slice(-2);
  // var child_columns = $(".taskTableChildren").data("child-columns"); // Employees & Vendors have a different set of columns visible to them adjusted via the ProductTableChildren div on index.html.erb
  var table = $("#tasksDataTable").DataTable({
                // fixedHeader: { headerOffset: 56 },
                "scrollX": true,
                "scrollY": "75vh",
                "scrollCollapse": true,
                // "products-toolbar" = "top_toobar" function below. "B" = Buttons. "top-row paginate" = Parent class to help with adding CSS to Pagination controls. "t" = The Table. "bottom-row paginate ip" = "Showing x of x" and Pagination controls.
                "dom": "<'tasks-toolbar'>B<'top-row paginate'p>t<'bottom-row paginate'ip>",
                "buttons": [
                  // Standard Column Visibility Button that lists all columns.  ".noVis" is disabled via CSS in Application.scss because the ":not" method doesn"t work here
                  {extend: "colvis", restore: "Revert", text: "<i class='fa fa-wrench' aria-hidden='true'></i> Columns <span class='caret'></span>", className: "btn btn-header taskColumnsButton"},

                  {extend: "collection", text: "<i class='fa fa-download' aria-hidden='true'></i> Export <span class='caret'></span>", className: "btn btn-header dtExportOptions",
                    buttons: [

                      {extend: "excelHtml5",
                        text: "<i class='fa fa-file-excel-o' aria-hidden='true'></i> Excel",
                        title: "SRS Task Report, "+date+".xlsx",
                        // customize:
                        //   // Custom function to set the header row green and outlined.
                        //   function( xlsx ) {
                        //     var sheet = xlsx.xl.worksheets["sheet1.xml"];
                        //     $("row c[r*='2']", sheet).attr( "s", "42" );
                        //   },
                        // Only exports columns that are currently visible.  Adjusted by the "Visibility" dropdown and Filtered text.
                        exportOptions: { columns: ":visible" },
                        className: "btn"
                      },

                      {extend: "pdfHtml5",
                        text: "<i class='fa fa-file-pdf-o' aria-hidden='true'></i> PDF",
                        title: "SRS Task Report, "+date+".pdf",
                        exportOptions: {columns: ":visible"},
                        className: "btn"},

                      {extend: "print",
                        text: "<i class='fa fa-print' aria-hidden='true'></i> Print",
                        exportOptions: {columns: ":visible"},
                        className: "btn"},

                      {extend: "copyHtml5",
                        text: "<i class='fa fa-copy' aria-hidden='true'></i> Copy",
                        exportOptions: {columns: ":visible"},
                        className: "btn"},
                    ]
                  }
                ],
                "bJQueryUI": true,
                "columnDefs": [
                  {
                  "targets": [6,7,8,9,10],
                  "visible": false,
                  },
                  {
                  "targets": [0,2,3,4],
                  "orderable": false
                  }
                ],
                "order": [[1, "desc"]],
                "oLanguage": {"sZeroRecords": "No tasks to display for this view"}
              });
              
  table.page.len(50000).draw();
  
  function top_toolbar (top_toolbar) {return top_toolbar; }

  var children = $(".taskTableChildren");
  $("div.tasks-toolbar").html(top_toolbar(children.data("child-top_toolbar")));
  $("#taskTableSearch").addClear();
  $("#taskTableSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });

  // Reduces the amount of text displayed for this particular item in the Columns Dropdown
  $(".taskColumnsButton").one("click", function() {
    $(table.buttons()[0].inst.s.buttons[0].conf._collection).find('a:nth-child(4) span').text("Orders Summary");
  });

  $(document).on("click", ".taskDateRangeFilter", function (e) {
    e.stopPropagation(); // Stops the Filter Menu from closing when an interior option is clicked
  });
  $(document).on("click", ".taskTypeFilter", function (e) {
    e.stopPropagation();
  });
  $(document).on("click", ".taskStatusFilter", function (e) {
    e.stopPropagation();
  });
  $(document).on("click", ".taskAssignedForFilter", function (e) {
    e.stopPropagation();
  });
  $(document).on("click", ".taskAssignedByFilter", function (e) {
    e.stopPropagation();
  });
  $(".taskTypeFilterMenu").on("change", function() {
    var types = $("input:checkbox[name='type']:checked").map(function() {
      return "^" + this.value + ".*\$";
      }).get().join("|");
    if (types === "") {
      table.column(7).search("xxxxxxxxxx").draw();
    }
    else
      table.column(7).search(types, true, false, false).draw();
  });
  $(".taskStatusFilterMenu").on("change", function() {
    var status = $("input:checkbox[name='status']:checked").map(function() {
      return "^" + this.value + ".*\$";
      }).get().join("|");
    if (status === "") {
      table.column(2).search("xxxxxxxxxx").draw();
    }
    else
      table.column(2).search(status, true, false, false).draw();
  });
  $(".taskAssignedForFilterMenu").on("change", function() {
    var assigned_for = $("input:checkbox[name='assigned_for']:checked").map(function() {
      return "^" + this.value + ".*\$";
      }).get().join("|");
    if (assigned_for === "") {
      table.column(9).search("xxxxxxxxxx").draw();
    }
    else
      table.column(9).search(assigned_for, true, false, false).draw();
  });
  $(".taskAssignedByFilterMenu").on("change", function() {
    var assigned_by = $("input:checkbox[name='assigned_by']:checked").map(function() {
      return "^" + this.value + ".*\$";
      }).get().join("|");
    if (assigned_by === "") {
      table.column(10).search("xxxxxxxxxx").draw();
    }
    else
      table.column(10).search(assigned_by, true, false, false).draw();
  });

  $(".input-daterange").datepicker({
      format: "yyyy-mm-dd",
      clearBtn: true,
      startView: 1,
      maxViewMode: 2,
      todayBtn: true,
      todayHighlight: true
  });
  $(document).on("click", ".taskDateRangeFilter", function() {
    $.fn.dataTableExt.afnFiltering.push( // Used for the "Filter By Date" Function
      function( oSettings, aData, iDataIndex ) {
        if(oSettings.nTable.id == "tasksDataTable"){
          var startDate = $("#taskDateRangeFilterStartDate").val();
          var endDate = $("#taskDateRangeFilterEndDate").val();
          var iStartDateCol = 8; // Column where the filtering takes place
          var iEndDateCol = 8;
          startDate=startDate.substring(0,4) + startDate.substring(5,7)+ startDate.substring(8,10); // 0,4 = yyyyy 5,7 = dd 8,10 = dd == yyyy-mm-dd
          endDate=endDate.substring(0,4) + endDate.substring(5,7)+ endDate.substring(8,10);
          var datofini=aData[iStartDateCol].substring(0,4) + aData[iStartDateCol].substring(5,7)+ aData[iStartDateCol].substring(8,10);
          var datoffin=aData[iEndDateCol].substring(0,4) + aData[iEndDateCol].substring(5,7)+ aData[iEndDateCol].substring(8,10);
          if ( startDate == "" && endDate == "" ) { return true }
          else if ( startDate <= datofini && endDate == "") { return true }
          else if ( endDate >= datoffin && startDate == "") { return true }
          else if (startDate <= datofini && endDate >= datoffin) { return true }
          return false;
        }
        return true;
      }
    );
  });
  $("#taskDateRangeFilterStartDate").on("change keyup", function() { table.draw(); });
  $("#taskDateRangeFilterEndDate").on("change keyup", function() { table.draw(); });

  $("input:checkbox").change(function(){ // Takes care of the non-dataTables specific menu styling
    if($(this).is(":checked"))
      $(this).parent().parent().addClass("selected");
    else
      $(this).parent().parent().removeClass("selected");
  });

  $("#taskTableSearch").keyup(function(){
    table.search($(this).val()).draw();
  });
  $("#taskTableLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw();
  });

  function format (expando) {
    return expando;
  }

  $("#tasksDataTable").on("click", "td.details-control", function() {
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
      row.child(format(tr.data("child-expando")), "no-padding").show();
      tr.addClass("shown");
      $("div.glider", row.child()).slideDown();
    }
  });

  $("#tasksHackFixButton").on("click", function(){
    table.page.len(50).draw(); // Fixes header column width issues
  });

  $(".order_status").each(function() {
    var field = $(this);
    var cellValue = $(this).children(".order_status_value").html();
    if (cellValue == "New") {
      field.parent().addClass("order_status_new");
    }
    if (cellValue == "Open") {
      field.parent().addClass("order_status_open");
    }
    if (cellValue == "Completed") {
      field.parent().addClass("order_status_completed");
    }
    if (cellValue == "Cancelled") {
      field.parent().addClass("order_status_cancelled");
      basic_tooltip(field.find(".order_status_value"), "Cancellation Reason", "<ul><li>"+field.find(".cancellation_reason_grab").html()+".</li></ul>");
    }
  });

  $(".task_status").each(function() {
    var cellValue = $(this).html();
    if (cellValue == "Pending") {
      $(this).addClass("order_status_new");
    }
    if (cellValue == "Accepted") {
      $(this).addClass("order_status_open");
    }
    if (cellValue == "Completed") {
      $(this).addClass("order_status_completed");
    }
  });

  $(".task_type_hidden").each(function() {
    var cellValue = $(this).html();
    if (cellValue == "E-Commerce Orders") {
      $(this).closest("td").addClass("order_type_ecomm");
      $(this).closest("tr").find(".details-control").addClass("order_type_ecomm");
    }
    if (cellValue == "Customer Orders") {
      $(this).closest("td").addClass("order_type_customer");
      $(this).closest("tr").find(".details-control").addClass("order_type_customer");
    }
  });

  $(".modal-tr.commentExists").each(function() { // Hides the "View Order Comments" button when no comments are present for any orders
    $(this).closest(".modal-body").prev().removeClass("commentHeaderHidden");
    $(this).closest(".modal-body").parent().removeClass("commentHeaderHidden");
    $(this).closest("td").find("button").removeClass("commentHidden");
    $(this).closest("td").find("div").removeClass("commentHidden");
  });

  $(".task_file_upload_tooltip").each(function() {
    basic_tooltip($(this), $(this).attr("description"), "<ul><li>"+$(this).attr("file-size")+"</li></ul>");
  });

});
