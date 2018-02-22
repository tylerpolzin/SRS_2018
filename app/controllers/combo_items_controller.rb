class ComboItemsController < ApplicationController
  before_action :set_combo_item, only: [:show, :edit, :update, :destroy]

  def index
    @combo_items = ComboItem.all
    @brand = Product.order(brand_name: :asc).distinct.pluck(:brand_name)
  end

  def show
  end

  def new
    if admin_or_employee?
      @combo_item = ComboItem.new
      build_product_association
    else
      default_redirect
    end
  end

  def edit
    build_product_association
  end

  def create
    @combo_item = ComboItem.new(combo_item_params)
    @products = Product.order(brand_name: :asc).order(manufacturer_model_number: :asc)
    respond_to do |format|
      if @combo_item.save
        format.html { redirect_to @combo_item, notice: '// Combo Item has been created.' }
        format.json { render :show, status: :created, location: @combo_item }
      else
        format.html { render :new }
        format.json { render json: @combo_item.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @products = Product.order(brand_name: :asc).order(manufacturer_model_number: :asc)
    respond_to do |format|
      if @combo_item.update(combo_item_params)
        if @combo_item.remove_image == true
          @combo_item.image = nil
          @combo_item.save
        end
        format.html { redirect_to @combo_item, notice: '// Combo Item has been updated.' }
        format.json { respond_with_bip(@combo_item) }
      else
        format.html { render action: :edit }
        format.json { respond_with_bip(@combo_item) }
      end
    end
  end

  def destroy
    if current_user.admin?
      @combo_item.destroy
      respond_to do |format|
        format.html { redirect_to combo_items_url, notice: '// Combo Item has been deleted.' }
        format.json { head :no_content }
      end
    end
  end

  private
    def set_combo_item
      @combo_item = ComboItem.friendly.find(params[:id])
    end

    def build_product_association
      @combo_item.combo_products.build
      @products = Product.order(brand_name: :asc).order(manufacturer_model_number: :asc)
    end

    def combo_item_params
      params.require(:combo_item).permit!
    end
end
