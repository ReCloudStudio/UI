import { addComponentExports, addImportsSources, createResolver, defineNuxtModule, addTypeTemplate } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
import type { ModuleOptions } from './types'

export * from './types'

const module: NuxtModule<ModuleOptions> = defineNuxtModule<ModuleOptions>({
    meta: {
      name: '@recloudstudio/ui',
      configKey: 'recloudUI',
      compatibility: {
        nuxt: '^4.0.0'
      }
    },
    defaults: {
      prefix: 'Re',
      injectTheme: true
    },
    setup(options, nuxt) {
      const resolver = createResolver(import.meta.url)

      addTypeTemplate({
        filename: 'types/recloud-ui.d.ts',
        getContents: () => `declare module 'nuxt/schema' {
  interface NuxtConfig {
    recloudUI?: import('@recloudstudio/ui/nuxt').ModuleOptions
  }
  interface NuxtOptions {
    recloudUI?: import('@recloudstudio/ui/nuxt').ModuleOptions
  }
}
export {}`
      })

      if (options.injectTheme) {
        nuxt.options.css = nuxt.options.css || []
        nuxt.options.css.push(resolver.resolve('../style.css'))
      }

      addComponentExports({
        filePath: resolver.resolve('../index.js'),
        prefix: options.prefix,
      })

      addImportsSources({
        from: '@recloudstudio/ui',
        imports: ['useTheme', 'useToast']
      })
    }
  }
)

export default module
