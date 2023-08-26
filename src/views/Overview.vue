<template>
  <main class="flex p-2 md:p-4 w-full min-h-screen">
    <div class="flex flex-col gap-4 w-full" v-if="visible">
      <!-- Profile Information -->
      <AccountBanner :account="Account" />
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Side Other Info -->
        <div class="flex flex-col items-start w-full md:w-80 gap-2" v-if="MMR">
          <div class="rounded bg-white/10 p-4 flex flex-col gap-4 w-full">
            <div class="flex justify-between items-center">
              <div class="text-left">
                <h2 class="font-bold mb-2">Current Tier</h2>
                <span class="flex flex-col gap-2 text-sm"
                  ><progress
                    class="accent-emerald-400 w-32"
                    max="100"
                    :value="MMR.current_data.ranking_in_tier"
                  ></progress
                  >{{ MMR.current_data.ranking_in_tier }}/100</span
                >
                <div class="mt-2 flex gap-2 items-center justify-between">
                  <h2 class="text-sm">Last Match:</h2>
                  <p class="text-sm">
                    <span
                      v-if="MMR.current_data.mmr_change_to_last_game < 0"
                      class="text-red-300"
                    >
                      {{ MMR.current_data.mmr_change_to_last_game }}RR
                    </span>
                    <span v-else
                      >{{ MMR.current_data.mmr_change_to_last_game }}RR
                    </span>
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-center gap-1">
                <img
                  :src="TierIcon(MMR.current_data.currenttier)"
                  class="h-12 w-12"
                  alt=""
                />
                <p class="text-sm font-bold">
                  {{ MMR.current_data.currenttierpatched }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="hidden rounded md:flex flex-col gap-2 overflow-y-scroll w-full max-h-[32rem]"
          >
            <div v-for="(season, key) in MMR.by_season" :key="key">
              <div
                v-if="season.number_of_games > 0"
                class="flex justify-between rounded p-4 bg-white/5"
              >
                <div class="flex flex-col">
                  <p class="font-bold text-red-300 text-left">
                    {{ key.toUpperCase() }}
                  </p>
                  <div class="flex flex-col space-1 justify-between text-sm">
                    <div class="flex gap-0.5">
                      <h2>Matches:</h2>
                      <p>{{ season.number_of_games }}</p>
                    </div>
                    <div class="flex gap-0.5">
                      <h2>Wins:</h2>
                      <p class="font-bold text-green-400">{{ season.wins }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-center justify-center">
                  <img
                    :src="TierIcon(season.final_rank)"
                    class="h-10 w-10"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Right Section [Matches] -->
        <div class="w-full flex flex-col gap-2">
          <!-- Select Type of Matches -->
          <div class="flex flex-col w-full items-start" v-if="MMRHistory">
            <h2 class="text-lg pb-2 font-bold">Last Matches</h2>
            <div class="w-full flex flex-col gap-2">
              <div
                class="w-full relative h-24 rounded"
                v-for="(MM, idx) in MMRHistory"
                :key="idx"
              >
                <router-link
                  :class="
                    `grid grid-cols-3 place-content-center w-full rounded-md absolute z-10 hover:bg-opacity-60 bg-opacity-10 h-24 px-4 bg-black/50 backdrop-blur-sm hover:bg-black/30 transition-all border ${(
                      Plyr[idx].isWon
                        ? 'border-green-700/50'
                        : 'border-red-700/50'
                    )}` 
                  "
                  :to="'/stats/' + MM.metadata.matchid"
                >
                  <div class="flex items-center gap-4 h-full text-sm sm:text-base">
                    <img
                      :src="Plyr[idx].assets.agent.small"
                      class="rounded hidden md:block h-14 w-14"
                      alt=""
                    />
                    <div class="text-left flex flex-col sm:gap-2">
                      <h2 class="flex flex-col sm:flex-row font-bold">
                        {{ MM.metadata.map }}
                        <span
                          class="text-xs text-opacity-80 text-white bg-black rounded-full ms:px-2 py-1 bg-opacity-10"
                        >
                          {{ TimeConv(MM.metadata.game_start) }}
                        </span>
                      </h2>
                      <div class="flex gap-2 items-center">
                        <img
                          :src="ModeIcon(MM.metadata.mode)"
                          class="hidden sm:block h-5 w-5"
                          alt=""
                        />
                        <p>{{ MM.metadata.mode }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-center">
                    <h2 class="grid grid-cols-3 font-bold text-base sm:text-xl">
                      <span class="text-green-400">{{
                        MM.teams.blue.rounds_won
                      }}</span>
                      <span>:</span>
                      <span class="text-red-400"
                        >{{ MM.teams.red.rounds_won }}
                      </span>
                    </h2>
                    <!-- <p class="text-xs opacity-20">{{ MM.metadata.matchid }}</p> -->
                  </div>
                  <!-- Stats -->
                  <div class="flex items-center justify-end gap-2">
                    <div class="text-right">
                      <h2 class="text-xs sm:text-sm">K/D/A</h2>
                      <p class="text-base ms:text-lg font-bold">
                        {{ Plyr[idx].stats.kills }}/{{
                          Plyr[idx].stats.deaths
                        }}/{{ Plyr[idx].stats.assists }}
                      </p>
                    </div>
                    <div class="text-right hidden md:block">
                      <h2>K/D</h2>
                      <p class="font-bold">
                        {{
                          (
                            Plyr[idx].stats.kills / Plyr[idx].stats.deaths
                          ).toFixed(1)
                        }}
                      </p>
                    </div>
                    <div>
                      <h2 class="text-xs sm:text-sm">ADR</h2>
                      <p class="font-bold">
                        {{
                          (Plyr[idx].damage / Plyr[idx].rounds_played).toFixed(
                            0
                          )
                        }}
                      </p>
                    </div>
                  </div>
                </router-link>
                <img
                  :src="MapIcon(MM.metadata.map)"
                  class="rounded-md z-0 h-24 w-full opacity-50 object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="grid place-items-center h-full w-full">
      <div>
        <p>Loading</p>
      </div>
    </div>
    <!-- <Profile /> -->
  </main>
</template>

<script>
// import Profile from "../components/Profile.vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";
import AccountBanner from "../components/AccountBanner.vue";

export default {
  components: {
    AccountBanner,
  },
  setup() {
    const ValorantAPI = require("unofficial-valorant-api");
    let visible = ref(false);
    let Maps = [];
    async function FMaps() {
      let response = await fetch("https://valorant-api.com/v1/maps");
      let Res = await response.json();
      Res.data.forEach((e) => {
        Maps.push({ Name: e.displayName, uuid: e.uuid, Icon: e.listViewIcon });
      });
    }
    FMaps();

    let MapIcon = (map) => {
      let Icon = "";
      Maps.forEach((e) => {
        if (e.Name === map) {
          Icon = e.Icon;
        }
      });
      return Icon;
    };

    let Tiers = [];
    async function FTiers() {
      let response = await fetch(
        "https://valorant-api.com/v1/competitivetiers"
      );
      let Res = await response.json();
      Res = Res.data[3].tiers;
      Res.forEach((e) => {
        Tiers.push({ Name: e.tierName, tier: e.tier, Icon: e.smallIcon });
      });
    }
    FTiers();

    let TierIcon = (tier) => {
      let Icon = "";
      Tiers.forEach((e) => {
        if (e.tier === tier) {
          Icon = e.Icon;
        }
      });
      return Icon;
    };

    let Modes = [];
    async function FModes() {
      let response = await fetch("https://valorant-api.com/v1/gamemodes");
      let Res = await response.json();
      Res.data.forEach((e) => {
        Modes.push({ Name: e.displayName, uuid: e.uuid, Icon: e.displayIcon });
      });
    }
    FModes();

    let ModeIcon = (mode) => {
      let Icon = "";

      if (mode === "Competitive") {
        Icon = Modes[0].Icon;
      } else {
        Modes.forEach((e) => {
          if (e.Name === mode) {
            Icon = e.Icon;
          }
        });
      }
      return Icon;
    };
    const Plyr = ref([]);
    let PlyrMD = (puuid) => {
      MMRHistory.value.forEach((e) => {
        let rounds_played = e.metadata.rounds_played;
        let isRedWon = e.teams.red.has_won;
        let isWon = false;
        e.players.all_players.forEach((ele) => {
          if (ele.puuid === puuid) {
            if (ele.team == "Red" && isRedWon) isWon = true;
            Plyr.value.push({
              assets: ele.assets,
              Character: ele.character,
              stats: ele.stats,
              currenttier: ele.currenttier,
              damage: ele.damage_made,
              rounds_played: rounds_played,
              isWon: isWon,
            });
          }
        });
      });
      return Plyr;
    };

    const route = useRoute();
    let Name = route.params.Name;
    let Tag = route.params.Tag;

    onBeforeRouteUpdate(async (to, from) => {
      if (to.params.Name !== from.params.Name) {
        Name = to.params.Name;
        Tag = to.params.Tag;
      }
    });

    const Account = ref(0);
    const MMR = ref(0);
    const MMRHistory = ref(0);
    let puuid = sessionStorage.getItem("puuid") || "";

    let getAccount = async (name, tag) => {
      console.log(name, tag);
      let Data = await ValorantAPI.getAccount(name, tag);
      Account.value = Data.data;
      puuid = Data.data.puuid;
      sessionStorage.setItem("puuid", Data.data.puuid);
      await getMMR();
      await getMMRHistory();
      if (MMR.value && MMRHistory.value) visible.value = true;
    };

    let getMMRHistory = async () => {
      let MMH = await ValorantAPI.getMatchesByPUUID(
        Account.value.region,
        Account.value.puuid,
        "20",
        "competitive"
      );
      MMRHistory.value = MMH.data;
      PlyrMD(puuid);
    };

    let getMMR = async () => {
      let MM = await ValorantAPI.getMMR(
        "v2",
        Account.value.region,
        Account.value.name,
        Account.value.tag
      );
      MMR.value = MM.data;
    };

    let TimeConv = (Tm) => {
      var d = new Date(Tm * 1000);
      d = d.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      });
      return d;
    };

    getAccount(Name, Tag);
    return {
      Account,
      MMR,
      MMRHistory,
      TimeConv,
      Name,
      Tag,
      MapIcon,
      ModeIcon,
      TierIcon,
      Plyr,
      visible,
    };
  },
};
</script>

<style></style>
