export type MemberType = {
  id?: number | string;
  prenom: string;
  nom: string;
  contact: string;
  email: string;
  password?: string;
  role: "USER" | "ADMIN" | "TRESORIE" | string;
};
export type IUser = Omit<MemberType, "contact" | "password"> & {
  token: string;
};
export interface CotisationType {
  id?: number | string;
  montant: number;
  codeTransaction: string;
  dateCotisation?: string;
  membreId: number | string;
  etat?:number,
  membre?: { id: number; fullName: string };
}
export interface ISettingType {
  id?: number | string;
  montantParAction: number;
  jourApresCotisation: number;
  dateDebutCycle: Date;
  dateFinCyle: Date;
  tauxInteret: number;
}
export interface ICreditType {
  id?: number | string;
  montant: number;
  motif: string;
  dateCredit?:  string;
  etat?: number;
  membreId: number;
  etat?:number,

  status?: string;
  membre?: { id: number; fullName: string };
}
export interface ICompteSettingType {
  id?: number;
  montantActuelle: number;
  montantEndette: number;
  interet: number;
}
