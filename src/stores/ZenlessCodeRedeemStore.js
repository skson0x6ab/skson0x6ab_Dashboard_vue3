import { defineStore } from 'pinia';
import githubApi from '/src/services/githubApi';

export const useZenlessCodeRedeemStore = defineStore('ZenlessCodeRedeem', {
  state: () => ({
    jsonData: null, // 데이터 저장
    loading: false,  // 로딩 상태
    error: null,     // 에러 메시지
  }),

  actions: {
    async fetchJsonData() {
      this.loading = true;
      this.error = null;

      try {
        const owner = 'skson0x6ab';
        const repo = 'DataRepository';
        const filePath = 'zenlessRedeemCode.json';


        const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${filePath}`);

        // Base64 콘텐츠 디코딩
        const base64Content = response.data.content;
        const binaryString = atob(base64Content);
        const binaryLength = binaryString.length;
        const bytes = new Uint8Array(binaryLength);

        for (let i = 0; i < binaryLength; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const textDecoder = new TextDecoder('utf-8');
        const decodedContent = textDecoder.decode(bytes);
        const parsedData = JSON.parse(decodedContent);
        const activeCodes = parsedData.active.map(item => item.code);
        this.jsonData = { activeCodes };
      } catch (error) {
        this.error = '데이터를 가져오는 중 오류가 발생했습니다: ' + error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});