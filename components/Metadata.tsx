interface Props {
    title: string;
    description: string;
    url: string;
    ogType: "article" | "profile" | "website";
    ogSiteName?: string;
    ogLocale?: string;
    imageUrl?: string;
    disableTitleSuffix?: boolean;
}

export default function Metadata(props: Props) {
    // https://ogp.me/
    const titleSuffix = props.disableTitleSuffix ? "" : " | Honman Yau";

    return (
        <head>
            <title>{props.title + titleSuffix}</title>
            <meta name="description" content={props.description} />
            <meta property="og:locale" content="en_AU" />
            <meta property="og:type" content={props.ogType} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:url" content={props.url} />
            <meta
                property="og:site_name"
                content={props.ogSiteName || "Honman Yau"}
            />
            {
                /* <meta
        property="og:image"
        content="https://honman.dev/og-image.png"
    />
    <meta property="og:image:width" content="1000" />
    <meta property="og:image:height" content="500" />
    <meta property="og:image:type" content="image/png" /> */
            }
        </head>
    );
}
