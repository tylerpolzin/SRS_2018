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
  
  $("#addWarrantyOrderButton").on("click", function() { // Secondary button that clicks the hidden "Add Item" button.  Required due to Helper parameters.
    $(".add_child_warranty_order").click();
    $(".newWarrantyOrdersContainer").find(".initialBlankDiv").hide();
  });

  $(".task_add_file_button").on("click", function() {
    $(".add_child_new_task_upload").click();
    $(".newTaskUploadsContainer").show();
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

$(document).on("dblclick", ".orderNumberClick", function() {
  var letters = ["A", "B", "C", "E", "F", "G", "H", "J", "K", "M", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];
  var letter = letters[Math.floor(Math.random() * letters.length)];
  var letter2 = letters[Math.floor(Math.random() * letters.length)];
  var letter3 = letters[Math.floor(Math.random() * letters.length)];
  var MyDate = new Date();
  MyDate.setDate(MyDate.getDate());
  var date = MyDate.getFullYear().toString().substr(-2) + ("0" + (MyDate.getMonth()+1)).slice(-2) + ("0" + MyDate.getDate()).slice(-2);
  $(this).val(date+letter+letter2+letter3);
});


$(document).on("click", "a.remove_child_new_task_upload", function() { // Triggers the removal of the relevant "Item Select" table row when clicked
  var hidden_field = $(this).prev("input[type=hidden]")[0];
  if(hidden_field) {
    hidden_field.value = "1";
  }
  if ($(this).closest(".newTaskUploadsContainer").children("div").length == 4) {
    $(".newTaskUploadsContainer").hide();
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
  prev.find(".ecommOrderRetailerSelect").select2({
    theme:"bootstrap",
    placeholder: "Select Retailer...",
    selectOnClose: true,
    tags: true
  });
  prev.find(".ecommOrderOrderDate").datepicker({
    format: "yyyy-mm-dd",
    clearBtn: true,
    autoclose: true,
    startView: 0,
    maxViewMode: 2,
    todayBtn: true,
    todayHighlight: true,
    orientation: "bottom"
  });
  prev.find(".ecommOrderDueDate").datepicker({
    format: "yyyy-mm-dd",
    clearBtn: true,
    autoclose: true,
    startView: 0,
    maxViewMode: 2,
    todayBtn: true,
    todayHighlight: true,
    orientation: "bottom"
  });
  prev.find(".ecommOrderCompletionDate").datepicker({
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
  basic_tooltip(".ecomm_order_remove_button", "Remove this Order", "<li>Deletes the selected order</li>");
  return false;
});

$(document).on("change", ".ecommOrderStatusSelect", function() {
  var cancel_row = $(this).closest(".ecomm_order_fields").find(".ecommOrderCancellationReasonRow");
  if ($(this).find("option:selected").val() == "New") {
    cancel_row.find(".ecommOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.hide();
    cancel_row.find(".ecommOrderActiveBoolean").val("true");
  }
  if ($(this).find("option:selected").val() == "Open") {
    cancel_row.find(".ecommOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.hide();
    cancel_row.find(".ecommOrderActiveBoolean").val("true");
  }
  if ($(this).find("option:selected").val() == "Completed") {
    cancel_row.find(".ecommOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.hide();
    cancel_row.find(".ecommOrderActiveBoolean").val("false");
  }
  if ($(this).find("option:selected").val() == "Cancelled") {
    cancel_row.find(".ecommOrderCancellationReasonSelect").prop("required", true);
    cancel_row.show();
    cancel_row.find(".ecommOrderActiveBoolean").val("false");
  }
});

$(document).on("click", "a.remove_child_warranty_order", function() { // Triggers the removal of the relevant "Item Select" table row when clicked
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
  prev.find(".warrantyOrderDueDate").datepicker({
    format: "yyyy-mm-dd",
    clearBtn: true,
    autoclose: true,
    startView: 0,
    maxViewMode: 2,
    todayBtn: true,
    todayHighlight: true,
    orientation: "bottom"
  });
  prev.find(".warrantyOrderCompletionDate").datepicker({
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
  basic_tooltip(".warranty_order_remove_button", "Remove this Order", "<li>Deletes the selected order</li>");
  basic_tooltip(".warranty_order_customer_tooltip", "Customer Details", warranty_order_customer_tooltip, "right");
  basic_tooltip(".warranty_order_customer_zipcode_tooltip", "Zip Code Select", warranty_order_customer_zipcode_tooltip, "right");
  basic_tooltip(".warranty_order_order_number_tooltip", "Order Number", warranty_order_order_number_tooltip, "right");
  return false;
});

$(document).on("change", ".warrantyOrderStatusSelect", function() {
  var cancel_row = $(this).closest(".warranty_order_fields").find(".warrantyOrderCancellationReasonRow");
  if ($(this).find("option:selected").val() == "New") {
    cancel_row.find(".warrantyOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.hide();
    cancel_row.find(".warrantyOrderActiveBoolean").val("true");
  }
  if ($(this).find("option:selected").val() == "Open") {
    cancel_row.find(".warrantyOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.hide();
    cancel_row.find(".warrantyOrderActiveBoolean").val("true");
  }
  if ($(this).find("option:selected").val() == "Completed") {
    cancel_row.find(".warrantyOrderCancellationReasonSelect").val("").prop("required", false);
    cancel_row.hide();
    cancel_row.find(".warrantyOrderActiveBoolean").val("false");
  }
  if ($(this).find("option:selected").val() == "Cancelled") {
    cancel_row.find(".warrantyOrderCancellationReasonSelect").prop("required", true);
    cancel_row.show();
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
				var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians";
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
    selectOnClose: true
  });
  prev.find(".lineItemPartBox").select2({
    theme:"bootstrap",
    placeholder: "Select Part...",
    selectOnClose: true
  });
  prev.find(".lineItemComboItemBox").select2({
    theme:"bootstrap",
    placeholder: "Select Combo Item...",
    selectOnClose: true
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
  var parent_container = $(this).closest(".new_task_line_item_fields");
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
  prev.find(".tracking-number-ship-date-datepicker").datepicker({
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
    current_line.find(".lineItemTrackingNumberCost").val("0.50")
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

$(document).on("click", ".ecomm_order_edit_add_comment_button", function() {
  $(this).closest(".ecomm_order_fields").find(".add_child_ecomm_order_edit_comment").click();
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

var warranty_order_customer_zipcode_tooltip = "<ul>"+
                                              "  <li>Once you enter a valid Zip Code, the 'City' and 'State' fields should automatically fill in.</li>"+
                                              "  <li>Please note that we are using a free third party service for this feature and are limited to 50 requests a day, so please try to not abuse this field!</li>"+
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
  $(".ecommOrderCancellationReasonRow").hide();
  var attributeContainer = $(".editTaskContainer").find(".taskAttributesContainer");
  if (attributeContainer.find(".row").length > 1) {
    $(".taskAttributesContainer").show();
  }
  var ecommOrderContainer = $(".editEcommOrdersContainer").find(".ecomm_order_fields");
  if (ecommOrderContainer.length > 0) {
    ecommOrderContainer.prev(".initialBlankDiv").hide();
  }
  $(".editEcommOrdersContainer").find(".ecommOrderCustomerName").each(function() {
    $(this).closest(".ecomm_order_fields").find(".ecomm_order_title").html("E-Commerce Order for " + $(this).val());
  });
  
  $(".editEcommOrdersContainer").find(".ecomm_order_fields").each(function() {
    if ($(".ecomm_order_attributes").find(".row").length > 1) {
        $("div[class$='OrderAttributesContainer']").find("div[class$='order_attributes']").show();
    }
  });


  var ecommOrderStatus = $(".editEcommOrdersContainer").find(".ecommOrderStatusSelect");
  ecommOrderStatus.each(function() {
    var cellValue = $(this).find("option:selected").val();
    if (cellValue == "Cancelled") {
      $(this).closest(".ecomm_order_details").find(".ecommOrderCancellationReasonRow").show();
    }
  });
  
  basic_tooltip(".edit_task_upload_remove_tooltip", "Mark for Deletion", "Check this box to remove the selected file once the 'Submit Edits' button is pressed.");
  
});

$(document).on("click", "#editTaskEcommOrders", function() {
  var template = $(".editEcommOrdersContainer").find(".orderAttributeContainer").find(".body");
  
  template.each(function() {
    var grabnum = $(this).closest(".ecomm_order_fields").next("input[type='hidden']").attr("id");
    $(this).children("input[type='hidden']").attr("name", grabnum.match(/\d+/))
                                            .attr("id", grabnum.match(/\d+/));
    $(this).children("input[type='hidden']:first-child").attr("name", "task[ecomm_orders_attributes]["+grabnum.match(/\d+/)+"][details]")
                                                        .attr("id", "task_ecomm_orders_attributes_"+grabnum.match(/\d+/)+"_details");
  console.log(grabnum);
  });
  

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

$(document).on("click", ".ecomm_order_edit_remove_button", function() {
  var fields = $(this).closest(".ecomm_order_fields");
  bootbox.confirm("Are you sure you want to remove this order?", function(result){
    if (result === true) {
      fields.find(".remove_child_ecomm_order_edit").attr("value", "true");
      fields.hide();
      fields.find("input").prop("required", false);
      fields.find("select").prop("required", false);
    }
  });
});


$(document).on("click", ".comment_edit_remove_button", function() {
  var fields = $(this).closest(".new_task_comment_fields");
  bootbox.confirm("Are you sure you want to remove this comment?", function(result){
    if (result === true) {
      fields.find(".remove_child_ecomm_order_edit_comment").attr("value", "true");
      fields.hide();
    }
  });
});



//------------------------------------------------------------------------------------------------------
//                               Task "INDEX" related JS                                               |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  setTimeout(function(){ // Hacky way to fix the "Individual" tables header columns.  Used in conjunction with the hidden "#ihHackFixButton" below
  $("#tasksHackFixButton").click();},200);
  // // Function to add a leading zero to dates between 1-9
  // var MyDate = new Date();
  // var date;
  // MyDate.setDate(MyDate.getDate());
  // date = MyDate.getFullYear() + "-" + ("0" + (MyDate.getMonth()+1)).slice(-2) + "-" + ("0" + MyDate.getDate()).slice(-2);
  // var child_columns = $(".productTableChildren").data("child-columns"); // Employees & Vendors have a different set of columns visible to them adjusted via the ProductTableChildren div on index.html.erb
  var table = $("#tasksDataTable").DataTable({
                // fixedHeader: { headerOffset: 56 },
                "scrollX": true,
                "scrollY": "75vh",
                "scrollCollapse": true,
                "colReorder": true,
                // "products-toolbar" = "top_toobar" function below. "B" = Buttons. "top-row paginate" = Parent class to help with adding CSS to Pagination controls. "t" = The Table. "bottom-row paginate ip" = "Showing x of x" and Pagination controls.
                "dom": "<'tasks-toolbar'>B<'top-row paginate'p>t<'bottom-row paginate'ip>",
                // "buttons": [
                //   // Standard Column Visibility Button that lists all columns.  ".noVis" is disabled via CSS in Application.scss because the ":not" method doesn"t work here
                //   {extend: "colvis", restore: "Revert", text: "<i class='fa fa-wrench' aria-hidden='true'></i> Columns <span class='caret'></span>", className: "btn btn-header"},

                //   {extend: "collection", text: "<i class='fa fa-download' aria-hidden='true'></i> Export <span class='caret'></span>", className: "btn btn-header dtExportOptions",
                //     buttons: [

                //       {extend: "excelHtml5",
                //         text: "<i class='fa fa-file-excel-o' aria-hidden='true'></i> Excel",
                //         title: "SRS Inventory Report, "+date+".xlsx",
                //         // customize:
                //         //   // Custom function to set the header row green and outlined.
                //         //   function( xlsx ) {
                //         //     var sheet = xlsx.xl.worksheets["sheet1.xml"];
                //         //     $("row c[r*='2']", sheet).attr( "s", "42" );
                //         //   },
                //         // Only exports columns that are currently visible.  Adjusted by the "Visibility" dropdown and Filtered text.
                //         exportOptions: { columns: ":visible" },
                //         className: "btn"
                //       },

                //       {extend: "pdfHtml5",
                //         text: "<i class='fa fa-file-pdf-o' aria-hidden='true'></i> PDF",
                //         title: "SRS Inventory Report, "+date+".pdf",
                //         exportOptions: {columns: ":visible"},
                //         className: "btn"},

                //       {extend: "print",
                //         text: "<i class='fa fa-print' aria-hidden='true'></i> Print",
                //         exportOptions: {columns: ":visible"},
                //         className: "btn"},

                //       {extend: "copyHtml5",
                //         text: "<i class='fa fa-copy' aria-hidden='true'></i> Copy",
                //         exportOptions: {columns: ":visible"},
                //         className: "btn"},
                //     ]
                //   }
                // ],
                "bJQueryUI": true,
                "columnDefs": [
                  {
                  "targets": 6,
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
  
  function top_toolbar (user_check, brand_names, variables) {
    return ""+
    "<ul class='nav nav-tabs'>"+
    "  <li><a class='btn hidden' id='tasksHackFixButton'></a></li>"+
    "  <li><div class='dataTables_filter'><input class='form-control' id='taskTableSearch' placeholder='Search Table...'></div>"+
    "  <li>"+
    "    <div class='dataTables_length'>"+
    "      <select class='form-control' title='Number of records to show' id='taskTableLength'>"+
    "        <option value='5'>5</option>"+
    "        <option value='10'>10</option>"+
    "        <option value='25'>25</option>"+
    "        <option selected='selected' value='50'>50</option>"+
    "        <option value='100'>100</option>"+
    "        <option value='-1'>All</option>"+
    "      </select>"+
    "    </div>"+
    "  </li>"+
    // "  <li>"+
    // "    <div class='productsFilterBy'><i class='fa fa-random' aria-hidden='true'></i> Filters:</div>"+
    // "  </li>"+
    // "  <li>"+
    // "    <div class='productsQuantityRangeFilter'>"+
    // "      <button type='button' class='btn header-btn dropdown-toggle' data-toggle='dropdown'><i class='fa fa-exchange' aria-hidden='true'></i> Quantity <span class='caret'></span></button>"+
    // "      <ul class='dropdown-menu'>"+
    // "        <li>"+
    // "          <div class='input-quantity input-group'>"+
    // "            <input type='number' class='form-control filterStartQty' id='productFilterStartQty' name='start' placeholder='Min' />"+
    // "            <span class='input-group-addon'>to</span>"+
    // "            <input type='number' class='form-control filterEndQty' id='productFilterEndQty' name='end' placeholder='Max' />"+
    // "          </div>"+
    // "        </li>"+
    // "      </ul>"+
    // "    </div>"+
    // "  </li>"+
    // ""+brand_names+
    // ""+variables+
    "</ul>"+
    "";
  }

  var children = $(".taskTableChildren");
  $("div.tasks-toolbar").html(top_toolbar(children.data("child-user_check"),
                                            children.data("child-brand_names"),
                                            children.data("child-variables")));
  $("#taskTableSearch").addClear();
  $("#taskTableSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });

  // $(document).on("click", ".productsQuantityRangeFilter", function (e) {
  //   e.stopPropagation(); // Stops the Quantity Range Filter Menu from closing when an interior option is clicked
  // });
  // $(document).on("click", ".productsBrandFilterMenu", function (e) {
  //   e.stopPropagation(); // Stops the Brand Name Filter Menu from closing when an interior option is clicked
  // });
  // $(".productsBrandFilterMenu").on("change", function() {
  //   var brands = $("input:checkbox[name='brand']:checked").map(function() {
  //     return "^" + this.value + ".*\$";
  //     }).get().join("|");
  //   if (brands === "") {
  //     table.column(2).search("xxxxxxxxxx").draw();
  //   }
  //   else
  //     table.column(2).search(brands, true, false, false).draw();
  //     console.log(brands);
  // });


  // $(document).on("click", ".booleanFilterMenu", function (e) {
  //   e.stopPropagation();
  // });

  // function toggle_boolean (def, col) { // "Filter" toggle menu which toggles whether the filters below are "On", "Off" or "Nil"
  //   if ($("input:checkbox[def="+def+"]").attr("bool") == "true" ) {
  //     table.column(col).search("true").draw();
  //     $("#"+def+"Clear").prop("disabled", false);
  //   }
  //   if ($("input:checkbox[def="+def+"]").attr("bool") == "false" ) {
  //     table.column(col).search("false").draw();
  //     $("#"+def+"Clear").prop("disabled", false);
  //     $("input:checkbox[def="+def+"]").parent().removeClass("nil");
  //   }
  //   $("#"+def+"Clear").on("click", function() { // Clears the search and puts the specified column back to "Nil" state
  //     if ($("input:checkbox[def="+def+"]").attr("bool") == "false") {
  //       $("input:checkbox[def="+def+"]").click();
  //     }
  //     $("input:checkbox[def="+def+"]").attr("bool", "");
  //     table.column(col).search("").draw();
  //     $(this).prop("disabled", true);
  //     $(this).prev().addClass("nil");
  //   });
  // }

  // $(".booleanFilterMenu").on("change", function() {
  //   $("input:checkbox[name='boolean']").on("change", function(){ // Activates the above "toggle_boolean" function
  //     if($(this).is(":checked"))
  //       $(this).attr("bool", "true");
  //     else
  //       $(this).attr("bool", "false");
  //   });
  //   toggle_boolean ("active", 15);
  //   toggle_boolean ("storeOrderable", 16);
  //   toggle_boolean ("warrantyOrderable", 17);
  //   toggle_boolean ("ecommSku", 18);
  //   toggle_boolean ("inStock", 19);
  //   toggle_boolean ("hasParts", 14);
  // });

  // $("input:checkbox").change(function(){ // Takes care of the non-dataTables specific menu styling
  //   if($(this).is(":checked"))
  //     $(this).parent().parent().addClass("selected");
  //   else
  //     $(this).parent().parent().removeClass("selected");
  // });

  $("#taskTableSearch").keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $("#taskTableLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  function format (blank, render) {
    return ""+
  "<div class='glider'>"+
  "  <table class='task-listing-expando'>"+
  "    <thead>"+
  "      <tr>"+
  "        <th>Additional Attributes</th>"+
  "        <th>Associated Combo Items</th>"+
  // "        <th>Associated Parts</th>"+
  // "        <th>Associated Files</th>"+
  // "        <th>Manufacturer</th>"+
  // "        <th>UPC</th>"+
  // "        <th>SRS SKU</th>"+
  // "        <th>Meta Notes</th>"+
  "      </tr>"+
  "    </thead>"+
  "    <tbody>"+
  "      <tr class='no-table'>"+ // "no-table" class allows single-row expandos to not highlight on hover
  "        <td style='padding:0;'>"+blank+"</td>"+
  "        <td style='padding:0;'>"+render+"</td>"+
  // "        <td style='padding:0;'>"+parts+"</td>"+
  // "        <td style='padding:0;'>"+uploads+"</td>"+
  // "        <td>"+manufacturer+"</td>"+
  // "        <td>"+upc+"</td>"+
  // "        <td>"+srs_sku+"</td>"+
  // "        <td>"+notes+"</td>"+
  "      </tr>"+
  "    </tbody>"+
  "  </table>"+
  "</div>";
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
      row.child(format(tr.data("child-blank"),
                       tr.data("child-render")), "no-padding").show();
      tr.addClass("shown");
      $("div.glider", row.child()).slideDown();
    }
  });

  // $.fn.DataTable.ext.pager.numbers_length = 5; // Number of numbers to show in Pagination controls
  // $.fn.dataTable.ext.search.push( // Function for the "Quantity Range Filter"
  //   function( settings, data, dataIndex ) {
  //     var min = parseInt( $('#productFilterStartQty').val(), 10 );
  //     var max = parseInt( $('#productFilterEndQty').val(), 10 );
  //     var qty = parseFloat( data[5] ) || 0; // '5' is the Quantity Column number

  //     if ( ( isNaN( min ) && isNaN( max ) ) ||
  //       ( isNaN( min ) && qty <= max ) ||
  //       ( min <= qty   && isNaN( max ) ) ||
  //       ( min <= qty   && qty <= max ) ) {
  //       return true;
  //       }
  //     return false;
  //   }
  // );
  // $("#productFilterStartQty").on("change keyup", function() { table.draw(); });
  // $("#productFilterEndQty").on("change keyup", function() { table.draw(); });

  $("#tasksHackFixButton").on("click", function(){
    table.page.len(25).draw(); // Fixes header column width issues
  });

  $(".order_status").each(function() {
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

  $(".task_type_hidden").each(function() {
    var cellValue = $(this).html();
    if (cellValue == "E-Commerce Orders") {
      $(this).closest("td").addClass("order_type_ecomm");
      $(this).parent().find("td").addClass("order_type_ecomm");
    }
    if (cellValue == "Customer Orders") {
      $(this).closest("td").addClass("order_type_customer");
      $(this).parent().find("td").addClass("order_type_customer");
    }
  });

});
