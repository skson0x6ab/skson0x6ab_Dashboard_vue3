<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <div class="px-5 pt-5">
      <header class="flex justify-between items-start mb-0">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ title }}</h2>
      </header>
    </div>
    <div class="grow mt-8">
    <BarChart :data="chartData" :options="chartOptions" :width="800" :height="400" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import dayjs from 'dayjs'; // dayjs 라이브러리 추가

// Chart.js components 등록
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'MultiBarChartComponent',
  components: {
    BarChart: Bar,
  },
  props: {
    title: String,
    labels: Array,
    dataPoints1: Array,
    dataPoints2: Array,
    dataPoints3: Array,
    borderColor1: String,
    backgroundColor1: String,
    borderColor2: String,
    backgroundColor2: String,
    borderColor3: String,
    backgroundColor3: String,
  },
  setup(props) {
  console.log("Props received:", props);
    const chartData = ref({
      labels: props.labels,
      datasets: [
        {
          label: 'Genshin',
          data: props.dataPoints1,
          borderColor: props.borderColor1,
          backgroundColor: props.backgroundColor1,
          stack: 'stack1', // 데이터가 쌓일 그룹
        },
        {
          label: 'StarRail',
          data: props.dataPoints2,
          borderColor: props.borderColor2,
          backgroundColor: props.backgroundColor2,
          stack: 'stack1', // 데이터가 쌓일 그룹
        },
        {
          label: 'Zenless',
          data: props.dataPoints3,
          borderColor: props.borderColor3,
          backgroundColor: props.backgroundColor3,
          stack: 'stack1', // 데이터가 쌓일 그룹
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
          stacked: true, // X축에 쌓이게 설정
          ticks: {
            display: true,
            callback: (value) => {
              return dayjs(props.labels[value]).format('MM/DD');
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true, // Y축에 쌓이게 설정
          ticks: {
            display: true,
            callback: (value) => {
              return value;
            },
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
        },
      },
    };
    console.log("chartData:", chartData.value);
    console.log("chartOptions:", chartOptions);
    return { chartData, chartOptions };
  },
};

</script>