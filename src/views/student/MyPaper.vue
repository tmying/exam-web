<template>
  <div class="my-paper" style="width: 80%;margin: auto">
    <el-card class="box-card">
      <!-- 头部标题 -->
      <div slot="header">
        <p style="font-size:24px;text-align:center">我的试卷</p>
      </div>
      <!-- 表格内容 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="试卷名称" prop="name" width="150"></el-table-column>
        <el-table-column label="试卷描述" prop="intro"></el-table-column>
        <el-table-column label="试卷状态" prop="state" width="120"></el-table-column>
        <el-table-column label="得分" prop="grade" width="100"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <span v-show="scope.row.state==='已答卷'">等待考试结果</span>
            <span v-show="scope.row.state==='已批改'">成绩已确定</span>
            <el-button
              size="medium"
              type="primary"
              round
              plain
              v-show="scope.row.state=='未答题'"
              @click="exam(scope.row)"
            >开始考试</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[4, 8, 12]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top:20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { paperList } from "@/apis/paper";
import { copyPaper, stuExam } from "@/apis";
export default {
  data() {
    return {
      tableData: [
        {
          name: "xxx",
          intro: "ddd",
          state: "",
          grade: ""
        }
      ],
      // 分页数据
      page: 1,
      pageSize: 4,
      total: 10
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 分页事件
    sizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    pageChange(val) {
      this.page = val;
      this.getData();
    },
    // 点击考试
    exam(row) {
      // row.state='已交卷' //不可
      this.$confirm("确定开始答卷吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          copyPaper(row.id).then(data => {
            this.$router.push("/index/exampaper/" + data); //跳转到考试页
          });
        })
        .catch(() => {
          this.$message({
            message: "取消答卷",
            type: "info"
          });
        });
    },
    // 自定义函数：获取指定页面数据
    getData() {
      paperList(this.page, this.pageSize).then(result => {
        let { number, data } = result;
        this.total = number;
        this.tableData = data;
        // 重设置状态和得分
        stuExam(this.$store.state.user.account).then(data => {
          if (data) {
            data.forEach(exam => {
              this.tableData.forEach(val => {
                if (exam.name === val.name) {
                  val.state = exam.state;
                  val.grade = exam.grade;
                }
              });
            });
          }
        });
      });
    }
  }
};
</script>

<style lang="less">
.my-paper {
}
</style>