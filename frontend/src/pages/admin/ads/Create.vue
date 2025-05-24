<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <!-- Header -->
          <div class="mb-8">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-900">Criar Anúncio</h1>
                <p class="mt-2 text-sm text-gray-600">
                  Adicione um novo anúncio ao sistema
                </p>
              </div>
              <router-link
                to="/admin/ads"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Voltar
              </router-link>
            </div>
          </div>
  
          <!-- Form -->
          <div class="bg-white shadow rounded-lg">
            <form @submit.prevent="submitForm" class="space-y-6 p-6">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- Nome do Anúncio -->
                <div class="sm:col-span-2">
                  <label for="title" class="block text-sm font-medium text-gray-700">
                    Título do Anúncio *
                  </label>
                  <input
                    type="text"
                    id="title"
                    v-model="form.title"
                    required
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Digite o título do anúncio"
                  />
                  <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
                </div>
  
                <!-- Tipo de Anúncio -->
                <div>
                  <label for="type" class="block text-sm font-medium text-gray-700">
                    Tipo de Anúncio *
                  </label>
                  <select
                    id="type"
                    v-model="form.type"
                    required
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="banner">Banner</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="popup">Pop-up</option>
                    <option value="inline">Inline</option>
                  </select>
                  <p v-if="errors.type" class="mt-1 text-sm text-red-600">{{ errors.type }}</p>
                </div>
  
                <!-- Posição -->
                <div>
                  <label for="position" class="block text-sm font-medium text-gray-700">
                    Posição
                  </label>
                  <select
                    id="position"
                    v-model="form.position"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Selecione a posição</option>
                    <option value="top">Topo</option>
                    <option value="middle">Meio</option>
                    <option value="bottom">Rodapé</option>
                    <option value="left">Esquerda</option>
                    <option value="right">Direita</option>
                  </select>
                </div>
  
                <!-- URL do Link -->
                <div class="sm:col-span-2">
                  <label for="url" class="block text-sm font-medium text-gray-700">
                    URL do Link
                  </label>
                  <input
                    type="url"
                    id="url"
                    v-model="form.url"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="https://exemplo.com"
                  />
                  <p v-if="errors.url" class="mt-1 text-sm text-red-600">{{ errors.url }}</p>
                </div>
  
                <!-- Imagem -->
                <div class="sm:col-span-2">
                  <label for="image" class="block text-sm font-medium text-gray-700">
                    Imagem do Anúncio
                  </label>
                  <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <div class="flex text-sm text-gray-600">
                        <label for="image" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Enviar arquivo</span>
                          <input id="image" name="image" type="file" class="sr-only" @change="handleImageUpload" accept="image/*">
                        </label>
                        <p class="pl-1">ou arraste e solte</p>
                      </div>
                      <p class="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                    </div>
                  </div>
                  <div v-if="form.image_preview" class="mt-4">
                    <img :src="form.image_preview" alt="Preview" class="h-32 w-auto rounded-lg shadow-md">
                  </div>
                </div>
  
                <!-- Código HTML/JavaScript -->
                <div class="sm:col-span-2">
                  <label for="code" class="block text-sm font-medium text-gray-700">
                    Código HTML/JavaScript
                  </label>
                  <textarea
                    id="code"
                    v-model="form.code"
                    rows="6"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Cole aqui o código do anúncio (HTML, JavaScript, etc.)"
                  ></textarea>
                  <p class="mt-2 text-sm text-gray-500">
                    Você pode inserir código HTML ou JavaScript para anúncios personalizados
                  </p>
                </div>
  
                <!-- Data de Início -->
                <div>
                  <label for="start_date" class="block text-sm font-medium text-gray-700">
                    Data de Início
                  </label>
                  <input
                    type="datetime-local"
                    id="start_date"
                    v-model="form.start_date"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
  
                <!-- Data de Fim -->
                <div>
                  <label for="end_date" class="block text-sm font-medium text-gray-700">
                    Data de Fim
                  </label>
                  <input
                    type="datetime-local"
                    id="end_date"
                    v-model="form.end_date"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
  
                <!-- Status -->
                <div class="sm:col-span-2">
                  <div class="flex items-center">
                    <input
                      id="is_active"
                      v-model="form.is_active"
                      type="checkbox"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="is_active" class="ml-2 block text-sm text-gray-900">
                      Anúncio ativo
                    </label>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">
                    Marque para ativar o anúncio imediatamente
                  </p>
                </div>
              </div>
  
              <!-- Botões -->
              <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <router-link
                  to="/admin/ads"
                  class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </router-link>
                <button
                  type="submit"
                  :disabled="loading"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ loading ? 'Salvando...' : 'Criar Anúncio' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdCreate',
    data() {
      return {
        loading: false,
        form: {
          title: '',
          type: '',
          position: '',
          url: '',
          image: null,
          image_preview: null,
          code: '',
          start_date: '',
          end_date: '',
          is_active: true
        },
        errors: {}
      }
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0]
        if (file) {
          this.form.image = file
          const reader = new FileReader()
          reader.onload = (e) => {
            this.form.image_preview = e.target.result
          }
          reader.readAsDataURL(file)
        }
      },
      async submitForm() {
        this.loading = true
        this.errors = {}
  
        try {
          const formData = new FormData()
          Object.keys(this.form).forEach(key => {
            if (key !== 'image_preview' && this.form[key] !== null) {
              formData.append(key, this.form[key])
            }
          })
  
          const response = await fetch('/api/admin/ads', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
  
          if (response.ok) {
            this.$router.push('/admin/ads')
            // Mostrar notificação de sucesso
          } else {
            const errorData = await response.json()
            this.errors = errorData.errors || {}
          }
        } catch (error) {
          console.error('Erro ao criar anúncio:', error)
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  