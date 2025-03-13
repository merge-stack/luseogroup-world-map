import logo from "@assets/logo.png";
import "./index.css";

interface FooterProps {
  resetFilters: () => void;
}

const Footer: React.FC<FooterProps> = ({ resetFilters }) => {
  return (
    <footer className="footer">
      {/* Logo */}
      <div className="footer-logo">
        <img src={logo} alt="Company Logo" />
      </div>

      {/* Divider */}
      <hr className="footer-divider" />

      {/* Footer Links */}
      <div className="footer-links">
        <a href="/contact" target="_blank" rel="noopener noreferrer" className="footer-item">
          Contact
        </a>

        <a href="#" target="_blank" rel="noopener noreferrer" className="footer-item">
          About
        </a>

        <div onClick={resetFilters} className="footer-item footer-button">
          Reset Filters
        </div>
      </div>
    </footer>
  );
};

export default Footer;
