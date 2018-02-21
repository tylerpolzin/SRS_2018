class ComboItemsController < ApplicationController
  before_action :set_combo_item, only: [:show, :edit, :update, :destroy]

  # GET /combo_items
  # GET /combo_items.json
  def index
    @combo_items = ComboItem.all
  end

  # GET /combo_items/1
  # GET /combo_items/1.json
  def show
  end

  # GET /combo_items/new
  def new
    @combo_item = ComboItem.new
  end

  # GET /combo_items/1/edit
  def edit
  end

  # POST /combo_items
  # POST /combo_items.json
  def create
    @combo_item = ComboItem.new(combo_item_params)

    respond_to do |format|
      if @combo_item.save
        format.html { redirect_to @combo_item, notice: 'Combo item was successfully created.' }
        format.json { render :show, status: :created, location: @combo_item }
      else
        format.html { render :new }
        format.json { render json: @combo_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /combo_items/1
  # PATCH/PUT /combo_items/1.json
  def update
    respond_to do |format|
      if @combo_item.update(combo_item_params)
        format.html { redirect_to @combo_item, notice: 'Combo item was successfully updated.' }
        format.json { render :show, status: :ok, location: @combo_item }
      else
        format.html { render :edit }
        format.json { render json: @combo_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /combo_items/1
  # DELETE /combo_items/1.json
  def destroy
    @combo_item.destroy
    respond_to do |format|
      format.html { redirect_to combo_items_url, notice: 'Combo item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_combo_item
      @combo_item = ComboItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def combo_item_params
      params.fetch(:combo_item, {})
    end
end
