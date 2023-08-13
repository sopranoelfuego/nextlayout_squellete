export type MemberType={
    id: "",
    nom: "",
    prenom: "",
    email: "",
    contact: "",
    password: "",
}
export type MemberData={
    result:{content:MemberType[]}
}
export interface ISearchParams{
    search?:string
    page:number
    size:number
    direction:'ASC' | 'DESC' | string
    sortBy?:string
}