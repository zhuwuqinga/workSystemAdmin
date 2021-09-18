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
            <Button @click="handleExport" type="warning" icon="ios-cloud-download-outline" class="ml10">导出</Button>
          </div>
          <Table border :width="'100%'" :columns="columns" :data="tableData" class="mt10" @on-selection-change="selection"></Table>
          <Page :total="total" :current="searchParam.pageNum" :page-size="searchParam.pageSize" @on-change="pageChange" show-sizer show-elevator show-total></Page>
        </Card>
      </div>
      <Modal
        :title="modal.title"
        v-model="modal.visible"
        :confirm-loading="modal.confirmLoading"
        @on-ok="handleOk"
        @on-cancel="handleCancel"
      >
        <EditForm />
      </Modal>
    </div>
  </div>
</template>
<script>
import { getCustormList } from '@/api/custorm.js'
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
        confirmLoading: false
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
      ids: []
    }
  },
  mounted () {
    this.loadList()
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
          this.total = res.data.total
          this.tableData = res.data.rows
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
    handleExport () {
      console.log('导出')
    },
    // 新增
    handleAdd () {
      this.modal.title = '新增'
      this.modal.visible = true
    },
    // 编辑
    handleEdit (params) {
      console.log('编辑', params)
      this.modal.title = '编辑'
      this.modal.visible = true
    },
    handleOk () {
      console.log('确定')
    },
    handleCancel () {
      this.modal.visible = false
    },
    // 详情
    handleDetail (params) {
      console.log('详情', params)
    },
    selection (list) {
      const id_list = []
      list.forEach(i => {
        id_list.push(i.companyId)
      })
      this.ids = id_list
    },
    // 删除
    handleDel (params) {
      let ids = ''
      if (params.row) {
        ids = params.row.companyId
      } else {
        ids = this.ids.join(',')
      }
      console.log('删除id', ids)
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
