<template>
  <nav
    class="bg-white/5 flex items-center justify-between gap-2 flex-start w-full h-12 px-4 "
  >
    <div class="grid place-items-center">
      <router-link :to="{ name: 'Home' }"> ValRun </router-link>
    </div>
    <div>
      <a href="/" id="Menu" class="text-white/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </a>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style></style>
