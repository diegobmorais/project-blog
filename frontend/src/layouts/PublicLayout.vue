<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Bar -->
    <div class="bg-gray-900 text-white py-2 hidden md:block">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center text-sm">
          <div class="flex items-center space-x-4">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              {{ currentDate }}
            </span>
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              {{ currentTime }}
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <a href="#" class="hover:text-blue-400 transition-colors">Sobre</a>
            <a href="#" class="hover:text-blue-400 transition-colors">Contato</a>
            <a href="#" class="hover:text-blue-400 transition-colors">Newsletter</a>
            <div class="flex items-center space-x-2">
              <a href="#" class="hover:text-blue-400 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="hover:text-blue-400 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="hover:text-blue-400 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <header class="bg-white shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Logo and Search Row -->
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center">
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-2xl px-4 py-2 rounded-lg">
                MB
              </div>
              <div class="ml-3">
                <h1 class="text-2xl font-bold text-gray-900">Meu Blog</h1>
                <p class="text-sm text-gray-500">Tecnologia e Inovação</p>
              </div>
            </router-link>
          </div>

          <!-- Search Bar -->
          <div class="hidden md:flex flex-1 max-w-lg mx-8">
            <div class="relative w-full">
              <input
                v-model="searchQuery"
                @keyup.enter="search"
                type="text"
                placeholder="Buscar artigos, tutoriais, reviews..."
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button 
                @click="search"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <div class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
                  Buscar
                </div>
              </button>
            </div>
          </div>

          <!-- User Actions -->
          <div class="flex items-center space-x-4">
            <button class="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h6v-7a1 1 0 011-1h4a1 1 0 011 1v7h6M4 10l8-8 8 8" />
              </svg>
              <span class="text-sm font-medium">Newsletter</span>
            </button>
            
            <router-link 
              to="/login" 
              class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium"
            >
              Entrar
            </router-link>

            <!-- Mobile Menu Button -->
            <button 
              @click="toggleMobileMenu" 
              class="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="hidden md:block border-t border-gray-200">
          <div class="flex items-center space-x-8 py-4">
            <router-link 
              v-for="item in mainNavigation" 
              :key="item.path"
              :to="item.path"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
              :class="{ 'text-blue-600': isActive(item.path) }"
            >
              {{ item.label }}
              <span v-if="isActive(item.path)" class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
            </router-link>
            
            <!-- Categories Dropdown -->
            <div class="relative group">
              <button class="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
                Categorias
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="p-4">
                  <div class="grid grid-cols-1 gap-2">
                    <a v-for="category in categories" :key="category.id" href="#" class="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
                      {{ category.name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-gray-200">
        <div class="px-4 py-4 space-y-4">
          <!-- Mobile Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              @keyup.enter="search"
              type="text"
              placeholder="Buscar artigos..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Mobile Navigation -->
          <nav class="space-y-2">
            <router-link 
              v-for="item in mainNavigation" 
              :key="item.path"
              :to="item.path"
              @click="showMobileMenu = false"
              class="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors font-medium"
              :class="{ 'bg-blue-50 text-blue-600': isActive(item.path) }"
            >
              {{ item.label }}
            </router-link>
          </nav>

          <!-- Mobile Categories -->
          <div class="border-t border-gray-200 pt-4">
            <h3 class="text-sm font-semibold text-gray-900 mb-2">Categorias</h3>
            <div class="space-y-1">
              <a v-for="category in categories" :key="category.id" href="#" class="block px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
                {{ category.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Breadcrumb -->
    <div v-if="showBreadcrumb" class="bg-gray-100 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav class="flex items-center space-x-2 text-sm">
          <router-link to="/" class="text-blue-600 hover:text-blue-800">Home</router-link>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-gray-600">{{ breadcrumbText }}</span>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-grow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Main Content Area -->
          <div class="flex-1">
            <slot></slot>
          </div>

          <!-- Sidebar -->
          <aside class="lg:w-80 space-y-6">
            <!-- Newsletter Signup -->
            <div class="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-xl">
              <h3 class="text-lg font-bold mb-2">📧 Newsletter</h3>
              <p class="text-blue-100 text-sm mb-4">Receba as últimas novidades em tecnologia direto no seu email!</p>
              <form @submit.prevent="subscribeNewsletter" class="space-y-3">
                <input 
                  v-model="newsletterEmail"
                  type="email" 
                  placeholder="Seu melhor email" 
                  class="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                >
                <button 
                  type="submit" 
                  class="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Inscrever-se Grátis
                </button>
              </form>
            </div>

            <!-- Popular Articles -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                🔥 Mais Populares
              </h3>
              <div class="space-y-4">
                <article v-for="(article, index) in popularArticles" :key="article.id" class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2">
                      {{ article.title }}
                    </h4>
                    <p class="text-xs text-gray-500 mt-1">{{ article.views }} visualizações</p>
                  </div>
                </article>
              </div>
            </div>

            <!-- Categories Widget -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">📂 Categorias</h3>
              <div class="space-y-2">
                <a v-for="category in categories" :key="category.id" href="#" class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <span class="text-gray-700 group-hover:text-blue-600 font-medium">{{ category.name }}</span>
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{{ category.count }}</span>
                </a>
              </div>
            </div>

            <!-- Social Media -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">🌐 Siga-nos</h3>
              <div class="grid grid-cols-2 gap-3">
                <a href="#" class="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </a>
                <a href="#" class="flex items-center justify-center p-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                  Facebook
                </a>
                <a href="#" class="flex items-center justify-center p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                  Instagram
                </a>
                <a href="#" class="flex items-center justify-center p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
              </div>
            </div>

            <!-- Ad Space -->
            <div class="bg-gray-100 rounded-xl p-6 text-center">
              <p class="text-gray-500 text-sm mb-2">Publicidade</p>
              <div class="bg-white rounded-lg p-8 border-2 border-dashed border-gray-300">
                <p class="text-gray-400">Espaço para anúncio</p>
                <p class="text-xs text-gray-400 mt-1">300x250</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- About -->
          <div>
            <div class="flex items-center mb-4">
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-3 py-2 rounded-lg">
                MB
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-bold">Meu Blog</h3>
              </div>
            </div>
            <p class="text-gray-300 text-sm mb-4">
              Seu portal de tecnologia e inovação. Trazemos as últimas novidades, reviews, tutoriais e análises do mundo tech.
            </p>
            <div class="flex space-x-3">
              <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Navegação</h3>
            <ul class="space-y-2">
              <li><router-link to="/" class="text-gray-300 hover:text-white transition-colors text-sm">Home</router-link></li>
              <li><router-link to="/articles" class="text-gray-300 hover:text-white transition-colors text-sm">Artigos</router-link></li>
              <li><router-link to="/reviews" class="text-gray-300 hover:text-white transition-colors text-sm">Reviews</router-link></li>
              <li><router-link to="/tutorials" class="text-gray-300 hover:text-white transition-colors text-sm">Tutoriais</router-link></li>
              <li><router-link to="/news" class="text-gray-300 hover:text-white transition-colors text-sm">Notícias</router-link></li>
              <li><router-link to="/about" class="text-gray-300 hover:text-white transition-colors text-sm">Sobre</router-link></li>
            </ul>
          </div>

          <!-- Categories -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Categorias</h3>
            <ul class="space-y-2">
              <li v-for="category in categories.slice(0, 6)" :key="category.id">
                <a href="#" class="text-gray-300 hover:text-white transition-colors text-sm">{{ category.name }}</a>
              </li>
            </ul>
          </div>

          <!-- Contact & Newsletter -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Contato</h3>
            <div class="space-y-3 text-sm text-gray-300">
              <p class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contato@Meu Blog.com
              </p>
              <p class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (11) 99999-9999
              </p>
            </div>
            
            <div class="mt-6">
              <h4 class="text-sm font-semibold mb-2">Newsletter</h4>
              <form @submit.prevent="subscribeNewsletter" class="flex">
                <input 
                  v-model="newsletterEmail"
                  type="email" 
                  placeholder="Seu email" 
                  class="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                >
                <button 
                  type="submit" 
                  class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Bottom Footer -->
        <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            &copy; {{ new Date().getFullYear() }} Meu Blog. Todos os direitos reservados.
          </p>
          <div class="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Política de Privacidade</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Termos de Uso</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
    
    <notifications />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Notifications from '../components/ui/Notifications.vue';

const router = useRouter();
const route = useRoute();

const showMobileMenu = ref(false);
const searchQuery = ref('');
const newsletterEmail = ref('');
const currentTime = ref('');
const currentDate = ref('');

// Navigation data
const mainNavigation = [
  { label: 'Home', path: '/' },
  { label: 'Artigos', path: '/articles' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Tutoriais', path: '/tutorials' },
  { label: 'Notícias', path: '/news' },
];

const categories = ref([
  { id: 1, name: 'Smartphones', slug: 'smartphones', count: 45 },
  { id: 2, name: 'Laptops', slug: 'laptops', count: 32 },
  { id: 3, name: 'Gaming', slug: 'gaming', count: 28 },
  { id: 4, name: 'Inteligência Artificial', slug: 'ia', count: 24 },
  { id: 5, name: 'Programação', slug: 'programacao', count: 56 },
  { id: 6, name: 'Gadgets', slug: 'gadgets', count: 19 },
  { id: 7, name: 'Software', slug: 'software', count: 41 },
  { id: 8, name: 'Hardware', slug: 'hardware', count: 33 },
]);

const popularArticles = ref([
  { id: 1, title: 'Como configurar um ambiente de desenvolvimento React em 2024', views: '12.5k' },
  { id: 2, title: 'Os melhores smartphones custo-benefício de 2024', views: '8.9k' },
  { id: 3, title: 'Guia completo de Machine Learning para iniciantes', views: '7.2k' },
  { id: 4, title: 'Review: iPhone 15 Pro Max vs Samsung Galaxy S24 Ultra', views: '6.8k' },
  { id: 5, title: 'Como otimizar seu PC para gaming em 2024', views: '5.4k' },
]);

// Computed properties
const showBreadcrumb = computed(() => {
  return route.path !== '/';
});

const breadcrumbText = computed(() => {
  const pathSegments = route.path.split('/').filter(segment => segment);
  return pathSegments[pathSegments.length - 1] || 'Página';
});

// Methods
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const isActive = (path) => {
  return route.path === path;
};

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } });
    searchQuery.value = '';
    showMobileMenu.value = false;
  }
};

const subscribeNewsletter = () => {
  if (newsletterEmail.value.trim()) {
    // Here you would make an API call to subscribe the user
    console.log('Newsletter subscription:', newsletterEmail.value);
    alert('Obrigado por se inscrever na nossa newsletter!');
    newsletterEmail.value = '';
  }
};

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  currentDate.value = now.toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Lifecycle
const interval = setInterval(updateTime, 60000); // Update every minute

onMounted(() => {
  updateTime();
});

onUnmounted(() => {
  clearInterval(interval);
});

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  if (showMobileMenu.value && !event.target.closest('.mobile-menu')) {
    showMobileMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for categories */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Hover effects */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}
</style>
