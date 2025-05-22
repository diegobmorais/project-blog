<template>
    <article class="card overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-md">
      <div v-if="article.featured_image" class="aspect-w-16 aspect-h-9">
        <img 
          :src="article.featured_image" 
          :alt="article.title" 
          class="object-cover w-full h-full"
        >
      </div>
      <div class="p-5 flex-1 flex flex-col">
        <div v-if="article.sections && article.sections.length" class="mb-2">
          <router-link 
            v-for="section in article.sections" 
            :key="section.id" 
            :to="{ name: 'section.show', params: { slug: section.slug } }"
            class="inline-block text-xs font-medium text-primary-600 hover:text-primary-800 mr-2"
          >
            {{ section.name }}
          </router-link>
        </div>
        <h3 class="text-xl font-bold mb-2">
          <router-link 
            :to="{ name: 'article.show', params: { slug: article.slug } }"
            class="text-gray-900 hover:text-primary-600 transition-colors"
          >
            {{ article.title }}
          </router-link>
        </h3>
        <p class="text-gray-600 mb-4 flex-1">{{ article.excerpt }}</p>
        <div class="flex items-center justify-between text-sm text-gray-500 mt-auto">
          <div class="flex items-center">
            <img 
              v-if="article.author && article.author.avatar" 
              :src="article.author.avatar" 
              :alt="article.author.name"
              class="w-8 h-8 rounded-full mr-2 object-cover"
            >
            <span>{{ article.author ? article.author.name : 'Unknown' }}</span>
          </div>
          <time :datetime="formatDate(article.published_at, 'YYYY-MM-DD')">
            {{ formatDate(article.published_at) }}
          </time>
        </div>
      </div>
    </article>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import dayjs from 'dayjs';
  
  const props = defineProps({
    article: {
      type: Object,
      required: true
    }
  });
  
  const formatDate = (date, format = 'MMM D, YYYY') => {
    if (!date) return '';
    return dayjs(date).format(format);
  };
  </script>
  