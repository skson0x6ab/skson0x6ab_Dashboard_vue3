<template>
  <div class="flex h-screen">
    <main class="grow">
      <div>
        <!-- Dashboard actions -->
        <div class="sm:flex sm:justify-between sm:items-center mb-8">
          <!-- Left: Title -->
          <div class="mb-4 sm:mb-0">
          </div>

          <!-- Right: Actions -->
          <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 ">
            <!-- Filter button -->
            <FilterButton align="right" />
            <!-- Datepicker built with flatpickr -->
            <Datepicker align="right" />
          </div>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-12 gap-6">
          <!-- Data charts -->
          <div v-if="jsonData && jsonData.length > 0">
            <ChartComponent
              title="Genshin Impact"
              label="Genshin.json"
              :dataPoints="jsonData.map(item => item['Genshin.json'])"
              :labels="jsonData.length > 1 ? jsonData.map(item => item.date) : ['Single Data']"
              borderColor="rgba(255, 99, 132, 1)"
              backgroundColor="rgba(255, 99, 132, 0.2)"
            />
            <ChartComponent
              title="Honkia: StarRail"
              label="StarRail.json"
              :dataPoints="jsonData.map(item => item['StarRail.json'])"
              :labels="jsonData.length > 1 ? jsonData.map(item => item.date) : ['Single Data']"
              borderColor="rgba(75, 192, 192, 1)"
              backgroundColor="rgba(75, 192, 192, 0.2)"
            />
            <ChartComponent
              title="Maplestory"
              label="Maplestory.json"
              :dataPoints="jsonData.map(item => item['Maplestory.json'])"
              :labels="jsonData.length > 1 ? jsonData.map(item => item.date) : ['Single Data']"
              borderColor="rgba(153, 102, 255, 1)"
              backgroundColor="rgba(153, 102, 255, 0.2)"
            />
            <ChartComponent
              title="Final Fantasy XIV"
              label="FF14.json"
              :dataPoints="jsonData.map(item => item['FF14.json'])"
              :labels="jsonData.length > 1 ? jsonData.map(item => item.date) : ['Single Data']"
              borderColor="rgba(255, 159, 64, 1)"
              backgroundColor="rgba(255, 159, 64, 0.2)"
            />
            <ChartComponent
              title="RedeemCode: Genshin Impact"
              label="genshinRedeemCode.json"
              :dataPoints="jsonData.map(item => item['genshinRedeemCode.json'])"
              :labels="jsonData.length > 1 ? jsonData.map(item => item.date) : ['Single Data']"
              borderColor="rgba(54, 162, 235, 1)"
              backgroundColor="rgba(54, 162, 235, 0.2)"
            />
            <ChartComponent
              title="RedeemCode: StarRail"
              label="starrailRedeemCode.json"
              :dataPoints="jsonData.map(item => item['starrailRedeemCode.json'])"
              :labels="jsonData.length > 1 ? jsonData.map(item => item.date) : ['Single Data']"
              borderColor="rgba(153, 255, 51, 1)"
              backgroundColor="rgba(153, 255, 51, 0.2)"
            />
            <ChartComponent
              title="RedeemCode: Zenless"
              label="zenlessRedeemCode.json"
              :dataPoints="jsonData.map(item => item['zenlessRedeemCode.json'])"
              :labels="jsonData.length > 1 ? jsonData.map(item => item.date) : ['Single Data']"
              borderColor="rgba(255, 99, 71, 1)"
              backgroundColor="rgba(255, 99, 71, 0.2)"
            />
          </div>
          <DashboardCard01 />
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
          <DashboardCard13 />
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
    };
  },
};
</script>