import { auth, firestore } from "../../firebase";

export default function getUserWithProvider(provider, dispatch, setError) {
    return auth
        .signInWithPopup(provider)
        .then()
        .catch((error) => {
            setError(error.message);
        });
}
