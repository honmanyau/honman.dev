import { type PageProps } from "$fresh/server.ts";

export default function App(props: PageProps) {
	return (
		<html>
			<head>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>Honman Yau</title>
				<script type="module" src="/snowbell.js"></script>
				<link rel="stylesheet" href="/styles.css" />
				<link rel="stylesheet" href="/syntax-highlight.css" />
			</head>
			<body>
				<props.Component />
			</body>
		</html>
	);
}
