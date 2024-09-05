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
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const ImageGeneration = () => {
  const [image, setImage] = useState();
  const [prompt, setPrompt] = useState();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [caption, setCaption] = useState("");
  const [generatedImage, setGeneratedImage] = useState(); // State to hold the generated image
  const [file, setFile] = useState(null); // State for file upload
  const [enhance, setEnhance] = useState(false); // State for enhancement checkbox
  const [error, setError] = useState(""); // State for error handling

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
      setGeneratedImage(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error generating image:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      setFile(null);
      return;
    }
    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size should not exceed 2 MB.");
      setFile(null);
      return;
    }
    setFile(file);
    setError("");
  };

  const handleGenerateSummary = async () => {
    if (!file && !generatedImage) {
      alert("Please generate or upload an image before generating a summary.");
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else if (generatedImage) {
      const response = await fetch(`data:image/png;base64,${generatedImage}`);
      const blob = await response.blob();
      formData.append("file", blob, "generated_image.png");
    }
    formData.append("enhance", enhance);

    try {
      const result = await axios.post(
        "http://localhost:8000/generate-summary/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSummary(result.data.summary);
    } catch (error) {
      setError(
        "Error generating summary: " +
          (error.response?.data?.message || "Server error")
      );
    }
  };

  const handleGenerateCaption = async () => {
    if (!file && !generatedImage) {
      alert("Please generate or upload an image before generating a caption.");
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else if (generatedImage) {
      const response = await fetch(`data:image/png;base64,${generatedImage}`);
      const blob = await response.blob();
      formData.append("file", blob, "generated_image.png");
    }
    formData.append("enhance", enhance);

    try {
      const result = await axios.post(
        "http://localhost:8000/generate-caption/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCaption(result.data.caption);
    } catch (error) {
      setError(
        "Error generating caption: " +
          (error.response?.data?.message || "Server error")
      );
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
            onClick={() => generate(prompt)}
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
        ) : generatedImage ? (
          <Image
            src={`data:image/png;base64,${generatedImage}`}
            boxShadow="lg"
          />
        ) : null}

        {error && (
          <Text color="red.500" mt={4}>
            {error}
          </Text>
        )}

        {generatedImage && (
          <>
            <Button
              className="mt-4"
              onClick={handleGenerateSummary}
              colorScheme={"yellow"}
            >
              Generate Summary
            </Button>
            <Button
              className="mt-4 ml-4"
              onClick={handleGenerateCaption}
              colorScheme={"teal"}
            >
              Generate Caption
            </Button>
          </>
        )}

        {summary && (
          <Text className="mt-6 p-4 border border-yellow-500 rounded-lg bg-yellow-50 shadow-md">
            <strong>Generated Summary:</strong>
            <p>{summary}</p>
          </Text>
        )}

        {caption && (
          <Text className="mt-6 p-4 border border-green-500 rounded-lg bg-green-50 shadow-md">
            <strong>Generated Caption:</strong>
            <p>{caption}</p>
          </Text>
        )}
      </Container>
    </ChakraProvider>
  );
};

export default ImageGeneration;
