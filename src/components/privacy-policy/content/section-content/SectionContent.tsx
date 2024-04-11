import styled from 'styled-components';
import { EmailLinks } from '@utils/app/constants';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import Heading from '@components/ui-common/basic/Heading';
import Link from '@components/ui-common/basic/Link';
import Text from '@components/ui-common/basic/Text';

export default function SectionContent() {
  return (
    <Container>
      <Content>
        <Block>
          <Text size={Size.LG} isSingleColorMode>This privacy policy explains how Daily Lexika app collects, uses, and discloses your personal information. We are committed to safeguarding your privacy and providing a secure user experience.</Text>
        </Block>

        <Block>
          <Heading size={Size.MD} isSingleColorMode>Information We Collect</Heading>
          <Text size={Size.LG} isSingleColorMode>To enhance your experience, we may request certain personally identifiable information when you use the Daily Lexika app. This information will be retained and used solely as described in this policy.</Text>
          <Text size={Size.LG} isSingleColorMode>The app may also use third-party services that collect information used to identify you. These third-party service providers are listed below:</Text>
          <Text size={Size.LG} isSingleColorMode>&#8226; Google Play services</Text>
        </Block>

        <Block>
          <Heading size={Size.MD} isSingleColorMode>Log data</Heading>
          <Text size={Size.LG} isSingleColorMode>In the event of an app error, we collect data from your phone called Log Data to help us diagnose and fix the issue. This Log Data may include information such as your device&apos;s IP address, name, operating system version, app configuration, usage time, and other statistics.</Text>
        </Block>

        <Block>
          <Heading size={Size.MD} isSingleColorMode>Service providers</Heading>
          <Text size={Size.LG} isSingleColorMode>We may collaborate with third-party companies and individuals to:</Text>
          <Text size={Size.LG} isSingleColorMode>
            &#8226; facilitate our Service;<br />
            &#8226; provide the Service on our behalf;<br />
            &#8226; perform Service-related services; or<br />
            &#8226; analyze Service usage.
          </Text>
          <Text size={Size.LG} isSingleColorMode>These third parties have access to your personal information only to perform their assigned tasks. They are obligated to keep your information confidential and not use it for any other purpose.</Text>
        </Block>

        <Block>
          <Heading size={Size.MD} isSingleColorMode>Security</Heading>
          <Text size={Size.LG} isSingleColorMode>We take reasonable measures to protect your personal information. However, no internet transmission or electronic storage method is completely secure. While we strive to use commercially acceptable means of safeguarding your information, we cannot guarantee its absolute security.</Text>
        </Block>

        <Block>
          <Heading size={Size.MD} isSingleColorMode>Updates to this Privacy Policy</Heading>
          <Text size={Size.LG} isSingleColorMode>We may update our privacy policy periodically. We recommend that you review this page regularly for any changes. Updates are effective immediately after they are posted on this page.</Text>
        </Block>

        <Block>
          <Heading size={Size.MD} isSingleColorMode>Contact Us</Heading>
          <Text size={Size.LG} isSingleColorMode>If you have any questions or suggestions about our Privacy Policy, please do not hesitate to <Link href={EmailLinks.Blank}>contact us</Link>.</Text>
        </Block>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${theme.colors.light.bgColor};
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 80px 40px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    padding: 80px;
  }
`;

const Content = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
`;
