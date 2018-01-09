class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params[:id])
  end

  def new
    @product = Product.new
    @vendor = Product.order(vendor_name: :asc).uniq.pluck(:vendor_name)
    @brand = Product.order(brand_name: :asc).uniq.pluck(:brand_name)
  end

  def edit
    @product = Product.find(params[:id])
    @vendor = Product.order(vendor_name: :asc).uniq.pluck(:vendor_name)
    @brand = Product.order(brand_name: :asc).uniq.pluck(:brand_name)
  end

  def create
    @product = Product.new(product_params)

    respond_to do |format|
      if @product.save
        format.html { redirect_to @product, notice: '// Product has been created.' }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @product = Product.find(params[:id])
    if @product.update_attributes(product_params)
      if @product.remove_image == true
        @product.image = nil
        @product.save
      end
      redirect_to product_path(params[:id]), notice: '// Product has been updated.'
    else
      render action: :edit
    end
  end

  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url, notice: '// Product has been deleted.' }
      format.json { head :no_content }
    end
  end

  private
    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit!
    end
end
