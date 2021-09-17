<template>
  <section>
    <transition>
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  watch: {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
