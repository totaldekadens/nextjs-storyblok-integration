import Navigation from "./Navigation";
import Footer from "./Footer";
const Layout = ({ children, locale, locales, defaultLocale, story }) => {
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
