<template>
  <div class="question-item">
    <!-- 表1：选择题-->
    <el-form v-show="item == 0" :model="formData" status-icon ref="form1Id" label-width="100px">
      <el-form-item label="题目" prop="title" required>
        <el-input v-model="formData.title" type="textarea" :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="A" prop="option1" required class="option">
        <el-input v-model="formData.option1"></el-input>
      </el-form-item>
      <el-form-item label="B" prop="option2" required class="option">
        <el-input v-model="formData.option2"></el-input>
      </el-form-item>
      <el-form-item label="C" prop="option3" required class="option">
        <el-input v-model="formData.option3"></el-input>
      </el-form-item>
      <el-form-item label="D" prop="option4" required class="option">
        <el-input v-model="formData.option4"></el-input>
      </el-form-item>
      <el-form-item label="正确答案" prop="answer" required>
        <el-radio-group v-model="formData.answer">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form1Id')">提交</el-button>
        <el-button type="primary" plain @click="reset('form1Id')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表2：填空题 -->
    <el-form v-show="item == 1" :model="formData" status-icon ref="form2Id" label-width="100px">
      <el-form-item label="题目" prop="title" required>
        <el-input v-model="formData.title" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="正确答案" prop="answer" required>
        <el-input v-model="formData.answer" type="textarea" :rows="1" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form2Id')">提交</el-button>
        <el-button type="primary" plain @click="reset('form2Id')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表3：判断题 -->
    <el-form v-show="item == 2" :model="formData" status-icon ref="form3Id" label-width="100px">
      <el-form-item label="题目" prop="title" required>
        <el-input v-model="formData.title" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="正确答案" prop="answer" required>
        <el-radio-group v-model="formData.answer">
          <el-radio label="true"></el-radio>
          <el-radio label="false"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form3Id')">提交</el-button>
        <el-button type="primary" plain @click="reset('form3Id')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表4：简答题 -->
    <el-form v-show="item == 3" :model="formData" status-icon ref="formId" label-width="100px">
      <el-form-item label="题目" prop="title" required>
        <el-input v-model="formData.title" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('formId')">提交</el-button>
        <el-button type="primary" plain @click="reset('formId')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表5：计算题 -->
    <el-form v-show="item == 4" :model="formData" status-icon ref="formId" label-width="100px">
      <el-form-item label="题目" prop="title" required>
        <el-input v-model="formData.title" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('formId')">提交</el-button>
        <el-button type="primary" plain @click="reset('formId')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { questionAdd } from "@/apis/question.js";
export default {
  props: ["item"],
  data() {
    return {
      formData: {
        type: "",
        title: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: ""
      }
    };
  },
  watch: {
    // key(要监听的状态):val（监听器---函数） ??
    item(val){
      this.formData.type = val; //将父组件的值赋给子组件
    }
  },
  methods: {
    // 点击提交
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          questionAdd(this.formData).then(data => {
            if (data.code) {
              this.$message({
                message: data.msg,
                type: "success"
              });
              // debugger  此处有bug
              this.$refs[formName].resetFields();
            } else {
              this.$message.error(data.msg);
            }
          });
        } else {
          this.$message.error("表单输入有误");
        }
      });
    },
    // 点击重置
    reset(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.question-item {
  .option {
    width: 60%;
  }
}
</style>