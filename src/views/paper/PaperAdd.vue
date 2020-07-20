<template>
  <div class="paper-add" style="width: 70%;margin: auto">
    <el-card class="box-card">
      <!-- 头部标题 -->
      <div slot="header">
        <p style="font-size:24px;text-align:center">新增试卷</p>
      </div>
      <!-- 表单内容 -->
      <el-form :model="formData" ref="paperForm" label-width="100px">
        <el-form-item label="试卷名称" prop="name" required>
          <el-input v-model="formData.name" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="试卷描述" prop="intro" required>
          <el-input v-model="formData.intro" style="width:50%"></el-input>
        </el-form-item>
        <!-- 添加试题 -->
        <el-form-item>
          <el-button type="primary" @click="formVisible = true" style="margin-left:-80px">添加试题</el-button>
          <!-- 内嵌表单 -->
          <el-dialog title="添加试题" :visible.sync="formVisible">
            <el-form :model="form" ref="formId" :rules="rules" label-width="100px">
              <el-form-item label="题号" prop="num">
                <el-input v-model.number="form.num"></el-input>
              </el-form-item>
              <el-form-item label="分值" prop="score">
                <el-input v-model.number="form.score"></el-input>
              </el-form-item>
              <el-form-item label="试题" prop="question" required>
                <el-select
                  v-model="form.question"
                  value-key="id"
                  placeholder="请选择试题"
                  @change="getItem"
                >
                  <el-option-group v-for="group in questions" :key="group.type" :label="group.type">
                    <el-option
                      v-for="item in group.question"
                      :key="item.id"
                      :label="item.title"
                      :value="item"
                    ></el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="formVisible = false">取 消</el-button>
              <el-button type="primary" @click="addItem">确 定</el-button>
            </div>
          </el-dialog>
        </el-form-item>
        <!-- 表格内容 -->
        <el-form-item prop="items">
          <el-table :data="formData.items" max-height="250" style="width: 100%;margin-left:-60px">
            <el-table-column prop="num" label="题号" width="70px"></el-table-column>
            <el-table-column prop="score" label="分值" width="70px"></el-table-column>
            <el-table-column prop="question.title" label="试题" show-overflow-tooltip></el-table-column>
            <el-table-column prop="question.type" label="试题类型" width="110px"></el-table-column>
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <el-button size="small" type="danger" @click="delOne(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <!-- 底部操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="add">添加</el-button>
          <el-button type="primary" plain @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { questionAll } from "@/apis/question";
import { paperItem, delItem, itemList, paperAdd } from "@/apis/paper";
export default {
  data() {
    return {
      // 大表单数据，即试卷
      formData: {
        name: "",
        intro: "",
        items: [] // 表格数据，每个数组元素为内嵌表单数据
      },
      formVisible: false, //隐藏内嵌表单
      // 内嵌表单数据
      form: {
        num: "",
        score: "",
        question: {} //选中试题信息
      },
      // 试题数据
      questions: [],
      // 内嵌表单校验规则
      rules: {
        num: [
          { required: true, message: "题号不能为空", trigger: "blur" },
          { type: "number", message: "请输入数字值", trigger: "change" }
        ],
        score: [
          { required: true, message: "分值不能为空", trigger: "blur" },
          { type: "number", message: "请输入数字值", trigger: "change" }
        ]
      }
    };
  },
  // 一进入页面就获取试题数据
  mounted() {
    questionAll().then(data => {
      // 处理数据
      var arr = [
        { type: "选择题", question: [] },
        { type: "填空题", question: [] },
        { type: "判断题", question: [] },
        { type: "名词解释", question: [] },
        { type: "简答题", question: [] }
      ];
      data.forEach(quetion => {
        if (quetion.type === "选择题") {
          arr[0].question.push(quetion);
        } else if (quetion.type === "填空题") {
          arr[1].question.push(quetion);
        } else if (quetion.type === "判断题") {
          arr[2].question.push(quetion);
        } else if (quetion.type === "名词解释") {
          arr[3].question.push(quetion);
        } else {
          arr[4].question.push(quetion);
        }
      });
      this.questions = arr;
    });
  },
  methods: {
    // 获得选中试题信息
    getItem(item) {
      this.form.question = item;
    },
    // 提交内嵌表单，添加数据到表格中
    addItem() {
      this.$refs.formId.validate(valid => {
        if (valid) {
          // 判断题号是否已存在
          let { items } = this.formData;
          for (let i = 0; i < items.length; i++) {
            if (this.form.num == items[i].num) {
              this.$message.error("题号已存在");
              return;
            }
          }

          // 由于数据库的字段值为字符串，故需转换
          this.form.question = JSON.stringify(this.form.question);
          paperItem(this.form).then(data => {
            if (data.code) {
              // 将数据转换成json对象
              this.form.question = JSON.parse(this.form.question); //【but】form.question实质上仍为字符串
              // 将内嵌表单数据添加到表格数据中
              this.formData.items.push(this.form);
              // 根据题号num对表格数据进行排序
              this.formData.items.sort(function(a, b) {
                return a.num - b.num;
              });
              // 在堆中再开辟一个空间，存储新的内嵌表单数据，实现表格数据互不干扰，以及表单重置
              this.form = { num: "", score: "", question: {} };
              this.formVisible = false;
            }
          });
        } else {
          this.$message.error("表单输入信息有误");
        }
      });
    },
    // 删除一条试题数据
    delOne(row) {
      this.$confirm("确定删除这道试题吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delItem(row.num).then(data => {
            if (data.code) {
              this.$message({
                message: data.msg,
                type: "success"
              });
              this.getItems();
            } else {
              this.$message.error(data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
            type: "info"
          });
        });
    },
    // 提交大表单
    add() {
      this.$refs.paperForm.validate(valid => {
        if (valid) {
          // console.dir(this.formData.items); //数组
          let { name, intro, items } = this.formData;
          let obj = { name, intro, items };
          obj.items = JSON.stringify(obj.items);
          // console.dir(this.formData.items); //数组
          paperAdd(obj).then(data => {
            if (data.code) {
              // obj.items=JSON.parse(obj.items)
              // console.dir(obj.items);
              this.$message({
                message: data.msg,
                type: "success"
              });
              // 跳转到试卷列表页面
              this.$router.push("/index/paperlist");
            } else {
              this.$message.error(data.msg);
            }
          });
        } else {
          this.$message.error("表单输入有误");
        }
      });
    },
    // 重置大表单
    reset() {
      this.$refs.paperForm.resetFields();
    },
    // 自定义函数：获取内表数据并显示
    getItems() {
      itemList().then(data => {
        this.formData.items = data;
      });
    }
  }
};
</script>

<style lang="less">
.paper-add {
  .el-dialog {
    width: 40%;
    .el-dialog__body {
      padding: 20px;
      .el-form-item {
        margin-bottom: 20px;
        .el-input {
          width: 70%;
        }
      }
    }
  }
}
</style>