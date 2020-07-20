<template>
  <div class="chart-paper" style="width: 80%;margin: auto">
    <el-card class="box-card">
      <!-- 头部标题 -->
      <div slot="header">
        <p style="font-size:24px;text-align:center">试卷信息</p>
      </div>
      <!-- 表格内容 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="试卷名称"></el-table-column>
        <el-table-column prop="intro" label="试卷描述"></el-table-column>
        <el-table-column prop="account" label="学号" width="100"></el-table-column>
        <el-table-column prop="username" label="姓名" width="100"></el-table-column>
        <el-table-column prop="state" label="试卷状态" width="120"></el-table-column>
        <el-table-column prop="grade" label="得分" width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span v-show="scope.row.state==='未答题'">学生还未参考</span>
            <span v-show="scope.row.state==='已批改'">成绩已确定</span>
            <el-button
              size="medium"
              type="primary"
              round
              plain
              v-show="scope.row.state==='已答卷'"
              @click="correct(scope.row)"
            >开始批改</el-button>
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
import { examList } from "@/apis";
export default {
  data() {
    return {
      // 试卷表格数据
      tableData: [
        {
          name: "",
          intro: "",
          username: "",
          account: "",
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
    // 批改试卷
    correct(row) {
      this.$router.push("/index/markpaper/" + row.id); //跳转到批改页
    },
    // 自定义函数：获取指定页面数据
    getData() {
      examList(this.page, this.pageSize).then(result => {
        let { number, data } = result;
        this.total = number;
        this.tableData = data;
      });
    }
  }
};
</script>

<style lang="less">
.chart-paper {
}
</style>