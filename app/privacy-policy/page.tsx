export const metadata = { title: "Privacy Policy | Nexa Telecom" };

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate dark:text-mist/60">Last updated: June 2026</p>

      <div className="prose prose-sm mt-8 max-w-none space-y-6 dark:prose-invert">
        <Section title="1. Information we collect">
          We collect information you provide directly to us, such as your name,
          email address, phone number, and delivery address when you create an
          account, place an order, or contact customer support. We also collect
          usage data such as device type, IP address, and browsing behavior on
          our website.
        </Section>
        <Section title="2. How we use your information">
          We use your information to process orders, activate SIM cards and
          plans, provide customer support, send service notifications, and
          improve our products. We do not sell your personal data to third
          parties.
        </Section>
        <Section title="3. Data security">
          We implement industry-standard security measures, including
          encryption in transit and at rest, to protect your personal
          information from unauthorized access, alteration, or disclosure.
        </Section>
        <Section title="4. Your rights">
          You may request access, correction, or deletion of your personal
          data at any time by contacting our support team. You may also opt
          out of marketing communications while continuing to receive
          essential service notifications.
        </Section>
        <Section title="5. Cookies">
          We use cookies and similar technologies to remember your
          preferences, keep you logged in, and analyze site traffic to
          improve our services.
        </Section>
        <Section title="6. Contact us">
          For privacy-related questions, contact us at privacy@nexatelecom.ae.
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate dark:text-mist/60">{children}</p>
    </div>
  );
}
