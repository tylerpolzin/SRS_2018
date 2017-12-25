Rails.application.routes.draw do
  
  resources :pages

  resources :users do
    resource :profile
  end
  get 'profiles' => 'profiles#index', as: :profiles
  devise_for :users, controllers: { registrations: "registrations"}, :path => 'u'
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
