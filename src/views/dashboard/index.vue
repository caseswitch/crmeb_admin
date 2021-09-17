<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" />
      <el-col :span="6" />
      <el-col :span="6" />
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {}
}
</script>

<style scoped>

</style>
