class PartsController < ApplicationController
  before_action :set_part, only: [:show, :edit, :update, :destroy]

  def index
    if admin_or_employee?
      @parts = Part.all
      @products = Product.select(:id, :manufacturer_model_number, :description, :brand_name).distinct.where(:has_parts => true)
    else
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
  end

  def show
    if admin_or_employee?
      @part = Part.friendly.find(params[:id])
    else
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
    @stockmovements = Stockmovement.order(created_at: :desc).where(:product_id => params[:id]).limit(20)
  end

  def new
    if admin_or_employee?
    @part = Part.new
    else
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
  end

  def edit
    if admin_or_employee?
      @part = Part.friendly.find(params[:id])
    else
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
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
    @part = Part.friendly.find(params[:id])
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
    if current_user.admin?
    @part.destroy
    respond_to do |format|
      format.html { redirect_to parts_url, notice: 'Part was successfully destroyed.' }
      format.json { head :no_content }
    end
    else
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
  end

  private
    def set_part
      @part = Part.friendly.find(params[:id])
    end

    def part_params
      params.require(:part).permit!
    end
end
