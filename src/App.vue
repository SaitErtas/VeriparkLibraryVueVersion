<script setup lang="ts">
import ScrollToTop from '@core/components/ScrollToTop.vue';
import { useThemeConfig } from '@core/composable/useThemeConfig';
import { hexToRgb } from '@layouts/utils';
import { useTheme } from 'vuetify';

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl, handleSkinChanges } = useThemeConfig()

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <SnackbarProvider>
        <RouterView />
        <ScrollToTop />
      </SnackbarProvider>
    </VApp>
  </VLocaleProvider>
</template>
