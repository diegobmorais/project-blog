<template>
    <public-layout>
      <div class="bg-white">
        <div v-if="loading" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="animate-pulse">
            <div class="h-8 bg-gray-300 rounded mb-4"></div>
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
            <div class="h-64 bg-gray-300 rounded mb-8"></div>
            <div class="space-y-4">
              <div class="h-4 bg-gray-300 rounded"></div>
              <div class="h-4 bg-gray-300 rounded"></div>
              <div class="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
  
        <article v-else-if="article" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <li v-if="article.sections && article.sections.length > 0">
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                  <router-link
                    :to="`/sections/${article.sections[0].slug}`"
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                  >
                    {{ article.sections[0].name }}
                  </router-link>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{{ article.title }}</span>
                </div>
              </li>
            </ol>
          </nav>
  
          <!-- Article Header -->
          <header class="mb-8">
            <div class="mb-4">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="section in article.sections"
                  :key="section.id"
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {{ section.name }}
                </span>
              </div>
            </div>
            
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {{ article.title }}
            </h1>
            
            <p v-if="article.excerpt" class="text-xl text-gray-600 mb-6">
              {{ article.excerpt }}
            </p>
            
            <div class="flex items-center text-sm text-gray-500 mb-6">
              <div class="flex items-center">
                <img
                  :src="article.author?.avatar || '/placeholder.svg?height=40&width=40'"
                  :alt="article.author?.name"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p class="font-medium text-gray-900">{{ article.author?.name }}</p>
                  <p>{{ formatDate(article.published_at) }}</p>
                </div>
              </div>
              <span class="mx-2">•</span>
              <span>{{ article.reading_time }} min de leitura</span>
            </div>
          </header>
  
          <!-- Featured Image -->
          <div v-if="article.featured_image" class="mb-8">
            <img
              :src="article.featured_image"
              :alt="article.title"
              class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
  
          <!-- Ad Slot - Topo do Artigo -->
          <ad-slot position="article-top" class="my-8" />
  
          <!-- Article Content -->
          <div class="prose prose-lg max-w-none mb-8">
            <div v-html="article.content"></div>
          </div>
  
          <!-- Ad Slot - Meio do Artigo -->
          <ad-slot position="article-middle" class="my-8" />
  
          <!-- Article Footer -->
          <footer class="border-t border-gray-200 pt-8 mt-8">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <span class="text-sm text-gray-500 mr-4">Compartilhar:</span>
                <div class="flex space-x-3">
                  <a
                    :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`"
                    target="_blank"
                    class="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`"
                    target="_blank"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                    </svg>
                  </a>
                  <a
                    :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`"
                    target="_blank"
                    class="text-gray-400 hover:text-blue-700 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              <div class="text-sm text-gray-500">
                Atualizado em {{ formatDate(article.updated_at) }}
              </div>
            </div>
          </footer>
  
          <!-- Ad Slot - Rodapé do Artigo -->
          <ad-slot position="article-bottom" class="my-8" />
  
          <!-- Related Articles -->
          <section v-if="relatedArticles.length > 0" class="mt-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Artigos Relacionados</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <article-card
                v-for="relatedArticle in relatedArticles"
                :key="relatedArticle.id"
                :article="relatedArticle"
                :compact="true"
              />
            </div>
          </section>
        </article>
  
        <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Artigo não encontrado</h3>
            <p class="mt-1 text-sm text-gray-500">O artigo que você está procurando não existe ou foi removido.</p>
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
  import { useArticleStore } from '../stores/article.js';
  
  const route = useRoute();
  const articleStore = useArticleStore();
  
  const loading = ref(true);
  const article = ref(null);
  const relatedArticles = ref([]);
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  const loadArticle = async () => {
    try {
      loading.value = true;
      const slug = route.params.slug;
      
      const response = await articleStore.getBySlug(slug);
      article.value = response.data;
      
      // Carregar artigos relacionados
      if (article.value) {
        const relatedResponse = await articleStore.getRelated(article.value.id);
        relatedArticles.value = relatedResponse.data || [];
      }
      
    } catch (error) {
      console.error('Erro ao carregar artigo:', error);
      article.value = null;
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    loadArticle();
  });
  </script>
  
  <style scoped>
  .prose {
    @apply text-gray-700;
  }
  
  .prose h1,
  .prose h2,
  .prose h3,
  .prose h4,
  .prose h5,
  .prose h6 {
    @apply text-gray-900 font-bold;
  }
  
  .prose h1 {
    @apply text-3xl mb-4;
  }
  
  .prose h2 {
    @apply text-2xl mb-3 mt-8;
  }
  
  .prose h3 {
    @apply text-xl mb-2 mt-6;
  }
  
  .prose p {
    @apply mb-4 leading-relaxed;
  }
  
  .prose ul,
  .prose ol {
    @apply mb-4 pl-6;
  }
  
  .prose li {
    @apply mb-2;
  }
  
  .prose blockquote {
    @apply border-l-4 border-indigo-500 pl-4 italic text-gray-600 my-6;
  }
  
  .prose code {
    @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
  }
  
  .prose pre {
    @apply bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-6;
  }
  
  .prose img {
    @apply rounded-lg shadow-md my-6;
  }
  
  .prose a {
    @apply text-indigo-600 hover:text-indigo-800 underline;
  }
  </style>
  