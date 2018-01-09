require 'test_helper'

class StockmovementBatchesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @stockmovement_batch = stockmovement_batches(:one)
  end

  test "should get index" do
    get stockmovement_batches_url
    assert_response :success
  end

  test "should get new" do
    get new_stockmovement_batch_url
    assert_response :success
  end

  test "should create stockmovement_batch" do
    assert_difference('StockmovementBatch.count') do
      post stockmovement_batches_url, params: { stockmovement_batch: {  } }
    end

    assert_redirected_to stockmovement_batch_url(StockmovementBatch.last)
  end

  test "should show stockmovement_batch" do
    get stockmovement_batch_url(@stockmovement_batch)
    assert_response :success
  end

  test "should get edit" do
    get edit_stockmovement_batch_url(@stockmovement_batch)
    assert_response :success
  end

  test "should update stockmovement_batch" do
    patch stockmovement_batch_url(@stockmovement_batch), params: { stockmovement_batch: {  } }
    assert_redirected_to stockmovement_batch_url(@stockmovement_batch)
  end

  test "should destroy stockmovement_batch" do
    assert_difference('StockmovementBatch.count', -1) do
      delete stockmovement_batch_url(@stockmovement_batch)
    end

    assert_redirected_to stockmovement_batches_url
  end
end
