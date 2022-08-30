import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { FridgeLink } from "@src/components/forms/FridgeButton";
import RecipeList from "@src/components/RecipeList";
import { motion } from "framer-motion";
import { NextPage } from "next"

const Recipes : NextPage = () => {
  const tabNames = ['Recipes For Me', 'All Recipes', 'My Recipes']
  const tabIndexTypes : ('tailored' | 'all' | 'authored')[] = ['tailored', 'all', 'authored']
  return (
    <Tabs width='100%' isLazy={true}>
      <Flex justifyContent='space-between' width='100%' alignItems='center' flexDirection={{base: 'column', md: 'row'}}>
        <TabList mb='2'>
          { tabNames.map((tabName) => (
            <Tab 
              key={tabName}
              _selected={{ 
                borderBottomColor: 'primary.500',
                color: 'primary.900'
              }}
            >
              {tabName}
            </Tab>
          ))}
        </TabList>
        <FridgeLink slidedirection='left' href='/recipes/new' >
          Create Recipe
        </FridgeLink>
      </Flex>

      <TabPanels>
        { tabIndexTypes.map((tabIndexType) => (
          <TabPanel key={tabIndexType}>
            <Box 
              as={motion.div} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition='0.5s ease-out'
            >
              <RecipeList indexType={tabIndexType} />
            </Box>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  ); 
}

export default Recipes;