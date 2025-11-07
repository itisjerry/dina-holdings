export const metadata = { title: "Refund and Cancellation Policy | Dina Holdings LLC" };
export const dynamic = "force-static";

export default function Refund() {
  return (
    <main style={{maxWidth:900,margin:"40px auto",padding:"0 20px"}}>
      <h1>Refund and Cancellation Policy</h1>
      <p>Effective date: 1 Nov 2025</p>

      <h2>1. Engagement model</h2>
      <p>Our work is milestone-based and time-boxed. Each SOW specifies deliverables and billing cadence.</p>

      <h2>2. Cancellations</h2>
      <ul>
        <li>You may cancel with written notice. We will stop work at the nearest safe checkpoint.</li>
        <li>You are responsible for fees for work completed and any non-recoverable third-party costs.</li>
      </ul>

      <h2>3. Refunds</h2>
      <ul>
        <li>Upfront deposits are applied to the first milestone and are non-refundable once work has started.</li>
        <li>If we fail to deliver a milestone materially as specified and cannot cure within 14 days, a pro-rated refund for that milestone is available.</li>
      </ul>

      <h2>4. Change requests</h2>
      <p>Scope changes are billed via change orders; refunds don’t apply to approved changes.</p>

      <h2>5. Digital goods</h2>
      <p>Because deliverables are digital and often deployed to your infrastructure, returns are not applicable once delivered and accepted.</p>

      <h2>6. How to request</h2>
      <p>Email <a href="mailto:billing@dinaholdingsllc.net">billing@dinaholdingsllc.net</a> with your SOW reference and details.</p>
    </main>
  );
}
