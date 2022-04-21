<template>
  <el-main class="p-8">
    <DialogWrapper
      :id="'member-of-group-add-dialog'"
      class="member-of-group-add-dialog"
      title="Thêm thành viên"
      :center="true"
    >
      <FormWrapper ref="addMemberOfGroupForm" :model="form">
        <!-- <label class="text-theme-1"> Thêm thành viên </label> -->
        <!-- <InputWrapper
          rules="required"
          prop="name"
          class="el-default-input dark"
        >
          <el-input v-model="form.value" maxlength="255"></el-input>
        </InputWrapper> -->
        <el-card>
          <el-select
            v-model="value1"
            multiple
            placeholder="Select"
            class="w-full"
          >
            <el-option
              v-for="item in members"
              :key="item._id"
              :label="item.profile.fullName"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-card>
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
import { userActions } from '~/store/users/actions'
import { userMutations } from '~/store/users/mutations'

export default {
  name: 'MemberOfGroupAddDialog',
  meta: {
    config,
  },
  middleware: ['auth'],
  components: {
    FormWrapper,
    // InputWrapper,
    DialogWrapper,
  },
  async fetch() {
    // Set query limit 100
    this.$store.commit(userMutations.SET.QUERY, {
      offset: 0,
      size: 20,
    })
    const { content } = await this.fetchMembers()
    this.members = content
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
      members: null,
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.users.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchMembers: userActions.FETCH.DATA,
    }),
  },
  head() {
    return {}
  },
}
</script>
