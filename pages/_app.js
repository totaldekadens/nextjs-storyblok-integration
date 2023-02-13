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

// Connection
storyblokInit({
  accessToken: process.env.storyblokApiToken,
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps }) {
  // Doesn't work
  let config = pageProps.config;
  config = useStoryblokState(config, {
    language: pageProps.locale,
  });

  useEffect(() => {
    // Pushes each language to a list for comparison. List fixed, but no comaprison
    const getAllStories = async () => {
      const storyblokApi = getStoryblokApi();
      const languages = pageProps.locales;
      let list = [];
      for (let i = 0; i < languages.length; i++) {
        let lang = languages[i];
        let { data } = await storyblokApi.get(`cdn/stories/`, {
          //resolveRelations: ["popular-articles.articles"],
          version: "draft",
          language: lang,
        });

        /*         story = useStoryblokState(story, {
          resolveRelations: ["popular-articles.articles"], // Populates relationships ( Without it = you only get Ids )
          resolve_links: "url",
        }); */

        list.push(data.stories);
      }
      console.log(list);

      list.forEach((item) => {
        //console.log(item);
        item.forEach((story) => {
          if (story.content.body) {
            story.content.body.forEach((blok) => {
              //console.log(blok);
              if (blok.component == "popular-articles") {
                console.log("Behöver fixas i respektive sida istället" + blok);
                return;
              }
              if (blok.timestamp) {
                return;
                //console.log(blok); // Set timestamp!
              }
              Object.entries(blok).forEach(([key, value]) => {
                if (key.startsWith("_") || key == "component") {
                  return;
                }
                if (typeof value === "string") {
                  if (key == "timestamp" || key == "layout") {
                    return;
                  }
                  console.log(value + " skall översättas");
                  return;
                }
                //console.log(value);
                if (Array.isArray(value)) {
                  value.forEach((item) => {
                    //console.log(item);
                    Object.entries(item).forEach(([key, value]) => {
                      //console.log(key);
                      if (key.startsWith("_") || key == "component") {
                        return;
                      }
                      if (typeof value === "string") {
                        if (key == "timestamp" || key == "layout") {
                          return;
                        }
                        console.log(value + " skall översättas");
                        return;
                      }
                    });
                  });
                }
              });
            });
          }
        });
      });
    };
    const updateStoryblock = async () => {
      //const storyblokApi = getStoryblokApi();

      // Sets date and time minus 1 minute (For "schedule" with format YYYY-MM-DD HH:MM)
      const d = new Date();
      d.setMinutes(d.getMinutes() - 1);
      const todayDate = d.toISOString().slice(0, 16).replace("T", " ");
      console.log(todayDate);

      // Sets date and time (For "updated_at" with format yyyy-MM-ddTHH:mm:ss.SSSZ)
      const date = new Date(
        new Date().toString().split("GMT")[0] + " UTC"
      ).toISOString();
      console.log(date);

      // Fetches all stories by managementAPI
      let { data } = await Storyblok.get(`spaces/196581/stories/`, {});

      console.log(data);

      // Fetches one story by id
      /*  let { data } = await storyblokApi.get(`cdn/stories/258853578`, {
        version: "draft",
      }); */

      // Should be able to filter on date but it's not working. Waiting for response from Storybok
      /* let { data2 } = await storyblokApi.get(`cdn/stories/`, {
        version: "draft",
        filter_query: {
          created_at: {
            gt_date: "2023-02-02 14:16",
          },
        },
      }); */
    };
    updateStoryblock();
    getAllStories();
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
