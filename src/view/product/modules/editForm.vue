<template>
  <div>
    <Form ref="form" :model="formData" :rules="validataRules" :label-width="100">
      <Row>
        <Col span="12">
          <Form-item  label="产品编号" prop="productNO">
            <Input v-model="formData.productNO" :disabled="moadl_status === 3" placeholder="请输入产品编号"></Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item  label="产品名称" prop="productName">
            <Input v-model="formData.productName" :disabled="moadl_status === 3" placeholder="请输入产品名称"></Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="产品周期" prop="productRange">
            <Select v-model="formData.productRange" :disabled="moadl_status === 3" placeholder="请选择产品周期">
              <Option v-for="(item, index) in rangeList" :value="item.id" :key="index">{{ item.name }}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item  label="产品类型" prop="productType">
            <Select v-model="formData.productType" :disabled="moadl_status === 3" placeholder="请选择产品类型">
              <Option v-for="(item, index) in typeList" :value="item.id" :key="index">{{ item.name }}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item  label="结算方式" prop="payStyle">
            <Select v-model="formData.payStyle" :disabled="moadl_status === 3" placeholder="请选择结算方式">
              <Option v-for="(item, index) in styleList" :value="item.id" :key="index">{{ item.name }}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item  label="单价" prop="price">
            <Input v-model="formData.price" :disabled="moadl_status === 3" placeholder="请输入单价"></Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item  label="费率" prop="balPer">
            <Input v-model="formData.balPer" :disabled="moadl_status === 3" placeholder="请输入费率"></Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item  label="税率" prop="taxPer">
            <Input v-model="formData.taxPer" :disabled="moadl_status === 3" placeholder="请输入税率"></Input>
          </Form-item>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import { createNO } from '@/api/product.js'

export default {
  name: 'EditForm',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    moadl_status: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      validataRules: {},
      rangeList: [{ id: 1, name: '月' }, { id: 2, name: '季' }, { id: 3, name: '年' }],
      typeList: [{ id: 1, name: '服务费' }, { id: 2, name: '客户资金' }, { id: 3, name: '一次性' }],
      styleList: [{ id: 1, name: '按人收取' }, { id: 2, name: '百分比' }]
    }
  },
  created () {
    this.createNO()
  },
  methods: {
    createNO () {
      createNO({ prefix: '' }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
