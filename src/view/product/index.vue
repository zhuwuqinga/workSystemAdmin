<template>
  <div>
    <div class="search-con search-con-top search_box">
      <Card>
        <Form :model="searchParam" :label-width="80">
          <Row>
            <Col span="6">
              <Form-item label="产品名称">
                <Input type="text" v-model="searchParam.productName" placeholder="请输入产品名称称" />
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
        <Button icon="md-add" @click="handleAdd" type="primary">新增</Button>
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
        <EditForm ref='form' :formData="formData" :moadl_status="modal.status"/>
      </Modal>
    </div>
  </div>
</template>
<script>
import { getProductList } from '@/api/product.js'
import EditForm from './modules/editForm'

export default {
  name: 'Product',
  components: {
    EditForm
  },
  data () {
    return {
      searchParam: {
        isAsc: 'asc',
        pageNum: 1,
        pageSize: 10,
        orderByColumn: '',
        productName: ''
      },
      total: 0,
      tableData: [],
      columns: [{
        title: '序号',
        type: 'index',
        width: 70,
        align: 'center'
      }, {
        title: '产品编号',
        align: 'center',
        key: 'productNO'
      }, {
        title: '产品名称',
        align: 'center',
        key: 'productName'
      }, {
        title: '产品周期',
        align: 'center',
        key: 'productName'
      }, {
        title: '产品类型',
        align: 'center',
        key: 'productName'
      }, {
        title: '结算方式',
        align: 'center',
        key: 'productName'
      }, {
        title: '费率',
        align: 'center',
        key: 'balPer'
      }, {
        title: '单价',
        align: 'center',
        key: 'price'
      }, {
        title: '创建时间',
        align: 'center',
        key: 'postTime'
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
              class: 'ivu-btn-success',
              on: {
                click: () => {
                  this.handleDetail(params)
                }
              }
            }, '详情'),
            h('Button', {
              class: 'ml10 ivu-btn-primary',
              on: {
                click: () => {
                  this.handleEdit(params)
                }
              }
            }, '编辑'),
            h('Button', {
              class: 'ml10 ivu-btn-error',
              on: {
                click: () => {
                  this.handleDelete(params)
                }
              }
            }, '删除')
          ])
        }
      }],
      modal: {
        title: '新增',
        visible: false,
        confirmLoading: false,
        status: 1
      },
      formData: {
        productNO: '',
        productName: '',
        productRange: '',
        productType: '',
        payStyle: '',
        balPer: '',
        price: '',
        taxPer: ''
      }
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    // 加载列表数据
    loadList () {
      const params = new FormData()
      params.append('isAsc', this.searchParam.isAsc)
      params.append('pageNum', this.searchParam.pageNum)
      params.append('pageSize', this.searchParam.pageSize)
      params.append('orderByColumn', this.searchParam.orderByColumn)
      params.append('productName', this.searchParam.productName)
      this.$Message.loading('正在加载中...', 0)
      getProductList(params).then(res => {
        this.$Message.destroy()
        if (res.data.code === 0) {
          this.total = res.data.total
          this.tableData = res.data.rows
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 确认新增
    addClick () {},
    // 确认修改
    editClick () {},
    // 点击删除
    handleDelete (item) {
      console.log(item)
    },
    // 打开新增弹框
    handleAdd () {
      const formData = this.formData
      Object.keys(formData).forEach(i => {
        formData[i] = ''
      })
      this.formData = formData
      this.modal.status = 1
      this.modal.title = '新增'
      this.modal.visible = true
    },
    // 打开详情弹框
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
      this.formData = formData
      this.modal.status = 3
      this.modal.title = '详情'
      this.modal.visible = true
    },
    // 分页切换
    handlePageNumChange (page) {
      this.searchParam.pageNum = page
      this.loadList()
    },
    // 每页条数切换
    handlePageSizeChange (size) {
      this.searchParam.pageSize = size
      this.loadList()
    },
    // 搜索
    handleSearch () {
      this.loadList()
    },
    // 重置
    handleReset () {
      this.searchParam.productName = ''
      this.loadList()
    },
    // 关闭弹框按钮
    handleCancel () {
      this.modal.visible = false
    }
  }
}
</script>
