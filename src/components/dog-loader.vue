<template>
  <img :src="dogUrl" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import fetchJson from '@/api/fetch-wrapper'
import { DogApiResponse } from '@/types/DogApi'

export default defineComponent({
  name: 'DogLoader',
  setup () {
    const dogUrl = ref('')
    const error = ref('')

    const getRandomDog = async () => {
      try {
        const response = await fetchJson<DogApiResponse>('https://dog.ceo/api/breeds/image/random')
        if (response.status === 'success') {
          dogUrl.value = response.message
        }
      } catch (error) {
        console.log(error)
      }
    }

    getRandomDog()

    return {
      dogUrl,
      error
    }
  }
})
</script>
