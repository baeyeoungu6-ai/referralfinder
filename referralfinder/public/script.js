function parseReferralUrl(rawValue) {
  try {
    const url = new URL(rawValue.trim());
    const host = url.hostname.replace(/^www\./, "");
    const isBinance = host === "binance.com" || host.endsWith(".binance.com");
    const ref = url.searchParams.get("ref") || url.searchParams.get("referralCode") || "";
    return {
      isValid: true,
      isBinance,
      ref,
      https: url.protocol === "https:"
    };
  } catch {
    return {
      isValid: false,
      isBinance: false,
      ref: "",
      https: false
    };
  }
}

function initLinkChecker() {
  const form = document.querySelector("[data-link-checker]");
  if (!form) return;

  const input = form.querySelector("input");
  const result = document.querySelector("[data-link-result]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const parsed = parseReferralUrl(input.value);
    result.className = "result show";

    if (!parsed.isValid) {
      result.classList.add("warn");
      result.innerHTML = "<h3>Link could not be read</h3><p>Paste the full Binance registration or referral URL, including https://.</p>";
      return;
    }

    if (!parsed.isBinance) {
      result.classList.add("warn");
      result.innerHTML = "<h3>This is not an official Binance domain</h3><p>Use only binance.com links. Do not enter passwords, OTPs, UID, API keys, or identity documents on referral checker sites.</p>";
      return;
    }

    if (!parsed.ref) {
      result.classList.add("warn");
      result.innerHTML = "<h3>No referral code found in this link</h3><p>The URL is on a Binance domain, but this checker did not find a ref parameter. Check the registration screen inside Binance before creating an account.</p>";
      return;
    }

    result.classList.add("ok");
    result.innerHTML = `<h3>Referral code found: ${parsed.ref}</h3><p>This confirms the link contains a referral parameter. It does not prove the code is applied to your account. Log in to Binance and check the official referral page for final confirmation.</p>`;
  });
}

initLinkChecker();
