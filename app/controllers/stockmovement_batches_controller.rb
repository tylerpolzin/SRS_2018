class StockmovementBatchesController < ApplicationController
  before_action :set_stockmovement_batch, only: [:show, :edit, :update, :destroy]

  # GET /stockmovement_batches
  # GET /stockmovement_batches.json
  def index
    @stockmovement_batches = StockmovementBatch.all
  end

  # GET /stockmovement_batches/1
  # GET /stockmovement_batches/1.json
  def show
  end

  # GET /stockmovement_batches/new
  def new
    @stockmovement_batch = StockmovementBatch.new
  end

  # GET /stockmovement_batches/1/edit
  def edit
  end

  # POST /stockmovement_batches
  # POST /stockmovement_batches.json
  def create
    @stockmovement_batch = StockmovementBatch.new(stockmovement_batch_params)

    respond_to do |format|
      if @stockmovement_batch.save
        format.html { redirect_to @stockmovement_batch, notice: 'Stockmovement batch was successfully created.' }
        format.json { render :show, status: :created, location: @stockmovement_batch }
      else
        format.html { render :new }
        format.json { render json: @stockmovement_batch.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /stockmovement_batches/1
  # PATCH/PUT /stockmovement_batches/1.json
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

  # DELETE /stockmovement_batches/1
  # DELETE /stockmovement_batches/1.json
  def destroy
    @stockmovement_batch.destroy
    respond_to do |format|
      format.html { redirect_to stockmovement_batches_url, notice: 'Stockmovement batch was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stockmovement_batch
      @stockmovement_batch = StockmovementBatch.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def stockmovement_batch_params
      params.fetch(:stockmovement_batch, {})
    end
end
