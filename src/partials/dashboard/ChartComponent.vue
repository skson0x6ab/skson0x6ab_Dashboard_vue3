<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <div class="px-5 pt-5">
      <header class="flex justify-between items-start mb-0">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ title }}</h2>
      </header>
    </div>
    <div class="grow mt-8">
      <LineChart :data="chartData" :options="chartOptions" :width="600" :height="200" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

// Chart.js components 등록
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

export default {
  name: 'ChartComponent',
  components: {
    LineChart: Line,
  },
  props: {
    title: String,  // 차트 제목
    label: String,  // 지표의 라벨 (예: 'Genshin.json', 'StarRail.json')
    dataPoints: Array,  // 해당 지표의 데이터 배열
    labels: Array,  // x축에 표시될 날짜 배열
    borderColor: String,  // 차트의 선 색상
    backgroundColor: String,  // 차트의 배경 색상
  },
  setup(props) {
    const chartData = ref({
      labels: props.labels,
      datasets: [
        {
          label: props.label,
          data: props.dataPoints,
          borderColor: props.borderColor,
          backgroundColor: props.backgroundColor,
          fill: true,
          tension: 0.2,
        },
      ],
    });

    const chartOptions = {
      responsive: true,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,  // x축 날짜를 숨깁니다.
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,  // 여기서 legend를 숨깁니다.
        },
      },
    };

    return { chartData, chartOptions };
  },
};
</script>