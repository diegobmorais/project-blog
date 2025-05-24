<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Gerenciar Anúncios</h1>
              <p class="mt-2 text-gray-600">Gerencie os anúncios publicitários do site</p>
            </div>
            <router-link 
              to="/admin/ads/create" 
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Novo Anúncio
            </router-link>
          </div>
        </div>
  
        <!-- Filtros -->
        <div class="bg-white p-6 rounded-lg shadow mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                v-model="filters.search"
                @input="filterAds"
                placeholder="Buscar por título..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="filters.status"
                @change="filterAds"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="expired">Expirado</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Posição</label>
              <select
                v-model="filters.position"
                @change="filterAds"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todas</option>
                <option value="header">Cabeçalho</option>
                <option value="sidebar">Barra Lateral</option>
                <option value="footer">Rodapé</option>
                <option value="content">Conteúdo</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select
                v-model="filters.type"
                @change="filterAds"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                <option value="banner">Banner</option>
                <option value="text">Texto</option>
                <option value="video">Vídeo</option>
              </select>
            </div>
          </div>
        </div>
  
        <!-- Loading -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <svg class="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
  
        <!-- Lista de Anúncios -->
        <div v-else class="bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Anúncio
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posição
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliques
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="ad in filteredAds" :key="ad.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-12 w-12">
                        <img v-if="ad.image_url" :src="ad.image_url" :alt="ad.title" class="h-12 w-12 rounded object-cover">
                        <div v-else class="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                          <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ ad.title }}</div>
                        <div class="text-sm text-gray-500">{{ ad.description }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {{ ad.position }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {{ ad.type }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': ad.status === 'active',
                        'bg-red-100 text-red-800': ad.status === 'inactive',
                        'bg-yellow-100 text-yellow-800': ad.status === 'expired'
                      }"
                    >
                      {{ getStatusLabel(ad.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{{ formatDate(ad.start_date) }}</div>
                    <div class="text-gray-500">{{ formatDate(ad.end_date) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ ad.clicks || 0 }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <router-link
                        :to="`/admin/ads/${ad.id}/edit`"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </router-link>
                      <button
                        @click="toggleAdStatus(ad)"
                        class="text-yellow-600 hover:text-yellow-900"
                      >
                        <svg v-if="ad.status === 'active'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9V5a3 3 0 00-6 0v5a2 2 0 002 2h.01M10 9a2 2 0 012 2v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5a2 2 0 012-2h4zm.01 0a2 2 0 012 2v5a2 2 0 01-2 2H10a2 2 0 01-2-2v-5a2 2 0 012-2h.01z"/>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                        </svg>
                      </button>
                      <button
                        @click="deleteAd(ad)"
                        class="text-red-600 hover:text-red-900"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Empty State -->
          <div v-if="filteredAds.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum anúncio encontrado</h3>
            <p class="mt-1 text-sm text-gray-500">Comece criando um novo anúncio.</p>
            <div class="mt-6">
              <router-link
                to="/admin/ads/create"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Novo Anúncio
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdIndex',
    data() {
      return {
        ads: [],
        filteredAds: [],
        loading: true,
        filters: {
          search: '',
          status: '',
          position: '',
          type: ''
        }
      }
    },
    async mounted() {
      await this.loadAds()
    },
    methods: {
      async loadAds() {
        try {
          const response = await fetch('/api/admin/ads', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
  
          if (response.ok) {
            this.ads = await response.json()
            this.filteredAds = [...this.ads]
          }
        } catch (error) {
          console.error('Erro ao carregar anúncios:', error)
        } finally {
          this.loading = false
        }
      },
  
      filterAds() {
        this.filteredAds = this.ads.filter(ad => {
          const matchesSearch = !this.filters.search || 
            ad.title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
            ad.description.toLowerCase().includes(this.filters.search.toLowerCase())
          
          const matchesStatus = !this.filters.status || ad.status === this.filters.status
          const matchesPosition = !this.filters.position || ad.position === this.filters.position
          const matchesType = !this.filters.type || ad.type === this.filters.type
  
          return matchesSearch && matchesStatus && matchesPosition && matchesType
        })
      },
  
      async toggleAdStatus(ad) {
        try {
          const newStatus = ad.status === 'active' ? 'inactive' : 'active'
          const response = await fetch(`/api/admin/ads/${ad.id}/toggle-status`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ status: newStatus })
          })
  
          if (response.ok) {
            ad.status = newStatus
            this.filterAds()
          }
        } catch (error) {
          console.error('Erro ao alterar status do anúncio:', error)
        }
      },
  
      async deleteAd(ad) {
        if (confirm('Tem certeza que deseja excluir este anúncio?')) {
          try {
            const response = await fetch(`/api/admin/ads/${ad.id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            })
  
            if (response.ok) {
              this.ads = this.ads.filter(a => a.id !== ad.id)
              this.filterAds()
            }
          } catch (error) {
            console.error('Erro ao excluir anúncio:', error)
          }
        }
      },
  
      getStatusLabel(status) {
        const labels = {
          'active': 'Ativo',
          'inactive': 'Inativo',
          'expired': 'Expirado'
        }
        return labels[status] || status
      },
  
      formatDate(date) {
        if (!date) return '-'
        return new Date(date).toLocaleDateString('pt-BR')
      }
    }
  }
  </script>
  