
import { EditUserForm } from '@/components/forms/edit-user-form'
import { Header } from '@/components/header'
import { Shell } from '@/components/shells/shell'
import appwriteServerDBService from '@/db/appwrite_server_db'
import React from 'react'

const editAccount = async() => {
  const user = await appwriteServerDBService.getServerAwajUser()
  return (
    <Shell variant="sidebar" className="max-w-4xl mx-auto p-4">
      <Header
        title="Edit Account"
        description="Manage your account settings."
        size="sm"
        />
      <div className="max-w-3xl flex-col flex gap-3 p-4 ring-1 ring-border rounded-md">
      <p className="text-lg font-semibold text">Personal Info:</p>
        <div className="pl-2 flex flex-col gap-3 text-base text-muted-foreground">
          <EditUserForm name={user.name} />
        </div>
      </div>
    </Shell>
  )
}

export default editAccount