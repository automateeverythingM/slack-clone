import React from "react";
import { useHistory } from "react-router";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { auth } from "../../firebase";

export default function UserProfile({ user }) {
    const history = useHistory();

    const handleSighOut = () => {
        auth.signOut();
        history.push("/login");
    };

    const dropdownOptions = () => [
        {
            key: "user",
            text: (
                <span>
                    Signed in as <strong>{user.displayName}</strong>
                </span>
            ),
            disabled: true,
        },
        {
            key: "changeAvatar",

            text: <span>Change Avatar</span>,
        },
        {
            key: "SignOut",
            text: <span onClick={handleSighOut}>Sign out</span>,
        },
    ];
    return (
        <Grid style={{ background: "#4c3c4c" }}>
            <Grid.Column>
                <Grid.Row style={{ padding: "1.2rem", margin: 0 }}>
                    <Header inverted floated={"left"} as={"h2"}>
                        <Icon name={"code"} />
                        <Header.Content>DevChat</Header.Content>
                    </Header>
                </Grid.Row>
                <Header style={{ padding: "0.25em" }} as={"h4"} inverted>
                    <Dropdown
                        trigger={
                            <>
                                <Image
                                    src={user.photoURL}
                                    spaced={"right"}
                                    avatar
                                />
                                <span>{user.displayName}</span>
                            </>
                        }
                        options={dropdownOptions()}
                    />
                </Header>
            </Grid.Column>
        </Grid>
    );
}
