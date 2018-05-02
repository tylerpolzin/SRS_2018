/* global $ */
/* global bootbox */
/* global basicConfirm */
/* global basic_tooltip */
/* global json */

//------------------------------------------------------------------------------------------------------
//                               Customer "NEW" related JS                                             |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $(".customer_attributes_container").hide();
  $(".customerState").select2({
    theme: "bootstrap",
    placeholder: "Automatically filled in with Zip Code entry",
    selectOnClose: true
  });
  $("#customer_country").select2({
    theme: "bootstrap",
    placeholder: "Select Country...",
    selectOnClose: true
  });

  basic_tooltip(".new_customer_add_attributes_button .fa-question-circle", "Custom Attributes", new_customer_attributes_button_tooltip);
  basic_tooltip(".new_customer_add_comment_button .fa-question-circle", "Comments", new_customer_comments_button_tooltip);
  basic_tooltip("#customerFirstSubmit", "Create Customer", "<ul><li>If you click this and nothing happens, make sure any required fields are filled in or removed.</li><li>Required fields have a red border around them.</li></ul>")

  $(".newCustomerAttributeContainer").on("keyup", ".customerDynamicAttributeName", function(){
    var nameElem = $(this);
    var valueElem = nameElem.closest(".row").children("td").children(".text_field");
    var value = nameElem.val();
    valueElem.attr("id", "customer_details_"+value);
    valueElem.attr("name", "customer[details]["+value+"]");
    if (value == "Phone") {
      nameElem.closest(".row").find(".description").inputmask({"mask": "(999) 999-9999"});
    }
  });

  $(".newCustomerAttributeContainer").on("click", ".removeRow", function(){
    $(this).closest(".row").html("").parent().find("tr:empty").remove();
  });

  $(".customer_add_attributes_button").on("click", function(e){
    e.preventDefault();
    $(".customer_attributes_container").show();
    var contents = "<tr class='row new_row'>" + $(".customerAttributeTemplate").html() + "</tr>";
    $(".body").append(contents);
    $(".body").find(".row:last-child").find(".dynamicAttributeName").prop("required", true);
  });

  $(".customer_add_comment_button").on("click", function() {
    $(".add_child_new_customer_comment").click();
  });

});

$(document).on("click", ".customerRemoveAttributeRow", function(){
  if ($(".body").find(".row").length == 2) {
    $(".customer_attributes_container").hide();
    $(this).closest(".row").remove();
  }
  else {
    $(this).closest(".row").remove();
  }
});

$(document).on("click", ".new_customer_attributes_remove_button", function() {
  var current_order = $(".customer_attributes_container");
  bootbox.confirm("This will clear all active attributes.  Are you sure?", function(result){
    if (result === true) {
      current_order.hide();
      current_order.find(".new_row").remove();
    }
  });
});

$(document).on("click", "a.add_child_new_customer_comment", function() {
  var new_id, regexp, template;
  template = $("#jstemplates_new_customer_comment").find(".comments_fields_template").html();
  regexp = new RegExp("new_comments", "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  return false;
});



$(document).on("click", ".new_customer_comment_remove_button", function() {
  var fields = $(this).closest(".new_customer_comment_fields");
  bootbox.confirm("Are you sure you want to remove this comment?", function(result){
    if (result === true) {
      fields.remove();
    }
  });
});

$(document).on("keyup change", "#newCustomerTable", function() {
  var city = $(this).find(".customerCity").val();
  $(this).find(".customerCityHidden").val(city);
  var state = $(this).find(".customerState").find("option:selected").val();
  $(this).find(".customerStateHidden").val(state);
});


$(document).on("keyup change", ".customerZipcode", function() { // Zipcode API City/State filler
	var clientKey = "js-pUid3SvjqKdSM2jdU7pj1A3gKqjGNzLbA3YdOJlzEYQOLeRx9weZNl9NfB5MaIE2";
	var cache = {};
	var container = $("#newCustomerTable");
	var errorDiv = container.find("div.text-error");
	container.find(".customerZipcodeHidden").val($(this).val());
	function handleResp(data) {
		if (data.error_msg) errorDiv.text(data.error_msg);
		else if ("city" in data) {
			container.find("#customer_lat").val(data.lat);
			container.find("#customer_long").val(data.lng);
			container.find("input[name='city']").val(data.city);
			container.find($(".customerState").select2({
                      theme: "bootstrap",
                      placeholder: "Automatically filled in with Zip Code entry",
                    })).val(data.state);
		}
	}

	container.find("input[name='zipcode']").on("change keyup", function() {
		var zipcode = $(this).val().substring(0, 5);
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
					container.find(".phone_mask").focus();
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
	}).trigger("change keyup");

});

$(document).on("click", "#customerFirstSubmit", function(e) {
  e.preventDefault();
  var tr = $(".body").find("tr").length;
  if (tr > 1) {
    $(".hide-tag").remove();
  }
  $(".comments_fields_template").html("");
  $("#customerSubmit").click();
});

var new_customer_attributes_button_tooltip = "<ul>"+
                                            "  <li>Click here to add Custom Attributes.</li>"+
                                            "  <li>Custom Attributes can be used to add columns that aren't available within the existing parameters of this entry.</li>"+
                                            "  <li><b style='color:red;'>DO NOT</b> create more than one attribute with the same name. Duplicate attribute names are not allowed.  Duplicate descriptions are allowed.</li>"+
                                            "  <li>Examples:"+
                                            "    <div style='display:flex;margin-top:2px;'><div class='form-control tooltip-input-example'>Phone 2</div>&nbsp;&nbsp;&nbsp;<div class='form-control tooltip-input-example'>(555) 555-5555</div></div>"+
                                            "    <div style='display:flex;margin-top:3px;'><div class='form-control tooltip-input-example'>Alternate Address</div>&nbsp;&nbsp;&nbsp;<div class='form-control tooltip-input-example'>123 Any Street</div></div>"+
                                            "  </li>"+
                                            "</ul>";


var new_customer_comments_button_tooltip = "<ul>"+
                                          "  <li>Click here to add comments to this order.</li>"+
                                          "  <li>Details for this order or reminders for yourself that don't fit in any of the existing parameters can be added as a comment.</li>"+
                                          "  <li>Multiple comments are allowed.</li>"+
                                          "</ul>";

//------------------------------------------------------------------------------------------------------
//                               Customer "EDIT" related JS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {


});