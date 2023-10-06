import {
    Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Progress, Stack,
    useColorModeValue
} from "@chakra-ui/react"
import React, {useEffect, useState} from "react"
import {processReviewAction} from "../../services/review.js"
import {updateUserStreak} from "../../services/user.js"
import {errorNotification, successNotification} from "../../services/popup-notification.js"
import ReviewWordCard from "./ReviewWordCard.jsx"

const StartReviewWindow = ({reviewId, isOpen, onClose, button, totalReviewWords}) => {

    const [reviewWordDTO, setReviewWordDTO] = useState([])
    const [reviewUpdatedSize, setReviewUpdatedSize] = useState([])
    const [isFormVisible, setIsFormVisible] = useState(true)
    const [isReviewComplete, setIsReviewComplete] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false);

    const fetchReviewAction = (answer) => {
        if (((reviewWordDTO.status === 'NEW') || (reviewWordDTO.status === 'IN_REVIEW' && reviewWordDTO.totalStreak === 4))
            && answer === 'yes') {
            successNotification(
                `${reviewWordDTO.nameChineseSimplified} is a known word.`,
                "This word will still be shown occasionally during reviews"
            )
        }
        processReviewAction(reviewId, answer)
            .then((response) => {
                if (response.data.data != null) {
                    setReviewWordDTO(response.data.data.reviewWordDTO)
                    setReviewUpdatedSize(response.data.data.reviewUpdatedSize)
                } else {
                    updateUserStreak()
                    setIsFormVisible(false)
                    setIsReviewComplete(true)
                }
            })
            .catch((error) => errorNotification(error.code, error.response.data.message))
    };

    useEffect(() => {
        fetchReviewAction(null);
    }, [reviewId]);

    const pressButton = (answer) => {
        fetchReviewAction(answer);
        setIsFlipped(false)
    };

    const forgotButton = (
        <Button
            bg={"grey"} rounded={"lg"} background={'gray.200'} boxShadow={"lg"} ml={5}
            borderColor={useColorModeValue('gray.400', 'gray.500')} borderWidth={'0.5px'}
            _hover={{bg: 'red.300', borderColor: 'gray.500'}}
            onClick={() => pressButton("no")}
        >
            Forgot
        </Button>
    )
    const rememberedButton = (
        <Button
            bg={"grey"} rounded={"lg"} background={'gray.200'} boxShadow={"lg"} ml={5}
            borderColor={useColorModeValue('gray.400', 'gray.500')} borderWidth={'0.5px'}
            _hover={{bg: 'gray.400', borderColor: 'gray.500'}}
            onClick={() => pressButton("yes")} disabled={!reviewWordDTO}
        >
            Remembered
        </Button>
    )

    const reviewProgress = (totalReviewWords - reviewUpdatedSize) / totalReviewWords * 100

    return (
        <>
            {button}
            <Modal isOpen={isOpen} onClose={onClose} size={"6xl"} isCentered>
                <ModalOverlay/>
                <ModalContent maxH="80vh" minH="80vh" minW="80vh" maxW="80vh" rounded={'lg'}>
                    <ModalCloseButton/>
                    <ModalBody display="flex" flexDirection="column" justifyContent="center">
                        {!isFormVisible && isReviewComplete ? (
                            onClose()
                        ) : (
                            <>
                                <Stack spacing={2} mb={90} ml={10} mr={10}>
                                    <Progress colorScheme='gray' size='sm' rounded={'md'} value={reviewProgress}/>
                                </Stack>
                                <ReviewWordCard
                                    reviewWordDTO={reviewWordDTO}
                                    isFlipped={isFlipped}
                                    setIsFlipped={setIsFlipped}
                                />
                                <Stack align={"center"}>
                                    <Flex>
                                        {forgotButton}
                                        {rememberedButton}
                                    </Flex>
                                </Stack>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter height={90}/>
                </ModalContent>
            </Modal>
        </>
    )
}

export default StartReviewWindow;