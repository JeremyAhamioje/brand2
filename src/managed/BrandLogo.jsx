import logo from "./assets/brand-logo.png";

// Full Level Up Hiring lockup (icon + wordmark). The source art is
// dark, so it's rendered white via CSS (.m-brand-logo) to read on the
// dark navbar/footer. Because the wordmark is in the image, call sites
// don't render the name text separately.
export default function BrandLogo() {
  return <img src={logo} alt="Level Up Hiring" className="m-brand-logo" />;
}
