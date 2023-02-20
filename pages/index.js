import Head from "next/head";
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Home({ story, locale }) {
  story = useStoryblokState(story, {
    resolveRelations: ["popular-articles.articles"], // Populates relationships ( Without it = you only get Ids )
    language: locale,
    resolve_links: "url",
  });

  return (
    <div>
      <Head>
        <title>Next.js - Storyblok Integration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StoryblokComponent blok={story.content} locale={locale} />
    </div>
  );
}

export async function getStaticProps({ locales, defaultLocale, locale }) {
  let slug = "home";
  let sbParams = {
    version: "draft", // or 'published'
    resolve_relations: ["popular-articles.articles"], // Populates relationships ( Without it = you only get Ids )
    language: locale,
    resolve_links: "url",
  };

  // Gets the story "Home" from Storyblok
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  let { data: navigation } = await storyblokApi.get(
    "cdn/stories/navigation",
    sbParams
  );

  return {
    props: {
      locales,
      locale,
      defaultLocale,
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      navigation: navigation ? navigation.story : false,
    },
    revalidate: 3600,
  };
}
