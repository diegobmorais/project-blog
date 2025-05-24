<template>
    <div>
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">Artigos</h1>
          <p class="mt-2 text-sm text-gray-700">
            Gerencie todos os artigos do seu blog
          </p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <router-link
            to="/admin/articles/create"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Novo Artigo
          </router-link>
        </div>
      </div>
  
      <!-- Filtros -->
      <div class="mt-6 bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label for="search" class="block text-sm font-medium text-gray-700">Buscar</label>
              <input
                id="search"
                v-model="filters.search"
                @input="applyFilters"
                type="text"
                placeholder="Título do artigo..."
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                v-model="filters.status"
                @change="applyFilters"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="published">Publicado</option>
                <option value="draft">Rascunho</option>
                <option value="scheduled">Agendado</option>
              </select>
            </div>
            <div>
              <label for="section" class="block text-sm font-medium text-gray-700">Seção</label>
              <select
                id="section"
                v-model="filters.section"
                @change="applyFilters"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Todas</option>
                <option
                  v-for="section in sections"
                  :key="section.id"
                  :value="section.id"
                >
                  {{ section.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="author" class="block text-sm font-medium text-gray-700">Autor</label>
              <select
                id="author"
                v-model="filters.author"
                @change="applyFilters"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option
                  v-for="author in authors"
                  :key="author.id"
                  :value="author.id"
                >
                  {{ author.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Lista de artigos -->
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Artigo
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Autor
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Seções
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Data
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-if="loading">
                    <td colspan="6" class="px-6 py-4 text-center">
                      <div class="flex justify-center">
                        <svg class="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="articles.length === 0">
                    <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                      Nenhum artigo encontrado
                    </td>
                  </tr>
                  <tr v-else v-for="article in articles" :key="article.id">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img
                            :src="article.featured_image || '/placeholder.svg?height=40&width=40'"
                            :alt="article.title"
                            class="h-10 w-10 rounded object-cover"
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {{ article.title }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ article.slug }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        :class="[
                          'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                          article.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : article.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        ]"
                      >
                        {{ getStatusText(article.status) }}
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ article.author?.name }}
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-500">
                      <div class="flex flex-wrap gap-1">
                        <span
                          v-for="section in article.sections"
                          :key="section.id"
                          class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                        >
                          {{ section.name }}
                        </span>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ formatDate(article.created_at) }}
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div class="flex justify-end space-x-2">
                        <router-link
                          :to="`/articles/${article.slug}`"
                          target="_blank"
                          class="text-indigo-600 hover:text-indigo-900"
                        >
                          Ver
                        </router-link>
                        <router-link
                          :to="`/admin/articles/${article.id}/edit`"
                          class="text-indigo-600 hover:text-indigo-900"
                        >
                          Editar
                        </router-link>
                        <button
                          @click="deleteArticle(article)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Paginação -->
      <div v-if="pagination.total > pagination.per_page" class="mt-6 flex items-center justify-between">
        <div class="flex flex-1 justify-between sm:hidden">
          <button
            @click="goToPage(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            @click="goToPage(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.last_page"
            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Mostrando
              <span class="font-medium">{{ pagination.from }}</span>
              a
              <span class="font-medium">{{ pagination.to }}</span>
              de
              <span class="font-medium">{{ pagination.total }}</span>
              resultados
            </p>
          </div>
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                @click="goToPage(pagination.current_page - 1)"
                :disabled="pagination.current_page === 1"
                class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Anterior</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20',
                  page === pagination.current_page
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              
              <button
                @click="goToPage(pagination.current_page + 1)"
                :disabled="pagination.current_page === pagination.last_page"
                class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Próximo</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useArticleStore } from '../../../stores/article.js';
  import { useSectionStore } from '../../../stores/section.js';
  import { useUserStore } from '../../../stores/user.js';
  import { useNotificationStore } from '../../../stores/notification.js';
  
  const articleStore = useArticleStore();
  const sectionStore = useSectionStore();
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();
  
  const loading = ref(true);
  const articles = ref([]);
  const sections = ref([]);
  const authors = ref([]);
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    from: 0,
    to: 0
  });
  
  const filters = ref({
    search: '',
    status: '',
    section: '',
    author: ''
  });
  
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
  
  const visiblePages = computed(() => {
    const pages = [];
    const total = pagination.value.last_page;
    const current = pagination.value.current_page;
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      }
    }
    
    return pages;
  });
  
  const loadArticles = async (page = 1) => {
    try {
      loading.value = true;
      const response = await articleStore.getAll({
        page,
        ...filters.value
      });
      
      articles.value = response.data.data;
      pagination.value = {
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        per_page: response.data.per_page,
        total: response.data.total,
        from: response.data.from,
        to: response.data.to
      };
    } catch (error) {
      console.error('Erro ao carregar artigos:', error);
      notificationStore.add({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao carregar artigos'
      });
    } finally {
      loading.value = false;
    }
  };
  
  const loadFiltersData = async () => {
    try {
      const [sectionsResponse, authorsResponse] = await Promise.all([
        sectionStore.getAll(),
        userStore.getAuthors()
      ]);
      
      sections.value = sectionsResponse.data;
      authors.value = authorsResponse.data;
    } catch (error) {
      console.error('Erro ao carregar dados dos filtros:', error);
    }
  };
  
  const applyFilters = () => {
    loadArticles(1);
  };
  
  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.value.last_page) {
      loadArticles(page);
    }
  };
  
  const deleteArticle = async (article) => {
    if (confirm(`Tem certeza que deseja excluir o artigo "${article.title}"?`)) {
      try {
        await articleStore.delete(article.id);
        
        notificationStore.add({
          type: 'success',
          title: 'Sucesso',
          message: 'Artigo excluído com sucesso'
        });
        
        loadArticles(pagination.value.current_page);
      } catch (error) {
        console.error('Erro ao excluir artigo:', error);
        notificationStore.add({
          type: 'error',
          title: 'Erro',
          message: 'Erro ao excluir artigo'
        });
      }
    }
  };
  
  onMounted(() => {
    loadArticles();
    loadFiltersData();
  });
  </script>
  