<template>
  <div class="change-pwd" style="width:50%;margin:auto;margin-top:60px">
    <el-card class="box-card">
      <!-- 头部标题 -->
      <div slot="header">
        <p style="font-size:24px;text-align:center">修改密码</p>
      </div>
      <!-- 表单内容 -->
      <el-form
        :model="formData"
        :rules="rules"
        ref="pwdForm"
        label-width="100px"
        style="width: 80%;margin: auto;"
      >
        <el-form-item label="原密码">
          <el-input v-model="$store.state.user.pwd" disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd" required>
          <el-input v-model="formData.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPwd" required>
          <el-input v-model.number="formData.checkPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">确认修改</el-button>
          <el-button type="primary" plain @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { changePwd } from "@/apis";
export default {
  data() {
    // 自定义验证规则
    var validatePwd1 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度在6个字符及以上"));
      } else if (value === this.$store.state.user.pwd) {
        callback(new Error("新密码不能与旧密码相同"));
      } else {
        callback();
      }
    };
    var validatePwd2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value == this.$store.state.user.pwd) {
        callback(new Error("新密码不能与旧密码相同"));
      } else if (value != this.formData.newPwd) {
        callback(new Error("两次密码输入不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      formData: {
        account:this.$store.state.user.account,
        newPwd: "",
        checkPwd: ""
      },
      // 验证规则
      rules: {
        newPwd: [{ validator: validatePwd1, trigger: "blur" }],
        checkPwd: [{ validator: validatePwd2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 确认修改密码
    confirm() {
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          changePwd(this.formData).then(data => {
            if (data.code) {
              this.$message({
                message: data.msg,
                type: "success"
              });
              // 修改成功后跳转到'退出登录'组件
              this.$router.replace('/logout');
            }
          });
        } else {
          this.$message.error("表单输入有误");
        }
      });
    },
    reset() {
      this.$refs.pwdForm.resetFields();
    }
  }
};
</script>

<style lang="less">
</style>