import UsersLayout from 'src/layouts/Admin/UsersLayout'
import EditUserCell from 'src/components/Admin/EditUserCell'

const EditUserPage = ({ id }) => {
  return (
    <UsersLayout>
      <EditUserCell id={id} />
    </UsersLayout>
  )
}

export default EditUserPage
