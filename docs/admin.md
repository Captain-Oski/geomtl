# Administration

L'admin est à `/admin`, après connexion sur `/login`. Trois rôles : `admin` (accès complet), `editor` (sans suppression) et `viewer` (lecture seule, aucun bouton d'action).

## Menu

| Entrée | Contenu |
|---|---|
| Tableau de bord | Nouvelles demandes, kiosques disponibles, statistiques des partenaires et des exposants |
| Partenaires et exposants | Onglets Demandes, Organisations et Plan des kiosques ; pastille du nombre de nouvelles demandes |
| Programmation | Sessions du programme |
| Utilisateurs | Comptes et rôles (admin seulement) |

Contacts, Activations, Livrables et Contrats ne sont plus dans le menu : leurs pages n'existaient pas (erreur 404). Leurs tables restent en base, vides, pour un module futur (voir [TODO.md](../TODO.md)).

## Partenaires et exposants (`/admin/organisations`)

Une seule page regroupe ce qui était réparti entre Partenaires, Exposants et Kiosques.

- **Demandes** : les demandes envoyées par le formulaire public, leur traitement et l'action « Accepter », qui crée la fiche. Détails dans [Demandes de kiosque](demandes-kiosques.md).
- **Organisations** : partenaires et exposants dans un même tableau.
  - En haut : fiches, confirmées, payées, à relancer, logos manquants, kiosques à attribuer, prêtes mais non publiées.
  - Recherche (nom, contact, courriel) et filtres : niveau (un type de partenaire, tous les partenaires ou les exposants), statut, paiement, publication, responsable.
  - Tri par niveau, nom, statut ou date de relance.
  - Actions rapides sur chaque ligne : logo reçu, publication sur le site, « Marquer payé », « Archiver » et « Supprimer » (admin).
  - Boutons « + Partenaire » et « + Exposant » pour créer une fiche.
- **Plan des kiosques** : confirmer, modifier ou libérer la réservation d'un kiosque.

L'onglet choisi reste dans l'adresse (`?onglet=demandes`, `organisations` ou `plan`). Sans onglet précisé, la page s'ouvre sur Demandes s'il y a de nouvelles demandes, sinon sur Organisations.

Les anciennes adresses `/admin/partners`, `/admin/exhibitors` et `/admin/kiosques` redirigent vers cette page, ce qui garde valides les favoris et les liens des courriels déjà envoyés.

## Fiches partenaire et exposant

Partenaires et exposants restent deux tables (`partners` et `exhibitors`), chacune avec son formulaire (`/admin/partners/...` et `/admin/exhibitors/...`). Seule la liste les réunit.

- **Types de partenaire** : Or, Argent, Bronze et Soirée réseautage (migration [V008](../supabase/migrations/V008__types_partenaires.sql)). En base : `Gold`, `Silver`, `Bronze` et `Networking`. Les libellés sont dans `lib/partenaires.ts`.
- **Contacts** :
  - le contact principal est le **responsable de la facturation** (nom, courriel, téléphone) ;
  - le contact secondaire est le **responsable du kiosque** sur place pendant l'événement (nom, courriel). La fiche n'a pas de champ pour son téléphone : quand on accepte une demande, il est noté dans les notes de contact.
- **Kiosque et livrables** : cette section remplace « Activation et kiosque ». Les champs d'activation ont été retirés du formulaire ; leurs colonnes restent en base, vides.

## Fichiers

| Fichier | Rôle |
|---|---|
| `components/admin/AdminLayout.tsx` | Menu et pastille des nouvelles demandes |
| `app/admin/page.tsx` | Tableau de bord |
| `app/admin/organisations/page.tsx` | Chargement des données de la page Partenaires et exposants |
| `components/admin/organisations/AdminOrganisationsPage.tsx` | Onglets, messages et fiche du kiosque sélectionné |
| `components/admin/organisations/ListeOrganisations.tsx` | Liste unique des partenaires et des exposants |
| `components/admin/kiosques/DemandesKiosques.tsx` | Onglet Demandes |
| `components/admin/partners/PartnerForm.tsx` et `components/admin/exhibitors/ExhibitorForm.tsx` | Formulaires des fiches |
| `components/admin/partners/PartnerStatusBadge.tsx` | Pastilles de statut, de paiement et de niveau, communes aux deux types de fiches |
