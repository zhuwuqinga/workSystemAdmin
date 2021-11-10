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
    <div>
      <Card>
        <Button icon="md-add" @click="handleAdd" type="primary">新增协议</Button>
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
  </div>
</template>
<script>
import { getProductList } from '@/api/product.js'

export default {
  name: 'Product',
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
                  this.handleEdit(params)
                }
              }
            }, '编辑'),
            h('Button', {
              class: 'ml10 ivu-btn-success',
              on: {
                click: () => {
                  this.handleDelete(params)
                }
              }
            }, '删除')
          ])
        }
      }]
    }
  },
  created () {
    this.loadList()
  },
  methods: {
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
    handleAdd () {},
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
      this.searchParam.productName = ''
      this.loadList()
    }
  }
}
</script>
