<template>
  <div>
    <VAppBar dense app color="primary" dark>
      <VAppBarNavIcon v-on:click="menu = true">
        <VIcon>mdi-cog</VIcon>
      </VAppBarNavIcon>
      <VToolbarTitle>{{ name }}</VToolbarTitle>
      <VSpacer />
      <VBtn text class='d-none d-sm-flex'>
        {{ uptime }}
      </VBtn>
      <VBtn v-if='false' icon class='d-none d-sm-flex'>
        <VIcon>mdi-console</VIcon>
      </VBtn>
      <VBtn icon>
        <VBadge dot right overlap color='green'>
          <VIcon>mdi-bell</VIcon>
        </VBadge>
      </VBtn>
      <VMenu bottom right min-width='175'>
        <template v-slot:activator="{ on, attrs }">
          <VBtn icon v-bind='attrs' v-on='on'>
            <VIcon>mdi-power-cycle</VIcon>
          </VBtn>
        </template>
        <VList dense>
          <VListItem v-on:click='TODO'>
            <VListItemIcon>
              <VIcon>mdi-stop-circle-outline</VIcon>
            </VListItemIcon>
            <VListItemTitle>Stop Array</VListItemTitle>
          </VListItem>
          <VListItem v-on:click='TODO'>
            <VListItemIcon>
              <VIcon>mdi-power</VIcon>
            </VListItemIcon>
            <VListItemTitle>Shutdown</VListItemTitle>
          </VListItem>

          <VListItem v-on:click='TODO'>
            <VListItemIcon>
              <VIcon>mdi-reload</VIcon>
            </VListItemIcon>            
            <VListItemTitle>Reboot</VListItemTitle>
          </VListItem>
      
        </VList>
      </VMenu>
  

      <template v-slot:extension>
        <VTabs show-arrows>
          <VTab v-for='page in pages' :key='page' :to="{ name: page }" exact>{{ page }}</VTab>
        </VTabs>
      </template>
    </VAppBar>
    <VNavigationDrawer app v-model='menu' absolute temporary>
      <VList nav dense>
        <VListItem>
          <VListItemIcon>
            <VCheckbox :input-value='dark' :value='dark' v-on:change='setDark' class="ma-0 pa-0"/>
          </VListItemIcon>
          <VListItemTitle>Dark Mode</VListItemTitle>
        </VListItem>  
      </VList>
      <template v-slot:append>
        <VList nav dense>
          <VListItem v-on:click='TODO'>
            <VListItemIcon>
              <VIcon>mdi-help-circle</VIcon>
            </VListItemIcon>
            <VListItemTitle>Help</VListItemTitle>
          </VListItem>
          <VListItem v-on:click='TODO'>
            <VListItemIcon>
              <VIcon>mdi-logout-variant</VIcon>
            </VListItemIcon>
            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>    
        </VList>      
      </template>
    </VNavigationDrawer>
  </div>

</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {

  },
  data: () => ({ 
    menu: false,
    pages: [ 'Dashboard', 'Array', 'Shares', /* 'docker', 'vms',  'plugins', 'tools', 'settings' */],
  }),
  methods: {
    ...mapActions(['setDark'])
  },
  computed: {
    ...mapGetters('VARS',['name', 'uptime']),
    ...mapGetters(['dark'])
  }
}
</script>