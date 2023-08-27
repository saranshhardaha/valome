<template>
  <div
    class="w-full px-2 sm:px-4 overflow-y-scroll h-full flex flex-col bg-black"
  >
    <!-- NavBar -->
    <div class="my-2 rounded bg-white/5 bg-opacity-20 p-4 text-left">
      <h2 class="text-xl font-bold underline">Match Report</h2>

      <p class="text-xs text-green-400 flex items-center gap-1">
        <span class="font-bold text-xl">·</span>
        {{ MD?.metadata?.cluster }}
      </p>
      <div
        class="flex flex-col sm:flex-row items-center text-left gap-2 sm:gap-x-12 rounded p-2 sm:px-8 sm:py-4"
      >
        <div class="flex justify-between w-full">
          <!-- Name/Mode -->
          <div>
            <h2 class="text-2xl font-semimedium">{{ MD.metadata?.map }}</h2>
            <p class="text-sm">{{ MD.metadata?.mode }}</p>
          </div>
          <!-- Team Scores -->
          <div class="text-lg font-bold flex">
            <div class="flex flex-col items-center text-blue-400 px-1">
              <h2>{{ MD.teams?.blue?.rounds_won }}</h2>
              <p class="text-base">Team A</p>
            </div>
            :
            <div class="flex flex-col items-center text-red-400 px-1">
              <h2>{{ MD.teams?.red?.rounds_won }}</h2>
              <p class="text-base">Team B</p>
            </div>
          </div>
        </div>
        <!-- Match Length -->
        <div
          class="flex flex-row sm:flex-col items-center w-full sm:w-auto sm:items-start min-w-max gap-2 justify-between"
        >
          <p class="text-xl font-bold">{{ mm2m(MD.metadata?.game_length) }}</p>
          <p class="text-sm text-opacity-50">
            {{ TimeConv(MD.metadata?.game_start) }}
          </p>
        </div>
      </div>
    </div>
    <!-- Rounds -->
    <div class="p-2 flex flex-col items-center justify-center gap-1">
      <div
        class="flex items-start justify-start gap-2 w-full overflow-x-scroll"
      >
        <div
          class="flex flex-col items-center px-1"
          v-for="(RND, idx) in MD.rounds"
          :key="idx"
        >
          <div class="cursor-default pointer-events-none" :title="RND.end_type">
            <h2 class="text-red-400 font-bold">
              <span v-if="RND.end_type === 'Bomb defused'"
                ><img
                  class="invert h-6"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABbUlEQVRoge2WP07DMBSHPxBSxMDWBakXQTCQjQW2zkicoCMSQztygF6AiYNQiRv0BHCEQjrBYiOTP02cPGMrvE+ylDr18/vpq/QKiqIoA1gBX8DM2ZuZvVWUjnpwCnzQHKQAptKXHkoXBB6A4z3vM+A+wL2iuDaajASxIm2kzYYlaStlG/uMiFuRNNLVhiVJK3U22oyIWpEy4mvDkpSVJhtdjIhZkTByQT8blgw4G9pEiIEYhdEEOQpc/wo4N88nIS8KHeQucP0fRvPT0iCpcSBQY8rvOfBE+1z5BG6dz6/Am0Avomyon+Du2kTrriNL2kPY9Ripx1Z8QiQbphxiCzwDO2dvZ/a2pe8uI/Rby4JqiEvzbgLkZk3MXk41zOIP+63lhmqIvMO5ujDXgXrsxBr/EJZymBfx7jwonEbmPc7PnfPFkEaGTvbMee4z0N4bankzmr8oGiQ1NEhqaJDU0CCpoUFSYzRBFEX5J3wDczOMznLhUksAAAAASUVORK5CYII="
              /></span>
              <span v-if="RND.end_type === 'Eliminated'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <span v-if="RND.end_type === 'Round timer expired'">
                <img
                  class="h-6 invert"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAw0lEQVRIie2VTQ6CMBCFP01MVNY2XoYLcCR1qRfR8+hCYthwEXGBC8dQyZQqw8rwEjKlj3yvPxRgVESTQH89FG/aEzSYarpnE/OjM3hInSveQmplCSilpoqXtp7ppS3NMoSujSVgCVw64GeapeqtFXBV4AWwtsJDIV/DLecgdEh/lgNyXiPPW21nhfub/Ab6geZN3gmo5HO0TvrMr2khkEzxMvFuloBKIAkwA07AUdqJeHdLgP8xO3j3e8VX9f//g1E8AQJcRODxGex8AAAAAElFTkSuQmCC"
                />
              </span>
            </h2>

            <p v-if="RND.winning_team === 'Red'">
              <span class="text-red-400">{{ idx + 1 }}</span>
            </p>
            <p v-if="RND.winning_team === 'Blue'">
              <span class="text-blue-400">{{ idx + 1 }}</span>
            </p>
          </div>
        </div>
      </div>
      <p class="text-sm text-gray-100 text-opacity-60">Rounds</p>
    </div>
    <!-- Players -->
    <div class="my-2 flex flex-col gap-4">
      <!-- Team A -->
      <div
        class="bg-white/5 bg-opacity-60 rounded"
        v-for="(Team, idx) in MD.players"
        :key="idx"
      >
        <div
          class="flex justify-between flex-col w-full border-collapse border border-white/10 rounded"
          v-if="Team.length === 5"
        >
          <div
            class="grid grid-cols-7 w-full gap-2 bg-white/5 bg-opacity-25 p-2"
          >
            <div
              :class="`pl-1 cursor-default text-left col-span-2 ${
                idx.toUpperCase() == 'BLUE' ? ' text-blue-300' : ' text-red-300'
              }`"
            >
              Team {{ idx.toUpperCase() }}
            </div>
            <div
              class="col-span-5 grid grid-cols-5 sm:grid-cols-7 place-items-center gap-2"
            >
              <abbr title="Rank Tier">Rank</abbr>
              <abbr title="Kills">K</abbr>
              <abbr title="Deaths">D</abbr>
              <abbr title="Assists">A</abbr>
              <abbr title="Kills/Deaths" class="hidden sm:table-cell">K/D</abbr>
              <abbr title="Average Damage per round">ADR</abbr>
              <abbr title="Headshots Percentage" class="hidden sm:table-cell"
                >HS%</abbr
              >
            </div>
          </div>
          <details
            class="w-full p-2 hover:bg-opacity-5 transition-all duration-300 cursor-default border-b border-white/5 hover:bg-gray-500"
            v-for="Player in Team"
            :key="Player"
          >
            <summary
              class="grid grid-cols-7 w-full text-left sm:p-2 items-center justify-between flex-col gap-2"
            >
              <div class="flex gap-2 col-span-2">
                <img
                  class="border-2 border-opacity-30 border-white/5 p-px rounded-lg bg-white bg-opacity-5 h-10 w-10"
                  :src="Player.assets.agent.small"
                />
                <div
                  class="flex flex-col items-start justify-center w-full text-sm sm:text-base truncate"
                >
                  {{ Player.name }}
                  <span
                    class="hidden sm:block max-w-min text-xs px-1 rounded bg-white/10"
                    >#{{ Player.tag }}</span
                  >
                </div>
              </div>
              <div
                class="col-span-5 gap-2 grid grid-cols-5 sm:grid-cols-7 place-items-center w-full"
              >
                <div
                  class="flex justify-center items-center w-h w-8"
                  :title="Player.currenttier_patched"
                >
                  <img
                    :src="TierIcon(Player.currenttier)"
                    class="h-8 w-8"
                    alt=""
                  />
                </div>
                <p>{{ Player.stats.kills }}</p>
                <p>{{ Player.stats.deaths }}</p>
                <p>{{ Player.stats.assists }}</p>
                <p class="hidden sm:table-cell">
                  {{ kd(Player.stats.kills, Player.stats.deaths) }}
                </p>
                <p>
                  {{ (Player.damage_made / MD.rounds.length).toFixed(0) }}
                </p>
                <p class="hidden sm:table-cell">
                  {{
                    Math.round(
                      (Player.stats.headshots /
                        (Player.stats.bodyshots +
                          Player.stats.headshots +
                          Player.stats.legshots)) *
                        100
                    ).toFixed(0) + "%"
                  }}
                </p>
              </div>
            </summary>
            <div class="flex flex-col py-2">
              <!-- Overall Stats -->
              <div class="p-2">
                <!-- Logo Name Tag Profile -->
                <div
                  class="grid grid-cols-2 sm:grid-cols-5 gap-4 place-items-center py-2"
                >
                  <router-link
                    :to="{
                      name: 'Overview',
                      params: { Name: Player.name, Tag: Player.tag },
                    }"
                    class="text-sm bg-blue-500 bg-opacity-10 hover:bg-opacity-20 rounded p-2"
                  >
                    View Profile
                  </router-link>
                  <div>
                    <p class="text-sm text-white/70">Total Damage</p>
                    <p class="font-semibold tracking-wider">
                      {{ Player.damage_made }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-white/70">Avg. Score</p>
                    <p class="font-semibold tracking-wider">
                      {{ (Player.stats.score / MD.rounds.length).toFixed(1) }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-white/70">K/D/A</p>
                    <p class="font-semibold tracking-wider">
                      {{ Player.stats.kills }}/{{ Player.stats.deaths }}/{{
                        Player.stats.assists
                      }}
                    </p>
                  </div>
                  <div class="flex flex-start gap-4 col-span-2 sm:col-span-1">
                    <div class="flex flex-col items-center gap-1">
                      <div class="bg-red-600/40 rounded-full p-1">
                        <img
                          src="../assets/skull.png"
                          alt=""
                          class="h-7 w-7 max-w-none filter invert"
                        />
                      </div>
                      <abbr title="Kills Rounds Ratio">{{
                        (Player.stats.kills / MD.rounds.length).toFixed(1)
                      }}</abbr>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                      <div class="bg-emerald-600/40 rounded-full p-1">
                        <img
                          src="../assets/skull.png"
                          alt=""
                          class="h-7 w-7 filter invert"
                        />
                      </div>
                      <abbr title="Damage per Round">{{
                        (Player.damage_made / MD.rounds.length).toFixed(1)
                      }}</abbr>
                    </div>
                  </div>
                </div>
                <!-- Avg Score K/D/A | Medal earned Danage /round -->
                <div
                  class="flex flex-col justify-between sm:flex-row gap-2 w-full items-center py-2"
                >
                  <div
                    class="flex gap-2 sm:gap-6 justify-between sm:justify-start w-full"
                  ></div>
                </div>
              </div>
              <!-- Rounds -->
              <div class="py-2 cursor-default">
                <div
                  class="flex flex-wrap gap-y-8 items-end justify-center pb-6"
                >
                  <div
                    class="flex flex-col items-center relative"
                    v-for="(Pl, idx) in FilterStats(Player.puuid)"
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
                    <p class="mt-7 -mb-4 text-sm text-white/30">
                      {{ idx + 1 }}
                    </p>
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
  name: "UserStats",
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
    let mm2m = (seconds) => {
      let minutes = ~~(seconds / 60);
      let extraSeconds = seconds % 60;
      extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
      return `${minutes}m ${extraSeconds}s`;
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
      return PlyrData;
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
