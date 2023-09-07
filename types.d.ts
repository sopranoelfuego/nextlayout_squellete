

export interface MemberType{
    id?:number | string,
    prenom:string,
    nom:string
    contact:string
    email:string
    password:string
    role:'USER' | 'ADMIN' | "TRESORIE" | string


}
export interface CotisationType{
    id?:number | string,
  montant: number,
  codeTransaction: string,
  dateCotisation: string,
  membreId: number | string



}