<template>
  <div class="paper-list">
    <el-card class="box-card">
      <!-- 头部标题 -->
      <div slot="header">
        <p style="font-size:24px;text-align:center">试卷列表</p>
      </div>
      <!-- 表格内容 -->
      <el-table :data="tableData" style="width: 100%" ref="paperTable">
        <el-table-column prop="name" label="试卷名称"></el-table-column>
        <el-table-column prop="intro" label="试卷描述"></el-table-column>
        <el-table-column prop="total" label="总分"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="medium" type="danger" @click="delOne(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件-->
      <el-pagination
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[4, 6,8,10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top:20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { paperList, delPaper } from "@/apis/paper";
export default {
  data() {
    return {
      // 表格数据
      tableData: [{ name: "", intro: "", total: "" }],
      // 分页数据
      page: 1,
      pageSize: 4,
      total: 10
    };
  },
  mounted() {
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
    // 删除事件
    delOne(row) {
      this.$confirm("确定删除这份试卷吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delPaper(row.id).then(data => {
            if (data.code) {
              this.$message({
                message: data.msg,
                type: "success"
              });
            } else {
              this.$message.error(data.msg);
            }
          });
          this.getData();
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
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
        this.tableData.forEach(paper => {
          var sum = 0;
          paper.items.forEach(item => {
            sum += item.score;
          });
          paper.total = sum;
        });
      });
    }
  },
  computed: {}
};
</script>

<style lang="less">
.paper-list {
  .el-card__body {
    padding-top: 10px;
    .el-button {
      margin-right: 10px;
    }
  }
}
</style>