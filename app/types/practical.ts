export type Features={
    title:string;
    date:string;
    status:"Completed"|"Pending";
    comment:string;
}
export type Practical={
    title:string;
    slug:string;
    features:Features[];
}