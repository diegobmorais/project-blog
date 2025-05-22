<template>
    <div class="min-h-screen flex flex-col">
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <router-link to="/" class="text-2xl font-bold text-gray-800">
                  ModernBlog
                </router-link>
              </div>
              <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <router-link 
                  to="/" 
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  :class="{ 'border-indigo-500 text-gray-900': $route.path === '/' }"
                >
                  Home
                </router-link>
                <router-link 
                  to="/sections" 
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  :class="{ 'border-indigo-500 text-gray-900': $route.path.includes('/sections') }"
                >
                  Sessões
                </router-link>
                <router-link 
                  to="/about" 
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  :class="{ 'border-indigo-500 text-gray-900': $route.path === '/about' }"
                >
                  Sobre
                </router-link>
              </nav>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:items-center">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  @keyup.enter="search"
                  type="text"
                  placeholder="Buscar artigos..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    class="h-5 w-5 text-gray-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    aria-hidden="true"
                  >
                    <path 
                      fill-rule="evenodd" 
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                      clip-rule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <router-link 
                  to="/login" 
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </router-link>
              </div>
            </div>
            <div class="-mr-2 flex items-center sm:hidden">
              <button 
                @click="toggleMobileMenu" 
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Abrir menu principal</span>
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
          </div>
        </div>
  
        <div v-if="showMobileMenu" class="sm:hidden">
          <div class="pt-2 pb-3 space-y-1">
            <router-link 
              to="/" 
              class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': $route.path === '/', 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': $route.path !== '/' }"
              @click="showMobileMenu = false"
            >
              Home
            </router-link>
            <router-link 
              to="/sections" 
              class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': $route.path.includes('/sections'), 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': !$route.path.includes('/sections') }"
              @click="showMobileMenu = false"
            >
              Sessões
            </router-link>
            <router-link 
              to="/about" 
              class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': $route.path === '/about', 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': $route.path !== '/about' }"
              @click="showMobileMenu = false"
            >
              Sobre
            </router-link>
          </div>
          <div class="pt-4 pb-3 border-t border-gray-200">
            <div class="px-4 space-y-3">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  @keyup.enter="search"
                  type="text"
                  placeholder="Buscar artigos..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    class="h-5 w-5 text-gray-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    aria-hidden="true"
                  >
                    <path 
                      fill-rule="evenodd" 
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                      clip-rule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
              <router-link 
                to="/login" 
                class="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="showMobileMenu = false"
              >
                Login
              </router-link>
            </div>
          </div>
        </div>
      </header>
  
      <main class="flex-grow">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <slot></slot>
        </div>
      </main>
  
      <footer class="bg-gray-800 text-white">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-4">ModernBlog</h3>
              <p class="text-gray-300">
                Um blog moderno construído com Laravel 12 e Vue 3.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul class="space-y-2">
                <li>
                  <router-link to="/" class="text-gray-300 hover:text-white">
                    Home
                  </router-link>
                </li>
                <li>
                  <router-link to="/sections" class="text-gray-300 hover:text-white">
                    Sessões
                  </router-link>
                </li>
                <li>
                  <router-link to="/about" class="text-gray-300 hover:text-white">
                    Sobre
                  </router-link>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Contato</h3>
              <p class="text-gray-300">
                contato@modernblog.com
              </p>
              <div class="flex space-x-4 mt-4">
                <a href="#" class="text-gray-300 hover:text-white">
                  <span class="sr-only">Facebook</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="text-gray-300 hover:text-white">
                  <span class="sr-only">Twitter</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" class="text-gray-300 hover:text-white">
                  <span class="sr-only">GitHub</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="mt-8 border-t border-gray-700 pt-8 text-center">
            <p class="text-gray-300">
              &copy; {{ new Date().getFullYear() }} ModernBlog. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
      
      <notifications />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Notifications from '../components/ui/Notifications.vue';
  
  const router = useRouter();
  const showMobileMenu = ref(false);
  const searchQuery = ref('');
  
  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value;
  };
  
  const search = () => {
    if (searchQuery.value.trim()) {
      router.push({ path: '/search', query: { q: searchQuery.value } });
      searchQuery.value = '';
      showMobileMenu.value = false;
    }
  };
  </script>
  