import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";

import LoginScreen from "@/routes/LoginScreen";
import Spinner from "@/components/spinner";

import {auth, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged, signOut } from "@/firebase"
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/lib/interfaces";
import { AuthContext } from "@/contexts";

export default function Root(){
	const [isLoading, setIsLoading] = useState(true);
	const [processingLink, setProcessingLink] = useState(false);
	const [user, setUser] = useState({uid: null, email: null, isAuthenticated: false} as User);

	const { toast } = useToast();

	useEffect(() => {
		if (isSignInWithEmailLink(auth, window.location.href)) {
			setProcessingLink(true);
			// Additional state parameters can also be passed via URL.
			// This can be used to continue the user's intended action before triggering
			// the sign-in operation.
			// Get the email if available. This should be available if the user completes
			// the flow on the same device where they started it.
			let email = window.localStorage.getItem('emailForSignIn');
			if (!email) {
				// User opened the link on a different device. To prevent session fixation
				// attacks, ask the user to provide the associated email again. For example:
				email = window.prompt('Please provide your email for confirmation');
			}

			if(email != null){
				// The client SDK will parse the code from the link for you.
				signInWithEmailLink(auth, email, window.location.href).then(() => {
					window.localStorage.removeItem('emailForSignIn');
					setProcessingLink(false);
				}).catch((error) => {
					toast({
						title: "Error code " + error.code,
						description: error.message
					});
					setProcessingLink(false);
				});		  
			}
		}else{
			setProcessingLink(false);
		}

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				setUser({
					uid: user.uid,
					email: user.email,
					isAuthenticated: true
				});
			} else {
				// User is signed out
				setUser({
					uid: null,
					email: null,
					isAuthenticated: false
				});
			}
			
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	function handleSignOutClick(){
		signOut(auth).then(() => {
			// Sign-out successful.
		}).catch((error) => {
			// An error happened.
			toast({title: "Error " + error.code, description: error.message});
		});
	}

	if(isLoading){
		return (
			<>
				<div className="w-full h-full flex items-center justify-center p-4 bg-slate-50">					
					<Spinner />
				</div>
			</>
		)
	}

	if(!user.isAuthenticated){
		return (
			<>
				<LoginScreen processingLink={processingLink}></LoginScreen>
				<Toaster duration="5000" />
			</>
		)
	}

	return (
		<AuthContext.Provider value={{user: user, handleSignOutClick: handleSignOutClick}}>
			<Outlet></Outlet>
			<Toaster duration="5000" />
		</AuthContext.Provider>
	)
}