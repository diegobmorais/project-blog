<template>
    <div v-if="ad" class="ad-slot" :class="positionClass">
      <div v-html="ad.content"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useAdStore } from '../../stores/ad';
  
  const adStore = useAdStore();
  const ad = ref(null);
  
  const props = defineProps({
    position: {
      type: String,
      required: true,
      validator: (value) => ['header', 'sidebar', 'article_top', 'article_middle', 'article_bottom', 'footer'].includes(value)
    }
  });
  
  const positionClass = computed(() => {
    return {
      'ad-header': props.position === 'header',
      'ad-sidebar': props.position === 'sidebar',
      'ad-article-top': props.position === 'article_top',
      'ad-article-middle': props.position === 'article_middle',
      'ad-article-bottom': props.position === 'article_bottom',
      'ad-footer': props.position === 'footer'
    };
  });
  
  onMounted(async () => {
    try {
      ad.value = await adStore.fetchAdByPosition(props.position);
    } catch (error) {
      console.error('Failed to load ad:', error);
    }
  });
  </script>
  
  <style scoped>
  .ad-slot {
    @apply my-4 overflow-hidden;
  }
  </style>
  