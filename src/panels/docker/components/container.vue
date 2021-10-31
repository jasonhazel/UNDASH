<template>
  <span>
    <template v-if="small">
      <Avatar :container='container' v-on:click='open' style='cursor: pointer;' />
    </template>
    <template v-else>
      <VCard flat tile>
        <VToolbar flat tile>
          <Avatar :container="container" :tooltip='false' />
          <VMenu bottom min-width='150'>
            <template v-slot:activator="{ on, attrs }">
              <VToolbarTitle  v-bind='attrs' v-on='on'>{{ container.name }}</VToolbarTitle>
            </template>
            <VList dense>
              <VListItem v-if='container.url && started' v-on:click='open'>
                <VListItemIcon>
                  <VIcon>mdi-web</VIcon>
                </VListItemIcon>
                <VListItemTitle>Web UI</VListItemTitle>
              </VListItem>
              <VListItem v-if='false' v-on:click='TODO'>
                <VListItemIcon>
                  <VIcon>mdi-console</VIcon>
                </VListItemIcon>
                <VListItemTitle>Console</VListItemTitle>
              </VListItem>
              <VDivider v-if="container.url && started" />
              <VListItem v-if="started" v-on:click="run('stop')">
                <VListItemIcon>
                  <VIcon>mdi-stop</VIcon>
                </VListItemIcon>            
                <VListItemTitle>Stop</VListItemTitle>
              </VListItem>
              <VListItem v-else-if="stopped" v-on:click="run('start')">
                <VListItemIcon>
                  <VIcon>mdi-play</VIcon>
                </VListItemIcon>            
                <VListItemTitle>Start</VListItemTitle>
              </VListItem>
              <VListItem v-if="started" v-on:click="run('restart')">
                <VListItemIcon>
                  <VIcon>mdi-reload</VIcon>
                </VListItemIcon>            
                <VListItemTitle>Restart</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VToolbar>
      </VCard>
    </template>
  </span>
</template>

<script>
import Avatar from './avatar.vue'

import { mapActions } from 'vuex'

export default {
  name: 'Container',
  components: { Avatar },
  props: {
    small: {
      type: Boolean,
      default: false
    },
    container: {
      type: Object,
      default: () => ({ })
    }
  },
  methods: {
    ...mapActions('DOCKER', ['command']),
    run(action) {
      return this.command({ id: this.id, action: action })
    },      
    open() {
      window.open(this.url, this.id)
    }
  },
  computed: {
    started() {
      return this.container.status == 'started'
    },
    stopped() {
      return this.container.status == 'stopped'
    },
    url() {
      return this.container.url
    },
    id() {
      return this.container.id
    }
  }
}
</script>

<style scoped>

</style>