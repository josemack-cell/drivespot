export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        {[
          ["Customer Service", ["Contact Us", "Returns", "Shipping Info"]],
          ["Company", ["About Us", "Careers", "Blog"]],
          ["Legal", ["Terms", "Privacy Policy", "Cookie Policy"]],
          ["Follow Us", ["Facebook", "Instagram", "YouTube"]],
        ].map(([title, links], idx) => (
          <div key={idx}>
            <h3 className="font-semibold mb-2 border-l-2 border-accent pl-3">
              {title}
            </h3>
            <ul className="space-y-1">
              {links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-accent">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-muted text-sm text-center py-4 px-4">
        <p>&copy; {new Date().getFullYear()} Drivespot. All rights reserved.</p>
      </div>
    </footer>
  );
}
