<template>
  <div>
    <div class="search-con search-con-top search_box">
      <Card>
        <Form :model="searchParam" :label-width="80">
          <Row>
            <Col span="8">
              <Form-item label="公司名称">
                <Input type="text" v-model="searchParam.companyName" placeholder="请输入公司名称" />
              </Form-item>
            </Col>
            <Col span="8">
              <Form-item>
                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset" class="reset_btn">重置</Button>
              </Form-item>
            </Col>
          </Row>
        </Form>
      </Card>
      <div class="mt10">
        <Card>
          <div>
            <Button @click="handleAdd" type="primary" icon="ios-add">新增</Button>
            <Button @click="handleDel" type="default" class="ml10">删除</Button>
            <!-- <Button @click="handleExport" type="warning" icon="ios-cloud-download-outline" class="ml10">导出</Button> -->
          </div>
          <Table border :width="'100%'" :columns="columns" :data="tableData" class="mt10" @on-selection-change="selection"></Table>
          <Page :total="total" :current="searchParam.pageNum" :page-size="searchParam.pageSize" @on-change="pageChange" show-sizer show-elevator show-total></Page>
        </Card>
      </div>
      <div v-if="modal.visible">
        <Modal
          :title="modal.title"
          v-model="modal.visible"
          :width="800"
          :mask-closable="false"
        >
          <div slot="footer">
            <Button type="default" @click="handleCancel">关闭</Button>
            <span style="margin-left: 10px;" v-if="modal.status !== 3">
              <Button v-if="modal.title === '新增'" type="primary" :loading="modal.confirmLoading" @click="addClick">确定</Button>
              <Button v-else type="primary" :loading="modal.confirmLoading" @click="editClick">确定</Button>
            </span>
          </div>
          <EditForm ref='form' :parentCompanyList="parentCompanyList" :formData="formData" :status="modal.status"/>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script>
import { getCustormList, addCustorm, editCustorm, removeCustorm } from '@/api/custorm.js'
import EditForm from './modules/editForm'
export default {
  components: {
    EditForm
  },
  name: 'Customer',
  data () {
    return {
      searchParam: {
        isAsc: 'asc',
        companyName: '',
        pageNum: 1,
        pageSize: 10
      },
      modal: {
        title: '新增',
        visible: false,
        confirmLoading: false,
        status: 1
      },
      total: 0,
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '公司编号',
          align: 'center',
          width: 100,
          key: 'companyId'
        },
        {
          title: '公司名称',
          align: 'center',
          width: 300,
          key: 'companyName'
        },
        {
          title: '公司类型',
          align: 'center',
          width: 100,
          key: 'companyType'
        },
        {
          title: '法人代表',
          align: 'center',
          width: 100,
          key: 'legalPerson'
        },
        {
          title: '社保规则编号',
          align: 'center',
          width: 200,
          key: 'socialNO'
        },
        {
          title: '公积金规则编号',
          align: 'center',
          width: 200,
          key: 'publicFundNO'
        },
        {
          title: '统一社会信用代码',
          align: 'center',
          width: 200,
          key: 'netpNo'
        },
        {
          title: '对公帐号',
          align: 'center',
          width: 150,
          key: 'billBankno'
        },
        {
          title: '操作',
          align: 'center',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.handleEdit(params)
                  }
                }
              }, '编辑'),
              h('Button', {
                class: 'ml5',
                on: {
                  click: () => {
                    this.handleDetail(params)
                  }
                }
              }, '详情'),
              h('Button', {
                class: 'ml5',
                on: {
                  click: () => {
                    this.handleDel(params)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: [],
      parentCompanyList: [],
      ids: [],
      formData: {
        parentId: '', // 上级公司
        companyName: '', // 公司名称
        companyType: '', // 公司类型
        legalPerson: '', // 法人
        province: '', // 公司地区 -- 省
        city: '', // 公司地区 -- 市
        area: '', // 公司地区 -- 区县
        companyAddress: '', // 公司详细地址
        province1: '', // 社保规则地区 -- 省
        city1: '', // 社保规则地区 -- 市
        area1: '', // 社保规则地区 -- 区县
        socialNO: '', // 社保规则
        province2: '', // 公积金规则地区 -- 省
        city2: '', // 公积金规则地区 -- 市
        area2: '', // 公积金规则地区 -- 区县
        publicFundNO: '', // 公积金规则
        expiryDateType: '', // 有效期限
        expiryDate: '', // 有效期限时间
        netpNo: '', // 社会信用代码
        industry: '', // 所属行业
        billBankno: '', // 对公帐号
        billBankaddr: '', // 开户行
        mobile: '', // 联系电话
        saleId: '' // 销售人员
      },
      companyId: ''
    }
  },
  created () {
    this.loadList()
    this.loadAllList()
  },
  methods: {
    // 加载数据
    loadList () {
      const params = new FormData()
      params.append('isAsc', this.searchParam.isAsc)
      params.append('companyName', this.searchParam.companyName)
      params.append('pageNum', this.searchParam.pageNum)
      params.append('pageSize', this.searchParam.pageSize)
      this.$Message.loading('正在加载中...', 0)
      getCustormList(params).then(res => {
        this.$Message.destroy()
        if (res.data.code === 0) {
          let list = res.data.rows
          list.map(i => {
            i.saleId = Number(i.saleId)
          })
          this.total = res.data.total
          this.tableData = list
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 加载所有公司
    loadAllList () {
      getCustormList().then(res => {
        if (res.data.code === 0) {
          this.parentCompanyList = res.data.rows
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 页面改变
    pageChange (e) {
      this.searchParam.pageNum = e
      this.loadList()
    },
    // 搜索
    handleSearch () {
      this.loadList()
    },
    // 重置
    handleReset () {
      this.searchParam.companyName = ''
      this.loadList()
    },
    // 导出
    // handleExport () {
    //   console.log('导出')
    // },
    // 新增
    handleAdd () {
      const formData = this.formData
      Object.keys(formData).forEach(i => {
        formData[i] = ''
      })
      if (formData.companyId) {
        delete formData.companyId
      }
      this.modal.status = 1
      this.modal.title = '新增'
      this.modal.visible = true
    },
    // 编辑
    handleEdit (rows) {
      const formData = this.formData
      const row = rows.row
      Object.keys(formData).forEach(i => {
        Object.keys(row).forEach(j => {
          if (i === j) {
            formData[i] = row[j]
          }
        })
      })
      formData.companyId = rows.row.companyId
      this.formData = formData
      this.modal.status = 2
      this.modal.title = '编辑'
      this.modal.visible = true
    },
    // 确认添加按钮
    addClick () {
      const modal = this.$refs.form
      modal.$refs['form'].validate((valid) => {
        if (valid) {
          this.modal.confirmLoading = true
          const formData = this.formData
          const params = new FormData()
          Object.keys(formData).forEach((key) => {
            params.append(key, formData[key])
          })
          addCustorm(params).then(res => {
            this.modal.confirmLoading = false
            this.modal.visible = false
            if (res.data.code === 0) {
              this.$Message.success('提交成功!')
              this.loadList()
            } else {
              this.$Message.error(res.data.msg)
            }
          })
        }
      })
    },
    // 确认修改按钮
    editClick () {
      const modal = this.$refs.form
      modal.$refs['form'].validate((valid) => {
        if (valid) {
          this.modal.confirmLoading = true
          const formData = this.formData
          const params = new FormData()
          Object.keys(formData).forEach((key) => {
            params.append(key, formData[key])
          })
          editCustorm(params).then(res => {
            this.modal.confirmLoading = false
            this.modal.visible = false
            if (res.data.code === 0) {
              this.$Message.success('提交成功!')
              this.loadList()
            } else {
              this.$Message.error(res.data.msg)
            }
          })
        }
      })
    },
    // 取消按钮
    handleCancel () {
      this.modal.visible = false
    },
    // 详情
    handleDetail (rows) {
      const formData = this.formData
      const row = rows.row
      Object.keys(formData).forEach(i => {
        Object.keys(row).forEach(j => {
          if (i === j) {
            formData[i] = row[j]
          }
        })
      })
      this.modal.status = 3
      this.modal.title = '详情'
      this.modal.visible = true
    },
    // 全选
    selection (ids) {
      const id_list = []
      ids.forEach(i => {
        id_list.push(i.companyId)
      })
      this.ids = id_list
    },
    // 删除
    handleDel (params) {
      let ids = ''
      let content = ''
      if (params.row) {
        ids = params.row.companyId
        content = '是否删除该公司？'
      } else {
        ids = this.ids.join(',')
        content = '是否删除选中的公司？'
      }
      const idList = new FormData()
      idList.append('ids', ids)
      this.$Modal.confirm({
        title: '提示',
        content: content,
        onOk: () => {
          this.$Message.loading('正在删除...', 0)
          removeCustorm(idList).then(res => {
            this.$Message.destroy()
            if (res.data.code === 0) {
              this.$Message.success('删除成功！')
              this.loadList()
            } else {
              this.$Message.error(res.data.msg)
            }
          })
        },
        onCancel: () => {}
      })
    }
  }
}
</script>
<style lang="less" scope>
.ivu-table-cell{
  padding-left:10px !important;
  padding-right:10px !important
}
</style>
