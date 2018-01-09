Rails.application.routes.draw do
  
  resources :stockmovement_batches
  resources :parts
  resources :products
  resources :pages

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
  # root to: 'pages#home'
  

end
