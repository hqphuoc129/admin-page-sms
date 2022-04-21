<template>
  <el-main>
    <NavigationTabs :data="navigateTabs" active-key="members" />
    <div class="w-full h-8"></div>
    <section class="detail-member__container">
      <div class="left-content__container leading-10">
        <!-- Avatar container -->
        <div class="w-full h-60 relative">
          <el-button
            icon="el-icon-back"
            circle
            class="w-8 h-8 outline-none absolute top-0 left-0 flex justify-center items-center text-xl"
            @click="$router.push('/members')"
          ></el-button>
          <el-image
            fit="scale-down"
            src="https://gravatar.com/avatar/064deebf7823409a91090e78216176ef?s=400&d=robohash&r=x"
            class="avatar__container"
          ></el-image>
        </div>
        <div class="w-full flex justify-center">
          <el-button type="primary" plain @click="openModalForm">
            Chỉnh sửa
          </el-button>
        </div>
        <p class="text-center my-2">
          <span class="border-gray border-b py-2"
            >{{ $e(user, 'profile?.fullName') }}
          </span>
        </p>
        <p class="user-info">
          <i class="el-icon-school"></i>
          Cao Đẳng Lương Thực - Thực Phẩm
        </p>
        <p class="user-info flex justify-between">
          <span>
            <i class="el-icon-school"></i>
            {{ $e(user, 'profile?.birthday') | formatDate }}
          </span>
          <span>
            <i class="el-icon-school"></i>
            {{ $e(user, 'profile?.phone') }}
          </span>
        </p>
        <p class="user-info">
          <i class="el-icon-school"></i>
          {{ $e(user, 'email') }}
        </p>
        <p class="user-info">
          <i class="el-icon-school"></i>
          Chuyên Môn Lập Trình
        </p>
        <p class="user-info">
          <i class="el-icon-school"></i>
          Chuyên Ngành Back-End
        </p>
        <p class="user-info">
          <i class="el-icon-school"></i>
          <el-tag>Tag 1</el-tag>
          <el-tag>Tag 2</el-tag>
          <el-tag>Tag 3</el-tag>
          <el-tag>+4</el-tag>
        </p>
        <div class="h-10 w-full" />
        <div
          class="w-full p-2 rounded-lg bg-white shadow-basic grid grid-flow-row grid-cols-2 grid-rows-2 gap-4"
        >
          <div
            v-for="item in 4"
            :key="'card-' + item"
            class="flex justify-between"
          >
            <p class="leading-6">
              <span style="font-size: 30px" class="font-bold">692</span>
              <br />
              <span class="text-sm">Số giờ hoạt động</span>
            </p>
            <span
              class="my-auto w-10 h-10 flex justify-center items-center text-2xl bg-theme-1-200 text-theme-1 rounded-full p-3"
            >
              <i class="el-icon-discover" />
            </span>
          </div>
        </div>
      </div>
      <div class="right-content__container">
        <p class="text-2xl font-bold">Lịch Hoạt Động</p>
        <div class="filer__container flex justify-between mt-4">
          <div class="flex flex-row">
            <div class="bg-theme-1-200 rounded-md p-2">
              22 - 28 tháng 3/2021
              <i
                class="el-icon-arrow-left ml-4 text-lg cursor-pointer text-theme-1 hover:font-bold"
              ></i>
              <i
                class="el-icon-arrow-right text-lg text-theme-1 cursor-pointer hover:font-bold"
              ></i>
            </div>
            <el-dropdown class="ml-4" style="transform: translateY(8px)">
              <span
                class="el-dropdown-link border border-theme-1 p-2 text-lg text-theme-1 rounded -mb-4"
              >
                <i class="el-icon-s-operation text-xl mx-3"></i>
                Lọc
                <i class="el-icon-arrow-down el-icon--right text-xl mx-3" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Chuyên môn</el-dropdown-item>
                <el-dropdown-item>Dự án</el-dropdown-item>
                <el-dropdown-item>Đào tạo</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-tag size="medium">
              <fa
                :icon="['fas', 'circle']"
                class="text-green mr-2"
                style="font-size: 10px"
              ></fa>
              Đang hoạt động</el-tag
            >
          </div>
        </div>
        <!-- Main container -->
        <div class="divide-y-2 divide-solid divide-gray-300">
          <ActivityCalendarItem v-for="item in 5" :key="item" />
        </div>
      </div>
    </section>
    <ModalMemberUpdater
      v-if="user"
      :key="'modal-' + user._id"
      :initial-user="user"
    />
  </el-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { NavigationTabs } from '~templates/Tab'
import {
  ActivityCalendarItem,
  ModalMemberUpdater,
} from '~/components/uncommon/Member'

import { config } from './config'
import confirmActionMixin from '~/mixins/confirmActions'
import { userActions } from '~/store/users/actions'

export default {
  name: 'DetailMember',
  meta: {
    config,
  },
  components: {
    NavigationTabs,
    ActivityCalendarItem,
    ModalMemberUpdater,
  },
  async fetch() {
    try {
      let id = this.$route.params.id
      if (!this.user || this.user._id !== id) {
        await this.fetchUserDetail(id)
      }
    } catch (error) {
      this.$dev.error(error)
    }
  },
  data() {
    return {
      value1: null,
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
      user: (state) => state.users.selected,
    }),
  },
  created() {
    this.$store.commit('SET_PAGE_TITLE', 'Thành viên')
  },
  methods: {
    ...mapActions({
      fetchUserDetail: userActions.FETCH.SINGLE,
    }),
    openModalForm() {
      this.$root.$emit('my-dialog-show', 'modal-member-updater')
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-member__container {
  @apply w-full flex flex-nowrap;
  .left-content__container {
    width: 32%;
    margin-right: 1rem;
  }
  .right-content__container {
    @apply flex-grow;
  }
}
.avatar__container {
  width: 200px;
  height: 200px;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  @apply absolute rounded-full border border-theme-1;
}
.user-info {
  font-weight: 500;
  i {
    @apply text-theme-1 text-2xl;
    margin-right: 1rem;
  }
}
</style>
