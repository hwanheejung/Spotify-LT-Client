import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `https://localhost:4000/graphql`,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/shared/graphql/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
    './src/shared/graphql/__generated__/dto.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
  ignoreNoDocuments: true,
}

export default config
