export default function NotFound() {
  return (
    <main style={{maxWidth:900,margin:"40px auto",padding:"0 20px",textAlign:"center"}}>
      <h1>Page not found</h1>
      <p>The page you requested doesn’t exist or has moved.</p>
      <a href="/" style={{textDecoration:"underline"}}>Go back home</a>
    </main>
  );
}
