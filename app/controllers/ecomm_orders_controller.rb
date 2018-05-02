class EcommOrdersController < ApplicationController
  before_action :set_ecomm_order, only: [:show, :edit, :update, :destroy]

  def index
    @ecomm_orders = EcommOrder.all
    @retailer = EcommOrder.order(retailer: :asc).distinct.pluck(:retailer)
  end

  def show
  end

  def new
    @ecomm_order = EcommOrder.new
  end

  def edit
  end

  def create
    @ecomm_order = EcommOrder.new(ecomm_order_params)

    respond_to do |format|
      if @ecomm_order.save
        format.html { redirect_to @ecomm_order, notice: 'Ecomm order was successfully created.' }
        format.json { render :show, status: :created, location: @ecomm_order }
      else
        format.html { render :new }
        format.json { render json: @ecomm_order.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @ecomm_order.update(ecomm_order_params)
        format.html { redirect_to @ecomm_order, notice: 'Ecomm order was successfully updated.' }
        format.json { render :show, status: :ok, location: @ecomm_order }
      else
        format.html { render :edit }
        format.json { render json: @ecomm_order.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @ecomm_order.destroy
    respond_to do |format|
      format.html { redirect_to ecomm_orders_url, notice: 'Ecomm order was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_ecomm_order
      @ecomm_order = EcommOrder.find(params[:id])
    end

    def ecomm_order_params
      params.require(:ecomm_order).permit!
    end
end
