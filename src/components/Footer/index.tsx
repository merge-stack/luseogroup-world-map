import { FaPhone, FaInfoCircle } from "react-icons/fa";
import { MdOutlineFilterAltOff } from "react-icons/md";
import "./index.css";

interface FooterProps {
  resetFilters: () => void;
}

const Footer: React.FC<FooterProps> = ({ resetFilters }) => {
  return (
    <div className="footer">
      {/* Contact */}
      <a href="/contact" target="_blank" rel="noopener noreferrer" className="footer-item">
        <FaPhone size={24} />
        <span>Contact</span>
      </a>

      {/* About the Company */}
      <a href="" target="_blank" rel="noopener noreferrer" className="footer-item" style={{ marginLeft: "8px" }}>
        <FaInfoCircle size={24} />
        <span>About</span>
      </a>

      {/* Reset Filters */}
      <div onClick={resetFilters} className="footer-item footer-button">
        <MdOutlineFilterAltOff size={24} />
        <span>Reset Filters</span>
      </div>
    </div>
  );
};

export default Footer;
