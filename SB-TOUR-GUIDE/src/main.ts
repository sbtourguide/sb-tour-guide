import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

type PriceTier = {
  min: number;
  max: number;
  price: number;
};

type Package = {
  id: string;
  name: string;
  description: string;
  prices: PriceTier[];
};

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <header class="header">
      <a class="brand" href="#home" (click)="backToPackages()">
        <span class="brand-mark">SB</span>
        <span>TOUR GUIDE</span>
      </a>
      <a class="contact" [href]="whatsappLink">CONTACT US ↗</a>
    </header>

    <nav class="nav">
      <a href="#home" (click)="backToPackages()">Home</a>
      <a href="#experiences" (click)="backToPackages()">Experiences</a>
      <a href="#destinations" (click)="backToPackages()">Destinations</a>
      <a href="#packages" (click)="backToPackages()">Packages</a>
      <a href="#about" (click)="backToPackages()">About</a>
    </nav>

    <main>
      <section class="hero" id="home">
        <div class="hero-content">
          <span class="eyebrow">YOUR LOCAL GUIDE TO BALI</span>
          <h1>Discover Bali.<br>Experience <em>Authentic.</em></h1>
          <p>
            Explore Bali with a local tour guide.
            Discover breathtaking landscapes, rich Balinese culture,
            unforgettable adventures and hidden gems.
          </p>
          <a href="#experiences" class="hero-button">
            EXPLORE BALI TOURS ↗
          </a>
        </div>
        <span class="hero-number">01 / BALI EXPERIENCE</span>
      </section>

      <section class="intro section" id="experiences">
        <span class="eyebrow dark">EXPLORE BALI / 2026</span>
        <h2>Discover your next<br><em>adventure.</em></h2>
        <p>
          Experience the best of Bali with local tour guides.
          Enjoy breathtaking Mount Batur sunrise tours,
          scenic trekking and authentic Balinese culture.
        </p>

        <div class="category-grid">
          <button class="category-card jeep-card"
            [class.active]="activeTab === 'jeep'"
            (click)="changeTab('jeep'); goToPackages()">
            <span class="category-number">01</span>
            <span class="category-icon">✦</span>
            <strong>MOUNT BATUR<br>JEEP TOUR</strong>
            <span class="category-bottom">EXPLORE JEEP TOUR ↗</span>
          </button>

          <button class="category-card trek-card"
            [class.active]="activeTab === 'trekking'"
            (click)="changeTab('trekking'); goToPackages()">
            <span class="category-number">02</span>
            <span class="category-icon">△</span>
            <strong>MOUNT BATUR<br>TREKKING</strong>
            <span class="category-bottom">EXPLORE TREKKING ↗</span>
          </button>
        </div>
      </section>

      <section class="destinations section" id="destinations">
        <span class="eyebrow dark">DISCOVER BALI / DESTINATIONS</span>
        <h2>Explore beautiful<br><em>places in Bali.</em></h2>
        <p class="destinations-intro">
          Discover Bali's beautiful volcanic landscapes,
          mountain cafes, refreshing waterfalls and relaxing
          natural hot springs with SB Tour Guide.
        </p>

        @for (place of destinations; track place.title; let i = $index) {
          <article class="destination-item">
            <div class="destination-photo">
              <img [src]="place.photo" [alt]="place.title">
              <span class="photo-number">0{{ i + 1 }} / DESTINATION</span>
            </div>
            <div class="destination-content">
              <span class="destination-category">{{ place.category }}</span>
              <h3>{{ place.title }}</h3>
              <p>{{ place.description }}</p>
            </div>
          </article>
        }
      </section>

      <section class="packages section" id="packages">
        <div class="section-heading">
          <div>
            <span class="eyebrow dark">CHOOSE YOUR JOURNEY</span>
            <h2>
              {{ activeTab === 'jeep' ? 'Jeep Tour' : 'Mountain Trekking' }}<br>
              <em>{{ activeTab === 'jeep' ? 'Packages.' : 'Experiences.' }}</em>
            </h2>
          </div>
          <span class="edition">SB / 001</span>
        </div>

        @if (activeTab === 'trekking') {
          <div class="tabs">
            <button [class.selected]="trekTime === 'sunrise'"
              (click)="changeTrekTime('sunrise')">SUNRISE</button>
            <button [class.selected]="trekTime === 'sunset'"
              (click)="changeTrekTime('sunset')">SUNSET</button>
          </div>
        }

        @if (!detailView) {
          <div class="package-list">
            @for (pkg of activePackages; track pkg.id; let i = $index) {
              <button class="package-item" (click)="openPackage(pkg)">
                <span class="package-index">0{{ i + 1 }}</span>
                <span class="package-name">
                  <strong>{{ pkg.name }}</strong>
                  <small>{{ pkg.description }}</small>
                </span>
                <span class="arrow">↗</span>
              </button>
            }
          </div>
        } @else {
          <div class="detail-page">
            <button class="back-button" (click)="returnToPackages()">
              ← BACK TO PACKAGES
            </button>

            <div class="detail-heading">
              <span class="eyebrow dark">YOUR SELECTED EXPERIENCE</span>
              <h2>{{ selectedPackage.name }}</h2>
              <p>{{ selectedPackage.description }}</p>
            </div>

            <div class="gallery">
              @for (photo of selectedPhotos; track photo; let i = $index) {
                <div class="gallery-photo">
                  <img [src]="photo"
                    [alt]="selectedPackage.name + ' photo ' + (i + 1)">
                </div>
              }
            </div>

            <p class="gallery-caption">SWIPE TO EXPLORE THE EXPERIENCE →</p>

            <div class="detail-description">
              <span class="eyebrow dark">ABOUT THIS EXPERIENCE</span>
              <h3>Discover the experience.</h3>
              <p>{{ selectedDetailDescription }}</p>
            </div>

            <div class="detail-info">
              <div class="info-box">
                <span>01 / INCLUDED</span>
                <h3>What's included</h3>
                <ul>
                  @for (item of selectedIncludes; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              </div>

              <div class="info-box">
                <span>02 / NOT INCLUDED</span>
                <h3>What's excluded</h3>
                <ul>
                  @for (item of activeExcludes; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              </div>
            </div>

            <div class="notice">
              <span class="eyebrow dark">GOOD TO KNOW</span>
              <h3>Know before you go.</h3>
              <ul>
                @for (item of selectedNotes; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>

            <div class="booking-card">
              <span class="eyebrow dark">BOOK YOUR EXPERIENCE</span>
              <h3>Choose your participants.</h3>

              <div class="field">
                <label for="participants">NUMBER OF PARTICIPANTS</label>
                <select id="participants" [value]="participants"
                  (change)="onParticipantsChange($event)">
                  @for (n of participantOptions; track n) {
                    <option [value]="n">
                      {{ n }} {{ n === 1 ? 'Person' : 'People' }}
                    </option>
                  }
                </select>
              </div>

              <div class="price-area">
                <span>PRICE PER PERSON</span>
                @if (selectedPrice !== null) {
                  <strong>{{ formatPrice(selectedPrice) }}</strong>
                  <small>
                    Total for {{ participants }} people:
                    {{ formatPrice(selectedPrice * participants) }}
                  </small>
                } @else {
                  <strong>Contact us</strong>
                  <small>Special group pricing available on request.</small>
                }
              </div>

              <a class="book-button" [href]="whatsappLink"
                target="_blank" rel="noopener">
                BOOK THIS EXPERIENCE ↗
              </a>

              @if (activeTab === 'jeep') {
                <a class="gyg-button"
                  href="https://www.getyourguide.com/kintamani-l118050/bali-sokasi-making-strawberry-garden-coffee-tour-t1517626/"
                  target="_blank" rel="noopener">
                  BOOK ON GETYOURGUIDE ↗
                </a>
              } @else if (trekTime === 'sunrise') {
                <a class="gyg-button"
                  href="https://www.getyourguide.com/kintamani-l118050/bali-tukad-seganing-farm-cafe-private-tour-with-pickup-t1501628/"
                  target="_blank" rel="noopener">
                  BOOK ON GETYOURGUIDE ↗
                </a>
              } @else {
                <a class="gyg-button"
                  href="https://www.getyourguide.com/bangli-city-l269190/bali-penglipuran-village-kehen-temple-coffee-tour-t1500435/"
                  target="_blank" rel="noopener">
                  BOOK ON GETYOURGUIDE ↗
                </a>
              }

              <p class="secure-note">
                LOCAL EXPERIENCE · BALI, INDONESIA
              </p>
            </div>
          </div>
        }
      </section>

      <section class="about-section section" id="about">
        <span class="eyebrow dark">THE EXPERIENCE / ABOUT US</span>
        <h2>Beyond the <em>ordinary.</em></h2>
        <p>
          SB Tour Guide offers memorable Bali experiences with local
          guides. Explore Mount Batur, discover beautiful destinations
          and enjoy the island at your own pace.
        </p>
      </section>

      <section class="final-cta">
        <span class="eyebrow">YOUR BALI ADVENTURE STARTS HERE</span>
        <h2>Let's explore<br>Bali together.</h2>
        <a [href]="whatsappLink" target="_blank" rel="noopener">
          PLAN YOUR JOURNEY ↗
        </a>
      </section>
    </main>

    <footer>
      <a class="brand footer-brand" href="#home">
        <span class="brand-mark">SB</span>
        <span>TOUR GUIDE</span>
      </a>
      <p>Discover Bali. Experience More.</p>
      <small>© 2026 SB TOUR GUIDE. ALL RIGHTS RESERVED.</small>
    </footer>
  `,
  styles: [`
    * { box-sizing: border-box; }

    :host {
      display: block;
      color: #171717;
      font-family: Arial, Helvetica, sans-serif;
      background: #f7f7f5;
    }

    a { color: inherit; text-decoration: none; }
    button, select { font: inherit; }

    .header {
      min-height: 84px;
      padding: 18px 7%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 17px;
      font-weight: 800;
      letter-spacing: 3px;
    }

    .brand-mark {
      background: #d92d3b;
      color: white;
      width: 47px;
      height: 47px;
      display: grid;
      place-items: center;
      font-size: 19px;
      letter-spacing: 0;
    }

    .contact {
      background: #171717;
      color: white;
      padding: 14px 19px;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .nav {
      display: flex;
      gap: 30px;
      padding: 18px 7%;
      background: white;
      border-top: 1px solid #eee;
      font-size: 13px;
      color: #686868;
      overflow-x: auto;
      white-space: nowrap;
    }

    .nav a:hover { color: #d92d3b; }

    .hero {
      min-height: 550px;
      margin: 0 2%;
      padding: 85px 7%;
      color: white;
      position: relative;
      display: flex;
      align-items: center;
      overflow: hidden;
      background:
        linear-gradient(90deg,rgba(0,0,0,.75),rgba(0,0,0,.12)),
        linear-gradient(135deg,#24333c,#777b75 50%,#c1a88a);
    }

    .hero:after {
      content: "BALI";
      position: absolute;
      right: 2%;
      bottom: -55px;
      font-size: clamp(100px,22vw,260px);
      font-weight: 900;
      color: rgba(255,255,255,.08);
      pointer-events: none;
    }

    .hero-content {
      max-width: 620px;
      position: relative;
      z-index: 1;
    }

    .eyebrow {
      font-size: 10px;
      letter-spacing: 3px;
      font-weight: bold;
    }

    .hero h1 {
      font-size: clamp(42px,7vw,76px);
      line-height: .99;
      letter-spacing: -3px;
      margin: 24px 0;
    }

    h1 em, h2 em {
      color: #dc3545;
      font-style: normal;
    }

    .hero p {
      max-width: 440px;
      line-height: 1.8;
      color: #eee;
    }

    .hero-button {
      display: inline-block;
      margin-top: 22px;
      padding: 16px 20px;
      background: #d92d3b;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .hero-number {
      position: absolute;
      bottom: 24px;
      right: 35px;
      font-size: 10px;
      letter-spacing: 2px;
    }

    .section { padding: 90px 8%; }
    .dark { color: #777; }

    h2 {
      font-size: clamp(36px,5vw,58px);
      letter-spacing: -2px;
      line-height: 1.05;
      margin: 18px 0;
    }

    .intro > p, .about-section > p {
      color: #777;
      max-width: 530px;
      line-height: 1.8;
    }

    .category-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 45px;
    }

    .category-card {
      min-height: 260px;
      padding: 28px;
      text-align: left;
      color: white;
      border: 0;
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      transition: .2s;
    }

    .jeep-card { background: linear-gradient(135deg,#353c3e,#858b80); }
    .trek-card { background: linear-gradient(135deg,#3d4149,#9a8773); }

    .category-card.active {
      outline: 3px solid #d92d3b;
      outline-offset: -3px;
    }

    .category-card strong {
      font-size: clamp(22px,3vw,34px);
      line-height: 1.1;
    }

    .category-number { font-size: 12px; }

    .category-icon {
      position: absolute;
      right: 28px;
      top: 22px;
      font-size: 35px;
      color: #e9d5bd;
    }

    .category-bottom {
      font-size: 10px;
      letter-spacing: 2px;
    }

    .destinations { background: #fff; }

    .destinations-intro {
      color: #777;
      max-width: 550px;
      line-height: 1.8;
      margin-bottom: 45px;
    }

    .destination-item { margin-top: 55px; }

    .destination-photo {
      width: 100%;
      height: 390px;
      border-radius: 7px;
      overflow: hidden;
      position: relative;
    }

    .destination-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .destination-photo::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg,rgba(0,0,0,.45),transparent 55%);
      pointer-events: none;
    }

    .photo-number {
      position: absolute;
      z-index: 1;
      bottom: 22px;
      left: 22px;
      color: white;
      font-size: 11px;
      letter-spacing: 2px;
      font-weight: bold;
    }

    .destination-content { padding: 28px 0 15px; }

    .destination-category {
      color: #a95b2a;
      font-size: 13px;
      letter-spacing: 3px;
      font-weight: bold;
    }

    .destination-content h3 {
      color: #171c29;
      font-size: clamp(23px,4vw,34px);
      line-height: 1.15;
      margin: 22px 0 12px;
    }

    .destination-content p {
      color: #626875;
      font-size: 17px;
      line-height: 1.85;
      margin: 12px 0 22px;
    }

    .packages {
      background: #efefec;
      scroll-margin-top: 20px;
    }

    .section-heading {
      display: flex;
      justify-content: space-between;
      align-items: end;
    }

    .edition {
      font-size: 11px;
      letter-spacing: 2px;
      color: #999;
      padding-bottom: 25px;
    }

    .tabs {
      display: flex;
      gap: 8px;
      margin: 30px 0;
    }

    .tabs button {
      border: 1px solid #ccc;
      background: transparent;
      padding: 13px 24px;
      font-size: 10px;
      letter-spacing: 1px;
      cursor: pointer;
    }

    .tabs button.selected {
      background: #171717;
      color: white;
      border-color: #171717;
    }

    .package-list { margin-top: 35px; }

    .package-item {
      width: 100%;
      padding: 25px 18px;
      display: flex;
      gap: 20px;
      align-items: center;
      text-align: left;
      background: transparent;
      border: 0;
      border-bottom: 1px solid #d6d6d2;
      cursor: pointer;
      transition: .2s;
    }

    .package-item:hover {
      background: white;
      padding-left: 25px;
    }

    .package-index {
      font-size: 14px;
      color: #999;
    }

    .package-name {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .package-name strong {
      font-size: 19px;
      color: #3985ef;
    }

    .package-name small {
      font-size: 14px;
      color: #888;
      line-height: 1.6;
    }

    .arrow { font-size: 23px; }

    .detail-page {
      margin-top: 35px;
      background: #fff;
      padding: 28px;
    }

    .back-button {
      border: 1px solid #ddd;
      background: white;
      padding: 13px 18px;
      cursor: pointer;
      font-size: 11px;
      letter-spacing: 1px;
      font-weight: bold;
    }

    .back-button:hover {
      background: #171717;
      color: white;
    }

    .detail-heading { padding: 35px 0 20px; }

    .detail-heading h2 {
      font-size: clamp(30px,5vw,46px);
      margin: 15px 0;
    }

    .detail-heading p {
      color: #777;
      line-height: 1.8;
      max-width: 700px;
    }

    .gallery {
      display: flex;
      gap: 14px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding: 5px 0 15px;
    }

    .gallery-photo {
      flex: 0 0 78%;
      height: 280px;
      overflow: hidden;
      border-radius: 6px;
      scroll-snap-align: start;
      background: #eee;
    }

    .gallery-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .gallery-caption {
      color: #999;
      font-size: 9px;
      letter-spacing: 2px;
      margin: 8px 0 35px;
    }

    .detail-description {
      padding: 25px 0 35px;
      border-bottom: 1px solid #eee;
    }

    .detail-description h3 {
      font-size: 27px;
      margin: 15px 0;
    }

    .detail-description p {
      color: #777;
      font-size: 14px;
      line-height: 1.9;
    }

    .detail-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
      margin-top: 30px;
    }

    .info-box {
      padding: 25px;
      border: 1px solid #e2e2df;
    }

    .info-box > span {
      font-size: 10px;
      letter-spacing: 2px;
      color: #999;
    }

    .info-box h3, .notice h3 { font-size: 22px; }

    ul {
      padding-left: 20px;
      color: #777;
      font-size: 13px;
      line-height: 2;
    }

    .notice {
      background: #f0f0ed;
      margin-top: 22px;
      padding: 28px;
    }

    .booking-card {
      background: #fafaf8;
      border: 1px solid #e5e5e0;
      padding: 28px;
      margin-top: 30px;
    }

    .booking-card h3 {
      font-size: 25px;
      margin: 18px 0;
    }

    .field { margin: 28px 0; }

    .field label, .price-area span {
      display: block;
      font-size: 10px;
      letter-spacing: 1.5px;
      font-weight: bold;
      color: #777;
      margin-bottom: 10px;
    }

    select {
      width: 100%;
      padding: 14px;
      border: 1px solid #ddd;
      background: white;
      color: #222;
    }

    .price-area {
      background: #efefec;
      padding: 20px;
    }

    .price-area strong {
      display: block;
      font-size: 31px;
      margin: 8px 0;
    }

    .price-area small {
      color: #777;
      font-size: 12px;
      line-height: 1.7;
    }

    .book-button {
      display: block;
      text-align: center;
      background: #d92d3b;
      color: white;
      padding: 18px;
      margin-top: 20px;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .gyg-button {
      display: block;
      text-align: center;
      padding: 17px;
      margin-top: 10px;
      border: 1px solid #222;
      color: #222;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .gyg-button:hover {
      background: #222;
      color: white;
    }

    .secure-note {
      font-size: 9px;
      text-align: center;
      color: #999;
      letter-spacing: 1.5px;
      margin-top: 18px;
    }

    .about-section > p {
      max-width: 800px;
      font-size: 14px;
      line-height: 1.9;
    }

    .final-cta {
      background: #202326;
      color: white;
      text-align: center;
      padding: 90px 20px;
    }

    .final-cta h2 {
      font-size: clamp(42px,6vw,68px);
    }

    .final-cta a {
      display: inline-block;
      margin-top: 20px;
      background: #d92d3b;
      padding: 17px 25px;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    footer {
      padding: 35px 8%;
      background: white;
      text-align: center;
    }

    .footer-brand { justify-content: center; }

    footer p {
      color: #888;
      font-size: 13px;
    }

    footer small {
      color: #999;
      font-size: 9px;
      letter-spacing: 1px;
    }

    @media(max-width:700px) {
      .header {
        padding: 14px 5%;
        min-height: 70px;
      }

      .brand {
        font-size: 13px;
        letter-spacing: 2px;
        gap: 8px;
      }

      .brand-mark {
        width: 39px;
        height: 39px;
      }

      .contact {
        font-size: 9px;
        padding: 12px;
      }

      .nav {
        gap: 20px;
        padding: 16px 5%;
      }

      .hero {
        min-height: 490px;
        margin: 0;
        padding: 65px 7%;
      }

      .hero h1 { letter-spacing: -2px; }

      .section { padding: 65px 6%; }

      .category-grid { gap: 10px; }

      .category-card {
        min-height: 210px;
        padding: 17px;
      }

      .category-card strong { font-size: 20px; }

      .destination-item { margin-top: 42px; }

      .destination-photo { height: 250px; }

      .destination-content { padding-top: 25px; }

      .destination-content p {
        font-size: 15px;
        line-height: 1.8;
      }

      .package-item { padding: 22px 8px; }

      .package-name strong { font-size: 16px; }
      .package-name small { font-size: 12px; }

      .detail-page {
        padding: 18px;
        margin-top: 25px;
      }

      .gallery-photo {
        flex-basis: 88%;
        height: 230px;
      }

      .detail-info { grid-template-columns: 1fr; }

      .booking-card { padding: 20px; }

      .edition { font-size: 9px; }
    }
  `]
})
export class App {
  activeTab: 'jeep' | 'trekking' = 'jeep';
  trekTime: 'sunrise' | 'sunset' = 'sunrise';
  participants = 2;
  selectedPackageId = 'jeep-only-no-transfer';
  detailView = false;

  participantOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  destinations = [
    {
      category: 'MOUNTAIN ADVENTURE',
      title: 'MOUNT BATUR SUNRISE TREKKING',
      description: 'Enjoy an unforgettable early morning trek to the summit of Mount Batur. Witness a beautiful sunrise with panoramic views of Lake Batur, Mount Abang and Mount Agung.',
      photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200'
    },
    {
      category: 'VOLCANIC JEEP ADVENTURE',
      title: 'MOUNT BATUR SUNRISE JEEP TOUR',
      description: 'Explore Mount Batur in a traditional 4WD Jeep and enjoy a spectacular sunrise without hiking to the summit. Discover the famous black lava fields and volcanic landscape.',
      photo: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200'
    },
    {
      category: 'COFFEE EXPERIENCE & MOUNTAIN VIEW',
      title: 'AKASA SPECIALTY COFFEE',
      description: 'Relax at AKASA Specialty Coffee in the beautiful Kintamani highlands. Enjoy freshly brewed coffee, refreshing drinks and impressive mountain views.',
      photo: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200'
    },
    {
      category: 'TROPICAL NATURE & WATERFALL',
      title: 'ULU PETANU WATERFALL',
      description: 'Discover the peaceful beauty of Ulu Petanu Waterfall, surrounded by lush tropical greenery and natural rock formations.',
      photo: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200'
    },
    {
      category: 'RELAXING NATURAL HOT SPRING',
      title: 'THE JANU HOT SPRING',
      description: 'Take a relaxing break at The Janu Hot Spring in Kintamani. Enjoy warm water, peaceful mountain surroundings and beautiful natural scenery.',
      photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200'
    },
    {
      category: 'ICONIC BALI WATERFALL',
      title: 'KANTO LAMPO WATERFALL',
      description: 'Visit the famous Kanto Lampo Waterfall in Gianyar, known for its unique cascading water flowing over natural rock formations.',
      photo: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200'
    }
  ];

  jeepPackages: Package[] = [
    {
      id: 'jeep-only-no-transfer',
      name: 'Jeep Only – No Transfer',
      description: 'Jeep sunrise experience. Guests arrange their own transport to the meeting point.',
      prices: [
        { min: 1, max: 1, price: 600000 },
        { min: 2, max: 2, price: 300000 },
        { min: 3, max: 10, price: 225000 },
        { min: 11, max: 20, price: 175000 }
      ]
    },
    {
      id: 'jeep-only-transfer',
      name: 'Jeep Only – With Transfer',
      description: 'Sunrise Jeep tour with hotel pickup and drop-off. No cafe or waterfall visit.',
      prices: [
        { min: 1, max: 1, price: 1400000 },
        { min: 2, max: 2, price: 725000 },
        { min: 3, max: 10, price: 550000 },
        { min: 11, max: 20, price: 450000 }
      ]
    },
    {
      id: 'jeep-akasa',
      name: 'Jeep + AKASA Cafe',
      description: 'Sunrise Jeep adventure followed by coffee and caldera views at AKASA.',
      prices: [
        { min: 1, max: 1, price: 1410000 },
        { min: 2, max: 2, price: 730000 },
        { min: 3, max: 10, price: 560000 },
        { min: 11, max: 20, price: 450000 }
      ]
    },
    {
      id: 'jeep-waterfall',
      name: 'Jeep + Ulu Petanu Waterfall',
      description: 'Sunrise Jeep adventure and a visit to Ulu Petanu Waterfall.',
      prices: [
        { min: 1, max: 1, price: 1430000 },
        { min: 2, max: 2, price: 750000 },
        { min: 3, max: 10, price: 575000 },
        { min: 11, max: 20, price: 465000 }
      ]
    },
    {
      id: 'jeep-hot-spring',
      name: 'Jeep + Hot Spring',
      description: 'Mount Batur sunrise Jeep adventure followed by The Janu Hot Spring.',
      prices: [
        { min: 1, max: 1, price: 1600000 },
        { min: 2, max: 2, price: 900000 },
        { min: 3, max: 10, price: 750000 },
        { min: 11, max: 20, price: 650000 }
      ]
    },
    {
      id: 'jeep-akasa-waterfall',
      name: 'Jeep + AKASA + Waterfall',
      description: 'Sunrise Jeep, relaxing coffee at AKASA and Ulu Petanu Waterfall.',
      prices: [
        { min: 1, max: 1, price: 1450000 },
        { min: 2, max: 2, price: 760000 },
        { min: 3, max: 10, price: 585000 },
        { min: 11, max: 20, price: 475000 }
      ]
    }
  ];

  trekkingSunrise: Package[] = [
    {
      id: 'trek-sunrise-only-no-transfer',
      name: 'Sunrise Trekking Only – No Transfer',
      description: 'Sunrise summit trekking. Guests travel independently to the starting point.',
      prices: [
        { min: 1, max: 1, price: 850000 },
        { min: 2, max: 2, price: 510000 },
        { min: 3, max: 10, price: 475000 },
        { min: 11, max: 20, price: 450000 }
      ]
    },
    {
      id: 'trek-sunrise-only-transfer',
      name: 'Sunrise Trekking Only – With Transfer',
      description: 'Sunrise summit trekking with hotel pickup and drop-off.',
      prices: [
        { min: 1, max: 1, price: 1650000 },
        { min: 2, max: 2, price: 875000 },
        { min: 3, max: 10, price: 775000 },
        { min: 11, max: 20, price: 725000 },
        { min: 21, max: 30, price: 700000 }
      ]
    },
    {
      id: 'trek-sunrise-akasa',
      name: 'Sunrise Trekking + AKASA',
      description: 'Sunrise trekking followed by a relaxing visit to AKASA Cafe.',
      prices: [
        { min: 1, max: 1, price: 1675000 },
        { min: 2, max: 2, price: 900000 },
        { min: 3, max: 10, price: 800000 },
        { min: 11, max: 20, price: 725000 },
        { min: 21, max: 30, price: 700000 }
      ]
    },
    {
      id: 'trek-sunrise-kanto-lampo',
      name: 'Sunrise Trekking + Kanto Lampo',
      description: 'Sunrise trekking combined with a visit to Kanto Lampo Waterfall.',
      prices: [
        { min: 1, max: 1, price: 1700000 },
        { min: 2, max: 2, price: 900000 },
        { min: 3, max: 10, price: 800000 },
        { min: 11, max: 20, price: 725000 },
        { min: 21, max: 30, price: 700000 }
      ]
    },
    {
      id: 'trek-sunrise-rice',
      name: 'Sunrise Trekking + Rice Terrace',
      description: 'Sunrise trekking followed by a visit to a beautiful rice terrace.',
      prices: [
        { min: 1, max: 1, price: 1700000 },
        { min: 2, max: 2, price: 900000 },
        { min: 3, max: 10, price: 800000 },
        { min: 11, max: 20, price: 725000 },
        { min: 21, max: 30, price: 700000 }
      ]
    },
    {
      id: 'trek-sunrise-hot-spring',
      name: 'Sunrise Trekking + Hot Spring',
      description: 'Sunrise trekking followed by a relaxing hot spring experience.',
      prices: [
        { min: 1, max: 1, price: 1800000 },
        { min: 2, max: 2, price: 950000 },
        { min: 3, max: 10, price: 850000 },
        { min: 11, max: 20, price: 775000 },
        { min: 21, max: 30, price: 750000 }
      ]
    }
  ];

  trekkingSunset: Package[] = [
    {
      id: 'trek-sunset-no-transfer',
      name: 'Sunset Trekking Only – No Transfer',
      description: 'Sunset summit trekking. Guests arrange their own transport.',
      prices: [
        { min: 1, max: 1, price: 850000 },
        { min: 2, max: 2, price: 510000 },
        { min: 3, max: 10, price: 475000 },
        { min: 11, max: 20, price: 450000 }
      ]
    },
    {
      id: 'trek-sunset-transfer',
      name: 'Sunset Trekking Only – With Transfer',
      description: 'Sunset summit trekking with hotel pickup and drop-off.',
      prices: [
        { min: 1, max: 1, price: 1650000 },
        { min: 2, max: 2, price: 875000 },
        { min: 3, max: 10, price: 775000 },
        { min: 11, max: 20, price: 725000 },
        { min: 21, max: 30, price: 700000 }
      ]
    }
  ];

  get activePackages(): Package[] {
    if (this.activeTab === 'jeep') {
      return this.jeepPackages;
    }

    return this.trekTime === 'sunrise'
      ? this.trekkingSunrise
      : this.trekkingSunset;
  }

  get selectedPackage(): Package {
    return this.activePackages.find(
      p => p.id === this.selectedPackageId
    ) ?? this.activePackages[0];
  }

  get selectedPrice(): number | null {
    const tier = this.selectedPackage.prices.find(
      p => this.participants >= p.min && this.participants <= p.max
    );

    return tier ? tier.price : null;
  }

  get whatsappLink(): string {
    const message =
      \`Hello SB Tour Guide! I am interested in \${this.selectedPackage.name}. \` +
      \`Participants: \${this.participants}. \` +
      \`Price per person: \${this.selectedPrice === null
        ? 'Please confirm'
        : this.formatPrice(this.selectedPrice)}.\`;

    return 'https://wa.me/6285956346354?text=' +
      encodeURIComponent(message);
  }

  get selectedPhotos(): string[] {
    const commonJeep = [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200'
    ];

    const trekking = [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200'
    ];

    if (this.activeTab === 'trekking') {
      return trekking;
    }

    if (this.selectedPackageId === 'jeep-waterfall' ||
        this.selectedPackageId === 'jeep-akasa-waterfall') {
      return [
        ...commonJeep,
        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200'
      ];
    }

    if (this.selectedPackageId === 'jeep-hot-spring') {
      return [
        ...commonJeep,
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200'
      ];
    }

    if (this.selectedPackageId === 'jeep-akasa') {
      return [
        ...commonJeep,
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200'
      ];
    }

    return commonJeep;
  }

  get selectedDetailDescription(): string {
    return this.selectedPackage.description +
      ' Enjoy the beautiful scenery of Mount Batur and Kintamani with SB Tour Guide. ' +
      'Your experience is arranged according to the package you select.';
  }

  get selectedIncludes(): string[] {
    const items = this.activeTab === 'jeep'
      ? [
          '4WD Jeep and experienced Jeep driver',
          'Mount Batur sunrise experience',
          'Hotel pickup and drop-off (selected packages)',
          'Destination entrance tickets according to selected package',
          'Parking fees'
        ]
      : [
          'Experienced local Mount Batur trekking guide',
          'Mount Batur entrance ticket',
          'Flashlight or headlamp',
          'Simple breakfast: banana sandwich, boiled egg and biscuits',
          'Hotel pickup and drop-off (selected packages)'
        ];

    if (this.selectedPackageId.includes('akasa')) {
      items.push('AKASA Cafe visit (selected package)');
    }

    if (this.selectedPackageId.includes('waterfall') ||
        this.selectedPackageId.includes('kanto-lampo')) {
      items.push('Waterfall visit according to selected package');
    }

    if (this.selectedPackageId.includes('hot-spring')) {
      items.push('Hot spring visit according to selected package');
    }

    if (this.selectedPackageId.includes('rice')) {
      items.push('Rice terrace visit according to selected package');
    }

    return items;
  }

  activeExcludes = [
    'Meals and breakfast (except trekking breakfast)',
    'Additional food and drinks at cafes',
    'Personal expenses and purchases',
    'Tips for driver or guide',
    'Additional activities outside the itinerary',
    'Expenses not mentioned in the selected package'
  ];

  get selectedNotes(): string[] {
    const notes = [
      'Pickup is available from selected areas, depending on the package.',
      'Pickup time may vary according to hotel location and traffic.',
      'Bring a warm jacket because mountain temperatures can be cold.',
      'Wear comfortable shoes suitable for rocky or uneven paths.',
      'Sunrise visibility depends on weather conditions.',
      'Follow your local guide’s safety instructions throughout the trip.'
    ];

    if (this.activeTab === 'trekking') {
      notes.push(
        'Trekking to the summit takes approximately two hours and has moderate difficulty.'
      );
    }

    if (this.selectedPackageId.includes('no-transfer')) {
      notes.push(
        'This package does not include hotel pickup and drop-off. Guests arrange their own transport to the meeting point.'
      );
    }

    return notes;
  }

  // Membuka detail paket dan tetap berada di bagian Packages.
  openPackage(pkg: Package) {
    this.selectedPackageId = pkg.id;
    this.detailView = true;
    this.participants = 2;

    setTimeout(() => {
      this.scrollToPackages();
    }, 0);
  }

  // Tombol navigasi utama: hanya menutup tampilan detail.
  backToPackages() {
    this.detailView = false;
  }

  // Tombol BACK TO PACKAGES pada halaman detail.
  returnToPackages() {
    this.detailView = false;

    setTimeout(() => {
      this.scrollToPackages();
    }, 0);
  }

  goToPackages() {
    this.detailView = false;

    setTimeout(() => {
      this.scrollToPackages();
    }, 0);
  }

  // Fungsi untuk mengarahkan layar ke bagian Packages.
  private scrollToPackages() {
    document.getElementById('packages')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  changeTab(tab: 'jeep' | 'trekking') {
    this.activeTab = tab;
    this.detailView = false;

    this.selectedPackageId = tab === 'jeep'
      ? 'jeep-only-no-transfer'
      : this.trekTime === 'sunrise'
        ? 'trek-sunrise-only-no-transfer'
        : 'trek-sunset-no-transfer';
  }

  changeTrekTime(time: 'sunrise' | 'sunset') {
    this.trekTime = time;
    this.detailView = false;

    this.selectedPackageId = time === 'sunrise'
      ? 'trek-sunrise-only-no-transfer'
      : 'trek-sunset-no-transfer';
  }

  onParticipantsChange(event: Event) {
    this.participants = Number(
      (event.target as HTMLSelectElement).value
    );
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  }
}

bootstrapApplication(App).catch(err => console.error(err));
