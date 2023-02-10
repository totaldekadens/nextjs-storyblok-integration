import Head from "next/head";
import Layout from "../components/Layout";
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
export default function Page({
  story,
  config,
  locales,
  locale,
  defaultLocale,
}) {
  story = useStoryblokState(story, {
    language: locale,
  });
  return (
    <div>
      <Head>
        <title>{story ? story.name : "My Site"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        locales={locales}
        locale={locale}
        defaultLocale={defaultLocale}
        story={config}
      >
        <StoryblokComponent blok={story.content} locale={locale} />
      </Layout>
    </div>
  );
}
export async function getStaticProps({
  params,
  locales,
  locale,
  defaultLocale,
}) {
  let slug = params.slug ? params.slug.join("/") : "home";
  let sbParams = {
    version: "draft", // or 'published'
    language: locale,
    resolve_links: "url",
  };
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  let { data: config } = await storyblokApi.get("cdn/stories/config");
  return {
    props: {
      locales,
      locale,
      defaultLocale,
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      config: config ? config.story : false,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths({ locales }) {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/", {
    version: "draft",
  });
  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
      return;
    }
    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");

    for (const locale of locales) {
      paths.push({ params: { slug: splittedSlug }, locale });
    }
  });
  return {
    paths: paths,
    fallback: false,
  };
}
