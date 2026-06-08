/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 빌드 중 구글 폰트 사전최적화 단계를 끔 (Vercel 빌드 안정화).
  // 폰트는 브라우저에서 그대로 정상 로드됩니다.
  optimizeFonts: false,
};

export default nextConfig;