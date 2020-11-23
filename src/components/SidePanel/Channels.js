import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
    Icon,
    MenuItem,
    MenuMenu,
    Modal,
    Form,
    Input,
    Button,
} from "semantic-ui-react";
import { database } from "../../firebase";
import { setCurrentChannel } from "../../store/actions/channelActions";

function Channels({ user, dispatch }) {
    const [channels, setChannels] = useState({});
    const [channelRef] = useState(database.ref("channels"));
    const [modal, setModal] = useState(false);
    const channelsLength = useMemo(() => {
        console.log("reRenderChannels");

        return channels ? Object.keys(channels).length : 0;
    }, [channels]);
    // const channelsLength = channels ? Object.keys(channels).length : 0;

    useEffect(() => {
        addListeners();
    }, []);

    useEffect(() => {
        // console.log("Channels -> channels", channels);
    });

    const onLoadSelectFirstChannel = () => {
        if (channelsLength > 0) {
            addCurrentChannelToGlobal(Object.keys(channels)[0]);
        }
    };

    const displayChannelsNow = () => {
        return Object.keys(channels).map((channel) => {
            const { key, name } = channels[channel];

            return (
                <MenuItem
                    key={key}
                    name={name}
                    onClick={() => addCurrentChannelToGlobal(channels[channel])}
                    style={{ opacity: "0.7" }}
                >
                    #{name}
                </MenuItem>
            );
        });
    };

    const addListeners = async () => {
        let loadedChannels;
        channelRef.on("value", (snap) => {
            loadedChannels = snap.val();
            setChannels(loadedChannels);
            onLoadSelectFirstChannel();
        });
    };

    const handleModalClose = () => {
        setModal(false);
    };

    const handleModalOpen = () => {
        setModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            channelName: { value: name },
            channelDetail: { value: details },
        } = e.target;
        setModal(false);

        if (isFormValid(name, details)) {
            addChannel(name, details);
        }
    };

    const addChannel = (name, details) => {
        const key = channelRef.push().key;
        const newChannel = {
            key,
            name,
            details,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL,
            },
        };

        channelRef
            .child(key)
            .update(newChannel)
            .then(() => {
                handleModalClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const isFormValid = (name, detail) => {
        return name.trim().length && detail.trim().length;
    };

    const addCurrentChannelToGlobal = (channel) => {
        dispatch(setCurrentChannel(channel));
    };

    return (
        <>
            <MenuMenu style={{ paddingBottom: "2em" }}>
                <MenuItem>
                    <span>
                        <Icon name="exchange" /> Channels
                    </span>{" "}
                    ({channelsLength})
                    <Icon name="add" onClick={handleModalOpen} />
                </MenuItem>
                {!!channelsLength && displayChannelsNow()}
            </MenuMenu>

            <Modal basic open={modal} onClose={handleModalClose}>
                <Modal.Header>Add a Channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <Input
                                fluid
                                label="Name of Channel"
                                name="channelName"
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                fluid
                                label="About the Channel"
                                name="channelDetail"
                            />
                        </Form.Field>
                        <Modal.Actions>
                            <Button color="green" inverted type="submit">
                                <Icon name="checkmark" />
                                Add
                            </Button>
                            <Button
                                color="red"
                                inverted
                                onClick={handleModalClose}
                            >
                                <Icon name="cancel" />
                                Cancel
                            </Button>
                        </Modal.Actions>
                    </Form>
                </Modal.Content>
            </Modal>
        </>
    );
}

export default connect()(Channels);
