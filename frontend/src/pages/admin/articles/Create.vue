<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold text-gray-900">Criar Novo Artigo</h1>
              <router-link 
                to="/admin/articles" 
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
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Coluna Principal -->
              <div class="lg:col-span-2 space-y-6">
                <!-- Título -->
                <div>
                  <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    id="title"
                    v-model="form.title"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Digite o título do artigo"
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
                    placeholder="slug-do-artigo"
                  />
                </div>
  
                <!-- Resumo -->
                <div>
                  <label for="excerpt" class="block text-sm font-medium text-gray-700 mb-2">
                    Resumo
                  </label>
                  <textarea
                    id="excerpt"
                    v-model="form.excerpt"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Breve descrição do artigo"
                  ></textarea>
                </div>
  
                <!-- Conteúdo -->
                <div>
                  <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
                    Conteúdo *
                  </label>
                  <textarea
                    id="content"
                    v-model="form.content"
                    rows="15"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Conteúdo do artigo em HTML ou Markdown"
                  ></textarea>
                </div>
              </div>
  
              <!-- Sidebar -->
              <div class="space-y-6">
                <!-- Status -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Publicação</h3>
                  
                  <div class="space-y-4">
                    <div>
                      <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        id="status"
                        v-model="form.status"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="draft">Rascunho</option>
                        <option value="published">Publicado</option>
                        <option value="scheduled">Agendado</option>
                      </select>
                    </div>
  
                    <div v-if="form.status === 'scheduled'">
                      <label for="published_at" class="block text-sm font-medium text-gray-700 mb-2">
                        Data de Publicação
                      </label>
                      <input
                        type="datetime-local"
                        id="published_at"
                        v-model="form.published_at"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
  
                <!-- Seção -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Categorização</h3>
                  
                  <div>
                    <label for="section_id" class="block text-sm font-medium text-gray-700 mb-2">
                      Seção
                    </label>
                    <select
                      id="section_id"
                      v-model="form.section_id"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Selecione uma seção</option>
                      <option v-for="section in sections" :key="section.id" :value="section.id">
                        {{ section.name }}
                      </option>
                    </select>
                  </div>
                </div>
  
                <!-- Imagem Destacada -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Imagem Destacada</h3>
                  
                  <div>
                    <label for="featured_image" class="block text-sm font-medium text-gray-700 mb-2">
                      URL da Imagem
                    </label>
                    <input
                      type="url"
                      id="featured_image"
                      v-model="form.featured_image"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>
  
                  <div v-if="form.featured_image" class="mt-3">
                    <img :src="form.featured_image" alt="Preview" class="w-full h-32 object-cover rounded-md" />
                  </div>
                </div>
  
                <!-- Tags -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Tags</h3>
                  
                  <div>
                    <input
                      type="text"
                      v-model="tagInput"
                      @keydown.enter.prevent="addTag"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Digite uma tag e pressione Enter"
                    />
                  </div>
  
                  <div v-if="form.tags.length > 0" class="mt-3 flex flex-wrap gap-2">
                    <span
                      v-for="(tag, index) in form.tags"
                      :key="index"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ tag }}
                      <button
                        type="button"
                        @click="removeTag(index)"
                        class="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Botões de Ação -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <router-link
                to="/admin/articles"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancelar
              </router-link>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {{ loading ? 'Salvando...' : 'Criar Artigo' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ArticleCreate',
    data() {
      return {
        loading: false,
        tagInput: '',
        sections: [],
        form: {
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          status: 'draft',
          published_at: '',
          section_id: '',
          featured_image: '',
          tags: []
        }
      }
    },
    watch: {
      'form.title'(newTitle) {
        if (newTitle && !this.form.slug) {
          this.form.slug = this.generateSlug(newTitle)
        }
      }
    },
    async mounted() {
      await this.loadSections()
    },
    methods: {
      async loadSections() {
        try {
          const response = await fetch('/api/sections')
          this.sections = await response.json()
        } catch (error) {
          console.error('Erro ao carregar seções:', error)
        }
      },
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
      addTag() {
        const tag = this.tagInput.trim()
        if (tag && !this.form.tags.includes(tag)) {
          this.form.tags.push(tag)
          this.tagInput = ''
        }
      },
      removeTag(index) {
        this.form.tags.splice(index, 1)
      },
      async submitForm() {
        this.loading = true
        try {
          const response = await fetch('/api/articles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(this.form)
          })
  
          if (response.ok) {
            this.$router.push('/admin/articles')
          } else {
            console.error('Erro ao criar artigo')
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
  