/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Icon,
    Message,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MContainer } from "../styledComponent";
import { auth, githubProvider, googleProvider } from "../../firebase";
import authProvider from "./authProvider";
import md5 from "md5";
import { database } from "../../firebase";

export default function Register() {
    const { register, handleSubmit, errors, getValues, reset } = useForm();
    const [serverError, setServerError] = useState();
    const [submitting, setSubmitting] = useState(false);

    const handleOnSubmit = async (data) => {
        setServerError(null);
        setSubmitting("register");
        const { email, password, username } = data;
        try {
            const userRef = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            const { user, additionalUserInfo } = userRef;

            await updateUser(userRef, username, email);
            await saveUser(user, additionalUserInfo.providerId);
        } catch (error) {
            console.log("handleOnSubmit -> error", error);
            setServerError(error);
        }

        setSubmitting(false);
    };

    const updateUser = (userRef, username, email) => {
        const url = `http://www.gravatar.com/avatar/${md5(email)}?d=identicon`;

        return userRef.user.updateProfile({
            displayName: username,
            photoURL: url,
        });
    };

    const saveUser = (user, provider) => {
        return database.ref("users").child(user.uid).set({
            name: user.displayName,
            avatar_url: user.photoURL,
            email: user.email,
            provider,
        });
    };

    const signUpWithGoogle = async () => {
        setSubmitting("google");
        await authProvider(googleProvider, null, setServerError);
        setSubmitting(false);
    };

    const signUpWithGithub = async () => {
        setSubmitting("github");
        await authProvider(githubProvider, null, setServerError);
        setSubmitting(false);
    };

    return (
        <MContainer>
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        <Icon name="puzzle piece" color="teal" />
                        Register for chat
                    </Header>
                    <Form size="large" onSubmit={handleSubmit(handleOnSubmit)}>
                        <Segment stacked>
                            <div
                                css={css`
                                    margin-bottom: ${errors.username && 0};
                                `}
                                className="field"
                            >
                                <div className="ui fluid left icon input">
                                    <input
                                        name="username"
                                        placeholder="Username"
                                        type="text"
                                        ref={register({
                                            required: "Username is required",
                                            minLength: {
                                                value: 5,
                                                message:
                                                    "Username minimum length is 5 characters",
                                            },
                                        })}
                                    />
                                    <i
                                        aria-hidden="true"
                                        className="user icon"
                                    ></i>
                                </div>
                                {errors?.username && (
                                    <div
                                        css={css`
                                            color: red;
                                            font-size: 0.8rem;
                                        `}
                                    >
                                        {errors.username.message}
                                    </div>
                                )}
                            </div>
                            <div
                                css={css`
                                    margin-bottom: ${errors.email && 0};
                                `}
                                className="field"
                            >
                                <div className="ui fluid left icon input">
                                    <input
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        ref={register({
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                                message:
                                                    "Please enter valid email address",
                                            },
                                        })}
                                    />
                                    <i
                                        aria-hidden="true"
                                        className="mail icon"
                                    ></i>
                                </div>
                                {errors?.email && (
                                    <div
                                        css={css`
                                            color: red;
                                            font-size: 0.8rem;
                                        `}
                                    >
                                        {errors.email.message}
                                    </div>
                                )}
                            </div>
                            <div
                                css={css`
                                    margin-bottom: ${errors.password && 0};
                                `}
                                className="field"
                            >
                                <div className="ui fluid left icon input">
                                    <input
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        ref={register({
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Password minimum length is 8 characters",
                                            },
                                            pattern: {
                                                value:
                                                    "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/",
                                                message:
                                                    "Password must contain must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                                            },
                                        })}
                                    />
                                    <i
                                        aria-hidden="true"
                                        className="lock icon"
                                    ></i>
                                </div>
                                {errors?.password && (
                                    <div
                                        css={css`
                                            color: red;
                                            font-size: 0.8rem;
                                        `}
                                    >
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>
                            <div
                                css={css`
                                    margin-bottom: ${errors.confirmPassword &&
                                    0};
                                `}
                                className="field "
                            >
                                <div className="ui fluid left icon input">
                                    <input
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        type="password"
                                        ref={register({
                                            required: "Please confirm password",
                                            validate: (value) =>
                                                value ===
                                                    getValues().password ||
                                                "Confirm password don`t match",
                                        })}
                                    />
                                    <i
                                        aria-hidden="true"
                                        className="repeat icon"
                                    ></i>
                                </div>
                                {errors?.confirmPassword && (
                                    <div
                                        css={css`
                                            color: red;
                                            font-size: 0.8rem;
                                        `}
                                    >
                                        {errors.confirmPassword.message}
                                    </div>
                                )}
                            </div>
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
                                content="Register"
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
                                content="GitHub"
                                type="submit"
                                onClick={signUpWithGithub}
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
                                content="Google"
                                onClick={signUpWithGoogle}
                            />
                        </Segment>
                    </Form>
                    <Message>
                        Already a user? <Link to="/login">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </MContainer>
    );
}
