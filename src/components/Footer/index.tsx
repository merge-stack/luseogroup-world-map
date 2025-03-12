import "./index.css";

interface FooterProps {
  resetFilters: () => void;
}

const Footer: React.FC<FooterProps> = ({ resetFilters }) => {
  return (
    <div className="footer">
      {/* Contact */}
      <a href="/contact" target="_blank" rel="noopener noreferrer" className="footer-item">
        <span>Contact</span>
      </a>

      {/* About the Company */}
      <a href="" target="_blank" rel="noopener noreferrer" className="footer-item" style={{ marginRight: "4px" }}>
        <span>About</span>
      </a>

      {/* Reset Filters */}
      <div onClick={resetFilters} className="footer-item footer-button" >
        <span>Reset Filters</span>
      </div>
    </div>
  );
};

export default Footer;
