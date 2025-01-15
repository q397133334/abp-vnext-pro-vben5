import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: 'http://abp.xiaoyou.run/swagger/v1/swagger.json',
  output: {
    path: 'src/api-client',
    format: 'prettier',
  },
});
