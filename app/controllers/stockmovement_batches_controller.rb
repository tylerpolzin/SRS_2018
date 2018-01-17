class StockmovementBatchesController < ApplicationController
  before_action :set_stockmovement_batch, only: [:show, :edit, :update, :destroy]

  def index
    @stockmovement_batches = StockmovementBatch.all
  end

  def show
  end

  def new
    @stockmovement_batches = StockmovementBatch.all
    @stockmovements = Stockmovement.all
    @stockmovement_batch = StockmovementBatch.new
    @products = Product.all
    @parts = Part.all
    @stockmovement = Stockmovement.new
  end

  def edit
  end

  def create
    @products = Product.all
    @parts = Part.all
    @stockmovement_batch = StockmovementBatch.new(stockmovement_batch_params)
    respond_to do |format|
      if @stockmovement_batch.save
        format.html { redirect_to inventory_adjustments_path, notice: '// Inventory Adjustment has been processed.' }
        format.json { render :show, status: :created, location: @stockmovement_batch }
      else
        format.html { render :new }
        format.json { render json: @stockmovement_batch.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @stockmovement_batch.update(stockmovement_batch_params)
        format.html { redirect_to @stockmovement_batch, notice: 'Stockmovement batch was successfully updated.' }
        format.json { render :show, status: :ok, location: @stockmovement_batch }
      else
        format.html { render :edit }
        format.json { render json: @stockmovement_batch.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @stockmovement_batch.destroy
    respond_to do |format|
      format.html { redirect_to stockmovement_batches_url, notice: 'Stockmovement batch was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_stockmovement_batch
      @stockmovement_batch = StockmovementBatch.find(params[:id])
    end

    def stockmovement_batch_params
      params.require(:stockmovement_batch).permit!
    end
end
