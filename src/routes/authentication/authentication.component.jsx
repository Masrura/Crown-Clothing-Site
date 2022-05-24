// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss'


const Authentication = () => {
    //testing google sin in with redirect commented
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     //console.log(response);
    //     if (response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // }, [])
   
    return (
        <div className="authentication-container">
           <SignInForm/>
            <SignUpForm/>
            {/* <button onClick={signInWithGoogleRedirect}> Sign in with google redirect</button> */}
        </div>
    )
}

export default Authentication