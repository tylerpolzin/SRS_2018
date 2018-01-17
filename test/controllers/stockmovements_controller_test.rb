require 'test_helper'

class StockmovementsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @stockmovement = stockmovements(:one)
  end

  test "should get index" do
    get stockmovements_url
    assert_response :success
  end

  test "should get new" do
    get new_stockmovement_url
    assert_response :success
  end

  test "should create stockmovement" do
    assert_difference('Stockmovement.count') do
      post stockmovements_url, params: { stockmovement: {  } }
    end

    assert_redirected_to stockmovement_url(Stockmovement.last)
  end

  test "should show stockmovement" do
    get stockmovement_url(@stockmovement)
    assert_response :success
  end

  test "should get edit" do
    get edit_stockmovement_url(@stockmovement)
    assert_response :success
  end

  test "should update stockmovement" do
    patch stockmovement_url(@stockmovement), params: { stockmovement: {  } }
    assert_redirected_to stockmovement_url(@stockmovement)
  end

  test "should destroy stockmovement" do
    assert_difference('Stockmovement.count', -1) do
      delete stockmovement_url(@stockmovement)
    end

    assert_redirected_to stockmovements_url
  end
end
