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
  photos: string[];
  includes: string[];
  excludes: string[];
  notes: string[];
};

type Destination = {
  name: string;
  image: string;
  description: string;
};

const jeepPhotos = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200'
];

const trekkingPhotos = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200'
];

const jeepBaseIncludes = [
  'Penjemputan dan pengantaran hotel',
  'Transportasi pribadi selama tur',
  'Jeep 4WD untuk pengalaman menyaksikan matahari terbit di Gunung Batur.',
  'Pengemudi dan pemandu Jeep berpengalaman',
  'Tiket masuk ke destinasi yang termasuk dalam rencana perjalanan.'
];

const jeepBaseExcludes = [
  'Makanan dan sarapan',
  'Pengeluaran pribadi',
  'Tips untuk pengemudi atau pemandu wisata',
  'Aktivitas tambahan di luar rencana perjalanan',
  'Segala biaya yang tidak disebutkan dalam bagian Termasuk'
];

const jeepBaseNotes = [
  'Layanan antar-jemput hotel tersedia dari area-area tertentu.',
  'Pengalaman Jeep di Gunung Batur menggunakan kendaraan 4WD dan menyusuri jalur vulkanik berbatu dan tidak beraspal.',
  'Suhu di sekitar Gunung Batur bisa dingin di pagi hari, jadi disarankan untuk membawa jaket atau pakaian hangat.',
  'Disarankan untuk memakai sepatu atau sandal yang nyaman saat berjalan.',
  'Visibilitas saat matahari terbit mungkin bergantung pada kondisi cuaca.',
  'Sarapan dan makan siang tidak termasuk.',
  'Biaya pribadi dan aktivitas di luar rencana perjalanan tidak termasuk.'
];

const trekBaseIncludes = [
  'Penjemputan dan pengantaran pribadi dari hotel',
  'Pemandu trekking pribadi',
  'Sarapan ringan (roti lapis pisang, telur, dan biskuit)',
  'Air mineral',
  'Senter',
  'Tiket trekking',
  'Semua tiket masuk untuk opsi yang dipilih'
];

const trekBaseExcludes = [
  'Minuman dan makanan pribadi',
  'Pengeluaran pribadi',
  'Minuman hangat di puncak gunung'
];

const trekBaseNotes = [
  'Pendakian dimulai sangat pagi, dalam keadaan gelap, jadi mohon bawa pakaian hangat dan sepatu hiking yang nyaman.',
  'Pendakian ke puncak memakan waktu sekitar 2 jam dan dianggap memiliki tingkat kesulitan sedang.',
  'Pemandu Anda akan menyediakan senter atau lampu kepala.',
  'Suhu di puncak bisa sangat dingin sebelum matahari terbit.',
  'Anda bisa mengganti pakaian setelah mendaki sebelum melanjutkan tur.',
  'Mohon bawa uang tunai untuk pengeluaran pribadi selama perjalanan.',
  'Harap ikuti petunjuk keselamatan dari pemandu Anda selama pendakian.'
];

function createPackage(
  id: string,
  name: string,
  description: string,
  prices: PriceTier[],
  photos: string[],
  includes: string[],
  excludes: string[],
  notes: string[]
): Package {
  return {
    id,
    name,
    description,
    prices,
    photos,
    includes,
    excludes,
    notes
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <header class="header">
      <a class="brand" href="#home" (click)="backToPackages()">
        <span class="brand-mark">SB</span>
        <span class="brand-name">SB TOUR GUIDE</span>
      </a>
      <a class="header-contact" [href]="whatsappContact" target="_blank">
        CONTACT US
      </a>
    </header>

    <nav class="navigation">
      <a href="#home" (click)="backToPackages()">Home</a>
      <a href="#experiences" (click)="backToPackages()">Experiences</a>
      <a href="#destinations" (click)="backToPackages()">Destinations</a>
      <a href="#packages" (click)="backToPackages()">Packages</a>
      <a href="#about" (click)="backToPackages()">About</a>
    </nav>

    <main>
      <section class="hero" id="home">
        <div class="hero-content">
          <span class="eyebrow">WELCOME TO BALI</span>
          <h1>Discover Bali.<br>Experience Authentic.</h1>
          <p>
            Explore the beauty of Bali with unforgettable adventures
            and authentic local experiences.
          </p>
          <a href="#experiences" class="primary-button">
            EXPLORE EXPERIENCES
          </a>
        </div>
      </section>

      <section class="intro section" id="experiences">
        <span class="eyebrow">YOUR BALI ADVENTURE</span>
        <h2>Explore Beautiful Places in Bali</h2>
        <p class="intro-description">
          Discover your next adventure with our carefully selected
          Bali experiences.
        </p>

        <div class="experience-grid">
          <button class="experience-card" (click)="chooseCategory('jeep')">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000"
              alt="Bali Jeep Adventure"
            >
            <span class="experience-overlay">
              <small>EXPLORE BALI</small>
              <strong>Mount Batur Jeep Tour</strong>
              <span>DISCOVER MORE →</span>
            </span>
          </button>

          <button class="experience-card" (click)="chooseCategory('trekking')">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000"
              alt="Mount Batur Trekking"
            >
            <span class="experience-overlay">
              <small>UNFORGETTABLE EXPERIENCE</small>
              <strong>Mount Batur Trekking</strong>
              <span>DISCOVER MORE →</span>
            </span>
          </button>
        </div>
      </section>

      <section class="destinations section" id="destinations">
        <div class="section-heading">
          <span class="eyebrow">EXPLORE BALI</span>
          <h2>Discover Beautiful Destinations</h2>
          <p>Explore some of the most beautiful places in Bali.</p>
        </div>

        <div class="destination-grid">
          @for (destination of destinations; track destination.name) {
            <article class="destination-card">
              <img [src]="destination.image" [alt]="destination.name">
              <div class="destination-info">
                <h3>{{ destination.name }}</h3>
                <p>{{ destination.description }}</p>
              </div>
            </article>
          }
        </div>
      </section>

      <section class="packages section" id="packages">
        @if (!detailView) {
          <div class="section-heading">
            <span class="eyebrow">CHOOSE YOUR EXPERIENCE</span>
            <h2>Our Tour Packages</h2>
            <p>Find the perfect experience for your Bali adventure.</p>
          </div>

          <div class="category-tabs">
            <button
              [class.active]="activeTab === 'jeep'"
              (click)="changeTab('jeep')"
            >
              JEEP TOUR
            </button>
            <button
              [class.active]="activeTab === 'trekking'"
              (click)="changeTab('trekking')"
            >
              MOUNT BATUR TREKKING
            </button>
          </div>

          @if (activeTab === 'trekking') {
            <div class="time-tabs">
              <button
                [class.active]="trekTime === 'sunrise'"
                (click)="changeTrekTime('sunrise')"
              >
                SUNRISE
              </button>
              <button
                [class.active]="trekTime === 'sunset'"
                (click)="changeTrekTime('sunset')"
              >
                SUNSET
              </button>
            </div>
          }

          <div class="package-list">
            @for (pkg of activePackages; track pkg.id) {
              <article class="package-item">
                <div class="package-item-info">
                  <span class="package-number">BALI EXPERIENCE</span>
                  <h3>{{ pkg.name }}</h3>
                  <p>{{ pkg.description }}</p>
                </div>
                <button
                  class="package-button"
                  (click)="openPackage(pkg)"
                >
                  VIEW PACKAGE →
                </button>
              </article>
            }
          </div>
        } @else {
          <div class="detail-container">
            <button class="back-button" (click)="returnToPackages()">
              ← KEMBALI KE PAKET
            </button>

            <div class="detail-heading">
              <span class="eyebrow">YOUR SELECTED EXPERIENCE</span>
              <h2>{{ selectedPackage.name }}</h2>
            </div>

            <div class="gallery">
              @for (photo of selectedPhotos; track photo; let i = $index) {
                <img
                  [src]="photo"
                  [class.gallery-main]="i === 0"
                  [alt]="selectedPackage.name"
                >
              }
            </div>

            <div class="detail-columns">
              <div class="detail-information">
                <div class="detail-box">
                  <h3>Deskripsi Singkat</h3>
                  <p>{{ selectedPackage.description }}</p>
                </div>

                <div class="detail-box">
                  <h3>Termasuk</h3>
                  <ul>
                    @for (item of selectedPackage.includes; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>

                <div class="detail-box">
                  <h3>Tidak Termasuk</h3>
                  <ul>
                    @for (item of selectedPackage.excludes; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>

                <div class="detail-box">
                  <h3>Ketahui Sebelum Anda Pergi</h3>
                  <ul>
                    @for (item of selectedPackage.notes; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>
              </div>

              <aside class="booking-box">
                <span class="eyebrow">BOOK YOUR ADVENTURE</span>
                <h3>Booking Details</h3>

                <label for="participants">Jumlah Peserta</label>
                <select
                  id="participants"
                  [value]="participants"
                  (change)="onParticipantsChange($event)"
                >
                  @for (number of participantOptions; track number) {
                    <option [value]="number">{{ number }} Orang</option>
                  }
                </select>

                <div class="price-line">
                  <span>Harga per orang</span>
                  <strong>
                    @if (selectedPrice !== null) {
                      {{ formatPrice(selectedPrice) }}
                    } @else {
                      Hubungi kami
                    }
                  </strong>
                </div>

                <div class="total-price">
                  <span>Total Harga</span>
                  <strong>
                    @if (selectedPrice !== null) {
                      {{ formatPrice(selectedPrice * participants) }}
                    } @else {
                      Hubungi kami
                    }
                  </strong>
                </div>

                <a
                  class="whatsapp-button"
                  [href]="whatsappLink"
                  target="_blank"
                >
                  BOOK VIA WHATSAPP
                </a>

                <p class="booking-note">
                  Hubungi kami untuk memastikan ketersediaan dan pemesanan.
                </p>
              </aside>
            </div>
          </div>
        }
      </section>

      <section class="about section" id="about">
        <div class="about-image">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200"
            alt="Beautiful Bali scenery"
          >
        </div>
        <div class="about-content">
          <span class="eyebrow">ABOUT US</span>
          <h2>Experience Bali With Local Experts</h2>
          <p>
            SB Tour Guide is dedicated to creating memorable
            experiences in Bali. We help travelers discover
            beautiful destinations, local culture, and exciting
            adventures.
          </p>
          <p>
            From Mount Batur adventures to beautiful waterfalls,
            we are here to make your Bali journey special.
          </p>
          <a [href]="whatsappContact" target="_blank" class="primary-button">
            CONTACT US
          </a>
        </div>
      </section>

      <section class="final-cta">
        <span class="eyebrow">READY FOR YOUR NEXT ADVENTURE?</span>
        <h2>Let's Explore Bali Together</h2>
        <p>Create unforgettable memories with SB Tour Guide.</p>
        <a [href]="whatsappContact" target="_blank" class="primary-button">
          CONTACT US ON WHATSAPP
        </a>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-brand">
        <span class="brand-mark">SB</span>
        <strong>SB TOUR GUIDE</strong>
      </div>
      <p>Discover Bali. Experience Authentic.</p>
      <p class="copyright">
        © {{ currentYear }} SB Tour Guide. All Rights Reserved.
      </p>
    </footer>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #252923;
    }

    button, a, select {
      font: inherit;
    }

    button {
      cursor: pointer;
    }

    .header {
      height: 76px;
      padding: 0 7%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #263b30;
      font-weight: 800;
      letter-spacing: 2px;
    }

    .brand-mark {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #314d3c;
      color: white;
      font-size: 15px;
      letter-spacing: 0;
    }

    .brand-name {
      font-size: 15px;
    }

    .header-contact {
      padding: 12px 22px;
      border: 1px solid #314d3c;
      color: #314d3c;
      text-decoration: none;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .navigation {
      min-height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 38px;
      background: #f4f4f0;
      padding: 12px;
    }

    .navigation a {
      color: #39463c;
      text-decoration: none;
      font-size: 12px;
      font-weight: bold;
    }

    .navigation a:hover {
      color: #a47c46;
    }

    .hero {
      min-height: 570px;
      display: flex;
      align-items: center;
      padding: 70px 10%;
      background:
        linear-gradient(90deg, rgba(16, 29, 22, .75), rgba(16, 29, 22, .1)),
        url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800')
        center/cover;
      color: white;
    }

    .hero-content {
      max-width: 650px;
    }

    .eyebrow {
      color: #ad8b5b;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 3px;
    }

    .hero h1 {
      font-family: Georgia, serif;
      font-size: clamp(42px, 6vw, 76px);
      line-height: 1.08;
      margin: 22px 0;
      font-weight: 500;
    }

    .hero p {
      max-width: 470px;
      line-height: 1.8;
      font-size: 15px;
      color: #eeeeea;
      margin-bottom: 30px;
    }

    .primary-button {
      display: inline-block;
      padding: 16px 25px;
      background: #344f3e;
      color: white;
      text-decoration: none;
      border: none;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1.5px;
      transition: .2s;
    }

    .primary-button:hover,
    .whatsapp-button:hover {
      background: #a47c46;
    }

    .section {
      padding: 85px 8%;
      scroll-margin-top: 20px;
    }

    .intro {
      text-align: center;
      background: #fafaf7;
    }

    .section h2,
    .about h2,
    .final-cta h2 {
      font-family: Georgia, serif;
      font-size: clamp(30px, 4vw, 44px);
      font-weight: 500;
      margin: 15px 0;
      color: #293c30;
    }

    .intro-description,
    .section-heading > p {
      color: #777d75;
      line-height: 1.8;
      font-size: 14px;
    }

    .experience-grid {
      max-width: 1100px;
      margin: 45px auto 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px;
    }

    .experience-card {
      position: relative;
      padding: 0;
      border: none;
      height: 360px;
      overflow: hidden;
      text-align: left;
      background: #ddd;
    }

    .experience-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .5s;
    }

    .experience-card:hover img {
      transform: scale(1.06);
    }

    .experience-overlay {
      position: absolute;
      inset: 0;
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: end;
      color: white;
      background: linear-gradient(transparent, rgba(0,0,0,.75));
    }

    .experience-overlay small {
      color: #e3c18d;
      font-size: 10px;
      letter-spacing: 2px;
    }

    .experience-overlay strong {
      font-family: Georgia, serif;
      font-size: 29px;
      font-weight: 500;
      margin: 10px 0;
    }

    .experience-overlay span {
      font-size: 10px;
      letter-spacing: 2px;
    }

    .destinations {
      background: #fff;
    }

    .section-heading {
      text-align: center;
      margin-bottom: 40px;
    }

    .destination-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      max-width: 1150px;
      margin: auto;
    }

    .destination-card {
      background: #f8f8f4;
      overflow: hidden;
    }

    .destination-card img {
      width: 100%;
      height: 220px;
      display: block;
      object-fit: cover;
    }

    .destination-info {
      padding: 20px;
    }

    .destination-info h3 {
      font-family: Georgia, serif;
      font-size: 19px;
      font-weight: 500;
      color: #344b39;
      margin: 0 0 10px;
    }

    .destination-info p {
      font-size: 12px;
      color: #777;
      line-height: 1.7;
      margin: 0;
    }

    .packages {
      background: #efefec;
    }

    .category-tabs,
    .time-tabs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      margin: 30px 0;
    }

    .category-tabs button,
    .time-tabs button {
      padding: 14px 24px;
      border: 1px solid #b8bdb6;
      background: transparent;
      color: #354638;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .category-tabs button.active,
    .time-tabs button.active {
      background: #344f3e;
      color: white;
      border-color: #344f3e;
    }

    .time-tabs {
      margin-top: -10px;
      margin-bottom: 30px;
    }

    .time-tabs button {
      padding: 11px 28px;
    }

    .package-list {
      max-width: 950px;
      margin: auto;
    }

    .package-item {
      background: white;
      margin-bottom: 14px;
      padding: 25px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      border: 1px solid #e5e5df;
    }

    .package-number {
      color: #a47c46;
      font-size: 9px;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .package-item h3 {
      color: #344b39;
      font-family: Georgia, serif;
      font-size: 21px;
      font-weight: 500;
      margin: 8px 0;
    }

    .package-item p {
      font-size: 12px;
      color: #777;
      line-height: 1.6;
      margin: 0;
    }

    .package-button {
      flex-shrink: 0;
      padding: 13px 18px;
      border: none;
      background: #344f3e;
      color: white;
      font-size: 10px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .package-button:hover {
      background: #a47c46;
    }

    .detail-container {
      max-width: 1100px;
      margin: auto;
    }

    .back-button {
      background: none;
      border: none;
      color: #344f3e;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
      padding: 10px 0;
      margin-bottom: 25px;
    }

    .detail-heading {
      margin-bottom: 25px;
    }

    .detail-heading h2 {
      margin: 10px 0;
    }

    .gallery {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 180px 180px;
      gap: 12px;
      margin-bottom: 35px;
    }

    .gallery img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .gallery .gallery-main {
      grid-row: span 2;
    }

    .detail-columns {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: 30px;
      align-items: start;
    }

    .detail-box {
      background: white;
      padding: 25px;
      margin-bottom: 16px;
    }

    .detail-box h3,
    .booking-box h3 {
      font-family: Georgia, serif;
      color: #344b39;
      font-size: 21px;
      font-weight: 500;
      margin: 0 0 18px;
    }

    .detail-box p,
    .detail-box li {
      color: #626a62;
      font-size: 13px;
      line-height: 1.9;
    }

    .detail-box p {
      margin: 0;
    }

    .detail-box ul {
      padding-left: 20px;
      margin: 0;
    }

    .detail-box li {
      margin-bottom: 7px;
    }

    .booking-box {
      position: sticky;
      top: 20px;
      background: white;
      padding: 28px;
      border: 1px solid #e2e3dc;
    }

    .booking-box h3 {
      margin-top: 12px;
    }

    .booking-box label {
      display: block;
      margin: 25px 0 9px;
      font-size: 12px;
      font-weight: bold;
    }

    .booking-box select {
      width: 100%;
      padding: 13px;
      background: white;
      border: 1px solid #d4d7d0;
      color: #344b39;
    }

    .price-line,
    .total-price {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      padding: 17px 0;
      border-bottom: 1px solid #e7e7e1;
      font-size: 12px;
    }

    .price-line strong {
      color: #344b39;
      text-align: right;
    }

    .total-price {
      font-size: 14px;
      font-weight: bold;
      color: #344b39;
      border: none;
    }

    .total-price strong {
      text-align: right;
    }

    .whatsapp-button {
      display: block;
      padding: 16px;
      text-align: center;
      background: #344f3e;
      color: white;
      text-decoration: none;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
      margin-top: 15px;
    }

    .booking-note {
      color: #858980;
      font-size: 11px;
      text-align: center;
      line-height: 1.6;
      margin-bottom: 0;
    }

    .about {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 55px;
      align-items: center;
      background: #fafaf7;
    }

    .about-image img {
      width: 100%;
      min-height: 350px;
      object-fit: cover;
    }

    .about-content p {
      color: #737970;
      font-size: 13px;
      line-height: 1.9;
      margin: 18px 0;
    }

    .final-cta {
      text-align: center;
      padding: 85px 20px;
      background: #314b39;
      color: white;
    }

    .final-cta h2 {
      color: white;
    }

    .final-cta p {
      color: #e0e5df;
      font-size: 13px;
      margin: 20px 0 30px;
    }

    .final-cta .primary-button {
      background: #b08b58;
    }

    .footer {
      text-align: center;
      padding: 40px 20px;
      background: #202d24;
      color: #e7e9e5;
    }

    .footer-brand {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      letter-spacing: 2px;
      font-size: 13px;
    }

    .footer-brand .brand-mark {
      background: #a47c46;
    }

    .footer p {
      color: #b9c0b9;
      font-size: 12px;
      margin: 18px 0;
    }

    .footer .copyright {
      font-size: 10px;
      color: #89928a;
      margin-bottom: 0;
    }

    @media (max-width: 760px) {
      .header {
        height: 65px;
        padding: 0 5%;
      }

      .brand-name {
        font-size: 12px;
      }

      .header-contact {
        padding: 10px 13px;
        font-size: 10px;
      }

      .navigation {
        gap: 17px;
        overflow-x: auto;
        justify-content: flex-start;
        padding: 15px;
      }

      .navigation a {
        white-space: nowrap;
        font-size: 10px;
      }

      .hero {
        min-height: 490px;
        padding: 55px 7%;
      }

      .section {
        padding: 65px 6%;
      }

      .experience-grid,
      .destination-grid,
      .about,
      .detail-columns {
        grid-template-columns: 1fr;
      }

      .experience-card {
        height: 290px;
      }

      .destination-card img {
        height: 210px;
      }

      .package-item {
        padding: 20px;
        align-items: flex-start;
        flex-direction: column;
      }

      .package-button {
        width: 100%;
      }

      .gallery {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 170px 120px;
      }

      .gallery .gallery-main {
        grid-column: span 2;
        grid-row: auto;
      }

      .booking-box {
        position: static;
      }

      .about {
        gap: 30px;
      }

      .about-image img {
        min-height: 250px;
      }

      .category-tabs {
        flex-direction: column;
      }

      .category-tabs button {
        width: 100%;
      }
    }
  `]
})
export class App {
  activeTab: 'jeep' | 'trekking' = 'jeep';
  trekTime: 'sunrise' | 'sunset' = 'sunrise';
  participants = 2;
  selectedPackageId = 'jeep-only-no-transfer';
  detailView = false;

  currentYear = new Date().getFullYear();
  participantOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  whatsappContact = 'https://wa.me/6285956346354';

  destinations: Destination[] = [
    {
      name: 'MOUNT BATUR SUNRISE TREKKING',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
      description: 'Nikmati pemandangan indah dan pengalaman matahari terbit di Gunung Batur.'
    },
    {
      name: 'MOUNT BATUR SUNRISE JEEP TOUR',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
      description: 'Jelajahi keindahan Gunung Batur dengan petualangan Jeep.'
    },
    {
      name: 'AKASA SPECIALTY COFFEE',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200',
      description: 'Nikmati pengalaman kopi dengan pemandangan yang indah.'
    },
    {
      name: 'ULU PETANU WATERFALL',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200',
      description: 'Temukan keindahan air terjun yang dikelilingi alam tropis.'
    },
    {
      name: 'THE JANU HOT SPRING',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
      description: 'Nikmati pengalaman bersantai di pemandian air panas.'
    },
    {
      name: 'KANTO LAMPO WATERFALL',
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200',
      description: 'Kunjungi salah satu destinasi air terjun yang indah di Bali.'
    }
  ];

  jeepPackages: Package[] = [
    createPackage(
      'jeep-only-no-transfer',
      'Jeep Only - Tanpa Antar Jemput',
      'Opsi ini hanya mencakup pengalaman Tur Jeep Gunung Batur. Layanan antar-jemput tidak termasuk, jadi tamu harus mengatur transportasi mereka sendiri ke titik pertemuan.',
      [
        { min: 1, max: 1, price: 600000 },
        { min: 2, max: 2, price: 300000 },
        { min: 3, max: 10, price: 225000 },
        { min: 11, max: 20, price: 175000 }
      ],
      jeepPhotos,
      [
        'Jeep 4WD untuk pengalaman menyaksikan matahari terbit di Gunung Batur.',
        'Pemandu Jeep berpengalaman',
        'Tiket masuk ke destinasi yang termasuk dalam rencana perjalanan.'
      ],
      [
        'Makanan dan sarapan',
        'Pengeluaran pribadi',
        'Tips untuk pengemudi atau pemandu wisata',
        'Aktivitas tambahan di luar rencana perjalanan',
        'Segala biaya yang tidak disebutkan dalam bagian Termasuk'
      ],
      [
        'Pengalaman Jeep di Gunung Batur menggunakan kendaraan 4WD dan menyusuri jalur vulkanik berbatu dan tidak beraspal.',
        'Suhu di sekitar Gunung Batur bisa dingin di pagi hari, jadi disarankan untuk membawa jaket atau pakaian hangat.',
        'Disarankan untuk memakai sepatu atau sandal yang nyaman saat berjalan.',
        'Visibilitas saat matahari terbit mungkin bergantung pada kondisi cuaca.',
        'Sarapan dan makan siang tidak termasuk.',
        'Biaya pribadi dan aktivitas di luar rencana perjalanan tidak termasuk.'
      ]
    ),

    createPackage(
      'jeep-only-transfer',
      'Jeep Only - Dengan Antar Jemput',
      'Opsi ini hanya menawarkan tur Jeep menyaksikan matahari terbit di Gunung Batur, tanpa kunjungan ke AKASA atau air terjun. Tur ini dwibahasa dalam bahasa Inggris dan Indonesia.',
      [
        { min: 1, max: 1, price: 1400000 },
        { min: 2, max: 2, price: 725000 },
        { min: 3, max: 10, price: 550000 },
        { min: 11, max: 20, price: 450000 }
      ],
      jeepPhotos,
      jeepBaseIncludes,
      jeepBaseExcludes,
      jeepBaseNotes
    ),

    createPackage(
      'jeep-akasa',
      'Jeep + AKASA Cafe',
      'Nikmati matahari terbit Gunung Batur dengan Jeep 4WD, dilanjutkan dengan bersantai di AKASA Specialty Coffee dengan pemandangan kaldera yang menakjubkan dan kopi Kintamani lokal. Tur ini dwibahasa dalam bahasa Inggris dan Indonesia.',
      [
        { min: 1, max: 1, price: 1410000 },
        { min: 2, max: 2, price: 730000 },
        { min: 3, max: 10, price: 560000 },
        { min: 11, max: 20, price: 450000 }
      ],
      [
        jeepPhotos[0],
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200',
        jeepPhotos[1]
      ],
      [
        ...jeepBaseIncludes,
        'Kunjungan ke AKASA Specialty Coffee',
        'Biaya parkir'
      ],
      [
        'Makanan dan sarapan',
        'Makanan atau minuman tambahan di kafe',
        'Pembelian kopi atau produk lainnya di perkebunan kopi.',
        'Pengeluaran pribadi',
        'Tips untuk pengemudi atau pemandu wisata',
        'Aktivitas tambahan di luar rencana perjalanan',
        'Segala biaya yang tidak disebutkan dalam bagian Termasuk'
      ],
      jeepBaseNotes
    ),

    createPackage(
      'jeep-waterfall',
      'Jeep + Ulu Petanu Waterfall',
      'Saksikan keindahan matahari terbit Gunung Batur dalam perjalanan jeep yang mendebarkan, lalu lanjutkan petualangan Anda ke air terjun yang indah. Nikmati perpaduan sempurna antara pemandangan gunung dan alam. Tur ini tersedia dalam dua bahasa, Inggris dan Indonesia.',
      [
        { min: 1, max: 1, price: 1430000 },
        { min: 2, max: 2, price: 750000 },
        { min: 3, max: 10, price: 575000 },
        { min: 11, max: 20, price: 465000 }
      ],
      [
        jeepPhotos[0],
        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200',
        jeepPhotos[1]
      ],
      [
        ...jeepBaseIncludes,
        'Tiket masuk Air Terjun Ulu Petanu'
      ],
      jeepBaseExcludes,
      jeepBaseNotes
    ),

    createPackage(
      'jeep-hot-spring',
      'Jeep + Hot Spring',
      'Saksikan matahari terbit di atas Gunung Batur dalam petualangan jeep yang seru, lalu bersantai di pemandian air panas alami. Nikmati pemandangan pegunungan yang menakjubkan dan pengalaman yang menenangkan setelah perjalanan Anda. Tur ini dwibahasa dalam bahasa Inggris dan Indonesia.',
      [
        { min: 1, max: 1, price: 1600000 },
        { min: 2, max: 2, price: 900000 },
        { min: 3, max: 10, price: 750000 },
        { min: 11, max: 20, price: 650000 }
      ],
      [
        jeepPhotos[0],
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
        jeepPhotos[1]
      ],
      [
        ...jeepBaseIncludes,
        'Kunjungan ke Pemandian Air Panas'
      ],
      [
        'Makanan dan sarapan',
        'Makanan atau minuman tambahan di kafe',
        'Pengeluaran pribadi',
        'Tips untuk pengemudi atau pemandu wisata',
        'Aktivitas tambahan di luar rencana perjalanan',
        'Segala biaya yang tidak disebutkan dalam bagian Termasuk'
      ],
      jeepBaseNotes
    ),

    createPackage(
      'jeep-akasa-waterfall',
      'Jeep + AKASA + Waterfall',
      'Nikmati petualangan jeep saat matahari terbit di Gunung Batur, bersantai di Akasa Coffee yang indah, dan temukan air terjun yang menakjubkan. Rasakan kombinasi sempurna antara pemandangan matahari terbit, kopi, dan alam dalam satu perjalanan. Tur ini dwibahasa dalam bahasa Inggris dan Indonesia.',
      [
        { min: 1, max: 1, price: 1450000 },
        { min: 2, max: 2, price: 760000 },
        { min: 3, max: 10, price: 585000 },
        { min: 11, max: 20, price: 475000 }
      ],
      [
        jeepPhotos[0],
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200',
        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200'
      ],
      [
        ...jeepBaseIncludes,
        'Tiket masuk Air Terjun Ulu Petanu',
        'Kunjungan ke AKASA Specialty Coffee'
      ],
      [
        'Makanan dan sarapan',
        'Makanan atau minuman tambahan di kafe',
        'Pembelian kopi atau produk lainnya di perkebunan kopi.',
        'Pengeluaran pribadi',
        'Tips untuk pengemudi atau pemandu wisata',
        'Aktivitas tambahan di luar rencana perjalanan',
        'Segala biaya yang tidak disebutkan dalam bagian Termasuk'
      ],
      jeepBaseNotes
    )
  ];

  sunrisePackages: Package[] = [
    createPackage(
      'trek-sunrise-only-no-transfer',
      'Sunrise Trekking - Tanpa Antar Jemput',
      'Opsi ini menawarkan pendakian Gunung Batur saat matahari terbit tanpa antar jemput hotel. Pelanggan harus menuju titik pertemuan sendiri. Pemandu wisata akan memandu tur dalam bahasa Inggris dan Indonesia.',
      [
        { min: 1, max: 1, price: 850000 },
        { min: 2, max: 2, price: 510000 },
        { min: 3, max: 10, price: 475000 },
        { min: 11, max: 20, price: 450000 }
      ],
      trekkingPhotos,
      [
        'Pemandu pendakian lokal Gunung Batur',
        'Tiket masuk Gunung Batur',
        'Senter',
        'Sarapan (roti lapis pisang, telur rebus, biskuit)'
      ],
      [
        'Makanan dan minuman pribadi',
        'Pengeluaran pribadi',
        'Minuman panas di atas'
      ],
      [
        'Pendakian Gunung Batur membutuhkan tingkat kebugaran fisik yang moderat.',
        'Kenakan sepatu hiking yang nyaman dan memiliki daya cengkeram yang baik.',
        'Bawalah jaket atau pakaian hangat karena suhu di puncak bisa sangat dingin.',
        'Bawalah air minum yang cukup untuk pendakian.',
        'Senter telah disediakan.',
        'Ikuti petunjuk pemandu lokal sepanjang perjalanan.',
        'Mohon tiba di titik pertemuan setidaknya 15 menit sebelum waktu mulai yang dijadwalkan.'
      ]
    ),

    createPackage(
      'trek-sunrise-only-transfer',
      'Sunrise Trekking - Dengan Antar Jemput',
      'Opsi ini menawarkan pendakian Gunung Batur saat matahari terbit, termasuk antar-jemput hotel pulang pergi. Pemandu wisata akan memandu tur dalam bahasa Inggris dan Indonesia.',
      [
        { min: 1, max: 1, price: 1650000 },
        { min: 2, max: 2, price: 875000 },
        { min: 3, max: 10, price: 775000 },
        { min: 11, max: 20, price: 725000 },
        { min: 21, max: 30, price: 700000 }
      ],
      trekkingPhotos,
      [
        'Transfer hotel pulang pergi',
        'Pemandu pendakian lokal Gunung Batur',
        'Tiket masuk Gunung Batur',
        'Senter',
        'Sarapan (roti lapis pisang, telur rebus, biskuit)'
      ],
      [
        'Makanan dan minuman pribadi',
        'Pengeluaran pribadi',
        'Minuman panas di atas'
      ],
      [
        'Pendakian Gunung Batur membutuhkan tingkat kebugaran fisik yang moderat.',
        'Kenakan sepatu hiking yang nyaman dan memiliki daya cengkeram yang baik.',
        'Bawalah jaket atau pakaian hangat karena suhu di puncak bisa sangat dingin.',
        'Bawalah air minum yang cukup untuk pendakian.',
        'Senter telah disediakan.',
        'Ikuti petunjuk pemandu lokal sepanjang perjalanan.'
      ]
    ),

    createPackage(
      'trek-sunrise-akasa',
      'Sunrise Trekking + AKASA Cafe',
      'Opsi ini menawarkan pendakian Gunung Batur saat matahari terbit dengan pemberhentian untuk minum kopi di Akasa Cafe.',
      [
        { min: 1, max: 1, price: 1675000 },
        { min: 2, max: 2, price: 900000 },
        { min: 3, max: 10, price: 800000 },
        { min: 11, max: 20, price: 725000 },
        { min: 21, max: 30, price: 700000 }
      ],
      [
        trekkingPhotos[0],
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200',
        trekkingPhotos[1]
      ],
      [
        ...trekBaseIncludes,
        'Kunjungan ke AKASA Cafe'
      ],
      trekBaseExcludes,
      trekBaseNotes
    ),

    createPackage(
      'trek-sunrise-kanto-lampo',
      'Sunrise Trekking + Kanto Lampo Waterfall',
      'Opsi ini menawarkan pendakian Gunung Batur saat matahari terbit, dilanjutkan dengan kunjungan ke Air Terjun Kanto Lampo.',
      [
        { min: 1, max: 1, price: 1700000 },
        { min: 2, max: 2, price: 900000 },
        { min: 3, max: 10, price: 800000 },
        { min: 11, max: 20, price: 725000 },
        { min: 21, max: 30, price: 700000 }
      ],
      [
        trekkingPhotos[0],
        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200',
        trekkingPhotos[1]
      ],
      [
        ...trekBaseIncludes,
        'Kunjungan ke Air Terjun Kanto Lampo'
      ],
      trekBaseExcludes,
      trekBaseNotes
    ),

    createPackage(
      'trek-sunrise-rice',
      'Sunrise Trekking + Rice Terrace',
      'Opsi ini menawarkan pendakian Gunung Batur saat matahari terbit dengan kunjungan ke Teras Sawah Uma Ceking.',
      [
        { min: 1, max: 1, price: 1700000 },
        { min: 2, max: 2, price: 900000 },
        { min: 3, max: 10, price: 800000 },
        { min: 11, max: 20, price: 725000 },
        { min: 21, max: 30, price: 700000 }
      ],
      [
        trekkingPhotos[0],
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200',
        trekkingPhotos[1]
      ],
      [
        ...trekBaseIncludes,
        'Kunjungan ke Teras Sawah Uma Ceking'
      ],
      trekBaseExcludes,
      trekBaseNotes
    ),

    createPackage(
      'trek-sunrise-hot-spring',
      'Sunrise Trekking + Hot Spring',
      'Opsi ini menawarkan pendakian Gunung Batur saat matahari terbit, serta berendam di kolam renang tanpa batas di Pemandian Air Panas Janu.',
      [
        { min: 1, max: 1, price: 1800000 },
        { min: 2, max: 2, price: 950000 },
        { min: 3, max: 10, price: 850000 },
        { min: 11, max: 20, price: 775000 },
        { min: 21, max: 30, price: 750000 }
      ],
      [
        trekkingPhotos[0],
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
        trekkingPhotos[1]
      ],
      [
        ...trekBaseIncludes,
        'Kunjungan ke Pemandian Air Panas Janu'
      ],
      trekBaseExcludes,
      trekBaseNotes
    )
  ];

  sunsetPackages: Package[] = [
    createPackage(
      'trek-sunset-no-transfer',
      'Sunset Trekking - Tanpa Antar Jemput',
      'Opsi ini menawarkan trekking Gunung Batur saat matahari terbenam tanpa antar jemput hotel. Pelanggan menuju titik pertemuan sendiri. Pemandu wisata akan memandu tur dalam bahasa Inggris dan Indonesia.',
      [
        { min: 1, max: 1, price: 850000 },
        { min: 2, max: 2, price: 510000 },
        { min: 3, max: 10, price: 475000 },
        { min: 11, max: 20, price: 450000 }
      ],
      trekkingPhotos,
      [
        'Pemandu pendakian lokal Gunung Batur',
        'Tiket masuk Gunung Batur',
        'Senter'
      ],
      [
        'Makanan dan minuman pribadi',
        'Pengeluaran pribadi'
      ],
      [
        'Pendakian Gunung Batur membutuhkan tingkat kebugaran fisik yang moderat.',
        'Kenakan sepatu hiking yang nyaman dan memiliki daya cengkeram yang baik.',
        'Bawalah jaket atau pakaian hangat karena suhu di puncak bisa sangat dingin.',
        'Bawalah air minum yang cukup untuk pendakian.',
        'Senter telah disediakan.',
        'Ikuti petunjuk pemandu lokal sepanjang perjalanan.',
        'Mohon tiba di titik pertemuan setidaknya 15 menit sebelum waktu mulai yang dijadwalkan.'
      ]
    ),

    createPackage(
      'trek-sunset-transfer',
      'Sunset Trekking - Dengan Antar Jemput',
      'Opsi ini menawarkan pendakian Gunung Batur saat matahari terbenam dengan layanan antar-jemput hotel pulang pergi. Pemandu wisata akan memandu tur dalam bahasa Inggris dan Indonesia.',
      [
        { min: 1, max: 1, price: 1650000 },
        { min: 2, max: 2, price: 875000 },
        { min: 3, max: 10, price: 775000 },
        { min: 11, max: 20, price: 725000 },
        { min: 21, max: 30, price: 700000 }
      ],
      trekkingPhotos,
      [
        'Transfer hotel pulang pergi',
        'Pemandu pendakian lokal Gunung Batur',
        'Tiket masuk Gunung Batur',
        'Senter'
      ],
      [
        'Makanan dan minuman pribadi',
        'Pengeluaran pribadi'
      ],
      [
        'Pendakian Gunung Batur membutuhkan tingkat kebugaran fisik yang moderat.',
        'Kenakan sepatu hiking yang nyaman dan memiliki daya cengkeram yang baik.',
        'Bawalah jaket atau pakaian hangat karena suhu di puncak bisa sangat dingin.',
        'Bawalah air minum yang cukup untuk pendakian.',
        'Senter telah disediakan.',
        'Ikuti petunjuk pemandu lokal sepanjang perjalanan.',
        'Mohon tiba di titik pertemuan setidaknya 15 menit sebelum waktu mulai yang dijadwalkan.'
      ]
    )
  ];

  get activePackages(): Package[] {
    if (this.activeTab === 'jeep') {
      return this.jeepPackages;
    }

    return this.trekTime === 'sunrise'
      ? this.sunrisePackages
      : this.sunsetPackages;
  }

  get selectedPackage(): Package {
    return this.activePackages.find(
      pkg => pkg.id === this.selectedPackageId
    ) ?? this.activePackages[0];
  }

  get selectedPrice(): number | null {
    const tier = this.selectedPackage.prices.find(
      price =>
        this.participants >= price.min &&
        this.participants <= price.max
    );

    return tier ? tier.price : null;
  }

  get selectedPhotos(): string[] {
    return this.selectedPackage.photos;
  }

  get whatsappLink(): string {
    const priceText = this.selectedPrice === null
      ? 'Mohon konfirmasi harga'
      : this.formatPrice(this.selectedPrice);

    const message =
      `Hello SB Tour Guide! Saya tertarik dengan paket ${this.selectedPackage.name}. ` +
      `Jumlah peserta: ${this.participants}. ` +
      `Harga per orang: ${priceText}.`;

    return `https://wa.me/6285956346354?text=${encodeURIComponent(message)}`;
  }

  changeTab(tab: 'jeep' | 'trekking'): void {
    this.activeTab = tab;
    this.detailView = false;

    if (tab === 'jeep') {
      this.selectedPackageId = 'jeep-only-no-transfer';
    } else {
      this.trekTime = 'sunrise';
      this.selectedPackageId = 'trek-sunrise-only-no-transfer';
    }
  }

  chooseCategory(tab: 'jeep' | 'trekking'): void {
    this.changeTab(tab);
    this.goToPackages();
  }

  changeTrekTime(time: 'sunrise' | 'sunset'): void {
    this.trekTime = time;
    this.detailView = false;

    this.selectedPackageId = time === 'sunrise'
      ? 'trek-sunrise-only-no-transfer'
      : 'trek-sunset-no-transfer';
  }

  openPackage(pkg: Package): void {
    this.selectedPackageId = pkg.id;
    this.participants = 2;
    this.detailView = true;

    setTimeout(() => {
      this.scrollToPackages();
    }, 0);
  }

  backToPackages(): void {
    this.detailView = false;
  }

  returnToPackages(): void {
    this.detailView = false;

    setTimeout(() => {
      this.scrollToPackages();
    }, 0);
  }

  goToPackages(): void {
    this.detailView = false;

    setTimeout(() => {
      this.scrollToPackages();
    }, 0);
  }

  private scrollToPackages(): void {
    document.getElementById('packages')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  onParticipantsChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.participants = Number(select.value);
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
