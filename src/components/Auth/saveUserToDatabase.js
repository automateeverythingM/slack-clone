import { database } from "../../firebase";

const saveUser = (user, profile, provider) => {
    return database
        .ref("users")
        .child(user.uid)
        .set({
            provider,
            ...profile,
        });
};

export default saveUser;
