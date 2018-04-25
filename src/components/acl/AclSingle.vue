<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-row>
          <el-col :span="12"><span>权限点列表</span></el-col>
          <el-col :span="12"> <el-button type="primary" style="float: right;" @click="_add">新增权限点</el-button></el-col>
        </el-row>

        <el-table
        :data="tableData"
        v-loading="tableLoading"
        stripe
        @sort-change="_tableSort"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="url">
                <span>{{ props.row.url }}</span>
              </el-form-item>
              <el-form-item label="顺序">
                <span>{{ props.row.seq }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="权限点名称"
          sortable="custom"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="权限模块"
          prop="aclModuleId"
          width="120"
        >
          <template slot-scope="scope">
            {{scope.row.aclModuleName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          sortable="custom"
        >
          <template slot-scope="scope">
            {{scope.row.type | typeTrans}}
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          sortable="custom"
          label="URL"
          width="250">
        </el-table-column>
        <el-table-column
          prop="status"
          sortable="custom"
          label="状态">
          <template slot-scope="scope">
            <el-tag size="medium" :type="scope.row.status | statusTag">{{ scope.row.status | statusType }}</el-tag>
          </template>
        </el-table-column>
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
      </div>
    </el-card>

    <el-dialog title="权限点管理" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="padding-right:30%;">
        <el-form-item label="权限点名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入权限点名称"></el-input>
        </el-form-item>
        <el-form-item label="所属模块" :label-width="formLabelWidth">
          <el-cascader
            v-model="cascaderSelectArr"
            :options="selectAclModule"
            :props="defaultProps"
            node-key="id"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL" :label-width="formLabelWidth">
          <el-input v-model="form.url" placeholder="请输入URL"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顺序" :label-width="formLabelWidth">
          <el-input v-model="form.seq" placeholder="请输入顺序"></el-input>
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
  import {getAclModuleTree} from 'api/aclModule'
  import {saveAcl, getAcls, delAcl} from 'api/acl'

  export default {
    data () {
      return {
        form: {
          name: '',
          aclModuleId: '',
          url: '',
          type: '',
          status: '',
          seq: '',
          remark: ''
        },
        defaultProps: {
          children: 'aclModuleList',
          label: 'name',
          value: 'id'
        },
        typeOption: [{
          value: 1,
          label: '菜单'
        }, {
          value: 2,
          label: '按钮'
        }, {
          value: 3,
          label: '其他'
        }],
        statusOption: [{
          value: 0,
          label: '启用'
        }, {
          value: 1,
          label: '停用'
        }],
        tableData: [],
        tableLoading: false,
        formLabelWidth: '120px',
        cascaderSelectArr: [0],
        dialogFormVisible: false,
        selectAclModule: [],
        queryParams: {
          pageIndex: 0,
          pageSize: 10
        }
      }
    },
    methods: {
      _add () {
        this.dialogFormVisible = true
        this.form = {}
        this.cascaderSelectArr = [0]
      },
      _handleEdit (index, row) {
        this.dialogFormVisible = true
        this.form = row
        this.cascaderSelectArr = []
        let level = row.aclModuleLevel.split('.')
        for (let index in level) {
          if (index > 0 && level[index] !== '0') {
            this.cascaderSelectArr.push(parseInt(level[index]))
          }
        }
        this.cascaderSelectArr.push(row.aclModuleId)
      },
      _handleDelete (index, row) {
        this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delAcl(row.id).then((res) => {
            if (res.ret) {
              this.$message.success(res.msg)
              this._getAcls()
            } else {
              this.$message.error(res.msg)
            }
          }).catch((e) => {
            this.$message.error('删除用户时出现了一个错误!')
          })
        }).catch(() => {})
      },
      _submit () {
        this.form.aclModuleId = this.cascaderSelectArr[this.cascaderSelectArr.length - 1]
        saveAcl(this.form).then((res) => {
          if (res.ret) {
            this.$message.success(res.msg)
            this._getAcls()
          } else {
            this.$message.error('保存出现了一个问题。')
            console.log(res.msg)
          }
        }).catch((e) => {
          this.$message.error('保存发生了一个异常。')
          console.log(e)
        })
        this.dialogFormVisible = false
      },
      _getAclModules () {
        getAclModuleTree().then((res) => {
          this.selectAclModule = res.data
        })
      },
      _getAcls () {
        this.tableLoading = true
        getAcls(this.queryParams).then((res) => {
          if (res.ret) {
            this.total = res.data.total
            this.tableData = res.data.acls
          }
          this.tableLoading = false
        })
      },
      _tableSort (column) {
        this.queryParams.sortKey = column.prop
        this.queryParams.sortValue = column.order
        this._getAcls()
      }
    },
    created () {
      this._getAclModules()
      this._getAcls()
    },
    filters: {
      statusType (value) {
        if (value >= 0 && value < 2) {
          let types = ['启用', '停用']
          return types[value]
        } else {
          return '状态错误'
        }
      },
      statusTag (value) {
        if (value >= 0 && value < 2) {
          let types = ['', 'warning', 'danger']
          return types[value]
        }
      },
      typeTrans (value) {
        if (value > 0 && value < 4) {
          let types = ['菜单', '按钮', '其他']
          return types[value - 1]
        }
      }
    }
  }
</script>

<style lang="stylus">
  .demo-table-expand
    font-size: 0
    label
      width: 90px
      color: #99a9bf
    .el-form-item
      margin-right: 0
      margin-bottom: 0
      width: 50%
</style>
