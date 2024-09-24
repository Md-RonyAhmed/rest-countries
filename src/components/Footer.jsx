const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 shadow-md fixed bottom-0 left-0 w-full">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Countries Info. All Rights Reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  