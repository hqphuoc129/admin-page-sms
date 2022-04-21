<template>
  <el-main class="overflow-y-hidden">
    <div class="flex items-center mb-5">
      <el-button
        icon="el-icon-back"
        circle
        class="bg-transparent"
        @click="$router.push('/members/groups')"
      />
      <h5 class="ml-10 font-medium">Thêm Nhóm Chuyên Môn</h5>
    </div>
    <CalendarAndMemberOfGroup v-if="finalStep === false" />
    <el-card v-else class="px-10 py-5">
      <div class="font-medium">
        <i class="el-icon-s-custom text-2xl text-theme-1 mr-1" /> Chọn Leader
      </div>
      <div
        class="min-h-[65vh] overflow-y-scroll border border-gray-400 rounded-sm pt-5 mt-3"
      >
        <p class="px-14">Hãy Chọn Leader Cho Nhóm "Phân Tích Kinh Doanh"</p>
        <div class="px-14 py-3 grid grid-cols-3 gap-5">
          <CheckboxCardItem />
          <CheckboxCardItem />
          <CheckboxCardItem />
          <CheckboxCardItem />
          <CheckboxCardItem />
        </div>
      </div>
    </el-card>
    <div class="flex justify-end">
      <div v-if="finalStep === false">
        <el-button class="mt-3" type="primary" @click="finalStep = !finalStep"
          >Tiếp tục</el-button
        >
      </div>
      <div v-else class="text-right mt-3">
        <el-button type="primary" @click="finalStep = !finalStep"
          >Quay lại</el-button
        >
        <el-button type="primary">Xác Nhận</el-button>
      </div>
    </div>
  </el-main>
</template>

<script>
import { CheckboxCardItem } from '~/components/uncommon/Member'
import { CalendarAndMemberOfGroup } from '~/components/uncommon/Member'

export default {
  components: {
    CheckboxCardItem,
    CalendarAndMemberOfGroup,
  },
  data() {
    return {
      checked: true,
      finalStep: false,
    }
  },
}
</script>
