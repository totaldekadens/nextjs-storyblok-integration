import Navigation from "./Navigation";
import Config from "./Config";
import Footer from "./Footer";
const Layout = ({ children, locale, locales, defaultLocale, story }) => {
  //console.log(locale);
  console.log(story);
  return (
    <div>
      <Navigation
        locales={locales}
        locale={locale}
        defaultLocale={defaultLocale}
        blok={story.content}
      />
      {/* <Config blok={story.content} /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
