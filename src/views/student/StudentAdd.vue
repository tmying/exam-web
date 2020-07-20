<template>
  <!-- 新增学生模块 -->
  <div class="student-add" style="width: 70%;margin: auto">
    <el-card class="box-card">
      <!-- 头部标题 -->
      <div slot="header">
        <p style="font-size:24px;text-align:center">新增学生</p>
      </div>
      <!-- 表单内容 -->
      <el-form
        :model="formData"
        :rules="rules"
        ref="studentForm"
        label-width="100px"
        style="width: 80%;margin: auto;"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="account">
          <el-input v-model="formData.account"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model.number="formData.tel"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="pwd" required>
          <el-input v-model="formData.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">添加</el-button>
          <el-button type="primary" plain @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { studentAdd, studentExist } from "@/apis/student";
export default {
  data() {
    return {
      // 表单数据
      formData: {
        name: "",
        account: "",
        tel: "",
        pwd: ""
      },
      // 验证规则
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, message: "长度在2个字符及以上", trigger: "change" }
        ],
        account: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { min: 3, message: "长度在3个数字及以上", trigger: "change" }
        ],
        tel: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { type: "number", message: "请输入数字值", trigger: "change" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度在6个字符及以上", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 添加学生
    add() {
      this.$refs.studentForm.validate(valid => {
        if (valid) {
          // 1.先验证该账号是否已存在
          studentExist(this.formData.account).then(data => {
            if (data.code) {
              // 2.账号可用时进行添加
              studentAdd(this.formData).then(data => {
                if (data.code) {
                  this.$message({
                    message: data.msg,
                    type: "success"
                  });
                  this.$router.push("/index/studentlist");
                } else {
                  this.$message.error(data.msg);
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        } else {
          this.$message.error("表单输入有误");
        }
      });
    },
    reset() {
      this.$refs.studentForm.resetFields();
    }
  }
};
</script>

<style lang="less">
.student-add {
  form {
    width: 70%;
    margin: auto;
  }
}
</style>