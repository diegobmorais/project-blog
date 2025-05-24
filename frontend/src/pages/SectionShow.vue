<template>
    <public-layout>
      <div class="bg-white">
        <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="animate-pulse">
            <div class="h-8 bg-gray-300 rounded mb-4"></div>
            <div class="h-4 bg-gray-300 rounded mb-8 w-1/2"></div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="n in 6" :key="n">
                <div class="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div class="h-4 bg-gray-300 rounded mb-2"></div>
                <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
  
        <div v-else-if="section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Breadcrumb -->
          <nav class="flex mb-8" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <router-link to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Home
                </router-link>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{{ section.name }}</span>
                </div>
              </li>
            </ol>
          </nav>
  
          <!-- Section Header -->
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {{ section.name }}
            </h1>
            <p v-if="section.description" class="text-xl text-gray-600 max-w-3xl mx-auto">
              {{ section.description }}
            </p>
            <div class="mt-4 text-sm text-gray-500">
              {{ articles.length }} artigos encontrados
            </div>
          </div>
  
          <!-- Ad Slot - Topo -->
          <ad-slot position="section-top" class="my-8" />
  
          <!-- Filters and Search -->
          <div class="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div class="relative flex-1 max-w-md">
              <input
                v-model="searchQuery"
                @input="filterArticles"
                type="text"
                placeholder="Buscar nesta seção..."
                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <select
                v-model="sortBy"
                @change="sortArticles"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="newest">Mais Recentes</option>
                <option value="oldest">Mais Antigos</option>
                <option value="title">Título A-Z</option>
                <option value="popular">Mais Populares</option>
              </select>
              
              <div class="flex border border-gray-300 rounded-lg">
                <button
                  @click="viewMode = 'grid'"
                  :class="[
                    'px-3 py-2 text-sm font-medium',
                    viewMode === 'grid' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  ]"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="[
                    'px-3 py-2 text-sm font-medium border-l border-gray-300',
                    viewMode === 'list' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  ]"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
  
          <!-- Articles Grid/List -->
          <div v-if="filteredArticles.length > 0">
            <!-- Grid View -->
            <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article-card
                v-for="article in paginatedArticles"
                :key="article.id"
                :article="article"
              />
            </div>
  
            <!-- List View -->
            <div v-else class="space-y-6">
              <div
                v-for="article in paginatedArticles"
                :key="article.id"
                class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div class="p-6">
                  <div class="flex items-start space-x-4">
                    <div v-if="article.featured_image" class="flex-shrink-0">
                      <img
                        :src="article.featured_image"
                        :alt="article.title"
                        class="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <router-link
                        :to="`/articles/${article.slug}`"
                        class="block hover:text-indigo-600 transition-colors"
                      >
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">
                          {{ article.title }}
                        </h3>
                      </router-link>
                      <p v-if="article.excerpt" class="text-gray-600 mb-3 line-clamp-2">
                        {{ article.excerpt }}
                      </p>
                      <div class="flex items-center text-sm text-gray-500">
                        <span>{{ formatDate(article.published_at) }}</span>
                        <span class="mx-2">•</span>
                        <span>{{ article.reading_time }} min de leitura</span>
                        <span v-if="article.author" class="mx-2">•</span>
                        <span v-if="article.author">{{ article.author.name }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Ad Slot - Meio -->
            <ad-slot position="section-middle" class="my-8" />
  
            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-12 flex justify-center">
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="goToPage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Anterior</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    page === currentPage
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
                
                <button
                  @click="goToPage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Próximo</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
  
          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum artigo encontrado</h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ searchQuery ? 'Tente ajustar sua busca.' : 'Esta seção ainda não possui artigos.' }}
            </p>
          </div>
  
          <!-- Ad Slot - Rodapé -->
          <ad-slot position="section-bottom" class="my-8" />
        </div>
  
        <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Seção não encontrada</h3>
            <p class="mt-1 text-sm text-gray-500">A seção que você está procurando não existe ou foi removida.</p>
            <div class="mt-6">
              <router-link
                to="/"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Voltar ao Início
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </public-layout>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import PublicLayout from '../layouts/PublicLayout.vue';
  import ArticleCard from '../components/ui/ArticleCard.vue';
  import AdSlot from '../components/ui/AdSlot.vue';
  import { useSectionStore } from '../stores/section.js';
  
  const route = useRoute();
  const sectionStore = useSectionStore();
  
  const loading = ref(true);
  const section = ref(null);
  const articles = ref([]);
  const searchQuery = ref('');
  const sortBy = ref('newest');
  const viewMode = ref('grid');
  const currentPage = ref(1);
  const itemsPerPage = 12;
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  const filteredArticles = computed(() => {
    let filtered = [...articles.value];
    
    // Filtrar por busca
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(query))
      );
    }
    
    // Ordenar
    switch (sortBy.value) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.published_at) - new Date(b.published_at));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    }
    
    return filtered;
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredArticles.value.length / itemsPerPage);
  });
  
  const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredArticles.value.slice(start, end);
  });
  
  const visiblePages = computed(() => {
    const pages = [];
    const total = totalPages.value;
    const current = currentPage.value;
    
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
  
  const filterArticles = () => {
    currentPage.value = 1;
  };
  
  const sortArticles = () => {
    currentPage.value = 1;
  };
  
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const loadSection = async () => {
    try {
      loading.value = true;
      const slug = route.params.slug;
      
      const response = await sectionStore.getBySlug(slug);
      section.value = response.data;
      articles.value = response.data.articles || [];
      
    } catch (error) {
      console.error('Erro ao carregar seção:', error);
      section.value = null;
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    loadSection();
  });
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  