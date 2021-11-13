<template>
  <Panel title='Docker'  >
    <template v-slot:collapsed>
      <div class='d-none d-sm-flex'>
        <Container small v-for='container in launchable' :key='`collapsed-${container.name}`' :container='container' />
      </div>
    </template>

    <VRow no-gutters>
      <VCol cols='12' sm='4' md='3' lg='3' xl='1' v-for='container in docker' :key='`expanded-${container.name}`'>
        <Container :container='container' />
      </VCol>              
    </VRow>

  </Panel>
</template>

<script>
import Panel from '@/components/panel.vue'
import Container from './components/container.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'DockerPanel',
  components: { Panel, Container },
  data: () => ({
    expand: true
  }),
  computed: {
    ...mapGetters('DOCKER', ['docker']),
    launchable() {
      return this.docker.filter(d => d.url && d.status == 'started')
    }
  }
}
</script>