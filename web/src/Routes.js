// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/admin/users/new" page={AdminNewUserPage} name="adminNewUser" />
      <Route path="/admin/users/{id:Int}/edit" page={AdminEditUserPage} name="adminEditUser" />
      <Route path="/admin/users/{id:Int}" page={AdminUserPage} name="adminUser" />
      <Route path="/admin/users" page={AdminUsersPage} name="adminUsers" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
