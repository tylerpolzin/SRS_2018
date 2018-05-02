class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]


  def index
    @tasks = Task.all
  end

  def show
  end

  def new
    if admin_or_employee?
      @task = Task.new
      @warranty_order = WarrantyOrder.new
      @ecomm_order = EcommOrder.new
      @customer = Customer.new
      @task.uploads.build
      @task.ecomm_orders.build.line_items.build.tracking_numbers.build
      @task.ecomm_orders.build.comments.build
      @task.warranty_orders.build.line_items.build.tracking_numbers.build
      @task.warranty_orders.build.comments.build
      @task.warranty_orders.build.build_customer
      collect_items
    else
      default_redirect
    end
  end

  def edit
    collect_items
  end

  def create
    collect_items
    @warranty_order = WarrantyOrder.new
    @ecomm_order = EcommOrder.new
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        format.html { redirect_to @task, notice: '// Task was successfully created.' }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    collect_items
    respond_to do |format|
      if @task.update(task_params)
        @task.uploads.each do |u|
          if u.remove_file == true
            ItemUpload.where(upload_id: u, itemable_id: @task).delete_all
            u.update(remove_file: false)
          end
        end
        # @task.ecomm_orders.each do |eo|
        #   if eo.destroy == true
        #     EcommOrder.where(id: eo).delete_all
        #   end
        # end
        format.html { redirect_to @task, notice: '// Task was successfully updated.' }
        format.json { respond_with_bip(@task) }
      else
        format.html { render :edit }
        format.json { respond_with_bip(@task) }
      end
    end
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: '// Task was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private
    def set_task
      @task = Task.find(params[:id])
    end

    def collect_items
      @products = Product.order(manufacturer_model_number: :asc)
      @parts = Part.order(manufacturer_model_number: :asc)
      @combo_items = ComboItem.order(model_number: :asc)
      @retailers = EcommOrder.order(retailer: :asc).distinct.pluck(:retailer)
      @carriers = TrackingNumber.order(carrier: :asc).distinct.pluck(:carrier)
      @ecomm_orders = EcommOrder.all
    end

    def task_params
      params.require(:task).permit!
    end
end
