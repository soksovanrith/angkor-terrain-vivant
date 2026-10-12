# Angkor Terrain Vivant : le site

Le code du site **https://angkorterrainvivant.com**.

*(English version below.)*

## Comment ça marche

- Le site, c'est le dossier **`site/`** : du HTML, du CSS et du JavaScript simples, sans étape de construction.
- **Chaque modification enregistrée sur la branche `main` est mise en ligne automatiquement**, en environ une minute.
- L'hébergement (Vercel) et le nom de domaine sont déjà réglés : vous n'avez rien à faire de ce côté.
- Ce dépôt est **public** : tout le monde peut lire ce code (c'est le même que celui du site), mais seules
  les personnes invitées peuvent le modifier.
- Pour que votre adresse email n'apparaisse pas dans l'historique public : sur GitHub, ouvrez
  **Settings > Emails** et cochez **Keep my email addresses private**.

## Liens directs

| Pour modifier | Lien |
|---|---|
| L'accueil | https://github.com/soksovanrith/angkor-terrain-vivant/edit/main/site/index.html |
| Les destinations | https://github.com/soksovanrith/angkor-terrain-vivant/edit/main/site/destinations.html |
| Les itinéraires | https://github.com/soksovanrith/angkor-terrain-vivant/edit/main/site/itineraires.html |
| Notre histoire | https://github.com/soksovanrith/angkor-terrain-vivant/edit/main/site/notre-histoire.html |
| Réserver | https://github.com/soksovanrith/angkor-terrain-vivant/edit/main/site/reserver.html |
| Les couleurs et polices | https://github.com/soksovanrith/angkor-terrain-vivant/edit/main/site/assets/css/site.css |
| Ajouter des photos | https://github.com/soksovanrith/angkor-terrain-vivant/upload/main/site/assets/img |

### Changer une photo

1. Ouvrez le lien « Ajouter des photos », déposez la nouvelle photo (un nouveau nom, sans espaces, par
   exemple `angkor-wat-2.jpg`), puis cliquez sur **Commit changes**.
2. Ouvrez la page concernée avec son lien ci-dessus, faites **Ctrl+F** pour trouver l'ancien nom de la photo,
   remplacez-le par le nouveau, puis cliquez sur **Commit changes...** en haut à droite et confirmez.
3. Gardez la même forme que l'ancienne photo (paysage ou portrait), environ 1600 pixels de large, en JPG.

## Modifier depuis le navigateur (le plus simple, rien à installer)

1. Ouvrez https://github.com/soksovanrith/angkor-terrain-vivant en étant connecté à votre compte GitHub.
2. Ouvrez le dossier `site/`, puis cliquez sur le fichier à modifier.
3. Cliquez sur l'icône **crayon** (« Edit this file »).
4. Faites votre modification, cliquez sur **Commit changes...**, écrivez une courte description, laissez
   « Commit directly to the main branch » coché, puis cliquez sur **Commit changes**.
5. Attendez une minute, puis rechargez https://angkorterrainvivant.com.

Pour ajouter des photos : ouvrez `site/assets/img/`, cliquez sur **Add file > Upload files**, déposez les
images, puis **Commit changes**.

## Modifier sur votre ordinateur

- Avec **GitHub Desktop** (https://desktop.github.com) : *Clone repository*, modifiez les fichiers avec
  votre éditeur, puis *Commit to main* et *Push origin*.
- Ou en ligne de commande : `git clone`, modifiez, puis `git commit` et `git push`.
- **Pour voir le résultat avant de publier**, ouvrez simplement `site/index.html` dans votre navigateur :
  tous les liens sont relatifs, le site fonctionne directement depuis le dossier.
- Pensez à faire `git pull` (ou *Fetch origin* dans GitHub Desktop) avant de commencer, pour partir de la
  dernière version.

## Où se trouve quoi

| Fichier | Contenu |
|---|---|
| `site/index.html` | Accueil (avec le carrousel de photos) |
| `site/destinations.html` | Les destinations, avec les filtres par thème |
| `site/itineraires.html` | Les itinéraires détaillés |
| `site/notre-histoire.html` | Notre histoire |
| `site/reserver.html` | Le formulaire de demande (il prépare un message WhatsApp) |
| `site/confirmation.html` | La page affichée après l'envoi du formulaire |
| `site/404.html` | La page « introuvable » |
| `site/assets/css/site.css` | Toute la mise en forme. Les couleurs, polices et espacements sont regroupés en haut, dans `:root` |
| `site/assets/js/site.js` | Le choix FR / EN, le menu sur mobile, le carrousel, les filtres et le formulaire |
| `site/assets/img/` | Les photos |
| `site/sitemap.xml` | La liste des pages pour Google |
| `site/vercel.json` | Les redirections de l'ancienne adresse et les réglages de sécurité. À ne pas modifier sans raison |

## Les règles du site

1. **Chaque texte existe en deux langues dans la même page.** Le français est affiché par défaut :
   ```html
   <span data-lang="fr">Bonjour</span><span data-lang="en" hidden>Hello</span>
   ```
   Les blocs plus longs utilisent `<div data-lang="fr">` et `<div data-lang="en" hidden>`. Modifiez toujours
   **les deux langues**. Les textes d'aide des champs du formulaire sont dans `data-ph-fr` et `data-ph-en`.
2. **Le menu, le pied de page et le bouton WhatsApp sont copiés dans les 7 pages.** Pour les changer,
   modifiez-les dans chaque fichier `.html`.
3. **Le numéro WhatsApp (+855 12 241 787)** apparaît dans toutes les pages et dans `site/assets/js/site.js`
   (ligne `var WHATSAPP = '85512241787';`, utilisée par le formulaire). S'il change, utilisez
   « rechercher et remplacer » sur tout le dossier `site/`.
4. **Une nouvelle page** : copiez une page existante pour garder le menu et le pied de page, ajoutez-la au
   menu des 7 pages et à `site/sitemap.xml`.
5. **Une photo remplacée** : donnez-lui un nouveau nom de fichier plutôt que d'écraser l'ancien. Certains
   visiteurs gardent les anciennes photos en mémoire.
6. **Rien de secret dans ce dossier.** Tout ce qui est dans `site/` est public sur internet.

## En cas d'erreur

- Chaque fichier garde tout son historique : ouvrez le fichier sur GitHub, cliquez sur **History** pour
  retrouver une ancienne version et recopier son contenu.
- Si le site ne s'affiche plus correctement, Sovanrith peut remettre la version précédente en ligne en un clic.

---

# English version

This is the code of **https://angkorterrainvivant.com**.

- The website is the **`site/`** folder: plain HTML, CSS and JavaScript, no build step.
- **Every change saved to the `main` branch goes live automatically**, in about a minute. Hosting (Vercel)
  and the domain are already set up.
- This repository is **public**: anyone can read the code (the same code the site serves), but only invited
  people can change it. To keep your email address out of the public history, turn on GitHub
  **Settings > Emails > Keep my email addresses private**.
- **Edit in the browser:** open the file on GitHub, click the **pencil** icon, make the change, then
  **Commit changes** (keep "Commit directly to the main branch"). To add photos: open `site/assets/img/`,
  then **Add file > Upload files**.
- **Edit on your computer:** GitHub Desktop or `git clone` / `git commit` / `git push`. Run `git pull`
  before you start. Preview by opening `site/index.html` in a browser.
- **Rules:** every text exists in French and English (`data-lang="fr"` / `data-lang="en" hidden`), change both;
  the menu, footer and WhatsApp button are copied in all 7 pages; the WhatsApp number is in every page and in
  `site/assets/js/site.js`; add new pages to the menu and to `site/sitemap.xml`; give a replaced photo a new
  file name; never put anything secret in `site/`, it is all public.
- **Undo:** each file's **History** on GitHub shows every earlier version. Sovanrith can also put the
  previous version of the site back online in one click.
