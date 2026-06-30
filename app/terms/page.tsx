export const metadata = { title: "Terms & Conditions | Nexa Telecom" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-bold">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-slate dark:text-mist/60">Last updated: June 2026</p>

      <div className="prose prose-sm mt-8 max-w-none space-y-6 dark:prose-invert">
        <Section title="1. Acceptance of terms">
          By accessing or using the Nexa Telecom website and services, you
          agree to be bound by these Terms & Conditions and our Privacy
          Policy.
        </Section>
        <Section title="2. Eligibility">
          You must be at least 18 years old, or have parental/guardian
          consent, and provide accurate identification documents (Emirates ID
          or passport) to register for any postpaid, prepaid, or Home WiFi
          service.
        </Section>
        <Section title="3. Orders and payment">
          All orders are subject to availability and credit approval where
          applicable. Payments are processed securely through Stripe. Prices
          listed are inclusive of applicable VAT unless otherwise stated.
        </Section>
        <Section title="4. Service activation">
          SIM cards and Home WiFi services will be activated within the
          timeframes communicated at checkout. Delays caused by incomplete
          documentation or address verification are not the responsibility of
          Nexa Telecom.
        </Section>
        <Section title="5. Returns and cancellations">
          Devices may be returned within 7 days of delivery if unused, in
          original packaging, and accompanied by proof of purchase. Plan
          subscriptions may be cancelled subject to any applicable
          commitment periods stated in the plan details.
        </Section>
        <Section title="6. Limitation of liability">
          Nexa Telecom is not liable for indirect, incidental, or
          consequential damages arising from service interruptions, network
          outages, or third-party device malfunctions, to the extent
          permitted by UAE law.
        </Section>
        <Section title="7. Governing law">
          These Terms are governed by the laws of the United Arab Emirates,
          and any disputes shall be subject to the exclusive jurisdiction of
          UAE courts.
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
