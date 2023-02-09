import { storyblokEditable } from "@storyblok/react";
// Represents "Teaser"-block in Storyblok (Nestable Block)
const Teaser = ({ blok }) => {
  return (
    <h2 className="text-2xl mb-10" {...storyblokEditable(blok)}>
      {blok.headline}
    </h2>
  );
};

export default Teaser;
