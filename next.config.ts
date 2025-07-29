// next.config.ts
import withAntdLess from "next-plugin-antd-less";
import withBundleAnalyzerFn from "@next/bundle-analyzer";

// Basic config
const baseConfig = {
  reactStrictMode: true,

  // Let build even with ESLint errors (e.g. CI)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// Bundle Analyzer – active only when ANALYZE=true
const withBundleAnalyzer = withBundleAnalyzerFn({
  enabled: process.env.ANALYZE === "true",
});

// LESS config with antD
const lessConfig = withAntdLess({
  lessVarsFilePath: "./src/styles/variables.less",
  lessVarsFilePathAppendToEndOfContent: true,

  // Local style classes *.module.less
  cssLoaderOptions: {
    modules: {
      auto: (filePath: string) => filePath.endsWith(".module.less"),
      localIdentName:
        process.env.NODE_ENV !== "production"
          ? "[folder]__[local]__[hash:4]"
          : "[hash:8]",
    },
  },

  // less-loader options
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
});

const nextConfig = withBundleAnalyzer(lessConfig(baseConfig));

export default nextConfig;
