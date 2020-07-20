<template>
  <div class="exam-paper">
    <el-card class="box-card">
      <!-- 头部标题 -->
      <div slot="header">
        <p style="font-size:24px;text-align:center">{{examData.name}}</p>
      </div>
      <!-- 主体内容 -->
      <el-row :gutter="30">
        <!-- 学生信息 -->
        <el-col :span="6">
          <el-card class="box-card" shadow="never" style="margin-left:28px">
            <div slot="header">
              <p style>考生信息</p>
            </div>
            <p>学号：{{examData.account}}</p>
            <p>姓名：{{examData.username}}</p>
          </el-card>
        </el-col>
        <!-- 试卷信息 -->
        <el-col :span="17">
          <el-card class="box-card" shadow="never" v-for="v in examData.items" :key="v.num">
            <!-- 题目 -->
            <div slot="header">
              <p>第{{v.num}}题 -- {{v.question.type}}（分值：{{v.score}}分）</p>
            </div>
            <!-- 试题信息 -->
            <p style="font-size:18px;color:#006bb6;font-weight:900">题目：{{v.question.title}}</p>
            <p v-show="v.question.option1">A：{{v.question.option1}}</p>
            <p v-show="v.question.option2">B：{{v.question.option2}}</p>
            <p v-show="v.question.option3">C：{{v.question.option3}}</p>
            <p v-show="v.question.option4">D：{{v.question.option4}}</p>
            <!-- 学生身份 -- 回答 -->
            <el-form :model="v" label-width="56px" style="height:60px">
              <el-form-item label="答案" required>
                <el-input v-model="v.answer" type="textarea" autosize placeholder="请输入答案"></el-input>
              </el-form-item>
            </el-form>
            <el-button
              type="success"
              @click="endPaper"
              v-show="v.num===examData.items.length"
              style="margin:15px 0 0 110px"
            >交卷</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { addUser, addAnswer } from "@/apis";
export default {
  data() {
    return {
      // 当前试卷数据
      examData: {
        name: "",
        username: "",
        account: "",
        items: [],
        state: "",
        grade: ""
      }
    };
  },
  created() {
    // 更新参考者信息，并获得当前试卷数据
    addUser(
      this.$route.params.id,
      this.storeUser.name,
      this.storeUser.account
    ).then(data => {
      if (data.code) {
        this.examData = data.data;
      }
    });
  },
  methods: {
    // 点击交卷
    endPaper() {
      let { items } = this.examData;
      items = JSON.stringify(items);
      addAnswer(this.$route.params.id, items).then(data => {
        if (data.code) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.$router.replace("/index/mypaper"); //跳转到试卷页
        }
      });
    }
  },
  computed: {
    storeUser() {
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="less">
.exam-paper {
  .el-row {
    .el-card {
      border: 0;
      border-radius: 0;
      .el-card__header {
        background: #4da6ff;
        color: #fff;
        text-align: center;
        padding: 0;
        height: 38px;
        line-height: 38px;
      }
      .el-card__body {
        color: #726f70;
        padding: 10px 5px;
        p {
          padding: 10px;
        }
      }
    }
    .el-col-17 {
      .el-card__header {
        background: #e0e0e0;
        color: #6d6d6d;
        text-align: left;
        text-indent: 10px;
        font-size: 20px;
      }
      .el-form-item__label {
        font-size: 16px;
      }
    }
  }
}
</style>