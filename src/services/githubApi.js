import axios from 'axios';

const token = process.env.GITHUB_TOKEN; // 여기에 생성한 GitHub 토큰을 입력하세요.

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

export default githubApi;
