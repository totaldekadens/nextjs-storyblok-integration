import "../styles/globals.css";
import {
  storyblokInit,
  apiPlugin,
  useStoryblokState,
  getStoryblokApi,
} from "@storyblok/react";
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
import { useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    const getAllStoriesAndUpdateLocales = async () => {
      const storyblokApi = getStoryblokApi();
      const spaceId = "196581";
      const defaultLang = "en"; // Default language

      // Removes default language from locales
      const filteredLang = pageProps.locales.filter((l) => l !== defaultLang);

      // Get all stories
      let { data } = await storyblokApi.get(`cdn/stories/`, {
        version: "draft",
        language: defaultLang,
        resolve_links: "url",
      });

      // Gets list of all story ids
      const storyIds = data.stories.map((story) => story.id);

      /* 
      #1 Loops through all Ids, 
      #2 GETs all translateable objects from Storyblok, 
      #3 POSTs object to laravel/TobbeTranslate, 
      #4 Receives a response from Laravel (Translated object), 
      #5 POSTs translated object to Storyblok 
      */

      // #1
      for (let i = 0; i < storyIds.length; i++) {
        let id = storyIds[i];
        // #2
        let { data } = await Storyblok.get(
          `spaces/${spaceId}/stories/${id}/export.json?lang_code=${defaultLang}&export_lang=true`
        );
        // #3
        // POST object to Tobbe translate/Laravel
        //console.log({ data, id, spaceId, toLang: pageProps.locales });

        // #4
        // Receive Translated objects and POST to Storyblok for each country. Testing on one story.
        //console.log({ data, id, spaceId, toLang: filteredLang });
        if (id == 258991850) {
          // #5
          console.log({ data, id, spaceId, toLang: filteredLang });

          // Mockup data. Represents "data" we get back from laravel
          const json = {
            "83266319-7946-4ecd-b2ed-a51b8c17c08b:all-articles:title":
              "TEST fhfhbrhgbrj", // Test data
            language: "es",
            page: "258991850",
            text_nodes: 0,
            url: "blog/",
          };

          // What we need from laravel to be able to POST back translated objects to Storyblock
          console.log({ json, id, spaceId });

          // Updates story with specific language
          axios({
            url: `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories/${id}/import.json?lang_code=${json.language}`,
            method: "put",
            headers: {
              Authorization: process.env.storyblockOathToken,
            },
            data: { data: JSON.stringify(json) },
          });
        }
      }
    };
    const updateStoryblock = async () => {};
    updateStoryblock();
    getAllStoriesAndUpdateLocales();
  }, [pageProps.locale]);

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
