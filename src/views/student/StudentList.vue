<template>
  <div class="student-list">
    <el-card class="box-card">
      <!-- 头部标题 -->
      <div slot="header">
        <p style="font-size:24px;text-align:center">学生列表</p>
      </div>
      <!-- 表格内容 -->
      <el-table :data="tableData" style="width: 100%" ref="studentTable">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="姓名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="学号">
                <span>{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ props.row.tel }}</span>
              </el-form-item>
              <el-form-item label="登录密码">
                <span>{{ props.row.pwd }}</span>
              </el-form-item>
              <el-form-item label="录入时间">
                <span>{{ props.row.inputtime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="学号" prop="account"></el-table-column>
        <el-table-column label="联系方式" prop="tel"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="medium" @click="edit(scope.row)">编辑</el-button>
            <el-button size="medium" type="danger" @click="delOne(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件
        current-page ： 当前页码
        page-sizes ：  可以动态选择每页长度值（下拉框）
        page-size ：   默认每页长度值
        total ：       符合条件的总记录数
        layout ：      组件内容的布局顺序
      -->
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
import { studentList, studentDel } from "@/apis/student";
import moment from "moment";
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      // 分页数据
      page: 1, //当前的页码
      pageSize: 4, //每页显示条数
      total: 10 //数据总条数
    };
  },
  // 渲染页面时去请求数据
  mounted() {
    this.getData();
  },
  methods: {
    // 编辑记录行
    edit(row) {
      this.$router.push("/index/studentedit/" + row.id);
    },
    // 删除一条数据
    delOne(row) {
      this.$confirm("确定删除该数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          studentDel(row.id).then(data => {
            if (data.code) {
              this.$message({
                message: data.msg,
                type: "success"
              });
              this.getData();
            } else {
              this.$message.errror(data.msg);
            }
          });
        }).catch(() => {
          this.$message({
            message: "已取消删除",
            type: "info"
          });
        });
    },
    // 每页条数改变时触发
    sizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    // 跳转页面时触发
    pageChange(val) {
      this.page = val;
      this.getData();
    },

    // 获取特定页面数据
    getData() {
      studentList(this.page, this.pageSize).then(result => {
        let { total, data } = result;
        // 录入时间格式化
        data.map(v => {
          return (v.inputtime = moment(v.inputtime).format("YYYY-MM-DD HH:mm"));
        });
        this.tableData = data;
        this.total = parseInt(total);
      });
    }
  }
};
</script>

<style lang="less">
.student-list {
  .el-card__body {
    padding-top: 10px;
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
}
</style>