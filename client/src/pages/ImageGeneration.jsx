import {
  ChakraProvider,
  Container,
  Heading,
  Wrap,
  Input,
  Button,
  Image,
  Text,
  Stack,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const ImageGeneration = () => {
  const [image, setImage] = useState();
  const [prompt, setPrompt] = useState();
  const [loading, setLoading] = useState();

  const generate = async (prompt) => {
    if (!prompt || prompt.trim() === "") {
      alert("Please enter a prompt before generating an image.");
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post(
        `http://localhost:8000/generate-image/`,
        new URLSearchParams({ prompt })
      );
      setImage(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error generating image:", error);
      setLoading(false);
    }
  };
  return (
    <ChakraProvider>
      <Container>
        <Heading>Image Generation</Heading>
        <Text className="text-black text-lg m-3 ml-0">
          Enter a prompt in the input box below to generate a unique image based
          on your description. Once submitted, the PixelPerfect-AI will create
          and display the corresponding image in real-time. Explore your
          creativity and visualize your ideas instantly!"
        </Text>
        <Text className="m-2 text-md ml-0 text-gray-500">
          <strong>Note:</strong> Detailed prompts create better images!!
        </Text>
        <Wrap>
          <Input
            className="bg-slate-700 m-1 ml-0 focus:outline focus:outline-yellow-500 rounded-lg border border-yellow-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            width={"350px"}
            placeholder="Prompt.."
          ></Input>
          <Button
            className="mt-1"
            onClick={(e) => generate(prompt)}
            colorScheme={"yellow"}
          >
            Generate
          </Button>
        </Wrap>
        <Text className="text-sm text-gray-500 ml-0 m-2 mb-6">
          Max estimated time for generation: 45secs for all prompts
        </Text>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
      </Container>
    </ChakraProvider>
  );
};

export default ImageGeneration;
