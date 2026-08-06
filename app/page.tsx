const eventFormats = [
  "Conferences", "Webinars", "Product Launches", "Life Science Events", "Town Halls",
  "Exhibitions", "Internal Comms", "Registration & Websites", "Video",
];

const approach = [
  { number: "01", title: "Experience", text: "We put your audience first. From agenda design to multilingual support, every delegate enjoys an inclusive, accessible and seamless event experience." },
  { number: "02", title: "Engagement", text: "We create participation, not passivity. Dialogue, polling and facilitation turn delegates into contributors who share knowledge and shape outcomes." },
  { number: "03", title: "Insights", text: "We make events measurable. Real-time feedback and post-event analysis give you the evidence to prove ROI and improve next time." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Open Audience home"><img src="https://www.openaudience.com/wp-content/uploads/2022/08/logo.svg" alt="Open Audience" /></a>
        <nav aria-label="Primary navigation">
          <div className="nav-group"><a href="/event-technology/">Products &amp; Services</a><div className="dropdown"><div className="subgroup"><a href="/event-technology/products/">Products <span>›</span></a><div className="flyout"><a href="/openmeet/">OpenMeet</a><a href="/openvod/">OpenVOD</a><a href="/opentube/">OpenTube</a></div></div><a href="/event-technology/services/">Services</a></div></div>
          <a href="/event-technology/solutions/">Solutions</a>
          <a href="/events/life-sciences/">Life Sciences</a>
          <div className="nav-group"><a href="#">More</a><div className="dropdown"><a href="/sustainability-at-open-audience/">Sustainability</a><a href="/blog/">Blog</a><a href="/case-studies/">Case Studies</a></div></div>
          <a href="/contact/">Contact</a>
        </nav>
        <a className="mobile-contact" href="#contact">Contact</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-shape" />
        <div className="hero-content">
          <h1>We are audience engagement experts</h1>
          <p>We design and deliver <strong>audience engagement strategies</strong> for <strong>life sciences, healthcare, and complex corporate events</strong>, helping organisations make meetings matter by putting their audience first.</p>
          <p>We consult, design, and deliver engagement for <strong>live, hybrid, and virtual programmes</strong>, selecting the best-fit technology to support <strong>participation, inclusion, and measurable impact</strong> across <strong>80+ markets and 40+ languages.</strong></p>
          <a className="button button-light" href="#contact">Book a Consultation</a>
        </div>
      </section>

      <section className="intro section" id="life-sciences">
        <p className="eyebrow">AUDIENCE FIRST. ALWAYS.</p>
        <h2>Our aim is simple: turn passive delegates into active participants</h2>
        <div className="two-col-copy">
          <p>We start by understanding your <strong>objectives, context, and audience</strong>, then design engagement experiences that give everyone a voice, whether in <strong>regulated healthcare meetings</strong> or <strong>high-stakes corporate environments.</strong></p>
          <p>By combining <strong>engagement design, facilitation, and technology</strong>, we create meetings that are more <strong>inclusive, interactive, and effective</strong>, supporting real contribution rather than surface-level interaction.</p>
        </div>
      </section>

      <section className="blue-section" id="services">
        <div className="section blue-grid">
          <div>
            <p className="eyebrow light">WHAT WE DO</p>
            <h2>We make meetings matter – for every audience, everywhere</h2>
            <p>Since 2015, we’ve supported organisations across <strong>life sciences, healthcare, and complex corporate sectors</strong> to design and deliver events where audiences actively participate and outcomes are clear.</p>
            <p>Our work focuses on engagement strategies that drive participation, knowledge sharing, and measurable outcomes across live, virtual, and hybrid formats.</p>
            <a className="button button-light" href="#contact">Book a Consultation</a>
          </div>
          <div className="service-cards">
            <article><span>01</span><h3>Design &amp;<br />Facilitation</h3><p>Agendas, dialogue, moderation, inclusivity</p></article>
            <article><span>02</span><h3>Technology &amp;<br />Delivery</h3><p>We select and integrate the best-fit platforms</p></article>
            <article><span>03</span><h3>Insight &amp;<br />Impact</h3><p>Real-time feedback, analytics, behavioural change</p></article>
          </div>
        </div>
      </section>

      <section className="formats" id="solutions">
        <div className="formats-overlay section">
          <p className="eyebrow light">OUR EXPERTISE</p>
          <h2>Event Formats</h2>
          <div className="format-grid">
            {eventFormats.map((item) => <a href="#contact" key={item}>{item}<span>↗</span></a>)}
          </div>
        </div>
      </section>

      <section className="section how" id="about">
        <p className="eyebrow">OUR APPROACH</p>
        <h2>How we work</h2>
        <div className="approach-grid">
          {approach.map((item) => <article key={item.title}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
        </div>
        <a className="button button-blue" href="#contact">Book a Consultation</a>
      </section>

      <section className="contact-banner" id="contact">
        <div className="section contact-inner">
          <p className="eyebrow light">CONTACT US</p>
          <h2>Book a<br />conversation today</h2>
          <p>We would love to talk to you about your audience engagement challenges</p>
          <a className="button button-blue" href="mailto:info@openaudience.com">Get in touch</a>
        </div>
      </section>

      <footer>
        <div className="section footer-grid">
          <div><a className="brand brand-white" href="#top"><img src="https://www.openaudience.com/wp-content/themes/open-audience_1_2/svg/logo-white.svg" alt="Open Audience" /></a></div>
          <div><h4>Sign up for our newsletter</h4><a href="mailto:info@openaudience.com?subject=Newsletter%20sign-up">Sign up →</a></div>
          <div><h4>Links</h4><a href="#">Privacy Policy</a><a href="#">Cookies Policy</a></div>
          <div><h4>Contact</h4><a href="tel:01296294136">+44 (0) 1296 294136</a><a href="mailto:info@openaudience.com">info@openaudience.com</a></div>
        </div>
        <div className="copyright section">© Open Audience 2026</div>
      </footer>
      <input className="cookie-toggle" type="checkbox" id="cookie-dismiss" />
      <input className="settings-toggle" type="checkbox" id="cookie-settings" />
      <aside className="cookie-banner" aria-label="Cookie notice"><p>This site uses cookies. By continuing to browse the site, you are agreeing to our use of cookies.</p><div className="cookie-actions"><label htmlFor="cookie-dismiss">Accept settings</label><label htmlFor="cookie-dismiss">Hide notification only</label><label htmlFor="cookie-settings">Settings</label></div></aside>
      <section className="cookie-modal" aria-label="Cookie and Privacy Settings"><div><label className="modal-close" htmlFor="cookie-settings">×</label><h3>Cookie and Privacy Settings</h3><h4>How we use cookies</h4><p>We may request cookies to be set on your device. We use cookies to let us know when you visit our websites, how you interact with us, to enrich your user experience, and to customize your relationship with our website.</p><h4>Essential Website Cookies</h4><p>These cookies are strictly necessary to provide you with services available through our website and to use some of its features.</p><h4>Other external services</h4><p>We also use different external services like Google Webfonts, Google Maps, and external video providers.</p><label className="modal-accept" htmlFor="cookie-dismiss">Accept settings</label></div></section>
    </main>
  );
}
