import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <p className="footer-brand-name">
            ZEEM<span>R</span>A
          </p>
          <p className="footer-tagline">Where Heritage Meets Refinement</p>
          <p className="footer-about">
            Handcrafted leather goods from Sialkot, Pakistan — delivered directly to your door in Europe. Six centuries of craft, reimagined for the modern wardrobe.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn">in</a>
            <a href="#" className="social-btn">ig</a>
            <a href="#" className="social-btn">fb</a>
            <a href="#" className="social-btn">pin</a>
          </div>
        </div>
        <div>
          <p className="footer-col-title">Shop</p>
          <ul className="footer-links">
            <li><Link href="/men">Men&apos;s Collection</Link></li>
            <li><Link href="/women">Women&apos;s Collection</Link></li>
            <li><Link href="#">New Arrivals</Link></li>
            <li><Link href="#">Bestsellers</Link></li>
            <li><Link href="#">Sale</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Help</p>
          <ul className="footer-links">
            <li><Link href="#">Shipping to Europe</Link></li>
            <li><Link href="#">Returns & Exchanges</Link></li>
            <li><Link href="#">Size Guide</Link></li>
            <li><Link href="#">Care Instructions</Link></li>
            <li><Link href="#">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">About</p>
          <ul className="footer-links">
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="#">Sialkot Craft</Link></li>
            <li><Link href="#">Sustainability</Link></li>
            <li><Link href="#">Press</Link></li>
            <li><Link href="#">Wholesale</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© {new Date().getFullYear()} ZEEMRA · Sialkot, Pakistan. All rights reserved.</p>
        <div className="footer-legal">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
}
