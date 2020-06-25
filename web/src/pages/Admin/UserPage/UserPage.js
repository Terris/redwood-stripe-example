import UsersLayout from 'src/layouts/Admin/UsersLayout'
import UserCell from 'src/components/Admin/UserCell'

const UserPage = ({ id }) => {
  return (
    <UsersLayout>
      <UserCell id={id} />
    </UsersLayout>
  )
}

export default UserPage
