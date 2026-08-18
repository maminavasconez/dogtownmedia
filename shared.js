(function(){
const {
  useState,
  useEffect,
  useRef
} = React;

/* ---------- ICONS ---------- */
const ArrowUR = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("line", {
  x1: "7",
  y1: "17",
  x2: "17",
  y2: "7"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "8 7 17 7 17 16"
}));
const ArrowR = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "13 6 19 12 13 18"
}));
const LinkedIn = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
}));
const Mail = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("rect", {
  x: "2.5",
  y: "4.5",
  width: "19",
  height: "15",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 6l9 7 9-7"
}));

/* ---------- REVEAL HOOK ---------- */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("in")), {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });
    const els = document.querySelectorAll(".reveal");
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- SCROLL WORD-BY-WORD REVEAL ----------
   Finds headings/paragraphs tagged with .split-words and wraps each word in a span,
   then reveals them on scroll with a small stagger. Modern, type-driven motion.
*/
function useScrollWordReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(".split-words");
    targets.forEach(el => {
      if (el.dataset.split === "1") return;
      el.dataset.split = "1";

      // Walk text nodes only — preserve nested <span>, <br>, links etc.
      const walk = node => {
        for (const child of Array.from(node.childNodes)) {
          if (child.nodeType === Node.TEXT_NODE) {
            const txt = child.textContent;
            if (!txt.trim()) continue;
            const frag = document.createDocumentFragment();
            const parts = txt.split(/(\s+)/);
            parts.forEach(p => {
              if (!p) return;
              if (/^\s+$/.test(p)) {
                frag.appendChild(document.createTextNode(p));
              } else {
                const w = document.createElement("span");
                w.className = "word";
                w.textContent = p;
                frag.appendChild(w);
              }
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            // Skip nested .split-words and .gradient-text to avoid double processing
            // (gradient-text has special styling that breaks on inline-block children)
            if (!child.classList.contains("split-words") && !child.classList.contains("gradient-text")) {
              walk(child);
            }
          }
        }
      };
      walk(el);

      // Stagger each word with a CSS variable
      const words = el.querySelectorAll(".word");
      words.forEach((w, i) => w.style.setProperty("--i", i));
    });
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("words-in");
        io.unobserve(e.target);
      }
    }), {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    });
    document.querySelectorAll(".split-words").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- NAV ---------- */
function Nav({
  active
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = e => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current && menuBtnRef.current.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  const links = [{
    href: "/",
    label: "Home",
    key: "home"
  }, {
    href: "work",
    label: "Work",
    key: "work"
  }, {
    href: "about",
    label: "About",
    key: "about"
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: `nav ${scrolled ? "scrolled" : ""}`
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    className: "nav-mark"
  }, /*#__PURE__*/React.createElement("img", {
    src: "logo.png",
    alt: "Martina",
    style: {
      width: 32,
      height: 32,
      display: 'block',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-mark-text"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: '-0.02em'
    }
  }, "martina", /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 5,
      height: 5,
      background: 'var(--violet)',
      borderRadius: '50%',
      marginLeft: 4,
      verticalAlign: 'baseline',
      marginTop: -3
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: l.href,
    className: active === l.key ? "active" : ""
  }, l.label))), /*#__PURE__*/React.createElement("a", {
    href: "https://calendly.com/martinavasconez/30min",
    className: "nav-cta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Get in touch"), /*#__PURE__*/React.createElement("button", {
    ref: menuBtnRef,
    type: "button",
    className: `nav-burger${menuOpen ? " is-open" : ""}`,
    "aria-label": menuOpen ? "Close menu" : "Open menu",
    "aria-expanded": menuOpen,
    "aria-controls": "mobile-nav-menu",
    onClick: () => setMenuOpen(v => !v)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    id: "mobile-nav-menu",
    className: `nav-mobile-menu${menuOpen ? " is-open" : ""}`,
    "aria-hidden": !menuOpen
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: l.href,
    className: active === l.key ? "active" : "",
    tabIndex: menuOpen ? 0 : -1,
    onClick: () => setMenuOpen(false)
  }, l.label))), /*#__PURE__*/React.createElement("a", {
    href: "https://calendly.com/martinavasconez/30min",
    className: "btn btn-lime nav-mobile-cta",
    tabIndex: menuOpen ? 0 : -1,
    onClick: () => setMenuOpen(false)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Get in touch")), document.body));
}

/* ---------- FOOTER ---------- */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-brand"
  }, /*#__PURE__*/React.createElement("h3", null, "martina ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--lime)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgb(255, 255, 255)"
    }
  }, "vasconez."))), /*#__PURE__*/React.createElement("p", null, "Strategist, creator, and entrepreneur with a background in growth, marketing, storytelling, and design.")), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Pages"), /*#__PURE__*/React.createElement("a", {
    href: "/"
  }, "Home"), /*#__PURE__*/React.createElement("a", {
    href: "work"
  }, "Work"), /*#__PURE__*/React.createElement("a", {
    href: "about"
  }, "About me"), /*#__PURE__*/React.createElement("a", {
    href: "privacy-policy"
  }, "Privacy Policy"), /*#__PURE__*/React.createElement("a", {
    href: "terms-conditions"
  }, "Terms & Conditions")), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "LET'S CONNECT"), /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/in/martina-vasconez-579732193",
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn ↗"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:martinavasconez@gmail.com"
  }, "Email ↗")), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:martinavasconez@gmail.com"
  }, "martinavasconez@gmail.com"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+13052039587"
  }, "+1 (305) 203-9587"), /*#__PURE__*/React.createElement("a", {
    href: "https://calendly.com/martinavasconez/30min",
    target: "_blank",
    rel: "noopener"
  }, "Schedule a call ↗"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bot"
  }, /*#__PURE__*/React.createElement("span", null, "© 2026 Martina Vasconez"), /*#__PURE__*/React.createElement("span", null, "BUILT WITH ❤️ BY MARTINA\xA0· ✱"))));
}

/* ---------- WORK CARD (shared) ---------- */
function WorkCard({
  p
}) {
  const isCaseStudy = p.caseStudy;
  return /*#__PURE__*/React.createElement("a", {
    href: p.caseStudyUrl || `project?id=${p.id}`,
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("article", {
    className: `work-card ${isCaseStudy ? 'work-card--case-study' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "work-card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "work-card-cat"
  }, p.cat)), /*#__PURE__*/React.createElement("h3", {
    className: "work-card-title"
  }, p.title), /*#__PURE__*/React.createElement("p", {
    className: "work-card-blurb"
  }, p.blurb), /*#__PURE__*/React.createElement("div", {
    className: "work-card-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "work-card-metric"
  }, p.metric), isCaseStudy ? /*#__PURE__*/React.createElement("button", {
    style: {
      background: '#c6ff33',
      color: '#1a1a1a',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 16px',
      fontSize: '13px',
      fontWeight: 500,
      cursor: 'pointer',
      fontFamily: 'inherit',
      letterSpacing: '0.03em'
    }
  }, "Case study") : /*#__PURE__*/React.createElement("span", {
    className: "work-card-arrow"
  }, /*#__PURE__*/React.createElement(ArrowUR, null))))));
}
Object.assign(window, {
  Nav,
  Footer,
  WorkCard,
  useReveal,
  useScrollWordReveal,
  ArrowUR,
  ArrowR,
  LinkedIn,
  Mail
});
})();
