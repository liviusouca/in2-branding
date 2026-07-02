# Ce vom face

Site-ul IN2 Branding este deja publicat și funcțional la adresa temporară:

`https://in2-branding.vercel.app`

Vrem ca **domeniul tău propriu** (ex. `in2branding.pl`) să afișeze **direct** acest site — cu domeniul tău în bara de adrese și cu HTTPS (lacătul verde) automat.

Metoda folosită: **repointăm doar înregistrările web (A / CNAME)** ale domeniului către Vercel. Nu mutăm nameserverele, așa că **emailul și celelalte servicii ale domeniului rămân neatinse.**

Împărțirea sarcinilor:

- **Partea noastră (dezvoltator):** adăugăm domeniul în proiectul Vercel și actualizăm site-ul pentru domeniul final.
- **Partea ta (sau a administratorului DNS):** adaugi 2 înregistrări DNS în panoul unde e administrat domeniul. Durează ~5 minute.


# De ce ai nevoie înainte de start

1. **Domeniul** pe care îl vei folosi (ex. `in2branding.pl`).
2. **Acces la zona DNS** a domeniului — la unul dintre:
   - registrarul unde ai cumpărat domeniul (OVH, home.pl, nazwa.pl, GoDaddy, Namecheap etc.), sau
   - panoul de hosting (cPanel / Plesk / DirectAdmin), dacă DNS-ul e gestionat acolo.
3. Să știi dacă pe domeniu există **email** (ex. `contact@in2branding.pl`). Dacă da — nu-l atingem (vezi secțiunea „Important: emailul").

> **Cum afli unde e DNS-ul?** Dacă nu ești sigur, spune-ne domeniul și verificăm noi unde „trăiește" (nameserverele) și îți spunem exact în ce panou trebuie să intri.


# Pasul 1 — Noi adăugăm domeniul în Vercel

Noi (dezvoltatorul) executăm asta din contul Vercel al proiectului `in2-branding`:

- Adăugăm domeniul tău (și varianta `www`) în proiect.
- Vercel confirmă valorile DNS exacte de folosit și, imediat ce DNS-ul e pus corect, emite automat certificatul **SSL/HTTPS gratuit**.

Ție nu-ți revine nimic la acest pas — doar să ne dai domeniul.

# Pasul 2 — Tu adaugi înregistrările DNS

Aceasta este **singura parte pe care o faci tu** (sau administratorul domeniului). Intri în panoul DNS și adaugi/modifici **două** înregistrări:

## a) Domeniul rădăcină (ex. `in2branding.pl`)

| Câmp        | Valoare              |
|-------------|----------------------|
| Tip         | **A**                |
| Nume / Host | `@`  (sau gol / domeniul rădăcină) |
| Valoare     | **76.76.21.21**      |
| TTL         | Automat / 3600       |

## b) Subdomeniul `www` (ex. `www.in2branding.pl`)

| Câmp        | Valoare                      |
|-------------|------------------------------|
| Tip         | **CNAME**                    |
| Nume / Host | `www`                        |
| Valoare     | **cname.vercel-dns.com**     |
| TTL         | Automat / 3600               |

> **Notă:** valorile de mai sus sunt cele standard Vercel. La Pasul 1, panoul Vercel afișează valorile exacte pentru domeniul tău — dacă diferă în vreun caz, folosește ce arată Vercel (ți le trimitem noi, confirmate).

Dacă în panou există deja o înregistrare **A** sau **CNAME** veche pe `@` sau `www` (care pointează spre hostingul vechi), **o modifici** să aibă valorile de mai sus (nu adăuga una nouă în paralel).


# Important: emailul rămâne intact

Emailul domeniului funcționează prin înregistrări separate de tip **MX** (și uneori `TXT`/`SPF`, `DKIM`).

- **NU** ștergi și **NU** modifici înregistrările **MX**, `TXT`, `SPF`, `DKIM`.
- Schimbi **doar** înregistrările web: `A` (pentru `@`) și `CNAME` (pentru `www`).

Astfel, `contact@domeniul-tău` continuă să meargă exact ca înainte.

> De aceea **nu** recomandăm mutarea nameserverelor pe Vercel în cazul tău — ar muta tot DNS-ul și ar trebui recreate manual MX-urile. Metoda cu A/CNAME e mai sigură.

# Pasul 3 — Noi finalizăm în cod

După ce DNS-ul e pus, noi:

- Setăm domeniul final ca adresă oficială a site-ului (pentru linkuri corecte în Google, previzualizări pe social media etc.).
- Republicăm site-ul (redeploy).


# Cât durează și cum verifici

- **Propagarea DNS:** de obicei câteva minute, uneori până la câteva ore (rar, până la 24h).
- **HTTPS/SSL:** îl emite Vercel automat imediat ce vede DNS-ul corect. Nu trebuie să cumperi certificat.
- **Verificare:** după propagare, deschizi `https://domeniul-tău` — trebuie să apară site-ul IN2 Branding, cu lacătul de securitate în bara de adrese.

Poți verifica propagarea și pe: `https://dnschecker.org` (introduci domeniul, tip A → trebuie să apară `76.76.21.21`).

# Rezumat rapid

1. **Tu:** ne spui domeniul + unde e DNS-ul + dacă are email.
2. **Noi:** adăugăm domeniul în Vercel și îți trimitem valorile DNS confirmate.
3. **Tu:** pui în panoul DNS record-ul **A** (`@` → `76.76.21.21`) și **CNAME** (`www` → `cname.vercel-dns.com`), fără să atingi MX-urile.
4. **Noi:** setăm domeniul final în cod și republicăm.
5. **Aștepți** propagarea (minute–ore) → domeniul afișează site-ul, cu HTTPS.


# Probleme frecvente

**„Site-ul nu apare încă pe domeniu."**
DNS-ul nu s-a propagat complet. Așteaptă și verifică pe dnschecker.org. Golește cache-ul browserului (Cmd/Ctrl + Shift + R).

**„Apare eroare de certificat / «not secure»."**
SSL-ul se emite la câteva minute după ce DNS-ul e corect. Dacă persistă peste ~1h, anunță-ne — verificăm în Vercel.

**„A dispărut emailul!"**
Înseamnă că s-au modificat/șters din greșeală înregistrările MX sau s-au mutat nameserverele. Restaurează MX-urile la valorile furnizorului de email. (De asta atingem doar A/CNAME.)

**„Am doar opțiunea de nameservere, nu pot edita record-uri A/CNAME."**
Unele panouri simple permit doar schimbarea nameserverelor. În acest caz, spune-ne — găsim împreună soluția potrivită (păstrând emailul).

---

*Pentru orice pas, trimite-ne un screenshot al panoului DNS și te ghidăm exact unde să apeși.*
