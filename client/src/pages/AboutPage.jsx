import React from "react";
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  Image,
  Flex,
  Stack,
  Button,
} from "@chakra-ui/react";
import { motion } from 'framer-motion';
const AboutPage = () => {
  const handleLearnMore = () => {
    // Placeholder for a learn more button, e.g., scrolling down or routing
    alert("Learn more about PixelPerfect coming soon!");
  };

  return (
    <ChakraProvider>
      <motion.div  className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400 sm:px-6 lg:px-8"
      
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      
      <Box bg="transparent" py={10}>
        <Container maxW="container.xl">
          {/* Hero Section */}
          <Flex
            direction={["column", "row"]}
            align="center"
            justify="space-between"
            py={12}
            px={8}
            bg="rgba(43, 60, 79,0.8)"
            rounded="xl"
            shadow="lg"
            overflow="hidden"

          >
            <Box  flex="1" mr={[0, 8]}>
              <Heading
                as="h1"
                size="2xl"
                mb={4}
                bgGradient="linear(to-l, pink.500, purple.400, blue.500)"
                bgClip="text"
                fontWeight="extrabold"
              >
                About PixelPerfect
              </Heading>
              <Text fontSize="lg" mb={6} color="gray.200">
                Welcome to PixelPerfect, where innovation meets creativity. Our
                platform provides seamless solutions for generating unique
                content and enhancing visual narratives.
              </Text>
              
            </Box>
            <Box flex="1" mt={[8, 0]}>
              <Image
                src="https://i.pinimg.com/236x/37/f6/61/37f661c10de323861ae6761cf3f6a7d6.jpg"
                alt="About Us"
                borderRadius="lg"
                shadow="lg"
                maxW="100%"
              />
            </Box>
          </Flex>

          {/* Mission Statement */}
          <Stack
            mt={12}
            spacing={8}
            p={6}
            bg="rgba(43, 60, 79,0.8)"
            rounded="xl"
            shadow="md"
            textAlign="center"
            align="center"
          >
            <Heading
              as="h2"
              size="xl"
              bgGradient="linear( to-l, pink.500, purple.400, blue.500)"
              bgClip="text"
              fontWeight="bold"
            >
              Our Mission
            </Heading>
            <Text fontSize="lg" color="gray.200" maxW="4xl">
              At PixelPerfect, our mission is to empower creators and businesses
              with cutting-edge technology that transforms their visual
              storytelling. We aim to make design and content generation
              accessible, innovative, and efficient, driving creativity in every
              pixel.
            </Text>
          </Stack>

          {/* Key Features */}
          <Flex mt={16} wrap="wrap" justify="center" gap={6} align="center">
            <Flex wrap="wrap" justify="center" gap={6}>
              <FeatureCard1
                title="Innovative Design"
                description="Leverage the power of AI to create stunning visual content effortlessly."
                icon="https://cdn.prod.website-files.com/630d4d1c4a462569dd189855/6584a9975ade35940f95e9ba_2.webp"
              />
              <FeatureCard2
                title="User-Friendly Tools"
                description="Intuitive and easy-to-use tools designed for creators of all levels."
                icon="https://storage.googleapis.com/gweb-developer-goog-blog-assets/original_videos/wagtailvideo-gfeqmswx_thumb.jpg"
              />
              <FeatureCard3
                title="Seamless Integration"
                description="Integrate your workflow with ease and enhance your productivity."
                icon="https://www.softformance.com/wp-content/uploads/2022/07/1.3-FastAPI-Logo.jpg"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>
      </motion.div>
    </ChakraProvider>
  );
};

// Feature Card Component
const FeatureCard1 = ({ title, description, icon }) => {
  return (
    <Box
      p={6}
      bg="white"
      rounded="xl"
      shadow="md"
      maxW="sm"
      textAlign="center"
      _hover={{ shadow: "xl", transform: "scale(1.05)" }}
      transition="all 0.3s"
    >
      <Image src={icon} alt={title} borderRadius="full" mb={4} />
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.600">{description}</Text>
    </Box>
    
  );
};
const FeatureCard2 = ({ title, description, icon }) => {
  return (
    <Box
      p={6}
      bg="white"
      rounded="xl"
      shadow="md"
      maxW="sm"
      textAlign="center"
      _hover={{ shadow: "xl", transform: "scale(1.05)" }}
      transition="all 0.3s"
    >
      <Image
        src={icon}
        alt={title}
        borderRadius="full"
        mb={4}
        style={{ height: 250, width: 400, paddingTop: 40 }}
      />
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.600">{description}</Text>
    </Box>
  );
};
const FeatureCard3 = ({ title, description, icon }) => {
  return (
    <Box
      p={6}
      bg="white"
      rounded="xl"
      shadow="md"
      maxW="sm"
      textAlign="center"
      _hover={{ shadow: "xl", transform: "scale(1.05)" }}
      transition="all 0.3s"
    >
      <Image src={icon} alt={title} borderRadius="full" mb={4} />
      <Heading as="h3" size="md" mb={2}>
        <br />
        {title}
      </Heading>
      <Text color="gray.600">{description}</Text>
    </Box>
    
  );
};
export default AboutPage;
