import React, { useState } from "react";
import { MContainer } from "../styledComponent";
import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Segment,
} from "semantic-ui-react";
import { css, jsx } from "@emotion/react";
import authProvider from "./authProvider";
import { auth, githubProvider, googleProvider } from "../../firebase";
import { Link } from "react-router-dom";
export default function Login() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState();

    const loginWithGithub = async () => {
        setSubmitting("github");
        await authProvider(githubProvider, null, setServerError);
        setSubmitting(false);
    };

    const loginWithGoogle = async () => {
        setSubmitting("google");
        await authProvider(googleProvider, null, setServerError);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(null);
        const { email, password } = e.target;

        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.value)) {
            setServerError(new Error("Invalid email"));
            console.log("FAIL MAIL");
            return;
        }

        try {
            const userRef = await auth.signInWithEmailAndPassword(
                email.value,
                password.value
            );
            console.log("Login -> userRef", userRef);
        } catch (error) {
            setServerError(error);
        }
    };
    return (
        <MContainer>
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as={"h1"} color={"teal"} textAlign={"center"}>
                        <Icon name="code branch" color="teal" />
                        Login to chat
                    </Header>
                    <Form noValidate size={"large"} onSubmit={handleSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name={"email"}
                                type={"email"}
                                icon={"mail"}
                                iconPosition={"left"}
                                placeholder={"Email"}
                            />
                            <Form.Input
                                fluid
                                name={"password"}
                                type={"password"}
                                icon={"lock"}
                                iconPosition={"left"}
                                placeholder={"Password"}
                            />

                            {serverError && (
                                <Message negative>
                                    <Message.Header>
                                        {serverError.message}
                                    </Message.Header>
                                </Message>
                            )}
                            <Button
                                style={{ marginTop: "1rem" }}
                                color="teal"
                                icon={
                                    <Icon
                                        name="globe"
                                        css={css`
                                            border-right: 3px solid white;
                                        `}
                                    />
                                }
                                loading={submitting === "register"}
                                disabled={!!submitting}
                                fluid
                                labelPosition="left"
                                content="Login"
                                type="submit"
                            />
                            <Button
                                style={{ marginTop: "1rem" }}
                                secondary
                                icon={
                                    <Icon
                                        name="github"
                                        css={css`
                                            border-right: 3px solid white;
                                        `}
                                    />
                                }
                                loading={submitting === "github"}
                                disabled={!!submitting}
                                fluid
                                labelPosition="left"
                                content="Login with github"
                                type="submit"
                                onClick={loginWithGithub}
                            />

                            <Button
                                style={{ marginTop: "1rem" }}
                                color="google plus"
                                icon={
                                    <Icon
                                        name="google"
                                        css={css`
                                            border-right: 3px solid white;
                                        `}
                                    />
                                }
                                loading={submitting === "google"}
                                disabled={!!submitting}
                                fluid
                                labelPosition="left"
                                content="Login with Google"
                                onClick={loginWithGoogle}
                            />
                        </Segment>
                    </Form>
                    <Message>
                        Need to register? <Link to="/register">Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </MContainer>
    );
}
