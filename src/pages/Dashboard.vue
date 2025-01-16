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
          <codeRedeemTableComponent/>
          <!-- Data charts -->
            <MultiBarChartComponent
              v-if="!loading && !error && jsonData && jsonData.length > 0"
              :title="'Hoyoverse ReleaseNote'"
              :labels="generateLabels()"
              :dataPoints1="mappedData.genshin"
              :dataPoints2="mappedData.starrail"
              :dataPoints3="mappedData.zenless"
              :borderColor1="'rgba(255, 99, 132, 1)'"
              :backgroundColor1="'rgba(255, 99, 132, 0.2)'"
              :borderColor2="'rgba(54, 162, 235, 1)'"
              :backgroundColor2="'rgba(54, 162, 235, 0.2)'"
              :borderColor3="'rgba(75, 192, 192, 1)'"
              :backgroundColor3="'rgba(75, 192, 192, 0.2)'"
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
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import FilterButton from '../components/DropdownFilter.vue'
import Datepicker from '../components/Datepicker.vue'
import MultiBarChartComponent from '../partials/dashboard/MultiBarChartComponent.vue';
import ChartComponent from '../partials/dashboard/ChartComponent.vue'
import codeRedeemTableComponent from '../partials/dashboard/codeRedeemTableComponent.vue'
import { useGithubAPIChartStore } from '/src/stores/GithubAPIChartStore';

export default {
  name: 'Dashboard',
  components: {
    FilterButton,
    Datepicker,
    ChartComponent,
    codeRedeemTableComponent,
    MultiBarChartComponent,
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
const getMappedData = (key, labels) => {
  if (!jsonData.value) {
    return labels.map(() => 0);  // jsonData가 없을 경우 0으로 초기화
  }

  return labels.map(label => {
    const dataItem = jsonData.value.find(item => {
      const itemDate = new Date(item.date);
      const itemDateString = itemDate.toISOString().slice(0, 10);  // item.date를 'YYYY-MM-DD' 형식으로 변환
      return itemDateString === label;  // 날짜 형식이 정확히 일치하는지 비교
    });
    return dataItem ? dataItem[key] : 0;
  });
};

const mappedData = computed(() => {
  const labels = generateLabels();  // labels는 여기서 정의

  return {
    genshin: getMappedData('Genshin.json', labels),
    starrail: getMappedData('StarRail.json', labels),
    zenless: getMappedData('ZenlessZoneZero.json', labels),
    maplestory: getMappedData('Maplestory.json', labels),
    ff14: getMappedData('FF14.json', labels),
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