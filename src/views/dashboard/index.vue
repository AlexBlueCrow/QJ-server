<template>
  <div class="dashboard-container" style="display:block;text-align:center;">
    <div class="dashboard-text">欢迎来到青椒农业</div>
    <img class="pic-404__parent" src="@/assets/img/favicon.png" style="height:600px;width:600px" >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
