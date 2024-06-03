import { fetchWithPermissions } from '@/utils/actions/fetchWithPermissions'

export async function getModuleConfig(moduleId: string) {
  const requiredPermissions = [
    'cloudnet_rest:module_read',
    'cloudnet_rest:module_config_get',
    'global:admin',
  ]

  return await fetchWithPermissions(
    `/module/${moduleId}/config`,
    requiredPermissions
  )
}
