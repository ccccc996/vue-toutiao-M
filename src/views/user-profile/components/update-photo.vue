<template>
  <div class="update-photo">
    <img :src="img" alt="" class="img" />
  </div>
</template>

<script>
export default {
  name: 'UpdatePhoto',

  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.img {
  display: block;
  max-width: 100%;
}
</style>
