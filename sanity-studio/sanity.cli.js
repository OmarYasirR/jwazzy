import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '7ib3p1r8',
    dataset: 'production'
  },
  studioHost: 'jwazzy-travel',
  deployment: {
    appId: 'dvbh3s80daol5q3v43qkv5ha',
    autoUpdates: true
  }
})