<template>
  <el-main>
    <NavigationTabs :data="navigateTabs" />
    <div class="w-full h-8"></div>
    <el-row :gutter="30">
      <el-col :span="16">
        <GroupContainer
          v-for="{ _id, name, groups } in groupsProvider"
          :key="'group-' + _id"
          :title="name"
        >
          <el-row :gutter="30">
            <el-col
              v-for="group in groups"
              :key="'sub-group-' + group._id"
              :span="12"
              class="mb-7"
            >
              <GroupComponent :initial-group="group" />
            </el-col>
          </el-row>
        </GroupContainer>
      </el-col>
      <el-col :span="8">
        <WidgetComponent />
      </el-col>
    </el-row>
    <!-- <CalendarAndMemberOfGroup /> -->
  </el-main>
</template>
<script>
import { NavigationTabs } from '~templates/Tab'
import { mapActions, mapGetters } from 'vuex'
// import { CalendarAndMemberOfGroup } from '~/components/uncommon/Member'
import {
  GroupContainer,
  GroupComponent,
  WidgetComponent,
} from '~/components/uncommon/Member'
import { groupActions } from '~/store/groups/actions'
export default {
  name: 'ListMember',
  components: {
    NavigationTabs,
    // CalendarAndMemberOfGroup,
    GroupContainer,
    GroupComponent,
    WidgetComponent,
  },
  async fetch() {
    try {
      const { content } = await this.fetchAllGroups()
      this.groupsProvider = content
    } catch (error) {
      this.$dev.error(error)
    }
  },
  data() {
    return {
      groupsProvider: [],
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
      activeName: 'first',
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    ...mapActions({
      fetchAllGroups: groupActions.FETCH.DATA,
    }),
  },
}
</script>
