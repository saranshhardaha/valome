<template>
  <div class="flex flex-col w-full h-max">
    <div
      class="relative flex flex-col justify-end z-10 text-white bg-opacity-50 w-full min-h-max"
    >
      <img
        class="absolute top-0 md:rounded-md h-full object-cover w-full z-0"
        :src="account.card.wide"
        alt=""
      />
      <div
        class="flex p-4 w-full z-10 bg-black/60 backdrop-blur-sm h-32 md:h-44"
      >
        <div
          class="font-bold flex flex-row gap-4 w-full justify-start items-center"
        >
          <img
            class="rounded-full h-10 ring-2 ring-white"
            :src="account.card.small"
            alt=""
          />
          <div class="flex flex-col items-start text-sm">
            <h2>
              {{ account.name }}
              <span class="text-sm px-1 bg-black bg-opacity-40 rounded">
                #{{ account.tag }}
              </span>
            </h2>
            <h2 class="text-xs bg-teal-400 px-2 bg-opacity-20 rounded">
              Lvl. {{ account.account_level }}
            </h2>
          </div>
        </div>
        <div class="flex justify-between"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    account: Object,
  },
};
</script>
