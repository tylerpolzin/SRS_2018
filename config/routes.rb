Rails.application.routes.draw do
  
  resources :stores
  resources :customers
  resources :ecomm_orders
  resources :warranty_orders
  resources :tasks do
    resources :ecomm_orders, :only => [:destroy]
    resources :warranty_orders, :only => [:destroy]
  end
  resources :combo_items
  resources :upload_batches
  resources :uploads
  resources :stockmovements
  resources :assignments
  resources :stockmovement_batches
  resources :parts
  resources :products
  get 'inventory_adjustments', to: 'stockmovement_batches#new'
  get 'inventory_history', to: 'stockmovement_batches#index'
  get 'batch_process', to: 'products#batch_process'
  get 'batch_process', to: 'products#batch_process'
  get 'ecomm_products', to: 'products#ecomm_products'
  resources :users do
    resource :profile
  end
  
  get 'profiles' => 'profiles#index', as: :profiles
  devise_for :users, :skip => [:registrations], :path => 'u'
  
  as :user do
    get 'u/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'    
    patch 'u' => 'devise/registrations#update', :as => 'user_registration'            
  end
  
  devise_scope :user do
    get 'login', to: 'devise/sessions#new'
  end
  devise_scope :user do
    delete 'logout', to: 'devise/sessions#destroy'
  end
  
  authenticated :user do
    root to: 'users#dashboard', as: :authenticated_root
  end
  root to: redirect('/login')


end
