import AuthLayout from '@daily-budget/components/app/AuthLayout';
import AuthContent from '@daily-budget/components/app/content/AuthContent';
import { AppInfo } from '@daily-budget/utils/constants';

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
