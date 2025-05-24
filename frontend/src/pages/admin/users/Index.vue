<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Usuários</h1>
                <p class="mt-1 text-sm text-gray-600">Gerencie os usuários do sistema</p>
              </div>
              <router-link
                to="/admin/users/create"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Novo Usuário
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
                    placeholder="Buscar usuários..."
                  />
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <select
                  v-model="roleFilter"
                  class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todas as funções</option>
                  <option value="admin">Administrador</option>
                  <option value="editor">Editor</option>
                  <option value="author">Autor</option>
                </select>
                
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
  
        <!-- Lista de Usuários -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div v-if="loading" class="p-6">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p class="mt-4 text-gray-600">Carregando usuários...</p>
            </div>
          </div>
  
          <div v-else-if="filteredUsers.length === 0" class="p-6 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum usuário encontrado</h3>
            <p class="mt-1 text-sm text-gray-500">Comece criando um novo usuário.</p>
            <div class="mt-6">
              <router-link
                to="/admin/users/create"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Novo Usuário
              </router-link>
            </div>
          </div>
  
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Função
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artigos
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último acesso
                  </th>
                  <th class="relative px-6 py-3">
                    <span class="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          v-if="user.avatar"
                          :src="user.avatar"
                          :alt="user.name"
                          class="h-10 w-10 rounded-full"
                        />
                        <div
                          v-else
                          class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center"
                        >
                          <span class="text-sm font-medium text-gray-700">
                            {{ user.name.charAt(0).toUpperCase() }}
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ user.name }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ user.email }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="{
                        'bg-purple-100 text-purple-800': user.role === 'admin',
                        'bg-blue-100 text-blue-800': user.role === 'editor',
                        'bg-green-100 text-green-800': user.role === 'author'
                      }"
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    >
                      {{ getRoleLabel(user.role) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.articles_count || 0 }} artigos
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="{
                        'bg-green-100 text-green-800': user.status === 'active',
                        'bg-red-100 text-red-800': user.status === 'inactive'
                      }"
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    >
                      {{ user.status === 'active' ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.last_login_at ? formatDate(user.last_login_at) : 'Nunca' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end space-x-2">
                      <router-link
                        :to="`/admin/users/${user.id}/edit`"
                        class="text-indigo-600 hover:text-indigo-900"
                        title="Editar"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </router-link>
                      <button
                        @click="deleteUser(user)"
                        class="text-red-600 hover:text-red-900"
                        title="Excluir"
                        :disabled="user.id === currentUserId"
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
                    <span class="font-medium">{{ Math.min(currentPage * perPage, filteredUsers.length) }}</span>
                    de
                    <span class="font-medium">{{ filteredUsers.length }}</span>
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
    name: 'UserIndex',
    data() {
      return {
        loading: true,
        users: [],
        searchTerm: '',
        roleFilter: '',
        statusFilter: '',
        currentPage: 1,
        perPage: 10,
        currentUserId: null
      }
    },
    computed: {
      filteredUsers() {
        let filtered = this.users
  
        if (this.searchTerm) {
          filtered = filtered.filter(user =>
            user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        }
  
        if (this.roleFilter) {
          filtered = filtered.filter(user => user.role === this.roleFilter)
        }
  
        if (this.statusFilter) {
          filtered = filtered.filter(user => user.status === this.statusFilter)
        }
  
        return filtered
      },
      totalPages() {
        return Math.ceil(this.filteredUsers.length / this.perPage)
      },
      paginatedUsers() {
        const start = (this.currentPage - 1) * this.perPage
        const end = start + this.perPage
        return this.filteredUsers.slice(start, end)
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
      roleFilter() {
        this.currentPage = 1
      },
      statusFilter() {
        this.currentPage = 1
      }
    },
    async mounted() {
      await this.loadUsers()
      await this.loadCurrentUser()
    },
    methods: {
      async loadUsers() {
        this.loading = true
        try {
          const response = await fetch('/api/users')
          this.users = await response.json()
        } catch (error) {
          console.error('Erro ao carregar usuários:', error)
        } finally {
          this.loading = false
        }
      },
      async loadCurrentUser() {
        try {
          const response = await fetch('/api/user')
          const currentUser = await response.json()
          this.currentUserId = currentUser.id
        } catch (error) {
          console.error('Erro ao carregar usuário atual:', error)
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString('pt-BR')
      },
      getRoleLabel(role) {
        const roles = {
          admin: 'Administrador',
          editor: 'Editor',
          author: 'Autor'
        }
        return roles[role] || role
      },
      async deleteUser(user) {
        if (user.id === this.currentUserId) {
          alert('Você não pode excluir seu próprio usuário.')
          return
        }
  
        if (confirm(`Tem certeza que deseja excluir o usuário "${user.name}"? Esta ação não pode ser desfeita.`)) {
          try {
            const response = await fetch(`/api/users/${user.id}`, {
              method: 'DELETE',
              headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
              }
            })
  
            if (response.ok) {
              await this.loadUsers()
            } else {
              console.error('Erro ao excluir usuário')
            }
          } catch (error) {
            console.error('Erro:', error)
          }
        }
      }
    }
  }
  </script>
  