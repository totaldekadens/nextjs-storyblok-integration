import Navigation from "./Navigation";
import Footer from "./Footer";
import { useStoryblokState } from "@storyblok/react";
const Layout = ({ children, locale, locales, defaultLocale, story }) => {
  story = useStoryblokState(story, {
    language: locale,
  });
  return (
    <div>
      <Navigation
        locales={locales}
        locale={locale}
        defaultLocale={defaultLocale}
        blok={story ? story.content : null}
      />
      {children}
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
