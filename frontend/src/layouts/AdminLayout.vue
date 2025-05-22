<template>
    <div class="h-screen flex overflow-hidden bg-gray-100">
      <!-- Sidebar -->
      <div class="hidden md:flex md:flex-shrink-0">
        <div class="flex flex-col w-64">
          <div class="flex flex-col h-0 flex-1 bg-gray-800">
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div class="flex items-center flex-shrink-0 px-4">
                <span class="text-white text-xl font-bold">Blog Admin</span>
              </div>
              <nav class="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
                <router-link 
                  to="/admin/dashboard" 
                  class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  :class="[
                    $route.path.includes('/admin/dashboard') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ]"
                >
                  <svg 
                    class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                  </svg>
                  Dashboard
                </router-link>
  
                <router-link 
                  to="/admin/articles" 
                  class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  :class="[
                    $route.path.includes('/admin/articles') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ]"
                >
                  <svg 
                    class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                    />                  
                </svg>
                  Artigos
                </router-link>
  
                <router-link 
                  to="/admin/sections" 
                  class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  :class="[
                    $route.path.includes('/admin/sections') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ]"
                >
                  <svg 
                    class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
                    />
                  
                </svg>
                Sessões
                </router-link>
  
                <router-link 
                  to="/admin/ads" 
                  class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  :class="[
                    $route.path.includes('/admin/ads') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ]"
                >
                  <svg 
                    class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" 
                    />
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" 
                    />
                  
                </svg>
                Anúncios
                </router-link>
  
                <router-link 
                  v-if="isAdmin"
                  to="/admin/users" 
                  class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  :class="[
                    $route.path.includes('/admin/users') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ]"
                >
                  <svg 
                    class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                    />
                  
                </svg>
                Usuários
                </router-link>
  
                <router-link 
                  to="/admin/settings" 
                  class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  :class="[
                    $route.path.includes('/admin/settings') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ]"
                >
                  <svg 
                    class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                    />
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  
                </svg>
                Configurações
                </router-link>
              </nav>
            </div>
            <div class="flex-shrink-0 flex bg-gray-700 p-4">
              <div class="flex-shrink-0 w-full group block">
                <div class="flex items-center">
                  <div>
                    <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 text-white">
                      {{ user?.name?.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-white">{{ user?.name }}</p>
                    <p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                      {{ user?.role === 'admin' ? 'Administrador' : 'Autor' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="flex flex-col w-0 flex-1 overflow-hidden">
        <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button 
            @click="toggleSidebar" 
            class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Abrir sidebar</span>
            <svg 
              class="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
        <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <slot></slot>
            </div>
          </div>
        </main>
      </div>
      
      <!-- Mobile sidebar -->
      <div 
        v-if="sidebarOpen" 
        class="fixed inset-0 flex z-40 md:hidden"
      >
        <div 
          class="fixed inset-0 bg-gray-600 bg-opacity-75"
          @click="closeSidebar"
        ></div>
        
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button 
              @click="closeSidebar" 
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Fechar sidebar</span>
              <svg 
                class="h-6 w-6 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
          
          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex-shrink-0 flex items-center px-4">
              <span class="text-white text-xl font-bold">Blog Admin</span>
            </div>
            <nav class="mt-5 px-2 space-y-1">
              <router-link 
                to="/admin/dashboard" 
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                :class="[
                  $route.path.includes('/admin/dashboard') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                ]"
                @click="closeSidebar"
              >
                <svg 
                  class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                
              </svg>
                Dashboard
              </router-link>
  
              <router-link 
                to="/admin/articles" 
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                :class="[
                  $route.path.includes('/admin/articles') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                ]"
                @click="closeSidebar"
              >
                <svg 
                  class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                  />
                
              </svg>
                Artigos
              </router-link>
  
              <router-link 
                to="/admin/sections" 
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                :class="[
                  $route.path.includes('/admin/sections') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                ]"
                @click="closeSidebar"
              >
                <svg 
                  class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
                  />
                
              </svg>
                Sessões
              </router-link>
  
              <router-link 
                to="/admin/ads" 
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                :class="[
                  $route.path.includes('/admin/ads') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                ]"
                @click="closeSidebar"
              >
                <svg 
                  class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" 
                  />
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" 
                  />
                
              </svg>
                Anúncios
              </router-link>
  
              <router-link 
                v-if="isAdmin"
                to="/admin/users" 
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                :class="[
                  $route.path.includes('/admin/users') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                ]"
                @click="closeSidebar"
              >
                <svg 
                  class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                  />
                
              </svg>
                Usuários
              </router-link>
  
              <router-link 
                to="/admin/settings" 
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                :class="[
                  $route.path.includes('/admin/settings') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                ]"
                @click="closeSidebar"
              >
                <svg 
                  class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                    />
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  
                </svg>
                Configurações
              </router-link>
            </nav>
          </div>
          <div class="flex-shrink-0 flex bg-gray-700 p-4">
            <div class="flex-shrink-0 group block">
              <div class="flex items-center">
                <div>
                  <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 text-white">
                    {{ user?.name?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div class="ml-3">
                  <p class="text-base font-medium text-white">{{ user?.name }}</p>
                  <p class="text-sm font-medium text-gray-300 group-hover:text-gray-200">
                    {{ user?.role === 'admin' ? 'Administrador' : 'Autor' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useAuthStore } from '../stores/auth';
  
  const authStore = useAuthStore();
  const sidebarOpen = ref(false);
  
  const user = computed(() => authStore.user);
  const isAdmin = computed(() => authStore.user?.role === 'admin');
  
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };
  
  const closeSidebar = () => {
    sidebarOpen.value = false;
  };
  </script>
  