import styled from 'styled-components';
import Text from '../../common/basic/Text';
import Modal from '../../common/complex/Modal';
import { Size } from '../../../src/utils/constants';

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
