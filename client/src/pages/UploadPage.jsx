import React, { useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Container,
  Box,
  Button,
  Input,
  Image,
  Text,
  Heading,
  Flex,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [caption, setCaption] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingCaption, setLoadingCaption] = useState(false);
  const [enhance, setEnhance] = useState(false);
  const [error, setError] = useState("");
  const [uploadResponse, setUploadResponse] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      setSelectedFile(null);
      return;
    }

    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size should not exceed 2 MB.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "summary",
      summary || "this an example summary for this image"
    );
    formData.append("caption", caption || "");
    formData.append("flags", "None");

    try {
      const response = await axios.post(
        "http://localhost:8000/upload_image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadResponse(response.data.response);
      alert("Image uploaded successfully!");
    } catch (error) {
      setError(
        "Error uploading image: " +
          (error.response?.data?.detail || "Server error")
      );
    }
  };

  const handleGenerateSummary = async () => {
    if (!selectedFile) {
      alert("Please select a file to generate a summary.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("enhance", enhance);

    setLoadingSummary(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/generate-summary/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.summary) {
        setSummary(response.data.summary);
        setError("");
      } else {
        setError("Failed to generate summary.");
      }
    } catch (error) {
      setError(
        "Error generating summary: " +
          (error.response?.data?.message || "Server error")
      );
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleGenerateCaption = async () => {
    if (!selectedFile) {
      alert("Please select a file to generate a caption.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("enhance", enhance);

    setLoadingCaption(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/generate-caption/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.caption) {
        setCaption(response.data.caption);
        setError("");
      } else {
        setError("Failed to generate caption.");
      }
    } catch (error) {
      setError(
        "Error generating caption: " +
          (error.response?.data?.message || "Server error")
      );
    } finally {
      setLoadingCaption(false);
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.lg" p={5}>
        <Flex
          direction={["column", "row"]}
          p={6}
          bg="white"
          rounded="lg"
          shadow="md"
          spacing={4}
          align="center"
          justify="space-between"
        >
          <Box flex="1" pr={[0, 4]} mb={[4, 0]}>
            <Heading as="h2" size="lg" mb={4}>
              Upload Photo, Generate Summary or Caption
            </Heading>

            <Input type="file" onChange={handleFileChange} mb={4} />

            <Button colorScheme="blue" onClick={handleUpload} w="full" mb={4}>
              Upload Image
            </Button>

            <Button
              colorScheme="yellow"
              onClick={handleGenerateSummary}
              w="full"
              mb={4}
              isLoading={loadingSummary}
            >
              Generate Summary
            </Button>

            <Button
              colorScheme="green"
              onClick={handleGenerateCaption}
              w="full"
              isLoading={loadingCaption}
            >
              Generate Caption
            </Button>

            {error && (
              <Box
                mt={4}
                p={3}
                border="1px"
                borderColor="red.500"
                color="red.500"
                rounded="lg"
                bg="red.50"
              >
                {error}
              </Box>
            )}

            {uploadResponse && (
              <Box
                mt={4}
                p={3}
                border="1px"
                borderColor="green.500"
                color="green.500"
                rounded="lg"
                bg="green.50"
              >
                {uploadResponse}
              </Box>
            )}
          </Box>

          <Box flex="1" pl={[0, 4]}>
            {selectedFile && (
              <Box mb={4}>
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  maxW="full"
                  h="auto"
                  border="1px"
                  borderColor="gray.300"
                  rounded="lg"
                  shadow="md"
                />
              </Box>
            )}

            <Box
              mt={6}
              p={4}
              border="1px"
              borderColor="yellow.500"
              rounded="lg"
              bg="yellow.50"
              shadow="md"
            >
              <Heading as="h3" size="md" mb={2}>
                Generated Summary:
              </Heading>
              {loadingSummary ? (
                <SkeletonText noOfLines={4} spacing="4" />
              ) : (
                <Text>{summary || "No summary available yet."}</Text>
              )}
            </Box>

            <Box
              mt={6}
              p={4}
              border="1px"
              borderColor="green.500"
              rounded="lg"
              bg="green.50"
              shadow="md"
            >
              <Heading as="h3" size="md" mb={2}>
                Generated Caption:
              </Heading>
              {loadingCaption ? (
                <>
                  <SkeletonCircle size="12" />
                  <SkeletonText noOfLines={2} spacing="4" mt={4} />
                </>
              ) : (
                <Text>{caption || "No caption available yet."}</Text>
              )}
            </Box>
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  );
};

export default UploadSection;
