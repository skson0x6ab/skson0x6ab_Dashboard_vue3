import { defineStore } from 'pinia';
import githubApi from '/src/services/githubApi';

export const useStarRailCodeRedeemStoreUsed = defineStore('StarRailCodeRedeemUsed', {
  state: () => ({
    jsonData: { activeCodes: [] }, // 데이터를 저장
    loading: false,  // 로딩 상태
    error: null,     // 에러 메시지
  }),

  actions: {
    async fetchJsonData() {
      this.loading = true;
      this.error = null;

      try {
        const owner = 'skson0x6ab';
        const repo = 'skson0x6ab_InformationRepository';
        const filePath = 'starrailRedeemCodeUsed.json';

        const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${filePath}`);
        const base64Content = response.data.content;
        const decodedContent = atob(base64Content);
        const parsedData = JSON.parse(decodedContent);

        this.jsonData = parsedData || { activeCodes: [] };
      } catch (error) {
        this.error = '데이터를 가져오는 중 오류가 발생했습니다: ' + error.message;
      } finally {
        this.loading = false;
      }
    },

    // 새로운 코드 추가 (중복 체크 후 추가)
    async appendCode(newCode) {
      this.loading = true;
      this.error = null;

      try {
        const owner = 'skson0x6ab';
        const repo = 'skson0x6ab_InformationRepository';
        const filePath = 'starrailRedeemCodeUsed.json';

        // 기존 JSON 데이터 가져오기
        let response = await githubApi.get(`/repos/${owner}/${repo}/contents/${filePath}`).catch(() => {
          return { data: null };
        });

        let updatedContent;

        if (response.data) {
          const base64Content = response.data.content;
          const decodedContent = atob(base64Content);
          const parsedData = JSON.parse(decodedContent);

          // 새로운 코드가 이미 존재하는지 확인
          if (parsedData.activeCodes.includes(newCode)) {
            this.error = '이미 해당 코드가 존재합니다.';
            return;
          }

          // 새 코드를 추가
          updatedContent = {
            activeCodes: [...parsedData.activeCodes, newCode],
          };
        } else {
          // 파일이 없으면 새로 추가할 코드로 생성
          updatedContent = {
            activeCodes: [newCode],
          };
        }

        const base64NewContent = btoa(JSON.stringify(updatedContent, null, 2));

        // GitHub API로 파일 업데이트
        await githubApi.put(`/repos/${owner}/${repo}/contents/${filePath}`, {
          message: `Add new code: ${newCode}`,
          content: base64NewContent,
          sha: response.data ? response.data.sha : undefined,
        });

        this.jsonData.activeCodes.push(newCode); // 로컬 상태 업데이트
      } catch (error) {
        this.error = '코드를 추가하는 중 오류가 발생했습니다: ' + error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});