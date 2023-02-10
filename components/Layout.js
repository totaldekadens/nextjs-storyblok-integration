import Navigation from "./Navigation";
import Footer from "./Footer";
const Layout = ({ children, locale, locales, defaultLocale }) => {
  console.log(locale);
  console.log(locales);
  return (
    <div>
      <Navigation
        locales={locales}
        locale={locale}
        defaultLocale={defaultLocale}
      />
      {children}
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
