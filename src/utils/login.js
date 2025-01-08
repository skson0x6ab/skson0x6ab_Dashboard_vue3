import axios from 'axios';
import { setCookie } from '/src/utils/Cookies';

// GitHub에서 인증키를 가져오는 함수
const getAuthKeyFromGitHub = async (repoOwner, repoName, filePath) => {
  const token = process.env.GITHUB_TOKEN;  // GitHub 액세스 토큰

  const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  try {
    const response = await githubApi.get(`/repos/${repoOwner}/${repoName}/contents/${filePath}`);

    const fileContent = atob(response.data.content);
    const parsedContent = JSON.parse(fileContent);

    return parsedContent.oAuthKey;  // 파일에서 oAuthKey를 반환
  } catch (error) {
    throw new Error('GitHub 파일 조회 오류');
  }
};

// 로그인 처리 및 JWT 발급
export const authenticateUser = async (authKey) => {
  try {
    // GitHub에서 인증키 가져오기
    const githubAuthKey = await getAuthKeyFromGitHub('skson0x6ab', 'skson0x6ab_InformationRepository', 'oAuthKey.json');

    // 인증키 비교
    if (authKey === githubAuthKey) {

      setCookie('authKey', authKey, 1);

      return authKey;
    } else {
      throw new Error('Invalid auth key');
    }
  } catch (error) {
    throw new Error('Authentication failed: ' + error.message);
  }
};