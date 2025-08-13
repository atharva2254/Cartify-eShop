const Footer = () => {
  return (
    <footer className="bg-[#264653] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} Cartify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
