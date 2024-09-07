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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
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
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [duplicateImage, setDuplicateImage] = useState("");
  const [originalImage, setOriginalImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [showEnhanceModal, setShowEnhanceModal] = useState(false);
  const [flag, setFlag] = useState("None");

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
    setOriginalImage(URL.createObjectURL(file));
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
      summary || "This is an example summary for this image"
    );
    formData.append("caption", caption || "");
    formData.append("flags", flag);

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
      console.log(response.data);

      if (response.data["duplicate found at"]) {
        setDuplicateImage(response.data["duplicate found at"]);
        setShowDuplicateAlert(true);
      } else {
        setUploadResponse(response.data.response);
        alert("Image uploaded successfully!");
      }
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

  const handleEnhance = async () => {
    if (!selectedFile) {
      alert("Please select a file to enhance.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/enhance_image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer", // Ensure binary data is correctly handled
        }
      );

      // Check if the response is a valid image
      if (response.status === 200 && response.data) {
        const blob = new Blob([response.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        setEnhancedImage(imageUrl);
        setShowEnhanceModal(true);
      } else {
        setError(
          "Failed to enhance image. Server response status: " + response.status
        );
      }
    } catch (error) {
      console.error("Error enhancing image:", error);
      setError(
        "Error enhancing image: " +
          (error.response?.data?.message || "Server error")
      );
    }
    setError("");
  };

  const handleUploadAnyways = async () => {
    setFlag("force");
    await handleUpload();
    setShowDuplicateAlert(false);
  };

  const handleDecline = () => {
    setShowDuplicateAlert(false);
    setSelectedFile(null);
    window.location.reload();
  };
  const handleReplaceImage = () => {
    if (enhancedImage) {
      setOriginalImage(enhancedImage);
      setEnhancedImage(null);
      setShowEnhanceModal(false);
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
            <Button
              colorScheme={"purple"}
              mb={4}
              w={"full"}
              onClick={handleEnhance}
            >
              Enhance
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
              mb={4}
            >
              Generate Caption
            </Button>

            <Button colorScheme="blue" onClick={handleUpload} w="full" mb={4}>
              Upload Image
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
            {originalImage && (
              <Box mb={4}>
                <Image
                  src={originalImage}
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

        {showDuplicateAlert && (
          <Modal
            isOpen={showDuplicateAlert}
            onClose={() => setShowDuplicateAlert(false)}
          >
            <ModalOverlay />
            <ModalContent maxW="60vw" maxH="90vh">
              <ModalHeader>Duplicate Image Found</ModalHeader>
              <Text ml={6} className="text-black text-lg">
                There is a duplicate image found already in the database. Do you
                want to upload any way?
              </Text>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="row" align="center" justify="space-between">
                  {originalImage && (
                    <Box flex="1" mr={0} ml={20}>
                      <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Original Image:
                      </Text>
                      <Image
                        src={originalImage}
                        alt="Original"
                        boxSize="400px"
                        objectFit="cover"
                        borderRadius="md"
                        mb={4}
                      />
                    </Box>
                  )}
                  {duplicateImage && (
                    <Box flex="1" ml={0}>
                      <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Duplicate Image:
                      </Text>
                      <Image
                        src={duplicateImage}
                        alt="Duplicate"
                        boxSize="400px"
                        objectFit="cover"
                        borderRadius="md"
                        mb={4}
                      />
                    </Box>
                  )}
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={handleUploadAnyways}>
                  Upload Anyways
                </Button>
                <Button colorScheme="red" onClick={handleDecline} ml={3}>
                  Decline
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {showEnhanceModal && (
          <Modal
            isOpen={showEnhanceModal}
            onClose={() => setShowEnhanceModal(false)}
          >
            <ModalOverlay />
            <ModalContent maxW="60vw" maxH="90vh">
              <ModalHeader>Enhanced Image</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="row" align="center" justify="space-between">
                  {originalImage && (
                    <Box flex="1" mr={0} ml={20}>
                      <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Original Image:
                      </Text>
                      <Image
                        src={originalImage}
                        alt="Original"
                        boxSize="400px"
                        objectFit="cover"
                        borderRadius="md"
                        mb={4}
                      />
                    </Box>
                  )}
                  {enhancedImage && (
                    <Box flex="1" ml={0}>
                      <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Enhanced Image:
                      </Text>
                      <Image
                        src={enhancedImage}
                        alt="Enhanced"
                        boxSize="400px" // Adjust as needed
                        objectFit="cover"
                        borderRadius="md"
                        mb={4}
                      />
                    </Box>
                  )}
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="green" onClick={handleReplaceImage} mr={3}>
                  Replace
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => setShowEnhanceModal(false)}
                >
                  Decline
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </ChakraProvider>
  );
};

export default UploadSection;
