<template>
  <el-main class="p-8">
    <DialogWrapper
      :id="'leader-of-group-add-dialog'"
      class="leader-of-group-add-dialog"
      title="Đổi nhóm trưởng"
      :center="true"
      @my-dialog-on="onShow"
    >
      <FormWrapper ref="addLeaderOfGroupForm" :model="form">
        <!-- <label class="text-theme-1"> Thêm thành viên </label> -->
        <!-- <InputWrapper
          rules="required"
          prop="name"
          class="el-default-input dark"
        >
          <el-input v-model="form.value" maxlength="255"></el-input>
        </InputWrapper> -->
        <div
          class="border-solid border-2 rounded my-2 p-4"
          style="border-color: #4e5983"
        >
          <div class="flex justify-center">
            <span> Hãy chọn leader cho nhóm "chuyên môn UX" </span>
          </div>

          <el-row :gutter="20">
            <el-col :span="12">
              <div
                class="border-solid border-2 rounded my-2 p-4"
                style="border-color: #4e5983"
              >
                <el-radio-group v-model="leader">
                  <el-radio
                    v-for="item in options"
                    :key="item._id"
                    :label="item._id"
                    class="border-solid border-2 rounded my-2 p-4"
                    style="border-color: #4e5983"
                  >
                    <span>{{
                      $e(item, 'profile?.lastName') +
                      ' ' +
                      $e(item, 'profile?.firstName')
                    }}</span>
                    <br />
                    <span class="ml-6">Chuyên môn lập trình</span>
                  </el-radio>
                </el-radio-group>
              </div>
            </el-col>
            <!-- <el-col :span="12">
              <div
                v-for="index in 5"
                :key="index"
                class="border-solid border-2 rounded my-2 p-4"
                style="border-color: #4e5983"
              >
                <el-radio v-model="radio" label="1">
                  <span>Nguyễn Văn Võ Trung Hiếu</span>
                  <br />
                  <span class="ml-6">Chuyên môn lập trình</span>
                </el-radio>
              </div>
            </el-col> -->
          </el-row>
        </div>
        <div class="text-right mt-10">
          <el-button
            round
            type="primary"
            class="bg-gray-200 text-theme-1 hover:bg-gray-300 shadow border-none"
          >
            Hủy bỏ
          </el-button>
          <el-button
            round
            native-type="submit"
            type="primary"
            class="bg-theme-1 text-light hover:bg-theme-1-600 shadow border-none"
          >
            Xác nhận
          </el-button>
        </div>
      </FormWrapper>
    </DialogWrapper>
    <!--  -->
  </el-main>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { config } from './config'
import { FormWrapper } from '~/components/common/Templates/Form'
import { DialogWrapper } from '~/components/common/Templates/Dialog'

export default {
  name: 'LeaderOfGroupAddDialog',
  meta: {
    config,
  },
  middleware: ['auth'],
  components: {
    FormWrapper,
    // InputWrapper,
    DialogWrapper,
  },
  data() {
    return {
      form: {},
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      value1: [],
      leader: null,
    }
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    ...mapActions({}),
    onShow() {
      const data = this.$store.state.groups?.data?.childs?.[0].members
      if (data) {
        this.options = data
      }
    },
  },
  head() {
    return {}
  },
}
</script>
