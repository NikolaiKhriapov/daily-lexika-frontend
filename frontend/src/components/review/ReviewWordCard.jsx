import {Heading, Box, Center, Flex, Stack, Badge} from '@chakra-ui/react';

export default function ReviewWordCard({reviewWordDTO, isFlipped, setIsFlipped}) {

    const handleFlip = () => setIsFlipped(!isFlipped);

    return (
        <Center py={10}>
            <Flex
                justify="center" align="center" h={'500px'} w={'400px'}

                rounded={"lg"} size={"sm"} background={'gray.200'}
                borderColor={'gray.500'} borderWidth={'1px'}

                boxShadow={'2xl'}
                onClick={handleFlip}
                style={{
                    transform: isFlipped ? 'rotateY(180deg) scaleX(-1)' : 'rotateY(0deg)',
                    transition: 'transform 0.3s',
                    border: (reviewWordDTO.status === 'NEW') ? '1px solid red' : '1px solid grey',
                }}
            >
                <Box p={6} style={{backfaceVisibility: 'hidden'}}>
                    <Stack spacing={2} align={'center'} mb={30}>
                        {reviewWordDTO.status === 'NEW' ? (
                            <Badge colorScheme={'red'} position="absolute" top={4} right={4}
                                border={'1px solid rgba(255, 0, 0, 0.7)'}
                            >
                                {reviewWordDTO.status}
                            </Badge>
                        ) : null}
                        <Heading fontSize={isFlipped ? '4xl' : '7xl'} fontWeight={'normal'} fontFamily={'Roboto'}
                                 align={'center'} mb={10}>
                            {isFlipped ? reviewWordDTO.pinyin : reviewWordDTO.nameChineseSimplified}
                        </Heading>
                        <Heading fontSize={isFlipped ? '3xl' : '7xl'} fontWeight={'normal'} fontFamily={'Roboto'}
                                 align={'center'}>
                            {isFlipped ? reviewWordDTO.nameEnglish : ''}
                        </Heading>
                    </Stack>
                </Box>
            </Flex>
        </Center>
    );
}
