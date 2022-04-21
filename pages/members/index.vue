<template>
  <el-main>
    <NavigationTabs :data="navigateTabs" />
    <div class="w-full h-8"></div>
    <MemberFilterBar
      @my-user-filter="onFilter"
      @my-user-filter-refresh="onRefreshFilter"
    />
    <el-upload
      ref="upload"
      class="upload-excel"
      :headers="headers"
      name="file"
      action=""
      :http-request="handleFormData"
    >
      <el-button class="mb-1" size="small" type="success" @click="uploadExcel"
        >Upload file excel</el-button
      >
      <!-- <div slot="tip" class="el-upload__tip mb-3">
        xlsx files with a size less than 20MB
      </div> -->
    </el-upload>
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="dataQuery.size"
      :current-page="dataQuery.page"
      :multiple-choice="false"
      :height="610"
      @my-table-on-action="handleTableEvents"
    >
      <!-- Slot -->
      <template v-slot:button>
        <div />
      </template>
      <template v-slot:tableActions>
        <el-button type="primary">Detail</el-button>
      </template>

      <!-- End Slot -->
      <el-table-column type="index" label="STT" width="50" />

      <el-table-column label="Họ tên" prop="_id" width="220">
        <template slot-scope="{ row }">
          <div class="flex items-center">
            <el-avatar
              class="cursor-pointer"
              :size="32"
              :src="row.avatar || defaultAvatar"
              @error="true"
            />
            <span
              class="text-theme-1 font-bold cursor-pointer ml-2 break-normal text-left"
              @click="$router.push(`/members/${row._id}`)"
            >
              {{ $e(row, 'profile?.lastName') }}
              {{ $e(row, 'profile?.firstName') }}
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Ngày sinh" prop="_id" width="150">
        <template slot-scope="{ row }">
          {{ $e(row, 'profile?.birthday') | formatDate }}
        </template>
      </el-table-column>

      <el-table-column label="Chuyên môn" header-align="center" width="150">
        <div class="w-full flex justify-center">
          <el-tag type="success" effect="plain"> Lập trình </el-tag>
        </div>
      </el-table-column>

      <el-table-column label="Điện thoại" prop="_id" width="130">
        <template slot-scope="{ row }">
          {{ $e(row, 'profile?.phone') }}
        </template>
      </el-table-column>

      <el-table-column label="Email" prop="email" width="220">
      </el-table-column>

      <el-table-column label="Tình Trạng Hoạt Động" width="200">
        <template slot-scope="{ row }">
          <div class="w-full flex justify-center">
            <el-select
              :value="row.status"
              @change="(value) => handleSwitchChange(row, value)"
            >
              <el-option
                v-for="item in Object.values(userStatus)"
                :key="item"
                :value="item"
                :label="`${$t('users.status.' + item.toLowerCase())}`"
              >
              </el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
    </DataTable>
  </el-main>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { NavigationTabs } from '~templates/Tab'
import { DataTable } from '~/components/common/Templates/Table'
import { MemberFilterBar } from '~/components/uncommon/Member'
import qs from 'qs'
import { config } from './config'
import { userMutations as moduleMutations } from '~/store/users/mutations'
import { userActions as moduleActions } from '~/store/users/actions'
import dataTableMixin from '~/mixins/components/table'
import confirmActionMixin from '~/mixins/confirmActions'
import { USER_STATUS, DEFAULT_AVATAR } from '~/constants/common'
export default {
  name: 'ListMember',
  meta: {
    config,
  },
  middleware: [
    'auth',
    ({ store, query }) => {
      // Clear in store
      store.commit(moduleMutations.CLEAR.QUERY)
      if (qs.stringify(query) !== '') {
        // Looking for numeric string and convert them to Number
        Object.keys(query).forEach((key, index) => {
          if (!isNaN(query[key])) {
            query[key] = Number(query[key])
          }
        })
        store.commit(moduleMutations.SET.QUERY, query)
      }
    },
  ],
  components: {
    NavigationTabs,
    DataTable,
    MemberFilterBar,
  },
  mixins: [dataTableMixin, confirmActionMixin],
  data() {
    return {
      moduleActions,
      moduleMutations,
      navigateTabs: [
        {
          label: 'Danh sách thành viên',
          key: 'members', // For active check
        },
        {
          label: 'Danh sách nhóm',
          key: 'members-groups', // For active check
        },
      ],
      tableActions: [
        {
          name: 'view',
          label: 'table.view',
          permission: ['ALL'],
        },
        {
          name: 'edit',
          label: 'table.edit',
          permission: ['ALL'],
        },
        {
          name: 'delete',
          label: 'table.delete',
          permission: ['ALL'],
        },
      ],
      userStatus: USER_STATUS,
      defaultAvatar: DEFAULT_AVATAR,
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.users.data,
      dataQuery: (state) => state.users.query,
      dataTotal: (state) => state.users.total,
      headers: (state) => ({
        Accept: '*/*',
        'Content-Type':
          'multipart/form-data; boundary=<calculated when request is sent>',
        Authorization: state.auth.data.accessToken,
      }),
    }),
  },
  created() {
    this.$store.commit('SET_PAGE_TITLE', 'Thành viên')
  },
  methods: {
    ...mapActions({
      deleteSingle: moduleActions.DELETE.SINGLE,
      changeStatus: moduleActions.UPDATE.CHANGE_STATUS,
      update: moduleActions.DELETE.SINGLE,
      uploadExcelFile: moduleActions.UPLOAD.EXCEL,
    }),
    onEdit(payload) {
      this.$router.push(
        `/${this.$store.getters['auth/roleGroup']}/customers/edit/${payload.rowData.id}`
      )
    },
    onDelete(payload) {
      try {
        this.confirmAction(async () => {
          await this.deleteSingle(payload.rowData.id)
          this.$fetch()
        })
      } catch (error) {
        //
      }
    },
    handleSwitchChange(current, value) {
      if (
        current.status !== USER_STATUS.PENDING &&
        value === USER_STATUS.PENDING
      ) {
        console.log('Invalid status')
      } else {
        this.confirmAction(
          async () => {
            await this.changeStatus({
              id: current._id,
              body: { status: value },
            })
            this.$fetch()
          },
          () => {},
          'Cảnh báo',
          'Bạn có chắc muốn đổi trạng thái hoạt động của thành viên này không?'
        )
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    async handleFormData(content) {
      try {
        const formData = new FormData()
        formData.append('excel', content.file)
        await this.uploadExcelFile(formData)
      } catch (error) {
        // console.log('[error]', error)
      }
    },
    uploadExcel() {
      this.$refs.upload.submit()
    },
  },
  head() {
    return {
      title: 'Danh sách thành viên',
    }
  },
}
</script>
