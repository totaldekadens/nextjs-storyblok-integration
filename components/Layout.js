import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children, locale, locales, story }) => {
  return (
    <div>
      <Navigation
        blok={story ? story.content : null}
        locale={locale}
        locales={locales}
      />
      {children}
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
