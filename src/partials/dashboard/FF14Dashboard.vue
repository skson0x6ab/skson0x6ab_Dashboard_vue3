<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Final Fantasy XIV</h2>
    </header>
    <div class="p-3">

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-gray-300">
          <!-- Table header -->
          <thead class="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th class="p-2">
                <div class="font-semibold text-left">소식</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">날짜</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
            <!-- Row -->
             <tr v-for="(item, index) in jsonData" :key="index">
                    <td class="p-2">
                      <div class="flex items-center">
                        <div class="text-gray-800 dark:text-gray-100">{{ item.Text }}</div>
                      </div>
                    </td>
                    <td class="p-2">
                      <div class="text-center">{{ item.Date }}</div>
                    </td>
                  </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
import githubApi from '/src/services/githubApi';

export default {
  name: 'FF14Dashboard',
  data() {
    return {
      jsonData: null,
    };
  },
  methods: {
    async fetchJsonData() {
      try {
        // 레포지토리 소유자와 이름, 파일 경로를 설정합니다.
        const owner = 'skson0x6ab';
        const repo = 'DataRepository';
        const filePath = 'FF14.json';

        // GitHub API를 통해 파일의 내용을 가져옵니다.
        const response = await githubApi.get(
          `/repos/${owner}/${repo}/contents/${filePath}`
        );

        // Base64 문자열을 UTF-8로 디코딩
        const base64Content = response.data.content;
        const binaryString = atob(base64Content);
        const binaryLength = binaryString.length;
        const bytes = new Uint8Array(binaryLength);

        for (let i = 0; i < binaryLength; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const textDecoder = new TextDecoder('utf-8');
        const decodedContent = textDecoder.decode(bytes);

        // JSON으로 파싱
        this.jsonData = JSON.parse(decodedContent);
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