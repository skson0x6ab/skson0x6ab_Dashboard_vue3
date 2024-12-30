<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <div class="px-5 pt-5">
      <header class="flex justify-between items-start mb-0">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ title }}</h2>
      </header>
    </div>
    <div class="grow mt-8">
      <LineChart :data="chartData" :options="chartOptions" :width="800" :height="400" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import dayjs from 'dayjs'; // dayjs 라이브러리 추가

// Chart.js components 등록
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

export default {
  name: 'ChartComponent',
  components: {
    LineChart: Line,
  },
  props: {
    title: String,
    label: String,
    dataPoints: Array,
    labels: Array,
    borderColor: String,
    backgroundColor: String,
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
          fill: false, // 색칠 제거
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
            display: true,
            callback: (value) => {
              return dayjs(props.labels[value]).format('MM/DD');
            },
          },
        },
        y: {
          ticks: {
            display: true,
            callback: (value) => {
              if (value === 0 || value === 1) {
                return value;
              }
              return null; // 0과 1만 보이도록 설정
            },
          },
          grid: {
            display: false,
          },
          min: 0,
          max: 1,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    return { chartData, chartOptions };
  },
};
</script>