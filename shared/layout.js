(function () {
  const path = window.location.pathname;
  const cleanPath = path.replace(/\/index\.html$/, "/");
  const depth = cleanPath.split("/").filter(Boolean).length;
  const root = "../".repeat(depth);

  const section = cleanPath.split("/").filter(Boolean)[0] || "home";

  const links = [
    { href: `${root}index.html`, key: "home", label: "Home" },
    { href: `${root}catalogo/index.html`, key: "catalogo", label: "Catalogo" },
    { href: `${root}producto/index.html`, key: "producto", label: "Producto" },
    { href: `${root}carrito/index.html`, key: "carrito", label: "Carrito" },
    { href: `${root}checkout/index.html`, key: "checkout", label: "Checkout" }
  ];

  const navLinks = links
    .map((link) => {
      const active =
        (section === "home" && link.key === "home") ||
        (section !== "home" && section === link.key);

      const base = "rounded-full px-4 py-2 text-sm font-semibold transition";
      const state = active
        ? " bg-amber-400 text-zinc-900"
        : " text-zinc-100 hover:bg-zinc-700/70";

      return `<a href="${link.href}" class="${base}${state}">${link.label}</a>`;
    })
    .join("");

  const headerSlot = document.querySelector("[data-site-header]");
  if (headerSlot) {
    headerSlot.innerHTML = `
      <header class="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="${root}index.html" class="text-xl font-black tracking-tight text-amber-300">Tienda Norte</a>
          <nav aria-label="Navegacion principal" class="flex flex-wrap justify-end gap-2">${navLinks}</nav>
        </div>
      </header>
    `;
  }

  const footerSlot = document.querySelector("[data-site-footer]");
  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="mt-16 border-t border-zinc-800 bg-zinc-900">
        <div class="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wide text-amber-300">Tienda Norte</h2>
            <p class="mt-3 text-sm text-zinc-300">Moda urbana y outdoor con lanzamientos semanales.</p>
          </section>
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wide text-zinc-100">Explorar</h2>
            <ul class="mt-3 space-y-2 text-sm text-zinc-300">
              <li><a class="hover:text-amber-300" href="${root}catalogo/index.html">Catalogo</a></li>
              <li><a class="hover:text-amber-300" href="${root}producto/index.html">Producto</a></li>
              <li><a class="hover:text-amber-300" href="${root}carrito/index.html">Carrito</a></li>
            </ul>
          </section>
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wide text-zinc-100">Ayuda</h2>
            <ul class="mt-3 space-y-2 text-sm text-zinc-300">
              <li><a class="hover:text-amber-300" href="${root}checkout/index.html">Pago</a></li>
              <li><a class="hover:text-amber-300" href="#">Envios</a></li>
              <li><a class="hover:text-amber-300" href="#">Cambios y devoluciones</a></li>
            </ul>
          </section>
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wide text-zinc-100">Contacto</h2>
            <address class="mt-3 not-italic text-sm text-zinc-300">
              Centro Historico 245<br />
              Monterrey, NL<br />
              soporte@tiendanorte.example
            </address>
          </section>
        </div>
        <p class="border-t border-zinc-800 px-4 py-4 text-center text-xs text-zinc-400 sm:px-6 lg:px-8">
          © 2026 Tienda Norte. Todos los derechos reservados.
        </p>
      </footer>
    `;
  }
})();
