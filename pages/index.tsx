import { AppInfo } from '@utils/constants';
import AuthPageContent from '@components/auth/AuthPageContent';
import AuthPageLayout from '@components/shared/layout/AuthPageLayout';

export default function AuthIndex() {
  return (
    <AuthPageLayout title={AppInfo.NAME} description={AppInfo.DESCRIPTION}>
      <AuthPageContent />
    </AuthPageLayout>
  );
}
