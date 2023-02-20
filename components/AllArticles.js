import ArticleTeaser from "./ArticleTeaser";
import { getStoryblokApi, storyblokEditable } from "@storyblok/react";
import { useState, useEffect } from "react";

const AllArticles = ({ blok, locale }) => {
  // State
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Gets all articles from the "Blog"-folder in Storyblok (Nestable Block)
    const getArticles = async () => {
      let sbParams = {
        version: "draft", // or 'published'
        language: locale,
        starts_with: "blog/",
      };

      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get(`cdn/stories`, sbParams);

      const filteredArticles = data.stories.filter(
        (article) => article.name != "Home"
      );

      // Sets state and renders the ArticleTeaser below
      setArticles((prev) =>
        filteredArticles.map((article) => {
          article.content.slug = article.slug;
          return article;
        })
      );
    };
    getArticles();
  }, [locale]);
  return (
    <>
      <p className="text-3xl">{blok.title}</p>
      <div
        className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3   lg:px-24 md:px-16"
        {...storyblokEditable(blok)}
      >
        {articles[0] &&
          articles.map((article) => (
            <ArticleTeaser article={article.content} key={article.uuid} />
          ))}
      </div>
    </>
  );
};
export default AllArticles;
