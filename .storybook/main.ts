import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.tsx'],
  staticDirs: [{ from: '../public/images/works', to: '/images/works' }],
  core: { disableTelemetry: true },
  viteFinal(config) {
    // Storybook 只建置自己的 iframe，網站有獨立的 HTML 入口。
    if (config.build?.rolldownOptions) delete config.build.rolldownOptions.input
    return config
  },
}

export default config
