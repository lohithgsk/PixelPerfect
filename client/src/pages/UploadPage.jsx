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
} from "@chakra-ui/react";

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [caption, setCaption] = useState("");
  const [enhance, setEnhance] = useState(false);
  const [error, setError] = useState("");
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

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    alert(
      "File uploaded successfully! You can now generate the summary or caption."
    );
  };

  const handleGenerateSummary = async () => {
    if (!selectedFile) {
      alert("Please select a file to generate a summary.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("enhance", enhance);

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
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.lg" py={10}>
        <Flex
          direction={{ base: "column", md: "row" }}
          bg="white"
          p={6}
          rounded="lg"
          shadow="md"
        >
          {/* Left Section: Upload and Buttons */}
          <Box flex="1" pr={{ md: 4 }} mb={{ base: 6, md: 0 }}>
            <Heading as="h2" size="lg" mb={4}>
              Upload Photo, Generate Summary or Caption
            </Heading>

            <Input
              type="file"
              onChange={handleFileChange}
              mb={4}
              variant="outline"
              size="sm"
            />

            <Button
              onClick={handleUpload}
              colorScheme="blue"
              width="full"
              mb={4}
            >
              Upload
            </Button>

            <Button
              onClick={handleGenerateSummary}
              colorScheme="yellow"
              width="full"
              mb={4}
            >
              Generate Summary
            </Button>

            <Button
              onClick={handleGenerateCaption}
              colorScheme="green"
              width="full"
            >
              Generate Caption
            </Button>

            {error && (
              <Box
                mt={4}
                p={2}
                border="1px"
                borderColor="red.500"
                bg="red.50"
                color="red.500"
                rounded="lg"
              >
                {error}
              </Box>
            )}
          </Box>

          <Box flex="1" pl={{ md: 4 }}>
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
                maxW="full"
                borderRadius="lg"
                shadow="md"
                mb={4}
              />
            )}

            {summary && (
              <Box
                mt={6}
                p={4}
                border="1px"
                borderColor="yellow.500"
                bg="yellow.50"
                rounded="lg"
                shadow="md"
              >
                <Heading as="h3" size="md" mb={2}>
                  Generated Summary:
                </Heading>
                <Text color="gray.700">{summary}</Text>
              </Box>
            )}

            {caption && (
              <Box
                mt={6}
                p={4}
                border="1px"
                borderColor="green.500"
                bg="green.50"
                rounded="lg"
                shadow="md"
              >
                <Heading as="h3" size="md" mb={2}>
                  Generated Caption:
                </Heading>
                <Text color="gray.700">{caption}</Text>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  );
};

export default UploadSection;
