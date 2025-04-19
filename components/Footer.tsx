
const Footer = () => (
  <footer className="bg-white py-8 px-4 md:px-20">
                        <div className="max-w-7xl mx-auto">
                          <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center mb-4 md:mb-0">
                              <a href="https://qrexperiences.com" target="_blank">
                              <h3 className="text-black text-lg font-semibold">QR Experiences</h3>
                              </a>
                            </div>
                            <div className="flex items-center">
                              <p className="text-black text-sm mr-4">© 2025 QR Experiences. All rights reserved.</p>
                              <div className="flex space-x-4">
                                <a
                                  href="/policy"
                                  className="text-black hover:text-gray-400 transition-colors duration-200"
                                >
                                  Terms of Service
                                </a>
                                <a
                                  href="/policy"
                                  className="text-black hover:text-gray-400 transition-colors duration-200"
                                >
                                  Privacy Policy
                                </a>
                                <a href="https://qrexperiences.com" target="_blank" className="text-black hover:text-gray-400 transition-colors duration-200">
                                  Made in FL 🏖️🌴
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </footer>
);

export default Footer;
