import Head from "next/head";
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
import Layout from "../components/Layout";

export default function Home({ story }) {
  story = useStoryblokState(story, {
    resolveRelations: ["popular-articles.articles"], // Populates relationships ( Without it = you only get Ids )
  });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <StoryblokComponent blok={story.content} />
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  let slug = "home";
  let sbParams = {
    version: "draft", // or 'published'
    resolve_relations: ["popular-articles.articles"], // Populates relationships ( Without it = you only get Ids )
  };

  // Gets the story "Home" from Storyblok
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}
