import React from "react";
import { Menu } from "semantic-ui-react";
import UserProfile from "./UserProfile";
import Channels from "./Channels";
import { connect } from "react-redux";

function SidePanel({ user }) {
    return (
        <Menu
            size="large"
            inverted
            fixed={"left"}
            vertical
            style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
        >
            <UserProfile user={user} />
            <Channels user={user} />
        </Menu>
    );
}

const mapStateToProps = (state) => ({ user: state.user.user });

export default connect(mapStateToProps)(SidePanel);
