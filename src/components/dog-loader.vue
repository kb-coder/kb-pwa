<template>
  <button
    class="p-2 mb-4 border-2 border-solid border-purple-700 text-purple-700 font-medium rounded-md shadow-md"
    @click.prevent="getRandomDog"
  >Get A Dog</button>
  <img :src="dogUrl" />
  <div
    v-if="error"
    color="text-red-600"
  >{{ error }}</div>
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
      error.value = ''
      try {
        const response = await fetchJson<DogApiResponse>('https://dog.ceo/api/breeds/image/random')
        if (response.status === 'success') {
          dogUrl.value = response.message
        }
      } catch (error) {
        error.value = error?.message ? error.message : 'Some error happened while trying to fetch Rover.'
        console.log(error)
      }
    }

    getRandomDog()

    return {
      dogUrl,
      error,
      getRandomDog
    }
  }
})
</script>
