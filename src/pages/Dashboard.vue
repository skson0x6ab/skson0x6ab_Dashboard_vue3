<template>
  <div class="flex h-screen">
    <main class="grow">
      <div>
        <!-- Dashboard actions -->
        <div class="sm:flex sm:justify-between sm:items-center mb-8">
          <!-- Left: Title -->
          <div class="mb-4 sm:mb-0"></div>

          <!-- Right: Actions -->
          <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 ">
            <!-- Filter button
            <FilterButton align="right" />-->
            <!-- Datepicker built with flatpickr
            <Datepicker align="right" /> -->
          </div>
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
            :dataPoints="jsonData.map(item => item['Genshin.json'])"
            :labels="generateLabels()"
            borderColor="rgba(255, 99, 132, 1)"
            backgroundColor="rgba(255, 99, 132, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="Honkai: StarRail"
            label="Honkai: StarRail"
            :dataPoints="jsonData.map(item => item['StarRail.json'])"
            :labels="generateLabels()"
            borderColor="rgba(75, 192, 192, 1)"
            backgroundColor="rgba(75, 192, 192, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="Maplestory"
            label="Maplestory"
            :dataPoints="jsonData.map(item => item['Maplestory.json'])"
            :labels="generateLabels()"
            borderColor="rgba(153, 102, 255, 1)"
            backgroundColor="rgba(153, 102, 255, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="Final Fantasy XIV"
            label="Final Fantasy XIV"
            :dataPoints="jsonData.map(item => item['FF14.json'])"
            :labels="generateLabels()"
            borderColor="rgba(255, 159, 64, 1)"
            backgroundColor="rgba(255, 159, 64, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="RedeemCode: Genshin Impact"
            label="RedeemCode"
            :dataPoints="jsonData.map(item => item['genshinRedeemCode.json'])"
            :labels="generateLabels()"
            borderColor="rgba(54, 162, 235, 1)"
            backgroundColor="rgba(54, 162, 235, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="RedeemCode: StarRail"
            label="RedeemCode"
            :dataPoints="jsonData.map(item => item['starrailRedeemCode.json'])"
            :labels="generateLabels()"
            borderColor="rgba(153, 255, 51, 1)"
            backgroundColor="rgba(153, 255, 51, 0.2)"
          />
          <ChartComponent
            v-if="!loading && !error && jsonData && jsonData.length > 0"
            title="RedeemCode: Zenless"
            label="RedeemCode"
            :dataPoints="jsonData.map(item => item['zenlessRedeemCode.json'])"
            :labels="generateLabels()"
            borderColor="rgba(255, 99, 71, 1)"
            backgroundColor="rgba(255, 99, 71, 0.2)"
          />

          <!-- Other Dashboard Cards -->
           <!--<DashboardCard01 />
          <DashboardCard02 />
          <DashboardCard03 />
          <DashboardCard04 />
          <DashboardCard05 />
          <DashboardCard06 />
          <DashboardCard07 />
          <DashboardCard08 />
          <DashboardCard09 />
          <DashboardCard10 />
          <DashboardCard11 />
          <DashboardCard12 />
          <DashboardCard13 /> -->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import FilterButton from '../components/DropdownFilter.vue'
import Datepicker from '../components/Datepicker.vue'
import DashboardCard01 from '../partials/dashboard/DashboardCard01.vue'
import DashboardCard02 from '../partials/dashboard/DashboardCard02.vue'
import DashboardCard03 from '../partials/dashboard/DashboardCard03.vue'
import DashboardCard04 from '../partials/dashboard/DashboardCard04.vue'
import DashboardCard05 from '../partials/dashboard/DashboardCard05.vue'
import DashboardCard06 from '../partials/dashboard/DashboardCard06.vue'
import DashboardCard07 from '../partials/dashboard/DashboardCard07.vue'
import DashboardCard08 from '../partials/dashboard/DashboardCard08.vue'
import DashboardCard09 from '../partials/dashboard/DashboardCard09.vue'
import DashboardCard10 from '../partials/dashboard/DashboardCard10.vue'
import DashboardCard11 from '../partials/dashboard/DashboardCard11.vue'
import DashboardCard12 from '../partials/dashboard/DashboardCard12.vue'
import DashboardCard13 from '../partials/dashboard/DashboardCard13.vue'
import ChartComponent from '../partials/dashboard/ChartComponent.vue'
import { useGithubAPIChartStore } from '/src/stores/GithubAPIChartStore';

export default {
  name: 'Dashboard',
  components: {
    FilterButton,
    Datepicker,
    ChartComponent,
    DashboardCard01,
    DashboardCard02,
    DashboardCard03,
    DashboardCard04,
    DashboardCard05,
    DashboardCard06,
    DashboardCard07,
    DashboardCard08,
    DashboardCard09,
    DashboardCard10,
    DashboardCard11,
    DashboardCard12,
    DashboardCard13,
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
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 6);

      const labels = [];
      for (let d = new Date(oneWeekAgo); d <= today; d.setDate(d.getDate() + 1)) {
        labels.push(d.toISOString().slice(0, 10));
      }
      return labels;
    };

    // onMounted 훅을 사용하여 데이터 로딩을 처리합니다.
    onMounted(async () => {
      // 데이터가 없으면 fetchJsonData를 호출합니다.
      if (!jsonData.value) {
        await GithubAPIChartStore.fetchJsonData();
      }

      // jsonData가 하나만 있을 때 콘솔에 'Single Data'를 찍어줍니다.
      if (jsonData.value && jsonData.value.length === 1) {
        console.log('Single Data');
      }
    });

    return {
      sidebarOpen,
      jsonData,
      loading,
      error,
      GithubAPIChartStore,
      generateLabels,
    };
  },
};
</script>