import type { PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";

export default function Home(_props: PageProps) {
	const count = useSignal(3);

	return <></>;
}
