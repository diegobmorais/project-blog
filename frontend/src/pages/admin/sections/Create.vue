<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold text-gray-900">Criar Nova Seção</h1>
              <router-link 
                to="/admin/sections" 
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Voltar
              </router-link>
            </div>
          </div>
  
          <form @submit.prevent="submitForm" class="p-6 space-y-6">
            <!-- Nome -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Nome da Seção *
              </label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Tecnologia, Esportes, Política..."
              />
            </div>
  
            <!-- Slug -->
            <div>
              <label for="slug" class="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                v-model="form.slug"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="tecnologia"
              />
              <p class="mt-1 text-sm text-gray-500">
                URL amigável para a seção. Se deixado em branco, será gerado automaticamente.
              </p>
            </div>
  
            <!-- Descrição -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Breve descrição sobre esta seção..."
              ></textarea>
            </div>
  
            <!-- Configurações -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Status -->
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
  
              <!-- Ordem -->
              <div>
                <label for="sort_order" class="block text-sm font-medium text-gray-700 mb-2">
                  Ordem de Exibição
                </label>
                <input
                  type="number"
                  id="sort_order"
                  v-model.number="form.sort_order"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
                <p class="mt-1 text-sm text-gray-500">
                  Menor número aparece primeiro no menu.
                </p>
              </div>
            </div>
  
            <!-- SEO -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">SEO</h3>
              
              <div class="space-y-4">
                <!-- Meta Title -->
                <div>
                  <label for="meta_title" class="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="meta_title"
                    v-model="form.meta_title"
                    maxlength="60"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Título para mecanismos de busca"
                  />
                  <p class="mt-1 text-sm text-gray-500">
                    {{ form.meta_title ? form.meta_title.length : 0 }}/60 caracteres
                  </p>
                </div>
  
                <!-- Meta Description -->
                <div>
                  <label for="meta_description" class="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="meta_description"
                    v-model="form.meta_description"
                    rows="3"
                    maxlength="160"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Descrição para mecanismos de busca"
                  ></textarea>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ form.meta_description ? form.meta_description.length : 0 }}/160 caracteres
                  </p>
                </div>
              </div>
            </div>
  
            <!-- Aparência -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Aparência</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Cor -->
                <div>
                  <label for="color" class="block text-sm font-medium text-gray-700 mb-2">
                    Cor da Seção
                  </label>
                  <div class="flex items-center space-x-3">
                    <input
                      type="color"
                      id="color"
                      v-model="form.color"
                      class="h-10 w-16 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      v-model="form.color"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
  
                <!-- Ícone -->
                <div>
                  <label for="icon" class="block text-sm font-medium text-gray-700 mb-2">
                    Ícone (classe CSS)
                  </label>
                  <input
                    type="text"
                    id="icon"
                    v-model="form.icon"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="fas fa-laptop-code"
                  />
                </div>
              </div>
  
              <!-- Imagem de Capa -->
              <div class="mt-6">
                <label for="cover_image" class="block text-sm font-medium text-gray-700 mb-2">
                  Imagem de Capa
                </label>
                <input
                  type="url"
                  id="cover_image"
                  v-model="form.cover_image"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                
                <div v-if="form.cover_image" class="mt-3">
                  <img :src="form.cover_image" alt="Preview" class="w-full h-48 object-cover rounded-md" />
                </div>
              </div>
            </div>
  
            <!-- Botões de Ação -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <router-link
                to="/admin/sections"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancelar
              </router-link>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {{ loading ? 'Criando...' : 'Criar Seção' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SectionCreate',
    data() {
      return {
        loading: false,
        form: {
          name: '',
          slug: '',
          description: '',
          status: 'active',
          sort_order: 0,
          meta_title: '',
          meta_description: '',
          color: '#3B82F6',
          icon: '',
          cover_image: ''
        }
      }
    },
    watch: {
      'form.name'(newName) {
        if (newName && !this.form.slug) {
          this.form.slug = this.generateSlug(newName)
        }
        if (newName && !this.form.meta_title) {
          this.form.meta_title = newName
        }
      }
    },
    methods: {
      generateSlug(text) {
        return text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim('-')
      },
      async submitForm() {
        this.loading = true
        try {
          const response = await fetch('/api/sections', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(this.form)
          })
  
          if (response.ok) {
            this.$router.push('/admin/sections')
          } else {
            console.error('Erro ao criar seção')
          }
        } catch (error) {
          console.error('Erro:', error)
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  