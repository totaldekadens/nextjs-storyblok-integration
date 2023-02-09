import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
// Represents "Grid"-block in Storyblok (Nestable Block)
const Grid = ({ blok }) => {
  return (
    <div className="grid grid-cols-3" {...storyblokEditable(blok)}>
      {blok.columns.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Grid;
