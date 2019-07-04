import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
  // NavLink
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../action/auth";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const navbarForAnonymous = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </NavItem>
      </Nav>
    );

    const navbarForLogedInUser = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </NavItem>
        <NavItem>
          <Link onClick={this.props.logOut} className="nav-link" to="/login">
            LogOut
          </Link>
        </NavItem>
      </Nav>
    );
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {isAuthenticated ? navbarForLogedInUser : navbarForAnonymous}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logOut }
)(Header);
