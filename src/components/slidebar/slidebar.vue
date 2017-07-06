<template>
  <mobile-tear-sheet>
    <mu-list>
      <mu-sub-header>标签</mu-sub-header>
      <mu-list-item v-for="tag in tags" v-bind:title="tag" :key="tag.id" :to="{name: 'result', query: {tag: tag}}">
      </mu-list-item>
    </mu-list>
    <mu-divider />
    <mu-list>
      <mu-sub-header>时间</mu-sub-header>
      <mu-list-item v-for="t in time" :title="t.toString()" :key="t.id" :to="{name: 'result', query: {year: t.toString()}}">
      </mu-list-item>
    </mu-list>
  </mobile-tear-sheet>
</template>
<script>
  import mobileTearSheet from './mobileTearSheet.vue'
  import api from '../../services/api'
  export default {
    data: function () {
      return {
        tags: '',
        time: ''
      }
    },
    components: {
      'mobile-tear-sheet': mobileTearSheet
    },
    mounted: function () {
      this.$http.get(api.tag).then((response) => {
        this.tags = response.data.tags
      })
      this.$http.get(api.time).then((response) => {
        this.time = response.data.time
      })
    }
  }
</script>
