<template>
  <div>
    <div class="search-con search-con-top search_box">
      <Card>
        <Form :model="searchParam" :label-width="80">
          <Row>
            <Col span="6">
              <Form-item label="公司类型">
                <Select v-model="searchParam.status" placeholder="请选择审核状态">
                  <Option value="">全部</Option>
                  <Option value="1">审核通过</Option>
                  <Option value="2">审核中</Option>
                  <Option value="3">已驳回</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="协议名称">
                <Input type="text" v-model="searchParam.name" placeholder="请输入协议名称" />
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="公司名称">
                <Input type="text" v-model="searchParam.company" placeholder="请输入公司名称" />
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item>
                <Button icon="md-refresh" @click="handleSearch" type="primary">搜索</Button>
                <Button @click="handleReset" class="ml10">重置</Button>
              </Form-item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
    <div class="mt10">
      <Card>
        <Button icon="md-add" @click="handleAdd" type="primary">新增协议</Button>
        <Button icon="md-download" :loading="exportLoading" @click="exportExcel" class="ml10">导出数据</Button>
      </Card>
    </div>
    <div class="mt10">
      <Card>
        <Table border :columns="columns" :data="tableData"></Table>
        <Page
          show-sizer
          show-elevator
          show-total
          :total="total"
          :current="searchParam.pageNum"
          :page-size="searchParam.pageSize"
          @on-change="handlePageNumChange"
          @on-page-size-change="handlePageSizeChange"
        ></Page>
      </Card>
    </div>
    <Modal
      v-model="visible"
      :title="title"
      :loading="false"
      :width="800"
      @on-ok="handleOk"
      @on-cancel="handleCancel"
    >
      <AddAgreeForm />
    </Modal>
  </div>
</template>
<script>
import excel from '@/libs/excel'
import AddAgreeForm from './modules/AddAgreeForm'
import { getAgreementList } from '@/api/agreeMent.js'

export default {
  name: 'Agreement',
  components: {
    AddAgreeForm
  },
  data () {
    return {
      visible: false,
      title: '新增协议',
      exportLoading: false,
      searchParam: {
        isAsc: 'asc',
        pageNum: 1,
        pageSize: 10,
        status: '',
        company: '',
        name: ''
      },
      total: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        }, {
          title: '审核状态',
          align: 'center',
          key: 'status'
        }, {
          title: '关联产品',
          align: 'center',
          key: 'product'
        }, {
          title: '协议编号',
          align: 'center',
          width: 180,
          key: 'agreementNO'
        }, {
          title: '协议名称',
          align: 'center',
          key: 'agreementName'
        }, {
          title: '签约日期',
          align: 'center',
          key: 'startTime'
        }, {
          title: '截止日期',
          align: 'center',
          key: 'endTime'
        }, {
          title: '签约公司',
          align: 'center',
          key: 'contractCompany'
        }, {
          title: '经办人',
          align: 'center',
          key: 'auditName'
        }, {
          title: '当前版本',
          align: 'center',
          key: 'version'
        }, {
          title: '操作',
          align: 'center',
          key: 'action',
          fixed: 'right',
          width: 240,
          render: (h, params) => {
            return h('div', {
              class: 'btn_list'
            }, [
              h('Button', {
                class: 'ivu-btn-primary',
                on: {
                  click: () => {
                    this.handleDetail(params)
                  }
                }
              }, '详情'),
              h('Button', {
                class: 'ml10 ivu-btn-error',
                on: {
                  click: () => {
                    this.handleDelete(params)
                  }
                }
              }, params.row.type === 0 ? '停用' : '取消审批'),
              h('Button', {
                class: 'ml10 ivu-btn-success',
                on: {
                  click: () => {
                    this.handleManage(params)
                  }
                }
              }, '版本管理')
            ])
          }
        }
      ],
      tableData: []
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    // 加载数据
    loadList () {
      const params = new FormData()
      params.append('isAsc', this.searchParam.isAsc)
      params.append('status', this.searchParam.status)
      params.append('company', this.searchParam.company)
      params.append('name', this.searchParam.name)
      params.append('pageNum', this.searchParam.pageNum)
      params.append('pageSize', this.searchParam.pageSize)
      this.$Message.loading('正在加载中...', 0)
      getAgreementList(params).then(res => {
        this.$Message.destroy()
        if (res.data.code === 0) {
          this.total = res.data.total
          this.tableData = res.data.rows
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    handlePageNumChange (page) {
      this.searchParam.pageNum = page
      this.loadList()
    },
    handlePageSizeChange (size) {
      this.searchParam.pageSize = size
      this.loadList()
    },
    handleSearch () {
      this.loadList()
    },
    handleReset () {
      this.searchParam.status = ''
      this.searchParam.company = ''
      this.searchParam.name = ''
      this.loadList()
    },
    handleAdd () {
      this.visible = true
    },
    handleCancel () {
      console.log('handleCancel')
      this.visible = false
    },
    handleOk () {
      console.log('handleOk')
      this.visible = false
    },
    handleDetail (params) {
      console.log('详情', params)
    },
    handleDelete (params) {
      console.log('停用', params)
    },
    handleManage (params) {
      console.log('版本管理', params)
    },
    exportExcel () {
      if (this.data.length) {
        this.exportLoading = true
        const params = {
          title: ['一级分类', '二级分类', '三级分类'],
          key: ['category1', 'category2', 'category3'],
          data: this.data,
          autoWidth: true,
          filename: '协议列表'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
    }
  }
}
</script>
