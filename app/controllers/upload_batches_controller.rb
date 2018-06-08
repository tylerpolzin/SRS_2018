class UploadBatchesController < ApplicationController
  before_action :set_upload_batch, only: [:show, :edit, :update, :destroy]

  def index
    @upload_batches = UploadBatch.all
  end

  def show
  end

  def new
    if admin_or_employee?
      @upload_batch = UploadBatch.new
      @upload = Upload.new
      @upload.item_uploads.build
      @upload.products.build.parts.build
      @upload.comments.build
      @upload_batch.uploads.build
      collect_items
    else
      default_redirect
    end
  end

  def edit
  end

  def create
    @upload_batch = UploadBatch.new(upload_batch_params)
    collect_items
    respond_to do |format|
      if @upload_batch.save
        format.html { redirect_to uploads_path, notice: '// Uploads successfully created.' }
        format.json { render :show, status: :created, location: @upload_batch }
      else
        format.html { render :new }
        format.json { render json: @upload_batch.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @upload_batch.update(upload_batch_params)
        format.html { redirect_to @upload_batch, notice: '// Uploads successfully updated.' }
        format.json { respond_with_bip(@upload_batch) }
      else
        format.html { render :edit }
        format.json { respond_with_bip(@upload_batch) }
      end
    end
  end

  def destroy
    @upload_batch.destroy
    respond_to do |format|
      format.html { redirect_to upload_batches_url, notice: 'Upload batch was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private

    def collect_items
      @products = Product.order(brand_name: :asc).order(manufacturer_model_number: :asc)
      @parts = Part.all
      @tasks = Task.all
    end

    def set_upload_batch
      @upload_batch = UploadBatch.find(params[:id])
    end

    def upload_batch_params
      params.require(:upload_batch).permit!
    end
end
