import logo from "@assets/images/LOGO LUSEO.png";
import "./index.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Logo */}
      <div className="footer-logo">
        <img src={logo} alt="Company Logo" />
      </div>

      {/* Divider */}
      <hr className="footer-divider" />

    </footer>
  );
};

export default Footer;
