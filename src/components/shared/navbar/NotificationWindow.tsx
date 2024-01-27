import { Size } from '@utils/constants';
import Text from '@components/common/basic/Text';
import Modal from '@components/common/complex/Modal';

type Props = {
  formattedDate: any;
  handleCloseNotificationModal: any;
  selectedNotification: any;
};

export default function NotificationWindow(props: Props) {
  const { formattedDate, handleCloseNotificationModal, selectedNotification } = props;

  return (
    <Modal
      size={Size.XXL}
      width="800px"
      isOpen={selectedNotification}
      onClose={handleCloseNotificationModal}
      header={(
        <>
          {selectedNotification.subject}
          <Text size={Size.XS}>{formattedDate(selectedNotification.sentAt)}</Text>
        </>
      )}
      body={<Text dangerouslySetInnerHTML={{ __html: selectedNotification.message.replaceAll('\n', '<br/>') }} />}
    />
  );
}
