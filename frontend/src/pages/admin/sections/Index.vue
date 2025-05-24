<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Seções</h1>
                <p class="mt-1 text-sm text-gray-600">Gerencie as seções do seu blog</p>
              </div>
              <router-link
                to="/admin/sections/create"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Nova Seção
              </router-link>
            </div>
          </div>
  
          <!-- Filtros -->
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div class="flex-1 max-w-lg">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    v-model="searchTerm"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Buscar seções..."
                  />
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <select
                  v-model="statusFilter"
                  class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos os status</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Lista de Seções -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div v-if="loading" class="p-6">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p class="mt-4 text-gray-600">Carregando seções...</p>
            </div>
          </div>
  
          <div v-else-if="filteredSections.length === 0" class="p-6 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma seção encontrada</h3>
            <p class="mt-1 text-sm text-gray-500">Comece criando uma nova seção.</p>
            <div class="mt-6">
              <router-link
                to="/admin/sections/create"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Nova Seção
              </router-link>
            </div>
          </div>
  
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seção
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artigos
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Criado em
                  </th>
                  <th class="relative px-6 py-3">
                    <span class="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="section in paginatedSections" :key="section.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ section.name }}
                        </div>
                        <div class="text-sm text-gray-500" v-if="section.description">
                          {{ section.description.substring(0, 60) }}{{ section.description.length > 60 ? '...' : '' }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ section.slug }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ section.articles_count || 0 }} artigos
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="{
                        'bg-green-100 text-green-800': section.status === 'active',
                        'bg-red-100 text-red-800': section.status === 'inactive'
                      }"
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    >
                      {{ section.status === 'active' ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(section.created_at) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end space-x-2">
                      <router-link
                        :to="`/sections/${section.slug}`"
                        target="_blank"
                        class="text-blue-600 hover:text-blue-900"
                        title="Visualizar"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </router-link>
                      <router-link
                        :to="`/admin/sections/${section.id}/edit`"
                        class="text-indigo-600 hover:text-indigo-900"
                        title="Editar"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </router-link>
                      <button
                        @click="deleteSection(section)"
                        class="text-red-600 hover:text-red-900"
                        title="Excluir"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Paginação -->
          <div v-if="totalPages > 1" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 flex justify-between sm:hidden">
                <button
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Anterior
                </button>
                <button
                  @click="currentPage++"
                  :disabled="currentPage === totalPages"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Próximo
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Mostrando
                    <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span>
                    até
                    <span class="font-medium">{{ Math.min(currentPage * perPage, filteredSections.length) }}</span>
                    de
                    <span class="font-medium">{{ filteredSections.length }}</span>
                    resultados
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      @click="currentPage--"
                      :disabled="currentPage === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                    </button>
                    
                    <button
                      v-for="page in visiblePages"
                      :key="page"
                      @click="currentPage = page"
                      :class="{
                        'bg-blue-50 border-blue-500 text-blue-600': page === currentPage,
                        'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== currentPage
                      }"
                      class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      {{ page }}
                    </button>
                    
                    <button
                      @click="currentPage++"
                      :disabled="currentPage === totalPages"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SectionIndex',
    data() {
      return {
        loading: true,
        sections: [],
        searchTerm: '',
        statusFilter: '',
        currentPage: 1,
        perPage: 10
      }
    },
    computed: {
      filteredSections() {
        let filtered = this.sections
  
        if (this.searchTerm) {
          filtered = filtered.filter(section =>
            section.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            section.slug.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (section.description && section.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
          )
        }
  
        if (this.statusFilter) {
          filtered = filtered.filter(section => section.status === this.statusFilter)
        }
  
        return filtered
      },
      totalPages() {
        return Math.ceil(this.filteredSections.length / this.perPage)
      },
      paginatedSections() {
        const start = (this.currentPage - 1) * this.perPage
        const end = start + this.perPage
        return this.filteredSections.slice(start, end)
      },
      visiblePages() {
        const pages = []
        const start = Math.max(1, this.currentPage - 2)
        const end = Math.min(this.totalPages, this.currentPage + 2)
        
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }
        
        return pages
      }
    },
    watch: {
      searchTerm() {
        this.currentPage = 1
      },
      statusFilter() {
        this.currentPage = 1
      }
    },
    async mounted() {
      await this.loadSections()
    },
    methods: {
      async loadSections() {
        this.loading = true
        try {
          const response = await fetch('/api/sections')
          this.sections = await response.json()
        } catch (error) {
          console.error('Erro ao carregar seções:', error)
        } finally {
          this.loading = false
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString('pt-BR')
      },
      async deleteSection(section) {
        if (confirm(`Tem certeza que deseja excluir a seção "${section.name}"? Esta ação não pode ser desfeita.`)) {
          try {
            const response = await fetch(`/api/sections/${section.id}`, {
              method: 'DELETE',
              headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
              }
            })
  
            if (response.ok) {
              await this.loadSections()
            } else {
              console.error('Erro ao excluir seção')
            }
          } catch (error) {
            console.error('Erro:', error)
          }
        }
      }
    }
  }
  </script>
  