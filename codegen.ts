import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `https://localhost:4000/graphql`,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/shared/__graphql-generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
    './src/shared/__graphql-generated__/dto.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
  ignoreNoDocuments: true,
}

export default config
