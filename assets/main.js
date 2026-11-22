(function () {
  var header = document.querySelector(".site-header");
  var ctaBar = document.querySelector(".cta-bar");
  var requestSection = document.getElementById("anfrage");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 4);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile Leiste ausblenden, sobald das Formular sichtbar ist
  if (ctaBar && requestSection && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      ctaBar.classList.toggle("hidden", entries[0].isIntersecting);
    }, { threshold: 0.05 }).observe(requestSection);
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Anfrageformular ----------
  var form = document.getElementById("anfrage-form");
  if (!form) return;
  var status = form.querySelector(".form-status");

  // "Hausbesuch / Online anfragen" wählt das Format im Formular vor
  document.querySelectorAll("[data-format]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var radio = form.querySelector('input[name="format"][value="' + btn.dataset.format + '"]');
      if (!radio) return;
      radio.checked = true;
      var chips = radio.closest(".chips");
      chips.classList.add("flash");
      setTimeout(function () { chips.classList.remove("flash"); }, 1600);
    });
  });

  // "Platz anfragen" bei Workshops: Nachricht vorausfüllen
  document.querySelectorAll("[data-anliegen]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var msg = form.elements.nachricht;
      msg.value = "Ich möchte einen Platz anfragen: " + btn.dataset.anliegen + ".\n" + msg.value;
    });
  });

  var nameInput = form.elements.name;
  var mailInput = form.elements.email;
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function check(input, test, message) {
    var field = input.closest(".field");
    var hint = field.querySelector(".hint");
    var ok = test(input.value.trim());
    if (ok) {
      field.removeAttribute("data-invalid");
      input.removeAttribute("aria-invalid");
      hint.textContent = "";
    } else {
      field.setAttribute("data-invalid", "");
      input.setAttribute("aria-invalid", "true");
      hint.textContent = message;
    }
    return ok;
  }

  function checkName() {
    return check(nameInput, function (v) { return v.length > 1; }, "Bitte gib deinen Namen ein.");
  }
  function checkMail() {
    return check(mailInput, function (v) { return emailRe.test(v); }, "Bitte prüfe die E-Mail-Adresse, z. B. name@beispiel.de.");
  }

  // Sofort prüfen, sobald man ein Feld verlässt; danach live beim Tippen
  [[nameInput, checkName], [mailInput, checkMail]].forEach(function (pair) {
    pair[0].addEventListener("blur", function () {
      if (pair[0].value) pair[1]();
    });
    pair[0].addEventListener("input", function () {
      if (pair[0].closest(".field").hasAttribute("data-invalid")) pair[1]();
    });
  });

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = "form-status" + (kind ? " " + kind : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var okName = checkName();
    var okMail = checkMail();
    if (!okName || !okMail) {
      (okName ? mailInput : nameInput).focus();
      setStatus("", "");
      return;
    }
    if (!form.elements.datenschutz.checked) {
      setStatus("Bitte bestätige noch den Hinweis zum Datenschutz.", "err");
      form.elements.datenschutz.focus();
      return;
    }

    var data = new FormData(form);
    var zeiten = data.getAll("zeit").join(", ") || "flexibel";
    var endpoint = form.dataset.endpoint;

    if (endpoint) {
      setStatus("Anfrage wird gesendet …");
      fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: data })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.reset();
          setStatus("Anfrage gesendet. Ich melde mich bald bei dir.", "ok");
        })
        .catch(function () {
          setStatus("Die Anfrage kam nicht an. Schreib mir bitte direkt an " + form.dataset.email + ".", "err");
        });
      return;
    }

    var body = [
      "Beratung: " + data.get("format"),
      "Phase: " + (data.get("phase") || "-"),
      "Zeit: " + zeiten,
      "",
      "Name: " + data.get("name"),
      "E-Mail: " + data.get("email"),
      "Telefon: " + (data.get("telefon") || "-"),
      "",
      data.get("nachricht") || ""
    ].join("\n");

    window.location.href =
      "mailto:" + form.dataset.email +
      "?subject=" + encodeURIComponent("Anfrage Stillberatung – " + data.get("format")) +
      "&body=" + encodeURIComponent(body);
    setStatus("Dein E-Mail-Programm öffnet sich. Tippe dort auf „Senden“.", "ok");
  });
})();
