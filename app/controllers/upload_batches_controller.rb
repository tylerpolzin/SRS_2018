class UploadBatchesController < ApplicationController
  before_action :set_upload_batch, only: [:show, :edit, :update, :destroy]

  # GET /upload_batches
  # GET /upload_batches.json
  def index
    @upload_batches = UploadBatch.all
  end

  # GET /upload_batches/1
  # GET /upload_batches/1.json
  def show
  end

  # GET /upload_batches/new
  def new
    @upload_batch = UploadBatch.new
  end

  # GET /upload_batches/1/edit
  def edit
  end

  # POST /upload_batches
  # POST /upload_batches.json
  def create
    @upload_batch = UploadBatch.new(upload_batch_params)

    respond_to do |format|
      if @upload_batch.save
        format.html { redirect_to @upload_batch, notice: 'Upload batch was successfully created.' }
        format.json { render :show, status: :created, location: @upload_batch }
      else
        format.html { render :new }
        format.json { render json: @upload_batch.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /upload_batches/1
  # PATCH/PUT /upload_batches/1.json
  def update
    respond_to do |format|
      if @upload_batch.update(upload_batch_params)
        format.html { redirect_to @upload_batch, notice: 'Upload batch was successfully updated.' }
        format.json { render :show, status: :ok, location: @upload_batch }
      else
        format.html { render :edit }
        format.json { render json: @upload_batch.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /upload_batches/1
  # DELETE /upload_batches/1.json
  def destroy
    @upload_batch.destroy
    respond_to do |format|
      format.html { redirect_to upload_batches_url, notice: 'Upload batch was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_upload_batch
      @upload_batch = UploadBatch.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def upload_batch_params
      params.fetch(:upload_batch, {})
    end
end
