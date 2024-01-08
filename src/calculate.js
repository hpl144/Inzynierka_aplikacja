const Pr = 3.93;
const vw = 0.608 * Math.pow(10, -6);
const lambdaW = 64.2 * Math.pow(10, -2);
const cpw = 4174;
// or 4.174
const cpa = 1005;
// or 1.005
const gw = 990.2;
const va = 17.46 * Math.pow(10, -6);
const pa = 1.111;

const lambdaA = 0.028;
const x1 = 0.8033;
const x2 = 0.3619;
const Pra = 0.699;
const lambdaC = 370;

export function calculate(heatExchangerParams, tubeParameters, finsParameters, waterParameters, airParameters) {
  const { length, height, tubePitch, rowPitch, rows, controlAreas } = heatExchangerParams;
  const { outerDiatemeter, wallThickness } = tubeParameters;
  const { finPitch, finThickness } = finsParameters;
  const { temperature: tempWater, flow: flowWater } = waterParameters;
  let { temperature: tempAir, flow: flowAir } = airParameters;
  let tempWaterK = toKelvin(tempWater);
  let tempAirK = toKelvin(tempAir);
  flowAir = flowAir * height * length * 3600;

  const ntw = Math.floor(height / tubePitch);
  console.log(typeof height, typeof tubePitch);
  console.log(height, tubePitch);
  console.log(ntw);
  const ntwa = calcRowsOfPipes(height, tubePitch, rows);
  const nfw = calcNfw(length, controlAreas, finPitch);
  const Va0 = calcVa0(flowAir);
  const Vai = calcVai(Va0, ntw, controlAreas);
  const mwt = calc_mwt(flowWater, ntwa);
  // const Tśr = calcTśr(Ta)
  const dtin = calcdTin(outerDiatemeter, wallThickness);
  const Atw = calcAtw(dtin);
  const ww0 = calcww0(mwt, gw, Atw);
  const Aw = calcAw(height, length);
  const Awa = calcAwa(Aw, ntwa, controlAreas);
  const wa0 = calcwa0(Vai, Awa);
  const Va = calcVa(tubePitch, rowPitch, finPitch, finThickness);
  const Vt = calcVt(outerDiatemeter, finPitch, finThickness);
  const Vo = calcVo(Va, Vt);
  const Af = calcAf(tubePitch, rowPitch, outerDiatemeter);
  const At = calcAt(outerDiatemeter, finPitch, finThickness);
  const A = calcA(Af, At);
  const dh = calcdh(Vo, A);
  const pmin = calcpmin(tubePitch, rowPitch);
  const Tai = calcTai(tempAirK, controlAreas);
  const wmax = calc_wmax(finPitch, rowPitch, finThickness, pmin, outerDiatemeter, Tai, tempAirK, wa0);
  const Rea = calcRea(wmax, dh, va);
  const Nua = calcNua(x1, Rea, x2, Pra);
  const alfaA = calcAlfaA(Nua, lambdaA, dh);
  const Abf = calcAbf(length, controlAreas, outerDiatemeter, finThickness, nfw);
  const deltaAf = calcDeltaAf(Af, nfw);
  const A0 = calcA0(length, controlAreas, outerDiatemeter);
  const nfalfaA = calc_nfalfaa(alfaA);
  const alfaEq = calc_alfaEq(alfaA, Abf, A0, deltaAf, nfalfaA);
  const Ain = calcAin(length, dtin, controlAreas);
  const Rew = calcRew(ww0, dtin, vw);
  const Nuw = calcNuw(Rew, Pr);
  const alfaw = calc_alfaw(Nuw, lambdaW, dtin);
  const Uoi = calcUoi(alfaEq, A0, Ain, finThickness, lambdaC, alfaw);
  const deltaXi = calcDeltaXi(length, controlAreas);
  const deltaAoi = calcDeltaAoi(outerDiatemeter, deltaXi);
  const deltaMai = calcDeltamai(rowPitch, deltaXi, wa0, pa);
  const Nai = calcNai(Uoi, deltaAoi, deltaMai, cpa);
  const mwt2 = calc_mwt2(dtin, ww0, gw);
  const Nwi = calcNwi(Uoi, deltaAoi, mwt2, cpw);
  const Tw_1 = calcTw_1(tempAirK, tempWaterK, Nwi, Nai);
  const Ta_1 = calcTa_1(tempAirK, tempWaterK, Nai, Nwi);
  return { Tw_1, Ta_1 };
}

// Dane
function calcRowsOfPipes(height, tubePitch, rows) {
  return Math.floor(height / tubePitch) * rows;
}
// Żebra
function calcNfw(length, controlAreas, finPitch) {
  return Math.floor(length / controlAreas / finPitch);
}

// Powietrze
function toKelvin(temp) {
  return Number(temp) + 273.15;
}

function calcVa0(flowAir) {
  return flowAir / 3600;
}

function calcVai(Va0, ntw, n) {
  return Va0 / (ntw * n);
}

//Woda
function calc_mwt(mw0, ntwa) {
  return mw0 / ntwa;
}

// function calcTśr(tempWaterK, tempWaterK) {
//   return (tempWaterK + tempWaterK) / 2;
// }
//zamiana strumieni wody i powietrza na predkosc
// predkosc wody
function calcdTin(outerDiamater, wallThickness) {
  return outerDiamater - 2 * wallThickness;
}

function calcAtw(dTin) {
  return Math.PI * Math.pow(dTin / 2, 2);
}

function calcww0(mwt, gw, Atw) {
  return mwt / (gw * Atw);
}

// predkosc powietrza
function calcAw(h, l) {
  return h * l;
}

function calcAwa(Aw, ntwa, n) {
  return Aw / (ntwa * n);
}

function calcwa0(Vai, Awa) {
  return Vai / Awa;
}

//OBLICZENIA PO STRONIE POWIETRZA POTRZEBNE DO ,,Uo.i :
//OBLICZANIE ŚREDNICY ZASTĘPCZEJ DLA RURY,,dh '':

function calcVa(tubePitch, rowPitch, finPitch, finThickness) {
  return tubePitch * rowPitch * (finPitch - finThickness);
}

function calcVt(outerDiamater, finPitch, finThickness) {
  return Math.PI * Math.pow(outerDiamater / 2, 2) * (finPitch - finThickness);
}

function calcVo(Va, Vt) {
  return Va - Vt;
}

function calcAf(tubePitch, rowPitch, outerDiamater) {
  return 2 * (tubePitch * rowPitch - Math.PI * Math.pow(outerDiamater / 2, 2));
}

function calcAt(outerDiamater, finPitch, finThickness) {
  return Math.PI * outerDiamater * (finPitch - finThickness);
}

function calcA(Af, At) {
  return Af - At;
}

function calcdh(Vo, A) {
  return (4 * Vo) / A;
}

//PRĘDKOŚĆ MAKSYMALNA W WYMIENNIKU,,wmax
function calcpmin(tubePitch, rowPitch) {
  return Math.sqrt(Math.pow(tubePitch / 2, 2) + Math.pow(rowPitch, 2));
}

function calcTai(tempWaterK, n) {
  let value = 0;
  for (let i = 0; i < n; i++) {
    value += tempWaterK;
  }
  return value / n;
}

function calc_wmax(finPitch, rowPitch, finThickness, pmin, outerDiamater, Tai, tempWaterK, wa0) {
  return ((finPitch * rowPitch) / ((finPitch - finThickness) * (pmin - outerDiamater))) * (Tai / tempWaterK) * wa0;
}

//1.3.Liczba Reynoldsa powietrza dla każdego rzędu,,Rea

function calcRea(wmax, dh, va) {
  return (wmax * dh) / va;
}
//Liczba Nusselta powietrza dla każdego rzędu,

function calcNua(x1, Rea, x2, Pra) {
  return x1 * Math.pow(Rea, x2) * Math.pow(Pra, 1 / 3);
}

//WSPÓŁCZYNIK WNIKANIA CIEPŁA PO STRONIE POWIETRZA,,αa '':

function calcAlfaA(Nua, lambdaA, dh) {
  return (Nua * lambdaA) / dh;
}

//Współczynnik przenikania ciepła po stronie powietrza, biorąc pod uwagę żebra przymocowane do rury,,αeq '':

function calcAbf(L, n, d0, finThickness, nfw) {
  return (L / n) * d0 * Math.PI - d0 * Math.PI * finThickness * nfw;
}

function calcDeltaAf(Af, nfw) {
  return Af * nfw;
}

function calcA0(L, n, d0) {
  return (L / n) * d0 * Math.PI;
}

function calc_nfalfaa(alfaA) {
  return -1 * Math.pow(10, -8) * Math.pow(alfaA, 3) + 1 * Math.pow(10, -5) * Math.pow(alfaA, 2) - 0.004 * alfaA + 0.9939;
}

function calc_alfaEq(alfaA, Abf, A0, deltaAf, nfalfaA) {
  return alfaA * (Abf / A0 + (deltaAf / A0) * nfalfaA);
}

// OBLICZENIA PO STRONIE POWIETRZA POTRZEBNE DO ,,Uo.i '':
//Wewnętrzna powierzchnia rury na jednym odcinku pomiarowym

function calcAin(L, dtin, n) {
  return (L * Math.PI * dtin) / n;
}

function calcRew(ww0, dtin, vw) {
  return (ww0 * dtin) / vw;
}

function calcNuw(Rew, Prw) {
  return 0.0125 * Math.pow(Rew, 0.8413) * Math.pow(Prw, 0.6179);
}

function calc_alfaw(Nuw, lambdaw, dtin) {
  return (Nuw * lambdaw) / dtin;
}

function calcUoi(alfaEq, A0, Ain, finThickness, lambdaC, alfaw) {
  return 1 / (1 / alfaEq + (A0 / Ain) * (finThickness / lambdaC) + (A0 / Ain) * (1 / alfaw));
}

function calcDeltaXi(L, n) {
  return L / n;
}

function calcDeltaAoi(d0, deltaxi) {
  return Math.PI * d0 * deltaxi;
}

function calcDeltamai(p1, deltaxi, wa0, pa) {
  return p1 * deltaxi * wa0 * pa;
}

function calcNai(Uoi, deltaAoi, deltaMai, cpa) {
  return (Uoi * deltaAoi) / (deltaMai * cpa);
}

function calc_mwt2(dtin, ww0, gw) {
  return ((Math.PI * Math.pow(dtin, 2)) / 4) * ww0 * gw;
}

function calcNwi(Uoi, deltaAoi, mwt, cpw) {
  return (Uoi * deltaAoi) / (mwt * cpw);
}

function calcTw_1(Ta, Tw, Nwi, Nai) {
  return Number(Ta) + (Tw - Ta) * Math.exp((-Nwi / Nai) * (1 - Math.exp(-Nai)));
}

function calcTa_1(Ta, Tw, Nai, Nwi) {
  return Number(Ta) + (Tw - Ta) * (Nai / Nwi) * (1 - Math.exp((-Nwi / Nai) * (1 - Math.exp(-Nai))));
}
