<template>
  <el-main>
    <div class="flex justify-between">
      <el-button
        icon="el-icon-back"
        circle
        @click="$router.push('/members/groups')"
      ></el-button>
      <p class="inline underline text-2xl font-semibold">
        Danh Sách Nhóm Chuyên Môn {{ $e(viewing, 'name') }}
      </p>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$router.push('/members/groups/creating')"
        >Thêm Nhóm</el-button
      >
    </div>
    <div class="mt-10 flex justify-between">
      <div class="inline">
        <div class="inline"><hr class="line w-10 inline-block" /></div>
        <p class="inline underline text-2xl ml-5">Nhóm Chuyên Môn UX</p>
        <el-button type="default" plain class="ml-5" @click="addMember">
          <fa class="mr-2" :icon="['fas', 'user-plus']" />
          Thêm Thành Viên
        </el-button>
        <el-button type="default" plain @click="changeLeader">
          <fa class="mr-2" :icon="['fas', 'user-plus']" /> Đổi Leader
        </el-button>
      </div>
      <el-button type="danger" plain>Xóa Nhóm</el-button>
    </div>
    <el-card class="mt-10">
      <span
        ><fa class="text-theme-1 mr-2" :icon="['fas', 'users']" />Danh Sách
        Thành Viên</span
      >
      <span class="ml-10"
        ><fa class="text-theme-1 mr-2" :icon="['fas', 'users']" />
        {{
          $e(leader, 'profile?.firstName') +
          ' ' +
          $e(leader, 'profile?.lastName')
        }}</span
      >
      <!-- List danh sách thành viên -->
      <el-row class="mt-5">
        <el-col v-for="(item, index) in usersGroup" :key="index" :span="8">
          <div class="flex flex-row mt-2">
            <div>
              <el-avatar :src="item.avatar"></el-avatar>
            </div>
            <div class="flex flex-col ml-3">
              <span>{{
                item.profile.lastName + ' ' + item.profile.firstName
              }}</span>
              <span>{{ item.profile.phone }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- Lịch hoạt động -->
      <div class="inline mt-5">
        <fa class="mr-2 text-theme-1" :icon="['fas', 'calendar-alt']" />
        <span>Lịch Hoạt Động</span>
        <el-button class="ml-5" type="primary" icon="el-icon-plus"></el-button>
      </div>
      <el-row :gutter="10" class="mt-5">
        <el-col v-for="index in 5" :key="index" :span="4">
          <el-card class="calendar-content">
            <div class="flex flex-col items-center">
              <span class="font-semibold text-xl mt-5">Thứ Hai</span>
              <br />
              <span class="text-xs">7:00 AM - 9:00 AM</span>
              <br />
              <el-button type="primary" plain>Chỉnh sửa </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <AddMember />
    <UpdateLeader />
  </el-main>
</template>
<script>
// import { NavigationTabs } from '~templates/Tab'
import { mapActions, mapState } from 'vuex'
import AddMember from './edit/member.vue'
import UpdateLeader from './edit/leader.vue'
import { groupActions } from '~/store/groups/actions'
import state from '~/example/store-module/state'
export default {
  name: 'GroupDetail',
  components: {
    // NavigationTabs,
    AddMember,
    UpdateLeader,
  },
  // async fetch() {
  //   await this.fetchUserGroup()
  // },
  data() {
    return {
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
    }
  },
  computed: {
    ...mapState({
      viewing: (state) => state.groups.viewing,
      leader: (state) => state.groups?.data?.leader,
      usersGroup: (state) => state.groups?.data?.childs?.[0].members,
    }),
  },
  methods: {
    ...mapActions({
      fetchUserGroup: groupActions.FETCH.SINGLE,
    }),
    addMember() {
      this.$root.$emit('my-dialog-show', 'member-of-group-add-dialog')
    },
    changeLeader() {
      this.$root.$emit('my-dialog-show', 'leader-of-group-add-dialog')
    },
  },
}
</script>
<style lang="scss" scoped>
.line {
  border-top: 2px solid gray;
}
// .calendar-content .el-card__body {
//   padding: 1px !important;
// }
</style>
