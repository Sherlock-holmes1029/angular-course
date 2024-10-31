export interface Ticket{
    id:string;
    title:string;
    request:String;
    status:'open'|'closed'
}