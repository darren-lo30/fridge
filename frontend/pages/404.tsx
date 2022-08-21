import { Flex, Heading, Link } from "@chakra-ui/react";

export default function PageNotFound() {
  return (
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} mx={'auto'}>
      <Heading 
        size={'4xl'} 
        mb={'3'}
        fontWeight={'bold'}
      >
        404
      </Heading>
      <Heading size={'lg'}>
        This Page Does Not Exist
      </Heading>
      <Link 
        href={'/'}
        my={'5'} 
        fontWeight={'bold'}
        rounded={'10'}
        bg={'brand'}
        px={'10'}
        py={'2'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        Go Home
      </Link>
    </Flex>
  );
}