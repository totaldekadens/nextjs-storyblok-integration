import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import StoryblokClient from "storyblok-js-client";
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Page from "../components/Page";
import Teaser from "../components/Teaser";
import Hero from "../components/Hero";
import Article from "../components/Article";
import AllArticles from "../components/AllArticles";
import PopularArticles from "../components/PopularArticles";
import Layout from "../components/Layout";
import HeaderMenu from "../components/HeaderMenu";
import MenuLink from "../components/MenuLink";
import Navigation from "../components/Navigation";

// Connects a component to a blok from Storyblok
const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  hero: Hero,
  "all-articles": AllArticles,
  article: Article,
  "popular-articles": PopularArticles,
  config: Navigation,
  layout: Layout,
  header_menu: HeaderMenu,
  menu_link: MenuLink,
};

// Connection Storyblok Content API
storyblokInit({
  accessToken: process.env.storyblokApiToken,
  use: [apiPlugin],
  components,
});
// Connection Storyblok Management API
const Storyblok = new StoryblokClient({
  oauthToken: process.env.storyblockOathToken,
});

function MyApp({ Component, pageProps }) {
  let config = pageProps.config;

  return (
    <Layout
      locales={pageProps.locales}
      locale={pageProps.locale}
      defaultLocale={pageProps.defaultLocale}
      story={config}
    >
      <Component {...pageProps} />
    </Layout>
  );
}

export async function getStaticProps({ locales, defaultLocale, locale }) {
  return {
    props: {
      locales,
      locale,
      defaultLocale,
    },
    revalidate: 3600,
  };
}

export default MyApp;
