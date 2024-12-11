<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Monitoring</h2>
    </header>
    <div class="p-3">

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-gray-300">
          <!-- Table header -->
          <thead class="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th class="p-2">
                <div class="font-semibold text-left">Game</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-left">Update</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
            <!-- Row -->
             <tr v-for="(item, index) in jsonData" :key="index">
                <td class="p-2">
                    <div class="flex items-center">
                        <div class="text-gray-800 dark:text-gray-100">{{ item.name }}</div>
                    </div>
                </td>
                <td class="p-2">
                    <div class="flex items-center">
                        <div class="text-gray-800 dark:text-gray-100">{{ item.date }}</div>
                    </div>
                </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            jsonData: {
                FF14_json: { name: 'FF14', date: '' },
                Genshin_json: { name: 'Genshin', date: '' },
                Maplestory_json: { name: 'Maplestory', date: '' },
                PublicOfferingStockSchedule_json: { name: 'Stock', date: '' },
                StarRail_json: { name: 'StarRail', date: '' },
                genshinRedeemCode_json: { name: 'Genshin RedeemCode', date: '' },
                starrailRedeemCode_json: { name: 'StarRailRedeemCode', date: '' },
                zenlessRedeemCode_json: { name: 'Zenless RedeemCode', date: '' },
            },
        };
    },
    methods: {
        async fetchJsonData() {
            try {
                const owner = 'skson0x6ab'; // 레포지토리 소유자
                const repo = 'DataRepository'; // 레포지토리 이름
                const filePaths = [
                    'FF14.json',
                    'Genshin.json',
                    'Maplestory.json',
                    'PublicOfferingStockSchedule.json',
                    'StarRail.json',
                    'genshinRedeemCode.json',
                    'starrailRedeemCode.json',
                    'zenlessRedeemCode.json',
                ];

                for (let filePath of filePaths) {
                    const response = await fetch(
                        `https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}`
                    );
                    const data = await response.json();

                    const commitDate = new Date(data[0].commit.author.date);
                    const formattedDate = commitDate.getFullYear() + '.' +
                                          (commitDate.getMonth() + 1).toString().padStart(2, '0') + '.' +
                                          commitDate.getDate().toString().padStart(2, '0') + ' ' +
                                          commitDate.getHours().toString().padStart(2, '0') + ':' +
                                          commitDate.getMinutes().toString().padStart(2, '0');

                    const jsonName = filePath.replace('.json', '_json');

                    // 단일 날짜 값 할당
                    this.jsonData[jsonName].date = formattedDate;
                }

                // 날짜 내림차순으로 jsonData의 항목들을 정렬
                const sortedJsonData = Object.keys(this.jsonData)
                    .sort((a, b) => new Date(this.jsonData[b].date) - new Date(this.jsonData[a].date)) // 내림차순 정렬
                    .reduce((acc, key) => {
                        acc[key] = this.jsonData[key];
                        return acc;
                    }, {});

                this.jsonData = sortedJsonData; // 정렬된 jsonData로 업데이트

            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        },
    },
    created() {
        this.fetchJsonData();
    },
};
</script>