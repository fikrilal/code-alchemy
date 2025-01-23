export default function Footer() {
  return (
    <footer className="text-gray-400 bg-gray-100 py-8 px-8">
      <div className="bg-gray-900 mx-auto px-6 md:px-24 py-24 text-center rounded-xl w-full">
        {/* Name */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Ahmad Fikril Al Muzakki
        </h2>

        {/* Message */}
        <p className="mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Thanks for stopping by! Let’s connect and create something amazing
          together! Feel free to reach out about coding, design, or just say hi.
        </p>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center space-x-4">
          <a
            href="https://github.com/fikrilal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/github.svg"
              alt="GitHub"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/fikrilal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/linkedin.svg"
              alt="LinkedIn"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a href="mailto:fikrildev@gmail.com">
            <img
              src="/icons/email.svg"
              alt="Email"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a
            href="https://medium.com/@fikrilal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/medium.svg"
              alt="Medium"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a
            href="https://www.instagram.com/fikril.al/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/instagram.svg"
              alt="Instagram"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
          <a
            href="https://wa.me/+6285156023639"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/whatsapp.svg"
              alt="WhatsApp"
              className="w-6 h-6 md:w-8 md:h-8 hover:opacity-80 transition"
            />
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-xs md:text-sm text-gray-500">
          © 2025 FIKRIL AL. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
