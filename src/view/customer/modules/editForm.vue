<template>
  <div>
    <Form :model="formData" :rules="validataRules" :label-width="80">
      <Form-item label="上级公司" prop="parentId">
        <Select v-model="formData.parentId" placeholder="请选择上级公司">
          <Option v-for="(item, index) in companyTypeList" :value="item.value" :key="index">{{ item.label }}</Option>
      </Select>
      </Form-item>
      <Form-item label="公司名称" prop="companyName">
        <Input v-model="formData.companyName" placeholder="请输入公司名称"></Input>
      </Form-item>
      <Form-item label="公司类型" prop="companyType">
        <Select v-model="formData.companyType" placeholder="请选择公司类型">
          <Option v-for="(item, index) in companyTypeList" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </Form-item>
      <Form-item label="法人代表" prop="legalPerson">
        <Input v-model="formData.legalPerson" placeholder="请输入法人代表"></Input>
      </Form-item>
      <Form-item label="公司地址" prop="legalPerson">
        <Select v-model="formData.province" placeholder="-省-">
          <Option v-for="(item, index) in provinceList" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </Form-item>
      <Form-item label="详细地址" prop="companyAddress">
        <Input v-model="formData.companyAddress" placeholder="请输入详细地址"></Input>
      </Form-item>
      <Form-item label="社保规则" prop="socialNO">
        <Select v-model="formData.province2" placeholder="-省-">
          <Option v-for="(item, index) in provinceList" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </Form-item>
    </Form>
  </div>
</template>
<script>
import { province } from '@/assets/js/area.js'
export default {
  name: 'EditForm',
  data () {
    return {
      validataRules: {
        parentId: [{ required: true, message: '请选择上级公司', trigger: 'change' }],
        companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        companyType: [{ required: true, message: '请选择公司类型', trigger: 'change' }]
      },
      formData: {
        parentId: '', // 上级公司
        companyName: '', // 公司名称
        companyType: '', // 公司类型
        province: ''
      },
      companyTypeList: [{ label: '公司', value: '1' }],
      provinceList: province
    }
  }
}
</script>
