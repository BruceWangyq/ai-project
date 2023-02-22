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
    title: "Make pictures with words",
    paragraph:
      "Generate images from your prompt using stable diffusion models.",
    link: "/prompt2image",
  },
  {
    id: 2,
    img: "/images/age_transform.jpg",
    title: "Age Progression",
    paragraph: "See yourself in the future using Replicate API",
    link: "/transform",
  },
  {
    id: 3,
    img: "/images/grammar_correction.jpg",
    title: "Correct Grammar Mistakes",
    paragraph: "Correct grammar mistakes in your text using GPT-3",
    link: "/grammar",
  },
];

export default featuresData;
