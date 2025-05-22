... shell ...

Vamos continuar com os componentes do painel de administração:

```vue file="resources/js/components/admin/AdminHeader.vue"
<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/admin/dashboard" class="text-2xl font-bold text-gray-800">
              BlogAdmin
            </router-link>
          </div>
          <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link 
              to="/admin/dashboard" 
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="{ 'border-indigo-500 text-gray-900': $route.path.includes('/admin/dashboard') }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/admin/articles" 
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="{ 'border-indigo-500 text-gray-900': $route.path.includes('/admin/articles') }"
            >
              Artigos
            </router-link>
            <router-link 
              to="/admin/sections" 
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="{ 'border-indigo-500 text-gray-900': $route.path.includes('/admin/sections') }"
            >
              Sessões
            </router-link>
            <router-link 
              to="/admin/ads" 
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="{ 'border-indigo-500 text-gray-900': $route.path.includes('/admin/ads') }"
            >
              Anúncios
            </router-link>
            <router-link 
              v-if="isAdmin"
              to="/admin/users" 
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="{ 'border-indigo-500 text-gray-900': $route.path.includes('/admin/users') }"
            >
              Usuários
            </router-link>
          </nav>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div class="ml-3 relative">
            <div>
              <button 
                @click="toggleDropdown" 
                class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Abrir menu do usuário</span>
                <span class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500 text-white">
                  {{ user?.name?.charAt(0).toUpperCase() }}
                </span>
                <span class="ml-2">{{ user?.name }}</span>
              </button>
            </div>
            <div 
              v-if="showDropdown" 
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <router-link 
                to="/admin/profile" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Seu Perfil
              </router-link>
              <a 
                href="#" 
                @click.prevent="logout" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sair
              </a>
            </div>
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
          to="/admin/dashboard" 
          class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': $route.path.includes('/admin/dashboard'), 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': !$route.path.includes('/admin/dashboard') }"
        >
          Dashboard
        </router-link>
        <router-link 
          to="/admin/articles" 
          class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': $route.path.includes('/admin/articles'), 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': !$route.path.includes('/admin/articles') }"
        >
          Artigos
        </router-link>
        <router-link 
          to="/admin/sections" 
          class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': $route.path.includes('/admin/sections'), 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': !$route.path.includes('/admin/sections') }"
        >
          Sessões
        </router-link>
        <router-link 
          to="/admin/ads" 
          class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': $route.path.includes('/admin/ads'), 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': !$route.path.includes('/admin/ads') }"
        >
          Anúncios
        </router-link>
        <router-link 
          v-if="isAdmin"
          to="/admin/users" 
          class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': $route.path.includes('/admin/users'), 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': !$route.path.includes('/admin/users') }"
        >
          Usuários
        </router-link>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 text-white">
              {{ user?.name?.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ user?.name }}</div>
            <div class="text-sm font-medium text-gray-500">{{ user?.email }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <router-link 
            to="/admin/profile" 
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Seu Perfil
          </router-link>
          <a 
            href="#" 
            @click.prevent="logout" 
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Sair
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const showDropdown = ref(false);
const showMobileMenu = ref(false);

const user = computed(() => authStore.user);
const isAdmin = computed(() => authStore.user?.role === 'admin');

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>
