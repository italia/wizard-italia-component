<template>
  <svg>
    <use :xlink:href="`${require('@/demo/assets/sprite.svg')}#it-${iconName}`" />
  </svg>
</template>

<script>
export default {
  name: 'BootstrapItaliaIcon',
  props: {
    icon: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    iconName() {
      return this.icon[1];
    },
  },
};
</script>
