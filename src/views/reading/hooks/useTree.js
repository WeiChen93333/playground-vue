import { ref, computed, onMounted, reactive, markRaw, watch,  getCurrentInstance } from 'vue'
import { useStore} from 'vuex'
const store = useStore()
export default function () {
  const contentSource = ref('')  
  const filterText = ref('')
  watch(filterText, newVal => {
    linkTree.value.filter(newVal)
  })
  const linkTree = ref(null)    
  const defaultProps = {
    children: 'children',
    label: 'label',
  }
  const treeData = [
    {
      id: 1,
      label: 'Vue2文档',
      children: [
        {
          id: 1-1,
          label: '组件',
          src: 'https://vuejs.org/v2/guide/components.html'
        },
      ]
    },
    {
      id: 2,
      label: 'Vue3文档',
      children: [
        {
          id: 4,
          label: '组合式api',
          src: 'https://vue3js.cn/vue-composition-api/'
        },
      ]
    }
  ]  
  const filterNode = (value, data) => {
    if (!value) return true
    return data.label.indexOf(value) !== -1
  }
  const treeClickCount = ref(0)
  const handleNodeClick = (nodeData) => {
    treeClickCount.value ++
    const timer = setTimeout(() => {
      if (treeClickCount.value === 1) { 
        treeClickCount.value = 0
        console.log('单击事件')
      } else if (treeClickCount.value === 2) {
        treeClickCount.value = 0
        iframeSrc.value = nodeData.src
        contentSource.value = 'link'
      }
    }, 300)
  }
  const iframeSrc = ref('')
  return {
    contentSource, 
    filterText, 
    linkTree, treeData, defaultProps,
    filterNode, handleNodeClick,
    iframeSrc
  }
}