<template>
  <div class="login" @keyup.enter="login">
    <el-card>
      <!-- 标题头部 -->
      <div slot="header">
        <h2>账号登录</h2>
      </div>
      <!-- 表单内容 -->
      <el-form :model="form" :rules="rules" ref="formId" label-width="100px">
        <el-form-item prop="account" label="账号">
          <el-input type="text" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" label="密码">
          <el-input type="password" v-model="form.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="角色" required>
          <el-radio-group v-model="form.role">
            <el-radio :label="0">教师</el-radio>
            <el-radio :label="1">学生</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { userLogin } from "@/apis";
export default {
  data() {
    return {
      // 表单数据对象
      form: {
        account: "",
        pwd: "",
        role: ''
      },
      // 表单验证规则
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, message: "长度在 2 个字符以上", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度在 6 个字符以上", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击登录
    login() {
      this.$refs.formId.validate(valid => {
        // 箭头函数的this指向上级作用域
        if (valid) {
          // console.log(typeof this.form.role) //number
            userLogin(this.form).then(data => {
            if (data.code) {
              // 本地存储token
              sessionStorage.setItem("token", data.tokenId);
              // sessionStorage.setItem("role", data.role);
              // 成功消息提示
              this.$message({
                message: data.msg,
                type: "success"
              });
              // this.$router.push('/index'); //追加一个新地址，可返回
              this.$router.replace("/index"); //替换一个新地址，无返回跳转
            } else {
              this.$message.error(data.msg);
            }
          });
        } else {
          this.$message.error("表单输入有误");
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-card {
    width: 500px;
    text-align: center;
    .el-form {
      width: 93%;
      .el-button {
        width: 116%;
        margin-left: -76px;
      }
    }
  }
}
</style>