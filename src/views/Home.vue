<template>
  <main class="h-screen w-full flex items-center justify-center">
    <div class="flex justify-center items-center h-full flex-col px-4 gap-2 sm:flex-row w-full">
      <input
        id="UserID"
        type="text"
        class="w-full max-w-[420px] p-2 px-4 rounded bg-black/40 placeholder:opacity-50 text-white"
        placeholder="Enter in-game name [for eg. Zetsu#444]"
        @keyup.enter="UserID"
      />
      <button type="submit" class="bg-slate-500/20 p-2 px-4 rounded" v-on:click="UserID">GO</button>
    </div>
  </main>
</template>

<script>
export default {
  setup() {
    const UserID = () => {
      let User = document.getElementById("UserID").value;
      let Name, Tag;
      [Name, Tag] = User.split("#");
      window.location.href = "/profile/" + Name + "/" + Tag;
    };

    return { UserID };
  },
};
</script>

<style></style>
