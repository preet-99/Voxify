export default function Footer() {
  return (
    <footer className="bg-[darkslategrey] text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">About AI Tools Hub</h2>
            <p className="text-sm text-white">
              AI Tools Hub is your go-to platform for discovering, comparing, and reviewing the latest AI tools for productivity, design, writing, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">Quick Links</h2>
            <ul className="text-sm space-y-2 text-white">
              <li><a href="/tools" className="hover:underline">Explore Tools</a></li>
              <li><a href="/blog" className="hover:underline">Blog</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter and Social */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">Stay Updated</h2>
            <p className="text-sm text-white -800 mb-2">
              Subscribe to get the latest updates and AI tools in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 w-full rounded-md text-white placeholder-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-700 hover:bg-green-800 text-white px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
            <div className="flex justify-center md:justify-start mt-4 space-x-4 text-white">
              {/* Placeholder icons — replace with actual icons */}
              <a href="#" className="hover:text-green-900 text-xl"></a>
              <a href="#" className="hover:text-green-900 text-xl">🐦</a>
              <a href="#" className="hover:text-green-900 text-xl">📘</a>
              <a href="#" className="hover:text-green-900 text-xl">📸</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-10 pt-4 text-center text-sm text-white">
          <p>© {new Date().getFullYear()} AI Tools Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
