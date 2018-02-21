require 'test_helper'

class ComboItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @combo_item = combo_items(:one)
  end

  test "should get index" do
    get combo_items_url
    assert_response :success
  end

  test "should get new" do
    get new_combo_item_url
    assert_response :success
  end

  test "should create combo_item" do
    assert_difference('ComboItem.count') do
      post combo_items_url, params: { combo_item: {  } }
    end

    assert_redirected_to combo_item_url(ComboItem.last)
  end

  test "should show combo_item" do
    get combo_item_url(@combo_item)
    assert_response :success
  end

  test "should get edit" do
    get edit_combo_item_url(@combo_item)
    assert_response :success
  end

  test "should update combo_item" do
    patch combo_item_url(@combo_item), params: { combo_item: {  } }
    assert_redirected_to combo_item_url(@combo_item)
  end

  test "should destroy combo_item" do
    assert_difference('ComboItem.count', -1) do
      delete combo_item_url(@combo_item)
    end

    assert_redirected_to combo_items_url
  end
end
