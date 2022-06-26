<template>
  <main class="flex p-0 md:p-4 w-full min-h-screen">
    <div class="flex flex-col w-full" v-if="visible">
      <!-- Profile Information -->
      <div class="flex flex-col w-full">
        <div
          class="relative flex flex-col justify-end z-10 text-white bg-opacity-50 w-full"
        >
          <img
            class="relative md:rounded-md h-52 object-cover w-full z-0"
            :src="Account.card.wide"
            alt=""
          />
          <div
            class="absolute w-full md:rounded-md fade z-10 p-4 md:px-6 md:py-4"
          >
            <div
              class="font-bold flex flex-row gap-4 w-full justify-between md:justify-start items-center"
            >
              <img
                class="rounded-full h-20 ring-2 ring-white"
                :src="Account.card.small"
                alt=""
              />
              <div class="flex flex-col items-start">
                <h2>
                  {{ Account.name }}
                  <span
                    class="text-sm px-1 bg-black bg-opacity-40 ml-1 rounded"
                  >
                    #{{ Account.tag }}
                  </span>
                </h2>
                <p class="text-emerald-200 text-sm">
                  {{ Account.last_update }}
                </p>
              </div>
              <h2
                class="ring-1 ring-teal-300 ring-opacity-60 bg-teal-400 px-2 bg-opacity-20 rounded"
              >
                Lvl. {{ Account.account_level }}
              </h2>
            </div>
            <div class="flex justify-between"></div>
          </div>
        </div>
      </div>
      <div class="flex p-4 px-0 flex-col md:flex-row py-2 gap-2 md:gap-2">
        <!-- Side Other Info -->
        <div class="flex flex-col items-start w-full md:w-80 space-y-2.5" v-if="MMR">
          <div class="rounded bg-slate-700/50 p-4 flex flex-col gap-4 w-full">
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
                <div class="flex gap-2">
                  <h2>Last Match Rating:</h2>
                  <p>
                    <span class="font-bold">{{
                      MMR.current_data.mmr_change_to_last_game
                    }}</span>
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
          <div class="bg-slate-700/50 p-2 hidden rounded md:flex flex-col w-full">
            <div v-for="(season, key) in MMR.by_season" :key="key">
              <div
                v-if="season.number_of_games > 0"
                class="flex justify-between mb-1.5 rounded bg-white/5 p-2"
              >
                <div class="flex flex-col">
                  <p class="font-bold text-red-300 text-left">
                    {{ key.toUpperCase() }}
                  </p>
                  <div class="flex flex-col space-1 justify-between">
                    <div class="flex gap-0.5">
                      <h2>Total Games:</h2>
                      <p>{{ season.number_of_games }}</p>
                    </div>
                    <div class="flex gap-0.5">
                      <h2>Wins:</h2>
                      <p class="font-bold text-green-400">{{ season.wins }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-center">
                  <img
                    :src="TierIcon(season.final_rank)"
                    class="h-10 w-10"
                    alt=""
                  />
                  <p class="font-bold">{{ season.final_rank_patched }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Right Section [Matches] -->
        <div class="py-0 w-full flex flex-col gap-2">
          <!-- Select Type of Matches -->
          <div class="flex gap-2 flex-wrap md:gap-4 text-xs md:text-base">
            <a
              href="#"
              class="text-white block p-2 ring-1 ring-cyan-100/10 bg-cyan-200/5 hover:ring-emerald-200/20 hover:bg-cyan-200/10 rounded text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
              >Competitive</a
            >
            <a
              href="#"
              class="text-white block p-2 ring-1 ring-cyan-100/10 bg-cyan-200/5 hover:ring-emerald-200/20 hover:bg-cyan-200/10 rounded text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-1"
              >Unranked</a
            >
            <a
              href="#"
              class="text-white block p-2 ring-1 ring-cyan-100/10 bg-cyan-200/5 hover:ring-emerald-200/20 hover:bg-cyan-200/10 rounded text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
              >Spike Rush</a
            >
            <a
              href="#"
              class="text-white block p-2 ring-1 ring-cyan-100/10 bg-cyan-200/5 hover:ring-emerald-200/20 hover:bg-cyan-200/10 rounded text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
              >Deathmatch</a
            >
          </div>

          <div class="flex flex-col w-full items-start" v-if="MMRHistory">
            <h2 class="text-lg py-2 font-bold">Last Matches</h2>
            <div class="w-full flex flex-col gap-2">
              <div
                class="w-full relative h-24 md:h-32 rounded"
                v-for="(MM, idx) in MMRHistory"
                :key="idx"
              >
                <router-link
                  class="w-full rounded-md absolute z-10 hover:bg-opacity-60 bg-opacity-10 bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-800/60 h-24 md:h-32 flex px-4 md:px-8 justify-between items-center"
                  :to="'/stats/' + MM.metadata.matchid"
                >
                  <div class="flex gap-2 md:gap-8">
                    <img
                      :src="Plyr[idx].assets.agent.small"
                      class="rounded hidden md:block h-12 w-12 md:h-16 md:w-16"
                      alt=""
                    />
                    <div class="text-left flex flex-col gap-2">
                      <h2 class="font-bold">
                        {{ MM.metadata.map }}
                        <span
                          class="text-xs text-opacity-80 text-white bg-black rounded-full px-2 py-1 bg-opacity-10"
                        >
                          {{ TimeConv(MM.metadata.game_start).split(", ")[1] }}
                        </span>
                      </h2>
                      <div class="flex gap-2 items-center">
                        <img
                          :src="ModeIcon(MM.metadata.mode)"
                          class="h-5 w-5"
                          alt=""
                        />
                        <p>{{ MM.metadata.mode }}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 class="font-bold text-xl text-green-400">
                      {{ MM.teams.blue.rounds_won }}:<span
                        class="text-red-400 font-normal text-xl"
                        >{{ MM.teams.red.rounds_won }}</span
                      >
                    </h2>
                    <!-- <p class="text-xs opacity-20">{{ MM.metadata.matchid }}</p> -->
                  </div>
                  <!-- Stats -->
                  <div class="flex gap-2">
                    <div class="text-right">
                      <h2 class="text-sm">K/D/A</h2>
                      <p class="text-lg font-bold">
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
                      <h2>ADR</h2>
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
                  class="absolute rounded-md z-0 h-24 md:h-32 w-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading</div>
    <!-- <Profile /> -->
  </main>
</template>

<script>
// import Profile from "../components/Profile.vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";

export default {
  components: {
    // Profile,
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
        e.players.all_players.forEach((ele) => {
          if (ele.puuid === puuid) {
            Plyr.value.push({
              assets: ele.assets,
              Character: ele.character,
              stats: ele.stats,
              currenttier: ele.currenttier,
              damage: ele.damage_made,
              rounds_played: rounds_played,
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
      let Data = await ValorantAPI.getAccount(name, tag);
      Account.value = Data.data;
      puuid = Data.data.puuid;
      sessionStorage.setItem("puuid", Data.data.puuid);
      await getMMR();
      await getMMRHistory();
      if (MMR.value && MMRHistory.value) visible.value = true;
      console.log(MMR.value, MMRHistory.value, visible.value);
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
      d = d.toLocaleString();
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
