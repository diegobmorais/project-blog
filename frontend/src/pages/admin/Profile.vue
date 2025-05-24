<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Meu Perfil</h1>
            <p class="mt-2 text-sm text-gray-600">
              Gerencie suas informações pessoais e configurações de conta
            </p>
          </div>
  
          <div class="space-y-6">
            <!-- Informações Pessoais -->
            <div class="bg-white shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Informações Pessoais
                </h3>
                <form @submit.prevent="updateProfile" class="space-y-6">
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- Avatar -->
                    <div class="sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700">
                        Foto do Perfil
                      </label>
                      <div class="mt-1 flex items-center space-x-5">
                        <div class="flex-shrink-0">
                          <img 
                            :src="profileForm.avatar_preview || profileForm.avatar || '/default-avatar.png'" 
                            alt="Avatar" 
                            class="h-20 w-20 rounded-full object-cover"
                          >
                        </div>
                        <div>
                          <label for="avatar" class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Alterar foto
                            <input id="avatar" name="avatar" type="file" class="sr-only" @change="handleAvatarUpload" accept="image/*">
                          </label>
                          <p class="mt-2 text-xs text-gray-500">JPG, GIF ou PNG. Máximo 1MB.</p>
                        </div>
                      </div>
                    </div>
  
                    <!-- Nome -->
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-700">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        v-model="profileForm.name"
                        required
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <p v-if="profileErrors.name" class="mt-1 text-sm text-red-600">{{ profileErrors.name }}</p>
                    </div>
  
                    <!-- Email -->
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        v-model="profileForm.email"
                        required
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <p v-if="profileErrors.email" class="mt-1 text-sm text-red-600">{{ profileErrors.email }}</p>
                    </div>
  
                    <!-- Telefone -->
                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        v-model="profileForm.phone"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
  
                    <!-- Cargo -->
                    <div>
                      <label for="position" class="block text-sm font-medium text-gray-700">
                        Cargo
                      </label>
                      <input
                        type="text"
                        id="position"
                        v-model="profileForm.position"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
  
                    <!-- Bio -->
                    <div class="sm:col-span-2">
                      <label for="bio" class="block text-sm font-medium text-gray-700">
                        Biografia
                      </label>
                      <textarea
                        id="bio"
                        v-model="profileForm.bio"
                        rows="4"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Conte um pouco sobre você..."
                      ></textarea>
                    </div>
                  </div>
  
                  <div class="flex justify-end">
                    <button
                      type="submit"
                      :disabled="profileLoading"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <svg v-if="profileLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ profileLoading ? 'Salvando...' : 'Salvar Alterações' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
  
            <!-- Alterar Senha -->
            <div class="bg-white shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Alterar Senha
                </h3>
                <form @submit.prevent="updatePassword" class="space-y-6">
                  <div class="grid grid-cols-1 gap-6">
                    <!-- Senha Atual -->
                    <div>
                      <label for="current_password" class="block text-sm font-medium text-gray-700">
                        Senha Atual *
                      </label>
                      <input
                        type="password"
                        id="current_password"
                        v-model="passwordForm.current_password"
                        required
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <p v-if="passwordErrors.current_password" class="mt-1 text-sm text-red-600">{{ passwordErrors.current_password }}</p>
                    </div>
  
                    <!-- Nova Senha -->
                    <div>
                      <label for="password" class="block text-sm font-medium text-gray-700">
                        Nova Senha *
                      </label>
                      <input
                        type="password"
                        id="password"
                        v-model="passwordForm.password"
                        required
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <p v-if="passwordErrors.password" class="mt-1 text-sm text-red-600">{{ passwordErrors.password }}</p>
                    </div>
  
                    <!-- Confirmar Nova Senha -->
                    <div>
                      <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
                        Confirmar Nova Senha *
                      </label>
                      <input
                        type="password"
                        id="password_confirmation"
                        v-model="passwordForm.password_confirmation"
                        required
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <p v-if="passwordErrors.password_confirmation" class="mt-1 text-sm text-red-600">{{ passwordErrors.password_confirmation }}</p>
                    </div>
                  </div>
  
                  <div class="flex justify-end">
                    <button
                      type="submit"
                      :disabled="passwordLoading"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                      <svg v-if="passwordLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ passwordLoading ? 'Alterando...' : 'Alterar Senha' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
  
            <!-- Configurações de Notificação -->
            <div class="bg-white shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Configurações de Notificação
                </h3>
                <form @submit.prevent="updateNotifications" class="space-y-4">
                  <div class="space-y-4">
                    <div class="flex items-center">
                      <input
                        id="email_notifications"
                        v-model="notificationForm.email_notifications"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label for="email_notifications" class="ml-2 block text-sm text-gray-900">
                        Receber notificações por email
                      </label>
                    </div>
  
                    <div class="flex items-center">
                      <input
                        id="new_articles"
                        v-model="notificationForm.new_articles"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label for="new_articles" class="ml-2 block text-sm text-gray-900">
                        Notificar sobre novos artigos
                      </label>
                    </div>
  
                    <div class="flex items-center">
                      <input
                        id="new_comments"
                        v-model="notificationForm.new_comments"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label for="new_comments" class="ml-2 block text-sm text-gray-900">
                        Notificar sobre novos comentários
                      </label>
                    </div>
  
                    <div class="flex items-center">
                      <input
                        id="system_updates"
                        v-model="notificationForm.system_updates"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label for="system_updates" class="ml-2 block text-sm text-gray-900">
                        Notificar sobre atualizações do sistema
                      </label>
                    </div>
                  </div>
  
                  <div class="flex justify-end pt-4">
                    <button
                      type="submit"
                      :disabled="notificationLoading"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {{ notificationLoading ? 'Salvando...' : 'Salvar Preferências' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profile',
    data() {
      return {
        profileLoading: false,
        passwordLoading: false,
        notificationLoading: false,
        profileForm: {
          name: '',
          email: '',
          phone: '',
          position: '',
          bio: '',
          avatar: null,
          avatar_preview: null
        },
        passwordForm: {
          current_password: '',
          password: '',
          password_confirmation: ''
        },
        notificationForm: {
          email_notifications: true,
          new_articles: true,
          new_comments: true,
          system_updates: false
        },
        profileErrors: {},
        passwordErrors: {}
      }
    },
    async mounted() {
      await this.loadProfile()
    },
    methods: {
      async loadProfile() {
        try {
          const response = await fetch('/api/admin/profile', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
  
          if (response.ok) {
            const user = await response.json()
            this.profileForm = {
              name: user.name || '',
              email: user.email || '',
              phone: user.phone || '',
              position: user.position || '',
              bio: user.bio || '',
              avatar: user.avatar_url || null,
              avatar_preview: null
            }
            this.notificationForm = {
              email_notifications: user.email_notifications ?? true,
              new_articles: user.new_articles ?? true,
              new_comments: user.new_comments ?? true,
              system_updates: user.system_updates ?? false
            }
          }
        } catch (error) {
          console.error('Erro ao carregar perfil:', error)
        }
      },
      handleAvatarUpload(event) {
        const file = event.target.files[0]
        if (file) {
          this.profileForm.avatar = file
          const reader = new FileReader()
          reader.onload = (e) => {
            this.profileForm.avatar_preview = e.target.result
          }
          reader.readAsDataURL(file)
        }
      },
      async updateProfile() {
        this.profileLoading = true
        this.profileErrors = {}
  
        try {
          const formData = new FormData()
          Object.keys(this.profileForm).forEach(key => {
            if (key !== 'avatar_preview' && this.profileForm[key] !== null) {
              formData.append(key, this.profileForm[key])
            }
          })
  
          const response = await fetch('/api/admin/profile', {
            method: 'PUT',
            body: formData,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
  
          if (response.ok) {
            // Mostrar notificação de sucesso
            await this.loadProfile()
          } else {
            const errorData = await response.json()
            this.profileErrors = errorData.errors || {}
          }
        } catch (error) {
          console.error('Erro ao atualizar perfil:', error)
        } finally {
          this.profileLoading = false
        }
      },
      async updatePassword() {
        this.passwordLoading = true
        this.passwordErrors = {}
  
        try {
          const response = await fetch('/api/admin/password', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(this.passwordForm)
          })
  
          if (response.ok) {
            // Mostrar notificação de sucesso
            this.passwordForm = {
              current_password: '',
              password: '',
              password_confirmation: ''
            }
          } else {
            const errorData = await response.json()
            this.passwordErrors = errorData.errors || {}
          }
        } catch (error) {
          console.error('Erro ao alterar senha:', error)
        } finally {
          this.passwordLoading = false
        }
      },
      async updateNotifications() {
        this.notificationLoading = true
  
        try {
          const response = await fetch('/api/admin/notifications', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(this.notificationForm)
          })
  
          if (response.ok) {
            // Mostrar notificação de sucesso
          }
        } catch (error) {
          console.error('Erro ao atualizar notificações:', error)
        } finally {
          this.notificationLoading = false
        }
      }
    }
  }
  </script>
  