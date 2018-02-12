class PartsController < ApplicationController
  before_action :set_part, only: [:show, :edit, :update, :destroy]

  def index
    @parts = Part.all
    @products = Product.select(:id, :manufacturer_model_number, :description, :brand_name).distinct.where(:has_parts => true)
  end

  def show
    @part = Part.find(params[:id])
    @stockmovements = Stockmovement.order(created_at: :desc).where(:product_id => params[:id]).limit(20)
  end

  def new
    @part = Part.new
  end

  def edit
    @part = Part.find(params[:id])
  end

  def create
    @part = Part.new(part_params)
      if @part.save
        Product.find_by(id: @part.product_id).update(has_parts: true)
        redirect_to product_path(@part.product_id), notice: '// Part was successfully created.'
      else
        render :new
      end
  end

  def update
    @part = Part.find(params[:id])
    respond_to do |format|
      if @part.update_attributes(part_params)
        Product.find_by(id: @part.product_id).update(has_parts: true)
        if @part.remove_image == true
          @part.image = nil
          @part.save
        end
        format.html { redirect_to product_path(@part.product_id), notice: '// Part has been updated.' }
        format.json { respond_with_bip(@part) }
      else
        format.html { render action: :edit }
        format.json { respond_with_bip(@part) }
      end
    end
  end

  def destroy
    @part.destroy
    respond_to do |format|
      format.html { redirect_to parts_url, notice: 'Part was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_part
      @part = Part.find(params[:id])
    end

    def part_params
      params.require(:part).permit!
    end
end
