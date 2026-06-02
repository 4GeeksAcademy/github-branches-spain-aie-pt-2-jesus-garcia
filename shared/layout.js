(function () {
  const path = window.location.pathname;
  const cleanPath = path.replace(/\/index\.html$/, "/");
  const segments = cleanPath.split("/").filter(Boolean);
  const appSections = new Set(["catalogue", "product", "cart", "checkout"]);
  const hasProjectBase = segments.length > 0 && !appSections.has(segments[0]);

  const contentDepth = hasProjectBase ? Math.max(0, segments.length - 1) : segments.length;
  const root = contentDepth === 0 ? "" : "../".repeat(contentDepth);
  const section = contentDepth === 0 ? "home" : segments[segments.length - 1];

  const links = [
    { href: `${root}`, key: "home", label: "Home" },
    { href: `${root}catalogue/`, key: "catalogue", label: "Catalogo" },
    { href: `${root}product/`, key: "product", label: "Producto" },
    { href: `${root}cart/`, key: "cart", label: "Carrito" },
    { href: `${root}checkout/`, key: "checkout", label: "Checkout" }
  ];

  const navLinks = links
    .map((link) => {
      const active =
        (section === "home" && link.key === "home") ||
        (section !== "home" && section === link.key);

      const base = "rounded-full px-4 py-2 text-sm font-semibold transition";
      const state = active
        ? " bg-rose-200 text-rose-900"
        : " text-rose-900 hover:bg-rose-100";

      return `<a href="${link.href}" class="${base}${state}">${link.label}</a>`;
    })
    .join("");

  const headerSlot = document.querySelector("[data-site-header]");
  if (headerSlot) {
    headerSlot.innerHTML = `
      <header class="sticky top-0 z-30 border-b border-rose-200/70 bg-rose-50/90 backdrop-blur">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="${root}" class="text-xl font-black tracking-tight text-rose-900">Maison Lumiere Paris</a>
          <nav aria-label="Navegacion principal" class="flex flex-wrap justify-end gap-2">${navLinks}</nav>
        </div>
      </header>
    `;
  }

  const footerSlot = document.querySelector("[data-site-footer]");
  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="mt-16 border-t border-rose-200 bg-rose-50/80">
        <div class="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 text-rose-900">
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wide text-rose-700">Maison Lumiere Paris</h2>
            <p class="mt-3 text-sm text-rose-800/80">Firma francesa de moda contemporanea con lanzamientos de autor.</p>
          </section>
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wide text-rose-900">Explorar</h2>
            <ul class="mt-3 space-y-2 text-sm text-rose-800/80">
              <li><a class="hover:text-rose-600" href="${root}catalogue/">Catalogo</a></li>
              <li><a class="hover:text-rose-600" href="${root}product/">Producto</a></li>
              <li><a class="hover:text-rose-600" href="${root}cart/">Carrito</a></li>
            </ul>
          </section>
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wide text-rose-900">Maison</h2>
            <ul class="mt-3 space-y-2 text-sm text-rose-800/80">
              <li><a class="hover:text-rose-600" href="${root}checkout/">Pedidos</a></li>
              <li><a class="hover:text-rose-600" href="#">Envios internacionales</a></li>
              <li><a class="hover:text-rose-600" href="#">Atencion al cliente</a></li>
            </ul>
          </section>
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wide text-rose-900">Atelier</h2>
            <address class="mt-3 not-italic text-sm text-rose-800/80">
              18 Rue de la Paix<br />
              75002 Paris, France<br />
              contact@maisonlumiere.example
            </address>
          </section>
        </div>
        <p class="border-t border-rose-200 px-4 py-4 text-center text-xs text-rose-700 sm:px-6 lg:px-8">
          © 2026 Maison Lumiere Paris. Todos los derechos reservados.
        </p>
      </footer>
    `;
  }
})();
