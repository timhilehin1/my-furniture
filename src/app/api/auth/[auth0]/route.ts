import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
	login: handleLogin({
		returnTo: "/",
		authorizationParams: {
			prompt: "login",
		},
	}),
	signup: handleLogin({
		authorizationParams: {
			screen_hint: "signup",
			prompt: "login",
		},
		returnTo: "/",
	}),
	logout: handleLogout({
		returnTo: "/",
	}),
});
