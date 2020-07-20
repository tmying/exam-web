<template>
  <div class="question-add" style="width: 80%;margin: auto">
    <el-card class="box-card">
      <div slot="header">
        <p style="font-size:24px;text-align:center">新增试题</p>
      </div>
      <!-- 类型导航 -->
      <el-form :model="formData" ref="selectForm" label-width="100px">
        <el-form-item label="试题类型">
          <el-radio-group v-model="formData.radio" size="medium"  @change="getVal">
            <el-radio border :label="0">选择题</el-radio>
            <el-radio border :label="1">填空题</el-radio>
            <el-radio border :label="2">判断题</el-radio>
            <el-radio border :label="3">名词解释</el-radio>
            <el-radio border :label="4">简答题</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 试题内容 -->
      <QuestionItem :item="formData.radio" style="width: 80%;"></QuestionItem>
    </el-card>
  </div>
</template>

<script>
import QuestionItem from "@/components/QuestionItem";
export default {
  components: {
    QuestionItem
  },
  data() {
    return {
      formData: {
        radio: 0
      }
    };
  },
  methods: {
    // 单选框改变时触发（辅助理解）
    getVal(v){
      v
      // console.log(v)
    }
  }
};
</script>

<style lang="less">
</style>