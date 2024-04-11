import { AppInfo } from '@utils/app/constants';
import AuthLayout from '@components/app/AuthLayout';
import AuthContent from '@components/app/content/AuthContent';

export default function AuthIndex() {
  return (
    <AuthLayout title={AppInfo.TITLE} description={AppInfo.DESCRIPTION}>
      <AuthContent />
    </AuthLayout>
  );
}
