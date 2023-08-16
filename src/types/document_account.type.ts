export default interface IDocumentType{
    id?: any | null,
    account: string,
    type_doc: string,
    document: string,
    date_create?: Date | null,
    date_update?: Date | null,
    deleted?: number | null
}