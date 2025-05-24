<template>
    <public-layout>
      <div class="bg-white">
        <!-- Hero Section -->
        <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 py-16">
          <div class="absolute inset-0 bg-black opacity-50"></div>
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
              <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
                ModernBlog
              </h1>
              <p class="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Descubra artigos incríveis sobre tecnologia, desenvolvimento e muito mais.
              </p>
              <div class="flex justify-center">
                <div class="relative max-w-md w-full">
                  <input
                    v-model="searchQuery"
                    @keyup.enter="search"
                    type="text"
                    placeholder="Buscar artigos..."
                    class="w-full px-4 py-3 pl-12 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Ad Slot - Topo -->
        <ad-slot position="top" class="my-8" />
  
        <!-- Featured Articles -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Artigos em Destaque</h2>
            <p class="text-lg text-gray-600">Os melhores conteúdos selecionados para você</p>
          </div>
  
          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="n in 6" :key="n" class="animate-pulse">
              <div class="bg-gray-300 h-48 rounded-lg mb-4"></div>
              <div class="h-4 bg-gray-300 rounded mb-2"></div>
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
  
          <div v-else-if="featuredArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article-card
              v-for="article in featuredArticles"
              :key="article.id"
              :article="article"
              :featured="true"
            />
          </div>
  
          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum artigo encontrado</h3>
            <p class="mt-1 text-sm text-gray-500">Comece criando seu primeiro artigo.</p>
          </div>
        </div>
  
        <!-- Ad Slot - Meio -->
        <ad-slot position="middle" class="my-8" />
  
        <!-- Latest Articles -->
        <div class="bg-gray-50 py-12">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Últimas Publicações</h2>
              <p class="text-lg text-gray-600">Fique por dentro das novidades</p>
            </div>
  
            <div v-if="latestArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <article-card
                v-for="article in latestArticles"
                :key="article.id"
                :article="article"
                :compact="true"
              />
            </div>
  
            <div class="text-center mt-8">
              <router-link
                to="/articles"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ver Todos os Artigos
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
  
        <!-- Sections -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Explore por Categoria</h2>
            <p class="text-lg text-gray-600">Encontre conteúdo do seu interesse</p>
          </div>
  
          <div v-if="sections.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <router-link
              v-for="section in sections"
              :key="section.id"
              :to="`/sections/${section.slug}`"
              class="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div class="aspect-w-16 aspect-h-9">
                <img
                  :src="section.image || '/placeholder.svg?height=200&width=300'"
                  :alt="section.name"
                  class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {{ section.name }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  {{ section.articles_count }} artigos
                </p>
              </div>
            </router-link>
          </div>
        </div>
  
        <!-- Ad Slot - Rodapé -->
        <ad-slot position="bottom" class="my-8" />
      </div>
    </public-layout>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import PublicLayout from '../layouts/PublicLayout.vue';
  import ArticleCard from '../components/ui/ArticleCard.vue';
  import AdSlot from '../components/ui/AdSlot.vue';
  import { useArticleStore } from '../stores/article.js';
  import { useSectionStore } from '../stores/section.js';
  
  const router = useRouter();
  const articleStore = useArticleStore();
  const sectionStore = useSectionStore();
  
  const searchQuery = ref('');
  const loading = ref(true);
  const featuredArticles = ref([]);
  const latestArticles = ref([]);
  const sections = ref([]);
  
  const search = () => {
    if (searchQuery.value.trim()) {
      router.push({ path: '/search', query: { q: searchQuery.value } });
      searchQuery.value = '';
    }
  };
  
  const loadData = async () => {
    try {
      loading.value = true;
      
      // Carregar artigos em destaque
      const featuredResponse = await articleStore.getFeatured();
      featuredArticles.value = featuredResponse.data || [];
      
      // Carregar últimos artigos
      const latestResponse = await articleStore.getLatest();
      latestArticles.value = latestResponse.data || [];
      
      // Carregar seções
      const sectionsResponse = await sectionStore.getAll();
      sections.value = sectionsResponse.data || [];
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    loadData();
  });
  </script>
  