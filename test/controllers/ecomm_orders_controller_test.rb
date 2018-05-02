require 'test_helper'

class EcommOrdersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ecomm_order = ecomm_orders(:one)
  end

  test "should get index" do
    get ecomm_orders_url
    assert_response :success
  end

  test "should get new" do
    get new_ecomm_order_url
    assert_response :success
  end

  test "should create ecomm_order" do
    assert_difference('EcommOrder.count') do
      post ecomm_orders_url, params: { ecomm_order: {  } }
    end

    assert_redirected_to ecomm_order_url(EcommOrder.last)
  end

  test "should show ecomm_order" do
    get ecomm_order_url(@ecomm_order)
    assert_response :success
  end

  test "should get edit" do
    get edit_ecomm_order_url(@ecomm_order)
    assert_response :success
  end

  test "should update ecomm_order" do
    patch ecomm_order_url(@ecomm_order), params: { ecomm_order: {  } }
    assert_redirected_to ecomm_order_url(@ecomm_order)
  end

  test "should destroy ecomm_order" do
    assert_difference('EcommOrder.count', -1) do
      delete ecomm_order_url(@ecomm_order)
    end

    assert_redirected_to ecomm_orders_url
  end
end
