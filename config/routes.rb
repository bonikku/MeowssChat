Rails.application.routes.draw do
  resources :chatrooms do
    resources :messages
  end
  root 'pages#home'
  devise_for :users, controllers: {
    sessions: 'users/sesions',
    registrations: 'users/registrations'
  }
  get 'user/:id', to: 'users#show', as: 'user'
end
