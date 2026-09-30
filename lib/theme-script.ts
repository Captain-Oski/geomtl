// Séparé de lib/theme.ts (qui contient un hook React) pour pouvoir être
// importé par le layout, un composant serveur.

export const CLE_THEME = 'geomtl-theme';

// Exécuté dans <head> avant le premier affichage (voir app/[locale]/layout.tsx) :
// applique le thème mémorisé sans flash de fond crème.
export const SCRIPT_THEME = `try{if(localStorage.getItem('${CLE_THEME}')==='sombre')document.documentElement.classList.add('dark')}catch(e){}`;
