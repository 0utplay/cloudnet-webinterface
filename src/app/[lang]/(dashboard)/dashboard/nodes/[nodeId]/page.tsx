import PageLayout from '@/components/pageLayout'
import { Nodes } from '@/utils/types/nodes'
import { getNode } from '@/utils/server-api/nodes/getNode'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getPermissions } from '@/utils/server-api/user/getPermissions'
import NodeClientPage from '@/app/[lang]/(dashboard)/dashboard/nodes/[nodeId]/page.client'
import NoAccess from '@/components/static/noAccess'

export const runtime = 'edge'

export default async function NodePage({ params: { lang, nodeId } }) {
  const node: Nodes = await getNode(nodeId)
  const permissions: any = await getPermissions()
  const requiredPermissions = [
    'cloudnet_rest:cluster_read',
    'cloudnet_rest:cluster_node_get',
    'global:admin',
  ]

  // check if user has required permissions
  const hasPermissions = requiredPermissions.some((permission) =>
    permissions.includes(permission)
  )

  if (!hasPermissions) {
    return <NoAccess />
  }

  if (!node?.node?.uniqueId) {
    return (
      <div className="h-svh">
        <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
          <h1 className="text-[7rem] font-bold leading-tight">401</h1>
          <span className="font-medium">Node not found!</span>
          <p className="text-center text-muted-foreground">
            It looks like you&apos;re trying to access a node that doesn&apos;t
            exist.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href={'.'}>
              <Button variant="outline">Go back</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageLayout title={node?.node?.uniqueId}>
      <NodeClientPage node={node} nodeId={nodeId} />
    </PageLayout>
  )
}
