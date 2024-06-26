import AuthLayout from '@admin/components/AuthLayout';
import AuthContent from '@admin/components/content/AuthContent';
import { AppInfo } from '@admin/utils/constants';

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
