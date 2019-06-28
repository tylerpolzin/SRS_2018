class StockmovementBatchesController < ApplicationController
  before_action :set_stockmovement_batch, only: [:show, :edit, :update, :destroy]

  def show
    if admin_or_employee?
      @stockmovements = @stockmovement_batch.stockmovements
    elsif current_user.has_role?(:drsharp)
      @stockmovements = @stockmovement_batch.stockmovements.where(:stockmovements => {:id => Stockmovement.select(:id)
                                            .where(:product_id => Product.select(:id)
                                            .where(:brand_name => "Dr Sharp"))})
    elsif current_user.has_role?(:colonial)
      @stockmovements = @stockmovement_batch.stockmovements.where(:stockmovements => {:id => Stockmovement.select(:id)
                                            .where(:product_id => Product.select(:id)
                                            .where(:brand_name => "Colonial Elegance"))})
    elsif current_user.has_role?(:padula)
      @stockmovements = @stockmovement_batch.stockmovements.where(:stockmovements => {:id => Stockmovement.select(:id)
                                            .where(:product_id => Product.select(:id)
                                            .where(:brand_name => "Ray Padula"))})
    elsif current_user.has_role?(:firplak)
      @stockmovements = @stockmovement_batch.stockmovements.where(:stockmovements => {:id => Stockmovement.select(:id)
                                            .where(:product_id => Product.select(:id)
                                            .where(:brand_name => "Firplak"))})
    elsif current_user.has_role?(:azembla)
      @stockmovements = @stockmovement_batch.stockmovements.where(:stockmovements => {:id => Stockmovement.select(:id)
                                            .where(:product_id => Product.select(:id)
                                            .where(:brand_name => "Azembla"))})
    elsif current_user.has_role?(:bodo)
      @stockmovements = @stockmovement_batch.stockmovements.where(:stockmovements => {:id => Stockmovement.select(:id)
                                            .where(:product_id => Product.select(:id)
                                            .where(:brand_name => "Bodo"))})
    end
  end

  def index
    if admin_or_employee?
      @stockmovements = Stockmovement.all
      @stockmovement_batches = StockmovementBatch.all
    elsif current_user.has_role?(:drsharp)
      @stockmovements = Stockmovement.includes(:product).where(:products => {:brand_name => "Dr Sharp"})
      @stockmovement_batches = StockmovementBatch.includes(:stockmovements)
                                                 .where(:stockmovements => {:id => Stockmovement.select(:id)
                                                 .where(:product_id => Product.select(:id)
                                                 .where(:brand_name => "Dr Sharp"))})
    elsif current_user.has_role?(:colonial)
      @stockmovements = Stockmovement.includes(:product).where(:products => {:brand_name => "Colonial Elegance"})
      @stockmovement_batches = StockmovementBatch.includes(:stockmovements)
                                                 .where(:stockmovements => {:id => Stockmovement.select(:id)
                                                 .where(:product_id => Product.select(:id)
                                                 .where(:brand_name => "Colonial Elegance"))})
    elsif current_user.has_role?(:padula)
      @stockmovements = Stockmovement.includes(:product).where(:products => {:brand_name => "Ray Padula"})
      @stockmovement_batches = StockmovementBatch.includes(:stockmovements)
                                                 .where(:stockmovements => {:id => Stockmovement.select(:id)
                                                 .where(:product_id => Product.select(:id)
                                                 .where(:brand_name => "Ray Padula"))})
    elsif current_user.has_role?(:firplak)
      @stockmovements = Stockmovement.includes(:product).where(:products => {:brand_name => "Firplak"})
      @stockmovement_batches = StockmovementBatch.includes(:stockmovements)
                                                 .where(:stockmovements => {:id => Stockmovement.select(:id)
                                                 .where(:product_id => Product.select(:id)
                                                 .where(:brand_name => "Firplak"))})
    elsif current_user.has_role?(:azembla)
      @stockmovements = Stockmovement.includes(:product).where(:products => {:brand_name => "Azembla"})
      @stockmovement_batches = StockmovementBatch.includes(:stockmovements)
                                                 .where(:stockmovements => {:id => Stockmovement.select(:id)
                                                 .where(:product_id => Product.select(:id)
                                                 .where(:brand_name => "Azembla"))})
    elsif current_user.has_role?(:bodo)
      @stockmovements = Stockmovement.includes(:product).where(:products => {:brand_name => "Bodo"})
      @stockmovement_batches = StockmovementBatch.includes(:stockmovements)
                                                 .where(:stockmovements => {:id => Stockmovement.select(:id)
                                                 .where(:product_id => Product.select(:id)
                                                 .where(:brand_name => "Bodo"))})
    else
      default_redirect
    end
    @products = Product.all # Used in "_stockmovement.html.erb"
    @parts = Part.all # Used in "_stockmovement.html.erb"
    @brand = Product.order(brand_name: :asc).distinct.pluck(:brand_name) # Used in Individual History tab
  end

  def new
    if admin_or_employee?
      @stockmovement_batches = StockmovementBatch.all
      @stockmovements = Stockmovement.all
      @brand = Product.order(brand_name: :asc).distinct.pluck(:brand_name)
      @products = Product.all
      @parts = Part.all
      @stockmovement_batch = StockmovementBatch.new
      @stockmovement = Stockmovement.new
    else
      default_redirect
    end
  end

  def create
    @products = Product.all
    @brand = Product.order(brand_name: :asc).distinct.pluck(:brand_name)
    @parts = Part.all
    @stockmovement_batches = StockmovementBatch.all
    @stockmovements = Stockmovement.all
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
        format.html { redirect_to inventory_adjustments_path, notice: '// Inventory Adjustment was successfully updated.' }
        format.json { respond_with_bip(@stockmovement_batch) }
      else
        format.html { render :edit }
        format.json { respond_with_bip(@stockmovement_batch) }
      end
    end
  end

  def destroy
    if current_user.admin?
      @stockmovement_batch.destroy
      respond_to do |format|
        format.html { redirect_to inventory_adjustments_path, notice: '// Inventory Adjustment was successfully deleted.' }
        format.json { head :no_content }
      end
    else
      default_redirect
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
