interface FeaturesData {
  id: number;
  img: string;
  title: string;
  paragraph: string;
  link: string;
}

const featuresData: FeaturesData[] = [
  {
    id: 1,
    img: "/images/prompt2image.jpg",
    title: "Prompt Generate Images",
    paragraph:
      "Generate images from your prompt and share them with your friends.",
    link: "/prompt2image",
  },
];

export default featuresData;
