import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
// Represents "Page"-block in Storyblok (Content Type Block)
const Page = ({ blok }) => (
  <main className="text-center mt-4" {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Page;
