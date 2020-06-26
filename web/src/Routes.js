// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="signIn">
        <Route path="/admin" page={AdminPage} name="admin" />
        <Route
          path="/admin/users/new"
          page={AdminNewUserPage}
          name="adminNewUser"
        />
        <Route
          path="/admin/users/{id:Int}/edit"
          page={AdminEditUserPage}
          name="adminEditUser"
        />
        <Route
          path="/admin/users/{id:Int}"
          page={AdminUserPage}
          name="adminUser"
        />
        <Route path="/admin/users" page={AdminUsersPage} name="adminUsers" />
        <Route
          path="/admin/products/new"
          page={AdminNewProductPage}
          name="adminNewProduct"
        />
        <Route
          path="/admin/products/{id}/edit"
          page={AdminEditProductPage}
          name="adminEditProduct"
        />
        <Route
          path="/admin/product/{id}"
          page={AdminProductPage}
          name="adminProduct"
        />
        <Route
          path="/admin/products"
          page={AdminProductsPage}
          name="adminProducts"
        />
      </Private>
      <Route
        path="/confirm-email"
        page={ConfirmEmailPage}
        name="confirmEmail"
      />
      <Route
        path="/reset-password"
        page={ResetPasswordPage}
        name="resetPassword"
      />
      <Route
        path="/forgot-password"
        page={ForgotPasswordPage}
        name="forgotPassword"
      />
      <Route path="/signup" page={SignUpPage} name="signUp" />
      <Route path="/signin" page={SignInPage} name="signIn" />

      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
