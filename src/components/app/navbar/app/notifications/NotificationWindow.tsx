import { useGetUserInfoQuery } from '@store/api/userAPI';
import { Size } from '@utils/constants';
import { NotificationDto } from '@utils/types';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import DateHelper from '@helpers/DateHelper';
import LocaleHelper from '@helpers/LocaleHelper';

type Props = {
  selectedNotification: NotificationDto;
  onClose: () => void;
};

export default function NotificationWindow(props: Props) {
  const { selectedNotification, onClose } = props;

  const { data: user } = useGetUserInfoQuery();

  if (!user) return <></>;

  return (
    <Modal
      size={Size.XXL}
      width="800px"
      isOpen={!!selectedNotification}
      onClose={onClose}
      header={(
        <>
          {selectedNotification.subject}
          <Text size={Size.XS}>
            {DateHelper.convertOffsetDateTimeToDateString(selectedNotification.sentAt, LocaleHelper.getLocaleFromUser(user))}
          </Text>
        </>
      )}
      body={<Text dangerouslySetInnerHTML={{ __html: selectedNotification.message.replaceAll('\n', '<br/>') }} />}
    />
  );
}
