<template>
    <div class="px-4 py-5 sm:px-6">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-1 text-sm text-gray-500">Visão geral do seu blog</p>
    </div>
    
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Card de estatísticas de artigos -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total de Artigos
                  </dt>
                  <dd>
                    <div class="text-lg font-medium text-gray-900">
                      {{ stats.totalArticles }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6">
            <div class="text-sm">
              <router-link to="/admin/articles" class="font-medium text-indigo-600 hover:text-indigo-500">
                Ver todos os artigos
              </router-link>
            </div>
          </div>
        </div>
  
        <!-- Card de estatísticas de sessões -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total de Sessões
                  </dt>
                  <dd>
                    <div class="text-lg font-medium text-gray-900">
                      {{ stats.totalSections }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6">
            <div class="text-sm">
              <router-link to="/admin/sections" class="font-medium text-indigo-600 hover:text-indigo-500">
                Ver todas as sessões
              </router-link>
            </div>
          </div>
        </div>
  
        <!-- Card de estatísticas de usuários -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total de Usuários
                  </dt>
                  <dd>
                    <div class="text-lg font-medium text-gray-900">
                      {{ stats.totalUsers }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6">
            <div class="text-sm">
              <router-link to="/admin/users" class="font-medium text-indigo-600 hover:text-indigo-500">
                Ver todos os usuários
              </router-link>
            </div>
          </div>
        </div>
  
        <!-- Card de estatísticas de anúncios -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Anúncios Ativos
                  </dt>
                  <dd>
                    <div class="text-lg font-medium text-gray-900">
                      {{ stats.totalAds }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6">
            <div class="text-sm">
              <router-link to="/admin/ads" class="font-medium text-indigo-600 hover:text-indigo-500">
                Gerenciar anúncios
              </router-link>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Gráficos e estatísticas detalhadas -->
      <div class="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <!-- Artigos recentes -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Artigos Recentes
            </h3>
            <div v-if="recentArticles.length > 0" class="space-y-3">
              <div
                v-for="article in recentArticles"
                :key="article.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div class="flex-1">
                  <router-link
                    :to="`/admin/articles/${article.id}/edit`"
                    class="text-sm font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {{ article.title }}
                  </router-link>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ formatDate(article.created_at) }}
                  </p>
                </div>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    article.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : article.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  ]"
                >
                  {{ getStatusText(article.status) }}
                </span>
              </div>
            </div>
            <div v-else class="text-center py-6">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum artigo</h3>
              <p class="mt-1 text-sm text-gray-500">Comece criando seu primeiro artigo.</p>
              <div class="mt-6">
                <router-link
                  to="/admin/articles/create"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  Novo Artigo
                </router-link>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Atividade recente -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Atividade Recente
            </h3>
            <div v-if="recentActivity.length > 0" class="flow-root">
              <ul class="-mb-8">
                <li
                  v-for="(activity, index) in recentActivity"
                  :key="activity.id"
                  class="relative pb-8"
                >
                  <div v-if="index !== recentActivity.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></div>
                  <div class="relative flex space-x-3">
                    <div>
                      <span
                        :class="[
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                          activity.type === 'article' ? 'bg-blue-500' : 
                          activity.type === 'user' ? 'bg-green-500' : 'bg-purple-500'
                        ]"
                      >
                        <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path v-if="activity.type === 'article'" fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                          <path v-else-if="activity.type === 'user'" fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                          <path v-else fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p class="text-sm text-gray-500">
                          {{ activity.description }}
                        </p>
                      </div>
                      <div class="text-right text-sm whitespace-nowrap text-gray-500">
                        {{ formatDate(activity.created_at) }}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="text-center py-6">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma atividade</h3>
              <p class="mt-1 text-sm text-gray-500">A atividade recente aparecerá aqui.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useDashboardStore } from '../../stores/dashboard.js';
  
  const dashboardStore = useDashboardStore();
  
  const stats = ref({
    totalArticles: 0,
    totalSections: 0,
    totalUsers: 0,
    totalAds: 0
  });
  
  const recentArticles = ref([]);
  const recentActivity = ref([]);
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  const getStatusText = (status) => {
    const statusMap = {
      'published': 'Publicado',
      'draft': 'Rascunho',
      'scheduled': 'Agendado'
    };
    return statusMap[status] || status;
  };
  
  const loadDashboardData = async () => {
    try {
      const response = await dashboardStore.getStats();
      stats.value = response.data.stats;
      recentArticles.value = response.data.recentArticles || [];
      recentActivity.value = response.data.recentActivity || [];
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    }
  };
  
  onMounted(() => {
    loadDashboardData();
  });
  </script>
  
  