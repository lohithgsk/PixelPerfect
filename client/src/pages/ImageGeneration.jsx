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
  Flex,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

const ImageGeneration = () => {
  const [image, setImage] = useState();
  const [prompt, setPrompt] = useState();
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingCaption, setLoadingCaption] = useState(false);
  const [summary, setSummary] = useState("");
  const [caption, setCaption] = useState("");
  const [generatedImage, setGeneratedImage] = useState();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const [uploadResponse, setUploadResponse] = useState("");

  const generate = async (prompt) => {
    if (!prompt || prompt.trim() === "") {
      alert("Please enter a prompt before generating an image.");
      return;
    }
    try {
      setLoadingImage(true);
      setSummary("");
      setCaption("");
      setLoadingSummary(false);
      setLoadingCaption(false);

      const result = await axios.post(
        `http://localhost:8000/generate-image/`,
        new URLSearchParams({ prompt })
      );
      setGeneratedImage(result.data);
      setLoadingImage(false);
    } catch (error) {
      console.error("Error generating image:", error);
      setLoadingImage(false);
    }
  };

  const handleUpload = async () => {
    if (!generatedImage) {
      setImageError(true);
      return;
    }

    try {
      const response = await fetch(`data:image/png;base64,${generatedImage}`);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("file", blob, "generated_image.png");
      formData.append(
        "summary",
        summary || "this is an example summary for this image"
      );
      formData.append("caption", caption || "");
      formData.append("flags", "None");

      const uploadRes = await axios.post(
        "http://localhost:8000/upload_image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadResponse(uploadRes.data.response);
      setError("");
      alert("Image uploaded successfully!");
    } catch (error) {
      setError(
        "Error uploading image: " +
          (error.response?.data?.detail || "Server error")
      );
    }
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

    try {
      setLoadingSummary(true);
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
      setLoadingSummary(false);
    } catch (error) {
      setError(
        "Error generating summary: " +
          (error.response?.data?.message || "Server error")
      );
      setLoadingSummary(false);
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

    try {
      setLoadingCaption(true);
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
      setLoadingCaption(false);
    } catch (error) {
      setError(
        "Error generating caption: " +
          (error.response?.data?.message || "Server error")
      );
      setLoadingCaption(false);
    }
  };

  return (
    <ChakraProvider>
      <motion.div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8 bg-gradient-to-l from-purple-500 via-blue-400 to-violet-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container maxW="container.xl" py={5}>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={4}
            p={4}
            bg={"white"}
            borderRadius="xl"
          >
            {/* Left Section */}
            <Box flex="1" p={4}>
              {" "}
              {/* Adds padding to the Box */}
              <Heading
                mb={4}
                bgGradient="linear(to-l, pink.600, purple.500, blue.600)"
                bgClip="text"
                size="2xl"
                lineHeight="2"
              >
                Image Generation
              </Heading>
              <Text className="text-black text-2xl m-4 ml-0">
                Enter a prompt in the input box below to generate a unique image
                based on your description. Once submitted, the PixelPerfect-AI
                will create and display the corresponding image in real-time.
                Explore your creativity and visualize your ideas instantly!
              </Text>
              <Text className="m-2 text-xl ml-0 text-gray-500">
                <strong>Note:</strong> Detailed prompts create better images!!
              </Text>
              <Wrap mb={4} p={2}>
                {" "}
                {/* Adds padding to Wrap */}
                <Input
                  className="placeholder-gray-400 bg-slate-700 m-1 ml-0 focus:outline f rounded-lg border  text-lg text-gray-100"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  width={"450px"}
                  placeholder="Enter your prompt here.."
                  textColor={"black"}
                />
                <Button
                  className="mt-1"
                  onClick={() => generate(prompt)}
                  bg="#df72ed"
                  width={"120px"}
                  textColor={"white"}
                >
                  Generate
                </Button>
              </Wrap>
              <Text className="text-xl text-gray-500 ml-0 m-2 mb-6">
                Max estimated time for generation: 45 secs for all prompts
              </Text>
              {generatedImage && (
                <>
                  <Wrap>
                    <Button
                      className="mt-4 ml-0"
                      width={"200px"}
                      onClick={handleGenerateSummary}
                      colorScheme={"blue"}
                    >
                      Generate Summary
                    </Button>

                    <Button
                      className="mt-4 ml-4"
                      onClick={handleGenerateCaption}
                      colorScheme={"teal"}
                      width={"200px"}
                    >
                      Generate Caption
                    </Button>
                  </Wrap>
                  <Wrap>
                    <Button
                      className="mt-8 ml-0"
                      onClick={handleUpload}
                      colorScheme={"blue"}
                      width={"170px"}
                    >
                      Upload
                    </Button>
                  </Wrap>
                  {uploadResponse && (
                    <Text
                      className="mt-6 p-4 border border-green-500 rounded-lg bg-green-50 shadow-md"
                      mb={4}
                    >
                      <strong>Success:</strong>
                      <p>{uploadResponse}</p>
                    </Text>
                  )}
                </>
              )}
            </Box>

            <Box flex="1" p={4}>
              {" "}
              {/* Adds padding to the right Box */}
              {loadingImage ? (
                <Stack>
                  <SkeletonCircle size="12" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Stack>
              ) : generatedImage ? (
                <Image
                  src={`data:image/png;base64,${generatedImage}`}
                  boxShadow="lg"
                  mb={4}
                  borderRadius="md"
                  p={2} // Adds padding to the image
                />
              ) : null}
              {loadingSummary ? (
                <Stack mt={4}>
                  <SkeletonCircle size="12" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Stack>
              ) : summary ? (
                <Text
                  className="mt-6 p-4 border border-yellow-500 rounded-lg bg-violet-200 shadow-md bg-opacity-60 text-xl "
                  mb={4}
                >
                  <strong>Generated Summary:</strong>
                  <p className="text-xl p-2">{summary}</p>
                </Text>
              ) : null}
              {loadingCaption ? (
                <Stack mt={4}>
                  <SkeletonCircle size="12" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Stack>
              ) : caption ? (
                <Text className="mt-6 p-4 border border-green-500 rounded-lg bg-blue-100 bg-opacity-60 shadow-md text-xl">
                  <strong>Generated Caption:</strong>
                  <p className="text-xl p-2">{caption}</p>
                </Text>
              ) : null}
              {error && (
                <Text color="red.500" mt={4}>
                  {error}
                </Text>
              )}
            </Box>
          </Flex>
        </Container>
      </motion.div>
    </ChakraProvider>
  );
};

export default ImageGeneration;
