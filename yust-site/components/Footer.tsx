export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* NEWSLETTER */}
        <div>
          <h3 className="uppercase text-sm tracking-wide font-semibold">
            S'abonner à la newsletter
          </h3>

          <form 
            action="mailto:tonemail@tondomaine.com"
            method="POST"
            encType="text/plain"
            className="flex items-center mt-4"
          >
            <input
              type="email"
              required
              placeholder="Email address"
              className="bg-transparent border-b border-neutral-500 focus:outline-none w-full py-2 text-sm"
            />
            <button
              type="submit"
              className="ml-4 bg-black text-white px-4 py-2 text-sm font-semibold"
            >
              →
            </button>
          </form>
        </div>

        {/* LIENS CENTRAUX */}
        <div className="space-y-3 text-sm uppercase tracking-wide md:mx-auto">
          <a href="/contact" className="block hover:opacity-60 transition">Contact</a>
          <a href="/retours" className="block hover:opacity-60 transition">Retours</a>
          <a href="/conditions-retour" className="block hover:opacity-60 transition">Conditions de retour</a>
          <a href="/confidentialite" className="block hover:opacity-60 transition">Confidentialité</a>
          <a href="/cgv" className="block hover:opacity-60 transition">CGV</a>
          <a href="/cookies" className="block hover:opacity-60 transition">Cookies</a>
          <a href="/about" className="block hover:opacity-60 transition">À propos</a>
        </div>

        {/* RÉSEAUX SOCIAUX */}
        <div className="flex md:justify-end items-start space-x-6">
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:opacity-60 transition"
          >
            <img src="/icons/instagram.png" className="w-7 h-auto" />
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            className="hover:opacity-60 transition"
          >
            <img src="/icons/tiktok.png" className="w-7 h-auto" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:opacity-60 transition"
          >
            <img src="/icons/linkedin.png" className="w-7 h-auto" />
          </a>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-neutral-300 py-6 text-xs text-neutral-500 text-center">
        © {new Date().getFullYear()} — Youth Street — Tous droits réservés.
      </div>
    </footer>
  );
}
