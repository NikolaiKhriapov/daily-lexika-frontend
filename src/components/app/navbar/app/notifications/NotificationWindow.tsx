import { Size } from '@utils/constants';
import { NotificationDto } from '@utils/types';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import DateHelper from '@helpers/DateHelper';

type Props = {
  selectedNotification: NotificationDto;
  onClose: () => void;
};

export default function NotificationWindow(props: Props) {
  const { selectedNotification, onClose } = props;

  return (
    <Modal
      size={Size.XXL}
      width="800px"
      isOpen={!!selectedNotification}
      onClose={onClose}
      header={(
        <>
          {selectedNotification.subject}
          <Text size={Size.XS}>{DateHelper.convertStringToDate(selectedNotification.sentAt)}</Text>
        </>
      )}
      body={<Text dangerouslySetInnerHTML={{ __html: selectedNotification.message.replaceAll('\n', '<br/>') }} />}
    />
  );
}
