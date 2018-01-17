class StockmovementsController < ApplicationController
  before_action :set_stockmovement, only: [:show, :edit, :update, :destroy]

  def index
    @stockmovements = Stockmovement.all
  end

  def show
  end

  def new
    @stockmovement = Stockmovement.new
  end

  def edit
  end

  def create
    @stockmovement = Stockmovement.new(stockmovement_params)

    respond_to do |format|
      if @stockmovement.save
        format.html { redirect_to @stockmovement, notice: 'Stockmovement was successfully created.' }
        format.json { render :show, status: :created, location: @stockmovement }
      else
        format.html { render :new }
        format.json { render json: @stockmovement.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @stockmovement.update(stockmovement_params)
        format.html { redirect_to @stockmovement, notice: 'Stockmovement was successfully updated.' }
        format.json { render :show, status: :ok, location: @stockmovement }
      else
        format.html { render :edit }
        format.json { render json: @stockmovement.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @stockmovement.destroy
    respond_to do |format|
      format.html { redirect_to stockmovements_url, notice: 'Stockmovement was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_stockmovement
      @stockmovement = Stockmovement.find(params[:id])
    end

    def stockmovement_params
      params.require(:stockmovement).permit!
    end
end
