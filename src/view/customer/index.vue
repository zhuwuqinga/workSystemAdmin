<template>
  <div>
    <div class="search-con search-con-top search_box">
      <Card>
        <Form :model="searchParam" :label-width="80">
          <Row>
            <Col span="8">
              <Form-item label="公司类型">
                <Select v-model="searchParam.type" placeholder="请选择公司类型">
                  <Option value="">全部</Option>
                  <Option value="type1">类型1</Option>
                  <Option value="type2">类型2</Option>
                  <Option value="type3">类型3</Option>
              </Select>
              </Form-item>
            </Col>
            <Col span="8">
              <Form-item label="公司名称">
                <Input type="text" v-model="searchParam.company" placeholder="请输入公司名称" />
              </Form-item>
            </Col>
            <Col span="8">
              <Form-item>
                <Button @click="handleSearch" type="primary">搜索</Button>
                <Button @click="handleReset" class="reset_btn">重置</Button>
              </Form-item>
            </Col>
          </Row>
        </Form>
      </Card>
      <div class="mt10">
        <Card>
          <Table border :columns="columns" :data="data"></Table>
          <Page :total="100" show-sizer show-elevator show-total></Page>
        </Card>
      </div>
      <div class="mt10"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Customer',
  data () {
    return {
      searchParam: {
        type: '',
        company: ''
      },
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '年龄',
          align: 'center',
          key: 'age'
        },
        {
          title: '地址',
          align: 'center',
          key: 'address'
        },
        {
          title: '操作',
          align: 'center',
          key: 'action',
          fixed: 'right',
          width: 180,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '详情'),
              h('Button', {
                class: 'ml10',
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    }
  },
  methods: {
    handleSearch () {},
    handleReset () {},
    show (index) {
      console.log('详情', index)
    },
    remove (index) {
      console.log('删除', index)
    }
  }
}
</script>
