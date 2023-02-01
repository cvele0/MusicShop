<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="info">
        <b-navbar-brand to="/">Music shop</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>

            <b-nav-item-dropdown text="Category" right>
              <b-dropdown-item to="/countries">Countries</b-dropdown-item>
              <b-dropdown-item to="/customers">Customers</b-dropdown-item>
              <b-dropdown-item to="/departments">Departments</b-dropdown-item>
              <b-dropdown-item to="/employees">Employees</b-dropdown-item>
              <b-dropdown-item to="/instruments">Instruments</b-dropdown-item>
              <b-dropdown-item to="/manufacturers">Manufacturers</b-dropdown-item>
              <b-dropdown-item to="/orders">Orders</b-dropdown-item>
              <b-dropdown-item to="/products">Products</b-dropdown-item>
              <b-dropdown-item to="/productOrders">Product Orders</b-dropdown-item>
              <b-dropdown-item to="/shops">Shops</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
