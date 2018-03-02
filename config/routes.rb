Rails.application.routes.draw do
  
  resources :tasks
  resources :combo_items
  resources :upload_batches
  resources :uploads
  resources :stockmovements
  resources :assignments
  resources :stockmovement_batches
  resources :parts
  resources :products
  get 'changelog', to: 'pages#changelog'
  get 'inventory_adjustments', to: 'stockmovement_batches#new'
  get 'inventory_history', to: 'stockmovement_batches#index'
  get 'batch_process', to: 'products#batch_process'
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
