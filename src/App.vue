<template>
  <div class="container-fluid">
    <header
      class="d-flex flex-wrap justify-content-between py-3 px-4 mb-4 border-bottom align-items-center"
    >
      <a href="" class="text-decoration-none">
        <i class="fa-solid fa-wallet fa-2x me-3" />
        <span class="fs-3">Factures</span>
      </a>
      <ul class="nav nav-pills gap-2">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link" active-class="active" exact-active-class="active">
            <i class="fa-solid fa-house me-2"></i>
            Accueil
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            to="/about"
            class="nav-link"
            active-class="active"
            exact-active-class="active"
          >
            À propos
          </RouterLink>
        </li>
      </ul>
    </header>
    <main class="container main-router-container">
      <!--Router -->
      <RouterView />
    </main>
    <footer class="py-3 my-4 border-top text-center">
      <span class="mb-3 mb-md-0 text-body-secondary">© {{ currentYear }} Factures.app</span>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    currentYear() {
      const d = new Date()
      return d.getFullYear()
    }
  },
  methods: {}
}
</script>
<style scoped>
.maClassPerso {
  color: green;
}
</style>
