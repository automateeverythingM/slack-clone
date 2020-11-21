import { auth } from "../../firebase";
import saveUserToDatabase from "./saveUserToDatabase";
export default function getUserWithProvider(provider, dispatch, setError) {
    return auth
        .signInWithPopup(provider)
        .then((userRef) => {
            console.log("getUserWithProvider -> userRef", userRef);
            const { user, additionalUserInfo } = userRef;

            if (additionalUserInfo.isNewUser) {
                saveUserToDatabase(
                    user,
                    additionalUserInfo.profile,
                    additionalUserInfo.providerId
                );
            }
        })
        .catch((error) => {
            setError(error);
        });
}
