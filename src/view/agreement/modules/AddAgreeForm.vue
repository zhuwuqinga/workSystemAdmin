<template>
  <div>
    <Form :model="formData" :rules="validate" :label-width="80">
      <Row>
        <Col :span="12">
          <Form-item label="协议编号" prop="no">
            <Input v-model="formData.no" placeholder="请输入协议编号"></Input>
          </Form-item>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'AddAgreeForm',
  data () {
    return {
      formData: {},
      validate: {
        no: [
          { required: true, message: '请输入协议编号', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
