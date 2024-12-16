import { defineStore } from 'pinia';

export const useMonitorStore = defineStore('Monitor', {
  state: () => ({
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
  }),

  actions: {
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
          const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}`);
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
});