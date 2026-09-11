import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGitHubPages ? '/property-path-calculator' : '',
  assetPrefix: isGitHubPages ? '/property-path-calculator/' : undefined,
};

export default nextConfig;
