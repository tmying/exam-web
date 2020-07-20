<template>
  <div class="mark-paper">
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
            <!-- 教师身份 -- 打分 -->
            <p style="margin-bottom:6px">
              <span
                style="font-size:18px;color:#C71585;font-weight:700;margin-right:30px"
              >参考答案：{{v.question.answer}}</span>
              <span style="font-size:18px;color:crimson;font-weight:700">学生答案：{{v.answer}}</span>
            </p>
            <el-form :model="v" label-width="88px" style="height:60px">
              <el-form-item label="此题分值" required>
                <el-input v-model="v.mark" autosize placeholder="请输入此题分值" style="width:40%"></el-input>
              </el-form-item>
            </el-form>
            <el-button
              type="success"
              @click="markPaper"
              v-show="v.num===examData.items.length"
              style="margin:15px 0 0 110px"
            >完成批改</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { examPaper, examMark,examGrade } from "@/apis";
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
    // 获取当前试卷
    examPaper(this.$route.params.id).then(data => {
      data.items=JSON.parse(data.items); //后台转换服务器会崩溃 【无解】
      console.log(data.items)
      this.examData = data;
    });
  },
  methods: {
    // 批改完成
    markPaper() {
      let { items } = this.examData;
      items = JSON.stringify(items);
      examMark(this.$route.params.id, items).then(result => {
        if (result.code) {
          let { data } = result;
          var sum = 0;
          data.items.forEach(item => {
            sum += parseInt(item.mark);
          });
         examGrade(this.$route.params.id,sum).then(data=>{
           if(data.code){
             this.$router.replace('/index/chartpaper'); //跳转到试卷统计页
           }
         })
        }
      });
    }
  }
};
</script>

<style lang="less">
.mark-paper {
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