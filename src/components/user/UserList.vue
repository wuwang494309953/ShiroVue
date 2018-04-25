<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-row>
          <el-col :span="12"><span>用户列表</span></el-col>
          <el-col :span="12"> <el-button type="primary" style="float: right;" @click="_add">新增用户</el-button></el-col>
        </el-row>
      </div>
      <el-form :inline="true">
        <el-form-item label="姓名">
          <el-input v-model="queryParams.username" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="queryParams.telephone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="queryParams.mail" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_getUsers">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        stripe
        @sort-change="_tableSort"
        style="width: 100%">
        <el-table-column
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          label="所属部门"
          prop="deptId"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.deptName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话"
          sortable="custom"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mail"
          sortable="custom"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="status"
          sortable="custom"
          label="状态">
          <template slot-scope="scope">
            <el-tag size="medium" :type="scope.row.status | statusTag">{{ scope.row.status | statusType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          sortable="custom"
          label="备注">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="_handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="_handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-top:15px;">
        <el-pagination
          @size-change="_handleSizeChange"
          @current-change="_handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="queryParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>

    <el-dialog title="用户管理" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="padding-right:30%;">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <el-cascader
            v-model="cascaderSelectArr"
            :options="selectDept"
            :props="defaultProps"
            node-key="id"
            :change-on-select="true"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" :row="2" v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="_submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getDeptTree} from 'api/dept.js'
  import {saveUser, getUsers, delUser} from 'api/user.js'

  export default {
    data () {
      return {
        form: {
          id: '',
          username: '',
          telephone: '',
          mail: '',
          deptId: '',
          status: '',
          remark: ''
        },
        deptMap: {},
        dialogFormVisible: false,
        tableData: [],
        tableLoading: true,
        cascaderSelectArr: [],
        defaultProps: {
          children: 'deptList',
          label: 'name',
          value: 'id'
        },
        selectDept: [],
        statusOption: [{
          value: 0,
          label: '启用'
        }, {
          value: 1,
          label: '停用'
        }, {
          value: 2,
          label: '禁用'
        }],
        formLabelWidth: '120px',
        total: 0,
        currentPage: 1,
        queryParams: {
          username: '',
          telephone: '',
          mail: '',
          pageIndex: 0,
          pageSize: 10,
          sortKey: '',
          sortValue: ''
        }
      }
    },
    methods: {
      _handleEdit (index, row) {
        this.dialogFormVisible = true
        this.form = row
        this.cascaderSelectArr = []
        let level = row.deptLevel.split('.')
        for (let index in level) {
          if (index > 0 && level[index] !== '0') {
            this.cascaderSelectArr.push(parseInt(level[index]))
          }
        }
        this.cascaderSelectArr.push(row.deptId)
      },
      _handleDelete (index, row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser(row.id).then((res) => {
            if (res.ret) {
              this.$message.success(res.msg)
              this._getUsers()
            } else {
              this.$message.error(res.msg)
            }
          }).catch((e) => {
            this.$message.error('删除用户时出现了一个错误!')
          })
        }).catch(() => {})
      },
      _getUsers () {
        this.tableLoading = true
        getUsers(this.queryParams).then((res) => {
          if (res.ret) {
            this.total = res.data.total
            this.tableData = res.data.users
          }
          this.tableLoading = false
        }).catch((e) => {
          this.tableLoading = false
        })
      },
      _getDeptData () {
        getDeptTree().then((res) => {
          this.selectDept = res.data
        })
      },
      _handleSizeChange (val) {
        this.queryParams.pageSize = val
        this._getUsers()
      },
      _handleCurrentChange (val) {
        this.queryParams.pageIndex = val - 1
        this._getUsers()
      },
      _tableSort (column) {
        this.queryParams.sortKey = column.prop
        this.queryParams.sortValue = column.order
        this._getUsers()
      },
      _add () {
        this.dialogFormVisible = true
        this.form = {}
        this.cascaderSelectArr = [0]
      },
      _submit () {
        this.form.deptId = this.cascaderSelectArr[this.cascaderSelectArr.length - 1]
        saveUser(this.form).then((res) => {
          if (res.ret) {
            this.$message.success(res.msg)
            this._getUsers()
          } else {
            this.$message.error('保存出现了一个问题。')
            console.log(res.msg)
          }
        }).catch((e) => {
          this.$message.error('保存发生了一个异常。')
          console.log(e)
        })
        this.dialogFormVisible = false
      }
    },
    created () {
      this._getDeptData()
      this._getUsers()
    },
    filters: {
      statusType (value) {
        if (value >= 0 && value < 3) {
          let types = ['启用', '停用', '禁用']
          return types[value]
        } else {
          return '状态错误'
        }
      },
      statusTag (value) {
        if (value >= 0 && value < 3) {
          let types = ['', 'warning', 'danger']
          return types[value]
        }
      }
    }
  }
</script>

<style lang="stylus">
  
</style>
