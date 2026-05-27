# GeoMTL 2027 — IDEAS : Fonctionnalités futures

Idées et améliorations potentielles pour les prochaines versions.
Aucun engagement — sert de backlog d'inspiration.

---

## 📧 Gestion des contrats par courriel

**Idée principale :** Quand un partenaire ou exposant est confirmé et que le dossier est complet, générer automatiquement un contrat PDF pré-rempli et l'envoyer au contact principal pour signature.

### Flux complet envisagé
1. L'admin clique « Envoyer le contrat » dans la fiche partenaire/exposant
2. Le système vérifie que les champs obligatoires sont remplis (contact email, montant, type de partenariat)
3. Un PDF de contrat est généré dynamiquement avec les données du dossier
4. Le PDF est envoyé par courriel au contact principal (CC à l'admin)
5. Le contact reçoit un lien pour signer électroniquement
6. La signature est enregistrée et le statut passe à `signed`

### Stack technique envisagée
- **Envoi email :** [Resend](https://resend.com) + React Email (templates HTML)
- **Génération PDF :** `@react-pdf/renderer` (rendu serveur) ou Puppeteer (screenshot HTML → PDF)
- **Signature électronique :** Intégration [DocuSign](https://www.docusign.com) ou [HelloSign/Dropbox Sign](https://sign.dropbox.com) — ou solution maison simple avec lien de confirmation unique
- **Stockage du PDF signé :** Supabase Storage (bucket `contracts`, accès privé)

### Données déjà en place
Les champs nécessaires sont déjà dans la base (`contract_url`, `invoice_url`, `primary_contact_email`, `payment_status`, etc.). Il manque seulement la logique d'envoi et les templates.

---

## 🗺️ Carte interactive du salon

**Idée :** Plan visuel et interactif de la salle d'exposition avec les kiosques positionnés. Les visiteurs peuvent voir l'emplacement de chaque exposant avant l'événement.

- Kiosques cliquables → fiche de l'exposant (nom, secteur, description, site web)
- Filtrable par secteur
- Mise à jour automatique depuis la base (numéro de kiosque + zone)
- Technologie : SVG interactif, ou bibliothèque comme [react-map-gl](https://visgl.github.io/react-map-gl/), ou Mapbox
- Plan de salle uploadé comme image de fond, kiosques positionnés par coordonnées X/Y

---

## 🤖 Rappels automatiques (relances)

**Idée :** Système de rappels automatisés basé sur le champ `follow_up_date`.

- Cron job quotidien (Vercel Cron ou Supabase Edge Function) qui scanne les dossiers avec `follow_up_date = today`
- Envoie un email de rappel à l'`internal_owner_email` : « Relancer MapGenie Technologies aujourd'hui »
- Option : envoyer directement l'email de relance au contact partenaire/exposant depuis l'admin

---

## 📊 Tableau de bord KPI avec graphiques

**Idée :** Visualisation des métriques de l'événement en temps réel.

- Graphique d'évolution des confirmations dans le temps
- Répartition partenaires par type (Platine, Or, Argent...)
- Taux de complétion des dossiers (logos reçus, descriptions, etc.)
- Revenus confirmés vs projetés
- Stack : [Recharts](https://recharts.org) ou [Tremor](https://www.tremor.so) (composants graphiques pour admin Next.js)

---

## 📤 Export et rapports

**Idée :** Générer des rapports exportables pour le comité et les commanditaires.

- Export CSV / Excel de la liste des partenaires (avec filtres appliqués)
- Rapport PDF « État des partenariats » pour les réunions de comité
- Export « Guide de l'exposant » PDF pré-rempli par kiosque (numéro, dates d'installation, règles)
- Rapport financier : revenus par type de partenariat

---

## 🪪 Portail libre-service partenaires / exposants

**Idée :** Un espace sécurisé où les partenaires/exposants peuvent eux-mêmes :

- Mettre à jour leur profil public (description, logo, URL)
- Confirmer leurs informations avant publication
- Télécharger leur contrat signé
- Voir l'état de leur dossier (statut, kiosque attribué, livrables manquants)
- Accès par lien unique + token (pas besoin de créer un compte)

---

## 📱 Application mobile pour les visiteurs

**Idée :** PWA (Progressive Web App) ou app native légère pour les participants pendant l'événement.

- Programme des conférences avec favoris et rappels
- Carte du salon interactive
- Liste des exposants filtrables par secteur
- QR code scanner pour en savoir plus sur un exposant en passant devant son kiosque
- Networking : profil participant + mise en relation

---

## 🔗 QR codes pour les kiosques

**Idée :** Générer un QR code unique par kiosque, imprimable, qui pointe vers la fiche publique de l'exposant.

- Généré automatiquement dès qu'un `booth_number` est attribué
- Téléchargeable en PNG depuis la fiche admin
- Stack : bibliothèque `qrcode` (npm) côté serveur

---

## ✍️ Signatures électroniques maison (simple)

**Idée :** Pour éviter les coûts de DocuSign, une solution simple :

- Génération d'un lien unique `geomtl.com/signer/[token]`
- Le contact arrive sur une page avec le contrat en lecture seule
- Case à cocher « J'accepte les termes » + signature en texte ou dessin simple
- Enregistrement de la signature avec timestamp et adresse IP
- Notification par email à l'admin

---

## 🏅 Gestion des conférenciers

**Idée :** Module similaire aux partenaires pour gérer les speakers.

- Fiche conférencier (bio FR/EN, photo, titre de la conférence, durée, salle)
- Statut (invité → confirmé → brief envoyé → ready)
- Intégration à l'agenda public
- Email automatique avec les détails logistiques (heure, salle, AV disponible)

---

## 🎟️ Gestion des inscriptions visiteurs

**Idée :** Système d'inscription en ligne pour les participants.

- Formulaire d'inscription avec type de billet (gratuit, professionnel, étudiant)
- Génération de badge PDF / QR code par inscription
- Liste des inscrits exportable pour l'accueil
- Intégration paiement : Stripe (si billets payants)

---

## 🌐 Multilingue amélioré

**Idée :** Renforcer le support bilingue FR/EN sur l'ensemble du site.

- Sélecteur de langue persistant (mémorisé dans un cookie)
- Traductions complètes de toutes les pages publiques
- URLs localisées (`/fr/partenaires` et `/en/partners`)
- Sitemap bilingue pour le SEO

---

## 🔔 Notifications en temps réel (admin)

**Idée :** Alertes en temps réel dans l'interface admin.

- « Un nouveau partenaire vient de s'inscrire via le portail »
- « MapGenie n'a toujours pas envoyé son logo — relance prévue demain »
- Via Supabase Realtime (websockets) ou simple polling
- Badge de notification dans la sidebar admin

---

## 🤝 Intégration LinkedIn

**Idée :** Pré-remplir la fiche d'un partenaire/exposant depuis leur page LinkedIn.

- L'admin colle l'URL LinkedIn de l'entreprise
- L'API LinkedIn (ou scraping autorisé) récupère : logo, description, site web, secteur
- Gain de temps significatif lors de la création des fiches

---

## 📅 Intégration calendrier

**Idée :** Permettre aux partenaires et visiteurs d'ajouter l'événement à leur calendrier.

- Bouton « Ajouter à Google Calendar / Outlook / iCal »
- Génération d'un fichier `.ics` avec les détails de l'événement
- Pour les conférenciers : invitation automatique à leur session spécifique
