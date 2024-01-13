import styled from 'styled-components';
import { Size } from '@utils/constants';
import Text from '@components/common/basic/Text';
import Modal from '@components/common/complex/Modal';

type Props = {
  formattedDateTime: any;
  handleCloseNotificationModal: any;
  selectedNotification: any;
};

export default function NotificationWindow(props: Props) {
  const { formattedDateTime, handleCloseNotificationModal, selectedNotification } = props;

  return (
    <Modal
      size={Size.XXL}
      width='800px'
      isOpen={selectedNotification}
      onClose={handleCloseNotificationModal}
      header={(
        <Container>
          {selectedNotification.subject}
          <Text size={Size.XS}>{formattedDateTime(selectedNotification.sentAt)}</Text>
        </Container>
      )}
      body={<Text dangerouslySetInnerHTML={{ __html: selectedNotification.message.replaceAll('\n', '<br/>') }} />}
    />
  );
}

const Container = styled.div``;
