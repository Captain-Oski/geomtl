"""Chemins partagés par les scripts de vectorisation du globe (voir docs/globe-anime.md).

Variables d'environnement facultatives :
  GLOBE_SOURCE   image d'origine du studio (3600 x 2202), par défaut scripts/globe/source/globe-trame-original.jpg
  GLOBE_TRAVAIL  dossier des fichiers intermédiaires, par défaut scripts/globe/.travail
  GLOBE_SORTIE   dossier de sortie, par défaut public/images/brand
"""
import os
from pathlib import Path

ICI = Path(__file__).resolve().parent
RACINE = ICI.parent.parent
SOURCE = os.environ.get("GLOBE_SOURCE", str(ICI / "source" / "globe-trame-original.jpg"))
TRAVAIL = Path(os.environ.get("GLOBE_TRAVAIL", str(ICI / ".travail")))
SORTIE = Path(os.environ.get("GLOBE_SORTIE", str(RACINE / "public" / "images" / "brand")))
TRAVAIL.mkdir(parents=True, exist_ok=True)
SORTIE.mkdir(parents=True, exist_ok=True)

D = str(TRAVAIL) + os.sep
OUT = str(SORTIE) + os.sep
