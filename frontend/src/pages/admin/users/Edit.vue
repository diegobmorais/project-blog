<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Editar Usuário</h1>
              <p class="mt-2 text-gray-600">Atualize as informações do usuário</p>
            </div>
            <router-link 
              to="/admin/users" 
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Voltar
            </router-link>
          </div>
        </div>
  
        <!-- Loading -->
        <div v-if="loadingUser" class="flex justify-center items-center py-12">
          <svg class="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
  
        <!-- Form -->
        <div v-else class="bg-white shadow-lg rounded-lg overflow-hidden">
          <form @submit.prevent="updateUser" class="space-y-6 p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Nome -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite o nome completo"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name[0] }}</p>
              </div>
  
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite o email"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email[0] }}</p>
              </div>
  
              <!-- Nova Senha -->
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha (deixe em branco para manter a atual)
                </label>
                <input
                  type="password"
                  id="password"
                  v-model="form.password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite a nova senha"
                />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password[0] }}</p>
              </div>
  
              <!-- Confirmar Nova Senha -->
              <div>
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  v-model="form.password_confirmation"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirme a nova senha"
                />
              </div>
  
              <!-- Papel/Role -->
              <div>
                <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
                  Papel *
                </label>
                <select
                  id="role"
                  v-model="form.role"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione um papel</option>
                  <option value="admin">Administrador</option>
                  <option value="editor">Editor</option>
                  <option value="author">Autor</option>
                  <option value="user">Usuário</option>
                </select>
                <p v-if="errors.role" class="mt-1 text-sm text-red-600">{{ errors.role[0] }}</p>
              </div>
  
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
            </div>
  
            <!-- Bio -->
            <div>
              <label for="bio" class="block text-sm font-medium text-gray-700 mb-2">
                Biografia
              </label>
              <textarea
                id="bio"
                v-model="form.bio"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite uma breve biografia do usuário"
              ></textarea>
            </div>
  
            <!-- Avatar Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Avatar
              </label>
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <img v-if="currentAvatar || avatarPreview" :src="avatarPreview || currentAvatar" alt="Avatar" class="w-16 h-16 rounded-full object-cover">
                  <svg v-else class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <input
                  type="file"
                  ref="avatarInput"
                  @change="handleAvatarUpload"
                  accept="image/*"
                  class="hidden"
                />
                <button
                  type="button"
                  @click="$refs.avatarInput.click()"
                  class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Alterar Avatar
                </button>
              </div>
            </div>
  
            <!-- Botões -->
            <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <router-link
                to="/admin/users"
                class="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </router-link>
              <button
                type="submit"
                :disabled="loading"
                class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Atualizando...
                </span>
                <span v-else>Atualizar Usuário</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserEdit',
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          role: '',
          status: 'active',
          bio: '',
          avatar: null
        },
        errors: {},
        loading: false,
        loadingUser: true,
        avatarPreview: null,
        currentAvatar: null
      }
    },
    async mounted() {
      await this.loadUser()
    },
    methods: {
      async loadUser() {
        try {
          const response = await fetch(`/api/admin/users/${this.$route.params.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
  
          if (response.ok) {
            const user = await response.json()
            this.form = {
              name: user.name,
              email: user.email,
              password: '',
              password_confirmation: '',
              role: user.role,
              status: user.status,
              bio: user.bio || '',
              avatar: null
            }
            this.currentAvatar = user.avatar_url
          }
        } catch (error) {
          console.error('Erro ao carregar usuário:', error)
        } finally {
          this.loadingUser = false
        }
      },
  
      async updateUser() {
        this.loading = true
        this.errors = {}
  
        try {
          const formData = new FormData()
          Object.keys(this.form).forEach(key => {
            if (this.form[key] !== null && this.form[key] !== '') {
              formData.append(key, this.form[key])
            }
          })
          formData.append('_method', 'PUT')
  
          const response = await fetch(`/api/admin/users/${this.$route.params.id}`, {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
  
          const data = await response.json()
  
          if (response.ok) {
            this.$router.push('/admin/users')
            // Mostrar notificação de sucesso
          } else {
            this.errors = data.errors || {}
          }
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error)
        } finally {
          this.loading = false
        }
      },
  
      handleAvatarUpload(event) {
        const file = event.target.files[0]
        if (file) {
          this.form.avatar = file
          const reader = new FileReader()
          reader.onload = (e) => {
            this.avatarPreview = e.target.result
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }
  </script>
  