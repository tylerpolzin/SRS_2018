require 'test_helper'

class UploadBatchesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @upload_batch = upload_batches(:one)
  end

  test "should get index" do
    get upload_batches_url
    assert_response :success
  end

  test "should get new" do
    get new_upload_batch_url
    assert_response :success
  end

  test "should create upload_batch" do
    assert_difference('UploadBatch.count') do
      post upload_batches_url, params: { upload_batch: {  } }
    end

    assert_redirected_to upload_batch_url(UploadBatch.last)
  end

  test "should show upload_batch" do
    get upload_batch_url(@upload_batch)
    assert_response :success
  end

  test "should get edit" do
    get edit_upload_batch_url(@upload_batch)
    assert_response :success
  end

  test "should update upload_batch" do
    patch upload_batch_url(@upload_batch), params: { upload_batch: {  } }
    assert_redirected_to upload_batch_url(@upload_batch)
  end

  test "should destroy upload_batch" do
    assert_difference('UploadBatch.count', -1) do
      delete upload_batch_url(@upload_batch)
    end

    assert_redirected_to upload_batches_url
  end
end
