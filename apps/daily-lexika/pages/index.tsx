import AuthLayout from '@daily-lexika/components/app/AuthLayout';
import AuthContent from '@daily-lexika/components/app/content/AuthContent';
import { AppInfo } from '@daily-lexika/utils/constants';

export default function AuthIndex() {
  return (
    <AuthLayout
      title={AppInfo.TITLE}
      description={AppInfo.DESCRIPTION}
    >
      <AuthContent />
    </AuthLayout>
  );
}
