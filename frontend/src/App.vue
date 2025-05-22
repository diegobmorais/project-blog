<template>
  <div class="min-h-screen flex flex-col">
    <Notifications />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import Notifications from './components/ui/Notifications.vue';

const authStore = useAuthStore();

// Check if user is already authenticated
onMounted(() => {
  authStore.checkAuth();
});
</script>
