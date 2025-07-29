// next.config.ts
import withAntdLess from "next-plugin-antd-less";
import withBundleAnalyzerFn from "@next/bundle-analyzer";
import lessToJS from "less-vars-to-js";
import fs from "fs";
import webpack from "webpack";
import path from "path";

// Bundle Analyzer – active only when ANALYZE=true
const withBundleAnalyzer = withBundleAnalyzerFn({
  enabled: process.env.ANALYZE === "true",
});

const antdVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "src/styles/variables.less"), "utf8")
);

const nextConfig = withBundleAnalyzer(
  withAntdLess({
    // modifyVars: {
    // 	'hack': 'true;@import "~antd/lib/style/themes/compact.less";',
    // 	...antdVariables,
    // },
    lessVarsFilePath: "./src/styles/variables.less",
    lessVarsFilePathAppendToEndOfContent: true,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {
      modules: {
        auto: (filePath: string) => filePath.endsWith(".module.less"),
        localIdentName:
          process.env.NODE_ENV !== "production"
            ? "[folder]__[local]__[hash:4]"
            : "[hash:8]",
      },
    },

    // for Next.js ONLY
    // nextjs: {
    // 	localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
    // },

    // Other Config Here...
    reactStrictMode: true,

    webpack(config) {
      config.module.rules.push({
        test: /\.md$/,
        use: "frontmatter-markdown-loader",
      });

      config.plugins.push(
        new webpack.EnvironmentPlugin({
          NODE_ENV: process.env.NODE_ENV,
          THEME: { ...antdVariables },
        })
      );

      return config;
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  })
);

module.exports = nextConfig;
