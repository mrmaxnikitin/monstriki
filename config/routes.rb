Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  root 'static_pages#welcome'
  
  resources :sessions, only: [:new, :create, :destroy]
  resources :users do
    resources :honors, only: [:show, :update]
    resources :user_things, only: [:index]
    post :create_prolongation, on: :collection
  end
  resources :password_resets, only: [:new, :create, :edit, :update] do
    post :change, on: :collection
  end
  resources :user_monsters do
    collection do
      get  :monster_avatar
      get  :monster_name
      post :choose_monster
      post :give_name_to_monster
      post :buy_monster
      post :rename_monster
    end
  end
  resources :user_things do
    collection do
      get :get_things
      post :active_thing
    end
  end
  resources :tasks do
    collection do
      get :logic
      get :get_logic
      get :memory_attention
      get :get_memory_attention
      get :speech
      get :get_speech
      get :math
      get :get_math
      get :world
      get :get_world
      get :moderation
      get :get_moderation
      get :get_test
      post :reward
      post :moderate
      post :error_message
      get :documentation
    end
  end
  resources :quests do
    collection do
      get :choose_trip
      get :trip
      get :get_trip
      post :finish_trip
      get :next_quest
      get :add_task_to_quest
      post :get_add_task_to_quest
      post :save_answers
    end
  end
  resources :things
  resources :monsters

  get 'start' => 'quests#index'

  get 'logout' => 'sessions#destroy'
  get 'signin' => 'sessions#new'
  get 'signup' => 'users#new'
  get 'monstrik' => 'monsters#index'
  get 'payment' => 'users#payment'
  get 'monster_card' => 'users#monster_card'
  get 'prolongation' => 'users#prolongation'
  
  get 'parents' => 'static_pages#parents'
  get 'about' => 'static_pages#about'
  get 'contacts' => 'static_pages#contacts'
  get 'agreement' => 'static_pages#agreement'
  get 'confidential' => 'static_pages#confidential'
  get 'cookies' => 'static_pages#cookies'
  get 'services' => 'static_pages#services'
  get 'test' => 'tasks#test'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
