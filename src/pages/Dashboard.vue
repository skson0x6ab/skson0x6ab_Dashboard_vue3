<template>
  <div class="flex h-screen">
    <main class="grow">
      <div>
        <!-- Dashboard actions -->
        <div class="sm:flex sm:justify-between sm:items-center mb-8">
          <!-- Left: Title -->
          <div class="mb-4 sm:mb-0"></div>

          <!-- Right: Actions -->
          <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 "></div>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-12 gap-6">
          <!-- 로딩 상태 표시 -->
          <div v-if="loading" class="col-span-full text-center text-lg">Loading...</div>
          <div v-else-if="error" class="col-span-full text-center text-lg text-red-500">Error loading data!</div>

          <!-- Data charts -->
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="Genshin Impact"
            label="Genshin Impact"
            :dataPoints="mappedData.genshin"
            :labels="generateLabels()"
            borderColor="rgba(255, 99, 132, 1)"
            backgroundColor="rgba(255, 99, 132, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="Honkai: StarRail"
            label="Honkai: StarRail"
            :dataPoints="mappedData.starrail"
            :labels="generateLabels()"
            borderColor="rgba(75, 192, 192, 1)"
            backgroundColor="rgba(75, 192, 192, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="Zenless Zone Zero"
            label="Zenless Zone Zero"
            :dataPoints="mappedData.ZenlessZoneZero"
            :labels="generateLabels()"
            borderColor="rgba(75, 192, 192, 1)"
            backgroundColor="rgba(75, 192, 192, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="Maplestory"
            label="Maplestory"
            :dataPoints="mappedData.maplestory"
            :labels="generateLabels()"
            borderColor="rgba(153, 102, 255, 1)"
            backgroundColor="rgba(153, 102, 255, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="Final Fantasy XIV"
            label="Final Fantasy XIV"
            :dataPoints="mappedData.ff14"
            :labels="generateLabels()"
            borderColor="rgba(255, 159, 64, 1)"
            backgroundColor="rgba(255, 159, 64, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="RedeemCode: Genshin Impact"
            label="RedeemCode"
            :dataPoints="mappedData.genshinRedeemCode"
            :labels="generateLabels()"
            borderColor="rgba(54, 162, 235, 1)"
            backgroundColor="rgba(54, 162, 235, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="RedeemCode: StarRail"
            label="RedeemCode"
            :dataPoints="mappedData.starrailRedeemCode"
            :labels="generateLabels()"
            borderColor="rgba(153, 255, 51, 1)"
            backgroundColor="rgba(153, 255, 51, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="RedeemCode: Zenless"
            label="RedeemCode"
            :dataPoints="mappedData.zenlessRedeemCode"
            :labels="generateLabels()"
            borderColor="rgba(255, 99, 71, 1)"
            backgroundColor="rgba(255, 99, 71, 0.2)"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import FilterButton from '../components/DropdownFilter.vue'
import Datepicker from '../components/Datepicker.vue'
import ChartComponent from '../partials/dashboard/ChartComponent.vue'
import { useGithubAPIChartStore } from '/src/stores/GithubAPIChartStore';

export default {
  name: 'Dashboard',
  components: {
    FilterButton,
    Datepicker,
    ChartComponent
  },
  setup() {
    const sidebarOpen = ref(false);
    const GithubAPIChartStore = useGithubAPIChartStore();
    // Pinia store에서 상태를 computed로 가져옵니다.
    const jsonData = computed(() => GithubAPIChartStore.jsonData);
    const loading = computed(() => GithubAPIChartStore.loading);
    const error = computed(() => GithubAPIChartStore.error);

    const generateLabels = () => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1); // 어제

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7); // 어제 기준 최근 7일

      const labels = [];
      for (let d = new Date(oneWeekAgo); d <= yesterday; d.setDate(d.getDate() + 1)) {
        labels.push(d.toISOString().slice(0, 10)); // 'YYYY-MM-DD' 형식
      }
      return labels;
    };

    const mappedData = computed(() => {
      const labels = generateLabels();
      return {
        genshin: labels.map(label => {
          const dataItem = jsonData.value.find(item => {
            const date = new Date(item.date); // 날짜를 처리하는 필드명 확인 필요
            return date.toISOString().slice(0, 10) === label;
          });
          return dataItem ? dataItem['Genshin.json'] : 0;
        }),
        starrail: labels.map(label => {
          const dataItem = jsonData.value.find(item => {
            const date = new Date(item.date);
            return date.toISOString().slice(0, 10) === label;
          });
          return dataItem ? dataItem['StarRail.json'] : 0;
        }),
        ZenlessZoneZero: labels.map(label => {
          const dataItem = jsonData.value.find(item => {
            const date = new Date(item.date);
            return date.toISOString().slice(0, 10) === label;
          });
          return dataItem ? dataItem['ZenlessZoneZero.json'] : 0;
        }),
        maplestory: labels.map(label => {
          const dataItem = jsonData.value.find(item => {
            const date = new Date(item.date);
            return date.toISOString().slice(0, 10) === label;
          });
          return dataItem ? dataItem['Maplestory.json'] : 0;
        }),
        ff14: labels.map(label => {
          const dataItem = jsonData.value.find(item => {
            const date = new Date(item.date);
            return date.toISOString().slice(0, 10) === label;
          });
          return dataItem ? dataItem['FF14.json'] : 0;
        }),
        genshinRedeemCode: labels.map(label => {
          const dataItem = jsonData.value.find(item => {
            const date = new Date(item.date);
            return date.toISOString().slice(0, 10) === label;
          });
          return dataItem ? dataItem['genshinRedeemCode.json'] : 0;
        }),
        starrailRedeemCode: labels.map(label => {
          const dataItem = jsonData.value.find(item => {
            const date = new Date(item.date);
            return date.toISOString().slice(0, 10) === label;
          });
          return dataItem ? dataItem['starrailRedeemCode.json'] : 0;
        }),
        zenlessRedeemCode: labels.map(label => {
          const dataItem = jsonData.value.find(item => {
            const date = new Date(item.date);
            return date.toISOString().slice(0, 10) === label;
          });
          return dataItem ? dataItem['zenlessRedeemCode.json'] : 0;
        })
      };
    });

    // onMounted 훅을 사용하여 데이터 로딩을 처리합니다.
    onMounted(async () => {
      // 데이터가 없으면 fetchJsonData를 호출합니다.
      if (!jsonData.value) {
        await GithubAPIChartStore.fetchJsonData();
      }
    });

    return {
      sidebarOpen,
      jsonData,
      loading,
      error,
      GithubAPIChartStore,
      generateLabels,
      mappedData,
    };
  },
};
</script>