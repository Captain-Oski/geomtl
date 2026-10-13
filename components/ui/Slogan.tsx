// Le slogan sur deux lignes, coupé après la première virgule, comme sur les
// pièces graphiques du studio (« Comprendre le territoire, / façonner l'avenir »).
export default function Slogan({ texte }: { texte: string }) {
  const virgule = texte.indexOf(', ');
  if (virgule < 0) return <>{texte}</>;
  return (
    <>
      {texte.slice(0, virgule + 1)}
      <br />
      {texte.slice(virgule + 2)}
    </>
  );
}
