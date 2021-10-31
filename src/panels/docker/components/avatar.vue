<template>
  <span>
    <template v-if="tooltip">
      <VTooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on" >
            <VBadge dot left overlap :color="container.status == 'started' ? 'green lighten-1' : 'grey'">
              <VAvatar size='24' class='mr-2' v-on:click="$emit('click')">
                <VImg :src="container.icon" />
              </VAvatar>
            </VBadge>
          </span>
        </template>
        <span>{{ container.name }}</span>
      </VTooltip>
    </template>
    <template v-else>
      <VBadge dot left overlap :color="container.status =='started' ? 'green lighten-1' : 'grey'" >
        <VAvatar size='24' class='mr-2'>
          <VImg :src="container.icon" />
        </VAvatar>
      </VBadge>
    </template>
  </span>
</template>

<script>
// TODO: dry up the template/tooltip bits.
export default {
  name: 'ContainerAvatar',
  props: {
    container: {
      type: Object,
      default: () => ({ })
    },
    tooltip: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    open() {
      window.open(this.container.url, this.container.id)
    }
  }
}
</script>
