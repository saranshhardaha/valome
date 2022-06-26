<template>
  <div
    class="w-full px-2 sm:px-4 overflow-y-scroll h-full flex flex-col bg-gray-900"
  >
    <!-- NavBar -->
    <div class="my-2 rounded bg-gray-600 bg-opacity-20 p-4 text-left">
      <h2 class="text-xl font-bold underline">Match Report</h2>

      <p class="text-xs text-green-400 flex items-center gap-1">
        <span class="font-bold text-xl">·</span>
        {{ MD.metadata.cluster }}
      </p>
      <div
        class="flex flex-col sm:flex-row items-center text-left gap-2 sm:gap-x-12 rounded p-2 sm:px-8 sm:py-4"
      >
        <div class="flex justify-between w-full">
          <!-- Name/Mode -->
          <div>
            <h2 class="text-2xl font-semimedium">{{ MD.metadata.map }}</h2>
            <p class="text-sm">{{ MD.metadata.mode }}</p>
          </div>
          <!-- Team Scores -->
          <div class="text-lg font-bold flex">
            <div class="flex flex-col items-center text-blue-400 px-1">
              <h2>{{ MD.teams.blue.rounds_won }}</h2>
              <p class="text-base">Team A</p>
            </div>
            :
            <div class="flex flex-col items-center text-red-400 px-1">
              <h2>{{ MD.teams.red.rounds_won }}</h2>
              <p class="text-base">Team B</p>
            </div>
          </div>
        </div>
        <!-- Match Length -->
        <div
          class="flex flex-row sm:flex-col items-center w-full sm:w-auto sm:items-start min-w-max gap-2 justify-between"
        >
          <p class="text-xl font-bold">{{ mm2m(MD.metadata.game_length) }}</p>
          <p class="text-sm text-opacity-50">
            {{ TimeConv(MD.metadata.game_start) }}
          </p>
        </div>
      </div>
    </div>
    <!-- Rounds -->
    <div class="p-2 flex flex-col items-center justify-center gap-1">
      <div class="flex gap-2 flex-wrap">
        <div
          class="flex flex-col items-center px-1"
          v-for="(RND, idx) in MD.rounds"
          :key="idx"
        >
          <div v-if="RND.winning_team === 'Red'">
            <h2 class="text-red-400 font-bold">
              {{ RND.end_type.slice(0, 1) }}
            </h2>
          </div>
          <div v-else>
            <h2 class="text-blue-400 font-bold">
              {{ RND.end_type.slice(0, 1) }}
            </h2>
          </div>
          <p>{{ idx + 1 }}</p>
        </div>
      </div>
      <p class="text-sm text-gray-100 text-opacity-60">Rounds</p>
    </div>
    <!-- Players -->
    <div class="my-2 flex flex-col gap-4">
      <!-- Team A -->
      <div
        class="bg-gray-800 bg-opacity-60 rounded"
        v-for="(Team, idx) in MD.players"
        :key="idx"
      >
        <table
          class="table-auto w-full border-collapse border border-slate-800 rounded"
          v-if="Team.length === 5"
        >
          <tr class="bg-blue-300 bg-opacity-25">
            <th class="p-1px pl-1 cursor-default text-left text-blue-300">
              Team {{ idx.toUpperCase() }}
            </th>
            <th class="cursor-default"><abbr title="Rank Tier">Rank</abbr></th>
            <th class="cursor-default"><abbr title="Kills">K</abbr></th>
            <th class="cursor-default"><abbr title="Deaths">D</abbr></th>
            <th class="cursor-default"><abbr title="Assists">A</abbr></th>
            <th class="cursor-default hidden sm:table-cell">
              <abbr title="Kills/Deaths">K/D</abbr>
            </th>
            <th class="cursor-default">
              <abbr title="Average Damage per round">ADR</abbr>
            </th>
            <th class="cursor-default">
              <abbr title="Headshots Percentage">HS%</abbr>
            </th>
          </tr>
          <tr
            class="w-full p-2 hover:bg-opacity-5 transition-all duration-300 cursor-default border-b border-slate-800 hover:bg-gray-500"
            v-for="Player in Team"
            :key="Player"
          >
            <td
              class="flex max-w-[96px] sm:min-w-[180px] sm:max-w-[180px] text-left p-2 items-start flex-col sm:flex-row gap-1 sm:gap-4"
            >
              <img
                class="border-2 border-opacity-30 border-blue-400 p-px rounded-lg bg-white bg-opacity-10 h-10"
                :src="Player.assets.agent.small"
              />
              <h2 class="w-full text-sm sm:text-base truncate">
                {{ Player.name }}
                <span
                  class="hidden sm:block max-w-min text-xs opacity-80 px-1 rounded bg-white bg-opacity-10"
                  >#{{ Player.tag }}</span
                >
              </h2>
            </td>
            <td>
              <abbr
                class="flex justify-center items-center w-full"
                :title="Player.currenttier_patched"
              >
                <img
                  :src="TierIcon(Player.currenttier)"
                  class="h-8 w-8"
                  alt=""
                />
              </abbr>
            </td>
            <td>{{ Player.stats.kills }}</td>
            <td>{{ Player.stats.deaths }}</td>
            <td>{{ Player.stats.assists }}</td>
            <td class="hidden sm:table-cell">
              {{ kd(Player.stats.kills, Player.stats.deaths) }}
            </td>
            <td>{{ (Player.damage_made / MD.rounds.length).toFixed(1) }}</td>
            <td>
              {{
                Math.round(
                  (Player.stats.headshots /
                    (Player.stats.bodyshots +
                      Player.stats.headshots +
                      Player.stats.legshots)) *
                    100
                ).toFixed(0) + "%"
              }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- Player Rounds Detail -->
    <div class="flex flex-col bg-slate-800 rounded">
      <div class="font-bold p-2 rounded-t text-left">
        <h2 class="py-4">All Players Round Stats</h2>
        <div class="flex flex-col gap-2">
          <details
            class="w-full open:py-2 px-2 open:bg-slate-900 open:ring-1 open:ring-blue/10 rounded"
            v-for="Plyr in MD.players.all_players"
            :key="Plyr"
          >
            <summary class="w-full text-sm leading-6 font-semibold select-none">
              {{ Plyr.name }}
            </summary>
            <div class="flex flex-col py-2">
              <!-- Overall Stats -->
              <div class="p-2">
                <!-- Logo Name Tag Profile -->
                <div class="flex justify-between items-center py-2">
                  <div class="flex gap-2">
                    <img
                      class="p-px rounded-lg bg-white bg-opacity-10 h-14"
                      :src="Plyr.assets.agent.small"
                      :alt="Plyr.character"
                    />
                    <div>
                      <h2 class="text-xl flex items-center gap-1">
                        {{ Plyr.name }}
                        <span
                          class="text-xs opacity-80 p-1 rounded bg-white bg-opacity-10"
                          >#{{ Plyr.tag }}</span
                        >
                      </h2>
                      <p class="opacity-60 text-sm">Lvl. {{ Plyr.level }}</p>
                    </div>
                  </div>
                  <router-link
                  :to="{ name: 'Overview', params: { Name: Plyr.name,Tag:Plyr.tag }}"
                    class="text-sm bg-blue-500 bg-opacity-10 hover:bg-opacity-20 rounded p-2"
                  >
                    View Profile
                  </router-link>
                </div>
                <!-- Avg Score K/D/A | Medal earned Danage /round -->
                <div>
                  <div class="flex flex-col sm:flex-row gap-2 sm:gap-12 items-center py-2">
                    <div class="flex gap-2 sm:gap-6 justify-between sm:justify-start w-full">
                      <div>
                        <h2>Avg. Score</h2>
                        <p>
                          {{ (Plyr.stats.score / MD.rounds.length).toFixed(1) }}
                        </p>
                      </div>
                      <div>
                        <h2>K/D/A</h2>
                        <p>
                          {{ Plyr.stats.kills }}/{{ Plyr.stats.deaths }}/{{
                            Plyr.stats.assists
                          }}
                        </p>
                      </div>
                      <div>
                        <h2>Total Damage</h2>
                        <p>
                          {{ Plyr.damage_made }}
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-start gap-4 w-full">
                      <div class="flex flex-col items-center gap-1">
                        <div class="bg-red-500 rounded-full p-1">
                          <img
                            src="../assets/skull.png"
                            alt=""
                            class="h-7 w-7 max-w-none filter invert"
                          />
                        </div>
                        <abbr title="Kills Rounds Ratio">{{
                          (Plyr.stats.kills / MD.rounds.length).toFixed(1)
                        }}</abbr>
                      </div>
                      <div class="flex flex-col items-center gap-1">
                        <div class="bg-emerald-500 rounded-full p-1">
                          <img
                            src="../assets/skull.png"
                            alt=""
                            class="h-7 w-7 filter invert"
                          />
                        </div>
                        <abbr title="Damage per Round">{{
                          (Plyr.damage_made / MD.rounds.length).toFixed(1)
                        }}</abbr>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <!-- Rounds -->
              <div class="py-2 cursor-default">
                <div class="flex flex-wrap gap-y-8 items-end justify-center pb-6">
                  <div
                    class="flex flex-col items-center relative"
                    v-for="(Pl, idx) in FilterStats(Plyr.puuid)"
                    :key="Pl"
                  >
                    <div>
                      <div
                        v-if="Pl.kills > 0"
                        class="border-b-4 border-emerald-400 opacity-60 hover:opacity-100 mb-4 bg-gradient-to-t from-emerald-500 to-transparent w-7 p-1 py-2 gap-1 flex flex-col items-center justify-end"
                      >
                        <img
                          src="../assets/skull.png"
                          class="h-4 w-4 filter invert"
                          alt=""
                          v-for="K in Pl.kills"
                          :key="K"
                        />
                      </div>
                      <div
                        v-if="Pl.kills === 0"
                        class="border-t-4 border-red-400 opacity-60 hover:opacity-100 -mb-4 bg-gradient-to-b from-red-500 to-transparent w-7 p-1 py-2 flex flex-col items-center justify-start"
                      >
                        <img
                          src="../assets/skull.png"
                          class="h-4 w-4 filter invert"
                          alt=""
                        />
                      </div>
                    </div>
                    <p class="mt-7 -mb-4">{{ idx + 1 }}</p>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ValorantAPI = require("unofficial-valorant-api");
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";

export default {
  name: "Stats",
  setup() {
    const route = useRoute();
    const MD = ref(0);
    let MatchID = route.params.MatchID;

    let kd = (K, D) => {
      return (K / D).toFixed(1);
    };
    let TimeConv = (Tm) => {
      var d = new Date(Tm * 1000);
      d = d.toLocaleString();
      return d;
    };
    let mm2m = (mm) => {
      let m = mm / 60000;
      m = m.toFixed(2);
      let Tm =
        m.split(".")[0] + "m " + (m.split(".")[1] * 0.6).toFixed(0) + "s";
      return Tm;
    };
    let FilterStats = (PUID) => {
      let PlyrData = [];
      let Res = MD.value.rounds;
      Res.forEach((ele) => {
        ele.player_stats.forEach((e) => {
          if (e.player_puuid === PUID) {
            PlyrData.push(e);
          }
        });
      });
      console.log(PlyrData);
      return PlyrData;
    };
    let Tiers = [];
    async function FTiers() {
      let response = await fetch(
        "https://valorant-api.com/v1/competitivetiers"
      );
      let Res = await response.json();
      Res = Res.data[3].tiers;
      console.log(Res);
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

    let getMatch = async (MID) => {
      let Data = await ValorantAPI.getMatch(MID);
      MD.value = Data.data;
    };
    getMatch(MatchID);

    onBeforeRouteUpdate(async (to, from) => {
      console.log("first");
      if (to.params.MatchID !== from.params.MatchID) {
        getMatch(to.params.MatchID);
      }
    });
    return {
      MD,
      mm2m,
      TimeConv,
      kd,
      FilterStats,
      TierIcon,
    };
  },
};
</script>

<style></style>
