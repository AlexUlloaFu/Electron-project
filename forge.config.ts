import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    // Windows Squirrel Installer (.exe)
    new MakerSquirrel({
      name: "your_app_name",
      authors: "Your Name",
      description: "Your app description",
      // Optional: Code signing certificate
      // certificateFile: "./cert.pfx",
      // certificatePassword: process.env.CERT_PASSWORD
    }),
    
    // ZIP for macOS (cross-platform builds)
    new MakerZIP({}), // Fix typo: 'darwin' (macOS), not 'darwin'
    
    // Linux packages
    new MakerDeb({
      options: {
        name: "your_app_name",
        productName: "Your App Name",
        version: "1.0.0",
        description: "Your app description",
        maintainer: "Your Name <email@example.com>",
        homepage: "https://your-app.com",
        categories: ["Utility"],
        depends: [ // Critical dependencies for Electron apps
          "libgtk-3-0",
          "libnotify4",
          "libnss3",
          "libxss1",
          "libxtst6",
          "xdg-utils"
        ]
      }
  })
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.tsx',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
      devContentSecurityPolicy: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' data:; connect-src 'self' 'unsafe-inline' http://localhost:4000; media-src 'self' file: local: data:;"
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
