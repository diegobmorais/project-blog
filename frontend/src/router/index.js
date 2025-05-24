import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/auth"

// Public Pages
import Home from "../pages/Home.vue"
import ArticleShow from "../pages/ArticleShow.vue"
import SectionShow from "../pages/SectionShow.vue"
import Login from "../pages/Login.vue"
import NotFound from "../pages/NotFound.vue"

// Admin Layout
import AdminLayout from "../layouts/AdminLayout.vue"

// Admin Pages
import Dashboard from "../pages/admin/Dashboard.vue"
import ArticleIndex from "../pages/admin/articles/Index.vue"
import ArticleCreate from "../pages/admin/articles/Create.vue"
import ArticleEdit from "../pages/admin/articles/Edit.vue"
import SectionIndex from "../pages/admin/sections/Index.vue"
import SectionCreate from "../pages/admin/sections/Create.vue"
import SectionEdit from "../pages/admin/sections/Edit.vue"
import UserIndex from "../pages/admin/users/Index.vue"
import UserCreate from "../pages/admin/users/Create.vue"
import UserEdit from "../pages/admin/users/Edit.vue"
import AdIndex from "../pages/admin/ads/Index.vue"
import AdCreate from "../pages/admin/ads/Create.vue"
import AdEdit from "../pages/admin/ads/Edit.vue"
import Profile from "../pages/admin/Profile.vue"

const routes = [
  // Public routes
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Home" },
  },
  {
    path: "/articles",
    name: "article.show",
    component: ArticleShow,
    meta: { title: "Article" },
  },
  {
    path: "/sections",
    name: "section.show",
    component: SectionShow,
    meta: { title: "Section" },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "Login", guest: true },
  },

  // Admin routes
  {
    path: "/admin",
    component: AdminLayout,
    // meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "admin.dashboard",
        component: Dashboard,
        meta: { title: "Dashboard" },
      },
      // Articles
      {
        path: "articles",
        name: "admin.articles.index",
        component: ArticleIndex,
        meta: { title: "Articles" },
      },
      {
        path: "articles/create",
        name: "admin.articles.create",
        component: ArticleCreate,
        meta: { title: "Create Article" },
      },
      {
        path: "articles/:id/edit",
        name: "admin.articles.edit",
        component: ArticleEdit,
        meta: { title: "Edit Article" },
      },
      // Sections
      {
        path: "sections",
        name: "admin.sections.index",
        component: SectionIndex,
        meta: { title: "Sections" },
      },
      {
        path: "sections/create",
        name: "admin.sections.create",
        component: SectionCreate,
        meta: { title: "Create Section" },
      },
      {
        path: "sections/:id/edit",
        name: "admin.sections.edit",
        component: SectionEdit,
        meta: { title: "Edit Section" },
      },
      // Users
      {
        path: "users",
        name: "admin.users.index",
        component: UserIndex,
        meta: { title: "Users", requiresAdmin: true },
      },
      {
        path: "users/create",
        name: "admin.users.create",
        component: UserCreate,
        meta: { title: "Create User", requiresAdmin: true },
      },
      {
        path: "users/:id/edit",
        name: "admin.users.edit",
        component: UserEdit,
        meta: { title: "Edit User", requiresAdmin: true },
      },
      // Ads
      {
        path: "ads",
        name: "admin.ads.index",
        component: AdIndex,
        meta: { title: "Advertisements", requiresAdmin: true },
      },
      {
        path: "ads/create",
        name: "admin.ads.create",
        component: AdCreate,
        meta: { title: "Create Advertisement", requiresAdmin: true },
      },
      {
        path: "ads/:id/edit",
        name: "admin.ads.edit",
        component: AdEdit,
        meta: { title: "Edit Advertisement", requiresAdmin: true },
      },
      // Profile
      {
        path: "profile",
        name: "admin.profile",
        component: Profile,
        meta: { title: "My Profile" },
      },
    ],
  },

  // 404 Not Found
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
    meta: { title: "Page Not Found" },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guard
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = to.meta.title ? `${to.meta.title} | Modern Blog` : "Modern Blog"

  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin)
  const isGuestRoute = to.matched.some((record) => record.meta.guest)

  // Check if route requires authentication
  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: "login", query: { redirect: to.fullPath } })
  }
  // Check if route requires admin role
  else if (requiresAdmin && !authStore.isAdmin) {
    next({ name: "admin.dashboard" })
  }
  // Redirect authenticated users away from guest routes
  else if (isGuestRoute && authStore.isAuthenticated) {
    next({ name: "home" })
  } else {
    next()
  }
})

export default router
