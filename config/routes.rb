Rails.application.routes.draw do
  root 'static_pages#welcome'
  
  resources :sessions, only: [:new, :create, :destroy]
  resources :users
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
      get :memory
      get :get_memory
      post :reward
    end
  end
  resources :quests do
    collection do
      get :stage1
      get :get_stage1
      get :stage2
      get :get_stage2
      get :stage3
      get :get_stage3
      get :stage4
      get :get_stage4
      post :complete_stage
      get :complete_quest
    end
  end
  resources :things

  get 'start' => 'quests#index'

  get 'logout' => 'sessions#destroy'
  get 'signin' => 'sessions#new'
  get 'signup' => 'users#new'
  
  get 'parents' => 'static_pages#parents'
  get 'about' => 'static_pages#about'
  get 'contacts' => 'static_pages#contacts'
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
