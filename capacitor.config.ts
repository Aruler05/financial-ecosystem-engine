
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e139ac922ef24eb1810288f25e2b1204',
  appName: 'financial-ecosystem-engine',
  webDir: 'dist',
  server: {
    url: 'https://e139ac92-2ef2-4eb1-8102-88f25e2b1204.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystoreAlias: null,
      keystorePassword: null,
      keystoreAliasPassword: null,
      releaseType: null,
    }
  }
};

export default config;
