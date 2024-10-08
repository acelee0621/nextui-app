import { currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  const user = await currentUser()
  console.log(user)

  if (!user) return <div>Not signed in</div>

  return <div>Hello {user?.username}</div>
}