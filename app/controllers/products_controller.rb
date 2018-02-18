class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :load_prelims, except: :show


  def index
    if admin_or_employee?
      @products = Product.order(brand_name: :asc).order(manufacturer_model_number: :asc)
    elsif current_user.has_role? (:drsharp)
      @products = Product.order(manufacturer_model_number: :asc).where(:brand_name => "Dr Sharp")
    elsif current_user.has_role? (:colonial)
      @products = Product.order(manufacturer_model_number: :asc).where(:brand_name => "Colonial Elegance")
    elsif current_user.has_role? (:padula)
      @products = Product.order(manufacturer_model_number: :asc).where(:brand_name => "Ray Padula")
    elsif current_user.has_role? (:firplak)
      @products = Product.order(manufacturer_model_number: :asc).where(:brand_name => "Firplak")
    else
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
  end
  
  def batch_process
    if current_user.admin?
      @products = Product.order(brand_name: :asc).order(manufacturer_model_number: :asc)
    else
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
  end

  def show
    if admin_or_employee?
      @product = Product.friendly.find(params[:id])
    elsif current_user.has_role? (:drsharp)
      @product = Product.friendly.where(:brand_name => "Dr Sharp").find(params[:id])
    elsif current_user.has_role? (:colonial)
      @product = Product.friendly.where(:brand_name => "Colonial Elegance").find(params[:id])
    elsif current_user.has_role? (:padula)
      @product = Product.friendly.where(:brand_name => "Ray Padula").find(params[:id])
    elsif current_user.has_role? (:firplak)
      @product = Product.friendly.where(:brand_name => "Firplak").find(params[:id])
    else
      redirect_to products_url, notice: "// You can't do that!"
    end
    @parts = Part.where(:product_id => @product)
    @stockmovements = Stockmovement.order(created_at: :desc).where(:product_id => @product).limit(20)
  end

  def new
    if admin_or_employee?
      @product = Product.new
      @product.uploads.build
    else
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
  end

  def edit
    if admin_or_employee?
      @product = Product.friendly.find(params[:id])
    else
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
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
    @product = Product.friendly.find(params[:id])
    respond_to do |format|
      if @product.update_attributes(product_params)
        if @product.remove_image == true
          @product.image = nil
          @product.save
        end
        @product.uploads.each do |u|
          if u.remove_file == true
            u.destroy
          end
          if u.file_file_size.blank?
            u.destroy
          end
        end
        format.html { redirect_to product_path(params[:id]), notice: '// Product has been updated.' }
        format.json { respond_with_bip(@product) }
      else
        format.html { render action: :edit }
        format.json { respond_with_bip(@product) }
      end
    end
  end

  def destroy
    if current_user.admin?
      @product.destroy
      respond_to do |format|
        format.html { redirect_to products_url, notice: '// Product has been deleted.' }
        format.json { head :no_content }
      end
    else
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
  end

  private
    def set_product
      @product = Product.friendly.find(params[:id])
    end

    def load_prelims
      @vendor = Product.order(vendor_name: :asc).distinct.pluck(:vendor_name)
      @brand = Product.order(brand_name: :asc).distinct.pluck(:brand_name)
    end

    def product_params
      params.require(:product).permit!
    end
    
    def part_params
      params.require(:part).permit!
    end
    
end
