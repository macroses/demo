<script setup>
import { readonly, ref } from 'vue'
import ProgramsList from '@/components/ProgramsList/ProgramsList.vue'
import CustomProgram from '@/components/CustomProgram/CustomProgram.vue'
import ProgramItemModal from '@/components/ProgramItemModal/ProgramItemModal.vue'

const activeTabId = ref(0)
const activeProgram = ref(null)

const getActiveTab = id => activeTabId.value = id

const tabs = readonly([
  { id: 0, tabTitle: 'All programs', icon: 'lottie/folder.json', size: 18 },
  { id: 1, tabTitle: 'Custom program', icon: 'lottie/edit.json', size: 24 }
])

const getProgramId = program => {
  activeProgram.value = program
}

const closeModal = () => activeProgram.value = null
</script>

<template>
  <div class="container">
    <Tabs
      :tabs="tabs"
      @activeTab="getActiveTab"
    />
    <ProgramsList
      v-if="activeTabId === 1"
      @get-program-id="getProgramId"
    />
    <CustomProgram v-if="activeTabId === 0"/>
    <Modal
      v-if="activeProgram"
      width="700px"
      @close="closeModal"
      @confirm=""
    >
      <template #modal-header>
        {{ activeProgram.title }}
      </template>
      <template #modal-body>
        <ProgramItemModal :program="activeProgram"/>
      </template>
    </Modal>
  </div>
</template>