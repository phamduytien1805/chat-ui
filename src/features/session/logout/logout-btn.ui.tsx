import { Button } from '@/shared/ui/button'
import { useLogoutMutation } from './logout.mutation'
import { useNavigate } from 'react-router-dom'
import { pathKeys } from '@/shared/lib/react-router'
import { useEffect } from 'react'

export function LogoutButton() {
  const navigate = useNavigate()

  const { mutate: logout, isPending } = useLogoutMutation({
    onSuccess:async () => {
      navigate(pathKeys.login())
    }
  })

  const handleLogout = () => {
    logout();
  }
  return (
    <>
      <Button onClick={handleLogout} disabled={isPending} variant={"ghost"}>Logout</Button>
    </>
  )
}
