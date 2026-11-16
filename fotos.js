// Fotos del catálogo STAND UP (carpeta "stand up catalogo" de Drive, reducidas para web)
// Clave: colegio|PRENDA, o colegio|PRENDA|V/M (varón/mujer), o colegio|PRENDA|#n (modelo n)
const PHOTOS = {
  'sc|CHOMPA|M':'sc-1', 'sc|CHOMPA|V':'sc-3', 'sc|PANTALONES|V':'sc-5', 'sc|PANTALONES|M':'sc-11',
  'sc|YAMPER':'sc-7', 'sc|FALDA':'sc-9', 'sc|BLUSA':'sc-13', 'sc|CAMISA':'sc-16', 'sc|SHORT':'sc-21',
  'sc|DEPORTIVO':'sc-23', 'sc|POLERA':'sc-28', 'sc|MEDIAS':'sc-30', 'sc|CORBATA':'sc-32', 'sc|GORRA':'sc-33',
  'sc|CHALECO|#1':'sc-37', 'sc|CHALECO|#2':'sc-40', 'sc|CHAMARRA':'sc-42',
  'sc|CANGURO|#1':'sc-44', 'sc|CANGURO|#2':'sc-46', 'sc|CANGURO|#3':'sc-48',
  'add|CHOMPA|M':'add-1', 'add|CHOMPA|V':'add-4', 'add|PANTALONES|V':'add-14', 'add|PANTALONES|M':'add-16',
  'add|DEPORTIVO':'add-19', 'add|BUZO':'add-21', 'add|POLERA':'add-23', 'add|SHORT':'add-25', 'add|CHALECO':'add-27', 'add|CANGURO':'add-29',
  'cic|CAMISA':'cic-1', 'cic|BLUSA':'cic-10', 'cic|CHOMPA|V':'cic-4', 'cic|CHOMPA|M':'cic-13', 'cic|PANTALONES':'cic-6',
  'cic|MEDIAS|V':'cic-9', 'cic|MEDIAS|M':'cic-19', 'cic|FALDA':'cic-16', 'cic|YAMPER':'cic-17', 'cic|SHORT':'cic-20',
  'cic|POLERA|#1':'cic-22', 'cic|POLERA|#2':'cic-24', 'cic|BUZO':'cic-26', 'cic|DEPORTIVO':'cic-28', 'cic|CHAQUETA':'cic-28',
  'cic|CHALECO':'cic-30', 'cic|CANGURO':'cic-32', 'cic|CORBATA':'cic-34',
  'ls|POLERA':'ls-3', 'ls|SHORT':'ls-5', 'ls|DEPORTIVO':'ls-9', 'ls|CAMISA':'ls-11', 'ls|BLUSA':'ls-18', 'ls|PANTALONES':'ls-14',
  'ls|CHOMPA|V':'ls-16', 'ls|CHOMPA|M':'ls-21', 'ls|FALDA':'ls-23', 'ls|YAMPER':'ls-25', 'ls|CORBATA':'ls-29',
  'uee|YAMPER':'uee-1', 'uee|GORRA':'uee-3', 'uee|CHOMPA':'uee-5', 'uee|CORBATA':'uee-7', 'uee|SHORT':'uee-8', 'uee|CANGURO':'uee-10',
  'uee|BUZO':'uee-12', 'uee|DEPORTIVO':'uee-12', 'uee|POLERA':'uee-14', 'uee|BLUSA':'uee-16', 'uee|CAMISA':'uee-18', 'uee|PANTALONES':'uee-22',
  'mp|SOMBRERO':'mp-1', 'mp|GORRA':'mp-3', 'mp|PANTALONES':'mp-7', 'mp|CHOMPA|M':'mp-9', 'mp|CHOMPA|V':'mp-11', 'mp|POLERA':'mp-13',
  'mp|DEPORTIVO':'mp-15', 'mp|BUZO':'mp-17', 'mp|MORRAL':'mp-19', 'mp|CORBATA':'mp-21', 'mp|CANGURO':'mp-28', 'mp|CHAMARRA':'mp-32', 'mp|MEDIAS':'mp-33',
  'nav|POLERA':'nav-3', 'nav|DEPORTIVO':'nav-5'
};

// Colegios que todavía no están en el Excel: se muestran sus fotos para consultar por WhatsApp
// [prenda, para (V, M o U), foto]
const GALLERY = {
  idef: [['Chompa con botones','M','idef-1'],['Chompa','V','idef-13'],['Blusa','M','idef-3'],['Camisa','V','idef-9'],['Falda','M','idef-6'],
         ['Pantalón','U','idef-11'],['Corbata','U','idef-15'],['Short','U','idef-16'],['Polera','U','idef-20'],['Buzo','U','idef-22'],
         ['Deportivo','U','idef-24'],['Polera manga larga','U','idef-26'],['Short deportivo','U','idef-28']],
  rg:   [['Chompa con botones','M','rg-7'],['Chompa','V','rg-5'],['Blusa','M','rg-b1'],['Camisa','V','rg-b4'],['Polera','U','rg-9'],
         ['Deportivo','U','rg-1'],['Buzo','U','rg-3']],
  sa:   [['Chompa con botones','M','sa-1'],['Chompa','V','sa-3'],['Pantalón','U','sa-5'],['Polera','U','sa-7'],['Short','U','sa-9'],
         ['Buzo','U','sa-11'],['Deportivo','U','sa-13'],['Chaleco','U','sa-15'],['Canguro','U','sa-17']]
};

// Medidas aproximadas de referencia (cm, prenda extendida). Se reemplazan por las reales cuando lleguen.
function medidasAprox(g, size){
  const KID = ['4','6','8','10','12','14','16'], ADU = ['XS','S','M','L','XL','XXL'];
  const ki = KID.indexOf(size), ai = ADU.indexOf(size), n = parseFloat(size);
  const r = v => Math.round(v);
  const TOP = ['CHOMPA','CANGURO','CHALECO','CHAQUETA','CHAMARRA','DEPORTIVO','POLERA','BLUSA','CAMISA'];
  if (TOP.includes(g)) {
    let L, P, M;
    if (ki >= 0) { L = 42 + ki*4; P = 34 + ki*2.4; M = 36 + ki*4; }
    else if (ai >= 0) { L = 63 + ai*2.6; P = 47 + ai*3; M = 58 + ai*1.4; }
    else if (g === 'CAMISA' && n >= 14) { const c = (n - 14.5) * 2; return {'Cuello': r(n*2.54), 'Largo': r(72 + c), 'Ancho de pecho': r(50 + c*1.5), 'Largo de manga': r(60 + c*0.8)}; }
    else return null;
    const m = {'Largo': r(L), 'Ancho de pecho': r(P)};
    if (g !== 'CHALECO') m['Largo de manga'] = r(g === 'POLERA' ? 12 + (ki >= 0 ? ki : 6 + ai) : M);
    return m;
  }
  if (g === 'PANTALONES' || g === 'BUZO' || g === 'CALZA') {
    if (ki >= 0) return {'Largo': r(60 + ki*6.5), 'Cintura': r(26 + ki*1.4), 'Tiro': r(19 + ki*1.2)};
    if (ai >= 0) return {'Largo': r(96 + ai*2), 'Cintura': r(33 + ai*2.5), 'Tiro': r(26 + ai)};
    if (n >= 34) return {'Largo': r(98 + (n-34)*0.5), 'Cintura': r(n), 'Tiro': r(26 + (n-34)*0.3)};
    return null;
  }
  if (g === 'FALDA' || g === 'YAMPER') {
    const extra = g === 'YAMPER' ? 18 : 0;
    if (ki >= 0) return {'Largo': r(34 + ki*2.6 + extra), 'Cintura': r(27 + ki*1.2)};
    if (ai >= 0) return {'Largo': r(50 + ai*1.2 + extra), 'Cintura': r(33 + ai*2.5)};
    if (n >= 34) return {'Largo': r(52 + extra), 'Cintura': r(n)};
    return null;
  }
  if (g === 'SHORT') {
    if (ki >= 0) return {'Largo': r(28 + ki*2), 'Cintura': r(25 + ki*1.4)};
    if (ai >= 0) return {'Largo': r(42 + ai*1.5), 'Cintura': r(33 + ai*2.5)};
  }
  return null;
}
