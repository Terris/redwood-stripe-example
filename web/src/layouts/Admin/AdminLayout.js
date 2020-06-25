import { useEffect, useState } from 'react'

import { GlobalLayout } from 'src/layouts'
import { usePermission } from 'src/hooks'

const AdminLayout = ({ children }) => {
  const { loading, permitted } = usePermission('admin')
  if (loading) return null
  return <GlobalLayout>{permitted ? <>{children}</> : null}</GlobalLayout>
}

export default AdminLayout
