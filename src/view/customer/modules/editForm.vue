<template>
  <div>
    <Form ref="form" :model="formData" :rules="validataRules" :label-width="100">
      <Row>
        <Col span="12">
          <Form-item label="上级公司" prop="parentId">
            <!-- <div v-if="status === 3">{{ detail.companyName }}</div> -->
            <Select v-model="formData.parentId" :disabled="status === 3" placeholder="请选择上级公司">
              <Option v-for="(item, index) in parentCompanyList" :value="item.companyId" :key="index">{{ item.companyName }}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item  label="公司名称" prop="companyName">
            <Input v-model="formData.companyName" :disabled="status === 3" placeholder="请输入公司名称"></Input>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Form-item label="公司类型" prop="companyType">
            <Select v-model="formData.companyType" :disabled="status === 3" placeholder="请选择公司类型">
              <Option v-for="(item, index) in companyTypeList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col span="12">
            <Form-item label="法人代表" prop="legalPerson">
              <Input v-model="formData.legalPerson" :disabled="status === 3" placeholder="请输入法人代表"></Input>
            </Form-item>
          </Col>
      </Row>
      <Row>
        <Col span="12">
          <Form-item label="公司地址" prop="area" class="mult_select_box">
            <Select v-model="formData.province" :disabled="status === 3" placeholder="-省-" @on-change="changeProvince" class="address_select">
              <Option v-for="(item, index) in provinceList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
            <Select v-model="formData.city" :disabled="status === 3" placeholder="-市-" @on-change="changeCity" class="address_select">
              <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
            <Select v-model="formData.area" :disabled="status === 3" placeholder="-区/县-" class="address_select">
              <Option v-for="(item, index) in areaList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="详细地址" prop="companyAddress">
            <Input v-model="formData.companyAddress" :disabled="status === 3" placeholder="请输入详细地址"></Input>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Form-item label="社保规则地区" prop="area1" class="mult_select_box">
            <Select v-model="formData.province1" :disabled="status === 3" placeholder="-省-" @on-change="changeSocialProvince" class="address_select">
              <Option v-for="(item, index) in provinceList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
            <Select v-model="formData.city1" :disabled="status === 3" placeholder="-市-" @on-change="changeSocialCity" class="address_select">
              <Option v-for="(item, index) in socialCityList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
            <Select v-model="formData.area1" :disabled="status === 3" placeholder="-区/县-" @on-change="changeSocialArea" class="address_select">
              <Option v-for="(item, index) in socialAreaList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="社保规则" prop="socialNO">
            <Select v-model="formData.socialNO" :disabled="status === 3" placeholder="请选择社保规则">
              <Option v-for="(item, index) in socialList" :value="item.socialNO" :key="index">{{ item.title }}</Option>
            </Select>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Form-item label="公积金地区" prop="area2" class="mult_select_box">
            <Select v-model="formData.province2" :disabled="status === 3" placeholder="-省-" @on-change="changePublicProvince" class="address_select">
              <Option v-for="(item, index) in provinceList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
            <Select v-model="formData.city2" :disabled="status === 3" placeholder="-市-" @on-change="changePublicCity" class="address_select">
              <Option v-for="(item, index) in publicCityList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
            <Select v-model="formData.area2" :disabled="status === 3" placeholder="-区/县-" @on-change="changePublicArea" class="address_select">
              <Option v-for="(item, index) in publicAreaList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="公积金规则" prop="publicFundNO">
            <Select v-model="formData.publicFundNO" :disabled="status === 3" placeholder="请选择社保规则">
              <Option v-for="(item, index) in publicFundNOList" :value="item.publicFundNO" :key="index">{{ item.title }}</Option>
            </Select>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Form-item label="有效期限" prop="expiryDateType">
            <Select v-model="formData.expiryDateType" :disabled="status === 3" placeholder="请选择有效期限">
              <Option v-for="(item, index) in expiryDateTypeList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="有效期限时间" prop="expiryDate">
            <Date-picker :value="formData.expiryDate" :disabled="status === 3" type="date" :editable="false" format="yyyy-MM-dd" @on-change="choiceDate" placeholder="选择有效期限时间"></Date-picker>
            <Input v-model="formData.expiryDate" placeholder="请输入社会信用代码" class="expiryDate"></Input>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Form-item label="社会信用代码" prop="netpNo">
            <Input v-model="formData.netpNo" :disabled="status === 3" placeholder="请输入社会信用代码"></Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="所属行业" prop="industry">
            <Select v-model="formData.industry" :disabled="status === 3" placeholder="请选择所属行业">
              <Option v-for="(item, index) in industryList" :value="item.stationTempId" :key="index">{{ item.industryName }}</Option>
            </Select>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Form-item label="对公帐号" prop="billBankno">
            <Input v-model="formData.billBankno" :disabled="status === 3" placeholder="请输入对公帐号"></Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="开户行" prop="billBankaddr">
            <Input v-model="formData.billBankaddr" :disabled="status === 3" placeholder="请输入开户行"></Input>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Form-item label="联系电话" prop="mobile">
            <Input v-model="formData.mobile" :disabled="status === 3" placeholder="请输入联系电话"></Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="销售人员" prop="saleId">
            <Select v-model="formData.saleId" :disabled="status === 3" placeholder="请选择销售人员">
              <Option v-for="(item, index) in saleManList" :value="item.userId" :key="index">{{ item.realName }}</Option>
            </Select>
          </Form-item>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import { province, loadCity, loadArea } from '@/assets/js/area.js'
import { getSocialRuleList, getPublicFundRuleList, getStationList, getSaleManList } from '@/api/custorm.js'

export default {
  name: 'EditForm',
  props: {
    parentCompanyList: {
      type: Array,
      default: () => {
        return []
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    status: {
      type: Number,
      default: 1
    },
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      validataRules: {
        parentId: [{ required: true, message: '请选择上级公司', trigger: 'change', type: 'number' }],
        companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        companyType: [{ required: true, message: '请选择公司类型', trigger: 'change' }],
        legalPerson: [{ required: true, message: '请输入法人', trigger: 'blur' }],
        area: [{ required: true, message: '请选择公司地区', trigger: 'change' }],
        companyAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        area1: [{ required: true, message: '请选择社保规则地区', trigger: 'change' }],
        socialNO: [{ required: true, message: '请选择社保规则', trigger: 'change' }],
        area2: [{ required: true, message: '请选择公积金规则地区', trigger: 'change' }],
        publicFundNO: [{ required: true, message: '请选择公积金规则', trigger: 'change' }],
        expiryDateType: [{ required: true, message: '请选择有效期限', trigger: 'change', type: 'number' }],
        expiryDate: [{ required: true, message: '请选择有效期限时间', trigger: 'blur' }],
        netpNo: [{ required: true, message: '请输入社会信用代码', trigger: 'blur' }],
        industry: [{ required: true, message: '请选择所属行业', trigger: 'change', type: 'number' }],
        billBankno: [{ required: true, message: '请输入对公帐号', trigger: 'blur' }],
        billBankaddr: [{ required: true, message: '请输入开户行', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        saleId: [{ required: true, message: '请输入销售人员', trigger: 'change', type: 'number' }]
      },
      companyTypeList: [{ value: '1', label: '集团总公司' }, { value: '2', label: '集团分公司' }, { value: '3', label: '有限公司' }],
      provinceList: province,
      cityList: [],
      areaList: [],
      socialCityList: [],
      socialAreaList: [],
      socialList: [],
      publicCityList: [],
      publicAreaList: [],
      publicFundNOList: [],
      expiryDateTypeList: [{ value: 1, label: '非长期' }, { value: 2, label: '长期' }],
      industryList: [],
      saleManList: []
    }
  },
  created () {
    this.$Message.loading('正在加载中...', 0)
    if (this.status !== 1) {
      this.changeProvince(this.formData.province)
      this.changeCity(this.formData.city)
      this.changeSocialProvince(this.formData.province1)
      this.changeSocialCity(this.formData.city1)
      this.getSocialRuleList(this.formData.area1)
      this.changePublicProvince(this.formData.province2)
      this.changePublicCity(this.formData.city2)
      this.getPublicFundRuleList(this.formData.area2)
    }
    Promise.all([this.getStationList(), this.getSaleManList()]).then(() => {
      this.$Message.destroy()
    })
  },
  methods: {
    // 公司地址省市区 -- START
    changeProvince (e) {
      let cityList = loadCity(e)
      this.cityList = cityList
    },
    changeCity (e) {
      if (e === undefined) return
      let areaList = loadArea(e)
      this.areaList = areaList
    },
    // 公司地址省市区 -- END
    // 社保规则省市区 -- START
    changeSocialProvince (e) {
      let socialCityList = loadCity(e)
      this.socialCityList = socialCityList
    },
    changeSocialCity (e) {
      if (e === undefined) return
      let socialAreaList = loadArea(e)
      this.socialAreaList = socialAreaList
    },
    changeSocialArea (e) {
      this.getSocialRuleList(e)
    },
    getSocialRuleList (id) {
      getSocialRuleList({ area: id }).then(res => {
        if (res.data.code === 0) {
          this.socialList = res.data.data
        }
      })
    },
    // 社保规则省市区 -- END
    // 公积金规则省市区 -- START
    changePublicProvince (e) {
      let publicCityList = loadCity(e)
      this.publicCityList = publicCityList
    },
    changePublicCity (e) {
      if (e === undefined) return
      let publicAreaList = loadArea(e)
      this.publicAreaList = publicAreaList
    },
    changePublicArea (e) {
      this.getPublicFundRuleList(e)
    },
    getPublicFundRuleList (id) {
      getPublicFundRuleList({ area: id }).then(res => {
        if (res.data.code === 0) {
          this.publicFundNOList = res.data.data
        }
      })
    },
    // 公积金规则省市区 -- END
    // 行业列表
    getStationList () {
      getStationList().then(res => {
        if (res.data.code === 0) {
          this.industryList = res.data.rows
        }
      })
    },
    // 销售员列表
    getSaleManList () {
      getSaleManList({ companyId: 0, roleId: 18 }).then(res => {
        if (res.data.code === 0) {
          this.saleManList = res.data.data
        }
      })
    },
    // 选择有效期限时间
    choiceDate (e) {
      this.formData.expiryDate = e
    }
  }
}
</script>
<style lang="less" scoped>
.mult_select_box{
  /deep/ .ivu-form-item-content{
    display: flex;
    align-items: center;
    .address_select{
      width: 32%;
      &:not(:first-child){
        margin-left: auto;
      }
    }
  }
}
.expiryDate{
  visibility: hidden;
  position: absolute;
}
</style>
