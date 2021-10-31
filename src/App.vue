<template>
  <VApp>
    <Header />

    <VMain>
      <VResponsive height="calc(100vh - 96px)" style='overflow-y: scroll'>
        <VContainer fluid>
          <VSlideXTransition mode='out-in' duration="50">
              <router-view />
          </VSlideXTransition>
        </VContainer>
      </VResponsive>
    </VMain>
  </VApp>
</template>

<script>
import Header from './components/header.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: { 
    Header
  },
  data: () => ({
    menu: false,
    page: null,
  }),
  watch: {
    name(newVal) {
      document.title = newVal
    },
    dark() {
      this.$vuetify.theme.dark = this.dark
    }
  },
  mounted() {
    this.$vuetify.theme.dark = this.dark
  },
  methods: {

  },
  computed: {
    ...mapGetters('VARS', ['name','version']),
    ...mapGetters(['dark'])
  }
};
</script>

<style scoped>

</style>