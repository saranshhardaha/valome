<template>
  <main class="h-screen w-full flex items-center justify-center">
    <div
      class="flex justify-center items-center h-full flex-col px-4 gap-2 sm:flex-row w-full"
    >
      <input
        id="userID"
        type="text"
        class="w-full max-w-[420px] p-2 px-4 rounded bg-white/5 placeholder:opacity-50 text-white"
        placeholder="Enter in-game name [for eg. ZetsuuuYT#444]"
        @keyup.enter="RedirectToProfile"
      />
      <button
        type="submit"
        class="bg-white/10 p-2 px-4 rounded"
        v-on:click="RedirectToProfile"
      >
        GO
      </button>
    </div>
  </main>
</template>

<script>
export default {
  setup() {
    const RedirectToProfile = () => {
      let user = document.getElementById("userID").value;
      if (!user || /^\s*$/.test(user)) return;
      let Name, Tag;
      [Name, Tag] = user.split("#");
      window.location.href = "/profile/" + Name + "/" + Tag;
    };

    return { RedirectToProfile };
  },
};
</script>

<style></style>
