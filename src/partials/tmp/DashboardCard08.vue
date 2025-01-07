<template>
  <div class="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Genshin JSON Over Time</h2>
    </header>
    <!-- Chart built with Chart.js 3 -->
    <LineChart :data="chartData" :width="595" :height="248" />
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { tailwindConfig } from '../../utils/Utils'
import LineChart from '../../charts/LineChart02.vue'

export default {
  name: 'DashboardCard08',
  components: {
    LineChart,
  },
  setup() {
    // 기존 커밋 로그 데이터 (예시)
    const commitLogs = [
      {
        date: '2024-12-26',
        starrailRedeemCodeJson: 1,
        GenshinJson: 1,
        FF14Json: 0,
        genshinRedeemCodeJson: 0,
        MaplestoryJson: 0,
        StarRailJson: 0,
        zenlessRedeemCodeJson: 0,
      },
      {
        date: '2024-12-25',
        starrailRedeemCodeJson: 0,
        GenshinJson: 0,
        FF14Json: 0,
        genshinRedeemCodeJson: 1,
        MaplestoryJson: 0,
        StarRailJson: 0,
        zenlessRedeemCodeJson: 0,
      },
      // 더 많은 데이터가 있을 수 있음
    ];

    // 시작 날짜와 끝 날짜 설정
    const startDate = new Date('2024-12-01');
    const endDate = new Date();

    // 날짜 라벨 생성 (1일 단위)
    const labels = [];
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      labels.push(new Date(date).toISOString().split('T')[0]);
    }

    // GenshinJson만 처리하는 예시
    const chartData = reactive({
      labels: labels, // 날짜 라벨
      datasets: [{
        label: 'GenshinJson',  // GenshinJson 파일만 라벨로 설정
        data: [],  // GenshinJson 데이터 처리
        borderColor: tailwindConfig().theme.colors.violet[500], // 예시 색상
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      }]
    });

    // 커밋 로그를 기반으로 GenshinJson에 대한 변경 여부 데이터를 생성
    const processCommitLogs = () => {
      const processedData = chartData.labels.map(label => {
        const formattedLabel = label;

        // 커밋 로그에서 해당 날짜와 'GenshinJson' 파일에 대한 변경 여부 확인
        const fileChangesOnDate = commitLogs.filter(log => {
          const commitDate = new Date(log.date); // 커밋 날짜 가져오기
          const commitDateStr = commitDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환
          const isFileChanged = log.GenshinJson === 1; // 'GenshinJson' 파일이 변경되었는지 확인 (1일 경우 변경됨)
          return commitDateStr === formattedLabel && isFileChanged; // 날짜와 파일 변경 여부 비교
        });

        // 해당 날짜에 GenshinJson 파일 변경이 있으면 1, 없으면 0
        return fileChangesOnDate.length > 0 ? 1 : 0;
      });

      // GenshinJson 데이터 추가
      chartData.datasets[0].data = processedData;
    };

    // 커밋 로그 처리
    onMounted(() => {
      processCommitLogs();
    });

    return {
      chartData,
    };
  }
}
</script>