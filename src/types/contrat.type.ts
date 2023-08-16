export default interface IContrat{
    id?: any | null,
    account: string,
    date_debut: Date,
    date_fin: Date,
    document: string, 
    date_create?: Date | null,
    date_update?: Date | null,
    deleted?: number | null
}