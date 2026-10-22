# Demandes de kiosque

La page **Devenir partenaire** (`/fr/devenir-partenaire`) affiche le plan interactif des 26 kiosques du salon des exposants. Chaque kiosque est « Disponible » ou « Indisponible » (avec le logo de l'organisation). Un formulaire permet de demander un kiosque ; le comité traite les demandes dans l'admin, à `/admin/kiosques`.

**Règle d'or : une demande ne change jamais ce que voit le public.** Un kiosque passe à « Indisponible » seulement quand un membre du comité confirme sa réservation dans l'admin.

## Le parcours

### 1. Le visiteur fait sa demande

- Le bouton **« Devenir partenaire ou exposant »**, en haut et en bas du plan, ouvre le formulaire dans une fenêtre.
- Un clic sur un kiosque libre du plan le présélectionne dans le formulaire.
- Le formulaire demande :
  - le niveau (Exposant, Bronze, Argent, Or ou À déterminer) ;
  - le kiosque souhaité, parmi les kiosques disponibles, ou « Sans préférence » ;
  - l'organisation ;
  - le **contact principal** et le **responsable du kiosque** (nom, courriel, téléphone), avec une case « Même personne que le contact principal » ;
  - un message facultatif et le consentement (Loi 25).

### 2. Le site enregistre la demande et avertit tout le monde

- La demande est enregistrée avec le statut **nouvelle**.
- Un courriel part au comité (partenariat@geomtl.com). En y répondant, on écrit directement au contact principal.
- Un accusé de réception part au contact principal, avec le responsable du kiosque en copie s'il est différent.
- Si un courriel échoue, la demande reste enregistrée : rien ne se perd, l'échec est noté dans les journaux de Vercel.

### 3. Le comité traite la demande (onglet « Demandes »)

- La pastille du menu **Kiosques** compte les nouvelles demandes.
- Le détail d'une demande offre :
  - **En traitement**, **Refuser**, **Archiver** et **Indésirable** ;
  - **Accepter** : crée la fiche préremplie (organisation, contacts, kiosque souhaité, message) et la relie à la demande. Le niveau « Exposant » crée une fiche dans Exposants ; Bronze, Argent et Or créent une fiche dans Partenaires. **Le kiosque reste disponible.**
  - des notes internes, jamais publiées.

### 4. Le comité confirme la réservation (onglet « Plan et réservations »)

- Un clic sur un kiosque ouvre sa fiche, avec les demandes en cours pour ce kiosque.
- **Confirmer la réservation** : choisir la fiche liée (qui reprend le nom, le logo et le site), vérifier le nom affiché, puis confirmer. Le kiosque passe à « Indisponible » sur le site public, avec le logo.
- **Libérer le kiosque** : il redevient « Disponible ».
- Si deux membres du comité confirment le même kiosque en même temps, seul le premier réussit ; le second reçoit un message d'erreur.

Le rôle `viewer` voit tout, mais n'a aucun bouton d'action.

## Sécurité

Le public n'écrit jamais directement dans la base. Le formulaire envoie la demande à la route `POST /api/demandes-kiosques`, qui la vérifie puis l'enregistre avec la clé service role, côté serveur seulement. Les tables n'ont aucune règle d'accès pour le rôle `anon` : même avec la clé publique, personne ne peut les lire ni y écrire.

Contrôles de la route, dans l'ordre :

| Contrôle | Réponse en cas d'échec |
|---|---|
| Supabase configuré | 503 |
| Site encore « en construction » : seul le comité (cookie d'accès) peut envoyer | 403 |
| En-tête `Origin` du même site (protection CSRF) | 403 |
| Corps JSON de 10 Ko au plus | 413 |
| Champ piège invisible rempli (robot) | 200, sans rien enregistrer |
| Envoi moins de 3 secondes après l'ouverture du formulaire | 400 |
| Validation des champs (la même que dans le formulaire) | 400 |
| Au plus 5 demandes par heure par adresse IP et 5 par jour par courriel | 429 |
| Kiosque déjà réservé | 409 |

Les courriels sont en texte brut : rien de ce que tape le visiteur n'est interprété comme du HTML.

## Données et confidentialité

- **Tables** (schéma `geomtl2027`, migration [V007](../supabase/migrations/V007__kiosques.sql)) :
  - `kiosques` : les 26 kiosques, leur état public et la fiche liée ;
  - `demandes_kiosques` : les demandes et leur suivi.
- **Adresse IP :** jamais conservée. Seule une empreinte salée (`sha256(DEMANDES_SEL:ip)`) est gardée, pour la limite d'envois.
- **Conservation :** jusqu'à 6 mois après l'événement, comme l'indique la [politique de confidentialité](../app/[locale]/confidentialite/page.tsx). La purge se fait à la main pour l'instant.
- **Plan public :** mis en cache 5 minutes, et rafraîchi aussitôt qu'un membre du comité change l'état d'un kiosque.

## Configuration

Variables d'environnement, dans `.env.local` en local et dans **Vercel → Settings → Environment Variables** en production :

| Variable | Rôle | Obligatoire |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Enregistrer les demandes et lire le plan, côté serveur | Oui |
| `RESEND_API_KEY` | Envoyer les courriels. Sans elle, les demandes sont enregistrées mais aucun courriel ne part. | Oui |
| `DEMANDES_SEL` | Sel secret de l'empreinte IP : une longue chaîne aléatoire, à ne plus changer ensuite | Oui |
| `COURRIEL_EXPEDITEUR` | Expéditeur des courriels, sur un domaine vérifié dans Resend. Par défaut : `GÉOMTL 2027 <kiosques@geomtl.com>` | Non |
| `COURRIEL_COMITE` | Destinataire des avis de nouvelle demande. Par défaut : partenariat@geomtl.com | Non |

Pour générer `DEMANDES_SEL` :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Resend

- **Le plan gratuit suffit** : 3 000 courriels par mois et 100 par jour. Chaque demande envoie 2 courriels. Au-delà de la limite, les courriels ne partent plus, mais les demandes restent enregistrées.
- **Vérifier le domaine geomtl.com** : dans Resend, **Domains → Add Domain**, puis ajouter les enregistrements DNS indiqués chez le gestionnaire du domaine. Ensuite, mettre `COURRIEL_EXPEDITEUR` sur une adresse @geomtl.com.
- **Tant que le domaine n'est pas vérifié**, Resend est en mode test : il n'envoie que depuis `onboarding@resend.dev`, et seulement vers l'adresse du compte Resend.

## Tester en local

Attention : en local, le site utilise la **base de production**. Les demandes de test sont visibles par tout le comité ; les marquer « Indésirable » après le test.

1. Dans `.env.local`, pour le mode test de Resend :

   ```
   COURRIEL_EXPEDITEUR=GÉOMTL 2027 <onboarding@resend.dev>
   COURRIEL_COMITE=adresse-du-compte-resend@exemple.com
   ```

2. `npm run dev`, puis se connecter à `/login` avec son compte de l'admin.
3. Sur `/fr/devenir-partenaire`, envoyer une demande avec l'adresse du compte Resend comme contact principal, et cocher « Même personne » pour le responsable du kiosque. En mode test, Resend refuse toute autre adresse, même en copie.
4. Les deux courriels arrivent dans la boîte du compte Resend, et la demande apparaît dans `/admin/kiosques`.

## Fichiers

| Fichier | Rôle |
|---|---|
| `components/partners/PlanKiosques.tsx` | Plan SVG interactif, en mode public ou admin |
| `components/partners/ModaleReservation.tsx` | Formulaire de demande, dans une fenêtre |
| `lib/demandes-kiosques.ts` | Validation partagée entre le formulaire et la route |
| `app/api/demandes-kiosques/route.ts` | Route publique : contrôles, enregistrement, courriels |
| `lib/data/kiosques.ts` | Lecture du plan public (en cache) et des données de l'admin |
| `lib/actions/kiosques.ts` | Actions de l'admin : statut, Accepter, Confirmer, Libérer |
| `app/admin/kiosques/page.tsx` et `components/admin/kiosques/` | Page de l'admin |
| `data/kiosques.ts` | Plan de repli sans Supabase, et aperçu `?apercu-kiosques` en développement |

## À venir

- Téléverser les logos dans Supabase Storage, au lieu de coller une adresse.
- Exporter les demandes en CSV.
- Purger automatiquement les demandes 6 mois après l'événement.
- Ajouter un captcha (Cloudflare Turnstile), seulement si des robots passent malgré le champ piège et la limite d'envois.
