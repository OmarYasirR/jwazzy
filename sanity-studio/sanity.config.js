import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {dashboardTool} from '@sanity/dashboard'
import {projectInfoWidget} from '@sanity/dashboard'
import Logo from './components/Logo'

console.log(process.env.SANITY_STUDIO_DATASET)
console.log('process.env.SANITY_STUDIO_DATASET')

export default defineConfig({
  name: 'jwazzy',
  title: 'jwazzy CMS',
  projectId: '7ib3p1r8',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Dashboard')
              .icon(() => '📊')
              .child(
                S.document()
                  .schemaType('dashboard')
                  .documentId('dashboard')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['dashboard'].includes(listItem.getId())
            ),
          ]),
    }),
    visionTool(),
    dashboardTool({
      widgets: [projectInfoWidget()],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
  icon: () => '✈️',
})