export default interface IAccount{
    id?: any | null,
    nom: string,
    prenom: string,
    num_id: string,
    contact: string,
    sexe: string,
    date_naissance: Date,
    email: string,
    passwd: string,
    role: string;
    structure: string,
    poste: string,
    date_create?: Date | null,
    date_update?: Date | null,
    deleted?: number | null
}
