import {useState} from 'react';
import {Heading, Box, Center, Flex, Stack, Badge} from '@chakra-ui/react';

export default function ReviewWordCard({reviewWordDTO}) {

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => setIsFlipped(!isFlipped);

    return (
        <Center py={6}>
            <Flex
                justify="center" align="center" maxH={'500px'} minH={'500px'} maxW={'400px'} minW={'400px'}
                w={'full'} m={2} bg={'black'} color={'white'} boxShadow={'l'} rounded={'lg'} overflow={'hidden'}
                onClick={handleFlip}
                style={{
                    transform: isFlipped ? 'rotateY(180deg) scaleX(-1)' : 'rotateY(0deg)',
                    transition: 'transform 0.5s',
                    border: (reviewWordDTO.status === 'NEW') ? '2px solid rgba(255, 0, 0, 0.8)' : 'none'
                }}
            >
                <Box p={6} style={{backfaceVisibility: 'hidden'}}>
                    <Stack spacing={2} align={'center'} mb={30}>
                        {reviewWordDTO.status === 'NEW' ? (
                            <Badge colorScheme={'red'} position="absolute" top={4} right={4}
                                border={'1px solid rgba(255, 0, 0, 0.7)'} backgroundColor={'black'}
                            >
                                {reviewWordDTO.status}
                            </Badge>
                        ) : null}
                        <Heading fontSize={isFlipped ? '4xl' : '7xl'} fontWeight={'thin'} fontFamily={'SimSun, body'}
                                 align={'center'} mb={10}>
                            {isFlipped ? reviewWordDTO.pinyin : reviewWordDTO.nameChineseSimplified}
                        </Heading>
                        <Heading fontSize={isFlipped ? '3xl' : '7xl'} fontWeight={'thin'} fontFamily={'SimSun, body'}
                                 align={'center'}>
                            {isFlipped ? reviewWordDTO.nameEnglish : ''}
                        </Heading>
                    </Stack>
                </Box>
            </Flex>
        </Center>
    );
}
