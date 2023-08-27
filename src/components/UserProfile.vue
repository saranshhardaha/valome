<template>
  <div class="w-96 bg-neutral-900 flex flex-col">
    
      <!-- Match History -->
      <div class="max-h-full" v-if="MMRHistory">
        <h2 class="px-6 mb-5">Last Matches</h2>
        <div
          class="px-6 py-4 hover:bg-opacity-20 hover:bg-black"
          v-for="MM in MMRHistory"
          :key="MM"
        >
          <router-link
            class="w-full flex justify-between items-center"
            :to="'/stats/' + MM.metadata.matchid"
          >
            <div class="text-left flex flex-col">
              <h2 class="font-bold">
                {{ MM.metadata.map }}
                <span
                  class="text-xs text-opacity-80 text-white bg-black rounded-full px-2 py-1 bg-opacity-10"
                >
                  {{ TimeConv(MM.metadata.game_start).split(", ")[1] }}
                </span>
              </h2>
              <p>{{ MM.metadata.mode }}</p>
            </div>
            <div>
              <h2 class="font-bold text-lg text-green-400">
                {{ MM.teams.blue.rounds_won }}:<span
                  class="text-red-400 font-normal text-base"
                  >{{ MM.teams.red.rounds_won }}</span
                >
              </h2>
              <!-- <p class="text-xs opacity-20">{{ MM.metadata.matchid }}</p> -->
            </div>
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
const ValorantAPI = require("unofficial-valorant-api");
import { ref } from "vue";
export default {
  name: "UserProfile",
  props: {
    userID: String,
  },
  setup() {
    const Account = ref(0);
    const MMR = ref(0);
    const MMRHistory = ref(0);

    let getAccount = async (name, tag) => {
      let Data = await ValorantAPI.getAccount(name, tag);
      Account.value = Data.data;
      console.log(Account.value);
      await getMMR();
      await getMMRHistory();
    };

    let getMMRHistory = async () => {
      let MMH = await ValorantAPI.getMatchesByPUUID(
        Account.value.region,
        Account.value.puuid,
        "10",
        "competitive"
      );
      MMRHistory.value = MMH.data;
      console.log(MMRHistory);
    };

    let getMMR = async () => {
      let MM = await ValorantAPI.getMMR(
        "v2",
        Account.value.region,
        Account.value.name,
        Account.value.tag
      );
      MMR.value = MM.data;
      // console.log(MMR.value);
    };

    let TimeConv = (Tm) => {
      var d = new Date(Tm * 1000);
      d = d.toLocaleString();
      return d;
    };
    getAccount("Zetsu", "444");
    return {
      Account,
      MMR,
      MMRHistory,
      TimeConv,
    };
  },
};
</script>

<style></style>
