export const metadata = { title: "Cookie Policy | Dina Holdings LLC" };
export const dynamic = "force-static";

export default function Cookie() {
  return (
    <main style={{maxWidth:900,margin:"40px auto",padding:"0 20px"}}>
      <h1>Cookie Policy</h1>
      <p>Effective date: 1 Nov 2025</p>

      <h2>1. What are cookies?</h2>
      <p>Small text files stored on your device to remember settings and understand site usage.</p>

      <h2>2. How we use cookies</h2>
      <ul>
        <li>Essential: session and security</li>
        <li>Analytics: anonymous usage metrics (page views, load performance)</li>
      </ul>

      <h2>3. Managing cookies</h2>
      <p>You can block/delete cookies in your browser settings. Some features may not work without essential cookies.</p>

      <h2>4. Third parties</h2>
      <p>We may use reputable analytics/hosting vendors who set their own cookies under their policies.</p>

      <h2>5. Contact</h2>
      <p>Questions? <a href="mailto:ceo@dinaholdingsllc.net">ceo@dinaholdingsllc.net</a></p>
    </main>
  );
}
