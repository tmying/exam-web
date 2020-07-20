<template>
  <div class="question-list">
    <el-card class="box-card">
      <!-- 头部标题 -->
      <div slot="header">
        <p style="font-size:24px;text-align:center">试题列表</p>
      </div>
      <!-- 下拉框菜单 -->
      <el-dropdown trigger="click" @command="receiveCmd">
        <el-button type="primary">
          选择题目类型
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="5">所有试题</el-dropdown-item>
          <el-dropdown-item :command="0">选择题</el-dropdown-item>
          <el-dropdown-item :command="1">填空题</el-dropdown-item>
          <el-dropdown-item :command="2">判断题</el-dropdown-item>
          <el-dropdown-item :command="3">名词解释</el-dropdown-item>
          <el-dropdown-item :command="4">简答题</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格内容 -->
      <el-table ref="questionTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="题目" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" label="类型" width="250"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="medium" type="danger" @click="delOne(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[4, 8, 12, 16]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top:20px"
      ></el-pagination>
      <div style="margin-top: 20px">
        <el-button type="danger" plain @click="delAll">批量删除</el-button>
        <el-button type="primary" plain @click="cancel">取消选择</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { questionList, questionSelect, questionDel } from "@/apis/question.js";
import moment from "moment";
export default {
  data() {
    return {
      // 表格数据
      tableData: [{ title: "", type: "" }],
      // 下拉子菜单数据
      command: "",
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
    // 点击下拉菜单项触发
    receiveCmd(cmd) {
      this.command=cmd;
      if (cmd != 5) {
        // 格式化菜单项传入的值
        if (cmd === 0) {
          cmd = moment(cmd).format("选择题");
        } else if (cmd === 1) {
          cmd = moment(cmd).format("填空题");
        } else if (cmd === 2) {
          cmd = moment(cmd).format("判断题");
        } else if (cmd === 3) {
          cmd = moment(cmd).format("名词解释");
        } else {
          cmd = moment(cmd).format("简答题");
        }
        questionSelect(cmd, this.page, this.pageSize).then(result => {
          let { total, data } = result;
          // this.formatter(data); //对题型数据格式化
          this.tableData = data;
          this.total = parseInt(total); //返回的总条数是string
        });
      } else {
        this.getData();
      }
    },
    // 每页条数改变时触发
    sizeChange(val) {
      this.pageSize = val;
      this.receiveCmd(this.command);
    },
    // 跳转页面时触发
    pageChange(val) {
      this.page = val;
      this.receiveCmd(this.command);
    },
    // 删除事件
    delOne(row) {
      this.del(row.id);
    },
    // 批量删除
    delAll() {
      // this.$refs.questionTable.selection为选中的所有行，是个数组
      var ids = [];
      this.$refs.questionTable.selection.forEach(v => {
        ids.push(v.id);
      });
      this.del(ids.join(",")); //数组转换成字符串
    },
    // 取消选中
    cancel() {
      this.$refs.questionTable.clearSelection();
    },

    // 获取指定页面数据
    getData() {
      questionList(this.page, this.pageSize).then(result => {
        let { total, data } = result;
        this.tableData = data;
        this.total = parseInt(total); //返回的总条数是string
      });
    },
    // 删除记录行
    del(id) {
      this.$confirm("确定删除该数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        questionDel(id).then(data => {
          if (data.code) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.getData();
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>

<style lang="less">
</style>