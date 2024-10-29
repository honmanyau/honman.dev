/**
 * Get a user's data through GitHub with the access token of an active session.
 * {@link https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28}
 */
export async function getGitHubOauthUser(accessToken: string) {
	const response = await fetch("https://api.github.com/user", {
		headers: {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${accessToken}`,
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});

	const user = await response.json();

	return {
		id: user.id,
		username: user.login,
		name: user.name,
		email: user.email,
	} as const;
}
