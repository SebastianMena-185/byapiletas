// Arma el mensaje con los datos del formulario y lo abre en WhatsApp.
// No se guarda nada: el formulario no tiene servidor.
const WHATSAPP = "5493413550483";

const abrirWhatsApp = (lineas) => {
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lineas.join("\n"))}`;
  window.open(url, "_blank", "noopener");
};

document.getElementById("form-presupuesto").addEventListener("submit", (event) => {
  event.preventDefault();
  const datos = new FormData(event.target);
  const espacio = datos.get("espacio").trim();

  const lineas = [
    `Hola, soy ${datos.get("nombre").trim()} y quiero pedir un presupuesto.`,
    `Modelo: ${datos.get("modelo")}`,
    `Localidad: ${datos.get("localidad").trim()}`,
  ];
  if (espacio) lineas.push(`Espacio disponible: ${espacio}`);
  abrirWhatsApp(lineas);
});

document.getElementById("form-plasticos").addEventListener("submit", (event) => {
  event.preventDefault();
  const datos = new FormData(event.target);
  const cantidad = datos.get("cantidad").trim();

  const lineas = [
    `Hola, escribo de ${datos.get("empresa").trim()} y quiero cotizar un trabajo en plástico.`,
    `Necesitamos fabricar: ${datos.get("trabajo").trim()}`,
  ];
  if (cantidad) lineas.push(`Cantidad aproximada: ${cantidad}`);
  abrirWhatsApp(lineas);
});

// El video de agua solo corre cuando se ve, y queda quieto si la persona pidió menos movimiento.
const agua = document.getElementById("agua");
const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

if (menosMovimiento.matches) {
  agua.removeAttribute("autoplay");
  agua.pause();
} else {
  new IntersectionObserver(([entrada]) => {
    if (entrada.isIntersecting) agua.play().catch(() => {});
    else agua.pause();
  }).observe(agua);
}
