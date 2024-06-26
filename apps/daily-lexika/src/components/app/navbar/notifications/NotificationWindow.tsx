import LocaleHelper from '@daily-lexika/helpers/LocaleHelper';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { NotificationDto } from '@library/daily-lexika';
import { Modal,Text } from '@library/shared/ui';
import { DateTimeUtil, Size } from '@library/shared/utils';

type Props = {
  selectedNotification: NotificationDto;
  onClose: () => void;
};

export default function NotificationWindow(props: Props) {
  const { selectedNotification, onClose } = props;

  const { data: user } = useGetUserQuery();

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
            {DateTimeUtil.convertOffsetDateTimeToDateString(selectedNotification.sentAt, LocaleHelper.getLocaleFromUser(user))}
          </Text>
        </>
      )}
      body={<Text dangerouslySetInnerHTML={{ __html: selectedNotification.message.replaceAll('\n', '<br/>') }} />}
    />
  );
}
